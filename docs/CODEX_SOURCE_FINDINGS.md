# Official Codex Source Findings

**Inspection date:** 2026-11-24  
**Upstream:** https://github.com/openai/codex  
**Pinned source commit:** 50aeac27d825007a0ac6bd846087ed4e7095bdb3  
**Project Sources archive:** CodexCLI.zip (28,071,441 bytes; SHA-256 1ff13fc6e312171f487b0e0f88de302c27c72c9ac20f6bd54325fdee343d66eb)  
**Acquisition:** official GitHub codeload snapshot of the pinned main commit; ZIP integrity test passed; archive uploaded to ChatJS Project → Sources.

This is a source reference, not a ChatJS runtime dependency. Do not copy the upstream CLI, app-server, authentication files, or binaries into ChatJS as a shortcut.

## Product and architecture decision

ChatJS implements the actual ChatGPT client communication itself in Node.js. It must not require or wrap:
- an externally installed codex CLI;
- a separately running codex app-server;
- an embedded Codex app-server runtime or app-server client;
- a different inference provider or OpenAI Platform API-key workflow.

The upstream Codex repository is useful engineering evidence for the Codex product's own client/service protocol. ChatJS must independently implement the required HTTP/WebSocket transports, serialization, legitimate ChatGPT sign-in/session lifecycle, streaming and response handling using the supplied ChatGPT app packages and verified protocol sources. This is the owner's explicit direction.

## CLI execution boundary

In this source snapshot, codex exec is not an independent direct-to-service implementation that bypasses the app-server architecture. codex-rs/exec/src/lib.rs starts InProcessAppServerClient through InProcessAppServerClient::start(...). It embeds the app-server in the CLI process rather than requiring a separately launched app-server process.

That distinction is why the CLI is not suitable as ChatJS's Work engine. ChatJS will not spawn the CLI or embed its in-process app-server. It will use the repo only to study the protocol and behavior that can be independently adapted.

## Direct Codex service protocol evidence

The source contains a first-party ChatGPT Codex backend implementation:

- codex-rs/model-provider-info/src/lib.rs defines CHATGPT_CODEX_BASE_URL as https://chatgpt.com/backend-api/codex.
- codex-rs/codex-api/src/lib.rs defines the Responses path as /responses.
- codex-rs/codex-api/src/endpoint/responses.rs builds the HTTP Responses request and accepts text/event-stream.
- codex-rs/codex-api/src/common.rs defines the serialized ResponsesApiRequest and its input/tool/reasoning fields.
- codex-rs/codex-api/src/sse/responses.rs parses and maps Responses stream events.
- codex-rs/core/src/client.rs builds the Responses request and session/client headers and handles HTTP and WebSocket transports.
- codex-rs/exec/src/exec_events.rs and event_processor_with_jsonl_output.rs map Codex execution events into the CLI's JSONL output contract.

The ChatGPT-backed client path uses legitimate OAuth-derived bearer credentials and account/session/thread identifiers. The source's tests verify authorization, ChatGPT-Account-Id, originator, session-id and thread-id headers, request routing metadata and serialized request content. These are protocol clues, not credentials or permission to reuse another process's account/session data.

The request shape includes model, streaming input, tools/tool choice, reasoning, store:false, requested encrypted reasoning content and client metadata. The exact shape is feature/model dependent; do not reduce this to a guessed static request body.

The source supports both HTTP SSE and Responses WebSocket streaming. ChatJS should independently adapt the specific transport actually required by each supplied ChatGPT client surface. The new src/sse.cjs parser is only a generic framing primitive; it does not implement the Codex Responses protocol or any ChatGPT connection.

## Telemetry exclusion

The upstream CLI has analytics/telemetry behavior that is not compatible with ChatJS's permanent zero-telemetry requirement. In this snapshot codex-rs/exec/src/lib.rs sets DEFAULT_ANALYTICS_ENABLED to true for codex exec; other custom OpenTelemetry exporters are independently configurable. Do not port upstream analytics, tracing, telemetry, feedback uploads, profiling, or remote diagnostics. ChatJS has no CLI runtime dependency and must not inherit these defaults.

## Product distinctions to preserve

These experiences are not interchangeable:

- Windows ChatGPT desktop Work uses the desktop/local execution surface described by the owner; reproduce its actual local client and host boundary without requiring Codex CLI.
- Android ChatGPT Work uses the cloud execution surface; reproduce its actual mobile client/service flow.
- Codex CLI is a terminal-oriented coding agent client. It is neither the Windows Work runtime nor the Android cloud Work runtime. Whether ChatJS later exposes a distinct Codex capability must be decided from the shipped client behavior and actual feature differences, not by adding a second launcher for the same Work implementation.

All local filesystem/process/desktop operations must remain explicit and host-capability-aware. All cloud operations must use the legitimate ChatGPT service/session path and preserve account entitlements, server approvals and rate limits.

## Evidence limits

This inspection establishes source structure, selected protocol code paths and tests. It does not establish:
- that the complete Codex protocol has been ported to ChatJS;
- that any direct request from ChatJS succeeds for a real ChatGPT account;
- that ChatJS has a working sign-in, OAuth refresh, account/session, SSE/WS, Codex, or Work implementation;
- that Windows Work Local is available to every Free account;
- that desktop Work provides the same capabilities as Codex CLI;
- that the Codex source is a substitute for the full Windows/Android ChatGPT client packages.

The current ChatJS runtime remains an early foundation plus a tested generic SSE parser.
