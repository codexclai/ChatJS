# ChatJS — Node.js Module Documentation

This is the user-facing documentation for the **ChatJS Node.js module**. It is separate from the ChatJS Project's engineering memory in `/docs`.

## Overview

ChatJS is one conventional, general-purpose Node.js client module that consolidates the actual client-side capabilities and workflows of **ChatGPT mobile, ChatGPT desktop, and Codex CLI** under the single package name and API, **ChatJS**. These are three client/source families implemented through one Node.js module, not three separate packages or runtime products consumers need to install and launch.

The goal is to adapt the real client behavior to Node.js—not to imitate visible feature names, substitute a different model service, or recreate ChatGPT's server. The supplied APK/MSIX contents are the technical references for the client-side implementation. This includes code and compiled modules, request and response construction, payload schemas, serialization, transport, connection/authentication/session flows, local state, tools, and packaged resources. A client interface must not be dismissed solely because public developer documentation does not describe it.

ChatJS must remain reusable across different Node.js applications, hosts, operating systems, and deployment environments. It is not a device-specific mobile/desktop app and does not assume particular hardware. ChatJS is independent and is not affiliated with or endorsed by OpenAI.

## Product shape

Intended areas include:
- actual ChatGPT mobile and desktop client connection, request/response, transport, authentication/session, and streaming behavior;
- ChatGPT conversations, threads, context, projects, instructions, memory, files, attachments, images, video, voice, search, and tools where supported by the clients;
- Android cloud Work and Windows local Work as separate execution surfaces;
- Codex CLI-equivalent ChatGPT-backed coding-client workflows, including sessions/threads, task and event streaming, tools, local workspaces/files, command/test operations, approvals and artifacts where evidenced;
- optional host adapters for browser, voice, image, camera, microphone, screen, filesystem, process, or desktop facilities where the consuming environment provides the relevant mechanism.

The portable core must remain usable without a particular camera, microphone, screen, browser, operating system, or device API. ChatGPT is the only AI service target; ChatJS is not a multi-provider AI SDK, replacement app, server, or background daemon. Codex CLI is an in-scope capability family to implement inside ChatJS, not a subprocess dependency: consumers should not need to install or run the separate Codex executable or a Codex app-server for ChatJS to provide its implemented Codex workflows.

The long-term target includes comprehensive coverage, dynamic capability awareness, extensive safe customization/control, async and concurrent operations, true real-time streaming where supported, responsive and measured lightweight performance, current compatibility, and consumer-controlled long-running operation. These are requirements to implement and verify, not claims that every capability currently works everywhere or that ChatJS guarantees external-service uptime. Customization must never bypass authentication, entitlements, first-party security checks, or other safety boundaries. See [the Product and Engineering Standard](https://github.com/codexclai/ChatJS/blob/main/docs/PRODUCT_STANDARD.md) for the complete target and acceptance gates.

Every capability evidenced by the supplied first-party clients is within the product's candidate coverage. Feature-domain labels do not limit scope; implementation readiness depends on verified client behavior, legitimate service support, authorization, entitlements, and host capabilities. Verify real implementation and authorization rather than inferring support from a feature name.

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
- a private Android protocol helper for the generated model-catalog and chat-requirements routes and response schemas, including the default requirements-token fail-closed decision. It is side-effect-free and does not make requests, authenticate, or perform device attestation.

The real ChatGPT connection, authenticated and accountless session lifecycle, and product-specific chat/Work workflows are not implemented yet. The SSE parser is only a reusable framing primitive; it does not send requests or interpret ChatGPT-specific payloads. Android source analysis has identified a guest-session state/storage subsystem and a guest-welcome presentation model. The welcome CTA action-29 click path reaches the login-child/onboarding coordinator, which reads current local session state and reconciles login-flow events; it is not proven to start a new guest session. A separate local guest-start path is dispatched by `Lt891` in `La991.G`: the `W891.a` branch instead forwards the current `Lw4h0` value to `Lcq41.e` and returns. Candidate `Lt891(5)` and `Lt891(6)` producers have been located in WebView and ConversationSidebar callback code. The WebView callback is supplied through `Llal1.h` or `Lej10.c`/`Ljpc`; the ConversationSidebar callback is forwarded through `Lp1w`/`Le2w.e` and parent `Le2w.j`/`Le2w.c` inputs. A scan found no direct call-site or method-handle reference to `La991.G` outside its definition, but `La991` extends `Lv6a` and `Lv6a.H(Louf0)` invokes virtual `G(Louf0)`, so dynamic dispatch through a generic callback is possible. The known `Le6` bridge is created in Composer / FreeThinkingGaugeNuxHost and is not proven to be the callback supplied to the WebView or ConversationSidebar; neither candidate is proven to capture this `La991` instance. A separate conversation-level path is now proven: `Ljqk0` (the conversation coordinator, holding both `Lks31` AuthSession and `Lgs31` guest SessionManager) handles a guarded `Lkmk0` event by launching `Lps30` label 16. That branch logs the MessageStreamingService no-messages/all-unsupported condition, emits `MessageNotFoundException`, then calls `Lgs31.b` using event-derived reason/detail values. This is local conversation session-start/recovery coordination, not a recovered guest HTTP request; the `Lkmk0` producer/reason semantics and whether remote creation follows remain unknown. Its Compose callback is now traced: `Lxjk1.f` captures the supplied `Lgqk0` ViewModel in `Llu2`, whose event adapter calls virtual `Lv6a.G` on that same receiver; when supplied a `Ljqk0`, dispatch reaches that coordinator instance. The Android Statsig initialize/cache path is also mapped, but effective response-cache age/offline precedence and minimum necessary user metadata remain open; SDK telemetry is excluded. The separate `La991`/`Lt891` path also reaches local `Lgs31.b → Lau31.G`. The guest create/refresh HTTP request and actual composer send route are still unverified. These are research findings, not implemented ChatJS capabilities.

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

## Latest reference research status — 2026-11-25

The Android source has now been disassembled at method level for the authenticated direct-response sender, generated conversation API client and conversation event decoder. Exact direct-send, parent lookup and chat-requirements routes; the selected-user-message request body; default requirements-integrity behavior; device-integrity adapter boundary; stream handoff/delta operations and path limits are recorded in `docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. These are source findings only: ChatJS has not implemented the connection, serializers, integrity providers or product-specific stream. A scan of all 111 decompressed Valdi modules found no `/backend-anon` route string, so Android guest create/refresh and guest composer routes remain unknown.

The reconstructed Windows desktop package contains a local coding-agent path that spawns its bundled `codex.exe` through a stdio app-server host, as well as a distinct authenticated ChatGPT/OpenAI fetch bridge. This does not prove the exact UI mapping for every Windows Work feature. ChatJS implements Codex CLI client capabilities inside its own Node.js module, without depending on the separate executable or app-server; Windows local Work and Android cloud Work remain separate.

These source findings do not change the API status above: the production module is still foundation-only and makes no ChatGPT service requests.

## Current implementation priority

The long-term goal remains the complete combination of ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI capabilities in one Node.js module. The current execution phase is to complete ChatGPT Android's full non-Work experience first; Android Work, Windows/Desktop, and Codex CLI are parked until that phase is genuinely complete and tested. This changes task order only, not product scope.


## Additional Android source trace — streaming and attachments

The current Android non-Work reverse-engineering record now includes the streaming host/worker message protocol, request correlation, direct SSE transport, separate continuation request, resume token/offset handling, and three-handoff ceiling. The direct continuation appends /resume to the original route, sends conversation_id, optional model, offset and stream:false, and adds x-conduit-token; it is not a replay of the original send payload.

The upload client is method-level traced through POST /backend-api/files reservation, Estuary multipart versus signed-storage PUT, and POST /backend-api/files/process_upload_stream. It validates a narrow trusted HTTPS destination set and keeps ChatGPT session credentials off external signed PUT requests. Android picker limits are ten files, 20 MiB each, and 25 MiB total; accepted document/image types and the 32,768-pixel image dimension ceiling are recorded in docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

A small internal attachment-policy validator now ships in the module archive with deterministic tests. It is not a public API or an uploader and does not make network requests. The module still has no ChatGPT authentication, conversation transport, stream processing, attachment transfer, or end-to-end product workflow.


## Further Android streaming source detail

The event decoder's core dispatch and the listener-facing processor have been traced beyond the route/worker layer. It advances eventOffset on every non-DONE event before payload decoding, stores valid resume-token events, returns a nonterminal conversation-bound continuation for accepted stream_handoff events, and distinguishes [DONE] and message_stream_complete terminal markers. Message updates separately track assistant text suffixes by message ID, reasoning, conversation-state transitions, model-written DIL payloads, and entity-reference snapshots.

The separate response processor batches Markdown parsing/rendering at 16 ms, forwards distinct content/state/DIL/entity/reasoning callbacks, flushes pending content before completion or failure, delays final completion when a final update has been emitted, and clears timers on stop. Cancellation does not fabricate a completion callback. See docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md. These are static source findings, not a working ChatJS conversation feature.


## Additional Android integrity-provider findings

The direct sender's requirements-integrity provider has a strict fail-closed rule: it returns the requirements token header only when none of the returned turnstile/proofofwork/so descriptors is marked required. When additional device integrity is required, the default provider throws. The client selects a separate native provider only with Valdi runtime version 11 or later and a resolved native service.

The native adapter accepts legitimate session/account/backend/conversation context, forwards a one-shot success or failure, and supports cancellation. It validates returned header arrays and refuses malformed names, unsafe values or mismatched lengths. It accepts only an exact one-key app_attest_challenge body patch with a non-empty value. The internal native service and its availability in the supplied public Android package are not yet proven. See docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md; no integrity bypass or fabricated challenge response is implemented.


## Android native integrity availability

The supplied public Android APK includes the native device-integrity factory and service classes, but its actual worker checks the application package name against com.openai.chatgpt.internal and throws before making requests when it differs. The supplied public XAPK is com.openai.chatgpt. Thus the implementation is bundled but not usable by the supplied public app package. It must not be bypassed or imitated. See docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md. The Node.js runtime still has no native integrity provider or authenticated ChatGPT request path.


## Additional Android native integrity DEX detail

The method-level DEX trace confirms the native response callback returns DeviceIntegrityResponse with bodyPatchJson=null. The token bundle JSON containing bot_token, play_integrity_token and chat_requirement_token is carried in X-Sentinel-Payload; this is not the Valdi app_attest_challenge body patch. Other returned headers are OpenAI-Sentinel-Chat-Requirements-Token, OAI-Client-Type, OAI-Device-Id, OAI-Package-Name and User-Agent.

The native HTTP helper sends authenticated POST JSON with redirects disabled and 30-second connect/read timeouts, stores Set-Cookie through CookieManager, checks for a valid secure first-party device-verification cookie, bounds response reads and disconnects the connection on cancellation. It obtains one Standard Integrity token using 256 fresh SecureRandom bytes as a nonce, then a separate token using SHA-256 of ordered account/conversation/device/parent identity JSON. The internal request body uses package_name, nonce, integrity_token and device_id. An app-private random install UUID is persisted at oai_device_integrity/device_id.

The DEX helper's User-Agent is ChatGPT/1.2026.209 (build 2620909), while the supplied XAPK is 1.2026.321 (code 2632129). The discrepancy is unverified. The worker requires com.openai.chatgpt.internal and rejects the public com.openai.chatgpt package before HTTP. Do not port the internal-only request as public behavior or generate its attestation token.


## Android schema helper status — 2026-11-25

An internal helper now builds the source-traced `GET /backend-api/models` query and `POST /backend-api/sentinel/chat-requirements` descriptor, and validates the generated `ModelCatalogResponse` and `ChatRequirementsResponse` shapes. It preserves unrecognized fields and mirrors the generated decoder's optional-field behavior: omission is accepted, while `null` is validated as a present value and rejected when the declared type does not match. The default requirements-header decision returns the actual non-empty token only when no `turnstile`, `proofofwork`, or `so` challenge is marked required; otherwise it fails closed with a device-integrity-required error.

This is an internal pure helper, not a public API, authenticated transport, model-catalog fetch, challenge solver, device-integrity provider, or conversation workflow. No live ChatGPT request is made. The supplied Android public package's native integrity worker has an internal-package gate and is not bypassed.
