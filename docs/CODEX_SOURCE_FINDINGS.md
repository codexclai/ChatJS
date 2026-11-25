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

## 2026-11-25 — Codex CLI ChatGPT Responses, auth, streaming and JSONL contract

**Source snapshot:** official `openai/codex` source pinned to `50aeac27d825007a0ac6bd846087ed4e7095bdb3`, retained as `CodexCLI.zip` in ChatJS Project → Sources. The following are source observations for that snapshot, not ChatJS implementation or a statement about every Codex release.

### ChatGPT Codex Responses transport

The Codex ChatGPT backend is a first-party route family distinct from the ordinary ChatGPT conversation sender:

- `codex-rs/model-provider-info/src/lib.rs` defines `CHATGPT_CODEX_BASE_URL` as `https://chatgpt.com/backend-api/codex`.
- `codex-rs/codex-api/src/lib.rs` defines the Responses route suffix `/responses`.
- `codex-rs/codex-api/src/endpoint/responses.rs` serializes a typed request as JSON and sends HTTP `POST /responses`, with `Accept: text/event-stream`.
- `codex-rs/codex-api/src/requests/headers.rs` builds conditional `session-id` and `thread-id` headers. The endpoint adds `x-client-request-id` from the thread ID when supplied, and may add `x-openai-subagent` for a subagent session source.
- The core client supports both HTTP SSE and a Responses WebSocket transport. Transport choice, WebSocket reuse/routing, and fallback behavior are separate from the simpler HTTP-only source path and still require full call-graph reconstruction before porting.

The serialized `ResponsesApiRequest` in `codex-rs/codex-api/src/common.rs` has routing fields deliberately first because the source comments say gateways may inspect the request incrementally before large input serialization. The observed field order is:

1. `model`
2. `stream`
3. optional `service_tier`
4. `input`
5. optional `tools`
6. `tool_choice`
7. `parallel_tool_calls`
8. optional `reasoning`
9. `store`
10. optional `stream_options`
11. `include`
12. optional `prompt_cache_key`
13. optional `prompt_cache_options`
14. optional `text`
15. optional `client_metadata`
16. optional `access_programs`
17. `request_country`, omitted when its source-defined predicate says to omit it.

The core builder supplies a dynamic model/input/tool/reasoning configuration. In the observed ChatGPT Codex path it enables streaming, sets `store: false`, selects automatic tool choice, and computes parallel tool calls, include fields, service tier, text controls, metadata, and other options from model and runtime state. Do not copy one observed request as a universal fixed body. The exact contents vary with model, context, tool set, feature gates, session source and execution mode.

When private connector tool results are attached, the HTTP endpoint has a special redirect branch for 307/308 responses with a non-empty Location: it retries the encoded request without the private tool-result patch. This is a narrow source-specific behavior, not a generic retry policy.

### ChatGPT account authentication and refresh

The source's `codex-rs/login/src/auth/manager.rs` contains multiple authentication modes because the upstream Codex application supports several products/configurations. **ChatJS is only targeting the ChatGPT-backed mode** from that code:

- `CodexAuth::Chatgpt` and `CodexAuth::ChatgptAuthTokens` use OAuth-derived access-token data for bearer authentication.
- The source resolves the ChatGPT account ID from token claims/account metadata where available; tests in the source also cover `ChatGPT-Account-Id`, originator, authorization, session ID, and thread ID header behavior.
- The token refresh helper sends an OAuth refresh-token grant using JSON encoding, no resource parameter, a source-provided refresh reason and a 45-second timeout.
- The default refresh URL constant is `https://auth.openai.com/oauth/token`, but the actual endpoint can be selected from stored OAuth provenance/issuer or an explicit source configuration override. It must not be reduced to one hard-coded assumption.
- Refresh is guarded by a lock; queued callers re-check current auth state and may reuse a refresh already completed by another caller. The code checks account identity across reload/refresh transitions and classifies permanent credential failures (expired, reused/exhausted, revoked) separately from transient failures.
- The access token is obtained from the managed ChatGPT token state. Credential storage and header debug output have secret-protection behavior; ChatJS must never copy live tokens, auth documents, cookies, keychain state or credentials from another process.

The source's other `CodexAuth` branches (API keys, arbitrary headers, personal access tokens, Agent Identity, and Bedrock modes) are not a reason to add alternative AI services to ChatJS. They are upstream configuration options outside this project's ChatGPT-only product identity. ChatJS also must not interpret missing Codex credentials as proof of the Android/ChatGPT guest session: Codex CLI auth and ChatGPT logged-out guest are distinct questions. The Android guest create/refresh and guest composer routes remain unresolved in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`.

### Responses SSE event mapping

`codex-rs/codex-api/src/sse/responses.rs` parses the Responses event stream and maps selected event types to typed Codex events. Observed mappings include:

- `error` → parsed API error, where present;
- `response.created` → response ID;
- `response.output_item.done` → typed `ResponseItem`;
- `response.output_text.delta` → output-text delta;
- `response.custom_tool_call_input.delta` → tool-call input delta with item/call identifiers;
- `response.reasoning_summary_text.delta` and `.done` → reasoning summary updates;
- `response.reasoning_text.delta` → reasoning-content delta;
- `response.failed` → failed-response API error;
- `response.completed` → completion information including usage and end-turn state;
- `response.incomplete` → incomplete/error handling. A `content_filter` reason is mapped to a content-filter error; `interrupted` is treated differently from other incomplete reasons, while other non-interrupted incomplete responses preserve partial output and usage in an incomplete-response error.

The source also handles additional metadata and intentionally ignores or traces selected event types. The parser uses a stream-idle timeout and a bounded event channel; closing a stream before a completed response or exceeding the idle timeout is an error. Malformed event payloads are handled without treating arbitrary unknown event names as successful completion. Do not promote this selected list into a complete universal ChatGPT stream schema; decode every required variant and error path from the pinned source before implementing.

### CLI JSONL event contract

The public `codex exec --json` output contract is separate from the backend Responses SSE wire protocol. In `codex-rs/exec/src/exec_events.rs`, the serialized `ThreadEvent` is tagged by `type` and includes:

- `thread.started` with `thread_id`;
- `turn.started`;
- `turn.completed` with token usage;
- `turn.failed`;
- `item.started`, `item.updated`, `item.completed` with a typed thread item;
- `error`.

The typed item variants include agent message, reasoning, command execution, file change, MCP tool call, collaboration tool call, web search, todo list, and item error. Command and file-change items include status information; collaboration items carry spawn/send/wait/close-agent details and related thread identifiers. This is a useful reference for a coherent ChatJS Codex task/event API, but it must be mapped from actual client events rather than synthesized.

The same `codex exec` entry point starts an `InProcessAppServerClient` and maps app-server events into the JSONL contract. ChatJS must not reproduce this by launching or embedding the upstream app-server. It should implement the relevant session/thread/task/event logic natively in Node.js.

### Telemetry and implementation boundary

The pinned source snapshot sets `DEFAULT_ANALYTICS_ENABLED = true` for `codex exec` and contains telemetry/tracing/feedback/profile pathways. Those are explicitly excluded from ChatJS. No upstream analytics, OpenTelemetry exporters, telemetry hooks, feedback uploads, profiling or remote diagnostics may be ported.

**Evidence limit:** this source pass inspected files in the pinned ZIP; it did not execute Codex CLI, start an app-server, perform OAuth, read credentials, issue any network request, or test a live account. Tests visible in source are evidence of intended assertions only; they were not run as part of this inspection. No ChatJS Codex transport, auth, Responses decoder, task engine or CLI JSONL API has been implemented. Overall ChatJS runtime status remains foundation-only.

## 2026-11-25 — Codex local coding execution, sandbox and approvals

Additional inspection of the same pinned Codex source snapshot establishes the local tool execution boundary more concretely. The relevant files include `codex-rs/core/src/tools/handlers/unified_exec/exec_command.rs`, `unified_exec/preparation.rs`, `unified_exec/write_stdin.rs`, `codex-rs/core/src/tools/runtimes/unified_exec.rs`, `codex-rs/core/src/tools/sandboxing.rs`, `codex-rs/core/src/tools/approvals.rs`, `codex-rs/core/src/tools/handlers/apply_patch.rs`, and `codex-rs/core/src/tools/handlers/mcp.rs`.

### Command and terminal lifecycle

- The `exec_command` handler selects a real execution environment, parses a working directory as a `PathUri`, resolves command/shell details, prepares policy and permission context, and then delegates process startup to `UnifiedExecProcessManager`.
- Interactive command execution may allocate a terminal/PTY and expose a resumable process session. The separate `write_stdin` tool requires a terminal session; it can send characters to an existing process or poll for more output with an empty input. It has a yield-time/output-token interface and propagates the operation cancellation token.
- The one-shot command mode is a distinct contract: it removes `tty` and `yield_time_ms`, adds `timeout_ms` (the observed default is 10,000 ms), runs to completion, and says the process is terminated on timeout/cancellation and cannot be resumed.
- TTY is feature-gated (`UnifiedExecTty`) in the observed source. Do not assume every ChatJS Node.js host can supply an interactive terminal.
- Command output is bounded/truncated using model/runtime policy. A sandbox denial is terminal and does not leave a resumable process.
- The source differentiates local and remote executor environments. A remote executor is responsible for its URI-native sandbox/path rules; host-local sandboxing requires a valid native working directory and path convention. ChatJS should not reinterpret a foreign host path as local just because it can be parsed.

### Approval and sandbox policy

The source models command permission as a typed policy result, not a single boolean:

- `Skip`: policy permits execution without an approval prompt, but sandbox policy still applies unless a specific policy says otherwise;
- `NeedsApproval`: an approval flow is required;
- `NeedsHumanApproval`: a fresh human decision is required for each execution attempt;
- `Forbidden`: policy forbids the action.

The requirement is computed from approval policy, execution policy, permission profile, sandbox permissions, Windows sandbox settings, command/shell platform classification and turn-level context. The runtime then coordinates approval, sandbox selection, command launch and cancellation. The source explicitly distinguishes fresh human approval from cached session approval: an approved-for-session cache cannot satisfy a fresh human approval requirement. The cache is scoped to specific approval keys such as command/environment/cwd/TTY/permission context; it is not a global allow-list.

### Patch and tool execution

- The `exec_command` path can intercept a verified `apply_patch` command and route it through the dedicated patch parser/handler rather than blindly invoking a shell. The dedicated handler parses and verifies patch structure, checks environment identity, applies the sandbox context and emits file-change progress/results.
- MCP tools have a separate handler that uses the selected server/tool definitions, waits for the configured MCP server to become ready, dispatches its tool invocation and records the result. This is distinct from the ChatGPT Codex Responses tool-call stream and from host filesystem/process APIs.
- The CLI JSONL task contract is an output projection of tool/process/item events; it does not replace the underlying approval, process and patch state machines.

### ChatJS implementation consequence

To bring Codex CLI capabilities into one ChatJS Node.js module without depending on the upstream executable/app-server, ChatJS needs its own verified implementations of the required process/terminal manager, command lifecycle, approval router, sandbox/permission policy, patch engine, tool dispatcher and task/event state machine. These must be native Node.js components and use explicit optional host adapters only for real facilities available to the consuming application. They must preserve the official client's user approvals and denial outcomes; no configuration switch may force-approve a command, skip required sandboxing, or convert a denied action into success.

This Codex local execution engine remains separate from Windows ChatGPT Work Local and Android ChatGPT Work Cloud. Shared low-level Node.js primitives may be reused only where their semantics are demonstrably common; the client-level workflows and security policies remain distinct.

**Evidence boundary:** these are static observations of the pinned Codex ZIP. No commands were executed, no sandbox was disabled, no approval was granted, no MCP server was started, and no local tool operation was run. No ChatJS command, terminal, patch, MCP or approval subsystem has been implemented.
