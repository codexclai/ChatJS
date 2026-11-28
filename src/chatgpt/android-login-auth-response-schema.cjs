'use strict';

const ANDROID_LOGIN_AUTH_FIELDS = Object.freeze([
  'password',
  'confirm_password',
  'code',
  'birthday',
  'username',
  'email',
  'country_code',
  'phone',
  'name',
  'consent',
  'recovery_key',
  'unknown'
]);

const androidLoginAuthFieldSet = new Set(ANDROID_LOGIN_AUTH_FIELDS);

class AndroidLoginAuthResponseSchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AndroidLoginAuthResponseSchemaError';
    this.code = 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA';
  }
}

function requireObject(value, label) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new AndroidLoginAuthResponseSchemaError(label + ' must be an object.');
  }
  return { ...value };
}

function requireString(value, label) {
  if (typeof value !== 'string') {
    throw new AndroidLoginAuthResponseSchemaError(label + ' must be a string.');
  }
  return value;
}

function requireBoolean(value, label) {
  if (typeof value !== 'boolean') {
    throw new AndroidLoginAuthResponseSchemaError(label + ' must be a boolean.');
  }
  return value;
}

function requireField(value, label) {
  if (typeof value !== 'string' || !androidLoginAuthFieldSet.has(value)) {
    throw new AndroidLoginAuthResponseSchemaError(
      label + ' must be a recognized Android LoginAuth field value.'
    );
  }
  return value;
}

function decodeOptionalNullable(object, field, label, decoder) {
  if (object[field] !== undefined && object[field] !== null) {
    object[field] = decoder(object[field], label + '.' + field);
  }
}

function decodeStringList(value, label) {
  if (!Array.isArray(value)) {
    throw new AndroidLoginAuthResponseSchemaError(label + ' must be an array.');
  }
  return value.map((item, index) => requireString(item, label + '[' + index + ']'));
}

function decodeFieldErrors(value, label) {
  const source = requireObject(value, label);
  const result = {};

  for (const key of Object.keys(source)) {
    requireField(key, label + ' key');
    Object.defineProperty(result, key, {
      configurable: true,
      enumerable: true,
      value: decodeStringList(source[key], label + '[' + JSON.stringify(key) + ']'),
      writable: true
    });
  }

  return result;
}

function decodeMetadataEntry(value, label) {
  const result = requireObject(value, label);
  decodeOptionalNullable(result, 'code', label, requireString);
  decodeOptionalNullable(result, 'type', label, requireString);
  decodeOptionalNullable(result, 'field', label, requireField);
  return result;
}

function decodeMetadata(value, label) {
  if (!Array.isArray(value)) {
    throw new AndroidLoginAuthResponseSchemaError(label + ' must be an array.');
  }
  return value.map((entry, index) => decodeMetadataEntry(entry, label + '[' + index + ']'));
}

/**
 * Decode the Android LoginAuth Lql8 error model found under a typed Lyl8
 * response's optional errors member. This intentionally does not decode
 * the polymorphic response's step-specific payload member.
 */
function decodeAndroidLoginAuthErrors(value) {
  if (value === undefined || value === null) return value;

  const result = requireObject(value, 'AndroidLoginAuthErrors');
  decodeOptionalNullable(result, 'isRecoverable', 'AndroidLoginAuthErrors', requireBoolean);
  decodeOptionalNullable(result, 'fieldErrors', 'AndroidLoginAuthErrors', decodeFieldErrors);
  decodeOptionalNullable(result, 'formErrors', 'AndroidLoginAuthErrors', decodeStringList);
  decodeOptionalNullable(result, 'metadata', 'AndroidLoginAuthErrors', decodeMetadata);
  return result;
}

/**
 * Decode only the source-traced about_you payload model. The enclosing Lyl8
 * response variant and its separate root errors member are handled elsewhere.
 */
function decodeAndroidLoginAuthAboutYouPayload(value) {
  if (value === undefined || value === null) return value;

  const result = requireObject(value, 'AndroidLoginAuthAboutYouPayload');
  decodeOptionalNullable(result, 'errors', 'AndroidLoginAuthAboutYouPayload', decodeAndroidLoginAuthErrors);
  if (result.fullName !== undefined) {
    result.fullName = requireString(result.fullName, 'AndroidLoginAuthAboutYouPayload.fullName');
  }
  return result;
}


const ANDROID_LOGIN_AUTH_EMAIL_VERIFICATION_MODES = Object.freeze([
  'onboarding',
  'post_onboarding_email_collection',
  'password_reset',
  'login_challenge',
  'post_signup',
  'post_registration',
  'passwordless_login',
  'passwordless_signup',
  'unknown'
]);

const ANDROID_LOGIN_AUTH_METHOD_TYPES = Object.freeze([
  'password',
  'passwordless_otp',
  'passkey',
  'unknown'
]);

const androidLoginAuthEmailVerificationModeSet =
  new Set(ANDROID_LOGIN_AUTH_EMAIL_VERIFICATION_MODES);
const androidLoginAuthMethodTypeSet = new Set(ANDROID_LOGIN_AUTH_METHOD_TYPES);

function requireEnum(value, label, allowedValues) {
  if (typeof value !== 'string' || !allowedValues.has(value)) {
    throw new AndroidLoginAuthResponseSchemaError(
      label + ' must be a recognized Android LoginAuth enum value.'
    );
  }
  return value;
}

function decodeAndroidLoginAuthPasskeyRequestOptions(value, label) {
  const result = requireObject(value, label);
  if (result.passkeyRequestOptions === undefined || result.passkeyRequestOptions === null) {
    throw new AndroidLoginAuthResponseSchemaError(
      label + '.passkeyRequestOptions is required and must be a JSON object.'
    );
  }
  result.passkeyRequestOptions = requireObject(
    result.passkeyRequestOptions,
    label + '.passkeyRequestOptions'
  );
  if (result.mfaRequestId === undefined) {
    throw new AndroidLoginAuthResponseSchemaError(
      label + '.mfaRequestId is required.'
    );
  }
  result.mfaRequestId = requireString(result.mfaRequestId, label + '.mfaRequestId');
  return result;
}

function decodeAndroidLoginAuthLoginMethod(value, label) {
  const result = requireObject(value, label);
  if (result.type === undefined) {
    throw new AndroidLoginAuthResponseSchemaError(label + '.type is required.');
  }

  result.type = requireEnum(result.type, label + '.type', androidLoginAuthMethodTypeSet);
  if (result.type === 'passkey') {
    decodeOptionalNullable(
      result,
      'challenge',
      label,
      decodeAndroidLoginAuthPasskeyRequestOptions
    );
  }
  return result;
}

/**
 * Decode the source-traced email_otp_verification payload. loginMethods
 * is a polymorphic Lmnk0 collection; this validator covers only the four
 * observed Lqnk0 discriminator values and their generated member schemas.
 */
function decodeAndroidLoginAuthLoginMethods(items, label) {
  if (!Array.isArray(items)) {
    throw new AndroidLoginAuthResponseSchemaError(label + ' must be an array.');
  }
  return items.map((item, index) =>
    decodeAndroidLoginAuthLoginMethod(item, label + '[' + index + ']')
  );
}

function decodeAndroidLoginAuthVerificationPayload(value, label, modeField) {
  if (value === undefined || value === null) return value;

  const result = requireObject(value, label);
  decodeOptionalNullable(result, 'errors', label, decodeAndroidLoginAuthErrors);
  decodeOptionalNullable(
    result,
    modeField,
    label,
    (item, fieldLabel) => requireEnum(item, fieldLabel, androidLoginAuthEmailVerificationModeSet)
  );
  decodeOptionalNullable(
    result,
    'loginMethods',
    label,
    decodeAndroidLoginAuthLoginMethods
  );
  return result;
}

function decodeAndroidLoginAuthPasswordPayload(value, label) {
  if (value === undefined || value === null) return value;

  const result = requireObject(value, label);
  decodeOptionalNullable(result, 'errors', label, decodeAndroidLoginAuthErrors);
  decodeOptionalNullable(
    result,
    'loginMethods',
    label,
    decodeAndroidLoginAuthLoginMethods
  );
  return result;
}

function decodeAndroidLoginAuthCreateAccountPasswordPayload(value) {
  return decodeAndroidLoginAuthPasswordPayload(
    value,
    'AndroidLoginAuthCreateAccountPasswordPayload'
  );
}

function decodeAndroidLoginAuthLoginPasswordPayload(value) {
  return decodeAndroidLoginAuthPasswordPayload(
    value,
    'AndroidLoginAuthLoginPasswordPayload'
  );
}

function decodeAndroidLoginAuthEmailOtpPayload(value) {
  return decodeAndroidLoginAuthVerificationPayload(
    value,
    'AndroidLoginAuthEmailOtpPayload',
    'emailVerificationMode'
  );
}

/**
 * Decode the contact_verification payload. Its phoneVerificationMode uses
 * the same generated Lfer0 enum as emailVerificationMode, and the shared
 * LoginAuth consumer casts each loginMethods item to the same Lmnk0 model.
 */
function decodeAndroidLoginAuthContactVerificationPayload(value) {
  return decodeAndroidLoginAuthVerificationPayload(
    value,
    'AndroidLoginAuthContactVerificationPayload',
    'phoneVerificationMode'
  );
}

/**
 * Decode the external_url payload DTO. The generated serializer declares
 * one required, non-null String member named url. It is not a URL parser:
 * the Android model's member type is String, so preserve arbitrary strings.
 */
function decodeAndroidLoginAuthExternalUrlPayload(value) {
  const result = requireObject(value, 'AndroidLoginAuthExternalUrlPayload');
  if (result.url === undefined) {
    throw new AndroidLoginAuthResponseSchemaError(
      'AndroidLoginAuthExternalUrlPayload.url is required.'
    );
  }
  result.url = requireString(result.url, 'AndroidLoginAuthExternalUrlPayload.url');
  return result;
}

/**
 * Decode the token_exchange payload DTO. Its generated serializer exposes
 * one required, non-null String property named code.
 */
function decodeAndroidLoginAuthTokenExchangePayload(value) {
  const result = requireObject(value, 'AndroidLoginAuthTokenExchangePayload');
  if (result.code === undefined) {
    throw new AndroidLoginAuthResponseSchemaError(
      'AndroidLoginAuthTokenExchangePayload.code is required.'
    );
  }
  result.code = requireString(result.code, 'AndroidLoginAuthTokenExchangePayload.code');
  return result;
}

function requireNullableStringField(object, field, label) {
  if (!Object.prototype.hasOwnProperty.call(object, field)) {
    throw new AndroidLoginAuthResponseSchemaError(label + '.' + field + ' is required.');
  }
  if (object[field] !== null) {
    object[field] = requireString(object[field], label + '.' + field);
  }
}

function decodeAndroidLoginAuthWorkspaceEntry(value, label) {
  const result = requireObject(value, label);
  requireNullableStringField(result, 'id', label);
  requireNullableStringField(result, 'kind', label);

  if (result.name !== undefined) {
    result.name = requireString(result.name, label + '.name');
  }
  if (result.reauthentication !== undefined) {
    result.reauthentication = requireString(result.reauthentication, label + '.reauthentication');
  }
  return result;
}

function decodeAndroidLoginAuthWorkspaces(value, label) {
  if (!Array.isArray(value)) {
    throw new AndroidLoginAuthResponseSchemaError(label + ' must be an array.');
  }
  return value.map((entry, index) =>
    decodeAndroidLoginAuthWorkspaceEntry(entry, label + '[' + index + ']')
  );
}

/**
 * Decode the workspace payload. Its generated list serializer resolves to
 * List<Lxn8>; the item descriptor requires nullable id/kind and permits
 * optional non-null name/reauthentication strings.
 */
function decodeAndroidLoginAuthWorkspacePayload(value) {
  if (value === undefined || value === null) return value;

  const result = requireObject(value, 'AndroidLoginAuthWorkspacePayload');
  decodeOptionalNullable(result, 'errors', 'AndroidLoginAuthWorkspacePayload', decodeAndroidLoginAuthErrors);
  decodeOptionalNullable(
    result,
    'workspaces',
    'AndroidLoginAuthWorkspacePayload',
    decodeAndroidLoginAuthWorkspaces
  );
  return result;
}

/**
 * Decode the login_passkey payload. The generated serializer requires a
 * passkeyChallengeOption object, permits optional nullable errors, and
 * permits an omitted but non-null boolean fallbackAllowed.
 */
function decodeAndroidLoginAuthLoginPasskeyPayload(value) {
  const result = requireObject(value, 'AndroidLoginAuthLoginPasskeyPayload');
  decodeOptionalNullable(result, 'errors', 'AndroidLoginAuthLoginPasskeyPayload', decodeAndroidLoginAuthErrors);

  if (result.passkeyChallengeOption === undefined) {
    throw new AndroidLoginAuthResponseSchemaError(
      'AndroidLoginAuthLoginPasskeyPayload.passkeyChallengeOption is required.'
    );
  }
  result.passkeyChallengeOption = decodeAndroidLoginAuthPasskeyRequestOptions(
    result.passkeyChallengeOption,
    'AndroidLoginAuthLoginPasskeyPayload.passkeyChallengeOption'
  );

  if (result.fallbackAllowed !== undefined) {
    result.fallbackAllowed = requireBoolean(
      result.fallbackAllowed,
      'AndroidLoginAuthLoginPasskeyPayload.fallbackAllowed'
    );
  }
  return result;
}

module.exports = Object.freeze({
  ANDROID_LOGIN_AUTH_FIELDS,
  AndroidLoginAuthResponseSchemaError,
  ANDROID_LOGIN_AUTH_EMAIL_VERIFICATION_MODES,
  ANDROID_LOGIN_AUTH_METHOD_TYPES,
  decodeAndroidLoginAuthErrors,
  decodeAndroidLoginAuthAboutYouPayload,
  decodeAndroidLoginAuthEmailOtpPayload,
  decodeAndroidLoginAuthContactVerificationPayload,
  decodeAndroidLoginAuthCreateAccountPasswordPayload,
  decodeAndroidLoginAuthLoginPasswordPayload,
  decodeAndroidLoginAuthExternalUrlPayload,
  decodeAndroidLoginAuthTokenExchangePayload,
  decodeAndroidLoginAuthLoginPasskeyPayload,
  decodeAndroidLoginAuthWorkspacePayload
});
