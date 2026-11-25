'use strict';

const ACCOUNT_CHECK_PATH = '/backend-api/accounts/check/v4-2023-04-27';
const TRUSTED_ACCOUNT_PICTURE_PREFIX = /^https:\/\//;

class AndroidAuthenticationApiError extends Error {
  constructor(message, code = 'CHATGPT_ANDROID_AUTH_ERROR') {
    super(message);
    this.name = 'AndroidAuthenticationApiError';
    this.code = code;
  }
}

class AndroidAuthenticationApiSchemaError extends Error {
  constructor(message, code = 'CHATGPT_ANDROID_AUTH_INVALID_SCHEMA') {
    super(message);
    this.name = 'AndroidAuthenticationApiSchemaError';
    this.code = code;
  }
}

function requireObject(value, label) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new AndroidAuthenticationApiSchemaError(label + ' must be an object.');
  }
  return { ...value };
}

function requireString(value, label) {
  if (typeof value !== 'string') {
    throw new AndroidAuthenticationApiSchemaError(label + ' must be a string.');
  }
  return value;
}

function requireBoolean(value, label) {
  if (typeof value !== 'boolean') {
    throw new AndroidAuthenticationApiSchemaError(label + ' must be a boolean.');
  }
  return value;
}

function requireNullableString(value, label) {
  if (value !== null && typeof value !== 'string') {
    throw new AndroidAuthenticationApiSchemaError(label + ' must be a string or null.');
  }
  return value;
}

function decodeOptionalField(object, field, label, decoder) {
  if (object[field] !== undefined) object[field] = decoder(object[field], label + '.' + field);
}

function buildAccountCheckRequest() {
  return {
    method: 'GET',
    path: ACCOUNT_CHECK_PATH
  };
}

function decodeAccountCheckAccount(value, label = 'AccountCheckAccount') {
  const result = requireObject(value, label);
  decodeOptionalField(result, 'account_id', label, requireString);
  decodeOptionalField(result, 'account_user_id', label, requireNullableString);
  decodeOptionalField(result, 'is_deactivated', label, requireBoolean);
  decodeOptionalField(result, 'name', label, requireNullableString);
  decodeOptionalField(result, 'plan_type', label, requireString);
  decodeOptionalField(result, 'structure', label, requireNullableString);
  decodeOptionalField(result, 'profile_picture_url', label, requireNullableString);
  return result;
}

function decodeAccountCheckRecord(value, label = 'AccountCheckRecord') {
  const result = requireObject(value, label);
  if (result.account !== undefined) {
    result.account = decodeAccountCheckAccount(result.account, label + '.account');
  }
  decodeOptionalField(result, 'can_access_with_session', label, requireBoolean);
  return result;
}

function decodeAccountCheckAccounts(value, label = 'AccountCheckResponse.accounts') {
  const source = requireObject(value, label);
  const result = {};

  for (const key of Object.keys(source)) {
    Object.defineProperty(result, key, {
      configurable: true,
      enumerable: true,
      value: decodeAccountCheckRecord(source[key], label + '[' + JSON.stringify(key) + ']'),
      writable: true
    });
  }

  return result;
}

function decodeAccountCheckResponse(value) {
  const result = requireObject(value, 'AccountCheckResponse');

  if (result.accounts === undefined) {
    throw new AndroidAuthenticationApiSchemaError(
      'AccountCheckResponse.accounts is required.'
    );
  }

  result.accounts = decodeAccountCheckAccounts(result.accounts);

  // The generated decoder only treats undefined as omission. A present null
  // value is passed to the generated array decoder and is therefore rejected.
  if (result.account_ordering !== undefined) {
    if (!Array.isArray(result.account_ordering)) {
      throw new AndroidAuthenticationApiSchemaError(
        'AccountCheckResponse.account_ordering must be an array.'
      );
    }
    result.account_ordering = result.account_ordering.map((accountId, index) =>
      requireString(accountId, 'AccountCheckResponse.account_ordering[' + index + ']')
    );
  }

  return result;
}

function normalizeAccountCheckRecord(record, isValidAccountIdentifier) {
  if (record.can_access_with_session === false || record.account === undefined) {
    return undefined;
  }

  const account = record.account;
  const accountId = account.account_id;

  if (
    typeof accountId !== 'string' ||
    accountId.trim().length === 0 ||
    !isValidAccountIdentifier(accountId) ||
    account.is_deactivated === true
  ) {
    return undefined;
  }

  const name = typeof account.name === 'string' && account.name.trim().length > 0
    ? account.name
    : 'Personal account';
  const planLabel = typeof account.plan_type === 'string' && account.plan_type.trim().length > 0
    ? account.plan_type
    : undefined;

  const choice = {
    id: accountId,
    name
  };

  if (
    typeof account.account_user_id === 'string' &&
    isValidAccountIdentifier(account.account_user_id)
  ) {
    choice.accountUserId = account.account_user_id;
  }

  if (planLabel !== undefined) choice.planLabel = planLabel;

  if (account.structure === 'personal' || account.structure === 'workspace') {
    choice.isWorkspace = account.structure === 'workspace';
  }

  if (
    typeof account.profile_picture_url === 'string' &&
    TRUSTED_ACCOUNT_PICTURE_PREFIX.test(account.profile_picture_url)
  ) {
    choice.pictureURL = account.profile_picture_url;
  }

  return choice;
}

function resolveAccessibleAccounts(value, isValidAccountIdentifier) {
  if (typeof isValidAccountIdentifier !== 'function') {
    throw new TypeError('isValidAccountIdentifier must be a function.');
  }

  const response = decodeAccountCheckResponse(value);
  const accountIds = response.account_ordering === undefined
    ? []
    : [...response.account_ordering];

  // The Android controller appends every map key after account_ordering, then
  // deduplicates normalized account IDs while preserving this combined order.
  accountIds.push(...Object.keys(response.accounts));

  const seen = new Set();
  const choices = [];

  for (const mapKey of accountIds) {
    if (!Object.hasOwn(response.accounts, mapKey)) continue;

    const choice = normalizeAccountCheckRecord(
      response.accounts[mapKey],
      isValidAccountIdentifier
    );

    if (choice === undefined || seen.has(choice.id)) continue;
    seen.add(choice.id);
    choices.push(choice);
  }

  if (choices.length === 0) {
    throw new AndroidAuthenticationApiError(
      'The access token did not provide an accessible account.',
      'CHATGPT_ANDROID_AUTH_NO_ACCESSIBLE_ACCOUNT'
    );
  }

  return choices;
}

function selectInitialAccount(accounts, preferredAccountId) {
  if (!Array.isArray(accounts)) {
    throw new TypeError('accounts must be an array.');
  }

  const preferred = accounts.find((account) => account.id === preferredAccountId);
  return preferred === undefined ? accounts[0] : preferred;
}

module.exports = Object.freeze({
  ACCOUNT_CHECK_PATH,
  AndroidAuthenticationApiError,
  AndroidAuthenticationApiSchemaError,
  buildAccountCheckRequest,
  decodeAccountCheckAccount,
  decodeAccountCheckRecord,
  decodeAccountCheckAccounts,
  decodeAccountCheckResponse,
  resolveAccessibleAccounts,
  selectInitialAccount
});
