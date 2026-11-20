# ChatJS — Node.js Module Documentation

This is the user-facing documentation for the **ChatJS Node.js module**. It is separate from the ChatJS Project's engineering memory in `/docs`.

## Overview

ChatJS is one comprehensive, general-purpose Node.js module intended to bring together the actual client-side systems and workflows of official ChatGPT mobile and ChatGPT desktop (including Work and Codex).

The goal is to adapt the real client behavior to Node.js—not to imitate visible feature names, substitute a different model service, or recreate ChatGPT's server. The supplied APK/MSIX contents are the technical references for the client-side implementation. This includes code and compiled modules, request and response construction, payload schemas, serialization, transport, connection/authentication/session flows, local state, tools, and packaged resources. A client interface must not be dismissed solely because public developer documentation does not describe it.

ChatJS must remain reusable across different Node.js applications, hosts, operating systems, and deployment environments. It is not a device-specific mobile/desktop app and does not assume particular hardware. ChatJS is independent and is not affiliated with or endorsed by OpenAI.

## Product shape

Intended areas include:
- the real ChatGPT client connection and the client-side request/response, transport, authentication/session, and streaming behavior found in the supplied packages;
- conversations, threads, context, project containers, instructions, and memory;
- file and attachment handling and local processing;
- desktop Work/Codex patterns such as workspaces, file operations, task progress, approvals, command/test execution, repository inspection, diffs/review, and local artifacts;
- optional host integrations for browser, voice, image, camera, microphone, screen, or desktop facilities where the consuming environment provides the relevant mechanism.

The portable core must remain usable without a particular camera, microphone, screen, browser, operating system, or device API.

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features are out of scope.

## Client-package references

The Android personal Library archive contains the full extracted APK payload tree: 4,987 payload files (106,501,945 uncompressed bytes), including ten compiled DEX files and 121 compiled Valdi modules, plus a README and structured inventory. The 59,454,036-byte Library ZIP has 4,989 entries and passed ZIP integrity testing on 2026-11-20. It is actual compiled client implementation material, not a metadata-only report. Source-level DEX/Valdi reconstruction and full behavior tracing are not yet recorded as complete. See `docs/REFERENCE_APK.md`.

Windows archive work is currently deferred by the owner. The current Library item `ChatJS-Windows.zip` is metadata-only; a preceding conversation recorded a larger remote extracted archive but its Library transfer was incomplete and is not reverified here. See `docs/REFERENCE_DESKTOP.md`.

Project Sources are intentionally kept empty. Use the personal Library and committed reference notes.

## Current implementation

The repository currently provides:
- CommonJS and ECMAScript module entry points;
- a minimal client factory and constructor;
- a typed base error;
- basic lifecycle state, open-state validation, and idempotent close behavior;
- TypeScript declarations.

The real ChatGPT connection and client workflows are not implemented yet. Do not claim account access or feature compatibility until actual Node.js code and end-to-end tests establish it.

## Installation

```bash
npm install github:codexclai/ChatJS
```

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

### `ChatJS.create(options?)`

Creates and returns a `ChatJS.Client`. Options must be a plain object when supplied. The client keeps a shallow frozen copy. Invalid options throw `ChatJS.Error` with code `CHATJS_INVALID_OPTIONS`.

The current foundation client makes no network requests and collects no telemetry.

### `new ChatJS.Client(options?)`

Constructs a client directly using the same input validation as the factory.

### `client.getStatus()`

Returns a frozen status snapshot:

```js
{
  state: 'initialized', // or 'closed'
  implementationStatus: 'foundation-only'
}
```

This identifies the current implementation as a foundation. It does not imply that the real ChatGPT integration or planned workflows are available.

### `client.assertOpen()`

Returns the client when it is open. Throws `ChatJS.Error` with code `CHATJS_CLIENT_CLOSED` after close.

### `client.close()`

Closes the client, emits one close event, and removes event listeners. Repeated calls are safe.

### Events and errors

The client extends Node.js `EventEmitter` and currently emits one `close` event. `ChatJS.Error` extends `Error` and exposes a `code` property.

| Code | Meaning |
| --- | --- |
| `CHATJS_ERROR` | General ChatJS error |
| `CHATJS_INVALID_OPTIONS` | Client options were not a plain object |
| `CHATJS_CLIENT_CLOSED` | An operation requiring an open client was attempted after close |

Errors must not expose credentials or private user content. Expand the error catalogue only when real capabilities are implemented.

## Module formats and TypeScript

CommonJS exposes `ChatJS.Client`, `ChatJS.Error`, and `ChatJS.create`. ESM exposes named exports `ChatJSClient`, `ChatJSError`, `createChatJS` and a default ChatJS object. TypeScript declarations are provided in `types/index.d.ts`.

## Distribution archive

Run:

```bash
npm run archive
```

This creates `dist/ChatJS.tar.gz`. The archive contains only distributable module files and excludes project documentation, tests, GitHub configuration, and private reference archives. CI verifies it, extracts it, tests CommonJS/ESM loading, and uploads it as a workflow artifact. It is not a numbered release.

## Engineering and privacy principles

- Target the actual ChatGPT mobile/desktop client behavior evidenced in the supplied packages; do not substitute Platform API/key workflows or another inference provider.
- Use client-side request, payload, connection, and authentication/session implementation evidence even when public developer documentation does not cover the interface.
- Do not bypass authentication, account authorization, access controls, or entitlements. Never hardcode, log, publish, or commit user credentials/session material.
- No telemetry, analytics, tracking, ads, profiling, hidden data collection, background reporting, phone-home, or remote diagnostics.
- No unsolicited network requests or automatic content uploads. Network activity must result from an explicit ChatJS operation.
- Host-specific facilities are optional; the portable core must not assume particular hardware or a specific host.
- Predictable async behavior, cancellation, timeouts, concurrency, backpressure, errors, and cleanup.
- Validate inputs and protect user data.
- No fake output, silent no-ops, or misleading compatibility claims.
- Keep Git work on `main`; do not create branches or worktrees.

For product evidence, architecture, capability status, and continuity, see [the ChatJS project documentation](https://github.com/codexclai/ChatJS/tree/main/docs).
