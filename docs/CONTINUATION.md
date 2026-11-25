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
- Exclude health, finance, maps, navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions.

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

New evidence is in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`: DirectResponseClient conversation/message field inventory; generated model and Sentinel decoder names plus primitive validation strings; event delta operations, entity-reference spans, handoff/resume identifiers; upload metadata keys, Azure block-blob PUT headers and trusted storage suffixes. The field inventory is not a complete schema. Object nesting, requiredness, route selection, exact resume mapping, maximum handoff count and upload numeric limits remain unknown. Do not implement a guessed request builder.

Next: decode Valdi bytecode/control flow for DirectResponseClient prepare/send and generated decoders; decode stream event/resume branch; recover upload constants and reservation response layout. Continue the independent guest-session HTTP search and preserve first-party integrity requirements. No production behavior changed in this slice.

## Owner clarification — one ChatJS client, three source families (2026-11-25)

The owner explicitly clarifies that ChatJS is simply one ordinary Node.js client module that brings ChatGPT mobile + ChatGPT desktop + Codex CLI together as one singular all-in-one ChatJS package. This is the permanent product identity. Implement the source/client capabilities inside ChatJS rather than creating a new application/platform or requiring multiple external products. The Codex CLI capability family is in scope; its executable and app-server are not runtime prerequisites. ChatGPT is the only AI service target. Keep Android cloud Work, Windows local Work and Codex CLI's own coding-client behavior distinct internally, even though the user consumes them through the same Node.js package. Optional adapters are for host facilities, never alternate AI providers.

The accepted high-level quality direction remains in PRODUCT_STANDARD.md sections 1 and 14. Current implementation remains foundation-only; no real ChatGPT/Codex client operation is implemented yet.

## Latest handoff — Codex CLI protocol research (2026-11-25)

The pinned Codex source snapshot now has a concrete source map for the ChatGPT Codex Responses transport/auth/stream and the CLI JSONL event contract. See `CODEX_SOURCE_FINDINGS.md` and the latest Codex section of `CHATGPT_CAPABILITY_INVENTORY.md`.

Next, trace the full core Responses builder and transport selection; request/session ID lifecycle; ChatGPT OAuth refresh/account-switch handling; full SSE/WebSocket events and recovery; tool/approval/result continuation; and local workspace/process/patch/MCP semantics. Implement these natively under ChatJS, without spawning the CLI or app-server. Codex credential-less configuration is not the ChatGPT guest session. No live requests or credentials were accessed, and no Codex feature is implemented in ChatJS yet.

## Latest handoff — Codex local tool runtime and security model (2026-11-25)

The pinned Codex CLI source now has a first-pass local tool/runtime map in `CODEX_SOURCE_FINDINGS.md`: interactive `exec_command` and `write_stdin`, one-shot execution, path-URI workdir and executor selection, explicit sandbox/approval states, session-scoped approval caching, verified `apply_patch` routing, and MCP server/tool readiness and dispatch. The native ChatJS implementation must reproduce required semantics rather than spawn or embed app-server. It needs explicit optional filesystem/process/PTY/sandbox/network adapters and cannot auto-approve or bypass human decisions.

Next: trace remaining local tool/security source paths (filesystem operations, sandbox and networking, patch atomicity and MCP lifecycle); meanwhile continue the full Codex Responses WebSocket/auth/event mapping and Android Valdi bytecode inspection. Preserve distinct Codex, Windows Work Local and Android Work Cloud engines. No production behavior is implemented.
