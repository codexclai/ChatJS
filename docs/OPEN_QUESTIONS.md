# ChatJS Open Questions

Track unknowns and blockers. Close an item only after its answer and evidence are recorded.

## ChatGPT client implementation

A first-pass static Valdi module scan is documented in [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md). It identifies the client account/session services, bearer transport, model/chat-requirements APIs, conversation/SSE pipeline, upload clients, history, image-gallery, and Library modules. Exact method-level behavior remains to be traced.

- [ ] Which DEX/Valdi modules implement request construction, endpoint selection, transport, streaming, and response parsing?
- [ ] What is the exact client authentication/sign-in/session/refresh lifecycle, and how can it be implemented for a Node.js consumer while preserving account authorization and credential security?
- [ ] Which message/conversation/project/file/voice/image/search/tool payload schemas and state machines are present in the shipped clients?
- [ ] Which client components depend on Android/Windows APIs and which can be ported directly or shared in Node.js?
- [ ] What repeatable tests can verify request/response compatibility and behavior without embedding personal account/session material in fixtures or logs?

## General-purpose Node.js API

- [ ] Define the client configuration, connection lifecycle, session persistence, and event model for different consuming applications.
- [ ] Define streaming/backpressure, retries, timeouts, cancellation, concurrency, typed errors, and cleanup based on observed client behavior.
- [ ] Define portable conversation/thread/context/project APIs and explicit local persistence.
- [ ] Define how optional host adapters advertise capability availability and handle unsupported host facilities without making the core device-specific.

## Ownership and governance

- [ ] Confirm rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting contributors.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.

## Reference retention

- [ ] Android archive is retained in personal Library and Project Sources are intentionally empty; no re-upload is required.
- [ ] Windows extracted-payload archive work is deferred by owner instruction. Current Library item is metadata-only; the remote archive reported in the prior chat is not currently reverified. Resume only if asked.

Every open question should map to an actionable TODO and identify the evidence needed. Never silently turn an unknown into an assumption.

## Current Android Sentinel and device-integrity questions

The 2026-11-24 scan of ChatGPT Android 1.2026.321 found distinct requirements-integrity and device-integrity provider interfaces, plus a native Google Play Integrity implementation. The following are still open; do not replace them with assumptions.

- [ ] What is the exact request/response JSON schema for /backend-api/sentinel/chat-requirements, including the token, Turnstile, proof-of-work and app_attest_challenge fields?
- [ ] What does app_attest_challenge mean in this Android build, and is it consumed by a provider other than the native Play Integrity path?
- [ ] How does the server validate the second Standard Integrity token's request hash (SHA-256 over canonical account_id/conversation_id/device_id/parent_message_id JSON), and what is its binding/lifetime relative to the conversation request?
- [ ] Why does the inspected native implementation require package ID com.openai.chatgpt.internal while the supplied XAPK manifest is com.openai.chatgpt, and is the provider selected or callable in the public app build?
- [ ] Why does the internal native helper's User-Agent identify ChatGPT 1.2026.209 (build 2620909) while this XAPK is 1.2026.321 (version code 2632129)?
- [ ] What are the exact JSON body fields/values and status/error behavior for /backend-api/playintegrity, including the bot_token, play_integrity_token and chat_requirement_token values seen in the worker?
- [ ] The cookie name must end in _playintegrity and it must be Secure, unexpired, first-party-domain scoped, and have a backend API path accepted by the native helper. What exact cookie name, expiry policy, rotation and deletion behavior are used? The inspected native response bridge returns bodyPatchJson: null.
- [ ] What are the precise validation and merge rules for bodyPatchJson and returned openai-sentinel-* headers before the conversation request?
- [ ] The native Android helper uses UUID.randomUUID() for device_id and persists it in SharedPreferences; what is its lifetime, rotation/reset/deletion policy, scope, and which requests require it?
- [ ] Which Windows/desktop host provider, if any, supplies equivalent genuine integrity behavior? Do not infer equivalence from the Android path.
- [ ] How should ChatJS expose unsupported platform, missing Play Services, rate limiting, retry/cooldown, expiration, cancellation and integrity failure without bypassing a required account check?

## Standard Integrity provider details now observed

The internal Android helper calls Google Play Standard Integrity provider preparation (prepareIntegrityToken / warm-up) and requestExpressIntegrityToken, each with a 30-second wait. It retries once after its provider-invalid error path by preparing a new provider. The following remain open:

- [ ] What is the complete OpenAI PlayIntegrityTokenGenerator retry/cooldown policy, beyond the observed provider refresh on one invalid-provider status?
- [ ] Which error codes trigger token retry, initialization retry, cooldown, or terminal failure in the OpenAI wrapper, and what are the exact backoff ceilings?
- [ ] What public Android build/provider selection path, if any, supplies the same first-party provider without the internal package guard?

## Integrity SDK retry and local cooldown questions

The current DEX trace observes a 300-second default local cooldown for the TOO_MANY_REQUESTS path, a static retryable-status candidate list, and a DeviceRateLimits data store. It does not reconstruct the whole retry machine.

- [ ] What is the exact symbolic meaning of each candidate status (-19, -18, -12, 0, -100, -8, -9) in the OpenAI wrapper, and which additional conditions/feature gates change retry eligibility?
- [ ] What do the additional branches (-15 and -14, among others) in the token coroutine mean? Which errors reprepare the provider, retry the token, enter cooldown, or terminate?
- [ ] What are the exact maximum attempts, delays, jitter, backoff ceilings and reset conditions? The current scan does not prove these.
- [ ] Is the 300-second local cooldown based on a monotonic or wall clock, and when/how is its marker cleared?
- [ ] Does the local cooldown marker persist across process restart? The separate DeviceRateLimits data store exists, but its relation to the in-memory/local cooldown helper is not yet clear.
- [ ] What fields, scope (device/account/provider), expiry and retention rules are represented in DeviceRateLimits? Which code paths record and discard its entries?
- [ ] Which retry counters and provider/version fields are instrumentation only? Do not port SDK metrics or export diagnostic metadata under ChatJS's zero-telemetry rule.


## Anonymous guest session and Work execution surfaces — 2026-11-24

- [ ] Reconstruct the exact Android anonymous-session create/refresh request and response (route, body, headers/cookies/tokens), including its mapping to the Unauthenticated/AnonymousSession/LoggedInSession state machine. The RootViewModel first tries the separate install-referrer AccountSelector login Los8.f → LoginGraphManager, then calls the initial anonymous fallback Lgs31.b → Lau31.G. G acquires the Lmgo0 coroutine mutex, runs Llzx.n/Lwk8 local eligibility logic and enters Lau31.E. Correction: Lau31.h/Lof70 is Statsig/experimentation (Lmx71/Lbu70), and Lau31.F invokes its G method for feature evaluation, not auth/session state. The Lis31 refresh-unauthenticated-session path reads Llzx.u local state and calls Lau31.u/E/R local transition logic; no HTTP request is visible. The separate Lau31.n → Ldt31 → Lsk8/Ld7x path is credential-backed AuthSession/DPoP token work, not established guest creation. The concrete guest HTTP create/refresh request remains unknown; global /backend-anon configuration is not the endpoint.
- [ ] Determine guest session ID generation, persistence/expiry, replacement/retirement and cleanup triggers. Lxzp0 builds sessions/guest-* using two opaque session-related strings and a hyphen; the strings sources, semantics and entropy are unknown. DEX evidence also shows retired-session cleanup but not the full retention policy.
- [ ] Trace the actual composition/caller of the AnonymousSessionLoading Compose method Losk1.a and determine whether it is reached from the root unauthenticated-session flow. A direct DEX invocation/callback to SessionManager was not found. The "Continue as Guest" string is Shop plugin UI (Li230), not a ChatGPT guest CTA, and must not be used as a trace target.
- [x] Attribute the observed /backend-anon/f/conversation* endpoint constants to their traced caller: they are consumed by LocationCookieInitializer during locationPermissionCookieSettings processing, not proven guest composer message routes.
- [ ] Trace the actual Android anonymous conversation composer/send client independently; identify its prepare/send route, exact request/response bodies, guest headers/cookies, ordering, SSE behavior and whether it uses a distinct guest endpoint family.
- [ ] Identify guest-session entitlement/usage restrictions, one-active-conversation policy, persistence boundaries and sign-in conversion prompts from actual client/service behavior.
- [ ] Determine whether Windows desktop Work has a supported signed-out/guest mode. Do not infer one from generic browser transport markers.
- [ ] Reconstruct Windows desktop Work Local's app/native-host request lifecycle and its local filesystem/process/approval boundaries without Codex CLI/app-server dependency.
- [ ] Reconstruct Android Work Cloud's task/session/progress/artifact/control protocol and its account/guest eligibility rules.
- [ ] Determine which Codex CLI workflows are materially distinct from desktop Work and therefore merit a separately exposed ChatJS capability.


- [ ] Trace who populates Lzlh1 / the Lylh1 welcome-presentation preference (including the source of Lnlh1.guestCtaCopy), whether it is remotely delivered or locally seeded, and the exact eligibility/cache/update conditions. The currently inspected manager path is PreferenceStore-backed and has no visible HTTP request.
- [ ] Trace which branch after the now-observed welcome CTA action-29 → Ltu10 → Lqik0 → Lnik0 login-child coordinator leads to anonymous-session startup, if any. The current branch reads local Lks31 state through Llzx.t and processes Lir31 login-flow events through Lau31.i/Lxs31 under the Lmgo0 mutex; it does not prove a call to the separate Lgs31.b → Lau31.G initial guest fallback or a guest-create request.

- [ ] Trace the actual Lt891 event producer(s) and callback wiring into the La991.G instance: Lq20.invoke constructs Lt891(5); Ldo1.invoke selector case 18 can construct Lt891(6) via a ConversationSidebar-hosted Lp1w callback. The La991.G branch for Lt891 launches Lmuz0 label 9 → Lgs31.b → Lau31.G. The W891.a equality branch instead forwards Lw4h0.getValue() to Lcq41.e and returns. Determine event/payload semantics and whether either callback actually reaches this coordinator; the welcome CTA action-29 path remains unconnected.

- [ ] Trace the implementation of the parent callbacks located above the two `Lt891` emitters: `Llal1.h` callers (`Lj20`, `Lss`, `Lt07`, `Ly641`) and the WebView `Ljpc.invoke` callback supplied to `Lej10.c`; and the ConversationSidebar `Le2w.c` → `Lx0w`/`Lm1w` → `Le2w.j` callback passed into `Le2w.e`. Establish the meaning of payloads 5 and 6 and whether either handler can reach `La991.G`. Static scans found no direct method-id or method-handle reference to `La991.G` outside its definition, but do not rule out dynamically supplied behavior.

- [ ] Determine whether the `Lej10.c` WebView callback, the `Llal1.h`/SettingsWorkspaceListItem callback, or the `Le2w.c` ConversationSidebar callback captures a `La991` receiver through the generic `Lv6a.H(Louf0)` virtual-dispatch bridge. The known `Le6` bridge is created in Composer / FreeThinkingGaugeNuxHost, not at the observed WebView or ConversationSidebar callback sites; no same-instance receiver binding is established.

- [ ] Trace the Statsig SDK refresh/acquisition path behind Lmx71 / Lix71 / Lzw71: identify the actual config download route/payload, when welcome_* parameters are refreshed, cache expiry/persistence and offline/default precedence. Android declares the named welcome_* keys in Lfs10 and evaluates them through Lxr10.h; current DEX findings expose app-facing cached parameter evaluation but not the remote refresh contract. Do not port Statsig telemetry/exposure logging into ChatJS.
- [ ] Identify the upstream producer and meaning of the conversation coordinator's `Lkmk0` event and its `a`/`b` payload; `Ljqk0.G` launches `Lps30` label 16 for a guarded `MessageNotFoundException` / no-messages-all-unsupported path and calls `Lgs31.b`. Resolve the numeric `Llnp0` reason mapping and whether this local session restart is followed by a separate network guest-create request.

- [ ] Resolve the caller-supplied cache age and offline/default precedence for Statsig persisted initialize responses. The initialize route/body and `ondiskvaluecache` / optional per-user cache restoration are identified; seven-day fallback-host expiry is not response-cache TTL.
- [ ] Determine which fields in the Statsig initialize user/metadata are strictly necessary to obtain Android welcome configuration, and whether they can be fetched without reproducing user analytics/exposures. Do not port SDK telemetry.
- [ ] Trace the parent `Lkmk0` producer, meaning of integer `a`, route/context meaning of `b`, and resulting `Llnp0` reason semantics. The Compose-to-`Ljqk0.G` dispatch is now mapped; what follows the local `Lgs31.b` transition remains unknown.

## Android authenticated conversation and guest boundary — 2026-11-25

- [ ] Reconstruct the complete request body builder/serializer and method-to-route binding in `ChatGPTDirectResponseClient.js`; the present module scan identifies method/field names and route constants but not a complete validated payload schema.
- [ ] Reconstruct the full generated model-catalog and Sentinel chat-requirements challenge schemas, including exact response decoding and provider-selection logic.
- [ ] Trace how the direct client constructs and validates Sentinel headers, how its requirements-integrity provider obtains the required token, and how the separate device-integrity provider is selected on public Android builds. Never fabricate either result.
- [ ] Decode the full direct SSE event schema and handoff/resume state, including the source of `resume_conversation_token`, the `x-conduit-token` header, offset semantics, and the real maximum handoff count.
- [ ] Reconstruct file upload reservation, signed destination, PUT headers/body, processing request, cancellation/retry/expiry, and exact attachment limits before implementing uploads.
- [ ] Find the separate Android guest service. All 111 decompressed Valdi modules had no `/backend-anon` route string; the currently observed DEX route constants remain in LocationCookieInitializer. Identify the actual guest create/refresh and guest composer prepare/send owners independently.

## Windows desktop local execution boundary — 2026-11-25

- [ ] Map the exact user-visible ChatGPT Work Local UI path in the supplied Windows app to its process/RPC and ChatGPT network calls. Do not assume all desktop Work UI is the local Codex app-server path.
- [ ] Determine which local execution components must be reimplemented inside ChatJS to avoid spawning `codex.exe` or a separate app-server process, while retaining genuine authorization, sandbox/approval semantics, and optional host capability boundaries.
- [ ] Reconstruct the desktop `/wham` and Estuary service-client request/response schemas and auth lifecycle; current evidence only identifies auth-attachment path families, not Work payloads.
- [ ] Verify the Windows signed-out/guest state through the actual client path; it remains unknown.

## 2026-11-25 — Direct-response method-body and schema reconstruction follow-up

- [ ] Decode compiled `ChatGPTDirectResponseClient.prepare/send` method bodies and route-selection branch. A deeper string-pool pass inventories conversation/message/context keys, but nesting, requiredness, exact route condition and serialized order remain unknown.
- [ ] Decode generated model-catalog and chat-requirements decoder instruction graphs to recover complete nested schemas, nullable/optional behavior and all challenge variants.
- [ ] Decode event decoder delta-operation and handoff logic, including exact event variants, resume body/header mapping, eventOffset/offset semantics, and maximum direct-stream handoff count.
- [ ] Recover numeric `MAX_PICKED_FILES`, `MAX_PICKED_FILE_BYTES`, and `MAX_PICKED_TOTAL_BYTES` constants plus upload reservation response layout, URL expiry and retry policy.

## Codex CLI client family — 2026-11-25

- [ ] Map the full ChatGPT Codex session creation/resume lifecycle: where thread/session IDs originate, how they persist, how resume/fork/compact operations affect request metadata, and what happens after auth/account changes.
- [ ] Reconstruct the complete ChatGPT Codex Responses request builder, all feature/model gates and serialized item variants from the pinned source. Separate stable request shape from optional fields and ensure the field-order/routing behavior is preserved.
- [ ] Trace how the Codex core chooses HTTP SSE versus Responses WebSocket, connection reuse, auth refresh during active streams, fallback and recovery semantics, and cancellation/idle-timeout behavior.
- [ ] Reconstruct every Responses event and error variant required for parity, including tool/function handoffs, reasoning, usage, partial output, incomplete/interrupted responses, refusal/content-filter handling, metadata and unknown-event behavior.
- [ ] Trace tool lifecycle and approvals end to end: tool-call item → argument streaming → dispatch → approval/decline → result attachment → next Responses request. Identify which tools are native Codex client features and which require optional host adapters.
- [ ] Reconstruct local coding execution semantics without upstream app-server: workspace/cwd policy, file read/write/diff/patch, command process lifecycle, process-tree cancellation, output caps, sandboxing, approvals, Git changes, artifact generation, collaboration and MCP behavior. Keep host-only operations optional and explicit.
- [ ] Map the JSONL event contract to a ChatJS typed async event API without assuming JSONL itself must be the only public interface. Preserve thread/turn/item ordering, partial updates and terminal states.
- [ ] Confirm the exact Codex ChatGPT auth refresh/reload and account-switch semantics; keep credential persistence under explicit ChatJS storage policy and never reuse credentials from an unrelated process.
- [ ] Keep the Codex credential-less state separate from Android/ChatGPT accountless guest mode. The Codex source pass does not establish guest-session creation or guest conversation requests.
- [ ] Confirm all telemetry, OpenTelemetry, feedback, profiling and remote-diagnostic code paths are excluded from any native ChatJS adaptation.

## Codex CLI local execution and tool security — 2026-11-25

- [ ] Identify the minimal native Node.js process/PTY lifecycle required for Codex CLI parity, including interactive vs one-shot execution, process IDs, stdin polling, output streaming/truncation, timeout, cancellation and process-tree cleanup.
- [ ] Reconstruct the command workdir/path-URI resolver, shell detection/selection, environment selection and local-vs-remote executor contracts. Do not assume a local path applies to a remote host or vice versa.
- [ ] Map all approval states and policy inputs, including session-scoped approval cache keys, fresh-human-approval requirements, explicit denial and forbidden states. Verify which Codex policy/config concepts are user-facing and which are internal.
- [ ] Reconstruct sandbox types, filesystem read/write policies, network restrictions/proxy/credential masking, Windows sandbox selection, extra permissions and policy escalation paths before implementing local command execution.
- [ ] Trace command execution events and terminal session IDs across `exec_command` and `write_stdin`; ensure the future ChatJS stream can report true progress without unbounded buffering or fake events.
- [ ] Map the `apply_patch` fast path, parser/validation, diff tracking, permission evaluation, atomicity/failure semantics and file-change events.
- [ ] Trace MCP server discovery/configuration, tool schema lifecycle, readiness, namespacing, user approval, dispatch, result handling and cancellation. Decide which MCP capabilities are required for parity and which are optional extensions.
- [ ] Preserve separation between Codex CLI local execution, Windows ChatGPT Work Local, and Android ChatGPT Work Cloud. Do not infer a shared security or workspace contract without explicit source evidence.

## Codex permissions, outbound network and collaboration — 2026-11-25

- [ ] Reconstruct execution-scoped network-proxy setup and outbound-request attribution, including execution IDs, environment ownership, ambiguous attribution fail-closed rules, protocol/host/port keys and cleanup.
- [ ] Reconstruct exact network review rules: AskForApproval policy, managed permission profile gate, once/session/deny semantics, persisted policy amendments, session allow/deny caches, serialized prompts, cancellation and deferred completion outcomes.
- [ ] Determine exact local/remote executor network-proxy requirements, proxy capability negotiation and credential-masking gates. Keep command egress approval distinct from ChatJS's own explicit ChatGPT API connection.
- [ ] Reconstruct `request_permissions` schemas and response states, filesystem read/write permission variants, symbolic roots, relative path resolution, selected executor/path conventions, user approval and denial/revocation behavior.
- [ ] Determine which Codex deferred tools are exposed through `tool_search`, how definitions are loaded, when the lazy local search index is invalidated/rebuilt, exact rank/limit semantics, and how per-step tool/router policies suppress results.
- [ ] Map MultiAgentV2 feature/config gates, maximum agent counts, default roles and models, child-thread creation/resume/retirement, persistence, concurrency and event ordering.
- [ ] Reconstruct the full collaboration lifecycle: spawn fork modes, queue-only messages, trigger-turn followups, mailbox/steering wait outcomes, list filtering/statuses and target resolution/interrupt semantics.
- [ ] Distinguish collaboration features from command/process execution and MCP tools. Exclude all analytics and telemetry attached to these paths.

## Codex control tools, user interaction and extensions — 2026-11-25

- [ ] Reconstruct complete plan-state and `update_plan` event contracts, including Plan-mode rejection and CLI JSONL projection.
- [ ] Trace context-window accounting and `get_context_remaining` behavior across compaction/model changes; distinguish authoritative runtime status from estimates.
- [ ] Determine exact `clock.curr_time` timezone/format and the host time-provider semantics used by each Codex path.
- [ ] Reconstruct execution-environment startup selection and `wait_for_environment` state transitions/timeouts/cancellation. Do not launch an environment simply because a model guessed an ID.
- [ ] Reconstruct synchronous `request_user_input` question/answer schema, blocking behavior, mode restrictions and verified-answer retention; identify what ChatJS must expose as a host interaction adapter.
- [ ] Reconstruct asynchronous user question/message events and how later user replies re-enter the thread; preserve ordering and cancellation without pretending the host showed the content.
- [ ] Reconstruct MCP resource list/templates/read schemas, server catalog/authorization rules, environment scoping, URI handling, errors and resource result limits.
- [ ] Trace dynamic-tool source registration/refresh, current-thread lifecycle, namespace/schema validation, deferred/direct exposure, response callback and cancellation. It must not be treated as another model provider or a fake local tool.
- [ ] Map catalog-sourced plugin/connector discovery and install flow, exact elicitation request, consent outcomes, verification, MCP refresh, connector merge and client availability gates. Determine support from the current full-source-backed product charter and owner direction; preserve explicit consent, security, category-independent feature coverage, and no-unsolicited-network rules.
- [ ] Confirm all upstream analytics/tracking attached to tool or install paths are excluded.

## Android QuickJS method disassembly — 2026-11-25

- [ ] Obtain a complete source checkout of the pinned Valdi QuickJS fork and its exact supporting source/header files; record repository commit, source hashes, compile flags, architecture and dependencies.
- [ ] Verify whether the Android release's native QuickJS/Valdi build corresponds to the pinned source revision or whether bytecode/build options differ. The native library's QuickJS/Valdi strings are only corroborating static evidence.
- [ ] Build a temporary analysis-only QuickJS utility with the Valdi fork. Patch the deserializer to call `js_dump_function_bytecode` after `JS_ReadFunctionTag` has fully populated the constant pool; do not rely on `DUMP_BYTECODE` alone, whose ordinary call-site is in compilation.
- [ ] Validate the temporary dumper on a known QuickJS bytecode fixture and a copied Valdi module entry; confirm it reads the `0x0100C634` wrapped payload after unwrapping and does not execute application functions.
- [ ] Disassemble only allow-listed methods, starting with `ChatGPTDirectResponseClient.prepare/send`, then model/Sentinel decoders, event/resume and upload methods; record complete call graphs and schema evidence.
- [ ] Check whether the Android module retains debug filenames, line tables and sources for selected functions. Missing debug source must not be mistaken for missing opcodes or incomplete control flow.

## Codex Responses WebSocket v2 — 2026-11-25

- [ ] Reconstruct exact provider/client feature gates and compatibility-header list for the pinned Codex V2 handshake; distinguish protocol-required headers from optional routing, metrics and host-integrity headers.
- [ ] Trace connection-key equality, auth-owner/revision changes, socket reuse and teardown between turn-scoped ModelClientSession instances. Do not leak turn-state/routing affinity across turns.
- [ ] Reconstruct complete Responses WebSocket V2 handshake response headers and their effect: max message size, reasoning inclusion, server model, models ETag and codex turn-state affinity.
- [ ] Complete the incremental-continuation comparator and tests for every non-input property; understand server output-item baseline, internal metadata equality and fallback to a full request.
- [ ] Reconstruct warmup activation, timeout/budget interactions, retry when it fails, untraced warmup response replay and consumer-facing pending/readiness state. Keep ChatJS prewarm explicit/opt-in and never network on import/construct.
- [ ] Reconstruct 1 MiB frame splitting, read-ahead, bounded event-channel backpressure and response idle timeout/maximum-message enforcement without copying implementation limits without performance tests.
- [ ] Reconstruct response.interrupt send/ack/error semantics and its interaction with AbortSignal, draining and partial output retention.
- [ ] Enumerate the exact fallback/retry policy, including HTTP 426, retryable wrapped WebSocket error codes, Retry-After, max retry counts, session-level HTTP lockout and the restricted UnboundedConnectionRetries feature branch.
