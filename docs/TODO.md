# ChatJS Task List

Use this as the single authoritative queue. Mark tasks complete only when evidence supports completion.

## ACTIVE PRIORITY — Complete ChatGPT Android (non-Work) first

**Owner direction, 2026-11-25. This changes execution order only, not the permanent ChatJS product target.** ChatGPT Android, ChatGPT Desktop/Windows, and Codex CLI all remain in the long-term goal. Until the Android non-Work experience is comprehensively reconstructed, implemented, and tested, do not spend the active work phase on Android Work, Windows/Desktop, or Codex CLI. Keep their existing records and tasks preserved as parked backlog.

No Android client capability is removed from consideration by its feature-domain label. The active Android non-Work inventory covers every source-backed area; implementation is determined by verified client behavior, legitimate service support, authorization, entitlements, and host capabilities.

### Android non-Work completion sequence

- [x] Build a temporary read-only bytecode inspector from the pinned Valdi QuickJS fork and disassemble the Android direct sender, generated conversation API client, event decoder, streaming worker/client/contracts, upload service and file-picker policy. Recovered the authenticated send body/routes, typed model/requirements fields, stream handoff and resume request, upload reservation/transfer/process flow, trusted storage hosts and numeric selection limits. The analysis tool and third-party bytecode remain temporary; no Android app code is executed.
- [ ] Reconstruct authenticated Android account creation/sign-in/session refresh, token lifecycle, DPoP and account switching with legitimate authorization and secret handling.
- [x] Implement a private Android LoginAuth common response-envelope decoder for the 15 explicit source discriminator labels, dispatching only already-decoded nested payloads and preserving unresolved known-step payloads opaquely; reject untraced fallback labels.
- [x] Port and test the Android first-party validation predicates for bearer-token syntax, account identifiers, HTTP header names/values and trusted production/staging HTTPS origins as a private side-effect-free helper. This does not implement sign-in, credential storage or authenticated requests.
- [ ] Reconstruct the true accountless guest create/refresh/session lifecycle and guest composer prepare/send routes; distinguish guest session HTTP from local SessionManager state and LocationCookieInitializer constants.
- [x] Decode generated Android ModelCatalog and ChatRequirements named-field schemas, optional/null behavior, and pass-through properties; record the exact models and chat-requirements routes.
- [x] Implement and test private, side-effect-free Android model-catalog and chat-requirements request/schema helpers, including exact GET/POST descriptors, optional/null decoder semantics, unknown-property pass-through, and the default requirements-header fail-closed decision. This does not implement transport, authentication, or device attestation.
- [x] Trace Android requirements-integrity routing: required turnstile/proofofwork/so detection, fail-closed default provider, Valdi >= 11/native-service selection, adapter inputs/callback/cancel boundary, returned-header validation and exact app_attest_challenge body patch.
- [x] Verify the supplied public APK's native integrity factory and service bridge: the registration marker and DEX factory are packaged, but the worker requires Context.getPackageName() === com.openai.chatgpt.internal and throws before HTTP for the public package com.openai.chatgpt.
- [x] Decode the method-level internal DEX exchange and callback shape: package preflight, authenticated HTTPS helper, nonce-bound and request-hash-bound Standard Integrity tokens, chat-requirements token, playintegrity body keys, cookie validation, persistent install UUID, six response headers and null bodyPatchJson.
- [ ] Resolve remaining retry attempt/backoff ceilings, DeviceRateLimits scope/retention and restart persistence, exact cookie name/lifetime/rotation/deletion, UUID rotation/deletion, and the embedded 1.2026.209 User-Agent mismatch in a 1.2026.321 APK. Check for a distinct public-build provider only in another authentic source; never bypass or port the internal exchange as a public capability.
- [x] Reconstruct the Android direct-stream worker protocol, host/worker message kinds, callback correlation, prepared-content delta handling, direct-versus-polling branch, exact resume path/body/header, offset handoff, and three-handoff cap from compiled methods.
- [x] Decode the core event-dispatch and response-processor lifecycle: event-offset advance rules, [DONE]/message_stream_complete terminal handling, nonterminal resume handoff, text/reasoning routing, DIL/entity-reference deduplication, Markdown render batching, final flush and cancel/error callbacks.
- [ ] Complete any remaining generated event subtypes, interruption/recovery, end-to-end history synchronization, and authorized live stream tests.
- [x] Reconstruct the Android file-picker selection policy, upload reservation body/result checks, Estuary multipart and signed-storage PUT branches, process-upload request, trusted destination rules, and image-dimension bounds from compiled methods.
- [x] Add and test an internal, side-effect-free ChatJS attachment-policy helper for the verified selection limits, Base64 byte-length check, trusted destination parser, and upload strategy/header plan. This is not a network uploader or public API.
- [ ] Implement and test the complete authenticated upload/download workflow, including real reservation/transfer/process calls, file indexing, URL expiry, retries, cancellation, and cleanup.
- [ ] Inventory and trace the remaining Android non-Work product areas, including Projects, instructions, context, memory/personalization, image generation/input, video, voice/audio, search, tools, connectors, galleries, and all other genuine client workflows.
- [ ] Reconstruct feature/configuration dependencies only where required for functional parity; preserve functional configuration while excluding SDK analytics, exposure reporting, tracking and telemetry.
- [ ] Implement the Android non-Work capabilities in native ChatJS modules with ESM/CommonJS parity, accurate TypeScript, validated configuration, bounded async/concurrent streaming, cancellation, backpressure and resource cleanup.
- [ ] Add deterministic contract tests and authorized account/guest end-to-end tests for success, errors, retries, rate limits, concurrency, cancellation, interruption, restart and persistence.
- [ ] Mark Android non-Work complete only after the feature inventory has evidence-backed coverage and every claimed implementation passes the required tests. Then advance to Android Work, Windows/Desktop and Codex CLI.

### Parked long-term work (not removed from scope)

Preserve the existing Android Work, Windows/Desktop, and Codex CLI research and tasks below this active phase. Do not start those tracks until the Android non-Work completion gate above is satisfied.

## P0 — Continuity and governance

- [ ] Confirm rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting contributors.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.
- [ ] Owner: update GitHub About description to the approved wording in `REPOSITORY_SETTINGS.md`; the available GitHub integration can update repository files but not repository metadata.

## P1 — Actual client implementation research

- [x] Add the current ChatGPT Android XAPK app bundle to ChatJS Project → Sources and verify its hash and archive integrity.
- [x] Add the official ChatGPT Windows installer to ChatJS Project → Sources as two sequential pieces and verify exact reconstruction.
- [x] Record Android DEX and Valdi module counts and analysis limitations.
- [x] Perform a first-pass decompression/string scan of selected Valdi modules and document concrete auth/session, bearer transport, conversation/streaming, upload, history, image-gallery, and Library components and paths.
- [x] Establish ChatJS Project → Sources as the primary source location for supplied client packages.
- [x] Trace the Android direct-response request sender, generated core schemas, event/resume dispatcher, streaming worker/processor, upload reservation/transfer/process branches, and requirements-integrity provider routing. [ ] Continue with Android auth/guest lifecycles, native integrity internals, remaining event/history schemas and full attachment expiry/retry/download/index behavior.
- [x] Reconstruct the Valdi requirements-integrity routing, default fail-closed provider, native adapter selection condition, adapter context/callback/cancel contract, returned header validation/application, and app_attest_challenge patch schema.
- [x] Resolve the native DEX package guard for the supplied public XAPK: factory and service are bundled, but the worker rejects the public package before HTTP because it requires com.openai.chatgpt.internal. Do not spoof or bypass this first-party gate.
- [x] Document the internal DEX exchange method-level: request helper, allowed-origin/cookie behavior, UUID persistence, nonce and request-hash token roles, playintegrity JSON body, X-Sentinel-Payload response header and null bodyPatchJson. Preserve the internal package gate.
- [ ] Resolve remaining cookie name/lifetime/rotation/deletion, UUID rotation/deletion, retry status transitions/attempt ceilings, DeviceRateLimits scope/retention and cooldown persistence/cancellation edges. Preserve throttles; exclude SDK telemetry.
- [ ] Build a deeper source-path-to-behavior map for conversations, streaming, files, Projects, voice, images, search/tools, and other client workflows, including exact call graphs and schemas.
- [ ] Document actual dependencies and Node.js portability for each major client component.
- [ ] Define a repeatable client behavior test plan and capture verified request/response examples without storing personal account data.
- [x] Add official Codex source snapshot CodexCLI.zip to Project Sources, pinned to a verified upstream commit; document it as reference-only, not a runtime dependency.
- [x] Trace Android anonymous-session state and storage foundations: SessionManager startup/logout/refresh paths, serialized session metadata, sessions/guest-* storage and retired-session cleanup; distinguish location-cookie endpoint constants from composer routes.
- [ ] Reconstruct the exact Android guest session create/refresh network request. The RootViewModel first tries the separate install-referrer AccountSelector login Los8.f → LoginGraphManager, then enters the actual initial anonymous fallback Lgs31.b → Lau31.G. G acquires the Lmgo0 coroutine mutex, runs Llzx.n/Lwk8 local eligibility logic and enters Lau31.E local state work. Correction: Lof70 is Statsig/experimentation (not auth/session); Lau31.u is the local snapshot-to-state refresh path, and Lau31.n → Ldt31 → AuthRepository/CredentialsRepository is the separate credential-backed AuthSession token path. Neither inspected path exposes the guest HTTP create request. Continue through untraced service dependencies/call sites. The global /backend-anon base is configured, but the endpoint is unknown.
- [ ] Trace the origin, generation, persistence, expiry/replacement/retirement policy for the two opaque values used by Lxzp0 to compose sessions/guest-* storage paths.
- [ ] Trace the actual UI composition/caller for AnonymousSessionLoading (Losk1.a) and its relation to the root unauthenticated-session flow. Do not treat "Continue as Guest" as ChatGPT UI; that string belongs to the Shop plugin model Li230.
- [ ] Reconstruct the actual guest conversation composer send/prepare route schemas independently of LocationCookieInitializer. All 111 decompressed Valdi modules were scanned and none contains a `/backend-anon` route string; this does not establish that a guest service is absent.
- [ ] Reconstruct Windows desktop Work Local and Android Work Cloud as separate execution surfaces; never require Codex CLI or app-server.
- [ ] Verify whether Windows desktop Work has a real logged-out guest mode; current evidence is insufficient.
- [x] Reconstruct the newly supplied Windows MSIX parts, verify archive integrity, parse the ASAR file tree, and perform a first-pass static inspection of the Electron bootstrap and app-server host. Full UI-to-service mapping and runtime testing remain open.

## P1 — Product completeness, customization and capability architecture

- [ ] Translate PRODUCT_STANDARD.md into a prioritized, source-evidenced capability map covering every in-scope Android and desktop/Work/Codex workflow; track support, partial, experimental, unsupported, blocked and unknown states.
- [ ] Design and test a validated layered configuration model (safe defaults, per-client settings, optional profiles, and per-operation overrides) with explicit precedence, immutable operation snapshots and no security-bypass switches.
- [ ] Design a capability registry and narrow optional host/provider adapter contracts, including discovery, prerequisites, lifecycle, cancellation, cleanup and typed unavailable/unsupported states.
- [ ] Define a tested Node.js/OS/host compatibility matrix; add CI coverage for declared targets and real-host integration tests for platform-specific adapters.
- [ ] Define production-readiness checks for each feature: source evidence, real implementation, ESM/CommonJS/TypeScript parity, error/cancellation/concurrency/security tests, authorized end-to-end evidence, measured resource budgets, packaging and user documentation.
- [ ] Expand public documentation as real APIs land: quick starts, TypeScript/CommonJS examples, configuration reference, host/provider setup, capability states, errors, limits, side effects, troubleshooting and cleanup.
- [ ] Add performance and soak tests for implemented high-use workflows with explicit latency, memory, concurrency and resource ceilings; do not publish unmeasured performance claims.

## P1 — General-purpose Node.js integration design

- [ ] Define the client factory/configuration/lifecycle API for different host applications.
- [ ] Define the real ChatGPT client connection and legitimate authentication/session lifecycle.
- [ ] Define request/response transport, streaming/backpressure, cancellation, timeouts, retry policy, concurrency, and typed errors from client evidence.
- [x] Implement a reusable bounded/cancellable Server-Sent Events framing parser for async byte streams; keep ChatGPT-specific decoding and live transport unimplemented.
- [ ] Define reusable conversation/thread/context/project models.
- [ ] Define instruction/profile precedence and explicit local persistence/memory behavior.
- [ ] Define file/attachment ingestion, format handling, size limits, and cleanup.
- [ ] Define optional host adapters without requiring specific camera/microphone/screen or OS support.
- [ ] Add TypeScript declaration and ESM/CommonJS contract tests.

## P2 — Complete feature slices

- [ ] Implement genuine authenticated-account and accountless-guest ChatGPT session flows using exact first-party client behavior; preserve all gates and guest restrictions.
- [ ] Implement a genuine ChatGPT client connection and authentication flow based on verified client behavior.
- [ ] Implement conversation send/receive/stream with real ChatGPT service responses.
- [ ] Implement project/context/instruction handling.
- [ ] Implement file and attachment workflows using observed client request formats.
- [ ] Implement Work Local for the Windows desktop client and Work Cloud for Android as separate client/service flows; neither may depend on Codex CLI/app-server.
- [ ] Reconstruct and implement the Codex CLI client capability family as part of ChatJS: direct ChatGPT Codex session/transport, Responses HTTP/SSE/WebSocket behavior, event mapping, tool/task lifecycle, approval semantics and local coding workflows. Implement natively in Node.js; do not spawn the external CLI or app-server.
- [ ] Implement Work/Codex task, workspace, command, approval, Git review, and artifact workflows.
- [ ] Add optional voice/image/video and host integrations only where actual client and host evidence supports them.
- [ ] Add security/regression tests for auth lifecycle, secret redaction, cancellation, concurrency, timeouts, and no unsolicited traffic.

## P3 — Production readiness

- [ ] Review dependency necessity, security, and licensing whenever dependencies are introduced.
- [ ] Add API reference generation only where useful.
- [ ] Add performance, memory, and concurrency benchmarks with measurable budgets.
- [ ] Define supported Node.js hosts from actual implementation requirements.
- [ ] Document maintenance and security-response practices.

## Current position

ChatJS is one general-purpose Node.js module targeting the actual client-side behavior of ChatGPT mobile, ChatGPT desktop, and Codex CLI. The permanent product target is unchanged; the active phase is Android non-Work only, with Android Work, Windows/Desktop, and Codex CLI parked until the Android non-Work completion gate is passed. The current runtime remains foundation-only; no real ChatGPT service connection has been implemented. Current package sources are `ChatGPT-Android.xapk` and the two sequential Windows installer pieces in ChatJS Project → Sources. The personal Library is outside the normal workflow and is not a routine source; access it only for a concrete need when useful and accessible. Any material used there belongs under `ChatJS Project` and must be authentic and necessary. The persistent ChatJS browser profile is the only reusable default profile; temporary sessions are disposable and must not replace it.

Never create branches or worktrees. Keep all repository work on main.


## 2026-11-24 — Current transport and guest-session slice

- [x] Add bounded/cancellable generic SSE parser with CommonJS/ESM/type exports, package archive inclusion and deterministic parser tests.
- [x] Archive the official Codex source snapshot in Project Sources and record its pinned commit/hash; explicitly exclude it as a ChatJS runtime dependency.
- [x] Record Android guest-session identifiers and anonymous endpoint attribution caveat.
- [ ] Finish the exact guest-session call graph and prepare/send payload reconstruction.
- [ ] Continue source-led direct ChatGPT authentication, conversation and Work implementation; no live ChatGPT connection is implemented yet.


- [ ] Trace Lt891 producers/callback wiring into La991.G. Observed constructors are Lq20.invoke → Lt891(5) and Ldo1.invoke selector case 18 → Lt891(6) via the Le2w.e ConversationSidebar path. The distinct Lt891 branch dispatches Lmuz0 label 9 → Lgs31.b → Lau31.G; W891.a goes to Lcq41.e and returns. Prove which callback targets the coordinator before assigning a UI trigger or connecting it to welcome CTA action-29.

- [ ] Trace the concrete callback implementations supplied by `Llal1.h`/`Lj20`/`Lss`/`Lt07`/`Ly641` and the `Lej10.c`/`Ljpc` WebView host, plus the `Le2w.c`/`Le2w.j` ConversationSidebar callbacks. Determine payload meaning and whether any handler dynamically reaches `La991.G`; the ten-DEX static scan found no direct method-id or method-handle binding outside its own definition.

- [ ] Check the candidate Lt891 parent callbacks for a captured `La991` receiver via the generic `Lv6a.H(Louf0)` virtual-dispatch bridge. The known `Le6` bridge is created in Composer / FreeThinkingGaugeNuxHost and is not proven to be the callback supplied to either the WebView or ConversationSidebar.

- [ ] Trace the source and semantics of `Lkmk0` in the conversation coordinator (`Ljqk0.G`). The verified label-16 branch emits `MessageNotFoundException` for no-messages/all-unsupported and invokes local `Lgs31.b`; identify the event producer, reason-code mapping and any subsequent server-side guest creation.

- [x] Trace the local `welcome_language_opportunity` / `Lylh1` enrollment writer and typed `welcome_*` parameters that build the `Lplh1` presentation model; `Lnlh1` is its serializer.
- [x] Trace Android Statsig initialize route/body and persisted response cache. Remaining question: effective caller-supplied cache age and offline/default precedence; exclude all SDK telemetry.
- [x] Trace the Compose-to-conversation ViewModel callback binding: `Lxjk1.f` → `Llu2` captures the supplied `Lgqk0` and dispatches virtual `Lv6a.G`; a supplied `Ljqk0` receives the event on that same instance.
- [ ] Identify the upstream producer and meaning of conversation `Lkmk0` and its `a`/`b` payload; determine whether local `Lgs31.b` is followed by HTTP guest create/refresh.
- [ ] Locate the actual Android anonymous guest create/refresh HTTP client and the guest conversation composer prepare/send client; keep them separate from LocationCookieInitializer and Files API.

## P1 — Newly identified protocol reconstruction tasks (2026-11-25)

- [x] Reconstruct the static Android DirectResponseClient sender: exact send/parent-lookup/requirements routes, selected-user-message body, conditional fields, attachment mapping and integrity gates. Node.js serialization/transport and fixture tests remain open.
- [x] Decode generated ModelCatalog and ChatRequirements typed fields, optional/null validation and pass-through behavior; trace the challenge consumers and prove the supplied public APK's internal-only native service gate. [ ] Check whether a separate public-build provider exists in another authentic client source.
- [x] Decode core direct-stream events and direct resume path/body/header/offset/token mapping, including the three-handoff cap. [ ] Complete all event variants, processor lifecycle and authorized live tests.
- [x] Decode reservation, signed destination validation, Estuary multipart/raw PUT variants, processing request, numeric limits and accepted formats. [ ] Implement and test authenticated transfer/download, expiry, retry/cancellation and indexing.
- [ ] Locate the Android guest service and the real anonymous create/refresh and composer prepare/send calls. Keep this independent from the authenticated ChatGPT service module and the LocationCookieInitializer route strings.
- [ ] Map the exact user-visible Windows ChatGPT Work Local UI call path to its local process/RPC and service network behavior. The packaged Codex app-server subprocess is a source finding, not a ChatJS dependency; ChatJS must not spawn `codex.exe` or a separate app-server process.
- [ ] Reconstruct the desktop `/wham` and Estuary client schemas and identify which UI features use them; do not equate every visible Work surface with the Codex app-server path.

## P1 — Android compiled-client reconstruction follow-up (2026-11-25)

- [x] Decode Valdi bytecode/control flow for authenticated DirectResponseClient send/prepare: exact `/backend-api/f/conversation` send route, separate GET `/backend-api/conversation/{id}` parent lookup, selected-user-message body construction, conditional conversation/skills fields, attachment mapping, JSON serialization and requirements/device-integrity provider boundaries. Full nested model/requirements schemas, public native integrity behavior, upload protocol and resume mapping remain separate tasks.
- [x] Decode generated ModelCatalog/ChatRequirements named-field requiredness, optionality, and types: request flags; default_model_slug; models/versions; model slug/model_slug; intelligence_presets; requirements token and turnstile/proofofwork/so challenge arrays; challenge required flag. Extra properties are preserved and optional nulls fail validation. [ ] Trace pass-through catalog fields and challenge descriptor consumers/provider schemas.
- [x] Decode event/delta operations and direct resume request bytecode, including entity references, resume/handoff events, x-conduit-token, offset and maximum handoff count. [ ] Complete untraced event types and server verification.
- [x] Decode upload reservation response, exact count/per-file/aggregate limits, accepted MIME/image constraints, URL validation, and PUT/process requests. [ ] Resolve URL expiry, retry/cancellation, download and file indexing.

## P1 — Unified ChatGPT mobile + desktop + Codex CLI product target

- [ ] Build a complete capability map for all three client/source families: ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI.
- [ ] Trace Codex CLI's ChatGPT-backed Responses HTTP/SSE/WebSocket client, legitimate account/session headers, request models, event stream, tool lifecycle, approvals and task/thread state; implement verified behavior directly in ChatJS.
- [ ] Reconstruct Codex local coding-agent behavior and safe Node.js equivalents for workspace/files/commands/tests/Git/artifacts; do not ship or invoke Codex CLI/app-server as a runtime shortcut.
- [ ] Expose mobile, desktop and Codex CLI capability families through one consistent ChatJS factory/client/resource lifecycle, configuration model, errors, cancellation, event/progress system, and TypeScript API while preserving distinct source-specific protocols.
- [ ] Keep ChatGPT as the only AI service target; host adapters may provide genuine host facilities only and must not become an alternate AI-provider abstraction.
- [ ] Ensure README, ChatJS.md, architecture, capability inventory, roadmap and future-session instructions retain this exact product identity.

## P1 — Dynamic, real-time, concurrent and sustained-operation quality

- [ ] Define a capability/readiness API that reports actual runtime, OS/architecture, host-adapter and protocol readiness with evidence-backed states; keep local discovery side-effect-free and remote checks explicit.
- [ ] Define a fully validated configuration/override model with stable in-flight snapshots, transparent precedence and consumer control without security-bypass switches.
- [ ] Specify async operation contracts, per-client/per-operation concurrency limits, bounded queues, ordering, overload behavior, cancellation propagation and backpressure before expanding concurrent workflows.
- [ ] Specify real-time streaming/progress/resume contracts from the official clients; expose only genuine incremental events and never synthetic progress.
- [ ] Design consumer-controlled long-running lifecycle (start/stop/close, graceful shutdown, reconnect/recovery and state retention) without auto-start daemons, hidden polling or unsolicited keepalive traffic.
- [ ] Add soak, memory-leak, repeated start/stop, restart/recovery, network interruption, cancellation, stale-session, queue saturation and long-stream tests for implemented long-running workflows.
- [ ] Add reproducible latency/time-to-first-event/throughput/CPU/heap/memory benchmarks and resource ceilings; only make speed, responsiveness or lightweight claims from measured evidence.
- [ ] Maintain a dated tested Node.js and OS/architecture compatibility matrix and compare supplied official client-source updates through evidence review and contract/regression tests; no self-modifying runtime or background updater.
- [ ] Measure and protect Node.js event-loop responsiveness; add worker offloading only for justified CPU-heavy work and keep host-specific implementations optional.
- [ ] Update public examples and API reference for async usage, concurrency, streaming, cancellation, progress, safe customization, lifecycle and capability readiness as those APIs are actually implemented.

## P1 — Codex CLI ChatGPT client protocol and native Node.js implementation

- [ ] Reconstruct ChatGPT Codex session/thread ID creation, resume/fork/compact, thread-source metadata, and request correlation semantics from the pinned Codex source.
- [ ] Implement the verified `/backend-api/codex/responses` request model in native Node.js after all required fields, optionality, routing order, item schemas and model/feature gates are reconstructed.
- [ ] Implement ChatGPT-only OAuth auth integration with legitimate account/session authorization, guarded single-flight refresh, account-switch safety and explicit secret storage; exclude upstream non-ChatGPT auth modes.
- [ ] Implement the Responses SSE decoder and error/state machine from source evidence, including output items, text/tool deltas, reasoning, response lifecycle, incomplete/interrupted/content-filter cases, usage and stream idle/close errors.
- [ ] Reconstruct and implement the Responses WebSocket path, reuse and fallback logic if required for Codex parity; test HTTP and WebSocket transports independently.
- [ ] Implement Codex task/tool lifecycle and typed async events corresponding to the source JSONL contract; do not fake progress or terminal states.
- [ ] Reimplement safe local coding workflows within ChatJS using explicit optional host adapters and approval/policy boundaries; do not invoke Codex CLI or app-server.
- [ ] Remove/exclude all upstream analytics, OpenTelemetry, feedback, profiling and remote-diagnostics behavior. Preserve the permanent zero-telemetry/no-unsolicited-network rules.

## P1 — Codex local tool runtime, policy and execution parity

- [ ] Reconstruct a native Node.js interactive terminal/process manager for Codex CLI workflows, including interactive `exec_command`, `write_stdin`, one-shot commands, true streaming output, bounded output, deadlines, cancellation and cleanup.
- [ ] Define host adapters for actual filesystem, shell/process/PTY, network sandboxing, secure credential masking and platform sandbox facilities. The core must remain importable/useful without terminal or shell support.
- [ ] Implement policy-driven command approvals with typed skip/needs-approval/fresh-human-approval/forbidden outcomes, explicit denial and session-scoped approved keys. Never bypass or auto-satisfy required human approval.
- [ ] Reconstruct and implement workspace/path confinement, filesystem permissions, sandbox selection, network restrictions and platform-specific behavior without assuming Windows/Linux/macOS equivalence.
- [ ] Implement the verified `apply_patch` parser/application/progress path and robust conflict/error reporting rather than delegating arbitrary patch text to a shell.
- [ ] Reconstruct MCP server/tool discovery, readiness, namespacing, schema validation, invocation, approvals, result flow and cancellation where needed for Codex CLI parity.
- [ ] Test all local execution paths on supported real hosts, including cancellation, process-tree cleanup, policy denial, sandbox denial, invalid/foreign paths, output truncation, concurrent sessions and host-adapter absence.

## P1 — Codex network/permission policy, dynamic discovery and collaboration

- [ ] Implement command-scoped outbound network approval with strict command/environment/request attribution, fail-closed ambiguous ownership, host/protocol/port policy, bounded per-host prompts, once/session/deny decisions, cancellation and deferred completion.
- [ ] Implement remote executor proxy capability negotiation and credential masking only where the source requires it and the host capability genuinely exists; fail closed when required proxy support is unavailable.
- [ ] Implement `request_permissions` with selected-executor-aware path resolution, typed filesystem permissions, normalized additional grants, user approval, explicit denial and revocation semantics.
- [ ] Implement deferred tool discovery using a local indexed registry, lazy definition loading, bounded ranked queries and per-step policy filtering; do not add remote tool discovery or hidden network calls.
- [ ] Reconstruct MultiAgentV2 feature gates, child-thread lifecycle, agent count limits, fork modes and thread state before implementing.
- [ ] Implement native agent collaboration actions (spawn, queue-only message, trigger-turn followup, activity wait, status list and interrupt) with real thread IDs, bounded concurrency, cancellation and correctly ordered activity events.
- [ ] Exclude source analytics/telemetry and test that policy decisions, tool search and agent operations work without hidden network activity.

## P1 — Codex turn-control, user interaction and extension APIs

- [ ] Implement the Codex plan/context control events, Plan-mode rules, and measured context-budget reporting.
- [ ] Implement the namespaced clock tool using a real injected time source and documented UTC semantics; do not add an external time API.
- [ ] Implement deferred environment readiness only for real host environments already starting; report ready/failed/unknown/cancelled states and never invent environment IDs.
- [ ] Define optional host user-interaction APIs for blocking questions, asynchronous structured questions and asynchronous status messages. Preserve real acceptance/order/replies and represent an absent UI honestly.
- [ ] Implement separate MCP resources/list, templates/list and resource/read contracts with environment-aware URI/path rules, access checks, cancellation and size limits.
- [ ] Implement current-thread dynamic tool registration/invocation as explicit callback-based operations with schema validation, lifecycle events and cancellation; keep separate from AI-service transport.
- [ ] Reconstruct catalog-sourced plugin/connector discovery/install, explicit elicitation consent, install verification and MCP refresh; only support approved in-scope entries and preserve the current full-source-backed product scope and all technical security/privacy invariants.
- [ ] Add unit and authorized integration tests for every control/extension lifecycle, host adapter missing states, cancellation, reordered responses, install decline/cancel and no-telemetry/no-unsolicited-network invariants.

## P1 — Android Valdi/QuickJS bytecode inspection tooling

- [x] Obtain pinned Valdi QuickJS source files and build a temporary analysis-only reader from commit `f5bc2dcfcb880109c908e0675968cb532231ca71`; the Android native binary's exact source revision/build flags remain unverified.
- [x] Build a temporary analysis-only fork with `js_dump_function_bytecode(ctx, b)` immediately before `JS_ReadFunctionTag` returns, after constant-pool reconstruction. This decodes serialized precompiled functions; the ordinary compilation-side `DUMP_BYTECODE` hook alone was insufficient.
- [x] Validate the reader on three real compiled Android module entries (direct sender, generated API client and event decoder); all deserialize successfully. The harness reads bytecode and releases objects only; it never invokes/evaluates application functions.
- [x] Disassemble DirectResponseClient send/prepare, the generated conversation API client and the SSE event decoder; method-level findings are in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. [ ] Continue into nested model/requirements schemas, stream worker/resume transport and upload reservation/process modules.

## P1 — Codex Responses WebSocket v2 and incremental context

- [ ] Implement a provider-capability- and session-state-gated Responses WebSocket v2 handshake, including source-required beta/session/thread/request headers and first-party integrity requirements.
- [ ] Implement turn-scoped connection reuse and lifecycle, auth-owner/revision checks, and correct handling of server turn-state/routing affinity.
- [ ] Implement the typed response.create WebSocket wire model, including optional previous_response_id, generate, and all HTTP-equivalent model/tool/reasoning/request fields.
- [ ] Implement conservative incremental input continuation using exact request-property and ordered-item equality checks; fall back to full input whenever continuation cannot be proven safe.
- [ ] Implement optional explicit WebSocket prewarm with generate:false, reuse and correct first-generation continuation; never perform hidden network activity.
- [ ] Implement bounded 1 MiB frame fragmentation/read-ahead, server message-size handling, event-channel backpressure, response idle timeout, and protocol-acknowledged interruption.
- [ ] Implement source-verified WebSocket retries, HTTP 426/specific-error fallback and one-way per-session HTTP mode; respect Retry-After, cancellation and bounded policy. Do not enable the upstream feature-gated unbounded retry branch by default.
- [ ] Add contract and E2E tests for handshake headers, warmup, continuation vs full requests, auth/session changes, large input frames, event backpressure, interrupt acknowledgements, fallback and subsequent same-session HTTP requests.


## Android complete module census and method-level authentication update — 2026-11-25

- [x] Decompress and census every one of the 111 Valdi modules in the supplied Android 1.2026.321 XAPK; record per-module hashes/sizes and route-string candidates in `docs/ANDROID_CLIENT_MODULE_INVENTORY.md`.
- [x] Rebuild a temporary pinned Valdi QuickJS deserializer and decode seven authentication-session JavaScript entries without evaluating Android functions.
- [x] Add private `isSafeOriginRelativePath` and `isSafeAuthenticatedRequestPath` helpers with exact single-backslash, control-character, space and fragment behavior; ten focused tests pass.
- [x] Complete the AccountCheckResponse object-map schema, all nested optional/nullable field types, account_ordering string array, controller access/deactivation filters, deterministic ordering/deduplication, preferred accountId and first-account fallback. Implemented in the private authentication API schema helper with focused tests.
- [ ] Finish auth controller concurrency/generation/foreground/cancellation/sign-out state transitions; serialized credential-operation and foreground retry behavior is method-decoded, but no controller or login flow is implemented in ChatJS.
- [ ] Use the full module census to reconstruct all remaining Android non-Work feature workflows from method-level callsites; preserve package/string/traced/implemented evidence levels.

## Android auth restore and sign-in orchestration — 2026-11-25

- [x] Disassemble `restore`: credential-store load under a Restoring operation, no-record SignedOut result, optional native session restoration, operation generation checks, establishSession and invalid-token expiry cleanup.
- [x] Disassemble `restoreNativeToken`: require the renewable native provider, restore from the saved record, require returned nativeSessionId to equal the saved nativeSessionId, and return only the restored access token.
- [x] Disassemble direct `signIn`/`authenticateAccessToken`: trim and validate bearer token, account validation, secure save before SignedIn, typed storage error and generation guard.
- [x] Disassemble `signInInteractively`: first-party method capability gating, foreground admission, Browser/native service branch versus host-interactive credential branch, generation checks and cleanup of unfinished native sessions.
- [x] Method-decode the Valdi-side OAINativeCredential wrapper, operation names, cancellable signIn task shape, onCredential/onCleared/onFailure callback registrations, token/native-session validation, OAIAuthenticationService method/failure enums and controller error mapping. This does not include the native implementation.
- [ ] Reconstruct the native CompilerIntrinsics implementation, exact native signIn/restore/accessToken/clear payloads and callback guarantees (especially onCleared), session ownership and OS secure-store behavior; no native login has been invoked.
- [ ] Implement actual authentication only with a legitimate host adapter, secure credential store, complete account validation, first-party integrity support and end-to-end contract tests; no arbitrary token-only shortcut.

## Android account-check schema and account-selection helper — 2026-11-25

- [x] Correct the generated response shape: `accounts` is an object map keyed by account ID, not an array; map values are `AccountCheckRecord`.
- [x] Decode optional nested account metadata with exact `string`, `string | null`, and `boolean` types and preserve extension properties.
- [x] Implement the source-traced account-ordering and fallback behavior, access/deactivation filters, account-ID validation, deduplication, normalized choice metadata, and preferred-account/first-account default selection.
- [x] Add 12 deterministic tests covering the request descriptor, map shape, required/optional/null fields, ordering, filtering, normalization, deduplication and empty-access result.
- [ ] Finish `OAIAuthenticationController` generation/concurrency, foreground/cancellation, sign-out/expiry, native credential and secure-store lifecycles; restore and sign-in orchestration are method-decoded but no login or authenticated transport is implemented.
- [ ] Trace the Android UI/caller that invokes `selectAccount`, then implement account switching only as part of the complete authenticated session/secure-storage lifecycle; never treat the source method trace as working ChatJS support.
- [x] Disassemble the standalone `selectAccount` controller method: canonical ID match against the current session account list, no-op guards, validation cancellation/revalidation invalidation, operation-generation/lifecycle notification, account-bound session reconstruction, immediate in-memory state update and background secure-save warning path. Caller/UI wiring is still untraced; ChatJS has no switch implementation.


## Android credential-store record reconstruction — 2026-11-25

- [x] Decode Android store factory selection: Browser uses memory-only credentials; Android requires API 23+; persistent storage is configured with encryption enabled and batch writes disabled; temporary unavailability is distinct from permanent secure-store failure.
- [x] Decode store namespace/key/user metadata and access policy: `com.openai.valdi.authenticated_session` / `credential` / `authenticated-session-bootstrap`; lifecycle-supplied stores use ForegroundOnly admission.
- [x] Decode `load`/`save`/`clear` wrapper behavior and the serialized credential operation queue/foreground wait-and-retry boundaries.
- [x] Decode the version-1 credential envelope: mutually exclusive accessToken or nativeSessionId, optional accountId, and optional validated nested session/account snapshot. Decode finite JWT `exp` only as optional snapshot metadata.
- [x] Implement the exact outer record codec, nested stored account/session validators, expiry metadata parser and source-shaped record builder as a private side-effect-free module; 16 deterministic tests pass.
- [ ] Decode the actual underlying PersistentStore encryption primitive, key source/alias/rotation, native ownership, atomicity, clear durability and multi-process semantics. Do not assume the `enableEncryption` option reveals these details.

## Android rejected-credential recovery classifier — 2026-11-25

- [x] Decode the generated ErrorEnvelope/ErrorDetail/APIError schema, required `APIError.message`, optional code/type strings, optional/resilient nested members and invalid nested-object fallback behavior.
- [x] Decode exact recovery precedence: nested detail.error.code revocation only; otherwise detail.code SSO/expiry; otherwise top-level error code/type revocation/SSO only; malformed/absent response -> None.
- [x] Decode recovery callback gate: Revoked/RequiresSSO report the account and SSO boolean; Renew invokes accessToken only when the caller-supplied renewal flag is truthy; no action for None.
- [x] Implement private pure decoder/classifier/recovery-plan helper with 17 deterministic tests; no callbacks, token retrieval, invalidation, request retry or network.
- [ ] Trace the requestCredentialContext `reportRevoked` and `accessToken` implementations/callers, including actual credential clearing, native renewal, result propagation and request replay/SSO handling.


## Android authenticated bearer request policy — 2026-11-25

- [x] Decode OAIBearerAPIService constructor validation, Accept/Bearer/ChatGPT-Account-Id headers, conditional JSON Content-Type/body encoding, Sheep gateway header gate and GET/POST/PUT/DELETE/PATCH method dispatch.
- [x] Decode authenticated 401 recovery and exact one-shot replay: cancelled/non-401/bodyless responses skip recovery; undefined recovery token returns original 401; replacement token replays same request once with renewal disabled.
- [x] Decode automatic renewal option gate at Valdi runtime >=377 and final unauthorized callback behavior, including distinct no-native-context session expiry handling.
- [x] Implement private pure authenticated request header/JSON/body/recovery-policy helper with 13 deterministic tests; no network, native callbacks, credential use or replay is implemented.
- [ ] Reconstruct and implement the actual Node.js authenticated HTTP transport, request task state/cancellation semantics and response contract only after real host secure credentials, native token renewal/clear, DPoP and first-party integrity are supported.

 
## Android auth provider and DPoP DEX reconstruction — 2026-11-25

- [x] Sweep all ten supplied Android base APK DEX files for direct OAIAuthenticationService/OAIRenewableAuthentication implementors and OAIPlatformServices constructor/call sites; only generated Kotlin closure adapters were identified, while the actual provider closures remain a bounded unknown.
- [x] Trace Android DPoP key repository metadata: openai.login.dpop. alias prefix, key_pair_alias / pending_credential_deletion metadata, save-failure handling and abandoned-key cleanup paths.
- [x] Identify DPoP crypto/JWS/network evidence: AndroidKeyStore, EC/secp256r1, SHA256withECDSA, typ=dpop+jwt, alg=ES256, Authorization DPoP-vs-Bearer selection, separate DPoP proof plugin/provider, `WWW-Authenticate` scheme parsing and `DPoP`/`Bearer` provider selection, auth.openai.com/oauth/token refresh and invalid-proof timestamp-correction branch. Corrected attribution: `X-Nonce` is a RevenueCat header, not proven ChatGPT DPoP behavior.
- [x] Identify additional DPoP expiry/error and concurrency configuration evidence: dpop_iat_out_of_range, refresh_token_reused, token_expired and android_dpop_signing_concurrency. Source observation only; no telemetry is to be copied.
- [ ] Reconstruct the native CompilerIntrinsics/provider closure injection path, exact DPoP proof claims and nonce lifecycle, full OAuth non-success error normalization and remaining retry ceilings. OAuth request and success response DTO/conversion are source-resolved; `Lxb8.g` now also distinguishes HTTP `ResponseException`/`Ly0p0` with status and parsed Date from generic transport/serialization `Lw0p0` without Date.
- [ ] Define a portable Node.js host secure, non-exportable signing-key adapter from legitimate host capabilities; preserve Android DPoP/account/session semantics and fail closed when unavailable. Do not export/copy AndroidKeyStore private keys or substitute a bearer-only path.
- [ ] Keep Android DPoP implementation blocked until complete source/protocol evidence, secure host signer semantics and authorized end-to-end tests are established. Current ChatJS contains no DPoP implementation.


## Android ES256 signature serialization — 2026-11-25

- [x] Trace `Ljj51.m(byte[], KeyPair)`: JCA `SHA256withECDSA`, DER SEQUENCE/INTEGER parsing, unsigned `r` and `s`, 32-byte scalar normalization and 64-byte concatenation.
- [x] Trace the specific `Lyt2.b(String)` lookup-key nonce caller: URL-safe Base64 nonce decoding, exact 32-byte check, public JWK retrieval and signature encoding. Do not overgeneralize this caller into the main DPoP request path.
- [x] Implement private DER-to-64-byte ES256 signature-format helper with seven deterministic tests, including a real P-256 signature round trip; include in lint and the package archive.
- [x] Decode the exact public-key model serializer: `kty`, `crv`, `x`, `y`; trace affine coordinate normalization and unpadded Base64URL encoding.
- [ ] Establish whether/how this lookup-key nonce proof relates to the main DPoP JWT signer and nonce challenge path.
- [ ] Keep full DPoP/auth work blocked until provider injection, proof claims, nonce lifecycle, OAuth refresh schemas/retry bounds, secure non-exportable host signing, and authorized end-to-end behavior are established.

## Android P-256 keypair and public JWK serialization — 2026-11-25

- [x] Trace AndroidKeyStore EC helper methods: `Lchy.d` creates a secp256r1 keypair with SHA-256 digest; `Lchy.f` reconstructs a keypair from a PrivateKeyEntry; `Lchy.e` deletes an alias.
- [x] Connect DPoP manager `Lcn8` alias metadata and the `Lqhk0` / `Lzt2` lookup-key load-or-generate and deletion path; keep this distinct from the Valdi AES-GCM Keychain key under `Valdi`.
- [x] Decode exact public-key model fields and constants (`kty: EC`, `crv: P-256`, `x`, `y`) and the coordinate-to-Base64URL conversion.
- [x] Implement the private P-256 public JWK coordinate formatter with six deterministic tests, including comparison against Node's real P-256 JWK output; include syntax and archive checks.
- [ ] Trace complete lookup-key proof return consumers and establish its exact relationship to the main DPoP proof/challenge path.
- [ ] Keep the full DPoP flow blocked pending full claims/nonce/refresh/retry contracts, native provider ownership, a legitimate host secure signer and authorized end-to-end verification.


## Android DPoP compact-JWS proof builder trace — 2026-11-25

- [x] Trace `Ln1d1.b` into `Lyls0.s`, including DPoP key, fixed POST, target URL, clock-derived long plus offset, access token and SecureRandom jti source.
- [x] Decode header `typ=dpop+jwt`, `alg=ES256`, `jwk`; payload `htm`, `htu`, long `iat`, `jti`, `ath`, their field order and serialization.
- [x] Verify SHA-256/UTF-8/Base64URL token binding and source URL canonicalization.
- [x] Implement private signing-input/compact-JWS serialization with seven tests and package archive coverage.
- [x] Resolve `iat` as epoch seconds from `Instant.epochSecond` plus stored server-minus-local epoch-second offset; trace the correction calculation. Offset acquisition/persistence and total retry ceiling remain open.
- [x] Decode the generic Ktor `WWW-Authenticate` parser: parameterized `Lwuc0` retains scheme plus `List<Lwub0>` name/value pairs; token68 uses `Lxuc0`; both derive from `Lyuc0`. Trace `Lph8` scheme-based DPoP/Bearer provider selection and the DPoP `Lsh8.a` callback: continuation `Lqh8` does not capture the challenge parameter list, and `Lxp.b` is invoked with request/auth context. No challenge-parameter/nonce consumption is demonstrated by this provider path.
- [x] Trace the registered Ktor `DPoPProofProvider` implementation: `Lkl40` → `Lke` → `Lyls0.s`, using the `Lyt2` P-256 key pair and `Lpvx.b` clock offset; prove the main JWS is built independently of `Lyt2.b(String)`.
- [x] Trace the DPoP signer-result path: `Lgmq0` invokes `Ln1d1.b` once, returns a `Lovx` success/error state, and `Lfq.a` forms the DPoP Authorization value or maps signer failure into a credentials-acquisition failure; no per-invocation retry loop is present.
- [x] Trace the `DPoPClockRetryAttempted` Ktor request attribute end-to-end: `Lwp` writes `Lyp.b` into `Lfyc0.f` using `Lq18.f`/`Map.put` with `kotlin.Unit`, clones the request context preserving the map and invokes `Ldk31.a`; `Lwp` prevents a second clock replay and `Lxp.b` suppresses access-token provider re-entry.
- [x] Separate DPoP observability from protocol: `RequestDPoPMetadata` is converted to OpenTelemetry span attributes; `OpenAI-Device-Key` is a Sentry OkHttp event-recorder header allowlist item, not a header constructor. Do not reproduce either instrumentation path.
- [x] Trace the separate `DEVICE_KEY` lookup-key challenge response: `Lqk00` (`type`/`purpose`/`data`) plus nested `Lpk00` (`challengeId`/`challenge`/`purpose`/`issuedAt`/`expiresAt`/`signature`) is consumed by `Lsk00`, the only DEX caller of `Lyt2.b(String)`. Its JWK/signature response is distinct from the main DPoP JWT.
- [x] Trace the Ktor `Lwp` request-response recovery for `dpop_iat_out_of_range`: parse HTTP `Date`, set server-minus-local `Lpvx.b`, mark/copy request context and replay once through `Ldk31.a`; distinguish it from OAuth refresh correction `Lxb8.e`.
- [x] Decode the OAuth refresh success response: generated `Llkq0`/`Ljkq0` properties and types; trace `Ljn8.a` success-unwrapping and `Ly4b1.h` conversion into credential-bound internal `Lvg8` with selected fallback/timing merge.
- [x] Decode the `Lxb8.g` API-result wrapper and HTTP-vs-transport failure split: `Ljb8` retains `La1p0`, sent refresh `iat` and optional Date; `Ly0p0` response exceptions expose status/Date and `ApiServiceError`, while generic `Lw0p0` transport/serialization failures have no response Date and cannot enter the Date-skew correction.
- [x] Trace the separate Ktor `token_expired` gate and credential-adapter path: `Lwp` reads `x-openai-ide-error-code == token_expired`; `Lcd01.d(currentToken)` records the rejected token; default `Lcd01.e` calls `b(true)`; credential-backed `Lgk8` delegates to `Ld7x.d` / `Ld7x.j` → `Lu5x.f`/`Ld7x.l`, while `Lisp0` returns `NoCredentialsAvailable`. The post-renewal `Lfyc0` → `Lxp.c` / `Ldk31.a` continuation is located; final replay ceiling/error mapping remain open.
- [ ] Trace any other DPoP server-nonce response/header or native callback outside the registered Ktor proof-provider path and the separate `DEVICE_KEY` challenge flow; keep OIDC authorization nonce and RevenueCat `X-Nonce` distinct.
- [x] Identify the in-package producer and bounded request-retry path for `DPoPClockRetryAttempted`: classes2 `Lwp.invokeSuspend` sets it only on the eligible `dpop_iat_out_of_range` branch before the copied-context `Ldk31.a` retry callback; the marker prevents a second clock correction replay.
- [ ] Implement authenticated DPoP only after native provider and secure non-exportable host signer/session ownership are established and authorized E2E tests pass.


## Android DPoP timestamp correction and epoch-second alignment — 2026-11-25

- [x] Trace `Ln1d1.b`: read `Instant.epochSecond`, add stored `Lpvx.b` offset using 64-bit arithmetic, and pass the result as DPoP `iat`.
- [x] Trace `Lxb8.e`: calculate corrected offset as server epoch seconds minus local Instant epoch seconds and store it in `Lpvx.b` before the timestamp-correction refresh retry.
- [x] Add `calculateAndroidDpopIssuedAt` as a private integer-only offset helper with Number/BigInt preservation and tests for positive, negative, mixed-width and invalid inputs.
- [x] Trace the refresh response's HTTP `Date` header through `Lxb81.e` and `Lk9y.a`; the parsed `Ll9a0.i` timestamp is divided by 1000 and supplied as epoch seconds.
- [x] Trace the one explicit correction retry in `Lxb8.e`: after an eligible failure it updates `Lpvx.b` and calls `Lxb8.g` once more. This is one retry in this correction path, not the global OAuth retry policy.
- [x] Decode `Lxb8.j` end-to-end: require `Lpyy0` refresh request, `Ly0p0` response exception and status 400/401/403; compare sent refresh `iat` with response `Date`; accept only `iat - Date > 30s` or `Date - iat > 300s`; accept HTTP 400 `ApiServiceError.c == invalid_grant` or `ApiServiceError.b/c` matching `refresh_token_reused`, `token_expired`, `invalid_dpop_proof`.
- [x] Trace exact Android error parser/constructor mapping: nested JSON `type` is assigned to `ApiServiceError.b`, and nested JSON `code` is assigned to `ApiServiceError.c`; the `invalid_grant` branch is specifically a code comparison.
- [ ] Complete the `token_expired` Ktor renewal/replay contract: resolve the `Lfyc0` → `Lxp.c` / `Ldk31.a` callback's success/failure mapping, total replay ceiling, cancellation and request-state restoration. The Ktor trigger is `x-openai-ide-error-code == token_expired` (not a direct `ApiServiceError.c` match); the refresh request/success DTO and HTTP-vs-transport split are decoded. Keep this distinct from the `dpop_iat_out_of_range` single clock replay and `Lxb8.e` OAuth refresh Date correction; continue other OAuth/`invalid_dpop_proof` branches separately.
- [ ] Trace the dependency-injection scope, lifetime and reset behavior of the in-memory `Lpvx.b` offset holder; no persistence/TTL/clear path was found in the traced holder, but session-reset semantics remain unverified.


## Android Ktor token-expiry request opt-in and resend — 2026-11-26

- [x] Decode the RetryExpiredAccessToken typed request attribute and confirm that Lwp skips its token-expiry handling when the attribute is absent; trace Lup's related ManualUnauthorizedHandling marker and RequestAccessToken preflight.
- [x] Trace the conversation direct-response producer: Loe3.invoke attaches Lsjw(Lrjb) to /backend-api/f/conversation only when Lg7w.k == tpp; establish that the adapter resolves true after its callback completes, suppressing the built-in resend.
- [x] Trace the second producer: Le2e.invokeSuspend attaches Li2e(Function1) to messaging/rooms only when the optional callback exists; the wrapper forwards the callback's Boolean decision to the Ktor handler.
- [x] Decode the token-expiry result/decision path: same-token and typed Luub1 outcomes preserve the original response; changed token plus callback false copies the request, sets RequestAccessToken, runs Lxp.c, and invokes Ldk31.a once; unexpected result shapes throw rather than silently retry.
- [x] Separate the general Ktor sender cap from token-expiry replay: MaxRetriesPerRequestAttributeKey defaults to 20 and Lrzc0 enforces the send-count ceiling. The token-expiry interceptor itself has one downstream sender call, not a 20-retry loop.
- [ ] Trace the application owner and full cancellation/error semantics for both callback producers, inspect any additional dynamically injected producers, and validate the authorized token-expiry path with a legitimate session and supported secure host.
- [ ] Finish the complete Lxb8.g / Ljn8.a non-success OAuth response normalization and remaining invalid_dpop_proof/refresh retry branches. Keep these separate from Lxb8.e refresh Date correction and the one-shot dpop_iat_out_of_range request correction.

## Android BrowserAuthApproval callback follow-up — 2026-11-26

- [x] Identify the /backend-api/f/conversation callback payload as the tagged `BrowserAuthApproval(<redacted>)` `Lrjb` variant; trace `Ljlb.B` to its `Ljs8` discriminator-1 closure and the `Ljlb.s` / `Ljlb.k` approval/session checks.
- [x] Resolve conversation adapter return semantics: `Lrjb.c` logs and returns null when the inner approval callback is false; `Lsjw.c` awaits the method but returns `Boolean.TRUE` after normal completion without forwarding the inner result. Therefore normal completion suppresses the built-in Ktor resend; thrown errors propagate.
- [ ] Trace the upstream `Li2e(Function1)` callback owner and exact Boolean/cancellation/error contract for `messaging/rooms`; check for additional native or injected `RetryExpiredAccessToken` producers.# ChatJS Task List

Use this as the single authoritative queue. Mark tasks complete only when evidence supports completion.

## ACTIVE PRIORITY — Complete ChatGPT Android (non-Work) first

**Owner direction, 2026-11-25. This changes execution order only, not the permanent ChatJS product target.** ChatGPT Android, ChatGPT Desktop/Windows, and Codex CLI all remain in the long-term goal. Until the Android non-Work experience is comprehensively reconstructed, implemented, and tested, do not spend the active work phase on Android Work, Windows/Desktop, or Codex CLI. Keep their existing records and tasks preserved as parked backlog.

No Android client capability is removed from consideration by its feature-domain label. The active Android non-Work inventory covers every source-backed area; implementation is determined by verified client behavior, legitimate service support, authorization, entitlements, and host capabilities.

### Android non-Work completion sequence

- [x] Build a temporary read-only bytecode inspector from the pinned Valdi QuickJS fork and disassemble the Android direct sender, generated conversation API client, event decoder, streaming worker/client/contracts, upload service and file-picker policy. Recovered the authenticated send body/routes, typed model/requirements fields, stream handoff and resume request, upload reservation/transfer/process flow, trusted storage hosts and numeric selection limits. The analysis tool and third-party bytecode remain temporary; no Android app code is executed.
- [ ] Reconstruct authenticated Android account creation/sign-in/session refresh, token lifecycle, DPoP and account switching with legitimate authorization and secret handling.
- [x] Port and test the Android first-party validation predicates for bearer-token syntax, account identifiers, HTTP header names/values and trusted production/staging HTTPS origins as a private side-effect-free helper. This does not implement sign-in, credential storage or authenticated requests.
- [ ] Reconstruct the true accountless guest create/refresh/session lifecycle and guest composer prepare/send routes; distinguish guest session HTTP from local SessionManager state and LocationCookieInitializer constants.
- [x] Decode generated Android ModelCatalog and ChatRequirements named-field schemas, optional/null behavior, and pass-through properties; record the exact models and chat-requirements routes.
- [x] Implement and test private, side-effect-free Android model-catalog and chat-requirements request/schema helpers, including exact GET/POST descriptors, optional/null decoder semantics, unknown-property pass-through, and the default requirements-header fail-closed decision. This does not implement transport, authentication, or device attestation.
- [x] Trace Android requirements-integrity routing: required turnstile/proofofwork/so detection, fail-closed default provider, Valdi >= 11/native-service selection, adapter inputs/callback/cancel boundary, returned-header validation and exact app_attest_challenge body patch.
- [x] Verify the supplied public APK's native integrity factory and service bridge: the registration marker and DEX factory are packaged, but the worker requires Context.getPackageName() === com.openai.chatgpt.internal and throws before HTTP for the public package com.openai.chatgpt.
- [x] Decode the method-level internal DEX exchange and callback shape: package preflight, authenticated HTTPS helper, nonce-bound and request-hash-bound Standard Integrity tokens, chat-requirements token, playintegrity body keys, cookie validation, persistent install UUID, six response headers and null bodyPatchJson.
- [ ] Resolve remaining retry attempt/backoff ceilings, DeviceRateLimits scope/retention and restart persistence, exact cookie name/lifetime/rotation/deletion, UUID rotation/deletion, and the embedded 1.2026.209 User-Agent mismatch in a 1.2026.321 APK. Check for a distinct public-build provider only in another authentic source; never bypass or port the internal exchange as a public capability.
- [x] Reconstruct the Android direct-stream worker protocol, host/worker message kinds, callback correlation, prepared-content delta handling, direct-versus-polling branch, exact resume path/body/header, offset handoff, and three-handoff cap from compiled methods.
- [x] Decode the core event-dispatch and response-processor lifecycle: event-offset advance rules, [DONE]/message_stream_complete terminal handling, nonterminal resume handoff, text/reasoning routing, DIL/entity-reference deduplication, Markdown render batching, final flush and cancel/error callbacks.
- [ ] Complete any remaining generated event subtypes, interruption/recovery, end-to-end history synchronization, and authorized live stream tests.
- [x] Reconstruct the Android file-picker selection policy, upload reservation body/result checks, Estuary multipart and signed-storage PUT branches, process-upload request, trusted destination rules, and image-dimension bounds from compiled methods.
- [x] Add and test an internal, side-effect-free ChatJS attachment-policy helper for the verified selection limits, Base64 byte-length check, trusted destination parser, and upload strategy/header plan. This is not a network uploader or public API.
- [ ] Implement and test the complete authenticated upload/download workflow, including real reservation/transfer/process calls, file indexing, URL expiry, retries, cancellation, and cleanup.
- [ ] Inventory and trace the remaining Android non-Work product areas, including Projects, instructions, context, memory/personalization, image generation/input, video, voice/audio, search, tools, connectors, galleries, and all other genuine client workflows.
- [ ] Reconstruct feature/configuration dependencies only where required for functional parity; preserve functional configuration while excluding SDK analytics, exposure reporting, tracking and telemetry.
- [ ] Implement the Android non-Work capabilities in native ChatJS modules with ESM/CommonJS parity, accurate TypeScript, validated configuration, bounded async/concurrent streaming, cancellation, backpressure and resource cleanup.
- [ ] Add deterministic contract tests and authorized account/guest end-to-end tests for success, errors, retries, rate limits, concurrency, cancellation, interruption, restart and persistence.
- [ ] Mark Android non-Work complete only after the feature inventory has evidence-backed coverage and every claimed implementation passes the required tests. Then advance to Android Work, Windows/Desktop and Codex CLI.

### Parked long-term work (not removed from scope)

Preserve the existing Android Work, Windows/Desktop, and Codex CLI research and tasks below this active phase. Do not start those tracks until the Android non-Work completion gate above is satisfied.

## P0 — Continuity and governance

- [ ] Confirm rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting contributors.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.
- [ ] Owner: update GitHub About description to the approved wording in `REPOSITORY_SETTINGS.md`; the available GitHub integration can update repository files but not repository metadata.

## P1 — Actual client implementation research

- [x] Add the current ChatGPT Android XAPK app bundle to ChatJS Project → Sources and verify its hash and archive integrity.
- [x] Add the official ChatGPT Windows installer to ChatJS Project → Sources as two sequential pieces and verify exact reconstruction.
- [x] Record Android DEX and Valdi module counts and analysis limitations.
- [x] Perform a first-pass decompression/string scan of selected Valdi modules and document concrete auth/session, bearer transport, conversation/streaming, upload, history, image-gallery, and Library components and paths.
- [x] Establish ChatJS Project → Sources as the primary source location for supplied client packages.
- [x] Trace the Android direct-response request sender, generated core schemas, event/resume dispatcher, streaming worker/processor, upload reservation/transfer/process branches, and requirements-integrity provider routing. [ ] Continue with Android auth/guest lifecycles, native integrity internals, remaining event/history schemas and full attachment expiry/retry/download/index behavior.
- [x] Reconstruct the Valdi requirements-integrity routing, default fail-closed provider, native adapter selection condition, adapter context/callback/cancel contract, returned header validation/application, and app_attest_challenge patch schema.
- [x] Resolve the native DEX package guard for the supplied public XAPK: factory and service are bundled, but the worker rejects the public package before HTTP because it requires com.openai.chatgpt.internal. Do not spoof or bypass this first-party gate.
- [x] Document the internal DEX exchange method-level: request helper, allowed-origin/cookie behavior, UUID persistence, nonce and request-hash token roles, playintegrity JSON body, X-Sentinel-Payload response header and null bodyPatchJson. Preserve the internal package gate.
- [ ] Resolve remaining cookie name/lifetime/rotation/deletion, UUID rotation/deletion, retry status transitions/attempt ceilings, DeviceRateLimits scope/retention and cooldown persistence/cancellation edges. Preserve throttles; exclude SDK telemetry.
- [ ] Build a deeper source-path-to-behavior map for conversations, streaming, files, Projects, voice, images, search/tools, and other client workflows, including exact call graphs and schemas.
- [ ] Document actual dependencies and Node.js portability for each major client component.
- [ ] Define a repeatable client behavior test plan and capture verified request/response examples without storing personal account data.
- [x] Add official Codex source snapshot CodexCLI.zip to Project Sources, pinned to a verified upstream commit; document it as reference-only, not a runtime dependency.
- [x] Trace Android anonymous-session state and storage foundations: SessionManager startup/logout/refresh paths, serialized session metadata, sessions/guest-* storage and retired-session cleanup; distinguish location-cookie endpoint constants from composer routes.
- [ ] Reconstruct the exact Android guest session create/refresh network request. The RootViewModel first tries the separate install-referrer AccountSelector login Los8.f → LoginGraphManager, then enters the actual initial anonymous fallback Lgs31.b → Lau31.G. G acquires the Lmgo0 coroutine mutex, runs Llzx.n/Lwk8 local eligibility logic and enters Lau31.E local state work. Correction: Lof70 is Statsig/experimentation (not auth/session); Lau31.u is the local snapshot-to-state refresh path, and Lau31.n → Ldt31 → AuthRepository/CredentialsRepository is the separate credential-backed AuthSession token path. Neither inspected path exposes the guest HTTP create request. Continue through untraced service dependencies/call sites. The global /backend-anon base is configured, but the endpoint is unknown.
- [ ] Trace the origin, generation, persistence, expiry/replacement/retirement policy for the two opaque values used by Lxzp0 to compose sessions/guest-* storage paths.
- [ ] Trace the actual UI composition/caller for AnonymousSessionLoading (Losk1.a) and its relation to the root unauthenticated-session flow. Do not treat "Continue as Guest" as ChatGPT UI; that string belongs to the Shop plugin model Li230.
- [ ] Reconstruct the actual guest conversation composer send/prepare route schemas independently of LocationCookieInitializer. All 111 decompressed Valdi modules were scanned and none contains a `/backend-anon` route string; this does not establish that a guest service is absent.
- [ ] Reconstruct Windows desktop Work Local and Android Work Cloud as separate execution surfaces; never require Codex CLI or app-server.
- [ ] Verify whether Windows desktop Work has a real logged-out guest mode; current evidence is insufficient.
- [x] Reconstruct the newly supplied Windows MSIX parts, verify archive integrity, parse the ASAR file tree, and perform a first-pass static inspection of the Electron bootstrap and app-server host. Full UI-to-service mapping and runtime testing remain open.

## P1 — Product completeness, customization and capability architecture

- [ ] Translate PRODUCT_STANDARD.md into a prioritized, source-evidenced capability map covering every in-scope Android and desktop/Work/Codex workflow; track support, partial, experimental, unsupported, blocked and unknown states.
- [ ] Design and test a validated layered configuration model (safe defaults, per-client settings, optional profiles, and per-operation overrides) with explicit precedence, immutable operation snapshots and no security-bypass switches.
- [ ] Design a capability registry and narrow optional host/provider adapter contracts, including discovery, prerequisites, lifecycle, cancellation, cleanup and typed unavailable/unsupported states.
- [ ] Define a tested Node.js/OS/host compatibility matrix; add CI coverage for declared targets and real-host integration tests for platform-specific adapters.
- [ ] Define production-readiness checks for each feature: source evidence, real implementation, ESM/CommonJS/TypeScript parity, error/cancellation/concurrency/security tests, authorized end-to-end evidence, measured resource budgets, packaging and user documentation.
- [ ] Expand public documentation as real APIs land: quick starts, TypeScript/CommonJS examples, configuration reference, host/provider setup, capability states, errors, limits, side effects, troubleshooting and cleanup.
- [ ] Add performance and soak tests for implemented high-use workflows with explicit latency, memory, concurrency and resource ceilings; do not publish unmeasured performance claims.

## P1 — General-purpose Node.js integration design

- [ ] Define the client factory/configuration/lifecycle API for different host applications.
- [ ] Define the real ChatGPT client connection and legitimate authentication/session lifecycle.
- [ ] Define request/response transport, streaming/backpressure, cancellation, timeouts, retry policy, concurrency, and typed errors from client evidence.
- [x] Implement a reusable bounded/cancellable Server-Sent Events framing parser for async byte streams; keep ChatGPT-specific decoding and live transport unimplemented.
- [ ] Define reusable conversation/thread/context/project models.
- [ ] Define instruction/profile precedence and explicit local persistence/memory behavior.
- [ ] Define file/attachment ingestion, format handling, size limits, and cleanup.
- [ ] Define optional host adapters without requiring specific camera/microphone/screen or OS support.
- [ ] Add TypeScript declaration and ESM/CommonJS contract tests.

## P2 — Complete feature slices

- [ ] Implement genuine authenticated-account and accountless-guest ChatGPT session flows using exact first-party client behavior; preserve all gates and guest restrictions.
- [ ] Implement a genuine ChatGPT client connection and authentication flow based on verified client behavior.
- [ ] Implement conversation send/receive/stream with real ChatGPT service responses.
- [ ] Implement project/context/instruction handling.
- [ ] Implement file and attachment workflows using observed client request formats.
- [ ] Implement Work Local for the Windows desktop client and Work Cloud for Android as separate client/service flows; neither may depend on Codex CLI/app-server.
- [ ] Reconstruct and implement the Codex CLI client capability family as part of ChatJS: direct ChatGPT Codex session/transport, Responses HTTP/SSE/WebSocket behavior, event mapping, tool/task lifecycle, approval semantics and local coding workflows. Implement natively in Node.js; do not spawn the external CLI or app-server.
- [ ] Implement Work/Codex task, workspace, command, approval, Git review, and artifact workflows.
- [ ] Add optional voice/image/video and host integrations only where actual client and host evidence supports them.
- [ ] Add security/regression tests for auth lifecycle, secret redaction, cancellation, concurrency, timeouts, and no unsolicited traffic.

## P3 — Production readiness

- [ ] Review dependency necessity, security, and licensing whenever dependencies are introduced.
- [ ] Add API reference generation only where useful.
- [ ] Add performance, memory, and concurrency benchmarks with measurable budgets.
- [ ] Define supported Node.js hosts from actual implementation requirements.
- [ ] Document maintenance and security-response practices.

## Current position

ChatJS is one general-purpose Node.js module targeting the actual client-side behavior of ChatGPT mobile, ChatGPT desktop, and Codex CLI. The permanent product target is unchanged; the active phase is Android non-Work only, with Android Work, Windows/Desktop, and Codex CLI parked until the Android non-Work completion gate is passed. The current runtime remains foundation-only; no real ChatGPT service connection has been implemented. Current package sources are `ChatGPT-Android.xapk` and the two sequential Windows installer pieces in ChatJS Project → Sources. The personal Library is outside the normal workflow and is not a routine source; access it only for a concrete need when useful and accessible. Any material used there belongs under `ChatJS Project` and must be authentic and necessary. The persistent ChatJS browser profile is the only reusable default profile; temporary sessions are disposable and must not replace it.

Never create branches or worktrees. Keep all repository work on main.


## 2026-11-24 — Current transport and guest-session slice

- [x] Add bounded/cancellable generic SSE parser with CommonJS/ESM/type exports, package archive inclusion and deterministic parser tests.
- [x] Archive the official Codex source snapshot in Project Sources and record its pinned commit/hash; explicitly exclude it as a ChatJS runtime dependency.
- [x] Record Android guest-session identifiers and anonymous endpoint attribution caveat.
- [ ] Finish the exact guest-session call graph and prepare/send payload reconstruction.
- [ ] Continue source-led direct ChatGPT authentication, conversation and Work implementation; no live ChatGPT connection is implemented yet.


- [ ] Trace Lt891 producers/callback wiring into La991.G. Observed constructors are Lq20.invoke → Lt891(5) and Ldo1.invoke selector case 18 → Lt891(6) via the Le2w.e ConversationSidebar path. The distinct Lt891 branch dispatches Lmuz0 label 9 → Lgs31.b → Lau31.G; W891.a goes to Lcq41.e and returns. Prove which callback targets the coordinator before assigning a UI trigger or connecting it to welcome CTA action-29.

- [ ] Trace the concrete callback implementations supplied by `Llal1.h`/`Lj20`/`Lss`/`Lt07`/`Ly641` and the `Lej10.c`/`Ljpc` WebView host, plus the `Le2w.c`/`Le2w.j` ConversationSidebar callbacks. Determine payload meaning and whether any handler dynamically reaches `La991.G`; the ten-DEX static scan found no direct method-id or method-handle binding outside its own definition.

- [ ] Check the candidate Lt891 parent callbacks for a captured `La991` receiver via the generic `Lv6a.H(Louf0)` virtual-dispatch bridge. The known `Le6` bridge is created in Composer / FreeThinkingGaugeNuxHost and is not proven to be the callback supplied to either the WebView or ConversationSidebar.

- [ ] Trace the source and semantics of `Lkmk0` in the conversation coordinator (`Ljqk0.G`). The verified label-16 branch emits `MessageNotFoundException` for no-messages/all-unsupported and invokes local `Lgs31.b`; identify the event producer, reason-code mapping and any subsequent server-side guest creation.

- [x] Trace the local `welcome_language_opportunity` / `Lylh1` enrollment writer and typed `welcome_*` parameters that build the `Lplh1` presentation model; `Lnlh1` is its serializer.
- [x] Trace Android Statsig initialize route/body and persisted response cache. Remaining question: effective caller-supplied cache age and offline/default precedence; exclude all SDK telemetry.
- [x] Trace the Compose-to-conversation ViewModel callback binding: `Lxjk1.f` → `Llu2` captures the supplied `Lgqk0` and dispatches virtual `Lv6a.G`; a supplied `Ljqk0` receives the event on that same instance.
- [ ] Identify the upstream producer and meaning of conversation `Lkmk0` and its `a`/`b` payload; determine whether local `Lgs31.b` is followed by HTTP guest create/refresh.
- [ ] Locate the actual Android anonymous guest create/refresh HTTP client and the guest conversation composer prepare/send client; keep them separate from LocationCookieInitializer and Files API.

## P1 — Newly identified protocol reconstruction tasks (2026-11-25)

- [x] Reconstruct the static Android DirectResponseClient sender: exact send/parent-lookup/requirements routes, selected-user-message body, conditional fields, attachment mapping and integrity gates. Node.js serialization/transport and fixture tests remain open.
- [x] Decode generated ModelCatalog and ChatRequirements typed fields, optional/null validation and pass-through behavior; trace the challenge consumers and prove the supplied public APK's internal-only native service gate. [ ] Check whether a separate public-build provider exists in another authentic client source.
- [x] Decode core direct-stream events and direct resume path/body/header/offset/token mapping, including the three-handoff cap. [ ] Complete all event variants, processor lifecycle and authorized live tests.
- [x] Decode reservation, signed destination validation, Estuary multipart/raw PUT variants, processing request, numeric limits and accepted formats. [ ] Implement and test authenticated transfer/download, expiry, retry/cancellation and indexing.
- [ ] Locate the Android guest service and the real anonymous create/refresh and composer prepare/send calls. Keep this independent from the authenticated ChatGPT service module and the LocationCookieInitializer route strings.
- [ ] Map the exact user-visible Windows ChatGPT Work Local UI call path to its local process/RPC and service network behavior. The packaged Codex app-server subprocess is a source finding, not a ChatJS dependency; ChatJS must not spawn `codex.exe` or a separate app-server process.
- [ ] Reconstruct the desktop `/wham` and Estuary client schemas and identify which UI features use them; do not equate every visible Work surface with the Codex app-server path.

## P1 — Android compiled-client reconstruction follow-up (2026-11-25)

- [x] Decode Valdi bytecode/control flow for authenticated DirectResponseClient send/prepare: exact `/backend-api/f/conversation` send route, separate GET `/backend-api/conversation/{id}` parent lookup, selected-user-message body construction, conditional conversation/skills fields, attachment mapping, JSON serialization and requirements/device-integrity provider boundaries. Full nested model/requirements schemas, public native integrity behavior, upload protocol and resume mapping remain separate tasks.
- [x] Decode generated ModelCatalog/ChatRequirements named-field requiredness, optionality, and types: request flags; default_model_slug; models/versions; model slug/model_slug; intelligence_presets; requirements token and turnstile/proofofwork/so challenge arrays; challenge required flag. Extra properties are preserved and optional nulls fail validation. [ ] Trace pass-through catalog fields and challenge descriptor consumers/provider schemas.
- [x] Decode event/delta operations and direct resume request bytecode, including entity references, resume/handoff events, x-conduit-token, offset and maximum handoff count. [ ] Complete untraced event types and server verification.
- [x] Decode upload reservation response, exact count/per-file/aggregate limits, accepted MIME/image constraints, URL validation, and PUT/process requests. [ ] Resolve URL expiry, retry/cancellation, download and file indexing.

## P1 — Unified ChatGPT mobile + desktop + Codex CLI product target

- [ ] Build a complete capability map for all three client/source families: ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI.
- [ ] Trace Codex CLI's ChatGPT-backed Responses HTTP/SSE/WebSocket client, legitimate account/session headers, request models, event stream, tool lifecycle, approvals and task/thread state; implement verified behavior directly in ChatJS.
- [ ] Reconstruct Codex local coding-agent behavior and safe Node.js equivalents for workspace/files/commands/tests/Git/artifacts; do not ship or invoke Codex CLI/app-server as a runtime shortcut.
- [ ] Expose mobile, desktop and Codex CLI capability families through one consistent ChatJS factory/client/resource lifecycle, configuration model, errors, cancellation, event/progress system, and TypeScript API while preserving distinct source-specific protocols.
- [ ] Keep ChatGPT as the only AI service target; host adapters may provide genuine host facilities only and must not become an alternate AI-provider abstraction.
- [ ] Ensure README, ChatJS.md, architecture, capability inventory, roadmap and future-session instructions retain this exact product identity.

## P1 — Dynamic, real-time, concurrent and sustained-operation quality

- [ ] Define a capability/readiness API that reports actual runtime, OS/architecture, host-adapter and protocol readiness with evidence-backed states; keep local discovery side-effect-free and remote checks explicit.
- [ ] Define a fully validated configuration/override model with stable in-flight snapshots, transparent precedence and consumer control without security-bypass switches.
- [ ] Specify async operation contracts, per-client/per-operation concurrency limits, bounded queues, ordering, overload behavior, cancellation propagation and backpressure before expanding concurrent workflows.
- [ ] Specify real-time streaming/progress/resume contracts from the official clients; expose only genuine incremental events and never synthetic progress.
- [ ] Design consumer-controlled long-running lifecycle (start/stop/close, graceful shutdown, reconnect/recovery and state retention) without auto-start daemons, hidden polling or unsolicited keepalive traffic.
- [ ] Add soak, memory-leak, repeated start/stop, restart/recovery, network interruption, cancellation, stale-session, queue saturation and long-stream tests for implemented long-running workflows.
- [ ] Add reproducible latency/time-to-first-event/throughput/CPU/heap/memory benchmarks and resource ceilings; only make speed, responsiveness or lightweight claims from measured evidence.
- [ ] Maintain a dated tested Node.js and OS/architecture compatibility matrix and compare supplied official client-source updates through evidence review and contract/regression tests; no self-modifying runtime or background updater.
- [ ] Measure and protect Node.js event-loop responsiveness; add worker offloading only for justified CPU-heavy work and keep host-specific implementations optional.
- [ ] Update public examples and API reference for async usage, concurrency, streaming, cancellation, progress, safe customization, lifecycle and capability readiness as those APIs are actually implemented.

## P1 — Codex CLI ChatGPT client protocol and native Node.js implementation

- [ ] Reconstruct ChatGPT Codex session/thread ID creation, resume/fork/compact, thread-source metadata, and request correlation semantics from the pinned Codex source.
- [ ] Implement the verified `/backend-api/codex/responses` request model in native Node.js after all required fields, optionality, routing order, item schemas and model/feature gates are reconstructed.
- [ ] Implement ChatGPT-only OAuth auth integration with legitimate account/session authorization, guarded single-flight refresh, account-switch safety and explicit secret storage; exclude upstream non-ChatGPT auth modes.
- [ ] Implement the Responses SSE decoder and error/state machine from source evidence, including output items, text/tool deltas, reasoning, response lifecycle, incomplete/interrupted/content-filter cases, usage and stream idle/close errors.
- [ ] Reconstruct and implement the Responses WebSocket path, reuse and fallback logic if required for Codex parity; test HTTP and WebSocket transports independently.
- [ ] Implement Codex task/tool lifecycle and typed async events corresponding to the source JSONL contract; do not fake progress or terminal states.
- [ ] Reimplement safe local coding workflows within ChatJS using explicit optional host adapters and approval/policy boundaries; do not invoke Codex CLI or app-server.
- [ ] Remove/exclude all upstream analytics, OpenTelemetry, feedback, profiling and remote-diagnostics behavior. Preserve the permanent zero-telemetry/no-unsolicited-network rules.

## P1 — Codex local tool runtime, policy and execution parity

- [ ] Reconstruct a native Node.js interactive terminal/process manager for Codex CLI workflows, including interactive `exec_command`, `write_stdin`, one-shot commands, true streaming output, bounded output, deadlines, cancellation and cleanup.
- [ ] Define host adapters for actual filesystem, shell/process/PTY, network sandboxing, secure credential masking and platform sandbox facilities. The core must remain importable/useful without terminal or shell support.
- [ ] Implement policy-driven command approvals with typed skip/needs-approval/fresh-human-approval/forbidden outcomes, explicit denial and session-scoped approved keys. Never bypass or auto-satisfy required human approval.
- [ ] Reconstruct and implement workspace/path confinement, filesystem permissions, sandbox selection, network restrictions and platform-specific behavior without assuming Windows/Linux/macOS equivalence.
- [ ] Implement the verified `apply_patch` parser/application/progress path and robust conflict/error reporting rather than delegating arbitrary patch text to a shell.
- [ ] Reconstruct MCP server/tool discovery, readiness, namespacing, schema validation, invocation, approvals, result flow and cancellation where needed for Codex CLI parity.
- [ ] Test all local execution paths on supported real hosts, including cancellation, process-tree cleanup, policy denial, sandbox denial, invalid/foreign paths, output truncation, concurrent sessions and host-adapter absence.

## P1 — Codex network/permission policy, dynamic discovery and collaboration

- [ ] Implement command-scoped outbound network approval with strict command/environment/request attribution, fail-closed ambiguous ownership, host/protocol/port policy, bounded per-host prompts, once/session/deny decisions, cancellation and deferred completion.
- [ ] Implement remote executor proxy capability negotiation and credential masking only where the source requires it and the host capability genuinely exists; fail closed when required proxy support is unavailable.
- [ ] Implement `request_permissions` with selected-executor-aware path resolution, typed filesystem permissions, normalized additional grants, user approval, explicit denial and revocation semantics.
- [ ] Implement deferred tool discovery using a local indexed registry, lazy definition loading, bounded ranked queries and per-step policy filtering; do not add remote tool discovery or hidden network calls.
- [ ] Reconstruct MultiAgentV2 feature gates, child-thread lifecycle, agent count limits, fork modes and thread state before implementing.
- [ ] Implement native agent collaboration actions (spawn, queue-only message, trigger-turn followup, activity wait, status list and interrupt) with real thread IDs, bounded concurrency, cancellation and correctly ordered activity events.
- [ ] Exclude source analytics/telemetry and test that policy decisions, tool search and agent operations work without hidden network activity.

## P1 — Codex turn-control, user interaction and extension APIs

- [ ] Implement the Codex plan/context control events, Plan-mode rules, and measured context-budget reporting.
- [ ] Implement the namespaced clock tool using a real injected time source and documented UTC semantics; do not add an external time API.
- [ ] Implement deferred environment readiness only for real host environments already starting; report ready/failed/unknown/cancelled states and never invent environment IDs.
- [ ] Define optional host user-interaction APIs for blocking questions, asynchronous structured questions and asynchronous status messages. Preserve real acceptance/order/replies and represent an absent UI honestly.
- [ ] Implement separate MCP resources/list, templates/list and resource/read contracts with environment-aware URI/path rules, access checks, cancellation and size limits.
- [ ] Implement current-thread dynamic tool registration/invocation as explicit callback-based operations with schema validation, lifecycle events and cancellation; keep separate from AI-service transport.
- [ ] Reconstruct catalog-sourced plugin/connector discovery/install, explicit elicitation consent, install verification and MCP refresh; only support approved in-scope entries and preserve the current full-source-backed product scope and all technical security/privacy invariants.
- [ ] Add unit and authorized integration tests for every control/extension lifecycle, host adapter missing states, cancellation, reordered responses, install decline/cancel and no-telemetry/no-unsolicited-network invariants.

## P1 — Android Valdi/QuickJS bytecode inspection tooling

- [x] Obtain pinned Valdi QuickJS source files and build a temporary analysis-only reader from commit `f5bc2dcfcb880109c908e0675968cb532231ca71`; the Android native binary's exact source revision/build flags remain unverified.
- [x] Build a temporary analysis-only fork with `js_dump_function_bytecode(ctx, b)` immediately before `JS_ReadFunctionTag` returns, after constant-pool reconstruction. This decodes serialized precompiled functions; the ordinary compilation-side `DUMP_BYTECODE` hook alone was insufficient.
- [x] Validate the reader on three real compiled Android module entries (direct sender, generated API client and event decoder); all deserialize successfully. The harness reads bytecode and releases objects only; it never invokes/evaluates application functions.
- [x] Disassemble DirectResponseClient send/prepare, the generated conversation API client and the SSE event decoder; method-level findings are in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. [ ] Continue into nested model/requirements schemas, stream worker/resume transport and upload reservation/process modules.

## P1 — Codex Responses WebSocket v2 and incremental context

- [ ] Implement a provider-capability- and session-state-gated Responses WebSocket v2 handshake, including source-required beta/session/thread/request headers and first-party integrity requirements.
- [ ] Implement turn-scoped connection reuse and lifecycle, auth-owner/revision checks, and correct handling of server turn-state/routing affinity.
- [ ] Implement the typed response.create WebSocket wire model, including optional previous_response_id, generate, and all HTTP-equivalent model/tool/reasoning/request fields.
- [ ] Implement conservative incremental input continuation using exact request-property and ordered-item equality checks; fall back to full input whenever continuation cannot be proven safe.
- [ ] Implement optional explicit WebSocket prewarm with generate:false, reuse and correct first-generation continuation; never perform hidden network activity.
- [ ] Implement bounded 1 MiB frame fragmentation/read-ahead, server message-size handling, event-channel backpressure, response idle timeout, and protocol-acknowledged interruption.
- [ ] Implement source-verified WebSocket retries, HTTP 426/specific-error fallback and one-way per-session HTTP mode; respect Retry-After, cancellation and bounded policy. Do not enable the upstream feature-gated unbounded retry branch by default.
- [ ] Add contract and E2E tests for handshake headers, warmup, continuation vs full requests, auth/session changes, large input frames, event backpressure, interrupt acknowledgements, fallback and subsequent same-session HTTP requests.


## Android complete module census and method-level authentication update — 2026-11-25

- [x] Decompress and census every one of the 111 Valdi modules in the supplied Android 1.2026.321 XAPK; record per-module hashes/sizes and route-string candidates in `docs/ANDROID_CLIENT_MODULE_INVENTORY.md`.
- [x] Rebuild a temporary pinned Valdi QuickJS deserializer and decode seven authentication-session JavaScript entries without evaluating Android functions.
- [x] Add private `isSafeOriginRelativePath` and `isSafeAuthenticatedRequestPath` helpers with exact single-backslash, control-character, space and fragment behavior; ten focused tests pass.
- [x] Complete the AccountCheckResponse object-map schema, all nested optional/nullable field types, account_ordering string array, controller access/deactivation filters, deterministic ordering/deduplication, preferred accountId and first-account fallback. Implemented in the private authentication API schema helper with focused tests.
- [ ] Finish auth controller concurrency/generation/foreground/cancellation/sign-out state transitions; serialized credential-operation and foreground retry behavior is method-decoded, but no controller or login flow is implemented in ChatJS.
- [ ] Use the full module census to reconstruct all remaining Android non-Work feature workflows from method-level callsites; preserve package/string/traced/implemented evidence levels.

## Android auth restore and sign-in orchestration — 2026-11-25

- [x] Disassemble `restore`: credential-store load under a Restoring operation, no-record SignedOut result, optional native session restoration, operation generation checks, establishSession and invalid-token expiry cleanup.
- [x] Disassemble `restoreNativeToken`: require the renewable native provider, restore from the saved record, require returned nativeSessionId to equal the saved nativeSessionId, and return only the restored access token.
- [x] Disassemble direct `signIn`/`authenticateAccessToken`: trim and validate bearer token, account validation, secure save before SignedIn, typed storage error and generation guard.
- [x] Disassemble `signInInteractively`: first-party method capability gating, foreground admission, Browser/native service branch versus host-interactive credential branch, generation checks and cleanup of unfinished native sessions.
- [x] Method-decode the Valdi-side OAINativeCredential wrapper, operation names, cancellable signIn task shape, onCredential/onCleared/onFailure callback registrations, token/native-session validation, OAIAuthenticationService method/failure enums and controller error mapping. This does not include the native implementation.
- [ ] Reconstruct the native CompilerIntrinsics implementation, exact native signIn/restore/accessToken/clear payloads and callback guarantees (especially onCleared), session ownership and OS secure-store behavior; no native login has been invoked.
- [ ] Implement actual authentication only with a legitimate host adapter, secure credential store, complete account validation, first-party integrity support and end-to-end contract tests; no arbitrary token-only shortcut.

## Android account-check schema and account-selection helper — 2026-11-25

- [x] Correct the generated response shape: `accounts` is an object map keyed by account ID, not an array; map values are `AccountCheckRecord`.
- [x] Decode optional nested account metadata with exact `string`, `string | null`, and `boolean` types and preserve extension properties.
- [x] Implement the source-traced account-ordering and fallback behavior, access/deactivation filters, account-ID validation, deduplication, normalized choice metadata, and preferred-account/first-account default selection.
- [x] Add 12 deterministic tests covering the request descriptor, map shape, required/optional/null fields, ordering, filtering, normalization, deduplication and empty-access result.
- [ ] Finish `OAIAuthenticationController` generation/concurrency, foreground/cancellation, sign-out/expiry, native credential and secure-store lifecycles; restore and sign-in orchestration are method-decoded but no login or authenticated transport is implemented.
- [ ] Trace the Android UI/caller that invokes `selectAccount`, then implement account switching only as part of the complete authenticated session/secure-storage lifecycle; never treat the source method trace as working ChatJS support.
- [x] Disassemble the standalone `selectAccount` controller method: canonical ID match against the current session account list, no-op guards, validation cancellation/revalidation invalidation, operation-generation/lifecycle notification, account-bound session reconstruction, immediate in-memory state update and background secure-save warning path. Caller/UI wiring is still untraced; ChatJS has no switch implementation.


## Android credential-store record reconstruction — 2026-11-25

- [x] Decode Android store factory selection: Browser uses memory-only credentials; Android requires API 23+; persistent storage is configured with encryption enabled and batch writes disabled; temporary unavailability is distinct from permanent secure-store failure.
- [x] Decode store namespace/key/user metadata and access policy: `com.openai.valdi.authenticated_session` / `credential` / `authenticated-session-bootstrap`; lifecycle-supplied stores use ForegroundOnly admission.
- [x] Decode `load`/`save`/`clear` wrapper behavior and the serialized credential operation queue/foreground wait-and-retry boundaries.
- [x] Decode the version-1 credential envelope: mutually exclusive accessToken or nativeSessionId, optional accountId, and optional validated nested session/account snapshot. Decode finite JWT `exp` only as optional snapshot metadata.
- [x] Implement the exact outer record codec, nested stored account/session validators, expiry metadata parser and source-shaped record builder as a private side-effect-free module; 16 deterministic tests pass.
- [ ] Decode the actual underlying PersistentStore encryption primitive, key source/alias/rotation, native ownership, atomicity, clear durability and multi-process semantics. Do not assume the `enableEncryption` option reveals these details.

## Android rejected-credential recovery classifier — 2026-11-25

- [x] Decode the generated ErrorEnvelope/ErrorDetail/APIError schema, required `APIError.message`, optional code/type strings, optional/resilient nested members and invalid nested-object fallback behavior.
- [x] Decode exact recovery precedence: nested detail.error.code revocation only; otherwise detail.code SSO/expiry; otherwise top-level error code/type revocation/SSO only; malformed/absent response -> None.
- [x] Decode recovery callback gate: Revoked/RequiresSSO report the account and SSO boolean; Renew invokes accessToken only when the caller-supplied renewal flag is truthy; no action for None.
- [x] Implement private pure decoder/classifier/recovery-plan helper with 17 deterministic tests; no callbacks, token retrieval, invalidation, request retry or network.
- [ ] Trace the requestCredentialContext `reportRevoked` and `accessToken` implementations/callers, including actual credential clearing, native renewal, result propagation and request replay/SSO handling.


## Android authenticated bearer request policy — 2026-11-25

- [x] Decode OAIBearerAPIService constructor validation, Accept/Bearer/ChatGPT-Account-Id headers, conditional JSON Content-Type/body encoding, Sheep gateway header gate and GET/POST/PUT/DELETE/PATCH method dispatch.
- [x] Decode authenticated 401 recovery and exact one-shot replay: cancelled/non-401/bodyless responses skip recovery; undefined recovery token returns original 401; replacement token replays same request once with renewal disabled.
- [x] Decode automatic renewal option gate at Valdi runtime >=377 and final unauthorized callback behavior, including distinct no-native-context session expiry handling.
- [x] Implement private pure authenticated request header/JSON/body/recovery-policy helper with 13 deterministic tests; no network, native callbacks, credential use or replay is implemented.
- [ ] Reconstruct and implement the actual Node.js authenticated HTTP transport, request task state/cancellation semantics and response contract only after real host secure credentials, native token renewal/clear, DPoP and first-party integrity are supported.

 
## Android auth provider and DPoP DEX reconstruction — 2026-11-25

- [x] Sweep all ten supplied Android base APK DEX files for direct OAIAuthenticationService/OAIRenewableAuthentication implementors and OAIPlatformServices constructor/call sites; only generated Kotlin closure adapters were identified, while the actual provider closures remain a bounded unknown.
- [x] Trace Android DPoP key repository metadata: openai.login.dpop. alias prefix, key_pair_alias / pending_credential_deletion metadata, save-failure handling and abandoned-key cleanup paths.
- [x] Identify DPoP crypto/JWS/network evidence: AndroidKeyStore, EC/secp256r1, SHA256withECDSA, typ=dpop+jwt, alg=ES256, Authorization DPoP-vs-Bearer selection, separate DPoP proof plugin/provider, `WWW-Authenticate` scheme parsing and `DPoP`/`Bearer` provider selection, auth.openai.com/oauth/token refresh and invalid-proof timestamp-correction branch. Corrected attribution: `X-Nonce` is a RevenueCat header, not proven ChatGPT DPoP behavior.
- [x] Identify additional DPoP expiry/error and concurrency configuration evidence: dpop_iat_out_of_range, refresh_token_reused, token_expired and android_dpop_signing_concurrency. Source observation only; no telemetry is to be copied.
- [ ] Reconstruct the native CompilerIntrinsics/provider closure injection path, exact DPoP proof claims and nonce lifecycle, full OAuth non-success error normalization and remaining retry ceilings. OAuth request and success response DTO/conversion are source-resolved; `Lxb8.g` now also distinguishes HTTP `ResponseException`/`Ly0p0` with status and parsed Date from generic transport/serialization `Lw0p0` without Date.
- [ ] Define a portable Node.js host secure, non-exportable signing-key adapter from legitimate host capabilities; preserve Android DPoP/account/session semantics and fail closed when unavailable. Do not export/copy AndroidKeyStore private keys or substitute a bearer-only path.
- [ ] Keep Android DPoP implementation blocked until complete source/protocol evidence, secure host signer semantics and authorized end-to-end tests are established. Current ChatJS contains no DPoP implementation.


## Android ES256 signature serialization — 2026-11-25

- [x] Trace `Ljj51.m(byte[], KeyPair)`: JCA `SHA256withECDSA`, DER SEQUENCE/INTEGER parsing, unsigned `r` and `s`, 32-byte scalar normalization and 64-byte concatenation.
- [x] Trace the specific `Lyt2.b(String)` lookup-key nonce caller: URL-safe Base64 nonce decoding, exact 32-byte check, public JWK retrieval and signature encoding. Do not overgeneralize this caller into the main DPoP request path.
- [x] Implement private DER-to-64-byte ES256 signature-format helper with seven deterministic tests, including a real P-256 signature round trip; include in lint and the package archive.
- [x] Decode the exact public-key model serializer: `kty`, `crv`, `x`, `y`; trace affine coordinate normalization and unpadded Base64URL encoding.
- [ ] Establish whether/how this lookup-key nonce proof relates to the main DPoP JWT signer and nonce challenge path.
- [ ] Keep full DPoP/auth work blocked until provider injection, proof claims, nonce lifecycle, OAuth refresh schemas/retry bounds, secure non-exportable host signing, and authorized end-to-end behavior are established.

## Android P-256 keypair and public JWK serialization — 2026-11-25

- [x] Trace AndroidKeyStore EC helper methods: `Lchy.d` creates a secp256r1 keypair with SHA-256 digest; `Lchy.f` reconstructs a keypair from a PrivateKeyEntry; `Lchy.e` deletes an alias.
- [x] Connect DPoP manager `Lcn8` alias metadata and the `Lqhk0` / `Lzt2` lookup-key load-or-generate and deletion path; keep this distinct from the Valdi AES-GCM Keychain key under `Valdi`.
- [x] Decode exact public-key model fields and constants (`kty: EC`, `crv: P-256`, `x`, `y`) and the coordinate-to-Base64URL conversion.
- [x] Implement the private P-256 public JWK coordinate formatter with six deterministic tests, including comparison against Node's real P-256 JWK output; include syntax and archive checks.
- [ ] Trace complete lookup-key proof return consumers and establish its exact relationship to the main DPoP proof/challenge path.
- [ ] Keep the full DPoP flow blocked pending full claims/nonce/refresh/retry contracts, native provider ownership, a legitimate host secure signer and authorized end-to-end verification.


## Android DPoP compact-JWS proof builder trace — 2026-11-25

- [x] Trace `Ln1d1.b` into `Lyls0.s`, including DPoP key, fixed POST, target URL, clock-derived long plus offset, access token and SecureRandom jti source.
- [x] Decode header `typ=dpop+jwt`, `alg=ES256`, `jwk`; payload `htm`, `htu`, long `iat`, `jti`, `ath`, their field order and serialization.
- [x] Verify SHA-256/UTF-8/Base64URL token binding and source URL canonicalization.
- [x] Implement private signing-input/compact-JWS serialization with seven tests and package archive coverage.
- [x] Resolve `iat` as epoch seconds from `Instant.epochSecond` plus stored server-minus-local epoch-second offset; trace the correction calculation. Offset acquisition/persistence and total retry ceiling remain open.
- [x] Decode the generic Ktor `WWW-Authenticate` parser: parameterized `Lwuc0` retains scheme plus `List<Lwub0>` name/value pairs; token68 uses `Lxuc0`; both derive from `Lyuc0`. Trace `Lph8` scheme-based DPoP/Bearer provider selection and the DPoP `Lsh8.a` callback: continuation `Lqh8` does not capture the challenge parameter list, and `Lxp.b` is invoked with request/auth context. No challenge-parameter/nonce consumption is demonstrated by this provider path.
- [x] Trace the registered Ktor `DPoPProofProvider` implementation: `Lkl40` → `Lke` → `Lyls0.s`, using the `Lyt2` P-256 key pair and `Lpvx.b` clock offset; prove the main JWS is built independently of `Lyt2.b(String)`.
- [x] Trace the DPoP signer-result path: `Lgmq0` invokes `Ln1d1.b` once, returns a `Lovx` success/error state, and `Lfq.a` forms the DPoP Authorization value or maps signer failure into a credentials-acquisition failure; no per-invocation retry loop is present.
- [x] Trace the `DPoPClockRetryAttempted` Ktor request attribute end-to-end: `Lwp` writes `Lyp.b` into `Lfyc0.f` using `Lq18.f`/`Map.put` with `kotlin.Unit`, clones the request context preserving the map and invokes `Ldk31.a`; `Lwp` prevents a second clock replay and `Lxp.b` suppresses access-token provider re-entry.
- [x] Separate DPoP observability from protocol: `RequestDPoPMetadata` is converted to OpenTelemetry span attributes; `OpenAI-Device-Key` is a Sentry OkHttp event-recorder header allowlist item, not a header constructor. Do not reproduce either instrumentation path.
- [x] Trace the separate `DEVICE_KEY` lookup-key challenge response: `Lqk00` (`type`/`purpose`/`data`) plus nested `Lpk00` (`challengeId`/`challenge`/`purpose`/`issuedAt`/`expiresAt`/`signature`) is consumed by `Lsk00`, the only DEX caller of `Lyt2.b(String)`. Its JWK/signature response is distinct from the main DPoP JWT.
- [x] Trace the Ktor `Lwp` request-response recovery for `dpop_iat_out_of_range`: parse HTTP `Date`, set server-minus-local `Lpvx.b`, mark/copy request context and replay once through `Ldk31.a`; distinguish it from OAuth refresh correction `Lxb8.e`.
- [x] Decode the OAuth refresh success response: generated `Llkq0`/`Ljkq0` properties and types; trace `Ljn8.a` success-unwrapping and `Ly4b1.h` conversion into credential-bound internal `Lvg8` with selected fallback/timing merge.
- [x] Decode the `Lxb8.g` API-result wrapper and HTTP-vs-transport failure split: `Ljb8` retains `La1p0`, sent refresh `iat` and optional Date; `Ly0p0` response exceptions expose status/Date and `ApiServiceError`, while generic `Lw0p0` transport/serialization failures have no response Date and cannot enter the Date-skew correction.
- [x] Trace the separate Ktor `token_expired` gate and credential-adapter path: `Lwp` reads `x-openai-ide-error-code == token_expired`; `Lcd01.d(currentToken)` records the rejected token; default `Lcd01.e` calls `b(true)`; credential-backed `Lgk8` delegates to `Ld7x.d` / `Ld7x.j` → `Lu5x.f`/`Ld7x.l`, while `Lisp0` returns `NoCredentialsAvailable`. The post-renewal `Lfyc0` → `Lxp.c` / `Ldk31.a` continuation is located; final replay ceiling/error mapping remain open.
- [ ] Trace any other DPoP server-nonce response/header or native callback outside the registered Ktor proof-provider path and the separate `DEVICE_KEY` challenge flow; keep OIDC authorization nonce and RevenueCat `X-Nonce` distinct.
- [x] Identify the in-package producer and bounded request-retry path for `DPoPClockRetryAttempted`: classes2 `Lwp.invokeSuspend` sets it only on the eligible `dpop_iat_out_of_range` branch before the copied-context `Ldk31.a` retry callback; the marker prevents a second clock correction replay.
- [ ] Implement authenticated DPoP only after native provider and secure non-exportable host signer/session ownership are established and authorized E2E tests pass.


## Android DPoP timestamp correction and epoch-second alignment — 2026-11-25

- [x] Trace `Ln1d1.b`: read `Instant.epochSecond`, add stored `Lpvx.b` offset using 64-bit arithmetic, and pass the result as DPoP `iat`.
- [x] Trace `Lxb8.e`: calculate corrected offset as server epoch seconds minus local Instant epoch seconds and store it in `Lpvx.b` before the timestamp-correction refresh retry.
- [x] Add `calculateAndroidDpopIssuedAt` as a private integer-only offset helper with Number/BigInt preservation and tests for positive, negative, mixed-width and invalid inputs.
- [x] Trace the refresh response's HTTP `Date` header through `Lxb81.e` and `Lk9y.a`; the parsed `Ll9a0.i` timestamp is divided by 1000 and supplied as epoch seconds.
- [x] Trace the one explicit correction retry in `Lxb8.e`: after an eligible failure it updates `Lpvx.b` and calls `Lxb8.g` once more. This is one retry in this correction path, not the global OAuth retry policy.
- [x] Decode `Lxb8.j` end-to-end: require `Lpyy0` refresh request, `Ly0p0` response exception and status 400/401/403; compare sent refresh `iat` with response `Date`; accept only `iat - Date > 30s` or `Date - iat > 300s`; accept HTTP 400 `ApiServiceError.c == invalid_grant` or `ApiServiceError.b/c` matching `refresh_token_reused`, `token_expired`, `invalid_dpop_proof`.
- [x] Trace exact Android error parser/constructor mapping: nested JSON `type` is assigned to `ApiServiceError.b`, and nested JSON `code` is assigned to `ApiServiceError.c`; the `invalid_grant` branch is specifically a code comparison.
- [ ] Complete the `token_expired` Ktor renewal/replay contract: resolve the `Lfyc0` → `Lxp.c` / `Ldk31.a` callback's success/failure mapping, total replay ceiling, cancellation and request-state restoration. The Ktor trigger is `x-openai-ide-error-code == token_expired` (not a direct `ApiServiceError.c` match); the refresh request/success DTO and HTTP-vs-transport split are decoded. Keep this distinct from the `dpop_iat_out_of_range` single clock replay and `Lxb8.e` OAuth refresh Date correction; continue other OAuth/`invalid_dpop_proof` branches separately.
- [ ] Trace the dependency-injection scope, lifetime and reset behavior of the in-memory `Lpvx.b` offset holder; no persistence/TTL/clear path was found in the traced holder, but session-reset semantics remain unverified.


## Android Ktor token-expiry request opt-in and resend — 2026-11-26

- [x] Decode the RetryExpiredAccessToken typed request attribute and confirm that Lwp skips its token-expiry handling when the attribute is absent; trace Lup's related ManualUnauthorizedHandling marker and RequestAccessToken preflight.
- [x] Trace the conversation direct-response producer: Loe3.invoke attaches Lsjw(Lrjb) to /backend-api/f/conversation only when Lg7w.k == tpp; establish that the adapter resolves true after its callback completes, suppressing the built-in resend.
- [x] Trace the second producer: Le2e.invokeSuspend attaches Li2e(Function1) to messaging/rooms only when the optional callback exists; the wrapper forwards the callback's Boolean decision to the Ktor handler.
- [x] Decode the token-expiry result/decision path: same-token and typed Luub1 outcomes preserve the original response; changed token plus callback false copies the request, sets RequestAccessToken, runs Lxp.c, and invokes Ldk31.a once; unexpected result shapes throw rather than silently retry.
- [x] Separate the general Ktor sender cap from token-expiry replay: MaxRetriesPerRequestAttributeKey defaults to 20 and Lrzc0 enforces the send-count ceiling. The token-expiry interceptor itself has one downstream sender call, not a 20-retry loop.
- [ ] Trace the application owner and full cancellation/error semantics for both callback producers, inspect any additional dynamically injected producers, and validate the authorized token-expiry path with a legitimate session and supported secure host.
- [ ] Finish the complete Lxb8.g / Ljn8.a non-success OAuth response normalization and remaining invalid_dpop_proof/refresh retry branches. Keep these separate from Lxb8.e refresh Date correction and the one-shot dpop_iat_out_of_range request correction.

## Android BrowserAuthApproval callback follow-up — 2026-11-26

- [x] Identify the /backend-api/f/conversation callback payload as the tagged `BrowserAuthApproval(<redacted>)` `Lrjb` variant; trace `Ljlb.B` to its `Ljs8` discriminator-1 closure and the `Ljlb.s` / `Ljlb.k` approval/session checks.
- [x] Resolve conversation adapter return semantics: `Lrjb.c` logs and returns null when the inner approval callback is false; `Lsjw.c` awaits the method but returns `Boolean.TRUE` after normal completion without forwarding the inner result. Therefore normal completion suppresses the built-in Ktor resend; thrown errors propagate.
- [ ] Trace the upstream `Li2e(Function1)` callback owner and exact Boolean/cancellation/error contract for `messaging/rooms`; check for additional native or injected `RetryExpiredAccessToken` producers.

## Android messaging/rooms retry callback contract review — 2026-11-26

- [x] Trace the Le2e callback's UI owner through Lqdl1.j → Lbdl1.j → Lxne0 → Lbdl1.f; the Compose surface is labelled ImagesCreationComposer.
- [x] Trace the observed Lqdl1.j callback object: Ljup discriminator 24 captures Lqo60, requires Lgjj0, creates Lh2n0 and dispatches to the captured application event handler.
- [x] Compare the actual callback method contracts: Ktor Lrg70.c(Le1u) expects Boolean; Li2e.c passes the Le1u continuation directly to Function1; the observed Ljup casts it to final non-continuation Lgjj0 and makes no Boolean conversion. Mark this as an observed static source incompatibility, not a working retry policy.
- [x] Scan all ten supplied Android DEX files for direct references to Lq6t.e; only Le2e and Loe3 are direct producers in the inspected build (native/dynamic/other-build paths are not excluded).
- [ ] Resolve the actual conditions/alternate UI callbacks that make the ImagesCreationComposer Le2e retry hook safe or unreachable; inspect the alternate Lnz6 path and cancellation/exception behavior without executing the Android app or fabricating a Boolean contract.
- [ ] Resume OAuth Lxb8.g / Ljn8.a non-success HTTP response and transport error normalization; keep the refresh Date-correction and token_expired request paths distinct.


## Android OAuth response error conversion and irrecoverable failure cache — 2026-11-26

- [x] Trace Lwn00.a response error parsing: structured error object, detail object/array envelopes, OAuth error/error_description fallback, Content-Type gate, HTTP status-category mapping, and ApiServiceError field mapping.
- [x] Trace Ljn8.a non-success result handling: preserve typed Luub1 throwable as a Lu0p0 failure; keep refresh attempt identifiers, request/CF-Ray dimensions and protobuf diagnostics out of ChatJS.
- [x] Decode Lsoj1.h irrecoverable classification exactly: InvalidRefreshTokenException + HTTP 401/403; or CachedIrrecoverableError + HTTP 400 + ApiServiceError.code invalid_grant. Do not qualify arbitrary statuses.
- [x] Trace Ld7x.p caching: update Lvg8.h with HTTP status and Lvg8.i with response error string, through guarded Lcn8.i / Ljm8 persistence.
- [x] Trace forced-renewal suppression: Ld7x.s checks the cached Lvg8 irrecoverable marker and returns InvalidRefreshTokenException rather than repeatedly requesting the OAuth token endpoint.
- [ ] Complete the malformed-body/content-type parser edge matrix and exact OAuth refresh failure mapping under cancellation/serialization, plus remaining invalid_dpop_proof and renewal retry paths. Keep DPoP request Date correction, OAuth refresh Date correction, and token_expired request resend as separate state machines.

## Android OAuth invalid-proof retry and malformed response cancellation boundary — 2026-11-26

- [x] Confirm the exact `Lxb8.h` HTTP status set `{400,401,403}` and `Lxb8.i` API error set `{refresh_token_reused, token_expired, invalid_dpop_proof}` from `Lxb8.<clinit>`.
- [x] Close `Lxb8.j` predicate: response exception, eligible status, present response Date, sent-refresh-iat outside the asymmetric 30-second / 300-second bounds, and accepted API error (`invalid_grant` on HTTP 400 or type/code in the three-error set).
- [x] Confirm `Lxb8.e` is the only direct caller and performs one additional `Lxb8.g` call after updating `Lpvx.b`; no loop or second literal `invalid_dpop_proof` site exists in the ten supplied DEX files.
- [x] Separate classes5 `Ln5o.invokeSuspend` auth/session error recognition from the OAuth Date-retry and Ktor header-driven token-expiry request recovery.
- [x] Trace `Lwn00.a` HTML and typed parser failures to no structured API error; trace generic exception handling through `Le6o0.w/x` so a cancelled Job propagates cancellation rather than being silently returned as a normal parser miss.
- [ ] Trace the complete lookup-key proof consumers and establish whether the `Lyt2` nonce-signature flow feeds the main DPoP JWT/challenge path or remains separate.
- [ ] Trace the complete Android lookup-key proof/JWK return schema and establish whether it is separate from or reused by the main DPoP JWT challenge flow.
- [ ] Resolve the alternate `Lnz6` / ImagesCreationComposer callback conditions for the `messaging/rooms` `RetryExpiredAccessToken` producer; do not implement its currently mismatched callback contract.
- [ ] Trace the actual native/CompilerIntrinsics authentication-provider injection point and Kotlin closure owners; distinguish provider implementation from generated interface adapters.

## Android lookup-key challenge proof and DPoP relationship — 2026-11-26

- [x] Decode the `Lqk00` challenge envelope (`type`, `purpose`, `data`) and nested `Lpk00` challenge fields (`challengeId`, `challenge`, `purpose`, `issuedAt`, `expiresAt`, `signature`); confirm `Lqk00.a()` only accepts `DEVICE_KEY` with usable data.
- [x] Decode the `Livk0` proof response (`publicKey`, `challenge`, `deviceSignature`) and EC P-256 JWK schema (`kty`, `crv`, `x`, `y`).
- [x] Trace exact nonce signing: Base64URL decode, exactly 32 bytes, SHA256withECDSA on the KeyPair private key, DER-to-fixed-64-byte ES256 conversion, base64url encoding.
- [x] Trace observed signing-helper callers (`Lge70.invokeSuspend`, `Lrk00.invokeSuspend`) and LoginAuthSigningKeyManager key alias prefix `openai.login.dpop.`.
- [x] Establish that `Livk0.deviceSignature` is a separate lookup challenge artifact, not the ordinary OAuth DPoP JWT; OAuth refresh `Ltb8` separately builds DPoP via `Lyls0.s` from Lyt2 KeyPair/URL/iat; `Lxb8.k` uses the alias.
- [ ] Trace whether the exact generated `openai.login.dpop.*` alias and KeyPair are persisted/reloaded through the credential-bound `Lvg8` record and reused by each later OAuth DPoP refresh; same wrapper contract is established, exact instance/alias continuity is not.
- [ ] Identify the upstream challenge endpoint/transport owner and full `Lge70`/`Lrk00` caller conditions/results; maintain the distinction from OAuth refresh and Codex remote-control device-key proof.
- [ ] Trace the native/CompilerIntrinsics authentication provider and secure signing-key lifecycle; keep non-exportable storage and fail-closed host capability requirements.

## Android DPoP alias persistence and LoginAuth key-source handoff — 2026-11-26

- [x] Trace account preference key_pair_alias through `Ldn8.f` → `Lz481.r` → `Lz481.d()` → `Lvg8.n`.
- [x] Trace OAuth signing key resolver `Lcn8.D(alias)` to `Lzt2.c(alias)` and its fail-closed missing-alias/missing-KeyStore-entry behavior.
- [x] Trace DPoP scheme/prefix validation and unused-key cleanup (`Lcn8.k`, `Lcn8.h`, `Ldn8.j`).
- [x] Trace LoginAuth coordinator branch selection: existing credential `Lsm8` → `Lcn8.D`, or provider lookup `Lohk0` → `Lqhk0.b` reading `Lozc1.i` (`lookupKeyAlias`); both return `Lyt2` through shared `Lzt2` store/alias namespace.
- [x] Record reauthentication guard: `Lmhk0.d` explicitly says reauthentication cannot register a lookup key.
- [ ] Find the exact provider result / `Lozc1.lookupKeyAlias` → account `Lel8.key_pair_alias` persistence assignment. Until found, shared wrapper/store/namespace is established but exact alias string equality across the two flows is not.
- [ ] Trace lookup-key challenge network endpoint, transport, caller result lifecycle and authentication registration/update flow.

## Android LoginAuth provider alias equality guard — 2026-11-26

- [x] Trace `Llli0.invokeSuspend` holding the selected `Lozc1` provider and returned `Lyt2`; confirm it compares `Lozc1.i` (`lookupKeyAlias`) with `Lyt2.a` before continuing. Provider lookup therefore validates exact alias equality within that provider branch.
- [ ] Trace the exact provider branch result to account preference/credential persistence (`Lel8.key_pair_alias` → `Lvg8.n`), if that transfer exists. Do not infer it from provider-branch equality or common `Lzt2` use.

## Android LoginAuth challenge HTTP routes and step-result contract — 2026-11-26

- [x] Correct the initial challenge-fetch route: Lb6p0.a parses Lqk00 from the successful response, using Lbu8 GET api/accounts/authorize or Lau8 POST api/accounts/authorize/native; Lnxc0 enum confirms GET/POST mapping.
- [x] Distinguish the separate api/first_party_authorize/next path: Lb6p0 stores it; Lf91.invokeSuspend later sets up a POST and decodes Lvi8 (step enum Lvl8 plus typed Ljl8 data).
- [x] Identify `Livk0` as concrete `Ljl8` subtype and resolve value continuity through `Lcgu.invokeSuspend` into the `Lvi8` payload and `Lti8` polymorphic serializer for `POST api/first_party_authorize/next` (`origin_page_type` plus `data`).

- [ ] Complete exact request body/header, Ktor auth-plugin and error/cancellation contracts for the initial account-authorize GET/native POST and later first-party next POST.
- [ ] Trace the exact Lozc1.lookupKeyAlias provider result to account Lel8.key_pair_alias persistence, and complete native signer/provider ownership.

## Android LoginAuth signed DEVICE_KEY proof submission and response-direction correction — 2026-11-26

- [x] Trace the exact signer success value in `Lcgu.invokeSuspend`: read `Lavb1.b`, cast to `Livk0`, and pass that same register/value to onboarding repository `a.j` as `Ljl8` with the lookup-key-authentication step.
- [x] Trace the repository/callback/network chain `a.j` → `Lk6p0` → `Lu0c.m` → `Lf91` for `api/first_party_authorize/next`.
- [x] Decode outgoing `Lvi8` body serialization: `Lf91` stores it in `Lfyc0.d`, installs `Lti8`, sets POST; `Lti8` emits `origin_page_type` and polymorphic `data`. The traced step value is `lookup_key_authentication`; `data` is the exact `Livk0` from the signer.
- [x] Correct DTO direction: `Lvi8` is request body; response is typed `Lyl8`, consumed through `b():Lql8`, `c():Lvl8`, `a():List`.
- [x] Decode the `Lyl8` sealed response discriminator, the root `type`/`payload`/`errors` envelope (verified across lookup-key, external URL and error serializers), the explicit 15 step-dispatch labels, and the lookup-key payload's nested `errors`/`deviceKeyChallenge` schema.
- [ ] Complete request headers, auth-plugin/first-party integrity, transport cancellation and error normalization for account-authorize and next-step calls.
- [ ] Trace provider lookup alias to account `Lel8.key_pair_alias` persistence and native auth-provider injection.

## Android LoginAuth next-response union and result/error/cancellation trace — 2026-11-27

- [x] Trace `Lam8.b` sealed serializer dispatch for the 15 explicit response `type` values and record the separate final `Lmiy` fallback serializer branch without generalizing all `Lvl8` values.
- [x] Verify the root `type`, `payload`, `errors` fields in generated serializers for lookup-key, external URL and error response variants.
- [x] Decode `lookup_key_authentication` payload `Levk0`: nested `errors` and `deviceKeyChallenge`; decode `Lqk00` `{type,purpose,data}` and `Lpk00` challenge data fields and types.
- [x] Decode `Lql8` property names/types and `Lml8` metadata item fields, nullable `field`, and `Lsl8` field enum values; trace `account_deactivated` decision and metadata consumer.
- [x] Distinguish `Lavb1` successful `Lyl8` response from `Luub1(Throwable)` failure and verify the explicit coroutine Job cancellation exception path.
- [x] Resolve `Lql8` generic types and generated nullability: `fieldErrors: Map<Lsl8,List<String>>?`, `formErrors: List<String>?`, `metadata: List<Lml8>?`; all four `Lql8` properties are optional nullable, and each metadata field is optional nullable.
- [x] Add and test the private pure `decodeAndroidLoginAuthErrors` helper for the source-proven nested `Lql8` error schema; six focused tests cover valid/nullable/malformed/enum/prototype-key behavior.
- [x] Add and test the private pure `decodeAndroidLoginAuthAboutYouPayload` helper for the source-traced `Lq4`/`Lp4` about_you payload (`errors?: Lql8?`, `fullName?: string` non-null when present); the combined response-schema suite has eight focused tests.
- [ ] Decode every remaining `Lyl8` step payload serializer; the lookup-key and `about_you` payloads are now mapped, but other branches remain untraced.
- [ ] Establish which discriminator values the final `Lmiy` fallback accepts; do not assume arbitrary unknown strings are valid.
- [ ] Complete `Luub1` auth-failure classification, the `La0d1.g` delegated branch, state cleanup and all relevant cancellation/error paths.
- [ ] Complete initial account-authorize and first-party next request headers, auth-plugin, first-party integrity, request context and provider-injection tracing.
- [ ] Trace `Lozc1.lookupKeyAlias` through account `Lel8.key_pair_alias` persistence and native auth-provider closure.

## Android LoginAuth email OTP and BodyIntegrityPlugin request-marker trace — 2026-11-27

- [x] Decode `email_otp_verification` subtype `Lm260` / payload `Ll260` generated names (`errors`, `emailVerificationMode`, `loginMethods`) and prove all three are optional nullable.
- [x] Decode `emailVerificationMode` enum `Lfer0`: `onboarding`, `post_onboarding_email_collection`, `password_reset`, `login_challenge`, `post_signup`, `post_registration`, `passwordless_login`, `passwordless_signup`, `unknown`.
- [x] Resolve `loginMethods` exact generic element type to polymorphic interface `Lmnk0` from consumer casts and identify four concrete DEX implementers; keep their wire discriminator/member serializers open.
- [x] Trace `Lf91` first-party next POST request attributes (`NoAuth`, `NoIntegrityCheck`, `BodyIntegrityCheck`) and `BodyIntegrityPlugin` `La4b` / `Lx3b` registration, `Lz3b` interceptor and injected `Lgeu0` provider path.
- [x] Decode exact Lmnk0 polymorphic discriminator mapping and per-variant generated serializers: password to Lfnk0, passwordless_otp to Link0, passkey to Lcnk0, and unknown to Llnk0; decode passkey challenge as optional nullable Lmds0 with required JsonObject passkeyRequestOptions and String mfaRequestId.
- [x] Add and test private decodeAndroidLoginAuthEmailOtpPayload for optional nullable errors, all nine Lfer0 modes, four Lmnk0 method values and the nested passkey challenge; five new tests cover the traced schema.
- [x] Prove the Lb6p0 LoginAuth Lmvc0 is cloned from the shared Lnnp0 client's Ltvc0 configuration maps, which already contain the DI-installed Lx3b / BodyIntegrityPlugin; Lf91 uses this derived client.
- [x] Resolve Lar31 host predicate: exact hosts or proper dot-boundary subdomains of api.openai.org, api.openai-staging.com, openai.com, chatgpt.com, chatgpt-staging.com; auth.openai.com is admitted and the matcher adds no path restriction.
- [x] Trace actual outgoing headers: success appends oai-android-play-integrity-token with Looa1.c; failure appends oai-android-play-integrity-token-failed with the normalized Lrnk1.j(Luub1) string through Ktor's validated HeadersBuilder.
- [x] Trace request-body buffering/continuation: Lgmj1.d/e rewraps the original bytes as Lper0 while preserving content type, length and headers metadata on both branches.
- [ ] Trace the broader independent NoAuth and NoIntegrityCheck effects across the other Ktor plugins/request paths; do not generalize from this BodyIntegrity interceptor.
- [ ] Finish Lgeu0 failure normalization/classification and any downstream handling of the failed-integrity header.
- [ ] Continue other `Lyl8` response payloads and establish the accepted final `Lmiy` fallback wire values; finish `Luub1` classification and `La0d1.g`.

## Android LoginAuth contact_verification payload and shared list item contract — 2026-11-27

- [x] Trace contact_verification outer subtype Liwt0, payload DTO Lhwt0, and generated serializer Lfwt0; record distinct root and payload errors locations.
- [x] Decode payload field names errors, phoneVerificationMode, and loginMethods; establish their optional/nullable serializer behavior.
- [x] Prove phoneVerificationMode is the shared Lfer0 enum used by email OTP, with the same nine exact serialized values.
- [x] Prove loginMethods is List<Lmnk0> from Lifp0.c → Lifp0.a(List) and its per-item check-cast, rather than infer from the raw Java List field.
- [x] Implement private pure decodeAndroidLoginAuthContactVerificationPayload using shared email/contact mode and Lmnk0 item validation.
- [x] Add three focused contact-verification tests for valid/passkey values, nullable/omitted fields and malformed nested data; shared helper suite now contains 16 tests.
- [ ] Decode remaining Lyl8 step-specific payloads and establish the actual accepted Lmiy fallback discriminator set.
- [ ] Complete Luub1 auth-failure classification, the La0d1.g delegated branch, state cleanup and all relevant cancellation/error paths.
## Android LoginAuth contact_verification payload and shared list item contract — 2026-11-27

- [x] Trace contact_verification outer subtype Liwt0, payload DTO Lhwt0, and generated serializer Lfwt0; record distinct root and payload errors locations.
- [x] Decode payload field names errors, phoneVerificationMode, and loginMethods; establish their optional/nullable serializer behavior.
- [x] Prove phoneVerificationMode is the shared Lfer0 enum used by email OTP, with the same nine exact serialized values.
- [x] Prove loginMethods is List<Lmnk0> from Lifp0.c → Lifp0.a(List) and its per-item check-cast, rather than infer from the raw Java List field.
- [x] Implement private pure decodeAndroidLoginAuthContactVerificationPayload using shared email/contact mode and Lmnk0 item validation.
- [x] Add three focused contact-verification tests for valid/passkey values, nullable/omitted fields and malformed nested data; shared helper suite now contains 16 tests.
- [ ] Decode remaining Lyl8 step-specific payloads and establish the actual accepted Lmiy fallback discriminator set.
- [ ] Complete Luub1 auth-failure classification, the La0d1.g delegated branch, state cleanup and all relevant cancellation/error paths.
## Android LoginAuth external_url payload — 2026-11-27

- [x] Trace external_url outer subtype Lar70, payload DTO Lzq70, and outer serializer Lvq70; keep root Lql8 errors separate from payload members.
- [x] Decode exact payload serializer Lxq70 descriptor: required JSON url field, with non-null String child serializer Ljb81.
- [x] Confirm Li8p0.g reads the payload URL into the separate url state key; do not infer URL navigation or allow-list policy from the DTO.
- [x] Implement private pure decodeAndroidLoginAuthExternalUrlPayload requiring an object with a required non-null string url; preserve extension members and do not impose URL parsing or non-empty assumptions.
- [x] Add two focused tests for the required string contract, malformed values, extension preservation and lack of URL-format assumptions; focused schema suite now has 18 tests.
- [ ] Decode remaining Lyl8 step payloads and establish the actual accepted Lmiy fallback discriminator set.
- [ ] Complete Luub1 auth-failure classification, the La0d1.g delegated branch, state cleanup and all relevant cancellation/error paths.
## Android LoginAuth token_exchange payload — 2026-11-27

- [x] Trace token_exchange outer subtype Luoa1 and payload DTO Ltoa1; keep root Lql8 errors separate.
- [x] Resolve Ltoa1 generated serializer: Lsoa1.serializer() returns Lroa1, whose descriptor has one required JSON property code and whose child serializer is non-null String Ljb81.
- [x] Implement private pure decodeAndroidLoginAuthTokenExchangePayload requiring an object with a present non-null string code; preserve extensions and avoid code-format/network assumptions.
- [x] Add two focused token-exchange tests for valid values, extension preservation, malformed types and no extra code-format constraints; focused schema suite now has 20 tests.
- [ ] Decode remaining Lyl8 step payloads and establish the actual accepted Lmiy fallback discriminator set.
- [ ] Complete Luub1 auth-failure classification, the La0d1.g delegated branch, state cleanup and all relevant cancellation/error paths.

## Android LoginAuth password-step payloads — 2026-11-28

- [x] Trace create_account_password outer subtype Lxxw, payload DTO Lwxw, and generated serializer Luxw.
- [x] Trace login_password outer subtype Ldpk0, payload DTO Lcpk0, and generated serializer Lapk0.
- [x] Confirm both payload serializers declare optional nullable errors:Lql8? and loginMethods:List<Lmnk0>?, including lazy child serializer paths Llno selector 28 and Lxia0 selector 22.
- [x] Implement private pure create_account_password and login_password payload validators by reusing the shared Lql8 error and Lmnk0 polymorphic method decoders.
- [x] Add four focused tests for both variants, optional/null fields, nested passkey payload, extension preservation and malformed values; focused helper suite now has 24 tests.
- [ ] Decode remaining workspace, MFA, push-auth and token-response payloads, and establish the exact accepted Lmiy fallback discriminator behavior.
- [ ] Complete Luub1 auth-failure classification, the La0d1.g delegated branch, state cleanup and relevant cancellation/error paths.


## Android LoginAuth login_passkey payload — 2026-11-28

- [x] Trace login_passkey outer subtype Lrok0, payload DTO Lqok0 and generated serializer Look0.
- [x] Confirm errors is optional nullable, passkeyChallengeOption is required non-null Lmds0, and fallbackAllowed is optional non-null Boolean.
- [x] Reuse the traced Lmds0 required JsonObject/String decoder for the nested passkey options.
- [x] Implement private pure decodeAndroidLoginAuthLoginPasskeyPayload and add three focused tests; LoginAuth schema helper suite now has 27 tests.
- [ ] Trace passkey ceremony/state transition and authorized assertion submission separately; the nested response DTO is not a passkey authentication implementation.


## Android LoginAuth workspace payload — 2026-11-28

- [x] Trace workspace outer subtype Lp5i1, payload DTO Lo5i1 and generated serializer Lm5i1.
- [x] Resolve workspaces lazy serializer Lmec1 selector 10 to ListSerializer(Lvn8.a), model Lxn8.
- [x] Confirm Lxn8 required nullable id/kind strings and optional non-null name/reauthentication strings using generated descriptor and child serializer evidence.
- [x] Implement private pure decodeAndroidLoginAuthWorkspacePayload and three focused tests; LoginAuth helper suite now has 30 focused tests.
- [ ] Trace reauthentication semantics and workspace selection state/action independently from the DTO string field.


## Subagent 3 audit follow-ups — 2026-11-28

- [ ] Run full `npm run check`, inspect the distribution archive and installed ESM/CommonJS smoke tests, and run CodeQL on current main after the LoginAuth envelope and syntax-fix commits; record the actual current-head test count and outcome. The prior verified 164-test run is not evidence for the new code.
- [ ] Complete LoginAuth payload coverage: trace the six opaque payload serializers and unresolved final fallback, then add source-backed validators/tests without guessing.
- [ ] Resolve Android native authentication-provider injection and the legitimate host secure-signer/storage boundary before implementing account login, DPoP signing or token refresh.
- [ ] Trace guest create/refresh and guest composer prepare/send HTTP routes independently of local SessionManager and LocationCookieInitializer paths.
- [ ] Implement authenticated conversation transport, send/response decoding, streaming/resume and history synchronization with authorized E2E verification.
- [ ] Implement real upload/download transfer, expiry, retries, cancellation and cleanup after the complete source contract is traced.
- [ ] Continue the remaining Android non-Work areas (projects, instructions, context, memory/personalization, images, video, voice/audio, search, tools, connectors and plugins) with source-backed workflows and host/account prerequisites.
- [ ] Add TypeScript ESM and CommonJS consumer compile fixtures; document/test cancellation against stalled non-cooperative async iterators.


## Android authenticated request policy validation parity — 2026-11-28

- [x] Reconcile the ChatJS bearer-header helper with the source-traced Android constructor's access-token and account-ID validation gates.
- [x] Reuse `isValidOAIBearerToken` and `isValidOAIAccountIdentifier` instead of accepting arbitrary strings.
- [x] Add malformed/empty token and account-ID regression tests.
- [ ] Implement the actual injected HTTP transport only after its request/response, redirect, timeout, cancellation and resource semantics are traced from the shipped client.
- [ ] Add transport integration tests and authorized account E2E only when the legitimate host credential, DPoP signer and integrity-provider prerequisites exist.
