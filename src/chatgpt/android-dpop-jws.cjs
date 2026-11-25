'use strict';

const { createHash } = require('node:crypto');
const P256_SIGNATURE_BYTES = 64;

function assertObject(value, label) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(label + ' must be an object.');
}

function assertString(value, label) {
  if (typeof value !== 'string' || value.length === 0) throw new TypeError(label + ' must be a non-empty string.');
}

function encodeBase64Url(bytes) {
  return Buffer.from(bytes).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function canonicalizeAndroidDpopUrl(input) {
  assertString(input, 'targetUrl');
  let parsed;
  try { parsed = new URL(input); }
  catch (error) { throw new TypeError('targetUrl must be an absolute URL.', { cause: error }); }
  const protocol = parsed.protocol.toLowerCase();
  if (protocol !== 'https:' && protocol !== 'http:') throw new TypeError('targetUrl must use HTTP or HTTPS.');
  // Java URL.getPath() keeps path spelling; preserve the raw path and strip query/fragment only.
  const match = input.match(/^[a-z][a-z0-9+.-]*:\/\/[^/?#]*([^?#]*)/i);
  const rawPath = match && match[1] ? match[1] : '/';
  const host = parsed.hostname.toLowerCase();
  const port = parsed.port ? ':' + parsed.port : '';
  return protocol + '//' + host + port + rawPath;
}

function normalizePublicJwk(publicJwk) {
  assertObject(publicJwk, 'publicJwk');
  if (publicJwk.kty !== 'EC' || publicJwk.crv !== 'P-256') throw new TypeError('publicJwk must describe an EC P-256 key.');
  for (const field of ['x', 'y']) {
    assertString(publicJwk[field], 'publicJwk.' + field);
    if (!/^[A-Za-z0-9_-]{43}$/.test(publicJwk[field])) throw new TypeError('publicJwk.' + field + ' must be an unpadded 32-byte Base64URL coordinate.');
  }
  return Object.freeze({ kty: 'EC', crv: 'P-256', x: publicJwk.x, y: publicJwk.y });
}

function normalizeIssuedAt(issuedAt) {
  if (typeof issuedAt === 'bigint') return issuedAt.toString(10);
  if (typeof issuedAt === 'number' && Number.isSafeInteger(issuedAt)) return String(issuedAt);
  throw new TypeError('issuedAt must be a safe integer or bigint.');
}

/**
 * Build the Android DPoP JWT signing input (protected-header.payload).
 * Does not generate jti/iat, credentials, keys, signatures, or perform network I/O.
 */
function buildAndroidDpopSigningInput({ publicJwk, targetUrl, issuedAt, jti, accessToken } = {}) {
  const jwk = normalizePublicJwk(publicJwk);
  const htu = canonicalizeAndroidDpopUrl(targetUrl);
  const iat = normalizeIssuedAt(issuedAt);
  assertString(jti, 'jti');
  assertString(accessToken, 'accessToken');
  const headerJson = JSON.stringify({ typ: 'dpop+jwt', alg: 'ES256', jwk });
  const ath = encodeBase64Url(createHash('sha256').update(accessToken, 'utf8').digest());
  const payloadJson = '{"htm":"POST","htu":' + JSON.stringify(htu) +
    ',"iat":' + iat + ',"jti":' + JSON.stringify(jti) + ',"ath":' + JSON.stringify(ath) + '}';
  return encodeBase64Url(Buffer.from(headerJson, 'utf8')) + '.' + encodeBase64Url(Buffer.from(payloadJson, 'utf8'));
}

/**
 * Append a host-produced fixed-width ES256 signature. Key ownership and signing
 * remain with a real explicit host signer; this only assembles compact-JWS bytes.
 */
function assembleAndroidDpopJws(signingInput, signature) {
  assertString(signingInput, 'signingInput');
  if (!Buffer.isBuffer(signature) && !(signature instanceof Uint8Array)) throw new TypeError('signature must be a Buffer or Uint8Array.');
  const bytes = Buffer.from(signature);
  if (bytes.length !== P256_SIGNATURE_BYTES) throw new TypeError('ES256 signature must be exactly 64 bytes in r||s form.');
  if (signingInput.split('.').length !== 2) throw new TypeError('signingInput must contain exactly two compact-JWS segments.');
  return signingInput + '.' + encodeBase64Url(bytes);
}

module.exports = Object.freeze({ canonicalizeAndroidDpopUrl, buildAndroidDpopSigningInput, assembleAndroidDpopJws });
