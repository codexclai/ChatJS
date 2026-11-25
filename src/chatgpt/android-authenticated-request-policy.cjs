'use strict';

const { TextEncoder } = require('node:util');

function buildAndroidAuthenticatedRequestHeaders(accept, accessToken, accountId) {
  if (typeof accept !== 'string') {
    throw new TypeError('accept must be a string.');
  }
  if (typeof accessToken !== 'string') {
    throw new TypeError('accessToken must be a string.');
  }

  const headers = {
    Accept: accept,
    Authorization: 'Bearer ' + accessToken
  };

  if (accountId !== undefined) {
    if (typeof accountId !== 'string') {
      throw new TypeError('accountId must be a string when present.');
    }
    headers['ChatGPT-Account-Id'] = accountId;
  }

  return headers;
}

function buildAndroidJSONRequestHeaders(headers, bodyJson, options = {}) {
  if (headers === null || typeof headers !== 'object' || Array.isArray(headers)) {
    throw new TypeError('headers must be an object.');
  }
  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('options must be an object.');
  }

  const result = { ...headers };
  if (options.isVersionAtLeast117 === true && options.useSheepGateway === true) {
    result['x-openai-use-sheep'] = '1';
  }
  if (bodyJson !== undefined) {
    result['Content-Type'] = 'application/json';
  }
  return result;
}

function encodeAndroidJSONRequestBody(bodyJson) {
  if (bodyJson === undefined) return undefined;
  return new TextEncoder().encode(bodyJson);
}

function allowsAndroidAutomaticCredentialRenewal(isVersionAtLeast377, disableAutomaticRetries) {
  // The source only recognizes disableAutomaticRetries on Valdi runtime >= 377.
  return !(isVersionAtLeast377 === true && disableAutomaticRetries === true);
}

function planAndroidAuthenticatedResponseRecovery({
  cancelled = false,
  statusCode,
  hasBody,
  replacementAccessToken
} = {}) {
  if (cancelled === true || statusCode !== 401 || hasBody !== true) {
    return Object.freeze({ action: 'NoRecovery' });
  }

  // Android preserves the original response when recovery yields undefined.
  // A returned credential causes precisely one replay with renewal disabled.
  if (replacementAccessToken === undefined) {
    return Object.freeze({ action: 'ReturnOriginalResponse' });
  }

  return Object.freeze({
    action: 'ReplayOnce',
    accessToken: replacementAccessToken,
    allowRenewal: false
  });
}

module.exports = Object.freeze({
  buildAndroidAuthenticatedRequestHeaders,
  buildAndroidJSONRequestHeaders,
  encodeAndroidJSONRequestBody,
  allowsAndroidAutomaticCredentialRenewal,
  planAndroidAuthenticatedResponseRecovery
});
