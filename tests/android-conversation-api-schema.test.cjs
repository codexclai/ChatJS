'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const api = require('../src/chatgpt/android-conversation-api-schema.cjs');

test('model catalog request uses the exact Android route and ordered boolean query', () => {
  assert.deepEqual(api.buildModelCatalogRequest({
    iim: true,
    supports_model_picker_upgrade_presets: false
  }), {
    method: 'GET',
    path: '/backend-api/models?iim=true&supports_model_picker_upgrade_presets=false'
  });
});

test('model catalog request requires both generated boolean fields', () => {
  assert.throws(() => api.buildModelCatalogRequest({ iim: true }), {
    name: 'AndroidConversationApiSchemaError',
    code: 'CHATGPT_ANDROID_API_INVALID_SCHEMA'
  });
  assert.throws(() => api.buildModelCatalogRequest({
    iim: 'true',
    supports_model_picker_upgrade_presets: false
  }), /iim must be a boolean/);
});

test('chat requirements request is POST with an empty JSON object', () => {
  assert.deepEqual(api.buildChatRequirementsRequest(), {
    method: 'POST',
    path: '/backend-api/sentinel/chat-requirements',
    body: {}
  });
});

test('model catalog response decodes known nested fields and preserves extra properties', () => {
  const source = {
    default_model_slug: 'model-a',
    models: [{ slug: 'model-b', title: 'kept' }],
    versions: [{ intelligence_presets: [{ model_slug: 'model-c', custom: 7 }] }],
    extra: { retained: true }
  };
  const decoded = api.decodeModelCatalogResponse(source);
  assert.deepEqual(decoded, source);
  assert.notEqual(decoded, source);
  assert.notEqual(decoded.models, source.models);
  assert.deepEqual(decoded.models[0], source.models[0]);
});

test('model catalog optional fields accept omission but reject null and wrong nested types', () => {
  assert.deepEqual(api.decodeModelCatalogResponse({ default_model_slug: 'model-a' }), {
    default_model_slug: 'model-a'
  });
  for (const invalid of [
    { default_model_slug: 'model-a', models: null },
    { default_model_slug: 'model-a', versions: null },
    { default_model_slug: 'model-a', models: [{}, null] },
    { default_model_slug: 'model-a', versions: [{ intelligence_presets: null }] },
    { default_model_slug: 'model-a', versions: [{ intelligence_presets: [{ model_slug: null }] }] },
    { default_model_slug: 'model-a', models: [{ slug: 42 }] }
  ]) {
    assert.throws(() => api.decodeModelCatalogResponse(invalid));
  }
  assert.throws(() => api.decodeModelCatalogResponse({ default_model_slug: null }));
});

test('chat requirements response validates token and optional challenge arrays', () => {
  const source = {
    token: 'requirements-token',
    turnstile: [{ required: false, sitekey: 'extra' }],
    proofofwork: [],
    so: [{ provider: 'extra' }],
    server_extension: 1
  };
  assert.deepEqual(api.decodeChatRequirementsResponse(source), source);
  assert.deepEqual(api.decodeChatRequirementsResponse({ token: 'token' }), { token: 'token' });
  assert.throws(() => api.decodeChatRequirementsResponse({ token: 7 }));
  assert.throws(() => api.decodeChatRequirementsResponse({ token: 'token', so: null }));
  assert.throws(() => api.decodeChatRequirementsResponse({ token: 'token', turnstile: [{ required: null }] }));
});

test('default requirements provider returns only the real token when no challenge requires device integrity', () => {
  const response = {
    token: '  original-token  ',
    turnstile: [{ required: false }],
    proofofwork: [],
    so: [{ required: false }]
  };
  assert.equal(api.requiresDeviceIntegrity(response), false);
  assert.deepEqual(api.resolveDefaultRequirementsIntegrityHeader(response), {
    name: 'OpenAI-Sentinel-Chat-Requirements-Token',
    value: '  original-token  '
  });
});

test('any required challenge fails closed instead of fabricating or omitting device integrity', () => {
  for (const field of ['turnstile', 'proofofwork', 'so']) {
    const response = { token: 'token', [field]: [{ required: true }] };
    assert.equal(api.requiresDeviceIntegrity(response), true);
    assert.throws(() => api.resolveDefaultRequirementsIntegrityHeader(response), {
      name: 'AndroidConversationApiSchemaError',
      code: 'CHATGPT_ANDROID_API_DEVICE_INTEGRITY_REQUIRED'
    });
  }
});

test('requirements token must be non-empty after trimming', () => {
  assert.throws(() => api.resolveDefaultRequirementsIntegrityHeader({ token: '  ' }), {
    name: 'AndroidConversationApiSchemaError',
    code: 'CHATGPT_ANDROID_API_EMPTY_REQUIREMENTS_TOKEN'
  });
});
