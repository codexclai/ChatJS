# ChatJS — Node.js Module Documentation

This is the user-facing documentation for the **ChatJS Node.js module**. It is separate from the ChatJS Project's engineering memory in /docs.

## Overview

ChatJS is an independent Node.js module being developed to provide a comprehensive, modular implementation of observable ChatGPT capabilities and workflows.

The goal is broad compatibility with ChatGPT mobile and related experiences wherever authorized interfaces and technical constraints allow. ChatJS is intended to be a cohesive Node.js library—not simply a thin API wrapper—with a consistent client, capability modules, asynchronous workflows, streaming, events, tools and multimodal support.

ChatJS is not affiliated with, endorsed by or sponsored by OpenAI.

## Current implementation

The repository currently contains the initial foundation only. It provides:

- CommonJS and ECMAScript module entry points.
- A minimal client factory and constructor.
- A typed base error.
- Basic lifecycle state, open-state validation and idempotent close behavior.
- TypeScript declarations.

It does **not** currently authenticate with ChatGPT, connect to a ChatGPT service, send messages, stream responses, use tools, select models, upload files, handle images or audio, or implement other ChatGPT product features. Those features are planned or under research until implemented and verified.

## Installation

Install the public GitHub repository directly:

```bash
npm install github:codexclai/ChatJS
```

The exact module name is **ChatJS**. The project intentionally does not publish to the npm registry or use ChatJS product release numbering.

## Usage

### CommonJS

```js
const ChatJS = require('ChatJS');

const client = ChatJS.create();

console.log(client.getStatus());

client.close();
```

### ECMAScript modules

```js
import ChatJS from 'ChatJS';

const client = ChatJS.create();

console.log(client.getStatus());

client.close();
```

## Public API

### ChatJS.create(options?)

Creates and returns a ChatJS.Client.

- options must be a plain object when provided.
- The client keeps a shallow, frozen copy of the options.
- Invalid options throw ChatJS.Error with code CHATJS_INVALID_OPTIONS.

Creating the current foundation client makes no network requests and collects no telemetry.

### new ChatJS.Client(options?)

Constructs a client directly using the same input validation as the factory.

### client.getStatus()

Returns a frozen status snapshot:

```js
{
  state: 'initialized', // or 'closed'
  implementationStatus: 'foundation-only'
}
```

The status identifies the current implementation as a foundation scaffold. It does not imply that ChatGPT features are available.

### client.assertOpen()

Returns the client when it is open. Throws ChatJS.Error with code CHATJS_CLIENT_CLOSED after the client has been closed.

### client.close()

Closes the client, emits one close event and removes event listeners. Repeated calls are safe and have no additional effect.

### Events

The client extends Node.js EventEmitter. The current foundation emits:

| Event | Behavior |
| --- | --- |
| close | Emitted once when the client is closed |

Future event payloads and ordering guarantees must be documented alongside their implementations.

### Errors

ChatJS.Error extends the built-in Error class and exposes a code property.

| Code | Meaning |
| --- | --- |
| CHATJS_ERROR | General ChatJS error |
| CHATJS_INVALID_OPTIONS | Client options were not a plain object |
| CHATJS_CLIENT_CLOSED | An operation requiring an open client was attempted after close |

Errors must not expose credentials or private user content. The error catalogue will expand when real capabilities are implemented.

## Module formats and TypeScript

The same implementation backs both module systems.

CommonJS:
- ChatJS.Client
- ChatJS.Error
- ChatJS.create

ESM named exports:
- ChatJSClient
- ChatJSError
- createChatJS

ESM default export:
- ChatJS.Client
- ChatJS.Error
- ChatJS.create

TypeScript declarations are provided in types/index.d.ts.

## Distribution archive

Build the module-only archive:

```bash
npm run archive
```

This creates dist/ChatJS.tar.gz. The archive contains only:
- package.json
- ChatJS.md
- README.md
- LICENSE
- src/index.cjs
- src/index.mjs
- types/index.d.ts

It excludes project documentation, tests, GitHub configuration and the Android reference APK. GitHub Actions builds and verifies this archive, extracts it, tests CommonJS and ESM loading, and uploads it as a downloadable workflow artifact. It is a plain module distribution, not a numbered release.

## Compatibility and access boundaries

The ChatGPT mobile application may depend on private services, application-only credentials, account entitlements, platform integrations or internal protocols. A Node.js module cannot assume access to those systems.

ChatJS prioritizes official, documented and otherwise authorized interfaces. It will not bypass authentication, access controls, rate limits, certificate checks or platform security. A visible mobile feature is not automatically available to third-party Node.js code.

Compatibility claims must distinguish:
- **Verified public behavior:** supported by an official documented interface or reproducible tests.
- **Observed behavior:** seen in the reference application or supplied observations, but not established as a public integration contract.
- **Planned or unknown:** desired, unimplemented or awaiting evidence.

Do not claim full 1:1 compatibility until repeatable conformance tests substantiate it.

## Engineering and privacy principles

- Keep the core cohesive, modular and dependency-light.
- No telemetry, analytics, tracking, ads, profiling, hidden data collection, background reporting, phone-home or remote diagnostics.
- Make no unsolicited network requests. Network access is reserved for explicit operations through documented, configured and authorized interfaces.
- Use predictable async behavior, streaming, cancellation, timeouts, retries, concurrency and cleanup.
- Use typed errors and validate inputs at system boundaries.
- Protect credentials and private user data; do not log sensitive content by default.
- Test real behavior, including success, failure, cancellation and concurrency.
- Avoid fake feature support, canned responses, silent no-ops and misleading claims.

For engineering, architecture, feature tracking and project continuity, see the [ChatJS project documentation on GitHub](https://github.com/codexclai/ChatJS/tree/main/docs).