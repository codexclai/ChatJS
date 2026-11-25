'use strict';

const MODEL_CATALOG_PATH = '/backend-api/models';
const CHAT_REQUIREMENTS_PATH = '/backend-api/sentinel/chat-requirements';
const REQUIREMENTS_TOKEN_HEADER = 'OpenAI-Sentinel-Chat-Requirements-Token';

class AndroidConversationApiSchemaError extends Error {
  constructor(message, code = 'CHATGPT_ANDROID_API_INVALID_SCHEMA') {
    super(message);
    this.name = 'AndroidConversationApiSchemaError';
    this.code = code;
  }
}

function requireObject(value, label) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new AndroidConversationApiSchemaError(label + ' must be an object.');
  }
  return { ...value };
}

function requireString(value, field, label) {
  if (typeof value !== 'string') {
    throw new AndroidConversationApiSchemaError(label + '.' + field + ' must be a string.');
  }
}

function requireBoolean(value, field, label) {
  if (typeof value !== 'boolean') {
    throw new AndroidConversationApiSchemaError(label + '.' + field + ' must be a boolean.');
  }
}

function decodeOptionalStringField(object, field, label) {
  if (object[field] !== undefined) requireString(object[field], field, label);
}

function decodeOptionalBooleanField(object, field, label) {
  if (object[field] !== undefined) requireBoolean(object[field], field, label);
}

function decodeOptionalArrayField(object, field, label, decoder) {
  if (object[field] === undefined) return;
  if (!Array.isArray(object[field])) {
    throw new AndroidConversationApiSchemaError(label + '.' + field + ' must be an array.');
  }
  object[field] = object[field].map((item, index) => decoder(item, label + '.' + field + '[' + index + ']'));
  return;
}

function decodeModelCatalogRequest(value) {
  const result = requireObject(value, 'ModelCatalogRequest');
  requireBoolean(result.iim, 'iim', 'ModelCatalogRequest');
  requireBoolean(
    result.supports_model_picker_upgrade_presets,
    'supports_model_picker_upgrade_presets',
    'ModelCatalogRequest'
  );
  return result;
}

function buildModelCatalogRequest(value) {
  const request = decodeModelCatalogRequest(value);
  const query = [
    'iim=' + encodeURIComponent(String(request.iim)),
    'supports_model_picker_upgrade_presets=' + encodeURIComponent(
      String(request.supports_model_picker_upgrade_presets)
    )
  ];
  return {
    method: 'GET',
    path: MODEL_CATALOG_PATH + '?' + query.join('&')
  };
}

function buildChatRequirementsRequest() {
  return {
    method: 'POST',
    path: CHAT_REQUIREMENTS_PATH,
    body: {}
  };
}

function decodeModelCatalogModel(value, label = 'ModelCatalogModel') {
  const result = requireObject(value, label);
  decodeOptionalStringField(result, 'slug', label);
  return result;
}

function decodeModelCatalogPreset(value, label = 'ModelCatalogPreset') {
  const result = requireObject(value, label);
  decodeOptionalStringField(result, 'model_slug', label);
  return result;
}

function decodeModelCatalogVersion(value, label = 'ModelCatalogVersion') {
  const result = requireObject(value, label);
  decodeOptionalArrayField(result, 'intelligence_presets', label, decodeModelCatalogPreset);
  return result;
}

function decodeModelCatalogResponse(value) {
  const result = requireObject(value, 'ModelCatalogResponse');
  requireString(result.default_model_slug, 'default_model_slug', 'ModelCatalogResponse');
  decodeOptionalArrayField(result, 'models', 'ModelCatalogResponse', decodeModelCatalogModel);
  decodeOptionalArrayField(result, 'versions', 'ModelCatalogResponse', decodeModelCatalogVersion);
  return result;
}

function decodeChatRequirementChallenge(value, label = 'ChatRequirementChallenge') {
  const result = requireObject(value, label);
  decodeOptionalBooleanField(result, 'required', label);
  return result;
}

function decodeChatRequirementsResponse(value) {
  const result = requireObject(value, 'ChatRequirementsResponse');
  requireString(result.token, 'token', 'ChatRequirementsResponse');
  decodeOptionalArrayField(result, 'turnstile', 'ChatRequirementsResponse', decodeChatRequirementChallenge);
  decodeOptionalArrayField(result, 'proofofwork', 'ChatRequirementsResponse', decodeChatRequirementChallenge);
  decodeOptionalArrayField(result, 'so', 'ChatRequirementsResponse', decodeChatRequirementChallenge);
  return result;
}

function requiresDeviceIntegrity(value) {
  const response = decodeChatRequirementsResponse(value);
  return ['turnstile', 'proofofwork', 'so'].some((field) =>
    (response[field] || []).some((challenge) => challenge.required === true)
  );
}

function resolveDefaultRequirementsIntegrityHeader(value) {
  const response = decodeChatRequirementsResponse(value);
  if (typeof response.token !== 'string' || response.token.trim().length === 0) {
    throw new AndroidConversationApiSchemaError(
      'The ChatGPT chat-requirements token is empty.',
      'CHATGPT_ANDROID_API_EMPTY_REQUIREMENTS_TOKEN'
    );
  }

  if (['turnstile', 'proofofwork', 'so'].some((field) =>
    (response[field] || []).some((challenge) => challenge.required === true)
  )) {
    throw new AndroidConversationApiSchemaError(
      'ChatGPT requires a device-integrity provider for this conversation.',
      'CHATGPT_ANDROID_API_DEVICE_INTEGRITY_REQUIRED'
    );
  }

  return {
    name: REQUIREMENTS_TOKEN_HEADER,
    value: response.token
  };
}

module.exports = Object.freeze({
  MODEL_CATALOG_PATH,
  CHAT_REQUIREMENTS_PATH,
  REQUIREMENTS_TOKEN_HEADER,
  AndroidConversationApiSchemaError,
  decodeModelCatalogRequest,
  buildModelCatalogRequest,
  buildChatRequirementsRequest,
  decodeModelCatalogModel,
  decodeModelCatalogPreset,
  decodeModelCatalogVersion,
  decodeModelCatalogResponse,
  decodeChatRequirementChallenge,
  decodeChatRequirementsResponse,
  requiresDeviceIntegrity,
  resolveDefaultRequirementsIntegrityHeader
});
