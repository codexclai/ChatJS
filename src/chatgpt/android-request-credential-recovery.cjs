'use strict';

const RecoveryAction = Object.freeze({
  None: 'None',
  Renew: 'Renew',
  Revoked: 'Revoked',
  RequiresSSO: 'RequiresSSO'
});

class AndroidRequestCredentialSchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AndroidRequestCredentialSchemaError';
    this.code = 'CHATGPT_ANDROID_REQUEST_CREDENTIAL_INVALID_RESPONSE';
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function decodeOptionalResilientObject(source, field, decoder) {
  if (source[field] === undefined) return undefined;
  try {
    return decoder(source[field]);
  } catch {
    // The generated JSON schema marks these optional object members as
    // resilient: a malformed nested object is discarded, not fatal.
    return undefined;
  }
}

function decodeOptionalString(source, field) {
  if (source[field] === undefined) return undefined;
  if (typeof source[field] !== 'string') {
    throw new AndroidRequestCredentialSchemaError('APIError.' + field + ' must be a string.');
  }
  return source[field];
}

function decodeAPIError(value) {
  if (!isObject(value) || typeof value.message !== 'string') {
    throw new AndroidRequestCredentialSchemaError('APIError.message must be a string.');
  }

  const result = { message: value.message };
  const code = decodeOptionalString(value, 'code');
  const type = decodeOptionalString(value, 'type');
  if (code !== undefined) result.code = code;
  if (type !== undefined) result.type = type;
  return result;
}

function decodeErrorDetail(value) {
  if (!isObject(value)) {
    throw new AndroidRequestCredentialSchemaError('ErrorDetail must be an object.');
  }

  const result = {};
  if (value.code !== undefined) {
    if (typeof value.code !== 'string') {
      throw new AndroidRequestCredentialSchemaError('ErrorDetail.code must be a string.');
    }
    result.code = value.code;
  }

  const error = decodeOptionalResilientObject(value, 'error', decodeAPIError);
  if (error !== undefined) result.error = error;
  return result;
}

function decodeRequestCredentialErrorEnvelope(value) {
  if (!isObject(value)) {
    throw new AndroidRequestCredentialSchemaError('ErrorEnvelope must be an object.');
  }

  const result = {};
  const detail = decodeOptionalResilientObject(value, 'detail', decodeErrorDetail);
  const error = decodeOptionalResilientObject(value, 'error', decodeAPIError);
  if (detail !== undefined) result.detail = detail;
  if (error !== undefined) result.error = error;
  return result;
}

function decodeRequestCredentialErrorEnvelopeJSON(serialized) {
  let parsed;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new AndroidRequestCredentialSchemaError('The response body is not valid JSON.');
  }
  return decodeRequestCredentialErrorEnvelope(parsed);
}

function isRevokedCode(value) {
  return value === 'token_revoked' || value === 'token_invalidated';
}

function classifyRejectedCredential(responseBody) {
  if (responseBody === undefined) return RecoveryAction.None;

  let envelope;
  try {
    envelope = decodeRequestCredentialErrorEnvelopeJSON(responseBody);
  } catch {
    // Android treats an absent, malformed or schema-invalid response as no
    // credential-recovery signal; the original HTTP error remains in charge.
    return RecoveryAction.None;
  }

  const detail = envelope.detail;
  if (detail !== undefined) {
    if (detail.error !== undefined) {
      return isRevokedCode(detail.error.code)
        ? RecoveryAction.Revoked
        : RecoveryAction.None;
    }

    if (detail.code !== undefined) {
      if (detail.code === 'require_sso_login') return RecoveryAction.RequiresSSO;
      if (detail.code === 'token_expired') return RecoveryAction.Renew;
      return RecoveryAction.None;
    }
  }

  const error = envelope.error;
  if (error !== undefined) {
    if (isRevokedCode(error.code) || isRevokedCode(error.type)) {
      return RecoveryAction.Revoked;
    }
    if (error.code === 'require_sso_login' || error.type === 'require_sso_login') {
      return RecoveryAction.RequiresSSO;
    }
  }

  return RecoveryAction.None;
}

function describeRejectedCredentialRecovery(responseBody, allowTokenRefresh) {
  const action = classifyRejectedCredential(responseBody);
  return Object.freeze({
    action,
    shouldReportRevoked: action === RecoveryAction.Revoked || action === RecoveryAction.RequiresSSO,
    requiresSSO: action === RecoveryAction.RequiresSSO,
    shouldRenewAccessToken: action === RecoveryAction.Renew && Boolean(allowTokenRefresh)
  });
}

module.exports = Object.freeze({
  RecoveryAction,
  AndroidRequestCredentialSchemaError,
  decodeAPIError,
  decodeErrorDetail,
  decodeRequestCredentialErrorEnvelope,
  decodeRequestCredentialErrorEnvelopeJSON,
  classifyRejectedCredential,
  describeRejectedCredentialRecovery
});
