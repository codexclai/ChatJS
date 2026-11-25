'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const api = require('../src/chatgpt/android-authentication-api-schema.cjs');
const validation = require('../src/chatgpt/android-auth-validation.cjs');

const validAccount = {
  account_id: 'acct_a',
  account_user_id: 'user_a',
  is_deactivated: false,
  name: 'Personal account A',
  plan_type: 'plus',
  structure: 'personal',
  profile_picture_url: 'https://cdn.chatgpt.com/avatar.png',
  extra_account_field: { kept: true }
};

function response(accounts, accountOrdering) {
  return {
    accounts,
    ...(accountOrdering === undefined ? {} : { account_ordering: accountOrdering }),
    extra_response_field: 'kept'
  };
}

test('account-check request is the exact generated GET descriptor with no query or body', () => {
  assert.equal(api.ACCOUNT_CHECK_PATH, '/backend-api/accounts/check/v4-2023-04-27');
  assert.deepEqual(api.buildAccountCheckRequest(), {
    method: 'GET',
    path: '/backend-api/accounts/check/v4-2023-04-27'
  });
});

test('account-check response decodes an account map, string ordering, and preserves extensions', () => {
  const source = response({
    acct_a: { account: validAccount, can_access_with_session: true, extra_record_field: 7 },
    acct_b: { account: { account_id: 'acct_b' } }
  }, ['acct_b', 'acct_a']);

  const decoded = api.decodeAccountCheckResponse(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.accounts, source.accounts);
  assert.notEqual(decoded.accounts.acct_a, source.accounts.acct_a);
  assert.deepEqual(decoded.extra_response_field, 'kept');
  assert.deepEqual(decoded.accounts.acct_a.extra_record_field, 7);
  assert.deepEqual(decoded.accounts.acct_a.account.extra_account_field, { kept: true });
});

test('account-check accounts must be an object map rather than an array', () => {
  for (const accounts of [null, [], 'accounts', 1]) {
    assert.throws(() => api.decodeAccountCheckResponse({ accounts }), {
      name: 'AndroidAuthenticationApiSchemaError',
      code: 'CHATGPT_ANDROID_AUTH_INVALID_SCHEMA'
    });
  }
  assert.throws(() => api.decodeAccountCheckResponse({}));
  assert.throws(() => api.decodeAccountCheckResponse({ accounts: { acct_a: null } }));
});

test('account ordering is optional but present values must be an array of strings', () => {
  assert.deepEqual(api.decodeAccountCheckResponse({ accounts: {} }), { accounts: {} });
  assert.throws(() => api.decodeAccountCheckResponse({ accounts: {}, account_ordering: null }));
  assert.throws(() => api.decodeAccountCheckResponse({ accounts: {}, account_ordering: 'acct_a' }));
  assert.throws(() => api.decodeAccountCheckResponse({
    accounts: {},
    account_ordering: ['acct_a', null]
  }));
});

test('account metadata has exact optional string, nullable-string, and boolean types', () => {
  assert.deepEqual(api.decodeAccountCheckAccount({}), {});
  assert.deepEqual(api.decodeAccountCheckAccount({
    account_id: 'acct_a',
    account_user_id: null,
    is_deactivated: false,
    name: null,
    plan_type: 'plus',
    structure: null,
    profile_picture_url: null
  }), {
    account_id: 'acct_a',
    account_user_id: null,
    is_deactivated: false,
    name: null,
    plan_type: 'plus',
    structure: null,
    profile_picture_url: null
  });

  for (const invalid of [
    { account_id: null },
    { account_id: 42 },
    { account_user_id: 42 },
    { is_deactivated: null },
    { is_deactivated: 'false' },
    { name: 42 },
    { plan_type: null },
    { structure: false },
    { profile_picture_url: 42 }
  ]) {
    assert.throws(() => api.decodeAccountCheckAccount(invalid));
  }
});

test('record account is optional but cannot be null; session-access flag is optional boolean', () => {
  assert.deepEqual(api.decodeAccountCheckRecord({}), {});
  assert.deepEqual(api.decodeAccountCheckRecord({ can_access_with_session: false }), {
    can_access_with_session: false
  });
  assert.throws(() => api.decodeAccountCheckRecord({ account: null }));
  assert.throws(() => api.decodeAccountCheckRecord({ can_access_with_session: null }));
});

test('controller account normalization follows explicit ordering then remaining map keys', () => {
  const source = response({
    acct_a: { account: { ...validAccount, name: ' A ' }, can_access_with_session: true },
    acct_b: { account: { account_id: 'acct_b', is_deactivated: false } },
    acct_c: { account: { account_id: 'acct_c' } }
  }, ['acct_b', 'missing', 'acct_a']);

  const choices = api.resolveAccessibleAccounts(source, validation.isValidOAIAccountIdentifier);
  assert.deepEqual(choices.map((account) => account.id), ['acct_b', 'acct_a', 'acct_c']);
  assert.equal(choices[1].name, ' A ');
});

test('controller drops records that explicitly deny session access or are deactivated', () => {
  const choices = api.resolveAccessibleAccounts(response({
    blocked: { account: { account_id: 'acct_blocked' }, can_access_with_session: false },
    deactivated: { account: { account_id: 'acct_deactivated', is_deactivated: true } },
    active: { account: { account_id: 'acct_active', is_deactivated: false }, can_access_with_session: true },
    unknown_access_flag: { account: { account_id: 'acct_unknown' } }
  }), validation.isValidOAIAccountIdentifier);

  assert.deepEqual(choices.map((account) => account.id), ['acct_active', 'acct_unknown']);
});

test('controller validates account IDs and normalizes names, plan, structure and picture URL', () => {
  const choices = api.resolveAccessibleAccounts(response({
    a: {
      account: {
        account_id: 'acct_a',
        account_user_id: 'bad/id',
        name: '  ',
        plan_type: ' plus ',
        structure: 'workspace',
        profile_picture_url: 'https://images.chatgpt.com/a.png'
      }
    },
    b: { account: { account_id: 'acct_b', name: ' B ', structure: 'unknown' } },
    c: { account: { account_id: 'acct_c', profile_picture_url: 'http://images.chatgpt.com/a.png' } }
  }), validation.isValidOAIAccountIdentifier);

  assert.deepEqual(choices[0], {
    id: 'acct_a',
    name: 'Personal account',
    planLabel: ' plus ',
    isWorkspace: true,
    pictureURL: 'https://images.chatgpt.com/a.png'
  });
  assert.deepEqual(choices[1], { id: 'acct_b', name: ' B ' });
  assert.equal(choices[2].pictureURL, undefined);
});

test('controller deduplicates choices by normalized account ID', () => {
  const choices = api.resolveAccessibleAccounts(response({
    first_key: { account: { account_id: 'acct_same', name: 'First' } },
    second_key: { account: { account_id: 'acct_same', name: 'Second' } }
  }, ['second_key', 'first_key']), validation.isValidOAIAccountIdentifier);

  assert.deepEqual(choices.map((account) => account.name), ['Second']);
});

test('initial sign-in prefers the credential account ID and falls back to the first eligible account', () => {
  const choices = [
    { id: 'acct_second', name: 'Second' },
    { id: 'acct_first', name: 'First' }
  ];

  assert.equal(api.selectInitialAccount(choices, 'acct_first'), choices[1]);
  assert.equal(api.selectInitialAccount(choices, 'unknown'), choices[0]);
  assert.equal(api.selectInitialAccount([], 'unknown'), undefined);
});


test('controller reports the source-matched invalid-response outcome when no account is accessible', () => {
  assert.throws(() => api.resolveAccessibleAccounts(response({
    blocked: { account: { account_id: 'acct_blocked' }, can_access_with_session: false },
    deactivated: { account: { account_id: 'acct_deactivated', is_deactivated: true } }
  }), validation.isValidOAIAccountIdentifier), {
    name: 'AndroidAuthenticationApiError',
    code: 'CHATGPT_ANDROID_AUTH_NO_ACCESSIBLE_ACCOUNT',
    message: 'The access token did not provide an accessible account.'
  });
});
