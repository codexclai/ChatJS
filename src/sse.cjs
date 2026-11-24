'use strict';

const DEFAULT_MAX_LINE_LENGTH = 1024 * 1024;
const DEFAULT_MAX_EVENT_BYTES = 8 * 1024 * 1024;

class ServerSentEventError extends Error {
  constructor(message, options = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = 'ServerSentEventError';
    this.code = options.code || 'CHATJS_SSE_ERROR';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerSentEventError);
    }
  }
}

function requirePlainObject(value, label) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new ServerSentEventError(label + ' must be a plain object.', {
      code: 'CHATJS_SSE_INVALID_OPTIONS'
    });
  }

  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new ServerSentEventError(label + ' must be a plain object.', {
      code: 'CHATJS_SSE_INVALID_OPTIONS'
    });
  }
}

function positiveSafeInteger(value, label, fallback) {
  if (value === undefined) {
    return fallback;
  }

  if (!Number.isSafeInteger(value) || value < 1) {
    throw new ServerSentEventError(label + ' must be a positive safe integer.', {
      code: 'CHATJS_SSE_INVALID_OPTIONS'
    });
  }

  return value;
}

function abortError() {
  return new ServerSentEventError('The Server-Sent Events stream was aborted.', {
    code: 'CHATJS_SSE_ABORTED'
  });
}

function getAsyncIterator(source) {
  if (source === null || source === undefined) {
    throw new ServerSentEventError('A byte stream implementing Symbol.asyncIterator is required.', {
      code: 'CHATJS_SSE_INVALID_INPUT'
    });
  }

  const iteratorFactory = source[Symbol.asyncIterator];
  if (typeof iteratorFactory !== 'function') {
    throw new ServerSentEventError('The Server-Sent Events source must be an async iterable of byte chunks.', {
      code: 'CHATJS_SSE_INVALID_INPUT'
    });
  }

  const iterator = iteratorFactory.call(source);
  if (iterator === null || typeof iterator.next !== 'function') {
    throw new ServerSentEventError('The Server-Sent Events source returned an invalid async iterator.', {
      code: 'CHATJS_SSE_INVALID_INPUT'
    });
  }

  return iterator;
}

async function nextChunk(iterator, signal, abortPromise) {
  if (!signal) {
    return iterator.next();
  }

  if (signal.aborted) {
    throw abortError();
  }

  return Promise.race([iterator.next(), abortPromise]);
}

/**
 * Parse a byte stream using the WHATWG Server-Sent Events framing rules.
 *
 * The parser deliberately does not reconnect, retry requests, interpret
 * application payloads, or contact a service. Those decisions belong to the
 * owning ChatGPT transport/session implementation.
 *
 * @param {AsyncIterable<Uint8Array>} source
 * @param {{signal?: AbortSignal, maxLineLength?: number, maxEventBytes?: number}} options
 */
async function* parseServerSentEvents(source, options = {}) {
  requirePlainObject(options, 'Server-Sent Events options');

  const maxLineLength = positiveSafeInteger(
    options.maxLineLength,
    'maxLineLength',
    DEFAULT_MAX_LINE_LENGTH
  );
  const maxEventBytes = positiveSafeInteger(
    options.maxEventBytes,
    'maxEventBytes',
    DEFAULT_MAX_EVENT_BYTES
  );
  const signal = options.signal;

  if (
    signal !== undefined &&
    (signal === null ||
      typeof signal !== 'object' ||
      typeof signal.addEventListener !== 'function' ||
      typeof signal.removeEventListener !== 'function')
  ) {
    throw new ServerSentEventError('signal must be an AbortSignal.', {
      code: 'CHATJS_SSE_INVALID_OPTIONS'
    });
  }

  if (signal && signal.aborted) {
    throw abortError();
  }

  const iterator = getAsyncIterator(source);
  let completed = false;
  let abortListener;
  let abortPromise;

  if (signal) {
    abortPromise = new Promise((resolve, reject) => {
      abortListener = () => reject(abortError());
      signal.addEventListener('abort', abortListener, { once: true });
      if (signal.aborted) {
        abortListener();
      }
    });
  }

  const decoder = new TextDecoder('utf-8');
  let firstText = true;
  let skipLeadingLf = false;
  let currentLine = '';
  let dataLines = [];
  let eventType = '';
  let lastEventId = '';
  let retryDelay = undefined;
  let eventBytes = 0;

  function addEventBytes(value) {
    eventBytes += Buffer.byteLength(value, 'utf8');
    if (eventBytes > maxEventBytes) {
      throw new ServerSentEventError('A Server-Sent Event exceeded maxEventBytes.', {
        code: 'CHATJS_SSE_EVENT_LIMIT'
      });
    }
  }

  function processFieldLine(line) {
    if (line === '') {
      if (dataLines.length === 0) {
        eventType = '';
        eventBytes = 0;
        return null;
      }

      const event = {
        type: eventType || 'message',
        data: dataLines.join('\n'),
        lastEventId
      };

      if (retryDelay !== undefined) {
        event.retry = retryDelay;
      }

      dataLines = [];
      eventType = '';
      eventBytes = 0;
      return Object.freeze(event);
    }

    addEventBytes(line);

    if (line[0] === ':') {
      return null;
    }

    const colon = line.indexOf(':');
    const field = colon === -1 ? line : line.slice(0, colon);
    let value = colon === -1 ? '' : line.slice(colon + 1);

    if (value.startsWith(' ')) {
      value = value.slice(1);
    }

    if (field === 'data') {
      addEventBytes(value);
      dataLines.push(value);
    } else if (field === 'event') {
      addEventBytes(value);
      eventType = value;
    } else if (field === 'id') {
      if (!value.includes('\0')) {
        addEventBytes(value);
        lastEventId = value;
      }
    } else if (field === 'retry' && /^[0-9]+$/.test(value)) {
      const parsed = Number(value);
      if (Number.isSafeInteger(parsed)) {
        retryDelay = parsed;
      }
    }

    return null;
  }

  function processLine(line) {
    return processFieldLine(line);
  }

  function* processText(text) {
    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];

      if (skipLeadingLf) {
        skipLeadingLf = false;
        if (character === '\n') {
          continue;
        }
      }

      if (character === '\r') {
        const event = processLine(currentLine);
        currentLine = '';
        skipLeadingLf = true;
        if (event) {
          yield event;
        }
      } else if (character === '\n') {
        const event = processLine(currentLine);
        currentLine = '';
        if (event) {
          yield event;
        }
      } else {
        currentLine += character;
        if (currentLine.length > maxLineLength) {
          throw new ServerSentEventError('A Server-Sent Events line exceeded maxLineLength.', {
            code: 'CHATJS_SSE_LINE_LIMIT'
          });
        }
      }
    }
  }

  try {
    while (true) {
      const result = await nextChunk(iterator, signal, abortPromise);
      if (result.done) {
        completed = true;
        break;
      }

      if (!(result.value instanceof Uint8Array)) {
        throw new ServerSentEventError('The Server-Sent Events source yielded a non-byte chunk.', {
          code: 'CHATJS_SSE_INVALID_CHUNK'
        });
      }

      let text = decoder.decode(result.value, { stream: true });
      if (firstText) {
        firstText = false;
        if (text.startsWith('\uFEFF')) {
          text = text.slice(1);
        }
      }

      yield* processText(text);
    }

    let finalText = decoder.decode();
    if (firstText && finalText.startsWith('\uFEFF')) {
      finalText = finalText.slice(1);
    }

    yield* processText(finalText);

    if (currentLine.length > 0) {
      processLine(currentLine);
    }
  } catch (error) {
    if (error instanceof ServerSentEventError) {
      throw error;
    }

    if (signal && signal.aborted) {
      throw abortError();
    }

    throw new ServerSentEventError('Unable to parse the Server-Sent Events stream.', {
      code: 'CHATJS_SSE_STREAM_FAILED',
      cause: error
    });
  } finally {
    if (signal && abortListener) {
      signal.removeEventListener('abort', abortListener);
    }

    if (!completed && typeof iterator.return === 'function') {
      try {
        await iterator.return();
      } catch {
        // Preserve the parse/abort outcome if stream cleanup itself fails.
      }
    }
  }
}

module.exports = Object.freeze({
  ServerSentEventError,
  parseServerSentEvents
});