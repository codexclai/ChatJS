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
- [x] Why does the inspected native implementation require package ID com.openai.chatgpt.internal while the supplied XAPK manifest is com.openai.chatgpt? The packaged factory path reaches com.openai.valdi.integrity.a.run, which calls Context.getPackageName() and throws an internal-debug-app-only DeviceIntegrityPreparationException before the network exchange when the package differs. The native factory is present, but this worker cannot run for the supplied public package.
- [ ] Why does the internal native helper's User-Agent identify ChatGPT 1.2026.209 (build 2620909) while this XAPK is 1.2026.321 (version code 2632129)?
- [x] Reconstruct the internal DEX request shape for /backend-api/playintegrity: JSON keys package_name, nonce, integrity_token and device_id; internal package ID; first token bound to a 256-byte random nonce; and separate chat-requirements / Standard Integrity request-hash flow. The final callback places the serialized bot_token/play_integrity_token/chat_requirement_token bundle in X-Sentinel-Payload and returns bodyPatchJson=null. [ ] Verify server-side token semantics, status behavior and acceptance only in an authorized internal build.
- [x] Trace the native cookie acceptance constraints: cookie name suffix _playintegrity, non-empty value, Secure, unexpired, trusted first-party domain and endpoint-path allowlist; Set-Cookie is stored in CookieManager and cancellation disconnects the request. [ ] Resolve exact cookie name, expiry, rotation, deletion and process-restart behavior.
- [ ] What are the precise validation and merge rules for bodyPatchJson and returned openai-sentinel-* headers before the conversation request?
- [ ] The native Android helper uses UUID.randomUUID() for device_id and persists it in SharedPreferences; what is its lifetime, rotation/reset/deletion policy, scope, and which requests require it?
- [ ] Which Windows/desktop host provider, if any, supplies equivalent genuine integrity behavior? Do not infer equivalence from the Android path.
- [ ] How should ChatJS expose unsupported platform, missing Play Services, rate limiting, retry/cooldown, expiration, cancellation and integrity failure without bypassing a required account check?

## Standard Integrity provider details now observed

The internal Android helper calls Google Play Standard Integrity provider preparation (prepareIntegrityToken / warm-up) and requestExpressIntegrityToken, each with a 30-second wait. It retries once after its provider-invalid error path by preparing a new provider. The following remain open:

- [ ] What is the complete OpenAI PlayIntegrityTokenGenerator retry/cooldown policy, beyond the observed provider refresh on one invalid-provider status?
- [ ] Which error codes trigger token retry, initialization retry, cooldown, or terminal failure in the OpenAI wrapper, and what are the exact backoff ceilings?
- [ ] Is there a separate first-party provider path for the public ChatGPT Android package in another independently supplied build/version? None was identified in this XAPK; do not bypass the observed internal-only package gate.

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

- [x] Reconstruct the compiled Android DirectResponseClient request builder and route binding: the selected user-message body, fields/conditionals, attachment mapping, and authenticated send versus separate parent lookup versus requirements request are method-level traced. [ ] Port a validated Node.js serializer and test against non-personal fixtures.
- [x] Reconstruct the generated ModelCatalog and ChatRequirements named-field schemas, required/optional fields, array element decoders, null handling and pass-through properties. [ ] Trace extra fields and challenge descriptor consumers/providers.

The generated request descriptors and catalog/requirements response decoders now have a private, tested, side-effect-free ChatJS helper (`src/chatgpt/android-conversation-api-schema.cjs`). This closes only the Node.js schema/helper slice. Challenge-specific consumer/provider schemas, authorized request execution, and an available public-build device-integrity provider remain open.
- [x] Trace direct-client challenge normalization, fail-closed requirements-token behavior, Valdi >= 11 native adapter selection and output validation. Also trace the bundled native factory/service construction and exact internal-package preflight; the supplied public package is rejected before the HTTP exchange. [ ] Check for a distinct public-build provider in another authentic source.
- [x] Decode core direct SSE events, delta schema/operations, resume-token/handoff state, eventOffset, continuation validation, x-conduit-token mapping, /resume body/path/header, and three-handoff cap. Decode the top-level dispatcher and response processor, including [DONE]/message_stream_complete completion, nonterminal handoff, assistant/reasoning updates, DIL/entity-reference deduplication, render batching, final flush and cancellation. [ ] Complete any remaining event variants, history sync/recovery, and authorized server tests.
- [x] Reconstruct upload reservation, response validation, Estuary multipart and signed-storage PUT variants, process-upload request, trusted host constraints and picker limits. [ ] Resolve URL expiry/signature semantics, retries/cancellation, download, and file-indexing behavior.
- [ ] Find the separate Android guest service. All 111 decompressed Valdi modules had no `/backend-anon` route string; the currently observed DEX route constants remain in LocationCookieInitializer. Identify the actual guest create/refresh and guest composer prepare/send owners independently.

## Windows desktop local execution boundary — 2026-11-25

- [ ] Map the exact user-visible ChatGPT Work Local UI path in the supplied Windows app to its process/RPC and ChatGPT network calls. Do not assume all desktop Work UI is the local Codex app-server path.
- [ ] Determine which local execution components must be reimplemented inside ChatJS to avoid spawning `codex.exe` or a separate app-server process, while retaining genuine authorization, sandbox/approval semantics, and optional host capability boundaries.
- [ ] Reconstruct the desktop `/wham` and Estuary service-client request/response schemas and auth lifecycle; current evidence only identifies auth-attachment path families, not Work payloads.
- [ ] Verify the Windows signed-out/guest state through the actual client path; it remains unknown.

## 2026-11-25 — Direct-response method-body and schema reconstruction follow-up

- [x] Decode ChatGPTDirectResponseClient send/prepare method bodies, selected-user-message flow, attachment mapping, integrity-provider preparation, JSON body, and route selection. Direct POST is /backend-api/f/conversation; separate parent lookup is GET /backend-api/conversation/{encodedConversationId}; requirements are POST /backend-api/sentinel/chat-requirements with {}. Full findings are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.
- [x] Decode generated ModelCatalog/ChatRequirements named-field schemas and null handling. Exact typed fields are recorded in ANDROID_CLIENT_PROTOCOL_FINDINGS.md. [ ] Trace pass-through model/preset/version properties and challenge-specific payloads into their consumers; determine when each challenge type is emitted and required in public app behavior.
- [x] Decode event message/completion/resume-token/stream-handoff and delta-operation state machine, including c/o/p/v fields, supported operations, JSON-pointer escaping, unsafe-path rejection, 2,048-character and 64-segment limits, and three-handoff ceiling.
- [x] Recover the direct resume path/body/header builder and its offset/token mapping from ChatGPTStreamingContracts; confirm it is used only for direct streams and capped at three handoffs. [ ] Verify live service acceptance and restart/recovery behavior.
- [x] Recover MAX_PICKED_FILES=10, MAX_PICKED_FILE_BYTES=20 MiB, MAX_PICKED_TOTAL_BYTES=25 MiB, accepted document/image types, file-name/MIME validation, upload destinations, request bodies and storage headers. [ ] Resolve URL expiry, retry/cancellation and end-to-end upload behavior.
- [x] Trace the native ChatGPTDeviceIntegrityProvider call path through the packaged module factory and DeviceIntegrityService implementation. The worker explicitly rejects the supplied public package because it requires com.openai.chatgpt.internal; this is an internal/debug-build-only path and fails before HTTP for the public XAPK.

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


## Android authentication validation predicates and session lifecycle — 2026-11-25

- [x] Identify the compiled Android authentication controller, native credential bridge, credential-store variants, request-credential recovery component, bearer API service, account-check client and validation functions in `oai_authentication_session.valdimodule`.
- [x] Port the observed bearer-token, account-identifier, HTTP header-name/value and trusted API-origin predicates as private pure ChatJS helpers, with deterministic valid/invalid cases.
- [x] Disassemble all validation predicates and regex flags; reconstruct both origin-relative path gates. These pure validators remain unwired to live transport.
- [x] Decode the GET account-check descriptor and full generated AccountCheckResponse/Record/Account schema, including object-map semantics, nested nullability, and `account_ordering: string[]`.
- [ ] Reconstruct OAIAuthenticationController's operation-generation, state transitions, foreground/background gating, cancellation ordering, restore, revalidation, account selection and sign-out flows.
- [x] Decode the Valdi-side OAINativeCredential wrapper method names, result/cancel task shape, callback registrations, returned session/token validation, service method/failure enums and controller failure mapping.
- [ ] Reconstruct the native CompilerIntrinsics client implementation and exact signIn/restore/accessToken/clear payloads, callback invocation guarantees (especially onCleared), native session ID ownership, OS authentication UI and secure storage. Do not infer these from type-only modules or simulate success.
- [x] Decode OAICredentialStore wrapper serialization, version-1 record schema, namespace/key/user metadata, enabled-encryption PersistentStore configuration, memory/unavailable selection, foreground admission and serialized credential-operation queue. Implemented only as a pure private record codec.
- [ ] Reconstruct the underlying PersistentStore encryption/key lifecycle, OS-keystore ownership, key derivation/rotation, atomicity/crash recovery, durable clear semantics, cross-process coordination and the host adapter required for portable ChatJS. Never use plaintext durable storage.
- [x] Decode OAIRequestCredential's generated ErrorEnvelope schema, exact token_revoked/token_invalidated/require_sso_login/token_expired classification order, reportRevoked/accountId/SSO flag behavior and caller-gated accessToken renewal. Implemented only as a private pure classifier/plan; no service calls or retries.
- [x] Trace OAIRequestCredential context into native clear/accessToken calls and OAIBearerAPIService caller: exact 401 eligibility, explicit renewal gate, same-request one-shot replay with further renewal disabled, and original-response fallback are method-decoded. The pure request/recovery policy helper is tested only.
- [ ] Reconstruct actual native clear effects, renewable token payload/DPoP, provider implementations, SSO UI and authorized host adapter; no credential invalidation, renewal or HTTP transport is implemented.
- [x] Trace the Android DEX DPoP key repository, AndroidKeyStore/EC signing path, ES256 dpop+jwt serialization constants, Ktor `WWW-Authenticate` challenge scheme parsing, DPoP-vs-Bearer authentication-provider selection, separate DPoP proof plugin/provider and OAuth refresh/error call graph. Corrected attribution: literal `X-Nonce` is only found in a RevenueCat request-header builder, not the ChatGPT DPoP path. Source findings are documented; no runtime support exists.
- [ ] Complete the native provider closure/host injection path, exact DPoP proof claims and nonce lifecycle, OAuth non-success response/error normalization and remaining bounded retry policy. The request side and successful response are decoded: POST `https://auth.openai.com/oauth/token`, JSON `clientId`/`refreshToken`/default `grantType=refresh_token`; success DTO `Llkq0` with seven fields converts through `Ly4b1.h` to credential-bound internal `Lvg8`. Design a legitimate non-exportable host signer; no PEM/file fallback or Android key export.

## Android authentication method reconstruction — 2026-11-25

**Resolved from method-level bytecode:** bearer token, account identifier, header name and trusted HTTPS origin regexes are case-insensitive; the header control-character regex is not. `isSafeOriginRelativePath` requires `/` and rejects `//`, backslashes, `://` and ASCII controls. The service wrapper also rejects spaces and `#`. Account-check is GET `/backend-api/accounts/check/v4-2023-04-27` with no query/body fields in its descriptor. The generated response requires an `accounts` object map keyed by account ID (not an array), with optional `account_ordering: string[]`; record/account fields and nullability are fully documented in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. The controller appends map keys after explicit ordering, removes duplicates, filters explicit `can_access_with_session === false` and `is_deactivated === true`, prefers a matching credential `accountId`, and otherwise selects the first eligible choice. `token_revoked`/`token_invalidated`, `require_sso_login` and `token_expired` are distinct recovery categories.

**Also resolved from method-level bytecode:** controller `restore` loads the credential record under a Restoring operation, uses native restore only when a nativeSessionId is stored, checks the restored native ID for exact equality, and establishes the session only if the operation generation remains current. Without a record it transitions to SignedOut. InvalidToken restore clears expired credential; unknown restore errors map to Storage. Direct `signIn` trims/validates the bearer token, validates the account, awaits secure save before SignedIn, and guards state by operation generation. Interactive sign-in checks first-party host/method capability, waits for foreground admission, uses the renewable native Browser path when available or the host-interactive credential path otherwise, checks generation and attempts to clear unfinished native sessions when authentication fails.

**Still open:** full controller concurrency/cancellation/foreground generation race semantics and native CompilerIntrinsics callback payloads and onCleared semantics; standalone `selectAccount` caller/UI wiring and a portable ChatJS switch implementation; native service callback/session-ID ownership and underlying encryption-key ownership/atomicity/clear durability; actual native renewal/SSO/DPoP/session-context lifecycle and authorized transport; public-build device-integrity support; and the independent guest create/refresh/composer routes. These method traces do not implement sign-in or restore in ChatJS. The temporary pinned QuickJS reader deserializes bytecode only and does not execute Android methods. See `ANDROID_CLIENT_PROTOCOL_FINDINGS.md` and `ANDROID_CLIENT_MODULE_INVENTORY.md`.


## Android lookup-key signature path — 2026-11-25

- The concrete `Lyt2.b(String)` caller decodes a URL-safe nonce and signs it with `Ljj51.m` while retrieving a public-key JWK. What is the complete return schema and all upstream/downstream consumers of this lookup-key proof?
- Is the lookup-key nonce proof reused by, or entirely separate from, the main DPoP JWT request-signing flow? The Ktor parser retains parameterized `WWW-Authenticate` challenge values, but the recovered scheme-selection/DPoP callback does not consume the `Lwuc0` parameter list. The registered Ktor `DPoPProofProvider` is now traced through `Lkl40`/`Lke` to the main `Lyls0.s` JWS builder, which uses the stored P-256 KeyPair and server-clock offset and has no nonce claim. `Lyt2.b(String)` is instead only called by `Lsk00` for the separate `DEVICE_KEY` challenge (`Lqk00`/`Lpk00`) and returns a JWK/signature response. No server nonce is shown in these two paths; `X-Nonce` belongs to RevenueCat. Trace other native/provider/response paths before making an absence claim. The registered signer result path `Lgmq0` calls `Ln1d1.b` once per invocation; `Lfq.a` maps success to the DPoP Authorization value and maps failure to a credentials-acquisition failure, with no internal signer loop. `Lyp.b` is named `DPoPClockRetryAttempted`; corrected disassembly of `Lwp.invokeSuspend` (classes2 index 58489) shows it is written into `Lfyc0.f` via `Lq18.f`/`Map.put` with `kotlin.Unit`, copied into the retry request context, then passed to `Ldk31.a`. `Lwp` checks marker presence to prevent a second DPoP clock correction replay; `Lxp.b` also suppresses access-token provider reacquisition on the marked request. The previous no-writer conclusion resulted from the old decoder omitting widths for DEX opcodes `0x90–0xaf` and is superseded.
- Where are the Android native key/provider closures injected, and what host-owned capabilities and lifecycle constraints govern their calls?

The private ChatJS formatter only converts DER ECDSA signatures to 64-byte `r || s`; it does not answer these questions or implement the proof flow.


## Android P-256 JWK and lookup-key call-flow update — 2026-11-25

**Resolved:** generated serializer `Ldk50` confirms exact public-key model JSON fields `kty`, `crv`, `x` and `y`; constructor fixes EC/P-256. `Ljj51.p(ECPublicKey)` derives affine X/Y, normalizes 32 bytes and uses URL-safe Base64 without padding. `Lyt2.b(String)` consumes that model in a 32-byte lookup-key nonce signature path.

**Still open:** trace all consumers of this lookup-key proof and determine whether it is reused by or separate from the main DPoP JWT request/challenge flow. Exact native provider injection and host secure-key ownership also remain unknown. The new ChatJS JWK formatter only serializes coordinate bytes.


## Android Ktor request-level DPoP clock recovery and token_expired renewal — 2026-11-26

**Resolved:** `Lwp.invokeSuspend` handles the `dpop_iat_out_of_range` API error for a DPoP-authorized request, parses response `Date`, computes `responseDate - localInstant.epochSecond`, writes `Lpvx.b`, inserts `DPoPClockRetryAttempted` via map `put` (value `kotlin.Unit`), clones request context preserving attributes, then invokes `Ldk31.a`. The handler and `Lxp.b` use marker presence to prevent a repeated clock-recovery/provider-reentry path. This is one bounded request replay, separate from the OAuth refresh Date correction in `Lxb8.e`.

`Lwp`'s `token_expired` branch calls `Lcd01.d(currentAccessToken)`, then `Lcd01.e`; the default `e` invokes `b(true)`. The credential-backed `Lgk8` adapter delegates `d` to `Ld7x.d` to persist the rejected token and `b(true)` to `Ld7x.j`, entering `Lu5x.f` → `Ld7x.l` renewal. `Lisp0` is a no-credentials implementation.

**Resolved (2026-11-26):** request POST `https://auth.openai.com/oauth/token`; body `clientId`, `refreshToken`, default `grantType=refresh_token`; separate DPoP proof header and `oai-uit: True`. Successful response DTO `Llkq0` has `accessToken` String, `idToken` String, `refreshToken` String, `expiresIn` Integer, `earliestRefreshAt` Long, `tokenType` String, `scope` String. `Ljn8.a` unwraps success and `Ly4b1.h` validates record identity and converts/merges into internal `Lvg8`. `Lxb8.g` returns `Ljb8` retaining `La1p0`, sent `iat` and optional Date; `Ly0p0` HTTP response errors expose status/Date/API error, while generic `Lw0p0` transport/serialization failure has no Date and is distinct. **Still open:** exact non-success error normalization across statuses/error variants, forced `b(true)` renewal semantics across adapters, callback/replay after renewal and total token-expired retry ceiling; other OAuth and invalid-proof retry branches. No ChatJS runtime support is implemented.

## Android DPoPClockRetryAttempted producer and signer retry semantics — 2026-11-26

**Resolved:** each recovered Ktor DPoP provider call executes one `Ln1d1.b` signing operation; `Lgmq0` packages success/failure, and `Lfq.a` returns a DPoP Authorization value on success or raises a credentials-acquisition failure after platform exception mapping. It does not loop/retry the signer within one invocation. The `DPoPClockRetryAttempted` attribute is declared in `Lyp` and read by `Lxp.b` to short-circuit provider acquisition when present.

**Resolved:** `Lwp` is the in-package writer and invokes the copied-context `Ldk31.a` callback after updating `Lpvx.b` with response Date minus local Instant. The `DPoPClockRetryAttempted` marker bounds this DPoP response-recovery replay to one attempt. **Still open:** complete token-expired renewal request/response schema and replay ceiling; remaining OAuth refresh and `invalid_dpop_proof` branches. Keep this request-level replay separate from `Lxb8.e`'s one-time OAuth refresh Date correction.

## Android DPoP iat clock source — 2026-11-25

**Resolved:** the proof path reads `Instant.epochSecond` and adds the stored DPoP offset. The timestamp-correction path sets the offset to server epoch seconds minus local Instant epoch seconds. The resulting `iat` is server-aligned epoch seconds, not milliseconds.

**Resolved since this entry (2026-11-26):** the timestamp is read from the OAuth refresh HTTP response's `Date` header, parsed by `Lk9y.a`, and converted from milliseconds to epoch seconds. `Lxb8.j` now has an exact method trace: the request must be `Lpyy0`, the response exception `Ly0p0`, status 400/401/403, and the sent refresh `iat` must be more than 30 seconds ahead of response Date or response Date more than 300 seconds ahead of `iat`. The eligible API-error cases are HTTP 400 with `ApiServiceError.c == invalid_grant`, or either raw field `.b`/`.c` matching `refresh_token_reused`, `token_expired`, or `invalid_dpop_proof`. `Lxb8.e` then updates `Lpvx.b` and calls the refresh coroutine once more. **Resolved:** the error parser reads nested JSON `type` into `ApiServiceError.b` and `code` into `ApiServiceError.c`; the HTTP-400 `invalid_grant` match is on `code`. **Still open:** other refresh retries and any DPoP server-nonce transport/consumption/proof binding outside the recovered scheme-only Ktor callback (distinct from parsed challenge parameters not shown as consumed, OIDC authorization nonce, lookup-key nonce, and RevenueCat `X-Nonce`), `Lpvx.b` dependency lifetime/reset/expiry/persistence, native credential-provider injection and a real secure host signer. ChatJS's helper only adds supplied integer epoch seconds and offset.


## Android LoginAuth email OTP polymorphic login methods — 2026-11-27

Resolved from generated DEX serializers: loginMethods is List<Lmnk0>. The four concrete polymorphic variants and wire values are password to Lfnk0, passwordless_otp to Link0, passkey to Lcnk0, and unknown to Llnk0. Lcnk0 has optional nullable challenge:Lmds0? plus type; the nested Lmds0 schema requires non-null passkeyRequestOptions: JsonObject and mfaRequestId: String. Lfer0 email verification modes remain a separate enum. A private pure decodeAndroidLoginAuthEmailOtpPayload helper and five focused tests now cover those structures.

Still open: whether the Lmnk0 polymorphic fallback accepts arbitrary unrecognized discriminator strings or only resolves to the explicit unknown enum value; the decoder currently accepts only the four source-enumerated Lqnk0 values. The overall Lyl8 union, other step payloads, complete LoginAuth error classification, native provider, authenticated transport and body-integrity header adaptation remain unimplemented.
