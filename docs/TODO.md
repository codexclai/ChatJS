# ChatJS Task List

Use this as the single authoritative queue. Mark tasks complete only when evidence supports completion.

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
- [ ] Continue deeper DEX/Valdi analysis to identify exact request/response serializers, credential lifecycle, Sentinel/device-integrity provider behavior, SSE event state machines, upload signing/retry behavior, and the guest service. The authenticated Android direct-response client and collaborators are now located; schemas are incomplete.
- [ ] Continue reconstructing the Android integrity path's remaining unknowns: generated Valdi chat-requirements schema, app_attest_challenge semantics, public-build provider selection, cookie matching/expiry lifecycle, device UUID rotation/deletion, Valdi header validation/application, retryable-status gates/attempt ceilings, DeviceRateLimits schema/scope/retention, 300-second cooldown marker persistence, and cancellation edge cases. Preserve throttles; do not port SDK telemetry metadata.
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

ChatJS is one general-purpose Node.js module targeting the actual client-side behavior of official ChatGPT mobile and desktop (Work/Codex). The current runtime remains foundation-only; no real ChatGPT service connection has been implemented. Current package sources are `ChatGPT-Android.xapk` and the two sequential Windows installer pieces in ChatJS Project → Sources. The personal Library is outside the normal workflow and is not a routine source; access it only for a concrete need when useful and accessible. Any material used there belongs under `ChatJS Project` and must be authentic and necessary. The persistent ChatJS browser profile is the only reusable default profile; temporary sessions are disposable and must not replace it.

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

- [ ] Reconstruct the full Android authenticated DirectResponseClient request builder and exact route/method selection for `/backend-api/f/conversation` vs `/backend-api/conversation`; decode the serialized body and validate it with non-personal fixtures.
- [ ] Decode complete generated model-catalog and Sentinel chat-requirements request/response schemas. Preserve the separate requirements-integrity and device-integrity provider interfaces; never fake their output or bypass a required provider.
- [ ] Reconstruct Android direct-stream event decoding, `resume_conversation_token`, `x-conduit-token`, `/resume` request, offset/handoff state and retry limits.
- [ ] Reconstruct the attachment upload reservation/PUT/process sequence, signed-URL allow-list, cancellation, retry/expiry and size/type limits.
- [ ] Locate the Android guest service and the real anonymous create/refresh and composer prepare/send calls. Keep this independent from the authenticated ChatGPT service module and the LocationCookieInitializer route strings.
- [ ] Map the exact user-visible Windows ChatGPT Work Local UI call path to its local process/RPC and service network behavior. The packaged Codex app-server subprocess is a source finding, not a ChatJS dependency; ChatJS must not spawn `codex.exe` or a separate app-server process.
- [ ] Reconstruct the desktop `/wham` and Estuary client schemas and identify which UI features use them; do not equate every visible Work surface with the Codex app-server path.

## P1 — Android compiled-client reconstruction follow-up (2026-11-25)

- [ ] Decode Valdi bytecode/control flow for authenticated DirectResponseClient `prepare` and `send`, including exact selection between `/backend-api/f/conversation` and `/backend-api/conversation`, complete nested JSON schema, integrity body patch and serializer semantics. The field-name inventory is not a validated schema.
- [ ] Decode generated ModelCatalog and ChatRequirements response decoder bytecode to recover required/optional/null fields and nested challenge variants.
- [ ] Decode event decoder and direct resume request bytecode, including delta operations, entity references, `resume_conversation_token`, `stream_handoff`, `resume_sse_endpoint`, `x-conduit-token`, offsets and maximum handoff count.
- [ ] Decode upload reservation response, numeric file/count/total-size limits, URL expiry, retry/cancellation and accepted MIME/image constraints.

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
