'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const { ServerSentEventError, parseServerSentEvents } = require('../src/sse.cjs');

function byteChunks(text, chunkSizes = [text.length]) {
  const bytes = Buffer.from(text, 'utf8');
  const chunks = [];
  let offset = 0;

  for (const size of chunkSizes) {
    if (offset >= bytes.length) {
      break;
    }
    chunks.push(bytes.subarray(offset, Math.min(offset + size, bytes.length)));
    offset += size;
  }

  if (offset < bytes.length) {
    chunks.push(bytes.subarray(offset));
  }

  return asyncChunks(chunks);
}

async function* asyncChunks(chunks) {
  for (const chunk of chunks) {
    yield chunk;
  }
}

async function collect(source, options) {
  const events = [];
  for await (const event of parseServerSentEvents(source, options)) {
    events.push(event);
  }
  return events;
}

test('parses multiline data, event names, ids, and persistent retry delays', async () => {
  const source = byteChunks(
    'id: 42\nretry: 2500\nevent: update\ndata: first\ndata: second\n\n' +
    'data: next\n\n'
  );

  assert.deepEqual(await collect(source), [
    { type: 'update', data: 'first\nsecond', lastEventId: '42', retry: 2500 },
    { type: 'message', data: 'next', lastEventId: '42', retry: 2500 }
  ]);
});

test('handles CR, LF, and CRLF even when CRLF is split across chunks', async () => {
  const source = byteChunks('data: one\r\ndata: two\rdata: three\n\n', [10, 1, 2, 1, 1, 4]);
  assert.deepEqual(await collect(source), [
    { type: 'message', data: 'one\ntwo\nthree', lastEventId: '' }
  ]);
});

test('strips a leading UTF-8 BOM and decodes characters split across chunks', async () => {
  const bytes = Buffer.from('\uFEFFdata: café 🐈\n\n', 'utf8');
  const chunks = [];

  for (let index = 0; index < bytes.length; index += 1) {
    chunks.push(bytes.subarray(index, index + 1));
  }

  assert.deepEqual(await collect(asyncChunks(chunks)), [
    { type: 'message', data: 'café 🐈', lastEventId: '' }
  ]);
});

test('ignores comments and unknown fields and does not dispatch empty data-less blocks', async () => {
  const source = byteChunks(
    ': keep-alive\nunknown: ignored\nid: 7\n\n' +
    'data:\n\n' +
    'data: visible\n\n'
  );

  assert.deepEqual(await collect(source), [
    { type: 'message', data: '', lastEventId: '7' },
    { type: 'message', data: 'visible', lastEventId: '7' }
  ]);
});

test('ignores id values containing NUL and invalid retry values', async () => {
  const source = byteChunks(
    'id: valid\n\n' +
    'id: invalid\u0000id\nretry: 2x\nretry: 9007199254740992\ndata: retained\n\n'
  );

  assert.deepEqual(await collect(source), [
    { type: 'message', data: 'retained', lastEventId: 'valid' }
  ]);
});

test('does not dispatch an event lacking the terminating blank line', async () => {
  const source = byteChunks('data: complete-looking-but-unterminated');
  assert.deepEqual(await collect(source), []);
});

test('enforces line and event byte limits', async () => {
  await assert.rejects(
    collect(byteChunks('data: 123456\n\n'), { maxLineLength: 8 }),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_LINE_LIMIT'
  );

  await assert.rejects(
    collect(byteChunks('data: 123456\n\n'), { maxEventBytes: 5 }),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_EVENT_LIMIT'
  );
});

test('validates source, chunks, and parser options', async () => {
  await assert.rejects(
    collect(null),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_INVALID_INPUT'
  );

  await assert.rejects(
    collect(asyncChunks(['data: not bytes\\n\\n'])),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_INVALID_CHUNK'
  );

  await assert.rejects(
    collect(byteChunks(''), { maxEventBytes: 0 }),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_INVALID_OPTIONS'
  );

  await assert.rejects(
    collect(byteChunks(''), null),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_INVALID_OPTIONS'
  );
});

test('aborts a pending read and returns the underlying iterator', async () => {
  const controller = new AbortController();
  let returned = false;

  const source = {
    [Symbol.asyncIterator]() {
      return {
        next() {
          return new Promise(() => {});
        },
        async return() {
          returned = true;
          return { done: true };
        }
      };
    }
  };

  const pending = collect(source, { signal: controller.signal });
  setImmediate(() => controller.abort());

  await assert.rejects(
    pending,
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_ABORTED'
  );
  assert.equal(returned, true);
});

test('breaking iteration releases the underlying stream iterator', async () => {
  let returned = false;
  const source = {
    async *[Symbol.asyncIterator]() {
      try {
        yield Buffer.from('data: first\n\n');
        yield Buffer.from('data: second\n\n');
      } finally {
        returned = true;
      }
    }
  };

  for await (const event of parseServerSentEvents(source)) {
    assert.equal(event.data, 'first');
    break;
  }

  assert.equal(returned, true);
});


test('counts empty data-field framing toward the event byte limit', async () => {
  const source = byteChunks('data:\\ndata:\\ndata:\\n\\n');
  await assert.rejects(
    collect(source, { maxEventBytes: 10 }),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_EVENT_LIMIT'
  );
});


test('accepts Node.js Readable and WHATWG ReadableStream byte sources', async () => {
  const nodeSource = Readable.from([
    Buffer.from('data: node stream\n\n')
  ]);
  assert.deepEqual(await collect(nodeSource), [
    { type: 'message', data: 'node stream', lastEventId: '' }
  ]);

  const webSource = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('data: web stream\n\n'));
      controller.close();
    }
  });
  assert.deepEqual(await collect(webSource), [
    { type: 'message', data: 'web stream', lastEventId: '' }
  ]);
});

test('does not acquire a source iterator when the signal is already aborted', async () => {
  const controller = new AbortController();
  let iteratorCreated = false;
  controller.abort();

  const source = {
    [Symbol.asyncIterator]() {
      iteratorCreated = true;
      return {
        async next() {
          return { done: true };
        }
      };
    }
  };

  await assert.rejects(
    collect(source, { signal: controller.signal }),
    (error) => error instanceof ServerSentEventError && error.code === 'CHATJS_SSE_ABORTED'
  );
  assert.equal(iteratorCreated, false);
});