'use strict';

const P256_COMPONENT_BYTES = 32;
const P256_SIGNATURE_BYTES = P256_COMPONENT_BYTES * 2;

function readDerLength(bytes, offset, limit) {
  if (offset >= limit) throw new TypeError('Invalid DER length.');
  const first = bytes[offset];
  if ((first & 0x80) === 0) return { length: first, nextOffset: offset + 1 };
  const lengthBytes = first & 0x7f;
  if (lengthBytes === 0 || lengthBytes > 4 || offset + 1 + lengthBytes > limit) throw new TypeError('Invalid DER length.');
  if (bytes[offset + 1] === 0) throw new TypeError('Non-canonical DER length.');
  let length = 0;
  for (let index = 0; index < lengthBytes; index += 1) length = (length * 256) + bytes[offset + 1 + index];
  if (length < 0x80) throw new TypeError('Non-canonical DER length.');
  return { length, nextOffset: offset + 1 + lengthBytes };
}

function readDerInteger(bytes, offset, limit, label) {
  if (offset >= limit || bytes[offset] !== 0x02) throw new TypeError('Expected INTEGER for ' + label + '.');
  const lengthInfo = readDerLength(bytes, offset + 1, limit);
  const start = lengthInfo.nextOffset;
  const end = start + lengthInfo.length;
  if (lengthInfo.length === 0 || end > limit) throw new TypeError('Invalid DER INTEGER for ' + label + '.');
  let firstSignificantByte = start;
  while (firstSignificantByte < end - 1 && bytes[firstSignificantByte] === 0) firstSignificantByte += 1;
  const componentLength = end - firstSignificantByte;
  if (componentLength > P256_COMPONENT_BYTES) throw new TypeError('P-256 INTEGER for ' + label + ' exceeds 32 bytes.');
  const component = Buffer.alloc(P256_COMPONENT_BYTES);
  bytes.copy(component, P256_COMPONENT_BYTES - componentLength, firstSignificantByte, end);
  return { component, nextOffset: end };
}

/**
 * Convert an Android/JCA SHA256withECDSA DER signature into fixed-width
 * 64-byte r||s form for JOSE ES256. This only formats bytes; it does not sign,
 * manage keys, access a keystore, or establish hardware-backed key ownership.
 */
function normalizeAndroidEs256Signature(derSignature) {
  if (!Buffer.isBuffer(derSignature) && !(derSignature instanceof Uint8Array)) throw new TypeError('derSignature must be a Buffer or Uint8Array.');
  const bytes = Buffer.from(derSignature);
  if (bytes.length < 2 || bytes[0] !== 0x30) throw new TypeError('Not a DER SEQUENCE.');
  const sequenceLength = readDerLength(bytes, 1, bytes.length);
  const sequenceStart = sequenceLength.nextOffset;
  const sequenceEnd = sequenceStart + sequenceLength.length;
  if (sequenceEnd !== bytes.length) throw new TypeError('Invalid DER SEQUENCE length.');
  const r = readDerInteger(bytes, sequenceStart, sequenceEnd, 'r');
  const s = readDerInteger(bytes, r.nextOffset, sequenceEnd, 's');
  if (s.nextOffset !== sequenceEnd) throw new TypeError('Unexpected data after DER INTEGER s.');
  const normalized = Buffer.alloc(P256_SIGNATURE_BYTES);
  r.component.copy(normalized, 0);
  s.component.copy(normalized, P256_COMPONENT_BYTES);
  return normalized;
}

module.exports = Object.freeze({ normalizeAndroidEs256Signature });
