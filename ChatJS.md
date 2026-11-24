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

The long-term product target is a comprehensive, all-in-one, highly customizable and dynamically adaptable module with broad host portability and production-grade behavior. These are requirements to implement and verify, not claims that every capability currently works everywhere. Customization must never bypass authentication, entitlements, first-party security checks, or other safety boundaries. See [the Product and Engineering Standard](https://github.com/codexclai/ChatJS/blob/main/docs/PRODUCT_STANDARD.md) for the complete target, control model, capability states, quality gates, and external-service limits.

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features are out of scope.

## Client-package references

The supplied Android app bundle and Windows installer are retained in ChatJS Project → Sources. Android is an XAPK containing the base APK and required splits. Windows is stored as two sequential installer pieces that must be joined in order before use. See `docs/REFERENCE_APK.md` and `docs/REFERENCE_DESKTOP.md` for source layout, verification, and limitations.

Project Sources are the normal source location. The personal Library is outside the normal workflow and is not a primary or routine source. Access it only when a concrete task makes specific material genuinely useful, necessary, and accessible. Any such material must be under a folder named `ChatJS Project` and limited to authentic, necessary sources and useful original findings.

The persistent browser profile `ChatJS` is the sole reusable default for ChatJS browser work. Never sign out of its Google or ChatGPT sessions or clear, reset, replace, delete, or recreate the profile. Temporary browser sessions are allowed only when genuinely required and must not be saved as additional reusable profiles.

## Current implementation

The repository currently provides:
- CommonJS and ECMAScript module entry points;
- a minimal client factory and constructor;
- a typed base error;
- basic lifecycle state, open-state validation, and idempotent close behavior;
- TypeScript declarations;
- a generic, bounded, cancellable Server-Sent Events parser for async byte streams.

The real ChatGPT connection, authenticated and accountless session lifecycle, and product-specific chat/Work workflows are not implemented yet. The SSE parser is only a reusable framing primitive; it does not send requests or interpret ChatGPT-specific payloads. Android source analysis has identified a guest-session state/storage subsystem and a guest-welcome presentation model. The welcome CTA action-29 click path reaches the login-child/onboarding coordinator, which reads current local session state and reconciles login-flow events; it is not proven to start a new guest session. A separate local guest-start path is dispatched by `Lt891` in `La991.G`: the `W891.a` branch instead forwards the current `Lw4h0` value to `Lcq41.e` and returns. Candidate `Lt891(5)` and `Lt891(6)` producers have been located in WebView and ConversationSidebar callback code. The WebView callback is supplied through `Llal1.h` or `Lej10.c`/`Ljpc`; the ConversationSidebar callback is forwarded through `Lp1w`/`Le2w.e` and parent `Le2w.j`/`Le2w.c` inputs. A scan of all ten DEX files found no direct call-site or method-handle binding to `La991.G` outside its own definition, so neither callback is proven to target that coordinator. The `Lt891` branch reaches local `Lgs31.b → Lau31.G` state coordination, not a recovered HTTP create request. The preference population source, server-side guest create/refresh request, and guest conversation send route remain unverified. These are research findings, not implemented ChatJS capabilities.

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

### ChatJS.parseServerSentEvents(source, options?)

Parses an AsyncIterable<Uint8Array> as a Server-Sent Events stream and returns an async iterator of frozen events:

    {
      type: 'message',
      data: '...',
      lastEventId: '...',
      retry: 1000 // present when a valid retry field has been received
    }

It handles incremental UTF-8 decoding, split line endings, multiline data fields, persistent event IDs and retry values, comments and unknown fields. options.signal aborts a pending read; maxLineLength and maxEventBytes bound parser memory (defaults: 1 MiB and 8 MiB). The parser closes the underlying iterator when iteration is cancelled.

This is not a ChatGPT connection, reconnection policy, authentication mechanism or product-specific event decoder. The caller must perform an explicit authorized request and pass its response body stream to the parser.

ChatJS.ServerSentEventError exposes a code for invalid input/options, malformed chunks, size limits, cancellation and stream failures.

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
| `CHATJS_SSE_INVALID_INPUT` | The SSE source is not an async iterable |
| `CHATJS_SSE_INVALID_CHUNK` | The SSE source yielded a non-byte chunk |
| `CHATJS_SSE_LINE_LIMIT` | An SSE line exceeded the configured limit |
| `CHATJS_SSE_EVENT_LIMIT` | An SSE event exceeded the configured limit |
| `CHATJS_SSE_ABORTED` | The SSE iteration was aborted |

Errors must not expose credentials or private user content. Expand the error catalogue only when real capabilities are implemented.

## Module formats and TypeScript

CommonJS exposes `ChatJS.Client`, `ChatJS.Error`, and `ChatJS.create`. ESM exposes named exports `ChatJSClient`, `ChatJSError`, `createChatJS`, `ServerSentEventError`, `parseServerSentEvents` and a default ChatJS object. TypeScript declarations are provided in `types/index.d.ts`.

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
