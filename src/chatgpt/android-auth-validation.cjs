'use strict';

const BEARER_TOKEN_PATTERN = /^[a-z\d._~+/=-]+$/i;
const ACCOUNT_IDENTIFIER_PATTERN = /^[a-z\d._-]+$/i;
const HTTP_HEADER_NAME_PATTERN = /^[!#$%&'*+.^_`|~a-z0-9-]+$/i;
const HTTP_HEADER_CONTROL_PATTERN = /[\u0000-\u001f\u007f]/;
const TRUSTED_API_ORIGIN_PATTERN = /^https:\/\/(?:[a-z\d-]+\.)*(?:openai\.com|chatgpt\.com|openai-staging\.com|chatgpt-staging\.com)$/i;

function isValidOAIBearerToken(value) {
  return typeof value === 'string' && BEARER_TOKEN_PATTERN.test(value);
}

function isValidOAIAccountIdentifier(value) {
  return typeof value === 'string' && ACCOUNT_IDENTIFIER_PATTERN.test(value);
}

function isValidHTTPHeaderName(value) {
  return typeof value === 'string' && HTTP_HEADER_NAME_PATTERN.test(value);
}

function isValidHTTPHeaderValue(value) {
  return typeof value === 'string' && !HTTP_HEADER_CONTROL_PATTERN.test(value);
}

function isTrustedOAIAPIOrigin(value) {
  return typeof value === 'string' && TRUSTED_API_ORIGIN_PATTERN.test(value);
}

// Mirrors OAIAuthenticationValidation.isSafeOriginRelativePath. The Android
// SessionAuthenticatedAccountService adds separate space and fragment checks.
function isSafeOriginRelativePath(value) {
  return typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('\\') &&
    !value.includes('://') &&
    !HTTP_HEADER_CONTROL_PATTERN.test(value);
}

// Mirrors the additional SessionAuthenticatedAccountService request-path gate.
function isSafeAuthenticatedRequestPath(value) {
  return isSafeOriginRelativePath(value) &&
    !value.includes(' ') &&
    !value.includes('#');
}

module.exports = Object.freeze({
  isValidOAIBearerToken,
  isValidOAIAccountIdentifier,
  isValidHTTPHeaderName,
  isValidHTTPHeaderValue,
  isTrustedOAIAPIOrigin,
  isSafeOriginRelativePath,
  isSafeAuthenticatedRequestPath
});