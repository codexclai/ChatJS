'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { ChatJSClient, ChatJSError, createChatJS, version } = require('../src/index.cjs');

test('factory creates a client with an explicit foundation status', () => {
  const client = createChatJS();

  assert.ok(client instanceof ChatJSClient);
  assert.deepEqual(client.getStatus(), {
    state: 'initialized',
    implementationStatus: 'foundation-only',
    version
  });
  assert.equal(client.closed, false);
  client.close();
});

test('client accepts an options object and preserves a shallow read-only snapshot', () => {
  const client = new ChatJSClient({ featureFlags: ['experimental'] });

  assert.deepEqual(client.options, { featureFlags: ['experimental'] });
  assert.equal(Object.isFrozen(client.options), true);
  client.close();
});

test('invalid constructor options produce a typed error', () => {
  assert.throws(
    () => new ChatJSClient(null),
    (error) => error instanceof ChatJSError && error.code === 'CHATJS_INVALID_OPTIONS'
  );
});

test('close is idempotent and emits one close event', () => {
  const client = new ChatJSClient();
  let closeCount = 0;
  client.on('close', () => { closeCount += 1; });

  client.close();
  client.close();

  assert.equal(client.closed, true);
  assert.equal(closeCount, 1);
  assert.deepEqual(client.getStatus().state, 'closed');
});

test('assertOpen returns the client while open and rejects use after close', () => {
  const client = new ChatJSClient();

  assert.equal(client.assertOpen(), client);
  client.close();

  assert.throws(
    () => client.assertOpen(),
    (error) => error instanceof ChatJSError && error.code === 'CHATJS_CLIENT_CLOSED'
  );
});

test('the package version is a non-empty string', () => {
  assert.equal(typeof version, 'string');
  assert.match(version, /^\d+\.\d+\.\d+/);
});
