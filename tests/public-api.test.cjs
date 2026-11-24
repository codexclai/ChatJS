'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const ChatJS = require('../src/index.cjs');
const packageMetadata = require('../package.json');

test('package identity is exactly ChatJS and has no product version field', () => {
  assert.equal(packageMetadata.name, 'ChatJS');
  assert.equal(Object.hasOwn(packageMetadata, 'version'), false);
  assert.equal(packageMetadata.private, true);
});

test('ChatJS exposes its client, error, and factory', () => {
  assert.equal(typeof ChatJS.Client, 'function');
  assert.equal(typeof ChatJS.Error, 'function');
  assert.equal(typeof ChatJS.create, 'function');
  assert.equal(ChatJS.Client, ChatJS.ChatJSClient);
  assert.equal(ChatJS.Error, ChatJS.ChatJSError);
  assert.equal(ChatJS.create, ChatJS.createChatJS);
});

test('factory creates a client with an explicit foundation status', () => {
  const client = ChatJS.create();

  assert.ok(client instanceof ChatJS.Client);
  assert.deepEqual(client.getStatus(), {
    state: 'initialized',
    implementationStatus: 'foundation-only'
  });
  assert.equal(client.closed, false);
  client.close();
});

test('client accepts a plain options object and freezes its shallow snapshot', () => {
  const client = new ChatJS.Client({ featureFlags: ['experimental'] });

  assert.deepEqual(client.options, { featureFlags: ['experimental'] });
  assert.equal(Object.isFrozen(client.options), true);
  client.close();
});

test('invalid constructor options produce a typed error', () => {
  assert.throws(
    () => new ChatJS.Client(null),
    (error) => error instanceof ChatJS.Error && error.code === 'CHATJS_INVALID_OPTIONS'
  );

  assert.throws(
    () => new ChatJS.Client(new Date()),
    (error) => error instanceof ChatJS.Error && error.code === 'CHATJS_INVALID_OPTIONS'
  );
});

test('close is idempotent and emits one close event', () => {
  const client = new ChatJS.Client();
  let closeCount = 0;

  client.on('close', () => {
    closeCount += 1;
  });

  client.close();
  client.close();

  assert.equal(client.closed, true);
  assert.equal(closeCount, 1);
  assert.equal(client.getStatus().state, 'closed');
});

test('assertOpen returns the client while open and rejects use after close', () => {
  const client = new ChatJS.Client();

  assert.equal(client.assertOpen(), client);
  client.close();

  assert.throws(
    () => client.assertOpen(),
    (error) => error instanceof ChatJS.Error && error.code === 'CHATJS_CLIENT_CLOSED'
  );
});


test('ChatJS exposes its native streaming parser and typed parser error', () => {
  assert.equal(typeof ChatJS.parseServerSentEvents, 'function');
  assert.equal(typeof ChatJS.ServerSentEventError, 'function');
});