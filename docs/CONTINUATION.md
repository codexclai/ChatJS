# ChatJS Continuation Guide

Every ChatJS conversation continues the same repository and shared project memory.

## Start

1. Read `AI_MEMORY.md`.
2. Inspect live `main`, complete branch list, tree, recent commits, issues/PRs, CI, and TODO.
3. Read state, session history, decisions, knowledge, experiments, and open questions.
4. Read capability matrix/inventory, Android protocol findings, Android/desktop/Codex source records, roadmap, architecture, PRODUCT_STANDARD.md, and workflow.
5. Read root `ChatJS.md` before public API changes.
6. Resume the highest-priority actionable work; do not return only a plan.

## Product direction

ChatJS is one conventional, general-purpose Node.js client module consolidating the actual client-side capabilities and workflows of ChatGPT mobile, ChatGPT desktop, and Codex CLI under the single ChatJS package/API. ChatGPT mobile/desktop and Codex CLI are three real source/client families inside one Node.js module. It is not three separate packages, a replacement app/server, a generalized multi-AI-provider SDK, or a recreation of ChatGPT's server.

Use the actual shipped client code and package contents as the primary technical basis, including request/response construction, schemas, transport, connection/auth/session flows, local persistence, modules, tools, and resources. Do not prohibit a client interface merely because public developer documentation does not describe it. The server-side code that is not shipped in the clients is not needed to reproduce the client behavior.

The Node.js package must implement the real in-scope ChatGPT mobile and desktop workflows plus Codex CLI client workflows through one cohesive API. It must not spawn or require the separate codex executable or a Codex app-server. Android cloud Work, Windows local Work, and Codex CLI remain distinct surfaces, not aliases for one engine. The package must be usable by different hosts and applications; do not assume a particular device, operating system, camera, microphone, screen, browser, or deployment model. Optional host adapters expose only facilities the consuming environment genuinely supports.

Current implementation remains foundation-only. First-pass Android client findings are in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`; they are not full source reconstruction or a working Node.js integration. Never present intended scope or research as implemented behavior.

## Product-quality target

Read PRODUCT_STANDARD.md as the accepted target for broad in-scope feature coverage, a cohesive one-package API, portability, customization, dynamic capability discovery, reliability, security/privacy, usability and production-readiness. Treat its checks as requirements to implement—not as evidence that the runtime already satisfies them. Prioritize real feature slices and test them; keep support states and unsupported-host behavior honest.

## Reference packages and browser profile

Use ChatJS Project → Sources as the normal and primary location for supplied ChatGPT packages. The personal Library is outside the normal workflow; do not depend on it or treat it as a primary or routine source. Access it only for a concrete task when particular material is genuinely useful, necessary, and actually accessible. Any material used there must be under a folder named **ChatJS Project**, containing only authentic, necessary sources or useful original findings.

- Android: `ChatGPT-Android.xapk`, 123,574,190 bytes; an app bundle containing the base APK and required splits, not a standalone APK. ZIP integrity and published-hash match were verified.
- Windows: `ChatGPT-Windows.msix.part001` (400,000,000 bytes) and `ChatGPT-Windows.msix.part002` (396,523,063 bytes). Sequential pieces of one installer; neither is independently installable. Reassembly matched the original byte-for-byte, SHA-256 `561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`.

### Latest Android source findings — 2026-11-24

The currently supplied Android XAPK is ChatGPT 1.2026.321 (version code 2632129); its base APK has ten DEX files and 111 Valdi modules. The XAPK SHA and ZIP CRC were verified. The native code scan found a 256-byte random nonce, UUID.randomUUID install identity, genuine Google Play Integrity, cookie exchange and bot_token X-Sentinel-Payload header. The inspected native path requires package com.openai.chatgpt.internal, while the supplied XAPK is com.openai.chatgpt, so public-build availability is unproven. Continue from docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md. Separate host facts, install identity and genuine first-party attestation; do not invent the latter. No runtime integration is implemented.

## Persistent ChatJS browser profile

The persistent browser profile named **ChatJS** is the sole default reusable profile for all ChatJS browser work. It already has the owner's Google and ChatGPT sessions authenticated. Always use it for browser-based ChatJS tasks.

Use a separate browser session only when genuinely required for temporary or disposable work. Keep it temporary; never save it as another reusable profile or replace ChatJS with it.

Never sign out of Google or ChatGPT in the ChatJS profile. Never clear its cookies, site data, local storage, or saved sessions; never reset, delete, replace, or recreate it. Avoid actions that could invalidate either login. Preserve the authenticated session and save profile changes. Do not expose credentials, cookies, tokens, or private account/session data. Normal permissions, entitlements, and first-party security checks still apply.

## Operating rules

- Work only on existing `main`. Never create, delete, rename, switch, or publish branches/worktrees. Never force-push. Never configure branch protection, rulesets, or topics.
- No telemetry, tracking, hidden collection, background reporting, phone-home, remote diagnostics, or unsolicited content upload.
- Do not hardcode, log, or commit credentials or user session material. Preserve legitimate user authentication and authorization; do not bypass access controls or entitlements.
- No fake runtime behavior, canned output, bloat, unrelated features, or unjustified dependencies.
- Keep ESM/CommonJS parity and accurate TypeScript declarations.
- Do not categorically exclude first-party feature domains by label. Implement relevant source-backed capabilities across all product domains where legitimate service and host support exist; preserve privacy, authorization, and security invariants.

## Documentation and finish

Record meaningful requirements, decisions, sources/dates, actions, changed files, tests, failures, limits, blockers, and handoffs in canonical docs. Correct affected references and preserve chronology. Update `project-state.json` and regenerate `PROJECT_STATE.md`; update TODO and the chronological session log.

Run `npm run check`, build/inspect the module archive, verify CI where possible, inspect the final tree and branch list, and commit directly to the existing `main` branch using a non-force fast-forward update. Record actual results; never claim unverified work.

### Further Android integrity trace — 2026-11-24

The internal Android native helper's second Standard Integrity request hash is canonical JSON in account_id/conversation_id/device_id/parent_message_id order, UTF-8 SHA-256 lowercase hex. It uses Standard Integrity provider warm-up/token requests with 30-second waits and one observed provider-invalid refresh/retry path. Cookie acceptance requires _playintegrity, Secure, unexpired, trusted domain and backend route path. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md. The public app/package caveat remains unresolved; no ChatJS provider is implemented.

### Integrity SDK cooldown and retry evidence — 2026-11-24

The Android SDK contains a 300-second local TOO_MANY_REQUESTS cooldown, conditional candidate retry statuses (-19, -18, -12, 0, -100, -8, -9), and a DeviceRateLimits store with read/expiry/filter/write paths. Exact retry gates, limits, store scope and restart persistence remain unknown. Do not treat candidate codes as unconditional retries and do not port SDK metrics/telemetry. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

### Direct transport, accountless sessions and Work surfaces — 2026-11-24

The owner explicitly requires ChatJS to implement direct first-party ChatGPT HTTP/WebSocket/SSE client communication in Node.js. Do not make Work depend on Codex CLI, an external Codex app-server process, or an embedded app-server runtime. The pinned official Codex repository is reference evidence only; read CODEX_SOURCE_FINDINGS.md.

Keep these surfaces separate:
- Windows ChatGPT desktop Work: local execution on the desktop host.
- Android ChatGPT Work: cloud execution.
- Codex CLI: a distinct terminal-oriented coding client, not a Work prerequisite.

Preserve accountless ChatGPT as a genuine first-party logged-out guest session, separate from authenticated accounts and Temporary Chat while signed in. Android 1.2026.321 method-level DEX evidence now traces its three session states, serialized metadata, SessionManager startup/logout/refresh flows and sessions/guest-* storage/retirement cleanup. The observed anonymous route constants belong to LocationCookieInitializer during location-cookie setup, not a proven guest composer. Exact guest create/refresh and message-send schemas remain open. Windows guest Work has not been verified; do not infer it from generic browser code. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md and REFERENCE_DESKTOP.md.

The runtime includes a generic bounded and cancellable SSE parser in src/sse.cjs. Its tests cover incremental UTF-8, line framing, event fields, size limits, abort and iterator cleanup. It does not perform a ChatGPT request, authenticate or interpret product-specific payloads. Keep the remaining ChatGPT transport/auth/session/conversation integration marked unimplemented until proven by end-to-end tests.


### Latest Android guest-session trace — 2026-11-24

The Android DEX pass now traces a three-state Unauthenticated/AnonymousSession/LoggedInSession enum, a serialized session metadata model, SessionManager startup/logout/unauthenticated-refresh paths, and SessionStorageCleanupImpl handling sessions/guest-* directories and retired sessions. Exact guest create/refresh HTTP requests and composer send/prepare schemas remain open.

Important correction: the anonymous conversation URL constants observed in DEX are consumed by LocationCookieInitializer while processing locationPermissionCookieSettings. They are not evidence of the guest composer message-send route. Read the latest method-level section in ANDROID_CLIENT_PROTOCOL_FINDINGS.md before continuing the guest protocol trace.


### Android guest UI and anonymous transport correction — 2026-11-24

Do not treat the phrase "Continue as Guest" as ChatGPT guest UI: it comes from Li230, a serialized Shop plugin model with Shop checkout/login labels. The AnonymousSessionLoading Compose method Losk1.a is separate; a direct DEX call-reference search found no caller/callback connecting it to SessionManager.

New infrastructure evidence: Lp6t defines backend-api and backend-anon roots, Lvwo0 includes both in the global Lar31 network config, and Lyzo0 accepts paths under either prefix. Lr10 initializes a local profile descriptor labelled anonymous-session, passed into a QR-login-related component; this is not proof of a server-issued guest token or guest create route. The RootViewModel path first performs install-referrer AccountSelector login (Los8.f → LoginGraphManager), then separately calls Lgs31.b → Lau31.G for anonymous startup. Continue through Lau31.G and its Llzx.n helper/injected SessionManager dependencies to locate a concrete request builder; do not mistake Los8.f for guest creation. Actual guest composer send routes are still untraced.


QR-profile disambiguation: Lr10's local anonymous-session descriptor is consumed by QrLoginApi Lqz8. The associated QR sign-in/review flow references /backend-api/qr-code/details and /backend-api/qr-code/action; these are not guest conversation routes. Do not infer guest create/send behavior from the descriptor.


### Android SessionManager dependency correction — 2026-11-24

Do not treat Lof70 as an auth/session provider. It is the Statsig/experimentation interface (Lmx71 StatsigManager; Lbu70 FakeExperimentManager); Lau31.F invokes Lof70.G for feature/experiment evaluation. The Lis31 Failed to refresh the unauthenticated session path reads Llzx.u local session snapshot and calls Lau31.u for local manager transition (E/r), with no HTTP call in the inspected method. A separate Lks31 AuthSession/SessionLogin → Lau31.n → Ldt31 → Lsk8/Ld7x CredentialsRepositoryImpl path uses DPoP/credential token refresh and is not proven guest creation. Continue seeking a concrete network request behind the actual guest fallback; keep guest create/send routes unknown until a request builder/client is found.


### Latest guest-welcome presentation trace — 2026-11-24

The current Android trace found a distinct welcome-presentation model: Lnlh1 is its generated serializer, while Lplh1 is the data model with guestCtaCopy, ctaStyle, hideLoginButton, showGoogleCta and presentation/disclosure fields; Lylh1 is the typed stored value. WelcomeLanguageEnrollment reads it via Lzlh1, a local PreferenceStore subclass using global_; Lvlh1 records an anonymous_welcome enrollment event; Lxr10 maps the copy/flags into welcome/composer UI state under Statsig gates with a skip special case. This is a real guest-welcome presentation path, not the Shop plugin's Continue as Guest string. The welcome CTA action-29 click path is now traced through Lgs10/Ltu10/Lqik0 to Lnik0 login-child coordination. Its login-flow path reads the current Lks31 session wrapper locally through Llzx.t and processes Lir31 events through Lau31.i/Lxs31 under the Lmgo0 mutex; the inspected code performs local session-state reconciliation and login-flow coordination. It is not proven to invoke the separate Lgs31.b → Lau31.G initial guest fallback or a server-side guest create request. Still unknown: who populates/refreshes the preference, which coordinator branch (if any) starts a new guest session, and the guest HTTP create/refresh and composer endpoints. Continue from the preference writer and the action-29 branch to SessionManager.G; do not infer network behavior from the model or enrollment event.


### Correction: Lt891 is the Android guest-start event — 2026-11-24

Instruction-level decoding supersedes the preceding event-dispatch summary: `W891.a` is handled by passing the current `Lw4h0.getValue()` to `Lcq41.e` and returning. The separate `instance-of Lt891` branch dispatches `Lmuz0` label 9, which reads the Lt891 integer payload, invokes the captured callback and calls `Lgs31.b → Lau31.G` after constructing the local `Llnp0` argument. This is local SessionManager state coordination, not a recovered HTTP create request.

Two candidate Lt891 constructor sites are found: `Lq20.invoke` emits `Lt891(5)` through a captured Function1 in WebView UI callsites; `Ldo1.invoke` selector case 18 can emit `Lt891(6)` through a captured Function1 on an inspected null-Lh70 branch, hosted by `Lp1w` constructed from `Le2w.e` (ConversationSidebar UI). The actual Function1 targets and path into the current La991 instance are unresolved. The event payload semantics are also unknown. The welcome CTA action-29/login-child path remains unconnected to these events. The ChatgptClientMarkerUserSessionBootstrapRequestType is instrumentation only and must not be sent by ChatJS. Continue by tracing the callback owners, then guest HTTP create/refresh and composer send independently.


### Android Lt891 parent callback boundary — 2026-11-25

The next trace is now at the parent callback inputs. `Lq20` emits `Lt891(5)`; its generic `Function1` is supplied by `Llal1.h` callers (`Lj20`, `Lss`, `Lt07`, `Ly641`) or the WebView-host `Lej10.c` via `Ljpc.invoke`. `Ldo1` emits `Lt891(6)` through `Lp1w` → `Le2w.e` → `Le2w.j` and parent `Le2w.c` ConversationSidebar inputs. A scan of all ten DEX files found no direct method-id or method-handle reference to `La991.G` outside its own definition; dynamically supplied behavior remains unverified. Do not infer callback targets or payload semantics. The established guest-start path is local `Lt891` branch → `Lmuz0` label 9 → `Lgs31.b` → `Lau31.G`; server HTTP create/refresh and guest composer routes remain unknown.


### Android generic ViewModel callback dispatch — 2026-11-25

`La991` extends `Lv6a`; `Lv6a.H(Louf0)` invokes virtual `G(Louf0)`. Do not treat absence of direct references to `La991.G` as proof that generic callbacks cannot reach it. Generated `Le6` captures a `Lv6a` and calls `H`, but its observed creation is in Composer / FreeThinkingGaugeNuxHost. The WebView `Lq20` callback and ConversationSidebar `Ldo1` callback remain generic parent Function1 parameters with no proven binding to that `Le6` or the same `La991` receiver. Continue from the actual callback objects and receiver bindings; keep payload values 5/6 opaque and do not connect them to welcome CTA without evidence. The only confirmed Lt891 path remains local SessionManager coordination; guest HTTP creation and composer send remain unknown.

### Android welcome-language preference writer — 2026-11-25

The local enrollment PreferenceStore path is now traced. `Le7f1.invoke` defines the `welcome_language_opportunity` key (Lap6, serializer Lxlh1) with default `Lylh1(null, false, null)`. `Lvlh1.c`, called from `Ltp3.P` / `Lslh1`, launches `Ltl30`; it reads the stored value, evaluates Statsig-derived `Lplh1` through `Lxr10.h`, checks feature/skip flags, collects local locale/app/user-install context, constructs `Lcmh1`, and writes an updated `Lylh1` using `Lzyv0.m` / `Lhi41` branch 19 / `Lylh1.a`. This is local enrollment-state persistence; it does not prove a guest HTTP call.

Keep the `Lnlh1` presentation model with `guestCtaCopy` separate from `Lcmh1` enrollment metadata. Its source, remote fetch/cache writer and connection to this local preference are still unknown. The later `Lz840.d` / `Ljb40` account/profile calls are a separate service branch and should not be relabelled as welcome configuration. `anonymous_welcome` is SDK instrumentation; do not port it into ChatJS.

### Android welcome Statsig parameter source — 2026-11-25

Lfs10 declares typed welcome_* parameters, including welcome, welcome_skip_available, welcome_button_copy, welcome_language_presentation, welcome_language_suggested_tags, welcome_language_configuration_version, combined/alternative/hide/shorten disclosure toggles, and welcome_disclosure_guest_cta_copy. Lxr10.h(Lof70) reads them through Lmx71 (StatsigManager) and builds Lplh1; Lnlh1 is the generated serializer. Ltl30 embeds Lplh1 in Lcmh1 and persists it inside Lylh1 / welcome_language_opportunity.

Lmx71 wraps Statsig SDK state using Lix71 / Lzw71; typed getters read current evaluated/cache-backed parameters. Llmt0 is a local SharedPreferences override/default store, distinct from the PreferenceStore enrollment record. The SDK's remote config refresh route/payload, refresh schedule, cache expiry/persistence and offline/default precedence remain open. Do not port Statsig exposure/analytics/reporting to ChatJS.

### Android conversation coordinator guest-start branch — 2026-11-25

`Ljqk0` is the conversation coordinator/ViewModel and receives both `Lks31` AuthSession and `Lgs31` anonymous SessionManager (`Q1` and `R1`). `Ljqk0.G(Louf0)` has a guarded `Lkmk0` event path that launches `Lps30` with byte label 16. The packed-switch in `Lps30.invokeSuspend` maps key 16 to offset `0x350`; that branch logs the MessageStreamingService no-messages/all-unsupported condition, constructs and emits `MessageNotFoundException`, then calls `Lgs31.b` with `Lkmk0`-derived `Llnp0` reason and `Lhr31` details.

This is a conversation-level local SessionManager start/recovery path. It does not reveal the guest HTTP create/refresh request or prove remote creation succeeded. Next trace the `Lkmk0` event producer/payload meaning and whether the coordinator's subsequent state path invokes a distinct request client. Keep this separate from the welcome action-29 and `La991` / `Lt891` event paths.

### Android Statsig initialize and Compose conversation receiver — 2026-11-25

The Android Statsig SDK initialize path is mapped: `Lyx71` routes `Initialize` to `https://featureassets.org/v1/i` and `log_event` to `https://prodregistryv2.org/v1/e`. `Lzy71.g` builds an initialize JSON POST with `user`, `statsigMetadata`, `sinceTime`, `hash`, `previousDerivedFields`, and `full_checksum`; `Lbdb.z` adds JSON content type and SDK type/version/client-time headers; `Lmy71` executes via SDK transport. `PersistedInitializeResponse` becomes the evaluated gate/config/layer model. `Lz381` restores `ondiskvaluecache`, optional per-user `Statsig.CACHE_BY_USER`, local overrides and sticky experiments. The fallback host list (`statsig.network_fallback`) is separate, with seven-day expiry and max ten previous URLs; this is not response-cache TTL. The cache helper takes an age parameter, but effective production default and offline precedence are unknown. `log_event`, exposures, `rgstr_e` and offline event buffering are telemetry and must not be ported. RevenueCat remote-config classes are unrelated.

The same-instance conversation callback is mapped: `Lxjk1.f` captures its `Lgqk0` ViewModel in `Llu2`; the callback maps the event through `Lhkk1.t` and calls virtual `Lv6a.G` on the captured receiver. `Ljqk0` extends `Lgqk0`, so when the renderer is supplied that `Ljqk0` object, dispatch reaches that same coordinator's `G`. Its guarded `Lkmk0` path emits the no-messages/all-unsupported conversation error, then invokes local `Lgs31.b`. The `Lkmk0` producer and semantic meaning, reason-code interpretation, subsequent HTTP guest creation and composer-send request remain open.

## Latest handoff — 2026-11-25

### Verified source position

- The authenticated Android sender is located in `chatgpt_services/src/conversations/ChatGPTDirectResponseClient.js`. Its generated catalog/requirements client, direct SSE worker/decoder/resume modules, file upload service and conversation history client are identified. Exact source evidence is in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. This is static module evidence only; complete request serializers, event schemas and first-party integrity behavior still need reconstruction.
- A scan of all 111 decompressed Android Valdi modules found no `/backend-anon` route string. Do not assign the guest HTTP route to the authenticated sender or to DEX LocationCookieInitializer constants. Guest create/refresh and guest composer prepare/send remain unresolved.
- The owner-supplied Windows MSIX pieces were reconstructed and ZIP-tested. The ASAR app is `openai-codex-electron`, shown as ChatGPT in the Appx manifest. Its local coding-agent path launches the bundled `codex.exe` through a stdio app-server host and uses thread/turn RPC. A separate ChatGPT/OpenAI-origin-restricted bearer-auth fetch bridge recognizes `wham` and Estuary path families. This does not prove that every user-visible Windows Work UI is that same path.
- Owner direction remains binding: ChatJS must not spawn or require Codex CLI or a separate app-server process. Android cloud Work and Windows local execution remain separate implementation surfaces.

### Next work (in priority order)

1. Decode the Android direct client request serializer and exact method-to-route selection; trace model catalog, chat requirements and both first-party integrity providers without simulating or bypassing security.
2. Decode direct SSE events and resume/handoff behavior, then the attachment upload reservation/PUT/process sequence.
3. Continue guest-specific call-graph analysis to find the actual HTTP create/refresh and composer prepare/send clients; keep LocationCookieInitializer out of that attribution.
4. Trace the exact Windows Work UI-to-local-runtime path and the separate `/wham`/Estuary network clients. Design ChatJS local execution without subprocess dependence and do not equate this source's Codex coding-agent path with all Work behavior.
5. Implement only after the protocol is sufficiently specific for ESM/CommonJS/TypeScript parity, security, cancellation and genuine end-to-end tests.

### Current completion assessment

The overall estimate remains approximately **3%**. Source research and documentation do not count as implemented product functionality. The production runtime still has no authenticated or guest ChatGPT connection, product-specific conversation transport/decoder, file workflow, or Work engine.

## Latest handoff — 2026-11-25 (Android request-contract deepening)

The supplied XAPK is mounted at `/mnt/data/ChatGPT-Android.xapk` for this session. The base APK member is `com.openai.chatgpt.apk`; its `assets/chatgpt_services.valdimodule` Zstandard frame was decompressed and compiled module regions inspected.

This was the earlier string-only pass. It has been superseded by the later bytecode/method-level traces below, which recover the generated model/requirements schemas, exact direct-stream resume request, worker message protocol, upload request/transfer/process branches, and numeric picker limits. Remaining gaps are listed in the latest handoff.

Superseded next steps: DirectResponseClient, generated schema, stream resume/worker, and upload reservation/limit bytecode are now reconstructed. Continue with the remaining native device-integrity service, separate challenge consumers, guest lifecycle, and the broader Android non-Work inventory.

## Owner clarification — one ChatJS client, three source families (2026-11-25)

The owner explicitly clarifies that ChatJS is simply one ordinary Node.js client module that brings ChatGPT mobile + ChatGPT desktop + Codex CLI together as one singular all-in-one ChatJS package. This is the permanent product identity. Implement the source/client capabilities inside ChatJS rather than creating a new application/platform or requiring multiple external products. The Codex CLI capability family is in scope; its executable and app-server are not runtime prerequisites. ChatGPT is the only AI service target. Keep Android cloud Work, Windows local Work and Codex CLI's own coding-client behavior distinct internally, even though the user consumes them through the same Node.js package. Optional adapters are for host facilities, never alternate AI providers.

The accepted high-level quality direction remains in PRODUCT_STANDARD.md sections 1 and 14. Current implementation remains foundation-only; no real ChatGPT/Codex client operation is implemented yet.

## Latest handoff — Codex CLI protocol research (2026-11-25)

The pinned Codex source snapshot now has a concrete source map for the ChatGPT Codex Responses transport/auth/stream and the CLI JSONL event contract. See `CODEX_SOURCE_FINDINGS.md` and the latest Codex section of `CHATGPT_CAPABILITY_INVENTORY.md`.

Next, trace the full core Responses builder and transport selection; request/session ID lifecycle; ChatGPT OAuth refresh/account-switch handling; full SSE/WebSocket events and recovery; tool/approval/result continuation; and local workspace/process/patch/MCP semantics. Implement these natively under ChatJS, without spawning the CLI or app-server. Codex credential-less configuration is not the ChatGPT guest session. No live requests or credentials were accessed, and no Codex feature is implemented in ChatJS yet.

## Latest handoff — Codex local tool runtime and security model (2026-11-25)

The pinned Codex CLI source now has a first-pass local tool/runtime map in `CODEX_SOURCE_FINDINGS.md`: interactive `exec_command` and `write_stdin`, one-shot execution, path-URI workdir and executor selection, explicit sandbox/approval states, session-scoped approval caching, verified `apply_patch` routing, and MCP server/tool readiness and dispatch. The native ChatJS implementation must reproduce required semantics rather than spawn or embed app-server. It needs explicit optional filesystem/process/PTY/sandbox/network adapters and cannot auto-approve or bypass human decisions.

Next: trace remaining local tool/security source paths (filesystem operations, sandbox and networking, patch atomicity and MCP lifecycle); meanwhile continue the full Codex Responses WebSocket/auth/event mapping and Android Valdi bytecode inspection. Preserve distinct Codex, Windows Work Local and Android Work Cloud engines. No production behavior is implemented.

## Latest handoff — Codex network policy, permissions, tool discovery and agents (2026-11-25)

The pinned Codex source now documents four further in-scope families in `CODEX_SOURCE_FINDINGS.md`: command-scoped outbound network approval, selected-executor-aware `request_permissions`, lazy local BM25 search over deferred tool definitions, and configuration-gated MultiAgentV2 collaboration (`spawn_agent`, `send_message`, `followup_task`, `wait_agent`, `list_agents`, `interrupt_agent`). Important distinctions: command network egress policy is not ChatGPT API networking; additional permission requests are human-reviewed and environment-bound, not auto-grants; tool search is local to the registered tools and must still apply per-step policy; message queueing and triggering a new agent turn are different modes. No telemetry is to be ported.

Next: reconstruct full network prompt and persisted-policy semantics; all permission schema/response states; deferred tools/catalog invalidation; MultiAgentV2 limits, gating, child-thread lifecycle, event ordering and cancellation. Then implement native Node.js state machines with real host facilities and approvals. These are not yet ChatJS features.

## Latest handoff — Codex core control tools and extension interactions (2026-11-25)

The Codex source map now includes the built-in plan/context/clock controls, deferred environment readiness, blocking/asynchronous user question/message contracts, MCP resources, current-thread dynamic tool callbacks and the catalog-validated plugin/connector install consent flow. See the latest corresponding section of `CODEX_SOURCE_FINDINGS.md`. For ChatJS, these require truthful host-interaction/environment adapters and explicit consent; do not fake UI display, user answers, readiness, tool responses or installations. MCP tools/resources and dynamic tools remain separate from ChatGPT inference. Keep privacy, security, authorization, user-consent, and no-telemetry invariants intact.

Next: complete control-tool schema/event lifecycle, MCP resource URI/result limits, dynamic-source refresh/namespace lifecycle and install/decline/cancel behavior. Then design the native Node.js Codex orchestration layer while continuing the unresolved Responses/WebSocket/auth and local sandbox/process traces.

## Latest Android bytecode-tool handoff — 2026-11-25

A viable temporary disassembly path is now identified in the pinned Valdi QuickJS source: patch a separate analysis copy of `JS_ReadFunctionTag` to call `js_dump_function_bytecode` after the deserialized function's constant pool is loaded. The normal `DUMP_BYTECODE` hook is compilation-side; `DUMP_READ_OBJECT` logs serialized bytes and structures, not readable opcodes. Android's arm64 split has stripped `libopenai_xplat_export.so` (8.8 MB) with QuickJS/Valdi runtime class strings, but no usable exported dump hook.

No disassembler has been built; full QuickJS sources and matching build options are unavailable in the current analysis workspace. Next acquire/verify the exact Valdi QuickJS source tree, build a temporary tool, validate it against a known fixture, and then inspect only the exact ChatGPT service methods. Do not run the app or execute module functions.

## Latest handoff — Codex Responses WebSocket v2 source trace (2026-11-25)

The pinned Codex source map now includes WebSocket v2 handshake, provider/session gating, turn-scoped reuse/routing, strict incremental continuation (previous_response_id), optional generate:false warmup, bounded message framing/read-ahead/event queue, interrupt acknowledgements, and session-scoped HTTPS fallback. See the latest dated section of CODEX_SOURCE_FINDINGS.md.

Next: implement none of this until exact header gates/handshake responses, session/auth ownership, every incremental comparator field, warmup state, interrupt semantics and retry/fallback behavior are reconstructed into contract tests. Prewarm must be explicit/opt-in; no implicit network on package startup. The HTTP/SSE and WebSocket decoders need ESM/CommonJS/TypeScript parity and authorized E2E coverage.

## Owner priority reset — 2026-11-25 (sequencing only)

The owner has clarified that the long-term ChatJS product goal is **not changing**: the single Node.js module must ultimately consolidate ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI client capabilities, preserving Android cloud Work, Windows local Work, and Codex CLI as distinct surfaces.

For the current execution phase, focus exclusively on completing the supplied ChatGPT Android client **except Android Work**. Set aside Android Work, all ChatGPT Desktop/Windows work, and Codex CLI work until the Android non-Work client coverage is genuinely complete and tested. This is a temporary priority/order instruction, not a removal or reduction of the product target. Keep all other source findings and tasks in the backlog; do not spend the current phase on them.

The Android work target is the complete relevant shipped Android client experience, not just chat sending: account sign-in/session refresh, genuine logged-out guest sessions, normal conversations and streaming, model/requirements/integrity, files and attachments, history, Projects/context/instructions/memory, image/video/voice, search/tools, and every other source-backed Android non-Work client area. Feature-domain labels do not restrict coverage; actual source behavior, legitimate service support, authorization, entitlements, and host requirements determine implementation. Android Work remains parked.

**Next phase transition:** only after the Android non-Work capability inventory has been fully traced, implemented, and tested should the active queue move to Android Work, Windows/Desktop, and Codex CLI.


## Owner scope reaffirmation and Android module audit — 2026-11-25

The final ChatJS target remains ChatGPT Android/mobile + ChatGPT Windows/desktop + Codex CLI in one Node.js module. The current phase is Android non-Work only; Android Work, Windows/Desktop and Codex CLI remain parked until Android non-Work is fully reconstructed, implemented and tested. This does not remove or reduce any long-term target.

The supplied Android XAPK was reverified during this session (SHA-256 `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`; outer ZIP integrity passed; six entries; base APK 5,080 entries, ten DEX files and 111 Valdi modules). Static module assets include finance/account, maps/location, wallet, health, commerce/shopping, global search, Library, custom instructions, memory settings, conversation and voice areas. See `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. Presence of an asset does not prove active route, entitlement, complete behavior, or ChatJS support. Feature-domain labels do not restrict coverage.


## Latest handoff — Android direct-response and stream decoder bytecode trace — 2026-11-25

### Tooling completed

A temporary read-only QuickJS disassembler was built from pinned `Snapchat/Valdi` commit `f5bc2dcfcb880109c908e0675968cb532231ca71` / QuickJS `2021-03-27`. Its dump hook is inserted before `JS_ReadFunctionTag` returns, after constant-pool reconstruction. A small harness calls `JS_ReadObject(...JS_READ_OBJ_BYTECODE)`, frees the decoded object and runtime, and never evaluates or invokes app functions. Three actual Android entries deserialize successfully: DirectResponseClient (24,963 bytes / 66 functions), generated ConversationApiClient (9,050 bytes / 56 functions) and ConversationEventDecoder (14,503 bytes / 22 functions). All tool/source/payload artifacts remained temporary and outside the ChatJS repository and runtime.

### Reconstructed behavior

- Authenticated direct send POST: `/backend-api/f/conversation`.
- Separate parent lookup GET: `/backend-api/conversation/{encodeURIComponent(conversationId)}`, requiring decoded `current_node`.
- Requirements operation: POST `/backend-api/sentinel/chat-requirements` with JSON body `{}`.
- Default `ChatGPTRequirementsIntegrityProvider` emits `OpenAI-Sentinel-Chat-Requirements-Token` only if no `turnstile`, `proofofwork`, or `so` descriptor has `required === true`; otherwise it throws and does not send.
- A different `ChatGPTDeviceIntegrityProvider` is selected only when Valdi >= 11 and a device-integrity service is available. Header arrays and body patch are validated; the inspected body patch is exactly one `app_attest_challenge` key with non-empty text. Public package availability of the native service remains unproven due to its DEX internal package-ID guard.
- Request builder uses the newest user-role message, checks non-empty trimmed text, uploads attachments first, then creates a `next` payload with primary-assistant mode, model, parent ID, client message ID, metadata, optional file parts, `stream:false` and timezone offset. `conversation_id` is included only when the selected target differs from the session's current conversation.
- Stream decoder tracks event offsets for every non-DONE event, resume tokens, conversation-bound handoffs, assistant/tool message text, reasoning, DIL and entity-reference changes. It emits continuation `{conversationId,eventOffset,token}`; the direct sender allows at most three handoffs.
- Delta payload uses `c/o/p/v` fields and Add/Append/Patch/Remove/Replace/Truncate operations. Path bounds are 2,048 characters / 64 segments; JSON-pointer escaping is applied, and `__proto__`, `constructor`, and `prototype` are rejected.

Full method-level evidence and caveats are in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`.

### Current next work

1. Complete generated ModelCatalog/ChatRequirements nested response schemas and nullable/optional precedence.
2. Reconstruct native device-integrity service internals and whether a public Android build exposes it; do not bypass or simulate.
3. Finish the remaining Android stream processor and event variants, then test direct-stream state, cancellation, interruption, and server recovery with authorized sessions.
4. Implement the authorized attachment workflow around the traced policy: reservation, content transfer, processing, download/indexing, signed-URL expiry, retries/cancellation and cleanup.
5. Continue independent Android guest create/refresh and guest composer route reconstruction. `/backend-anon` constants in LocationCookieInitializer remain unrelated evidence.

**No ChatJS production code changed:** request, auth, file, SSE and integrity workflows remain unimplemented. The new results improve source evidence only; do not report functional support.


## Latest handoff — Android generated schema validation trace — 2026-11-25

The decoded generated ConversationApiClient now provides the concrete ModelCatalog/ChatRequirements named-field contract. ModelCatalogRequest requires boolean iim and supports_model_picker_upgrade_presets. ModelCatalogResponse requires string default_model_slug and has optional models[] / versions[] arrays; ModelCatalogModel.slug and ModelCatalogPreset.model_slug are optional strings; ModelCatalogVersion.intelligence_presets is an optional ModelCatalogPreset[] array. ChatRequirementChallenge.required is optional boolean. ChatRequirementsResponse.token is required string; turnstile, proofofwork and so are optional arrays of challenge descriptors. Optional fields are checked against undefined, so null is rejected; extra object keys are preserved.

See ANDROID_CLIENT_PROTOCOL_FINDINGS.md. The resume builder and upload reservation/transfer/process methods are now reconstructed; remaining gaps include challenge-specific consumers, native device-integrity exchange/public-build availability, upload URL expiry/retry/cancellation and download/index lifecycle, and anonymous guest network flows. The runtime still has no live ChatGPT connection.


## Latest handoff — Android stream worker, resume and upload policy — 2026-11-25

### Source decoding completed

The temporary pinned QuickJS reader successfully deserialized six additional Android streaming modules: ChatGPTStreamingWorkerRuntime, ChatGPTStreamingWorkerClient, ChatGPTStreamingResponseProcessor, ChatGPTStreamingProtocol, ChatGPTStreamingContracts, and AssistantResponseClient. It also decoded ChatGPTFileUploadService and the separate oai_file_picker FilePickerPolicy module. The analysis VM held the compiler, reader, source copies, APK-derived payloads and disassembly; none were copied into the ChatJS repository or runtime.

### Exact stream contract recovered

- Host/worker protocol enumerations and request-ID correlation are reconstructed. The host start/cancel protocol and worker callback kinds are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.
- Direct mode uses the packaged StreamingHTTPClient plus ServerSentEventClient, POST and SSE with automatic reconnection disabled. Polling uses an injected optional client and is not evidence of a production polling path.
- Direct continuation appends /resume to the initial path, sends conversation_id, optional model, offset and stream:false, and adds x-conduit-token from the continuation token. The worker closes/cancels the prior request, allows direct mode only, and caps handoffs at three.
- Worker-to-host updates keep content, conversation state, DIL, reasoning, entity references, completion and errors distinct. Prepared content is prefix-compared and only a new appended suffix is sent to the text-delta callback.
- A transport close with the exact SSE-closed message after text receipt is handled as completion; other transport failures reach the processor error path.

### Exact upload contract recovered

- Reservation: authenticated POST /backend-api/files with composer/file metadata, client-resolved MIME, use_case and timezone offset.
- Transfer: first-party Estuary multipart POST for the combined finalize or content-bytes paths; otherwise a raw PUT to a signed trusted destination.
- External signed-storage PUT omits ChatGPT bearer/account headers. It sends Content-Type and, except for AWS S3 hostnames, the Azure block-blob type/version headers.
- Processing: POST /backend-api/files/process_upload_stream for the content-bytes path, with file ID/name/use case and composer metadata.
- File-picker limits are ten files, 20 MiB per file, 25 MiB total, and 32,768 pixels per image dimension. Document/image accepted types and name/MIME constraints are recorded in the source findings.
- Remaining gaps: signed URL expiry, retry/cancellation, download, indexing, full process-stream terminal/progress states and live authorized end-to-end tests.

### ChatJS code change and evidence boundary

Added internal src/chatgpt/file-upload-policy.cjs and tests/android-file-upload-policy.test.cjs. The helper validates file metadata and selection limits, padded Base64 content length, HTTPS destination structure/host allow-list, and an upload plan distinguishing Estuary from signed storage. It is not a public API and does not perform network activity or upload files.

The disposable local copy of current main passed npm run check: 35 tests passed, generated docs and links were valid, and dist/ChatJS.tar.gz contained nine module files. The source helper is included in the distribution archive. This result does not establish a live ChatGPT upload, conversation or streaming implementation.

### Next Android non-Work priorities

1. Trace the distinct Turnstile/proof-of-work/so challenge consumers and native device-integrity service/public-build availability. Preserve fail-closed behavior.
2. Reconstruct authenticated Android account/session lifecycle and the independent accountless guest create/refresh/composer path.
3. Finish all remaining stream event/processor and history behavior; add authorized tests for resume, interruption, cancellation and errors.
4. Implement the real authenticated attachment reservation/transfer/process/download lifecycle with bounded resources, secure signed-URL handling, retries, cancellation and cleanup.
5. Continue the exhaustive Android non-Work inventory and implementation. Android Work, Windows/Desktop and Codex CLI stay parked; the permanent three-family product goal is unchanged.


## Latest handoff — Android event decoder and response processor lifecycle — 2026-11-25

The retained Android bytecode dumps have now been read through the full top-level event dispatcher and listener-facing response processor. Core event outcomes are no longer just inferred from string identifiers:

- [DONE] is checked before eventOffset increments; it completes reasoning and returns terminal complete:true.
- Every other event increments eventOffset before payload decoding, including unknown/ignored payloads.
- resume_conversation_token stores the non-empty token and conversation ID.
- An accepted stream_handoff requires stored resume state, rejects a different conversation ID, and returns a non-terminal continuation with the current event offset; the direct worker then performs the separately reconstructed /resume call.
- message_stream_complete finalizes reasoning and is terminal. Normal message deltas are not terminal.
- Assistant text is tracked per message ID and emitted as appended suffixes. Hidden messages are skipped; tool/thoughts/reasoning_recap/thinking-preamble and non-user-facing recipient messages go through reasoning rather than user-visible text.
- Model-written DIL raw payload and decoded entity-reference snapshots are deduplicated before emission. Conversation-state changes are separately emitted.
- The response processor batches Markdown/render callbacks on a 16 ms timer, preserves distinct text/state/DIL/entity/reasoning callbacks, flushes final text before completion/error, delays terminal completion when a final text/DIL update was emitted, and clears timers on stop. Cancellation stops without a fabricated completion callback.

The exact function-level evidence and conditions are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md. This is still static client behavior, not authorized live stream behavior or complete history synchronization. ChatJS has not implemented the Android event decoder/processor as a live conversation runtime.

Next Android non-Work work: complete remaining event/schema variants and history recovery; reconstruct the actual authenticated and independent guest session lifecycles; trace Turnstile/proof-of-work/so and native public-build device integrity; implement/test real authorized ChatGPT operations. Android Work, Windows/Desktop and Codex CLI remain parked.


## Android requirements-integrity routing handoff — 2026-11-25

The compiled direct client now has a method-level trace for challenge routing and adapter validation. It normalizes the chat-requirements response, requires a non-empty token, and checks required descriptors in turnstile/proofofwork/so. The default requirements provider returns OpenAI-Sentinel-Chat-Requirements-Token only when none is required; it fails closed otherwise. The native provider is selected only for Valdi runtime >= 11 and an available device-integrity service.

The native adapter receives legitimate session/account/backend/conversation context, forwards one-shot success/failure callbacks and supports native cancellation. Returned header arrays and values are strictly validated, and the only accepted JSON body patch is exactly {app_attest_challenge: nonEmptyString}. This validates the adapter boundary; it does not prove the internal native service exists in the supplied public APK. DEX package-ID mismatch remains unresolved. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


## Android native integrity package gate resolved — 2026-11-25

A fresh direct extraction of the supplied XAPK confirms the native integrity factory is packaged, not absent. The APK contains the Valdi module registration marker and DEX factory DeviceIntegrityNativeModuleFactoryImpl; its onLoadModule constructs a Valdi wrapper whose createDeviceIntegrityService creates com.openai.valdi.integrity.b implementing DeviceIntegrityService. DeviceIntegrityRequest carries accessToken, accountId, baseUrl, conversationId and parentMessageId; DeviceIntegrityResponse carries bodyPatchJson/headerNames/headerValues; completion and cancel interfaces are also present.

The exact execution gate is in com.openai.valdi.integrity.a.run: it calls Context.getPackageName() and compares exactly with com.openai.chatgpt.internal. On mismatch it throws DeviceIntegrityPreparationException: "Install the official-debug-signed internal Android application to verify this device." This happens before the helper invokes its HTTP request methods. The supplied XAPK manifest is com.openai.chatgpt, so this native operation cannot pass its guard in the supplied public build. The later hardcoded internal package_name and OAI-Package-Name values belong to the internal-only path after that gate.

This resolves the previous ambiguity: the native factory is bundled but the worker is explicitly restricted to the internal/debug-signed application identity. Do not spoof package identity, alter the guard, send the internal package header/body from ChatJS, or fabricate Play Integrity. A distinct public-build provider in another authentic source remains an open question. Full method evidence is in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


## Latest handoff — Android native integrity response mapping and provenance — 2026-11-25

The native DEX pass verifies the response bridge and transport methods, not only the internal package gate:

- DeviceIntegrityNativeModuleFactoryImpl creates a Valdi wrapper; its service factory constructs the DEX DeviceIntegrityService implementation.
- The worker checks Context.getPackageName() against com.openai.chatgpt.internal before HTTP. The supplied public package com.openai.chatgpt is rejected and cannot run this native operation.
- The final callback sets DeviceIntegrityResponse.bodyPatchJson to null. The JSON bundle containing bot_token, play_integrity_token and chat_requirement_token is the value of X-Sentinel-Payload. The other headers are OpenAI-Sentinel-Chat-Requirements-Token, OAI-Client-Type, OAI-Device-Id, OAI-Package-Name and User-Agent.
- The native HTTP helper uses bearer/account/device headers, JSON POST, redirect disablement, 30-second connect/read timeouts, Set-Cookie/CookieManager handling, a bounded response and cancellable disconnect.
- The initial Standard Integrity token is bound to a fresh 256-byte random nonce; the later token is bound to a SHA-256 request hash over ordered account/conversation/device/parent identity. The internal request JSON contains package_name, nonce, integrity_token and device_id.
- The helper persists a random install UUID in SharedPreferences oai_device_integrity/device_id. This is client-install identity, not hardware identity.
- The helper embeds ChatGPT/1.2026.209 (build 2620909), while the supplied XAPK is 1.2026.321 (code 2632129). The mismatch is observed and unexplained.

Full DEX/asset hashes and method evidence are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md. No Android method was executed; no Play Integrity token was requested, cookie minted, or endpoint called.

Remaining work: exact retry/attempt ceilings; DeviceRateLimits scope, retention and restart persistence; cookie-name/lifetime/rotation/deletion; UUID rotation/deletion; UA mismatch explanation; and a distinct public-build provider only if found in another authentic client source. Keep the internal package gate intact.


## Latest handoff — Android model-catalog and chat-requirements helpers — 2026-11-25

### Implemented source-backed helper slice

Added private `src/chatgpt/android-conversation-api-schema.cjs` with:
- The exact model-catalog GET descriptor and required boolean query validation.
- The chat-requirements POST descriptor with an empty JSON body.
- Generated response decoders for model catalog, nested models/versions/intelligence presets, requirements token and Turnstile/proof-of-work/`so` challenge descriptors.
- The generated optional-field behavior (only `undefined` means omitted; `null` is validated and rejected for mismatched declared types) and preservation of additional object properties.
- A default requirements-header decision that returns the actual non-empty token only when no challenge is marked required; required device integrity fails closed.

The module has nine focused deterministic tests and is included in syntax checks and the distribution archive. The helper is internal and has no network behavior. It does not authenticate, fetch models, send conversations, solve challenges, or provide Android device attestation.

### Validation and current limits

The helper file passes `node --check`; all nine focused tests pass. The initial CI run failed only because `tests/archive.test.cjs` still expected the old nine-file archive manifest. That assertion was updated to include the new helper, then GitHub CI run `45600962485` passed `npm run check` (44/44 tests), generated-state/link checks (27 Markdown files), 10-file archive generation, and installed CommonJS/ESM smoke tests. CodeQL run `45600962380` also succeeded on commit `6eff5056dc95db2c2780097d026aa1e7c2b82305`. The downloaded artifact's gzip/tar integrity passed; its `ChatJS.tar.gz` is 17,944 bytes, SHA-256 `0f99e0639f97d8926caedee5bba182ffb6a446576bc929d1fdc854072fe8b05c`. The runtime remains foundation-only: no authenticated or guest ChatGPT session, conversation transport, product streaming, real file transfer, or public-build device-integrity provider is implemented. The supplied public Android native worker's internal-package rejection remains intact.

### Next Android non-Work work

1. Reconstruct account sign-in/session refresh and credential/DPoP lifecycle without exposing or persisting secrets unsafely.
2. Continue the independent guest create/refresh/composer route investigation; local SessionManager transitions and LocationCookieInitializer constants are not guest message endpoints.
3. Implement authenticated ChatGPT transport only after request/session ownership, challenge consumers and available integrity requirements are fully evidenced; preserve fail-closed behavior.
4. Continue history recovery, remaining stream variants, full upload/download/index lifecycle, and the exhaustive Android non-Work feature inventory.
5. Continue authorized end-to-end tests only with legitimate user sessions and supported public-build security behavior.

Android Work, Windows/Desktop and Codex CLI remain parked for sequencing only; the permanent three-family product target is unchanged.


## Latest handoff — Android authentication validation and credential architecture — 2026-11-25

### Source work

The supplied Android XAPK was rechecked (outer SHA-256 `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`). The base APK's `assets/oai_authentication_session.valdimodule` was extracted and decompressed; the 70,816-byte payload has SHA-256 `5211ced4520704e13e14ebb1f2faf51a91de091877f596a5a0516bd8bebd8917`. Static symbol/string inspection identifies the generated account-check client, SessionAuthenticatedAccountService, OAIAuthenticationController, OAINativeCredential, OAICredentialStore, OAIRequestCredential, OAIBearerAPIService and OAIAuthenticationValidation.

The module's validation constants include bearer and account-ID character patterns, HTTP header-name syntax, ASCII control-character rejection for header values and an HTTPS origin pattern for openai.com, chatgpt.com and their staging domains. The controller/state strings evidence restore, interactive sign-in, access-token authentication, account choice, sign-out, foreground admission, operation generations, cancellation, revalidation, secure save/clear and expiry cleanup. The secure store is Android-native, foreground-gated and unavailable below Android API 23 in the observed source strings; it fails closed if secure native storage is unavailable. These are static compiled-module findings, not decoded method bodies or live sign-in behavior.

### Implementation

Added private `src/chatgpt/android-auth-validation.cjs` with the five pure predicates and `tests/android-auth-validation.test.cjs` with seven deterministic test cases. It is added to syntax checks and the distribution archive. It does not store credentials, call native Android authentication, select accounts, build requests, authenticate a user, or use the network. It also does not port `isSafeOriginRelativePath`; exact path semantics remain unverified.

### Next Android non-Work priorities

1. Disassemble the validation predicates (including flags) and origin-relative path check before any use in a network transport.
2. Reconstruct the account-check method and full response schemas.
3. Decode OAIAuthenticationController and native credential callbacks, including foreground/operation-generation/cancel semantics.
4. Decode encrypted secure credential storage and token rejection/renewal flow. Define a portable ChatJS secure-storage adapter only after the exact lifecycle is understood; no plaintext fallback.
5. Continue tracing DPoP/account switching and the independent accountless guest HTTP protocol. Do not conflate authenticated AuthSession with anonymous SessionManager state.

Android Work, Windows/Desktop and Codex CLI remain parked only for execution sequencing; the full three-family product goal remains unchanged.
