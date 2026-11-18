'use strict';

const { EventEmitter } = require('node:events');

class ChatJSError extends Error {
  constructor(message, options = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = 'ChatJSError';
    this.code = options.code || 'CHATJS_ERROR';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ChatJSError);
    }
  }
}

class ChatJSClient extends EventEmitter {
  #closed = false;

  constructor(options = {}) {
    super();

    if (
      options === null ||
      typeof options !== 'object' ||
      Array.isArray(options) ||
      (Object.getPrototypeOf(options) !== Object.prototype &&
        Object.getPrototypeOf(options) !== null)
    ) {
      throw new ChatJSError('ChatJS options must be a plain object.', {
        code: 'CHATJS_INVALID_OPTIONS'
      });
    }

    this.options = Object.freeze({ ...options });
  }

  get closed() {
    return this.#closed;
  }

  getStatus() {
    return Object.freeze({
      state: this.#closed ? 'closed' : 'initialized',
      implementationStatus: 'foundation-only'
    });
  }

  assertOpen() {
    if (this.#closed) {
      throw new ChatJSError('This ChatJS client has been closed.', {
        code: 'CHATJS_CLIENT_CLOSED'
      });
    }
    return this;
  }

  close() {
    if (this.#closed) {
      return;
    }

    this.#closed = true;
    this.emit('close');
    this.removeAllListeners();
  }
}

function createChatJS(options) {
  return new ChatJSClient(options);
}

module.exports = Object.freeze({
  Client: ChatJSClient,
  Error: ChatJSError,
  create: createChatJS
});
