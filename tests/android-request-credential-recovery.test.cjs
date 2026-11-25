'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const recovery = require('../src/chatgpt/android-request-credential-recovery.cjs');

const { RecoveryAction: Action } = recovery;

function response(value) {
  return JSON.stringify(value);
}

const apiError = (fields = {}) => ({ message: 'Request rejected', ...fields });

test('recovery actions expose the four source-defined outcomes', () => {
  assert.deepEqual(Action, {
    None: 'None',
    Renew: 'Renew',
    Revoked: 'Revoked',
    RequiresSSO: 'RequiresSSO'
  });
});

test('ErrorEnvelope decodes optional detail and top-level APIError objects', () => {
  assert.deepEqual(recovery.decodeRequestCredentialErrorEnvelope({}), {});
  assert.deepEqual(recovery.decodeRequestCredentialErrorEnvelope({
    detail: { code: 'token_expired', error: apiError({ code: 'ignored', type: 'ignored-type' }) },
    error: apiError({ code: 'top-level', type: 'top-level-type' })
  }), {
    detail: { code: 'token_expired', error: apiError({ code: 'ignored', type: 'ignored-type' }) },
    error: apiError({ code: 'top-level', type: 'top-level-type' })
  });
});

test('APIError requires message while optional code and type must be strings when present', () => {
  assert.deepEqual(recovery.decodeAPIError({ message: 'failed' }), { message: 'failed' });
  assert.deepEqual(recovery.decodeAPIError({ message: 'failed', code: 'X', type: 'Y' }), {
    message: 'failed', code: 'X', type: 'Y'
  });
  assert.throws(() => recovery.decodeAPIError({ code: 'missing-message' }), {
    name: 'AndroidRequestCredentialSchemaError'
  });
  assert.throws(() => recovery.decodeAPIError({ message: 'failed', code: 7 }), {
    name: 'AndroidRequestCredentialSchemaError'
  });
  assert.throws(() => recovery.decodeAPIError({ message: 'failed', type: false }), {
    name: 'AndroidRequestCredentialSchemaError'
  });
});

test('detail.code is an optional but non-resilient string; malformed code drops the detail object', () => {
  assert.deepEqual(recovery.decodeRequestCredentialErrorEnvelope({ detail: { code: 'token_expired' } }), {
    detail: { code: 'token_expired' }
  });
  assert.deepEqual(recovery.decodeRequestCredentialErrorEnvelope({ detail: { code: 4 } }), {});
});

test('optional resilient nested APIError objects are dropped when a non-resilient member is invalid', () => {
  assert.deepEqual(recovery.decodeRequestCredentialErrorEnvelope({
    detail: { error: { code: 7 } },
    error: { message: 'top-level', type: false }
  }), {
    detail: {}
  });
});

test('detail.error.code token_revoked and token_invalidated classify as Revoked', () => {
  for (const code of ['token_revoked', 'token_invalidated']) {
    assert.equal(classify({ detail: { error: apiError({ code }) } }), Action.Revoked);
  }
});

function classify(value) {
  return recovery.classifyRejectedCredential(response(value));
}

test('detail.error branch does not classify by type or fall through to top-level errors', () => {
  assert.equal(classify({
    detail: { error: apiError({ type: 'token_revoked' }) },
    error: apiError({ code: 'token_revoked' })
  }), Action.None);
  assert.equal(classify({
    detail: { error: apiError({ code: 'other_error' }) },
    error: apiError({ code: 'token_revoked' })
  }), Action.None);
});

test('a malformed detail object is discarded and allows the top-level error branch', () => {
  assert.equal(classify({
    detail: { code: 7 },
    error: apiError({ code: 'token_revoked' })
  }), Action.Revoked);
});

test('a malformed resilient detail.error is discarded before the detail.code branch', () => {
  assert.equal(classify({
    detail: {
      error: { code: 7 },
      code: 'token_expired'
    }
  }), Action.Renew);
});

test('detail.code classifies SSO and token expiry but not revocation codes', () => {
  assert.equal(classify({ detail: { code: 'require_sso_login' } }), Action.RequiresSSO);
  assert.equal(classify({ detail: { code: 'token_expired' } }), Action.Renew);
  assert.equal(classify({ detail: { code: 'token_revoked' } }), Action.None);
});

test('an unrecognized detail.code does not fall through to a top-level error', () => {
  assert.equal(classify({
    detail: { code: 'some_other_condition' },
    error: apiError({ code: 'token_revoked' })
  }), Action.None);
});

test('top-level APIError recognizes revoked/invalidated code or type', () => {
  assert.equal(classify({ error: apiError({ code: 'token_revoked' }) }), Action.Revoked);
  assert.equal(classify({ error: apiError({ code: 'token_invalidated' }) }), Action.Revoked);
  assert.equal(classify({ error: apiError({ type: 'token_revoked' }) }), Action.Revoked);
  assert.equal(classify({ error: apiError({ type: 'token_invalidated' }) }), Action.Revoked);
});

test('top-level APIError recognizes SSO code or type but deliberately not token_expired', () => {
  assert.equal(classify({ error: apiError({ code: 'require_sso_login' }) }), Action.RequiresSSO);
  assert.equal(classify({ error: apiError({ type: 'require_sso_login' }) }), Action.RequiresSSO);
  assert.equal(classify({ error: apiError({ code: 'token_expired' }) }), Action.None);
  assert.equal(classify({ error: apiError({ type: 'token_expired' }) }), Action.None);
});

test('absent, malformed JSON and schema-invalid response bodies classify as None', () => {
  assert.equal(recovery.classifyRejectedCredential(undefined), Action.None);
  assert.equal(recovery.classifyRejectedCredential('{'), Action.None);
  assert.equal(recovery.classifyRejectedCredential('[]'), Action.None);
  assert.equal(recovery.classifyRejectedCredential('null'), Action.None);
  assert.equal(recovery.classifyRejectedCredential(response({ detail: { code: 42 } })), Action.None);
});

test('recovery plan only permits renewal when caller explicitly passes true', () => {
  assert.deepEqual(recovery.describeRejectedCredentialRecovery(response({
    detail: { code: 'token_expired' }
  }), true), {
    action: Action.Renew,
    shouldReportRevoked: false,
    requiresSSO: false,
    shouldRenewAccessToken: true
  });
  assert.equal(recovery.describeRejectedCredentialRecovery(response({
    detail: { code: 'token_expired' }
  }), false).shouldRenewAccessToken, false);
  assert.equal(recovery.describeRejectedCredentialRecovery(response({
    detail: { code: 'token_expired' }
  }), undefined).shouldRenewAccessToken, false);
  assert.equal(recovery.describeRejectedCredentialRecovery(response({
    detail: { code: 'token_expired' }
  }), 1).shouldRenewAccessToken, true);
});

test('recovery plan maps Revoked and RequiresSSO to invalidation with distinct SSO flag', () => {
  assert.deepEqual(recovery.describeRejectedCredentialRecovery(response({
    detail: { error: apiError({ code: 'token_invalidated' }) }
  }), true), {
    action: Action.Revoked,
    shouldReportRevoked: true,
    requiresSSO: false,
    shouldRenewAccessToken: false
  });
  assert.deepEqual(recovery.describeRejectedCredentialRecovery(response({
    detail: { code: 'require_sso_login' }
  }), true), {
    action: Action.RequiresSSO,
    shouldReportRevoked: true,
    requiresSSO: true,
    shouldRenewAccessToken: false
  });
});

test('recovery plan for None is side-effect free', () => {
  assert.deepEqual(recovery.describeRejectedCredentialRecovery('{bad json', true), {
    action: Action.None,
    shouldReportRevoked: false,
    requiresSSO: false,
    shouldRenewAccessToken: false
  });
});
