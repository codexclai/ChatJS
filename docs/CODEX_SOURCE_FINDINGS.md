# Official Codex Source Findings

**Inspection date:** 2026-11-24  
**Upstream:** https://github.com/openai/codex  
**Pinned source commit:** 50aeac27d825007a0ac6bd846087ed4e7095bdb3  
**Project Sources archive:** CodexCLI.zip (28,071,441 bytes; SHA-256 1ff13fc6e312171f487b0e0f88de302c27c72c9ac20f6bd54325fdee343d66eb)  
**Acquisition:** official GitHub codeload snapshot of the pinned main commit; ZIP integrity test passed; archive uploaded to ChatJS Project → Sources.

This is the pinned source reference for the Codex CLI client capability family, which is part of the ChatJS product target. It is not a runtime dependency: ChatJS should implement the verified Codex client workflows natively in Node.js, not copy and launch the upstream CLI/app-server as a shortcut. Do not copy upstream binaries or authentication/session secrets into ChatJS.

## Product and architecture decision

ChatJS consolidates ChatGPT mobile, ChatGPT desktop and Codex CLI client capabilities into one ordinary Node.js package. The Codex CLI workflows are in scope and should be implemented directly in ChatJS using the source evidence in this archive. It must not require or wrap:
- an externally installed codex/codex.exe executable;
- a separately running Codex app-server;
- an embedded Codex app-server runtime or app-server client;
- a different inference provider or OpenAI Platform API-key workflow.

The upstream Codex repository is implementation evidence for the Codex CLI's own client/service protocol and coding workflows. ChatJS should adapt the required HTTP/WebSocket transports, serialization, legitimate ChatGPT account/session behavior, streaming, event mapping and local coding-client behavior into Node.js. ChatGPT remains the only AI service target. This is the owner's explicit direction.

## CLI execution boundary

In this source snapshot, codex exec is not an independent direct-to-service implementation that bypasses the app-server architecture. codex-rs/exec/src/lib.rs starts InProcessAppServerClient through InProcessAppServerClient::start(...). It embeds the app-server in the CLI process rather than requiring a separately launched app-server process.

That distinction is why the CLI executable/app-server is not suitable as a runtime dependency or a substitute for ChatJS's native implementation. ChatJS will not spawn the CLI or embed its in-process app-server. It will adapt the actual client capabilities and protocol behavior into its own Node.js implementation.

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
- Codex CLI is a terminal-oriented coding agent client and is a distinct in-scope capability family in ChatJS. It is neither the Windows Work runtime nor the Android cloud Work runtime. Implement its verified distinct behavior within ChatJS; do not add a second launcher or shell out to the upstream CLI.

All local filesystem/process/desktop operations must remain explicit and host-capability-aware. All cloud operations must use the legitimate ChatGPT service/session path and preserve account entitlements, server approvals and rate limits.

## Evidence limits

This inspection establishes source structure, selected protocol code paths and tests. It does not establish:
- that the complete Codex protocol has been ported to ChatJS;
- that any direct request from ChatJS succeeds for a real ChatGPT account;
- that ChatJS has a working sign-in, OAuth refresh, account/session, SSE/WS, Codex CLI, or Work implementation;
- that Windows Work Local is available to every Free account;
- that desktop Work provides the same capabilities as Codex CLI;
- that the Codex source is a substitute for the full Windows/Android ChatGPT client packages.

The current ChatJS runtime remains an early foundation plus a tested generic SSE parser.

## Updated product-scope interpretation — 2026-11-25

The owner has clarified that Codex CLI is not excluded from the ChatJS feature target. The Codex CLI client/workflow capability family is to be consolidated with ChatGPT mobile and desktop in the single ChatJS Node.js package. This source archive is used to implement those behaviors natively. Only the separate executable and app-server runtime are excluded as dependencies. Android cloud Work, Windows local Work, and the Codex CLI client remain distinct source/behavior surfaces. This clarification supersedes wording above that could be read as keeping Codex CLI capability itself out of product scope.
