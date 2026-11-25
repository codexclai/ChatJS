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

## 2026-11-25 — Codex network approval, permission requests, dynamic tool search and multi-agent collaboration

Further static inspection of the pinned Codex source snapshot adds four more client subsystems. These are distinct from the ChatGPT Codex Responses HTTP/SSE transport and are not proof that all features are enabled in every Codex build/configuration.

### Outbound network access from local commands

`codex-rs/core/src/tools/network_approval.rs` implements an execution-scoped outbound-network decision path for commands/tools running in a local or remote executor environment. This is **not** the ChatGPT backend network transport; it governs network egress initiated by the coding execution environment.

Observed design details:

- A blocked network request carries host, protocol, port, environment identity and, where available, a specific execution ID. Attribution is resolved back to an active command execution; an unknown or ambiguous owner is denied rather than guessed.
- Host decision keys include environment ID, lowercase hostname, protocol (HTTP, HTTPS, SOCKS5 TCP/UDP), and port.
- Pending prompts are coalesced by host + turn + optional execution ID; a per-host semaphore serializes manual prompts. This prevents concurrent requests from generating uncontrolled duplicate approval prompts.
- The typed outcomes are `AllowOnce`, `AllowForSession`, and `Deny`. Session-approved and session-denied host caches are distinct and keyed by the execution environment and network target. A persisted network-policy amendment may add a policy rule; denial is persisted distinctly.
- Network approval flow is suppressed when the selected `AskForApproval` policy is `Never`, and the inline review path also checks for a managed permission profile. Missing active turns, missing/ambiguous request attribution, cancellation, invalid ownership, policy denial, and dropped approvals fail closed.
- The network proxy registration is scoped to a command execution and removed on completion/drop. Deferred approvals are checked when the command completes, so an unresolved or cancelled outbound request cannot be silently treated as a successful command outcome.
- Remote executor setup queries executor capabilities. If a network proxy is required but the selected exec server cannot launch an executor-local proxy, the operation is rejected. Remote credential masking is enabled only when its source feature gate and executor capability allow it.

The source also records analytics/telemetry for outcomes. Those records, IDs, metrics, and observability hooks must not be ported. The native ChatJS implementation would need explicit per-execution egress attribution, environment-scoped policy, cancellation and fail-closed behavior if this capability is included; it must not make arbitrary local commands network-enabled by default.

### Additional permission requests

`codex-rs/core/src/tools/handlers/request_permissions.rs` exposes the `request_permissions` tool. It resolves the selected executor/environment first, converts legacy read/write path arguments into typed filesystem entries, resolves relative paths against the selected environment's cwd/home/path convention, normalizes the permission profile, rejects an empty permission request, and submits a typed approval action through the session. It waits for the actual permission response and returns that response to the model; cancellation before the response is an explicit error.

This is a request for additional scoped permissions, not an immediate permission grant. ChatJS must preserve the approval decision and environment binding. Literal paths must never be resolved using the host's current working directory when the selected executor is remote or uses a different path convention. Symbolic entries such as project roots remain symbolic until the grant is applied.

### Dynamic tool discovery

`codex-rs/core/src/tools/handlers/tool_search.rs` implements deferred tool discovery:

- the tool registry exposes search metadata for deferred tools rather than loading every full definition up front;
- a search handler builds a local BM25 index lazily, on a blocking worker, then retains and reuses the index;
- the index is rebuilt when the deferred source listing or its source objects change;
- queries must be non-empty and limits positive; results are ranked and capped;
- Code Mode performs an additional per-step policy/router check before exposing a candidate nested tool, so a search result is not itself permission to invoke that tool.

This is a useful example of the owner's dynamic/all-in-one target: discover relevant registered capabilities on demand, but gate availability by the actual registry and current per-operation policy. It is local indexing over known sources, not remote service discovery, telemetry or a reason to ship an arbitrary plugin marketplace.

### Multi-agent collaboration (MultiAgentV2)

The pinned source has a distinct collaboration tool family, gated by runtime configuration/feature support:

| Tool | Observed behavior |
| --- | --- |
| `spawn_agent` | Creates a child thread through `ThreadSpawnRequest`; supports task name, message, optional agent role/type, model, reasoning effort, service tier, and fork-turn choice. In V2, `fork_turns` accepts `none` or `all` (legacy positive counts map to full history); `fork_context` is rejected. |
| `send_message` | Resolves an agent target and delivers a message using `MessageDeliveryMode::QueueOnly`; this queues work for the agent without directly triggering its next turn. |
| `followup_task` | Uses the same target/message path with `MessageDeliveryMode::TriggerTurn`, which asks the recipient to run the follow-up turn. |
| `wait_agent` | Subscribes to activity and waits for mailbox activity, new steering input or timeout. Requested timeout is clamped to configured minimum/maximum and default values; the source emits started/completed tool-item states. |
| `list_agents` | Lists child agents under the current thread/parent/source context, with optional path-prefix filtering and each agent's status. |
| `interrupt_agent` | Resolves a target and interrupts that agent through the session's agent-control service; returns its previous status and emits an interrupted activity event. |

The collaboration tools use thread IDs, task/path names, agent status/activity, routing, message delivery modes and configured limits. `MultiAgentV2` is separate from legacy V1 collaboration tools and is not guaranteed to be enabled in every configuration. Upstream analytics wrappers are excluded. ChatJS would need a native thread/agent scheduler and collaboration event model; spawning six fake local tasks is not parity.

### Implementation boundary

These are more Codex CLI capabilities to consider under the one ChatJS package. They remain separate from Android cloud Work and Windows local Work. Implement only after feature gates, protocol payloads, approval policy, environment ownership, cancellation and event ordering are reconstructed. No ChatJS network-approval subsystem, permission-request workflow, dynamic tool-search registry, or multi-agent engine exists today.

**Evidence boundary:** static source inspection of the pinned Codex ZIP. No network proxy was started, no host was contacted, no permission was granted, no agent was spawned, no MCP server was started, and no local command was executed. Telemetry present in the source was excluded from the findings and must remain excluded from ChatJS.

## 2026-11-25 — Codex core control tools, user interaction, MCP resources and extension install

The pinned Codex CLI source includes a set of first-party control tools around the coding-client loop. These are distinct from ordinary Responses SSE events and are surfaced through the Codex thread/turn event model.

### Planning, context, clock and execution-environment readiness

- **`update_plan`** validates a typed checklist and emits a `PlanUpdate` session event. It is not accepted while the current interaction mode is Plan, where the plan itself is the active user-facing contract.
- **`clock.curr_time`** is a namespaced tool that reads UTC time from the session's injected `time_provider`; the tool can be called in parallel. The source does not issue an external time-service request in this handler.
- **`get_context_remaining`** reads the current thread/turn context-window token status and reports remaining tokens (or an unknown state).
- **`wait_for_environment`** waits for an execution environment already marked `starting`; it does not pick an arbitrary ID or create an environment. It returns ready only after the selected environment reaches ready, returns the actual startup failure, or rejects an ID that is neither ready nor starting. Its documentation notes that waiting may take several minutes and blocks other tool calls.

### User questions and asynchronous status messages

Two different user-interaction contracts exist:

- **`request_user_input`** is the blocking question flow. It is root-thread-only, checks whether the current collaboration mode permits it, validates/normalizes typed questions, waits for the user's response, and returns the answer payload to the model. Under the GuardianApproval feature gate, accepted answers may be retained as verified question/answer context with acceptance ordering.
- **`request_user_input_async`** emits an asynchronous structured question item with optional ordered suggested answers (the first is preselected; the UI can also accept free text). It does not wait for the answer in this tool call; the question item is delivered asynchronously and the user's response arrives later through a new input.
- **`send_message_to_user_async`** delivers an asynchronous user-facing message during an ongoing turn. It returns immediately and does not finish the turn or wait for a reply; any reply arrives as a later user message.

These require a genuine user-interaction channel in a consuming application. ChatJS must not pretend a question was shown or answered if the host has no user-input surface. Such host facilities should be optional and expose unavailable/unsupported states clearly.

### MCP resources

The source exposes separate `list_mcp_resources`, `list_mcp_resource_templates`, and `read_mcp_resource` handlers. They resolve an MCP server and optional execution-environment scope, check whether the current model/turn can access that server, dispatch through the configured MCP runtime, and emit resource-operation results. They are separate from MCP tool invocation: an MCP server may expose tools, resources, and resource templates as different operations. Environment-scoped servers must use their actual selected environment path rules.

### Dynamic tools supplied by the current Codex thread

`DynamicToolHandler` wraps a source-provided `DynamicToolFunctionSpec`, supports namespaced or unnamespaced tools, can expose tools directly or defer them to search, and marks them as dynamic/third-party tool calls. Invocation sends a call through the active session's dynamic-tool request/response registration, emits started/completed tool-item events, awaits the real response, and propagates cancellation. This is not an alternate inference provider or a local fake tool; it is an explicit tool invocation whose implementation/result must come from the thread's real registered source.

### Plugin/connector discovery and install consent

The pinned source has `list_available_plugins_to_install` and `request_plugin_install` handlers:

- The list is sourced from the current turn's discoverable-tool catalog and describes plugin/connector candidates, including IDs, type, skills availability, MCP server names and connector IDs. It sorts deterministically and bounds description length.
- An install request must refer to an item in the current discoverable catalog (or the current recommendation context); a caller cannot submit an arbitrary unknown ID.
- The handler builds an MCP elicitation request through the `codex_apps` server and waits for an explicit Accept/Decline/Cancel result. It verifies that the install actually completed before refreshing the MCP runtime or merging connector selection.
- The source has special client-mode availability restrictions (the plugin install flow is not available in the observed `codex-tui` path). The install action is not complete merely because a user clicked Accept; completion is checked after the request.
- The upstream code emits install-request analytics and session telemetry. Those event/tracking systems are excluded from ChatJS.

This is a Codex client integration/consent surface, not AI-model selection. Any ChatJS implementation must preserve current-catalog ID validation, explicit user consent, completion verification and runtime refresh semantics. It must also respect ChatJS's own explicit scope exclusions and never imply that every discoverable plugin/connector is automatically supported or safe to install.

### Implementation consequence

The native ChatJS Codex API needs a coherent turn/control-event model, a real async user-input interface when the host supplies one, a truthful clock/context service, deferred environment readiness, a local MCP tool/resource catalog, dynamic tool callbacks, and explicit install/consent interfaces where the actual Codex client exposes them. These can share generic event, cancellation and lifecycle primitives, but the Codex-specific contracts must remain source faithful.

**Evidence boundary:** static inspection of the pinned Codex ZIP. No user question was presented, no answer retained, no execution environment started, no MCP resource read, no dynamic tool called, no plugin/connector installation requested, no connector selected and no network request made. No corresponding ChatJS behavior is implemented.

## 2026-11-25 — Codex Responses WebSocket v2, incremental continuation and fallback

A deeper trace of the pinned Codex snapshot reveals the actual WebSocket v2 turn/session behavior. Relevant sources include codex-rs/core/src/client.rs, responses_retry.rs, session/startup_prewarm.rs, codex-rs/codex-api/src/common.rs, and endpoint/responses_websocket.rs.

### Eligibility and handshake

- responses_websocket_enabled() requires the configured model provider to advertise supports_websockets and the current ModelClientSession not to have entered its session-scoped disable_websockets state. WebSocket capability is not inferred from Node.js support alone.
- The Codex v2 path is beta-header selected. The exact value in the pinned snapshot is OpenAI-Beta: responses_websockets=2026-02-06.
- The handshake includes standard Responses headers, originator, x-client-request-id set from thread ID, session-id and thread-id, source-defined compatibility headers, optional routing hint, optional X-OAI-ATTESTATION, and the beta header. Timing metrics are added only when that source option is enabled.
- ModelClientSession owns turn-scoped WebSocket state. It can reuse one socket over multiple requests in that turn and store server turn-state/routing affinity for the remainder of that turn. Turn state is not meant to leak into another turn. The source also re-resolves credentials/auth ownership for requests where runtime auth requires revalidation.

### Wire request and context continuation

The WebSocket payload is a tagged ResponsesWsRequest::ResponseCreate, serialized as {"type":"response.create", ...}. ResponseCreateWsRequest is similar to the HTTP Responses body, with additional WebSocket context fields including previous_response_id and optional generate. The observed field order is explicit in codex-rs/codex-api/src/common.rs:

model, stream, service_tier?, previous_response_id?, input, tools?, tool_choice, parallel_tool_calls, reasoning?, store, stream_options?, include, prompt_cache_key?, prompt_cache_options?, text?, generate?, client_metadata?, access_programs?, request_country.

Incremental continuation is deliberately conservative:

- A delta is allowed only after a previous request and a completed previous response with a non-empty response ID are available.
- The current request must preserve the previous request's relevant non-input properties. The pinned comparison checks model, tools, tool choice, parallel-tool setting, reasoning, store, stream, include, service tier, prompt cache key/options, and text controls.
- stream_options are delivery settings, so they do not invalidate the context referenced by previous_response_id. client_metadata, access_programs, and request_country are not part of that mismatch check because they are per-response or otherwise handled separately by the source.
- Current input must be an exact extension/equality of the prior input plus server-returned output items. Item comparisons ignore internal metadata. Shortened or mismatched histories and changed request properties cause a full request, not a guessed delta.
- A valid continuation sends the prior previous_response_id and only new input items. A server-generated warmup response is a special case: the next inference may reference that response ID and send only the delta, while retaining original context for replay bookkeeping.

This is not a generic send-only-the-last-message optimization. It is a source-specific stateful continuation protocol. ChatJS must reproduce exact equality/identity conditions and fall back to a complete request whenever it cannot prove a safe incremental continuation.

### Warmup and reuse

The optional Codex startup prewarm selects a WebSocket connection before the first generation. It sends a response.create request with generate:false, no previous_response_id, and no prompt generation. The first actual inference can reuse the established socket and context. Prewarm is best-effort and the source retries/falls back through the same turn path if it fails.

For ChatJS, warmup must be an explicit caller/consumer option or part of an already requested operation; it must not become hidden traffic on import, construction or background startup. The package may expose readiness/pending state locally without sending a request.

### Frames, bounded flow and interrupt semantics

- Text requests larger than 1 MiB are split into WebSocket message fragments with a 1 MiB fragment size.
- The pump limits read-ahead during sends to 1 MiB and batches up to 32 receive frames/messages before yielding.
- The Responses event channel is bounded (capacity 1,600 in the observed source). A maximum message size can be supplied by the handshake response. These are source implementation parameters, not public defaults to copy without end-to-end validation.
- Server response.interrupt is a protocol request with response_id and mode discard_partial_items. The client checks the matching response.interrupt.accepted or response.interrupt.failed acknowledgement; an unexpected ID or rejected interrupt is an error. This is distinct from merely closing a WebSocket or aborting a local iterator.
- Completion is not inferred from socket close: closure before response.completed is an error. Unexpected binary frames are rejected; malformed text events are handled without claiming completion. Wrapped error events preserve HTTP status and Retry-After when present.
- Server events can update turn-state routing affinity, model/ETag, rate-limit snapshots and safety-buffering interpretation while the stream is active.

### Fallback and retry policy

- A WebSocket HTTP handshake returning 426 Upgrade Required switches the operation to HTTP immediately.
- Source-mapped retryable WebSocket errors include websocket_connection_limit_reached and previous_response_not_found, with optional Retry-After preserved.
- The retry handler can switch the current model-client session to HTTPS when an error explicitly requires HTTP fallback or the configured retry budget is exhausted. That is a one-way session state: subsequent requests in the same session no longer attempt WebSocket.
- Ordinary retry uses the actual error retryability and server retry deadline. A special UnboundedConnectionRetries feature branch uses exponential connection delays beginning at five seconds and capped at sixty seconds, but only for non-internal sampling sessions and not the Bedrock provider. It is a feature-gated policy, not a universal or unlimited retry default.
- The fallback path surfaces a real reconnect/fallback notification; it does not disguise an incomplete response as successful completion.

### Evidence limits

This is a pinned source snapshot observation, not a ChatJS transport. The source tests include V2 handshake/header, response.create, warmup, incremental continuation and fallback cases, but those Rust tests were not executed in this inspection. ChatJS currently has no Codex Responses WebSocket client, no HTTP fallback state machine, no turn-scoped WebSocket connection reuse, and no end-to-end WebSocket tests. All upstream telemetry and tracing remain excluded.
