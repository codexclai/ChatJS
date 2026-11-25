'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { encodeAndroidP256PublicKeyJwk } = require('../src/chatgpt/android-p256-jwk.cjs');

function decodeBase64Url(value) {
  return Buffer.from(value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4), 'base64');
}

test('encodes an actual P-256 public key using the Android JWK field names and constants', () => {
  const { publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const expected = publicKey.export({ format: 'jwk' });
  const jwk = encodeAndroidP256PublicKeyJwk(decodeBase64Url(expected.x), decodeBase64Url(expected.y));
  assert.deepEqual(jwk, { kty: 'EC', crv: 'P-256', x: expected.x, y: expected.y });
  assert.equal(Object.isFrozen(jwk), true);
});

test('normalizes short affine coordinates to exactly 32 bytes before Base64URL encoding', () => {
  const jwk = encodeAndroidP256PublicKeyJwk(Buffer.from([0x01, 0x02]), Buffer.from([0x03]));
  assert.equal(decodeBase64Url(jwk.x).length, 32);
  assert.deepEqual(decodeBase64Url(jwk.x).subarray(0, 30), Buffer.alloc(30));
  assert.deepEqual(decodeBase64Url(jwk.x).subarray(30), Buffer.from([0x01, 0x02]));
  assert.deepEqual(decodeBase64Url(jwk.y).subarray(0, 31), Buffer.alloc(31));
  assert.equal(decodeBase64Url(jwk.y)[31], 0x03);
});

test('removes the BigInteger positive sign byte from 33-byte coordinates', () => {
  const x = Buffer.concat([Buffer.from([0]), Buffer.alloc(31, 0x11), Buffer.from([0x80])]);
  const y = Buffer.concat([Buffer.from([0]), Buffer.alloc(31, 0x22), Buffer.from([0x90])]);
  const jwk = encodeAndroidP256PublicKeyJwk(x, y);
  assert.equal(decodeBase64Url(jwk.x).length, 32);
  assert.equal(decodeBase64Url(jwk.x)[0], 0x11);
  assert.equal(decodeBase64Url(jwk.x)[31], 0x80);
  assert.equal(decodeBase64Url(jwk.y)[0], 0x22);
  assert.equal(decodeBase64Url(jwk.y)[31], 0x90);
});

test('rejects 33-byte coordinates without the positive sign byte', () => {
  assert.throws(() => encodeAndroidP256PublicKeyJwk(Buffer.alloc(33, 1), Buffer.from([1])), /exceeds 32 bytes/);
});

test('rejects empty and malformed coordinate inputs', () => {
  assert.throws(() => encodeAndroidP256PublicKeyJwk(Buffer.alloc(0), Buffer.from([1])), /must not be empty/);
  assert.throws(() => encodeAndroidP256PublicKeyJwk('x', Buffer.from([1])), /Buffer or Uint8Array/);
  assert.throws(() => encodeAndroidP256PublicKeyJwk(Buffer.from([1]), null), /Buffer or Uint8Array/);
});

test('omits Base64 padding and only uses URL-safe alphabet', () => {
  const jwk = encodeAndroidP256PublicKeyJwk(Buffer.alloc(32, 0xff), Buffer.alloc(32, 0xfe));
  assert.match(jwk.x, /^[A-Za-z0-9_-]+$/);
  assert.match(jwk.y, /^[A-Za-z0-9_-]+$/);
  assert.equal(jwk.x.includes('='), false);
  assert.equal(jwk.y.includes('='), false);
});
