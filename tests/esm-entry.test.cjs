'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

test('ES module entry exposes named and default ChatJS exports', async () => {
  const api = await import('../src/index.mjs');

  assert.equal(typeof api.default.create, 'function');
  assert.equal(typeof api.createChatJS, 'function');
  assert.equal(typeof api.ChatJSClient, 'function');
  assert.equal(typeof api.ChatJSError, 'function');
  assert.equal(typeof api.ServerSentEventError, 'function');
  assert.equal(typeof api.parseServerSentEvents, 'function');

  const client = api.default.create();

  assert.equal(client.getStatus().state, 'initialized');
  client.close();
});
