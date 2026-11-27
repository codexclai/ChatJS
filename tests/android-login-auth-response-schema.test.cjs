'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const schema = require('../src/chatgpt/android-login-auth-response-schema.cjs');

const {
  decodeAndroidLoginAuthErrors,
  decodeAndroidLoginAuthAboutYouPayload,
  AndroidLoginAuthResponseSchemaError
} = schema;

function invalid(value, pathFragment) {
  assert.throws(() => decodeAndroidLoginAuthErrors(value), (error) => {
    assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
    assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
    if (pathFragment) assert.match(error.message, new RegExp(pathFragment));
    return true;
  });
}

test('Android LoginAuth error schema exposes the exact field enum values', () => {
  assert.deepEqual(schema.ANDROID_LOGIN_AUTH_FIELDS, [
    'password', 'confirm_password', 'code', 'birthday', 'username', 'email',
    'country_code', 'phone', 'name', 'consent', 'recovery_key', 'unknown'
  ]);
  assert.ok(Object.isFrozen(schema.ANDROID_LOGIN_AUTH_FIELDS));
});

test('error object decodes nullable boolean, field-error map, form errors and metadata', () => {
  const source = {
    isRecoverable: true,
    fieldErrors: {
      email: ['Invalid email address'],
      confirm_password: ['Passwords do not match']
    },
    formErrors: ['Unable to continue'],
    metadata: [
      { code: 'invalid_email', type: 'validation', field: 'email' },
      { code: null, type: 'warning', field: null },
      {}
    ],
    extra: { retained: true }
  };

  const decoded = decodeAndroidLoginAuthErrors(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.fieldErrors, source.fieldErrors);
  assert.notEqual(decoded.fieldErrors.email, source.fieldErrors.email);
  assert.notEqual(decoded.metadata, source.metadata);
  assert.notEqual(decoded.metadata[0], source.metadata[0]);
  assert.deepEqual(decoded.extra, source.extra);
});

test('the whole errors member and all generated optional nullable fields accept omission or null', () => {
  assert.equal(decodeAndroidLoginAuthErrors(undefined), undefined);
  assert.equal(decodeAndroidLoginAuthErrors(null), null);
  assert.deepEqual(decodeAndroidLoginAuthErrors({}), {});
  assert.deepEqual(decodeAndroidLoginAuthErrors({
    isRecoverable: null,
    fieldErrors: null,
    formErrors: null,
    metadata: null
  }), {
    isRecoverable: null,
    fieldErrors: null,
    formErrors: null,
    metadata: null
  });
});

test('known field enum values are required for field-error keys and metadata field values', () => {
  for (const field of schema.ANDROID_LOGIN_AUTH_FIELDS) {
    assert.deepEqual(decodeAndroidLoginAuthErrors({ fieldErrors: { [field]: [] } }), {
      fieldErrors: { [field]: [] }
    });
    assert.deepEqual(decodeAndroidLoginAuthErrors({ metadata: [{ field }] }), {
      metadata: [{ field }]
    });
  }
  invalid({ fieldErrors: { not_a_login_field: ['bad'] } }, 'recognized Android LoginAuth field');
  invalid({ metadata: [{ field: 'not_a_login_field' }] }, 'recognized Android LoginAuth field');
});

test('malformed error objects and nested value types are rejected', () => {
  for (const value of [false, 1, 'errors', []]) invalid(value, 'must be an object');
  invalid({ isRecoverable: 'true' }, 'isRecoverable must be a boolean');
  invalid({ fieldErrors: [] }, 'fieldErrors must be an object');
  invalid({ fieldErrors: { email: 'not a list' } }, 'must be an array');
  invalid({ fieldErrors: { email: [null] } }, 'must be a string');
  invalid({ formErrors: 'not a list' }, 'formErrors must be an array');
  invalid({ formErrors: [null] }, 'formErrors.*must be a string');
  invalid({ metadata: {} }, 'metadata must be an array');
  invalid({ metadata: [null] }, 'metadata.*must be an object');
  invalid({ metadata: [{ code: 1 }] }, 'metadata.*code must be a string');
  invalid({ metadata: [{ type: false }] }, 'metadata.*type must be a string');
});

test('decoder does not mutate its input or permit prototype-key map injection', () => {
  const source = JSON.parse('{"fieldErrors":{"email":["bad"]}}');
  const originalList = source.fieldErrors.email;
  const decoded = decodeAndroidLoginAuthErrors(source);
  assert.notEqual(decoded.fieldErrors.email, originalList);
  assert.deepEqual(source, { fieldErrors: { email: ['bad'] } });
  invalid(JSON.parse('{"fieldErrors":{"__proto__":["bad"]}}'));
});


test('about_you payload decodes optional fullName and a distinct nullable nested errors model', () => {
  const source = {
    fullName: 'Ada Lovelace',
    errors: {
      formErrors: ['Additional details required'],
      fieldErrors: { name: ['Use your legal name'] }
    },
    extension: 'preserved'
  };
  const decoded = decodeAndroidLoginAuthAboutYouPayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.errors, source.errors);
  assert.equal(decoded.extension, 'preserved');
  assert.deepEqual(decodeAndroidLoginAuthAboutYouPayload({}), {});
  assert.deepEqual(decodeAndroidLoginAuthAboutYouPayload({ errors: null }), { errors: null });
  assert.deepEqual(decodeAndroidLoginAuthAboutYouPayload({ fullName: 'Ada' }), { fullName: 'Ada' });
});

test('about_you payload rejects a non-string fullName and malformed nested errors', () => {
  assert.throws(() => decodeAndroidLoginAuthAboutYouPayload({ fullName: null }), (error) => {
    assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
    assert.match(error.message, /fullName must be a string/);
    return true;
  });
  assert.throws(() => decodeAndroidLoginAuthAboutYouPayload({ errors: { isRecoverable: 'yes' } }), (error) => {
    assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
    assert.match(error.message, /isRecoverable must be a boolean/);
    return true;
  });
});
