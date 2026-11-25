'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const validation = require('../src/chatgpt/android-auth-validation.cjs');

test('bearer token validation accepts the observed ASCII token alphabet', () => {
  for (const token of [
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2N0In0.signature',
    'AbCd0123._~+/=-',
    'opaque-token_123'
  ]) {
    assert.equal(validation.isValidOAIBearerToken(token), true);
  }
});

test('bearer token validation rejects empty values, whitespace, and characters outside the source pattern', () => {
  for (const token of ['', ' token', 'token ', 'token\n', 'token:part', 'token%2Fpart', null, 12]) {
    assert.equal(validation.isValidOAIBearerToken(token), false);
  }
});

test('account identifiers use the observed alphanumeric, dot, underscore, and hyphen alphabet', () => {
  for (const accountId of ['acct_123', 'A1B2-C3D4', '12345678-1234-1234-1234-123456789abc', 'a.b_c-d']) {
    assert.equal(validation.isValidOAIAccountIdentifier(accountId), true);
  }
  for (const accountId of ['', 'acct/123', 'acct 123', 'acct:123', null, {}]) {
    assert.equal(validation.isValidOAIAccountIdentifier(accountId), false);
  }
});

test('HTTP header names accept token characters and reject separators and whitespace', () => {
  for (const name of ['Authorization', 'ChatGPT-Account-Id', 'X-Sentinel_Payload', "X!#$%&'*+.^_`|~-"]) {
    assert.equal(validation.isValidHTTPHeaderName(name), true);
  }
  for (const name of ['', 'Bad Header', 'Bad:Header', 'Bad/Header', 'Bad(Header)', null]) {
    assert.equal(validation.isValidHTTPHeaderName(name), false);
  }
});

test('HTTP header values reject NUL, CR, LF, and all ASCII control characters', () => {
  for (const value of ['', 'Bearer token', 'value with spaces', 'unicode-✓']) {
    assert.equal(validation.isValidHTTPHeaderValue(value), true);
  }
  for (const value of ['x\0y', 'x\ry', 'x\ny', '\u001f', '\u007f', null, 1]) {
    assert.equal(validation.isValidHTTPHeaderValue(value), false);
  }
});

test('trusted API origins accept only HTTPS origins under the observed production and staging domains', () => {
  for (const origin of [
    'https://openai.com',
    'https://api.openai.com',
    'https://chatgpt.com',
    'https://android.chat.openai.com',
    'https://chatgpt-staging.com',
    'https://api.openai-staging.com'
  ]) {
    assert.equal(validation.isTrustedOAIAPIOrigin(origin), true, origin);
  }
});

test('trusted API origin validation rejects other schemes, ports, paths, and lookalike domains', () => {
  for (const origin of [
    'http://openai.com',
    'https://openai.com:8443',
    'https://openai.com/',
    'https://openai.com/backend-api',
    'https://evilopenai.com',
    'https://openai.com.evil.example',
    'https://example.com',
    'https://chatgpt.example',
    '',
    null
  ]) {
    assert.equal(validation.isTrustedOAIAPIOrigin(origin), false, String(origin));
  }
});
