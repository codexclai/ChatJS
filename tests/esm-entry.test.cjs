'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

test('ES module entry exposes the same public API', async () => {
  const api = await import('../src/index.mjs');

  assert.equal(typeof api.createChatJS, 'function');
  assert.equal(typeof api.ChatJSClient, 'function');
  assert.equal(typeof api.ChatJSError, 'function');
  assert.equal(typeof api.version, 'string');

  const client = api.createChatJS();
  assert.equal(client.getStatus().state, 'initialized');
  client.close();
});
