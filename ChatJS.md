# ChatJS — Node.js Module Documentation

This is the user-facing documentation for the **ChatJS Node.js module**. It is separate from the ChatJS Project's engineering memory in /docs.

## Overview

ChatJS is an independent Node.js module intended to implement useful capabilities inspired by **ChatGPT mobile first**, plus applicable **ChatGPT desktop Work and Codex** workflows.

ChatJS is a feature-reference project, not a client for the ChatGPT service. It does not connect to ChatGPT accounts, use OpenAI Platform APIs or API keys, use Sign in with ChatGPT OAuth, or access private ChatGPT endpoints/session data. It is not affiliated with, endorsed by, or sponsored by OpenAI.

## Product scope

Intended Node.js feature areas include:
- local conversation and project containers, instructions, and opt-in memory;
- explicit, confined local workspaces and bounded file operations;
- Work-style task orchestration, progress, cancellation, and approval gates;
- Codex-style local repository inspection, diffs, command/test execution, and reviewed file changes;
- local artifact generation for genuinely supported document formats;
- explicit browser, desktop, microphone, camera, and screen adapters only where a real supported Node.js/platform mechanism exists.

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features are explicitly out of scope.

ChatJS cannot inherit Android app permissions from the reference APK. Mobile camera, microphone, video, and screen-sharing experiences require native host access; they are not automatically available to a portable Node.js module.

No non-OpenAI inference engine has been selected. Model-powered responses, reasoning, code authoring, voice conversations, image understanding/generation, and autonomous agent decisions are not implemented and must not be simulated. Local deterministic Work/Codex tooling can be built independently.

## Current implementation

The repository currently contains the initial foundation only. It provides:
- CommonJS and ECMAScript module entry points;
- a minimal client factory and constructor;
- a typed base error;
- basic lifecycle state, open-state validation, and idempotent close behavior;
- TypeScript declarations.

It does not currently implement local workspace, file, command, task, memory, voice, image, or desktop-control features.

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

Creates and returns a ChatJS.Client. Options must be a plain object when supplied. The client keeps a shallow frozen copy. Invalid options throw ChatJS.Error with code CHATJS_INVALID_OPTIONS.

Creating the foundation client makes no network requests and collects no telemetry.

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

The status identifies the current implementation as a foundation scaffold. It does not imply that any ChatGPT-inspired feature is available.

### client.assertOpen()

Returns the client when it is open. Throws ChatJS.Error with code CHATJS_CLIENT_CLOSED after close.

### client.close()

Closes the client, emits one close event, and removes event listeners. Repeated calls are safe.

### Events and errors

The client extends Node.js EventEmitter and currently emits one close event. ChatJS.Error extends Error and exposes a code property.

| Code | Meaning |
| --- | --- |
| CHATJS_ERROR | General ChatJS error |
| CHATJS_INVALID_OPTIONS | Client options were not a plain object |
| CHATJS_CLIENT_CLOSED | An operation requiring an open client was attempted after close |

Errors must not expose credentials or private user content. The error catalogue expands only when real capabilities are implemented.

## Module formats and TypeScript

CommonJS exposes ChatJS.Client, ChatJS.Error, and ChatJS.create. ESM exposes named exports ChatJSClient, ChatJSError, createChatJS and a default ChatJS object. TypeScript declarations are provided in types/index.d.ts.

## Distribution archive

Run:

```bash
npm run archive
```

This creates dist/ChatJS.tar.gz. The archive contains only package.json, ChatJS.md, README.md, LICENSE, src/index.cjs, src/index.mjs, and types/index.d.ts. It excludes project documentation, tests, GitHub configuration, and the Android reference APK. CI verifies the archive, extracts it, tests CommonJS/ESM loading, and uploads it as a workflow artifact. It is not a numbered release.

## Engineering and privacy principles

- No OpenAI Platform API, API keys, Sign in with ChatGPT OAuth, private ChatGPT endpoints, or app session/cookie reuse.
- No telemetry, analytics, tracking, ads, profiling, hidden data collection, background reporting, phone-home, or remote diagnostics.
- No unsolicited network requests or automatic content uploads. External adapters must be explicit, configured, authorized, and scoped.
- Predictable async behavior, cancellation, timeouts, retries, concurrency, and cleanup.
- Validate file paths and command inputs; protect credentials and private user data.
- No fake generated responses, silent no-ops, or misleading compatibility claims.
- No Git branch/worktree creation; repository work stays on main.

For product evidence, architecture, capability status, and project continuity, see [the ChatJS project documentation](https://github.com/codexclai/ChatJS/tree/main/docs).
