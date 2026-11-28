'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const schema = require('../src/chatgpt/android-login-auth-response-schema.cjs');

const {
  decodeAndroidLoginAuthErrors,
  decodeAndroidLoginAuthAboutYouPayload,
  decodeAndroidLoginAuthEmailOtpPayload,
  decodeAndroidLoginAuthContactVerificationPayload,
  decodeAndroidLoginAuthCreateAccountPasswordPayload,
  decodeAndroidLoginAuthLoginPasswordPayload,
  decodeAndroidLoginAuthExternalUrlPayload,
  decodeAndroidLoginAuthTokenExchangePayload,
  decodeAndroidLoginAuthLoginPasskeyPayload,
  decodeAndroidLoginAuthWorkspacePayload,
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


test('email_otp_verification payload exposes exact verification mode and login method enums', () => {
  assert.deepEqual(schema.ANDROID_LOGIN_AUTH_EMAIL_VERIFICATION_MODES, [
    'onboarding', 'post_onboarding_email_collection', 'password_reset',
    'login_challenge', 'post_signup', 'post_registration',
    'passwordless_login', 'passwordless_signup', 'unknown'
  ]);
  assert.deepEqual(schema.ANDROID_LOGIN_AUTH_METHOD_TYPES, [
    'password', 'passwordless_otp', 'passkey', 'unknown'
  ]);
});

test('email OTP payload decodes nullable errors, verification mode and polymorphic login methods', () => {
  const source = {
    errors: { formErrors: ['A code is required'] },
    emailVerificationMode: 'login_challenge',
    loginMethods: [
      { type: 'password' },
      { type: 'passwordless_otp' },
      {
        type: 'passkey',
        challenge: {
          passkeyRequestOptions: {
            challenge: 'abc',
            rpId: 'chatgpt.com',
            allowCredentials: []
          },
          mfaRequestId: 'mfa-request-1'
        }
      },
      { type: 'unknown' }
    ],
    extension: { retained: true }
  };

  const decoded = decodeAndroidLoginAuthEmailOtpPayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.loginMethods, source.loginMethods);
  assert.notEqual(decoded.loginMethods[2], source.loginMethods[2]);
  assert.notEqual(decoded.loginMethods[2].challenge, source.loginMethods[2].challenge);
  assert.notEqual(
    decoded.loginMethods[2].challenge.passkeyRequestOptions,
    source.loginMethods[2].challenge.passkeyRequestOptions
  );
  assert.deepEqual(decoded.extension, source.extension);
});

test('email OTP payload preserves omitted and nullable generated properties', () => {
  assert.equal(decodeAndroidLoginAuthEmailOtpPayload(undefined), undefined);
  assert.equal(decodeAndroidLoginAuthEmailOtpPayload(null), null);
  assert.deepEqual(decodeAndroidLoginAuthEmailOtpPayload({}), {});
  assert.deepEqual(decodeAndroidLoginAuthEmailOtpPayload({
    errors: null,
    emailVerificationMode: null,
    loginMethods: null
  }), {
    errors: null,
    emailVerificationMode: null,
    loginMethods: null
  });
  for (const mode of schema.ANDROID_LOGIN_AUTH_EMAIL_VERIFICATION_MODES) {
    assert.deepEqual(
      decodeAndroidLoginAuthEmailOtpPayload({ emailVerificationMode: mode }),
      { emailVerificationMode: mode }
    );
  }
});

test('email OTP payload rejects malformed enum values and polymorphic collection entries', () => {
  const invalidValues = [
    [{ emailVerificationMode: 'not-a-mode' }, /recognized Android LoginAuth enum/],
    [{ loginMethods: {} }, /loginMethods must be an array/],
    [{ loginMethods: [null] }, /must be an object/],
    [{ loginMethods: [{}] }, /type is required/],
    [{ loginMethods: [{ type: 'not-a-method' }] }, /recognized Android LoginAuth enum/]
  ];
  for (const [value, pattern] of invalidValues) {
    assert.throws(() => decodeAndroidLoginAuthEmailOtpPayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.match(error.message, pattern);
      return true;
    });
  }
});

test('passkey login method permits omitted or null challenge but validates a present challenge', () => {
  assert.deepEqual(decodeAndroidLoginAuthEmailOtpPayload({
    loginMethods: [{ type: 'passkey' }]
  }), {
    loginMethods: [{ type: 'passkey' }]
  });
  assert.deepEqual(decodeAndroidLoginAuthEmailOtpPayload({
    loginMethods: [{ type: 'passkey', challenge: null }]
  }), {
    loginMethods: [{ type: 'passkey', challenge: null }]
  });

  const invalidValues = [
    [{ type: 'passkey', challenge: 'bad' }, /challenge must be an object/],
    [{ type: 'passkey', challenge: {} }, /passkeyRequestOptions is required/],
    [{ type: 'passkey', challenge: { passkeyRequestOptions: [] } }, /passkeyRequestOptions must be an object/],
    [{ type: 'passkey', challenge: { passkeyRequestOptions: {}, mfaRequestId: null } }, /mfaRequestId must be a string/],
    [{ type: 'passkey', challenge: { passkeyRequestOptions: {} } }, /mfaRequestId is required/]
  ];
  for (const [method, pattern] of invalidValues) {
    assert.throws(() => decodeAndroidLoginAuthEmailOtpPayload({
      loginMethods: [method]
    }), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.match(error.message, pattern);
      return true;
    });
  }
});


test('contact_verification payload uses the shared Lfer0 phone mode and Lmnk0 login-method schema', () => {
  const source = {
    errors: { formErrors: ['A phone number is required'] },
    phoneVerificationMode: 'post_onboarding_email_collection',
    loginMethods: [
      { type: 'password' },
      { type: 'passwordless_otp' },
      {
        type: 'passkey',
        challenge: {
          passkeyRequestOptions: { challenge: 'phone-flow-challenge', rpId: 'chatgpt.com' },
          mfaRequestId: 'phone-mfa-request'
        }
      },
      { type: 'unknown' }
    ],
    extension: true
  };
  const decoded = decodeAndroidLoginAuthContactVerificationPayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.errors, source.errors);
  assert.notEqual(decoded.loginMethods, source.loginMethods);
  assert.notEqual(decoded.loginMethods[2].challenge, source.loginMethods[2].challenge);
  assert.deepEqual(decoded.extension, true);
});

test('contact_verification payload preserves optional nullable generated fields and shared verification modes', () => {
  assert.equal(decodeAndroidLoginAuthContactVerificationPayload(undefined), undefined);
  assert.equal(decodeAndroidLoginAuthContactVerificationPayload(null), null);
  assert.deepEqual(decodeAndroidLoginAuthContactVerificationPayload({}), {});
  assert.deepEqual(decodeAndroidLoginAuthContactVerificationPayload({
    errors: null,
    phoneVerificationMode: null,
    loginMethods: null
  }), {
    errors: null,
    phoneVerificationMode: null,
    loginMethods: null
  });
  for (const mode of schema.ANDROID_LOGIN_AUTH_EMAIL_VERIFICATION_MODES) {
    assert.deepEqual(
      decodeAndroidLoginAuthContactVerificationPayload({ phoneVerificationMode: mode }),
      { phoneVerificationMode: mode }
    );
  }
});

test('contact_verification payload rejects malformed mode, login methods and nested passkey challenge', () => {
  const invalidValues = [
    [{ phoneVerificationMode: 'sms_only' }, /recognized Android LoginAuth enum/],
    [{ phoneVerificationMode: 1 }, /recognized Android LoginAuth enum/],
    [{ loginMethods: {} }, /loginMethods must be an array/],
    [{ loginMethods: [null] }, /must be an object/],
    [{ loginMethods: [{ type: 'email' }] }, /recognized Android LoginAuth enum/],
    [{ loginMethods: [{ type: 'passkey', challenge: {} }] }, /passkeyRequestOptions is required/]
  ];
  for (const [value, pattern] of invalidValues) {
    assert.throws(() => decodeAndroidLoginAuthContactVerificationPayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
      assert.match(error.message, pattern);
      return true;
    });
  }
});


test('external_url payload decodes the source-traced required url string and preserves extensions', () => {
  const source = {
    url: 'https://auth.openai.com/authorize?flow=example',
    extension: { preserved: true }
  };
  const decoded = decodeAndroidLoginAuthExternalUrlPayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.equal(decoded.extension, source.extension);
  assert.equal(decoded.url, source.url);
});

test('external_url payload requires a non-null string url but does not assume URL validation', () => {
  assert.deepEqual(decodeAndroidLoginAuthExternalUrlPayload({ url: '' }), { url: '' });
  assert.deepEqual(decodeAndroidLoginAuthExternalUrlPayload({ url: 'not parsed here' }), {
    url: 'not parsed here'
  });
  for (const value of [undefined, null, false, 1, 'https://example.test', []]) {
    assert.throws(() => decodeAndroidLoginAuthExternalUrlPayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.match(error.message, /must be an object/);
      return true;
    });
  }
  for (const value of [{}, { url: null }, { url: 1 }, { url: false }]) {
    assert.throws(() => decodeAndroidLoginAuthExternalUrlPayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
      assert.match(error.message, /url (is required|must be a string)/);
      return true;
    });
  }
});


test('token_exchange payload decodes the required code string and preserves extension data', () => {
  const source = { code: 'authorization-code', extension: { keep: true } };
  const decoded = decodeAndroidLoginAuthTokenExchangePayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.equal(decoded.extension, source.extension);
  assert.equal(decoded.code, 'authorization-code');
});

test('token_exchange payload requires a non-null string code without adding format assumptions', () => {
  assert.deepEqual(decodeAndroidLoginAuthTokenExchangePayload({ code: '' }), { code: '' });
  assert.deepEqual(decodeAndroidLoginAuthTokenExchangePayload({ code: 'opaque value' }), {
    code: 'opaque value'
  });
  for (const value of [undefined, null, false, 1, 'code', []]) {
    assert.throws(() => decodeAndroidLoginAuthTokenExchangePayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.match(error.message, /must be an object/);
      return true;
    });
  }
  for (const value of [{}, { code: null }, { code: 1 }, { code: false }]) {
    assert.throws(() => decodeAndroidLoginAuthTokenExchangePayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
      assert.match(error.message, /code (is required|must be a string)/);
      return true;
    });
  }
});


test('create_account_password payload reuses the nullable errors and Lmnk0 login-method schemas', () => {
  const source = {
    errors: { formErrors: ['Password is required'] },
    loginMethods: [
      { type: 'password' },
      { type: 'passwordless_otp' },
      {
        type: 'passkey',
        challenge: {
          passkeyRequestOptions: { challenge: 'create-account', rpId: 'chatgpt.com' },
          mfaRequestId: 'create-account-mfa'
        }
      },
      { type: 'unknown' }
    ],
    extension: { retained: true }
  };
  const decoded = decodeAndroidLoginAuthCreateAccountPasswordPayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.errors, source.errors);
  assert.notEqual(decoded.loginMethods, source.loginMethods);
  assert.notEqual(decoded.loginMethods[2].challenge, source.loginMethods[2].challenge);
  assert.equal(decoded.extension, source.extension);
  assert.equal(decodeAndroidLoginAuthCreateAccountPasswordPayload(undefined), undefined);
  assert.equal(decodeAndroidLoginAuthCreateAccountPasswordPayload(null), null);
  assert.deepEqual(decodeAndroidLoginAuthCreateAccountPasswordPayload({}), {});
  assert.deepEqual(decodeAndroidLoginAuthCreateAccountPasswordPayload({
    errors: null,
    loginMethods: null
  }), { errors: null, loginMethods: null });
});

test('create_account_password payload rejects malformed errors and loginMethods values', () => {
  for (const [value, pattern] of [
    [{ errors: false }, /AndroidLoginAuthErrors must be an object/],
    [{ loginMethods: {} }, /AndroidLoginAuthCreateAccountPasswordPayload.*must be an array/],
    [{ loginMethods: [null] }, /AndroidLoginAuthCreateAccountPasswordPayload.*must be an object/],
    [{ loginMethods: [{ type: 'not-a-method' }] }, /recognized Android LoginAuth enum/],
    [{ loginMethods: [{ type: 'passkey', challenge: {} }] }, /passkeyRequestOptions is required/]
  ]) {
    assert.throws(() => decodeAndroidLoginAuthCreateAccountPasswordPayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
      assert.match(error.message, pattern);
      return true;
    });
  }
});

test('login_password payload reuses the nullable errors and Lmnk0 login-method schemas', () => {
  const source = {
    errors: { fieldErrors: { password: ['Try another password'] } },
    loginMethods: [
      { type: 'password' },
      { type: 'passwordless_otp' },
      {
        type: 'passkey',
        challenge: {
          passkeyRequestOptions: { challenge: 'login', rpId: 'chatgpt.com' },
          mfaRequestId: 'login-mfa'
        }
      },
      { type: 'unknown' }
    ],
    extension: 'preserved'
  };
  const decoded = decodeAndroidLoginAuthLoginPasswordPayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.errors, source.errors);
  assert.notEqual(decoded.loginMethods, source.loginMethods);
  assert.notEqual(decoded.loginMethods[2].challenge, source.loginMethods[2].challenge);
  assert.equal(decoded.extension, source.extension);
  assert.equal(decodeAndroidLoginAuthLoginPasswordPayload(undefined), undefined);
  assert.equal(decodeAndroidLoginAuthLoginPasswordPayload(null), null);
  assert.deepEqual(decodeAndroidLoginAuthLoginPasswordPayload({}), {});
  assert.deepEqual(decodeAndroidLoginAuthLoginPasswordPayload({
    errors: null,
    loginMethods: null
  }), { errors: null, loginMethods: null });
});

test('login_password payload rejects malformed errors and loginMethods values', () => {
  for (const [value, pattern] of [
    [{ errors: [] }, /AndroidLoginAuthErrors must be an object/],
    [{ loginMethods: {} }, /AndroidLoginAuthLoginPasswordPayload.*must be an array/],
    [{ loginMethods: [false] }, /AndroidLoginAuthLoginPasswordPayload.*must be an object/],
    [{ loginMethods: [{ type: 'email' }] }, /recognized Android LoginAuth enum/],
    [{ loginMethods: [{ type: 'passkey', challenge: { mfaRequestId: 'missing-options' } }] }, /passkeyRequestOptions is required/]
  ]) {
    assert.throws(() => decodeAndroidLoginAuthLoginPasswordPayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
      assert.match(error.message, pattern);
      return true;
    });
  }
});


test('login_passkey payload validates its required passkey challenge and optional fallback flag', () => {
  const source = {
    errors: null,
    passkeyChallengeOption: {
      passkeyRequestOptions: {
        challenge: 'login-passkey-challenge',
        rpId: 'chatgpt.com',
        allowCredentials: []
      },
      mfaRequestId: 'login-passkey-mfa'
    },
    fallbackAllowed: false,
    extension: { retained: true }
  };
  const decoded = decodeAndroidLoginAuthLoginPasskeyPayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.passkeyChallengeOption, source.passkeyChallengeOption);
  assert.notEqual(
    decoded.passkeyChallengeOption.passkeyRequestOptions,
    source.passkeyChallengeOption.passkeyRequestOptions
  );
  assert.equal(decoded.extension, source.extension);
  assert.deepEqual(decodeAndroidLoginAuthLoginPasskeyPayload({
    passkeyChallengeOption: {
      passkeyRequestOptions: {},
      mfaRequestId: 'required'
    }
  }), {
    passkeyChallengeOption: {
      passkeyRequestOptions: {},
      mfaRequestId: 'required'
    }
  });
});

test('login_passkey payload permits nullable errors and omitted fallbackAllowed', () => {
  const payload = {
    errors: { formErrors: ['Use a passkey or choose another method'] },
    passkeyChallengeOption: {
      passkeyRequestOptions: { challenge: 'x' },
      mfaRequestId: 'request'
    }
  };
  assert.deepEqual(decodeAndroidLoginAuthLoginPasskeyPayload(payload), payload);
  assert.deepEqual(decodeAndroidLoginAuthLoginPasskeyPayload({
    errors: null,
    passkeyChallengeOption: {
      passkeyRequestOptions: {},
      mfaRequestId: ''
    }
  }), {
    errors: null,
    passkeyChallengeOption: {
      passkeyRequestOptions: {},
      mfaRequestId: ''
    }
  });
});

test('login_passkey payload rejects missing, nullable or malformed generated members', () => {
  for (const [value, pattern] of [
    [{}, /passkeyChallengeOption is required/],
    [{ passkeyChallengeOption: null }, /passkeyChallengeOption must be an object/],
    [{ passkeyChallengeOption: {} }, /passkeyRequestOptions is required/],
    [{ passkeyChallengeOption: { passkeyRequestOptions: [] , mfaRequestId: 'id' } }, /passkeyRequestOptions must be an object/],
    [{ passkeyChallengeOption: { passkeyRequestOptions: {}, mfaRequestId: null } }, /mfaRequestId must be a string/],
    [{
      passkeyChallengeOption: { passkeyRequestOptions: {}, mfaRequestId: 'id' },
      fallbackAllowed: null
    }, /fallbackAllowed must be a boolean/],
    [{ errors: false, passkeyChallengeOption: { passkeyRequestOptions: {}, mfaRequestId: 'id' } }, /AndroidLoginAuthErrors must be an object/]
  ]) {
    assert.throws(() => decodeAndroidLoginAuthLoginPasskeyPayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
      assert.match(error.message, pattern);
      return true;
    });
  }
});


test('workspace payload decodes nullable workspaces and the generated Lxn8 entry fields', () => {
  const source = {
    errors: { formErrors: ['Choose a workspace'] },
    workspaces: [
      {
        id: 'workspace-1',
        kind: 'team',
        name: 'Example Organization',
        reauthentication: 'required'
      },
      { id: null, kind: null },
      { id: 'workspace-3', kind: 'personal' }
    ],
    extension: { retained: true }
  };
  const decoded = decodeAndroidLoginAuthWorkspacePayload(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.errors, source.errors);
  assert.notEqual(decoded.workspaces, source.workspaces);
  assert.notEqual(decoded.workspaces[0], source.workspaces[0]);
  assert.equal(decoded.extension, source.extension);
});

test('workspace payload preserves optional nullable parent members and optional non-null item fields', () => {
  assert.equal(decodeAndroidLoginAuthWorkspacePayload(undefined), undefined);
  assert.equal(decodeAndroidLoginAuthWorkspacePayload(null), null);
  assert.deepEqual(decodeAndroidLoginAuthWorkspacePayload({}), {});
  assert.deepEqual(decodeAndroidLoginAuthWorkspacePayload({
    errors: null,
    workspaces: null
  }), {
    errors: null,
    workspaces: null
  });
  assert.deepEqual(decodeAndroidLoginAuthWorkspacePayload({
    workspaces: [
      { id: null, kind: 'team' },
      { id: 'id', kind: null, name: 'Named' },
      { id: 'id-2', kind: 'personal', reauthentication: 'false' }
    ]
  }), {
    workspaces: [
      { id: null, kind: 'team' },
      { id: 'id', kind: null, name: 'Named' },
      { id: 'id-2', kind: 'personal', reauthentication: 'false' }
    ]
  });
});

test('workspace payload rejects missing or malformed required and optional item fields', () => {
  for (const [value, pattern] of [
    [{ workspaces: {} }, /workspaces must be an array/],
    [{ workspaces: [null] }, /workspaces.*must be an object/],
    [{ workspaces: [{}] }, /id is required/],
    [{ workspaces: [{ id: 'id' }] }, /kind is required/],
    [{ workspaces: [{ id: 1, kind: 'team' }] }, /id must be a string/],
    [{ workspaces: [{ id: null, kind: false }] }, /kind must be a string/],
    [{ workspaces: [{ id: 'id', kind: 'team', name: null }] }, /name must be a string/],
    [{
      workspaces: [{ id: 'id', kind: 'team', reauthentication: null }]
    }, /reauthentication must be a string/],
    [{ errors: false, workspaces: [] }, /AndroidLoginAuthErrors must be an object/]
  ]) {
    assert.throws(() => decodeAndroidLoginAuthWorkspacePayload(value), (error) => {
      assert.ok(error instanceof AndroidLoginAuthResponseSchemaError);
      assert.equal(error.code, 'CHATGPT_ANDROID_LOGIN_AUTH_INVALID_RESPONSE_SCHEMA');
      assert.match(error.message, pattern);
      return true;
    });
  }
});
