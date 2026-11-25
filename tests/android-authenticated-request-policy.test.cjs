'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const policy = require('../src/chatgpt/android-authenticated-request-policy.cjs');

test('bearer headers include Accept and the exact Authorization scheme', () => {
  assert.deepEqual(policy.buildAndroidAuthenticatedRequestHeaders(
    'application/json',
    'token-value',
    undefined
  ), {
    Accept: 'application/json',
    Authorization: 'Bearer token-value'
  });
});

test('account-bound requests include ChatGPT-Account-Id', () => {
  assert.deepEqual(policy.buildAndroidAuthenticatedRequestHeaders(
    'image/*',
    'token-value',
    'acct_a'
  ), {
    Accept: 'image/*',
    Authorization: 'Bearer token-value',
    'ChatGPT-Account-Id': 'acct_a'
  });
});

test('header builder rejects non-string accept and token inputs', () => {
  assert.throws(() => policy.buildAndroidAuthenticatedRequestHeaders(null, 'token'), /accept/);
  assert.throws(() => policy.buildAndroidAuthenticatedRequestHeaders('application/json', null), /accessToken/);
  assert.throws(() => policy.buildAndroidAuthenticatedRequestHeaders('application/json', 'token', 1), /accountId/);
});

test('JSON content type is only added when bodyJson is not undefined', () => {
  const headers = { Accept: 'application/json', Authorization: 'Bearer token' };
  assert.deepEqual(policy.buildAndroidJSONRequestHeaders(headers, undefined), headers);
  assert.deepEqual(policy.buildAndroidJSONRequestHeaders(headers, '{}'), {
    ...headers,
    'Content-Type': 'application/json'
  });
  assert.deepEqual(policy.buildAndroidJSONRequestHeaders(headers, null), {
    ...headers,
    'Content-Type': 'application/json'
  });
});

test('JSON header builder copies the header object and rejects invalid containers', () => {
  const headers = { Accept: 'application/json' };
  const result = policy.buildAndroidJSONRequestHeaders(headers, undefined);
  result.Accept = 'image/*';
  assert.equal(headers.Accept, 'application/json');
  assert.throws(() => policy.buildAndroidJSONRequestHeaders(null, '{}'), /headers/);
  assert.throws(() => policy.buildAndroidJSONRequestHeaders([], '{}'), /headers/);
});

test('Sheep gateway header is added only for Valdi >= 117 and an explicit true option', () => {
  const base = { Accept: 'application/json', Authorization: 'Bearer token' };
  assert.deepEqual(policy.buildAndroidJSONRequestHeaders(base, undefined), base);
  assert.deepEqual(policy.buildAndroidJSONRequestHeaders(base, undefined, {
    isVersionAtLeast117: false,
    useSheepGateway: true
  }), base);
  assert.deepEqual(policy.buildAndroidJSONRequestHeaders(base, undefined, {
    isVersionAtLeast117: true,
    useSheepGateway: false
  }), base);
  assert.deepEqual(policy.buildAndroidJSONRequestHeaders(base, undefined, {
    isVersionAtLeast117: true,
    useSheepGateway: true
  }), { ...base, 'x-openai-use-sheep': '1' });
});

test('JSON header options must be a non-array object', () => {
  assert.throws(() => policy.buildAndroidJSONRequestHeaders({}, undefined, null), /options/);
  assert.throws(() => policy.buildAndroidJSONRequestHeaders({}, undefined, []), /options/);
});

test('JSON body encoder preserves undefined and encodes defined values as UTF-8', () => {
  assert.equal(policy.encodeAndroidJSONRequestBody(undefined), undefined);
  assert.equal(Buffer.from(policy.encodeAndroidJSONRequestBody('{"x":"✓"}')).toString('utf8'), '{"x":"✓"}');
  assert.equal(Buffer.from(policy.encodeAndroidJSONRequestBody(null)).toString('utf8'), 'null');
});

test('automatic credential renewal is enabled by default and can be disabled on runtime >= 377', () => {
  assert.equal(policy.allowsAndroidAutomaticCredentialRenewal(true, undefined), true);
  assert.equal(policy.allowsAndroidAutomaticCredentialRenewal(true, false), true);
  assert.equal(policy.allowsAndroidAutomaticCredentialRenewal(true, true), false);
});

test('pre-377 runtime retains its source behavior regardless of the newer disable option', () => {
  assert.equal(policy.allowsAndroidAutomaticCredentialRenewal(false, undefined), true);
  assert.equal(policy.allowsAndroidAutomaticCredentialRenewal(false, false), true);
  assert.equal(policy.allowsAndroidAutomaticCredentialRenewal(false, true), true);
});

test('non-401 responses, bodyless 401s and cancelled requests skip credential recovery', () => {
  assert.deepEqual(policy.planAndroidAuthenticatedResponseRecovery({ statusCode: 200, hasBody: true }), {
    action: 'NoRecovery'
  });
  assert.deepEqual(policy.planAndroidAuthenticatedResponseRecovery({ statusCode: 403, hasBody: true }), {
    action: 'NoRecovery'
  });
  assert.deepEqual(policy.planAndroidAuthenticatedResponseRecovery({ statusCode: 401, hasBody: false }), {
    action: 'NoRecovery'
  });
  assert.deepEqual(policy.planAndroidAuthenticatedResponseRecovery({ statusCode: 401, hasBody: true, cancelled: true }), {
    action: 'NoRecovery'
  });
});

test('401 recovery with no replacement token preserves the original response', () => {
  assert.deepEqual(policy.planAndroidAuthenticatedResponseRecovery({
    statusCode: 401,
    hasBody: true,
    replacementAccessToken: undefined
  }), {
    action: 'ReturnOriginalResponse'
  });
});

test('a replacement token replays once with automatic renewal disabled', () => {
  assert.deepEqual(policy.planAndroidAuthenticatedResponseRecovery({
    statusCode: 401,
    hasBody: true,
    replacementAccessToken: 'replacement-token'
  }), {
    action: 'ReplayOnce',
    accessToken: 'replacement-token',
    allowRenewal: false
  });
});
