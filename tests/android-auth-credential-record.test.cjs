'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const record = require('../src/chatgpt/android-auth-credential-record.cjs');

function baseSession(overrides = {}) {
  return {
    accessToken: 'header.eyJleHAiOjE5MDAwMDAwMDB9.signature',
    baseUrl: 'https://chatgpt.com',
    accounts: [{ id: 'acct_a', name: 'Personal account' }],
    activeAccount: { id: 'acct_a', name: 'Personal account' },
    ...overrides
  };
}

function tokenWithPayload(payload) {
  return `header.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.signature`;
}

test('credential-store constants match the Android persistent-store namespace and key', () => {
  assert.equal(record.CREDENTIAL_RECORD_VERSION, 1);
  assert.equal(record.CREDENTIAL_RECORD_NAMESPACE, 'com.openai.valdi.authenticated_session');
  assert.equal(record.CREDENTIAL_RECORD_USER_ID, 'authenticated-session-bootstrap');
  assert.equal(record.CREDENTIAL_RECORD_KEY, 'credential');
});

test('access-token credentials require a non-empty string token and preserve unknown fields', () => {
  const source = { accessToken: ' token ', accountId: 'acct_a', futureField: { enabled: true } };
  assert.deepEqual(record.decodeAndroidCredentialRecord(source), source);
});

test('JSON record decoder distinguishes malformed JSON from a valid JSON value with invalid schema', () => {
  assert.deepEqual(record.decodeAndroidCredentialRecordJSON('{"accessToken":"token"}'), {
    accessToken: 'token'
  });
  assert.throws(() => record.decodeAndroidCredentialRecordJSON('{'), {
    name: 'AndroidCredentialRecordError',
    code: 'CHATGPT_ANDROID_CREDENTIAL_RECORD_DECODE_FAILED',
    message: 'The encrypted authentication credential could not be decoded.'
  });
  assert.throws(() => record.decodeAndroidCredentialRecordJSON('[]'), {
    name: 'AndroidCredentialRecordError',
    code: 'CHATGPT_ANDROID_CREDENTIAL_RECORD_INVALID',
    message: 'The encrypted authentication credential has an invalid format.'
  });
});

test('native-session credentials require a non-empty native ID and exclude accessToken', () => {
  const source = { nativeSessionId: 'native-session-1', accountId: 'acct_a' };
  assert.deepEqual(record.decodeAndroidCredentialRecord(source), source);
  assert.throws(() => record.decodeAndroidCredentialRecord({
    nativeSessionId: 'native-session-1',
    accessToken: 'token'
  }), { name: 'AndroidCredentialRecordError' });
});

test('top-level credential envelope rejects null, arrays, primitives, missing tokens and empty identifiers', () => {
  for (const invalid of [null, [], 'credential', 42, {}, { accessToken: '' }, { accessToken: '  ' }, { nativeSessionId: '' }]) {
    assert.throws(() => record.decodeAndroidCredentialRecord(invalid), {
      name: 'AndroidCredentialRecordError',
      code: 'CHATGPT_ANDROID_CREDENTIAL_RECORD_INVALID'
    });
  }
});

test('optional accountId must be a string for either credential form', () => {
  assert.throws(() => record.decodeAndroidCredentialRecord({ accessToken: 'token', accountId: 1 }));
  assert.throws(() => record.decodeAndroidCredentialRecord({ nativeSessionId: 'native', accountId: 1 }));
});

test('native-session envelope accountId may be absent, but accessToken must remain absent', () => {
  assert.deepEqual(record.decodeAndroidCredentialRecord({ nativeSessionId: 'native' }), {
    nativeSessionId: 'native'
  });
});

test('stored session accepts version 1, string baseUrl and non-empty validated accounts', () => {
  const session = {
    version: 1,
    baseUrl: 'https://chatgpt.com',
    expiresAt: 1900000000,
    accounts: [{ id: 'acct_a', name: 'A', isWorkspace: false, future: 3 }],
    futureSessionField: 'preserved'
  };
  assert.deepEqual(record.decodeStoredSession(session), session);
});

test('stored session requires finite optional expiry and at least one valid account', () => {
  assert.deepEqual(record.decodeStoredSession({
    version: 1,
    baseUrl: 'https://chatgpt.com',
    accounts: [{ id: '', name: '' }]
  }), {
    version: 1,
    baseUrl: 'https://chatgpt.com',
    accounts: [{ id: '', name: '' }]
  });
  for (const invalid of [
    null,
    [],
    { version: 2, baseUrl: 'https://chatgpt.com', accounts: [{ id: 'a', name: 'A' }] },
    { version: 1, baseUrl: 1, accounts: [{ id: 'a', name: 'A' }] },
    { version: 1, baseUrl: 'https://chatgpt.com', expiresAt: Infinity, accounts: [{ id: 'a', name: 'A' }] },
    { version: 1, baseUrl: 'https://chatgpt.com', accounts: [] },
    { version: 1, baseUrl: 'https://chatgpt.com', accounts: [{ id: 'a' }] }
  ]) {
    assert.equal(record.decodeStoredSession(invalid), undefined);
  }
});

test('malformed nested session metadata is discarded while the outer credential remains usable', () => {
  const decoded = record.decodeAndroidCredentialRecord({
    accessToken: 'token',
    accountId: 'acct_a',
    session: { version: 99, accounts: [] }
  });
  assert.deepEqual(decoded, { accessToken: 'token', accountId: 'acct_a' });
});

test('stored accounts validate required and optional fields by type without applying live account policy', () => {
  assert.equal(record.isValidStoredAccount({ id: '', name: '' }), true);
  assert.equal(record.isValidStoredAccount({ id: 'a', name: 'A', accountUserId: null }), false);
  assert.equal(record.isValidStoredAccount({ id: 'a', name: 'A', planLabel: 1 }), false);
  assert.equal(record.isValidStoredAccount({ id: 'a', name: 'A', isWorkspace: 'yes' }), false);
  assert.equal(record.isValidStoredAccount({ id: 'a', name: 'A', pictureURL: null }), false);
});

test('JWT expiration decoder reads a finite exp value from a three-part base64url token', () => {
  assert.equal(record.decodeAccessTokenExpiration(tokenWithPayload({ exp: 1900000000 })), 1900000000);
  assert.equal(record.decodeAccessTokenExpiration(tokenWithPayload({ exp: 1900000000.5 })), 1900000000.5);
});

test('JWT expiration decoder returns undefined for malformed, incomplete or non-finite payloads', () => {
  for (const token of [
    undefined,
    'one.two',
    'one.!!!!.three',
    `one.${Buffer.from('{').toString('base64url')}.three`,
    tokenWithPayload({ exp: '1900000000' }),
    tokenWithPayload({ exp: null }),
    `one.${Buffer.from('{\"exp\":1e999}').toString('base64url')}.three`,
    'one..three'
  ]) {
    assert.equal(record.decodeAccessTokenExpiration(token), undefined);
  }
});

test('access-token record builder stores account metadata only when JWT exp is available', () => {
  const source = baseSession();
  assert.deepEqual(record.buildAndroidCredentialRecord(source), {
    accessToken: source.accessToken,
    accountId: 'acct_a',
    session: {
      version: 1,
      baseUrl: 'https://chatgpt.com',
      expiresAt: 1900000000,
      accounts: source.accounts
    }
  });

  const withoutExp = baseSession({ accessToken: 'one.two.three' });
  assert.deepEqual(record.buildAndroidCredentialRecord(withoutExp), {
    accessToken: withoutExp.accessToken,
    accountId: 'acct_a'
  });
});

test('native-session record builder stores native identity and account snapshot without an access token', () => {
  const source = baseSession();
  assert.deepEqual(record.buildAndroidCredentialRecord(source, 'native-session-1'), {
    nativeSessionId: 'native-session-1',
    accountId: 'acct_a',
    session: {
      version: 1,
      baseUrl: 'https://chatgpt.com',
      accounts: source.accounts
    }
  });
});

test('record builder requires a canonical session account, account array and base URL', () => {
  assert.throws(() => record.buildAndroidCredentialRecord({}), /activeAccount/);
  assert.throws(() => record.buildAndroidCredentialRecord(baseSession({ activeAccount: {} })), /activeAccount.id/);
  assert.throws(() => record.buildAndroidCredentialRecord(baseSession({ accounts: null })), /accounts/);
  assert.throws(() => record.buildAndroidCredentialRecord(baseSession({ baseUrl: null })), /baseUrl/);
});
