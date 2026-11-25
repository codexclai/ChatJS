'use strict';

const CREDENTIAL_RECORD_VERSION = 1;
const CREDENTIAL_RECORD_NAMESPACE = 'com.openai.valdi.authenticated_session';
const CREDENTIAL_RECORD_USER_ID = 'authenticated-session-bootstrap';
const CREDENTIAL_RECORD_KEY = 'credential';

class AndroidCredentialRecordError extends Error {
  constructor(message, code = 'CHATGPT_ANDROID_CREDENTIAL_RECORD_INVALID') {
    super(message);
    this.name = 'AndroidCredentialRecordError';
    this.code = code;
  }
}

function isPlainRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isValidStoredAccount(value) {
  if (!isPlainRecord(value)) return false;
  if (typeof value.id !== 'string' || typeof value.name !== 'string') return false;
  if (value.accountUserId !== undefined && typeof value.accountUserId !== 'string') return false;
  if (value.planLabel !== undefined && typeof value.planLabel !== 'string') return false;
  if (value.isWorkspace !== undefined && typeof value.isWorkspace !== 'boolean') return false;
  if (value.pictureURL !== undefined && typeof value.pictureURL !== 'string') return false;
  return true;
}

function decodeStoredSession(value) {
  if (value === undefined) return undefined;

  if (!isPlainRecord(value) || value.version !== CREDENTIAL_RECORD_VERSION) {
    return undefined;
  }
  if (typeof value.baseUrl !== 'string') return undefined;
  if (
    value.expiresAt !== undefined &&
    (typeof value.expiresAt !== 'number' || !Number.isFinite(value.expiresAt))
  ) {
    return undefined;
  }
  if (!Array.isArray(value.accounts) || value.accounts.length === 0) return undefined;
  if (!value.accounts.every(isValidStoredAccount)) return undefined;

  return { ...value };
}

function decodeAndroidCredentialRecord(value) {
  if (!isPlainRecord(value)) {
    throw new AndroidCredentialRecordError(
      'The encrypted authentication credential has an invalid format.'
    );
  }

  if (value.nativeSessionId === undefined) {
    if (typeof value.accessToken !== 'string' || value.accessToken.trim().length === 0) {
      throw new AndroidCredentialRecordError(
        'The encrypted authentication credential has an invalid format.'
      );
    }
  } else if (
    typeof value.nativeSessionId !== 'string' ||
    value.nativeSessionId.length === 0 ||
    value.accessToken !== undefined ||
    (value.accountId !== undefined && typeof value.accountId !== 'string')
  ) {
    throw new AndroidCredentialRecordError(
      'The encrypted authentication credential has an invalid format.'
    );
  }

  if (value.nativeSessionId === undefined && value.accountId !== undefined && typeof value.accountId !== 'string') {
    throw new AndroidCredentialRecordError(
      'The encrypted authentication credential has an invalid format.'
    );
  }

  const result = { ...value };
  const session = decodeStoredSession(value.session);
  if (session === undefined) delete result.session;
  else result.session = session;

  if (value.nativeSessionId !== undefined) {
    result.nativeSessionId = value.nativeSessionId;
    delete result.accessToken;
  } else {
    result.accessToken = value.accessToken;
    delete result.nativeSessionId;
  }

  if (value.accountId === undefined) delete result.accountId;
  else result.accountId = value.accountId;

  return result;
}

function decodeAndroidCredentialRecordJSON(serialized) {
  let value;
  try {
    value = JSON.parse(serialized);
  } catch {
    throw new AndroidCredentialRecordError(
      'The encrypted authentication credential could not be decoded.',
      'CHATGPT_ANDROID_CREDENTIAL_RECORD_DECODE_FAILED'
    );
  }
  return decodeAndroidCredentialRecord(value);
}

function decodeAccessTokenExpiration(accessToken) {
  if (typeof accessToken !== 'string') return undefined;

  try {
    const parts = accessToken.split('.');
    if (parts.length !== 3) return undefined;

    const encoded = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '=');
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(padded)) return undefined;

    const bytes = Buffer.from(padded, 'base64');
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    const expiration = payload.exp;
    return typeof expiration === 'number' && Number.isFinite(expiration)
      ? expiration
      : undefined;
  } catch {
    return undefined;
  }
}

function buildAndroidCredentialRecord(session, nativeSessionId) {
  if (!isPlainRecord(session) || !isPlainRecord(session.activeAccount)) {
    throw new TypeError('session and session.activeAccount must be objects.');
  }
  if (typeof session.activeAccount.id !== 'string') {
    throw new TypeError('session.activeAccount.id must be a string.');
  }
  if (nativeSessionId === undefined && typeof session.accessToken !== 'string') {
    throw new TypeError('session.accessToken must be a string when no native session ID exists.');
  }
  if (!Array.isArray(session.accounts)) {
    throw new TypeError('session.accounts must be an array.');
  }
  if (typeof session.baseUrl !== 'string') {
    throw new TypeError('session.baseUrl must be a string.');
  }

  const result = nativeSessionId === undefined
    ? { accessToken: session.accessToken }
    : { nativeSessionId };
  result.accountId = session.activeAccount.id;

  const expiresAt = nativeSessionId === undefined
    ? decodeAccessTokenExpiration(session.accessToken)
    : undefined;

  // The Android controller persists an account/session snapshot only for
  // native-session credentials or access tokens with a decodable finite exp.
  if (nativeSessionId !== undefined || expiresAt !== undefined) {
    result.session = {
      version: CREDENTIAL_RECORD_VERSION,
      baseUrl: session.baseUrl,
      ...(expiresAt === undefined ? {} : { expiresAt }),
      accounts: session.accounts
    };
  }

  return result;
}

module.exports = Object.freeze({
  CREDENTIAL_RECORD_VERSION,
  CREDENTIAL_RECORD_NAMESPACE,
  CREDENTIAL_RECORD_USER_ID,
  CREDENTIAL_RECORD_KEY,
  AndroidCredentialRecordError,
  isValidStoredAccount,
  decodeStoredSession,
  decodeAndroidCredentialRecord,
  decodeAndroidCredentialRecordJSON,
  decodeAccessTokenExpiration,
  buildAndroidCredentialRecord
});
