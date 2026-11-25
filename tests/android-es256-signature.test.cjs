'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { normalizeAndroidEs256Signature } = require('../src/chatgpt/android-es256-signature.cjs');

function derLength(length) {
  if (length < 0x80) return Buffer.from([length]);
  const octets = [];
  let remaining = length;
  while (remaining > 0) { octets.unshift(remaining & 0xff); remaining = Math.floor(remaining / 256); }
  return Buffer.from([0x80 | octets.length, ...octets]);
}

function derInteger(input) {
  let bytes = Buffer.from(input);
  while (bytes.length > 1 && bytes[0] === 0) bytes = bytes.subarray(1);
  if (bytes[0] & 0x80) bytes = Buffer.concat([Buffer.from([0]), bytes]);
  return Buffer.concat([Buffer.from([0x02]), derLength(bytes.length), bytes]);
}

function derSequence(r, s) {
  const body = Buffer.concat([derInteger(r), derInteger(s)]);
  return Buffer.concat([Buffer.from([0x30]), derLength(body.length), body]);
}

test('normalizes a real P-256 SHA-256 ECDSA signature into 64-byte JOSE form', () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const message = Buffer.from('ChatJS Android ES256 source contract');
  const signer = crypto.createSign('SHA256');
  signer.update(message);
  signer.end();
  const normalized = normalizeAndroidEs256Signature(signer.sign(privateKey));
  assert.equal(normalized.length, 64);
  assert.equal(crypto.verify('sha256', message, { key: publicKey, dsaEncoding: 'ieee-p1363' }, normalized), true);
});

test('left-pads short INTEGER components to exactly 32 bytes', () => {
  const normalized = normalizeAndroidEs256Signature(derSequence(Buffer.from([0x01, 0x02]), Buffer.from([0x03])));
  assert.equal(normalized.length, 64);
  assert.deepEqual(normalized.subarray(0, 30), Buffer.alloc(30));
  assert.deepEqual(normalized.subarray(30, 32), Buffer.from([0x01, 0x02]));
  assert.deepEqual(normalized.subarray(32, 63), Buffer.alloc(31));
  assert.equal(normalized[63], 0x03);
});

test('removes DER sign-padding without changing the 32-byte integer value', () => {
  const r = Buffer.concat([Buffer.from([0x00]), Buffer.alloc(31, 0x11), Buffer.from([0x80])]);
  const s = Buffer.concat([Buffer.from([0x00]), Buffer.alloc(31, 0x22), Buffer.from([0x7f])]);
  const normalized = normalizeAndroidEs256Signature(derSequence(r, s));
  assert.equal(normalized.length, 64);
  assert.equal(normalized[0], 0x11);
  assert.equal(normalized[31], 0x80);
  assert.equal(normalized[32], 0x22);
  assert.equal(normalized[63], 0x7f);
});

test('rejects non-sequence input and malformed sequence lengths', () => {
  assert.throws(() => normalizeAndroidEs256Signature(Buffer.from([0x31, 0x06, 0x02, 0x01, 1, 0x02, 0x01, 1])), /DER SEQUENCE/);
  assert.throws(() => normalizeAndroidEs256Signature(Buffer.from([0x30, 0x07, 0x02, 0x01, 1, 0x02, 0x01, 1])), /SEQUENCE length/);
});

test('retains source-specific INTEGER r/s validation', () => {
  const badR = Buffer.from([0x30, 0x06, 0x04, 0x01, 1, 0x02, 0x01, 1]);
  const badS = Buffer.from([0x30, 0x06, 0x02, 0x01, 1, 0x04, 0x01, 1]);
  assert.throws(() => normalizeAndroidEs256Signature(badR), /Expected INTEGER for r/);
  assert.throws(() => normalizeAndroidEs256Signature(badS), /Expected INTEGER for s/);
});

test('rejects oversized, empty, truncated and trailing DER values', () => {
  assert.throws(() => normalizeAndroidEs256Signature(derSequence(Buffer.alloc(33, 1), Buffer.from([1]))), /exceeds 32 bytes/);
  assert.throws(() => normalizeAndroidEs256Signature(Buffer.from([0x30, 0x02, 0x02, 0x00])), /INTEGER/);
  assert.throws(() => normalizeAndroidEs256Signature(Buffer.from([0x30, 0x06, 0x02, 0x01, 1, 0x02, 0x02, 1])), /Invalid DER INTEGER/);
  assert.throws(() => normalizeAndroidEs256Signature(Buffer.from([0x30, 0x06, 0x02, 0x01, 1, 0x02, 0x01, 1, 0x00])), /SEQUENCE length/);
});

test('rejects values outside the documented byte input contract', () => {
  assert.throws(() => normalizeAndroidEs256Signature('signature'), /Buffer or Uint8Array/);
  assert.throws(() => normalizeAndroidEs256Signature(null), /Buffer or Uint8Array/);
});
