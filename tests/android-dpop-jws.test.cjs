'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {
  canonicalizeAndroidDpopUrl,
  calculateAndroidDpopIssuedAt,
  buildAndroidDpopSigningInput,
  assembleAndroidDpopJws
} = require('../src/chatgpt/android-dpop-jws.cjs');

function decode(value) {
  return Buffer.from(value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4), 'base64');
}

function createJwk() {
  const { publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const jwk = publicKey.export({ format: 'jwk' });
  return { kty: jwk.kty, crv: jwk.crv, x: jwk.x, y: jwk.y };
}

test('canonicalizes scheme/host, drops default port, query and fragment', () => {
  assert.equal(canonicalizeAndroidDpopUrl('HTTPS://EXAMPLE.COM:443/api/path?secret=value#frag'), 'https://example.com/api/path');
  assert.equal(canonicalizeAndroidDpopUrl('http://EXAMPLE.com:80'), 'http://example.com/');
  assert.equal(canonicalizeAndroidDpopUrl('https://EXAMPLE.com:8443/a?b=1'), 'https://example.com:8443/a');
});

test('preserves source URL path spelling, including dot segments', () => {
  assert.equal(canonicalizeAndroidDpopUrl('https://example.com/a/../b?q=1'), 'https://example.com/a/../b');
});

test('serializes exact Android JWS header/payload fields and access-token hash', () => {
  const publicJwk = createJwk();
  const token = 'access-token-value';
  const signingInput = buildAndroidDpopSigningInput({
    publicJwk, targetUrl: 'HTTPS://API.OPENAI.COM:443/backend-api/conversation?x=1',
    issuedAt: 1795632000, jti: '4a3f9c20-3b0b-4b4e-8c3f-123456789abc', accessToken: token
  });
  const [headerPart, payloadPart] = signingInput.split('.');
  const header = JSON.parse(decode(headerPart).toString('utf8'));
  const payload = JSON.parse(decode(payloadPart).toString('utf8'));
  assert.deepEqual(Object.keys(header), ['typ', 'alg', 'jwk']);
  assert.equal(header.typ, 'dpop+jwt');
  assert.equal(header.alg, 'ES256');
  assert.deepEqual(header.jwk, publicJwk);
  assert.deepEqual(Object.keys(payload), ['htm', 'htu', 'iat', 'jti', 'ath']);
  assert.equal(payload.htm, 'POST');
  assert.equal(payload.htu, 'https://api.openai.com/backend-api/conversation');
  assert.equal(payload.iat, 1795632000);
  assert.equal(payload.jti, '4a3f9c20-3b0b-4b4e-8c3f-123456789abc');
  assert.equal(payload.ath, crypto.createHash('sha256').update(token, 'utf8').digest('base64url'));
});

test('applies the source-traced server-minus-local clock offset in epoch seconds', () => {
  assert.equal(calculateAndroidDpopIssuedAt(1795632000, 12), 1795632012);
  assert.equal(calculateAndroidDpopIssuedAt(1795632000, -30), 1795631970);
  assert.equal(calculateAndroidDpopIssuedAt(100n, -7n), 93n);
  assert.equal(calculateAndroidDpopIssuedAt(100, 9007199254740992n), 9007199254741092n);
});

test('rejects non-integer and unsafe numeric clock values', () => {
  assert.throws(() => calculateAndroidDpopIssuedAt(1.5, 2), /safe integer or bigint/);
  assert.throws(() => calculateAndroidDpopIssuedAt(Number.MAX_SAFE_INTEGER + 1, 2), /safe integer or bigint/);
  assert.throws(() => calculateAndroidDpopIssuedAt(1, NaN), /safe integer or bigint/);
});

test('preserves 64-bit integer iat values without JS number rounding', () => {
  const signingInput = buildAndroidDpopSigningInput({
    publicJwk: createJwk(), targetUrl: 'https://example.com/', issuedAt: 9223372036854775807n,
    jti: 'jti-value', accessToken: 'token'
  });
  assert.equal(decode(signingInput.split('.')[1]).toString('utf8').includes('9223372036854775807'), true);
});

test('assembles and verifies a compact JWS using a host-supplied P-256 signature', () => {
  const pair = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const exported = pair.publicKey.export({ format: 'jwk' });
  const signingInput = buildAndroidDpopSigningInput({
    publicJwk: { kty: exported.kty, crv: exported.crv, x: exported.x, y: exported.y },
    targetUrl: 'https://example.com/path', issuedAt: 1, jti: 'id', accessToken: 'token'
  });
  const signer = crypto.createSign('SHA256');
  signer.update(signingInput, 'utf8');
  signer.end();
  const signature = signer.sign({ key: pair.privateKey, dsaEncoding: 'ieee-p1363' });
  const compact = assembleAndroidDpopJws(signingInput, signature);
  const [header, payload, signaturePart] = compact.split('.');
  assert.equal([header, payload].join('.'), signingInput);
  assert.equal(decode(signaturePart).length, 64);
  assert.equal(crypto.verify('sha256', signingInput, { key: pair.publicKey, dsaEncoding: 'ieee-p1363' }, decode(signaturePart)), true);
});

test('rejects invalid target, timestamp, ID, token and JWK', () => {
  const publicJwk = createJwk();
  const base = { publicJwk, targetUrl: 'https://example.com', issuedAt: 1, jti: 'x', accessToken: 't' };
  assert.throws(() => buildAndroidDpopSigningInput({ ...base, targetUrl: '/relative' }), /absolute URL/);
  assert.throws(() => buildAndroidDpopSigningInput({ ...base, targetUrl: 'ftp://example.com' }), /HTTP or HTTPS/);
  assert.throws(() => buildAndroidDpopSigningInput({ ...base, issuedAt: 1.25 }), /safe integer or bigint/);
  assert.throws(() => buildAndroidDpopSigningInput({ ...base, jti: '' }), /jti/);
  assert.throws(() => buildAndroidDpopSigningInput({ ...base, accessToken: '' }), /accessToken/);
  assert.throws(() => buildAndroidDpopSigningInput({ ...base, publicJwk: { kty: 'RSA', crv: 'P-256', x: 'x', y: 'y' } }), /EC P-256/);
});

test('requires a fixed-width signature and a two-segment signing input', () => {
  assert.throws(() => assembleAndroidDpopJws('one.two', Buffer.alloc(63)), /64 bytes/);
  assert.throws(() => assembleAndroidDpopJws('one.two', 'signature'), /Buffer or Uint8Array/);
  assert.throws(() => assembleAndroidDpopJws('one.two.three', Buffer.alloc(64)), /two compact-JWS segments/);
});
