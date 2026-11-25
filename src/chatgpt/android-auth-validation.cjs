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

module.exports = Object.freeze({
  isValidOAIBearerToken,
  isValidOAIAccountIdentifier,
  isValidHTTPHeaderName,
  isValidHTTPHeaderValue,
  isTrustedOAIAPIOrigin
});
