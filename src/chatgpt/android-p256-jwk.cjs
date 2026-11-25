'use strict';

const P256_COORDINATE_BYTES = 32;

function normalizeAndroidP256Coordinate(coordinate, label) {
  if (!Buffer.isBuffer(coordinate) && !(coordinate instanceof Uint8Array)) {
    throw new TypeError(label + ' must be a Buffer or Uint8Array.');
  }
  const bytes = Buffer.from(coordinate);
  let start = 0;
  if (bytes.length === P256_COORDINATE_BYTES + 1 && bytes[0] === 0) {
    start = 1;
  } else if (bytes.length > P256_COORDINATE_BYTES) {
    throw new TypeError('P-256 coordinate ' + label + ' exceeds 32 bytes.');
  }
  const length = bytes.length - start;
  if (length === 0) throw new TypeError('P-256 coordinate ' + label + ' must not be empty.');
  const normalized = Buffer.alloc(P256_COORDINATE_BYTES);
  bytes.copy(normalized, P256_COORDINATE_BYTES - length, start);
  return normalized;
}

function encodeBase64UrlWithoutPadding(bytes) {
  return bytes.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

/**
 * Build the Android client's public P-256 EC JWK model from affine coordinate
 * bytes. This serializes public coordinates only; it does not manage keys,
 * sign data, access a keystore, or create a DPoP proof.
 */
function encodeAndroidP256PublicKeyJwk(affineX, affineY) {
  const x = normalizeAndroidP256Coordinate(affineX, 'x');
  const y = normalizeAndroidP256Coordinate(affineY, 'y');
  return Object.freeze({
    kty: 'EC',
    crv: 'P-256',
    x: encodeBase64UrlWithoutPadding(x),
    y: encodeBase64UrlWithoutPadding(y)
  });
}

module.exports = Object.freeze({ encodeAndroidP256PublicKeyJwk });
