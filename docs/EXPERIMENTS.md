# ChatJS Experiments

Chronological record of meaningful technical experiments and product research, including successful, failed, inconclusive, and withdrawn directions.

## Record format

For each investigation include question, setup/method, actual result, conclusion, limitations, and follow-up. Never record credentials, session secrets, or personal account content.

## Repository foundation

### CommonJS and ESM entry points

- Method: built-in Node test runner requires CJS and imports ESM.
- Result: prior CI passed both formats and archive extraction/loading for the foundation.
- Conclusion: verified for foundation only.
- Next: preserve parity tests as exports expand.

### Generated docs and archive

- Method: generate PROJECT_STATE.md from project-state.json; validate local Markdown links; build USTAR+gzip with Node built-ins; verify allowlist/content; extract and smoke-test.
- Initial issue: archive test treated ChatJS/ directory entry as a file. Corrected to skip validated directory entries and compare file content.
- Result: prior CI passed archive integrity, extraction, CJS/ESM tests and artifact upload.
- Conclusion: verified for the foundation package.
- Next: keep checks and allowlist.

## Client reference research

### Android APK extraction

- Source: owner-supplied ChatGPT.zip containing base.apk.
- Result: personal Library archive `/ChatJS-Archives/ChatJS-Android.zip` contains the complete extraction of 4,987 APK payload entries plus README and JSON inventory (4,989 ZIP entries total), 59,454,036 bytes.
- Inventory: 106,501,945 uncompressed payload bytes, ten DEX files, 121 compiled Valdi modules.
- Verification: ZIP CRC test passed 2026-11-20.
- Limitation: source-level DEX/Valdi analysis, request tracing, auth/session tracing, and behavioral tests are not complete.
- Follow-up: inspect selected modules and record source paths, payload models, request transport, and client behavior.

### Windows MSIX extraction and archive status

- Prior inspection: AppxManifest.xml, package listing, Electron ASAR metadata, and component paths/names.
- Prior Chat-1 transcript reported a remote extracted ZIP of about 1.1 GB and 3,758 entries, with a SHA-256 value and successful remote integrity check. Transfer to the personal Library was incomplete.
- Current Library item `ChatJS-Windows.zip` was materialized on 2026-11-20: 418,238 bytes, seven entries, metadata/indexes/notices only.
- Conclusion: current Library item is not the full application payload archive. The larger remote result is not reverified in this session.
- Follow-up at the time of this 2026-11-20 record: deferred at the owner's request. This historical status was superseded on 2026-11-25 when the owner supplied both installer pieces; see the later **Windows MSIX / ASAR local execution inspection** entry.

### Earlier mistaken scope and superseded integration exclusions

- Earlier project records incorrectly described ChatJS as a local-only feature reference and prohibited studying or implementing the real ChatGPT client service connection.
- The owner corrected this in Chat.json and Chat-1.json: the client-side implementation material in the supplied packages is exactly what ChatJS must use; reproducing the client does not require server-side source.
- Current direction: implement the real consumer ChatGPT client behavior from the shipped code, including requests, payloads, transport, and legitimate auth/session flows. Do not substitute OpenAI Platform APIs/keys or fake/model output.
- This entry supersedes the earlier "no ChatGPT account-client integration" assumptions. Protect user authorization and credentials; no bypassing access controls or secret leakage.


### Android Valdi client protocol scan — 2026-11-20

- Method: extracted selected `.valdimodule` members from the full Android ZIP, decompressed their Zstandard frames, and inspected embedded module identifiers and strings.
- Observed: generated account-check and model/chat-requirements API clients; account/session services; bearer/account transport headers; native/encrypted credential-store components; WebSocket and authenticated transport; conversation direct-response adapter; SSE/direct/polling streaming clients, processors, event decoder and handoff/resume strings; file upload/process/Estuary requests; conversation history/pins/download; image gallery/bootstrap; Library file/node/bookmark/directory clients.
- Request path/module/header details are recorded in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`.
- Conclusion: the Android package contains real client-side request, session, transport and service implementation material; it is not just a feature-name list.
- Limits: static decompressed string/structure scan only. Full method/call-graph reconstruction, exact serialized bodies and response schemas, credential/session lifecycle, device-integrity/Sentinel behavior, SSE state transitions, upload signing/retry logic and live account tests remain outstanding.

## 2026-11-24 — Current Android XAPK integrity-provider reconstruction

- Source: supplied ChatJS Project → Sources file ChatGPT-Android.xapk, package version 1.2026.321 / version code 2632129.
- Integrity: XAPK ZIP CRC passed; the 123,574,190-byte source SHA-256 was independently recomputed and matched the recorded provider hash 22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d.
- Inventory: base APK ZIP has 5,080 entries, ten DEX files and 111 compiled Valdi modules. All 111 modules decompressed successfully (77,451,888 decoded bytes). This is a newer source snapshot than the historical 121-module extracted archive.
- Method: inspected Valdi decoded strings/module identifiers; parsed selected DEX class, field, method and partial invoke/constant references for the native device-integrity classes.
- Observed: separate requirements/device-integrity provider abstractions; requiresDeviceIntegrity conversation gating; native DeviceIntegrityRequest/Response and cancellable task contract; account/conversation-scoped request fields; Android Google Play Integrity token generator; challenge retrieval, POST /backend-api/playintegrity JSON key/header/Set-Cookie identifiers; persistent app-private device_id preference; retry/cooldown and failure paths.
- Architecture conclusion: host environment context, client-install identity and genuine first-party attestation are distinct. Android Play Integrity is not a synthetic generic device profile and must not be claimed by Windows/Linux hosts.
- Limits: this was static package/Dex analysis, not full decompilation or a complete call graph. Exact challenge/nonce schema, request-body serialization, app_attest_challenge semantics, token binding, cookie contract, body patch/header merge, device ID generation, internal package path selection and desktop equivalence remain open. No authorized live account request was made. No runtime feature was implemented.
- Next: continue source-level trace of the providers and exact schemas; use fixtures only in tests and keep genuine integrity unavailable states explicit.

## 2026-11-24 — Standard Integrity request hash, origin and cookie validation trace

- Source: ChatGPT Android 1.2026.321 XAPK in ChatJS Project → Sources; targeted DEX disassembly of Lxwf.f, Lxwf.v, Lxwf.w, Lxwf.y, DeviceIntegrityService, native provider a.run, and the Standard Integrity wrapper classes.
- Exact second request hash: canonical JSON field order account_id, conversation_id, device_id, parent_message_id; escape string values; UTF-8 encode; SHA-256; lowercase two-digit hex per digest byte. The caller passes account ID, device UUID, conversation ID and parent-message ID to this helper.
- Provider: Google Play Standard Integrity warm-up/prepare-integrity-token and request-express-integrity-token path. Provider preparation and token requests wait up to 30 seconds. The helper caches the provider and re-prepares/retries once on its provider-invalid error path. Other failures propagate.
- First request nonce: 256 random bytes from SecureRandom, Android Base64 URL-safe/no-wrap encoding. It is used as the request hash for the initial Standard Integrity token.
- Endpoint security: HTTPS only; exact or subdomains of openai-staging.com, chatgpt-staging.com, openai.com and chatgpt.com; no userinfo, explicit port, base path, query or fragment. Relative path only.
- HTTP: POST JSON, bearer and account/client/device/package/user-agent headers, redirects disabled, 30-second connect/read timeouts, 2xx accepted, 8 KiB streaming reads and 256 KiB body cap; cancellation disconnects active connection.
- Cookie: parsed Set-Cookie values; name suffix _playintegrity, non-empty value, Secure, unexpired, first-party-domain validation, backend API endpoint path allowlist. Missing path defaults to /backend-api; other path rules are validated against the known conversation/chat-requirements routes. Compatible default CookieManager reused; absent handler created with ACCEPT_ORIGINAL_SERVER; incompatible handler fails closed.
- Native service: async cached-executor work, main-thread Handler completion, explicit cancellation, request constructor order accountId/accessToken/baseUrl/conversationId/parentMessageId, response constructor order bodyPatchJson/headerNames/headerValues.
- Limits: partial custom bytecode disassembly, not a full decompiler. Exact OpenAI wrapper rate-limit/backoff matrix, cookie exact name/expiry/deletion, public-build selection, Valdi header application, app_attest_challenge and live service validation remain unresolved. No live account request or ChatJS runtime implementation was performed.

## 2026-11-24 — Standard Integrity retry classification and local cooldown

- Source: Android 1.2026.321 classes2.dex; selected methods in com.openai.integrity.impl.g, Lxrf0, and Lhm00.
- The SDK's retry-classification list contains status integers -19, -18, -12, 0, -100, -8, and -9. g.c(PlayIntegrityException) also checks another feature/configuration boolean, so membership is not an unconditional retry decision. The token coroutine has additional status branches, including -15 and -14; full branch semantics remain open.
- Lxrf0 initializes a default duration using 300 with the SECONDS unit. The wrapper gates token generation while the local TOO_MANY_REQUESTS cooldown is active and surfaces cooldown_remaining_ms; its error text explicitly says generation is skipped while the client is cooling down.
- DeviceRateLimits is a named SDK data store. Its methods read records, discard expired entries, filter/sort and remember updates, with explicit failure paths. Its schema, scope, persistence/retention and relationship to the separate cooldown marker remain unresolved.
- The SDK assembles diagnostic metrics/counters (initialization_retry_count, token_retry_count, lifetime_integrity_initialization_count, Play Services/Store metadata). These must not be exported by ChatJS under the zero-telemetry requirement; only genuine functional retry/cooldown semantics are in scope.
- No live account request, provider invocation or ChatJS implementation was performed. No attempt/backoff ceiling is claimed.


## 2026-11-24 — Generic direct-streaming parser

Implemented src/sse.cjs as a Node.js async-iterable byte-stream parser, exported from CommonJS/ESM and typed in types/index.d.ts. It decodes split UTF-8 sequences; processes CR, LF and CRLF; implements data/event/id/retry and comment/unknown-field handling; bounds line and total event bytes; accepts AbortSignal; and closes the underlying async iterator on abort or early consumer termination.

The regression suite covers multiline payloads, persistent event IDs/retry state, split CRLF, BOM and multibyte UTF-8, ignored NUL IDs/invalid retries, unterminated EOF records, line/event limits, non-byte chunks, abortion and stream cleanup. An additional memory-bound test verifies repeated empty data fields count toward the event limit. This parser is not a live transport, reconnection mechanism or ChatGPT-specific event decoder.

## 2026-11-24 — Official Codex source and direct transport boundary

Downloaded and uploaded the pinned official openai/codex source ZIP (commit 50aeac27d825007a0ac6bd846087ed4e7095bdb3). Source inspection found codex exec starts InProcessAppServerClient, so it embeds app-server internals. The source also contains a direct ChatGPT Codex Responses backend client (backend-api/codex/responses) using HTTP SSE and WebSockets, OAuth-derived bearer/account/session metadata, and request models/events. ChatJS will not wrap the CLI/app-server; this remains source evidence for independent direct Node.js first-party communication. Upstream analytics are explicitly excluded.


## 2026-11-24 — Android anonymous-session method and storage trace

A second method-level DEX pass over the supplied public Android 1.2026.321 XAPK traced selected client methods beyond the earlier anonymous string inventory. Lvr71 is the Unauthenticated / AnonymousSession / LoggedInSession enum. Lov31 is the serialized session metadata record; its generated Lmv31 serializer declares userId, isAnonymous, authSessionId, anonymousSessionId, retiredGuestSessionIds, legacyGuestPreferencesOwnerId, guestPreferencesInitialized, deniedLegacyFileDirectories and pendingReplacement.

Lau31 constructs a logger tagged SessionManager and launches the Lis31 startup coroutine. The coroutine has explicit unsupported-guest logout and unauthenticated-session refresh error paths. Lau31.F is a post-logout anonymous-start attempt that evaluates a value through Lof70.G before calling the Lau31.E transition and logs a dedicated failure if the attempt fails. Lof70 is the Statsig/experimentation interface, not an auth/session provider. The final guest create/refresh network route and payload were not reconstructed.

Lgv31 tags itself SessionStorageCleanupImpl. Its coroutine resolves and validates the sessions directory, reads user_id and pending_credential_deletion metadata, recognizes guest-prefixed entries, validates guest IDs as single path segments, uses retired session-related sets and has a dedicated retired-session-storage deletion error path. It separately removes legacy account DB/preferences. Lxzp0 also constructs sessions/guest-<id> storage paths via the app file-system layer; the full ID-generation and retention policy remain open.

The earlier anonymous URL constants were re-attributed: Lx4k0 logs LocationCookieInitializer; Lcl00 maps remote user settings locationPermissionCookieSettings and invokes the location-cookie initializer, which uses the constants and a lower-level Lgnw request interface. These paths are not proven to be the guest message composer routes. This distinction has been added to the Android findings/open questions. Static analysis only; no live session request, token creation, or ChatJS integration was attempted.


## 2026-11-24 — Android post-logout transition and guest path helper

A further public-XAPK DEX pass narrowed the post-logout guest flow. Lau31.F evaluates a Statsig/experimentation value through Lof70.G, constructs the transition input and invokes Lau31.E. Lof70 is not an auth/session provider. The inspected Lau31.E body calls the Lv2f0 initial-session resolver and Lvv31 session store/DataStore methods to read, update and checkpoint session metadata, along with SessionManager state transitions. Lau31.l reads the serialized Lov31 record from the session DataStore and constructs a Lzk8 selection/context record from opaque strings, a boolean and a set. No HTTP client/request builder/anonymous session creation URL was identified in these coroutine bodies. This confirms a local lifecycle/state transition, not the missing service-side creation/refresh operation.

Lxzp0.invoke constructs a path below sessions/ with guest- prefix, joining two values from Lks31 and a two-string Lxk8 record with a hyphen, then passes it through the app FileSystem/session-storage helper. The values semantics, generation, entropy and server origin remain unknown. Ld1d1.b checks a candidate path against filesystem and local credential/session ownership state. Do not call the guest path a UUID or infer server token semantics.

A UI method references AnonymousSessionLoading; its direct DEX caller/callback to SessionManager was not identified. The phrase "Continue as Guest" was later traced to the Shop plugin model Li230, not ChatGPT guest UI; see the 2026-11-24 attribution correction below. Static analysis only; no live API call or ChatJS integration was attempted.


## 2026-11-24 — Android anonymous backend roots, profile descriptor and Shop-string correction

DEX inspection of Lp6t.<clinit> identified the Android first-party roots https://android.chat.openai.com/backend-api/ and https://android.chat.openai.com/backend-anon/. Lvwo0.invoke reads both and passes them into a global Lar31 network configuration along with platform/service roots and host metadata. Lyzo0 accepts relative request paths prefixed by /backend-api/ or /backend-anon/ in its path validation/interceptor. This establishes anonymous backend infrastructure and generic path acceptance, not an actual guest session-create route or composer send endpoint.

Lr10.<clinit> creates a local profile descriptor stored in Lr10.l with Lzk8("id", "anonymous-session", false, emptySet); it also creates profile descriptors using Lxk8("id", "id-session"). Lzk8 and Lxk8 are local value records. Lqz8 (logger tag QrLoginApi) accepts an Lr10 profile and checks Lr10.a(). The trace supports an anonymous-session-labelled local config/profile, but does not identify a server-issued guest token, ID algorithm, or network request.

Important correction: "Continue as Guest" is not a ChatGPT guest-entry CTA. It is initialized by Li230, a serialized Shop plugin UI model whose sibling labels include plugin_shop, shop, Shop, product-search/checkout text, Checkout, and Log in with Shop. AnonymousSessionLoading is a separate Compose method Losk1.a; the direct DEX call-reference pass found no caller linking it to SessionManager. Remove the previous assumption that the Shop phrase represented the ChatGPT guest UI.


## 2026-11-24 — RootViewModel initial guest fallback call ordering

Method-reference and selected coroutine inspection identify Lma11 as a RootViewModel-tagged class. Its initialization coroutine attempts an install-referrer/account-selector login through Los8.f; that method routes through Lpjk0 and Lgkk0 (logger tag LoginGraphManager), passing the AccountSelector mode. The failure is logged separately as "Failed to start install-referrer account-selector login". The coroutine then invokes Lgs31.b, which delegates to Lau31.G and reports "Failed to start the initial anonymous session" on failure. This establishes two separate sequential attempts: account-selector login first, initial anonymous-session fallback second. Los8.f is not the guest-session create request.

Lgs31.b calls the SessionManager initial path Lau31.G. The inspected G coroutine proceeds through a suspend helper Llzx.n and then SessionManager local state/transition work including Lau31.E; the precise behavior behind the helper and any concrete network operation it might delegate to remain unresolved. Keep the guest create/refresh route and request schema open.


### 2026-11-24 — SessionManager.G suspend helper inspection

Followed the initial anonymous fallback one level deeper. Lau31.G calls Llzx.n, which constructs/runs Lwk8.invokeSuspend. The coroutine reads local model/session fields, iterates model-associated collections, consults configuration/feature records (including Q2u/Uwd1- and Wyr0-related values), and compares the current session-state value. The inspected call graph contains local model/collection/feature operations only; no HTTP client, request builder or URL constant is referenced. Lau31.G then proceeds into its SessionManager transition. This narrows the missing guest-create request to an untraced injected auth/session dependency or another call site; it is not present in the inspected helper itself. The obfuscated model field names are not assigned business meaning beyond the observed access pattern.


## 2026-11-24 — SessionManager dependency/coordinator boundary trace

Inspected Lpb11 (logger tag RootSessionCoordinator), Lq5d1 (UserScopeManager), Ldrk0 (LogoutCleanupCoordinator), Lsk8 (AuthRepository) and Lcn8 (AuthStorage) in the supplied Android base DEX. The root coordinator receives the session manager, user-scope manager, logout cleanup coordinator and session-related state/sets. Logout cleanup orchestrates local credential/session storage and calls the guest storage cleaner; it explicitly distinguishes retired authenticated storage from retired guest sessions. AuthRepository delegates to application-backed AuthStorage and the inspected methods resolve, persist, migrate and remove local credentials/session metadata. No actual guest HTTP create/refresh route or request builder was exposed in these methods.

A deeper read of Lau31.G shows it first acquires Lmgo0 through Lmgo0.a, which is a coroutine Mutex.lock operation; this serializes concurrent initial anonymous-start transitions. It then runs Llzx.n/Lwk8 local session/model/feature evaluation, reads local session context via Llzx.u, and enters Lau31.E. The inspected manager/coordinator/storage call paths are local synchronization, selection, credential storage and cleanup, not the missing server-side guest session creation request. Keep the guest endpoint and schema unknown.


### 2026-11-24 — Disambiguating another backend-anon cross-reference

The additional DEX class Lxi80 was initially a possible guest-network lead because its shared request helper references both /backend-anon and /backend-api. Method inspection identifies it as a Files API client: it exposes file download, upload reservation claim/finalization, upload-processing and file-indexing status handling (file.processing.*, file.indexing.*), plus FileServiceException/FileDownloadError paths. Its request helper is shared path/transport handling for the file client. This is not the guest SessionManager create/refresh API or guest conversation composer. Keep it out of guest-route attribution.


### 2026-11-24 — QR-login endpoint attribution for the anonymous-session profile

A final DEX cross-reference clarifies the Lr10 profile consumer. Lqz8 carries the logger tag QrLoginApi, accepts an Lr10 profile/config object and consults its selected profile state. The corresponding QR-login flow references /backend-api/qr-code/details (Lj32 coroutine) and /backend-api/qr-code/action (Lj1v0 coroutine), with QR login review/approval UI. These use the authenticated backend-api route family and belong to QR sign-in/review/approval, not guest conversation create/refresh or message send. The local anonymous-session descriptor passed into QrLoginApi is not proof of a server guest token or guest chat route. The server-side guest create/refresh operation and composer endpoints remain untraced.


## 2026-11-24 — Corrected SessionManager dependency identities and refresh boundaries

The initial attribution of Lof70 as an auth/session provider was wrong. The interface is experimentation/Statsig: Lmx71 logs StatsigManager and initializes Experimentation; Lbu70 logs FakeExperimentManager. Lau31.h and the Lof70.G call in Lau31.F are feature/experiment dependencies. They do not read account or guest session state. The Lma11 and Lq5d1 Lof70 fields likewise should be interpreted as experimentation/feature-gate injection.

The Lis31 coroutine's Failed to refresh the unauthenticated session path obtains the current local snapshot with Llzx.u, constructs/passes an Lal8 state record to Lau31.u, and applies Lau31.E/Lau31.r local SessionManager state logic. The inspected Lau31.u call graph has no HTTP client, route or request builder. The log message is the name of a local session-state refresh/reconciliation path, not proof of a server request.

A separate Lks31 (AuthSession, SessionLogin) coroutine calls Lau31.n → Ldt31, which uses Lsk8 (AuthRepository) and Ld7x (CredentialsRepositoryImpl) for credential-backed token work, including DPoP and missing/invalid refresh credential handling. This is an authenticated credential/session path and has not been shown to create or refresh the accountless guest session. Keep the three roles distinct: Lof70 = Statsig; Lvv31 = local session DataStore; Lsk8/Ld7x = account credential/token path.


## 2026-11-24 — Guest welcome-presentation preference and UI mapping

A follow-up DEX trace found a distinct ChatGPT welcome-presentation model, separate from the Shop plugin's similarly named copy. Lnlh1 is the generated Kotlin serializer for Lplh1, the actual welcome-presentation model with fields including ctaStyle, guestCtaCopy, hideLoginButton, showGoogleCta and presentation/disclosure configuration. Lylh1 is a separate local enrollment record.

The WelcomeLanguageEnrollment manager receives Lzlh1, a PreferenceStore subclass using the global_ preference namespace. The inspected manager path accesses the typed value through local preference-store methods; no HTTP client/request builder was identified there. Lvlh1 reports an anonymous_welcome enrollment event. Lxr10 maps the nested guest CTA copy and flags into welcome/composer UI state, using Statsig/feature-gate decisions and a special skip value.

This is positive evidence for a ChatGPT anonymous-welcome presentation/configuration surface and its UI-state consumption. It does not identify where the preference is initially populated, whether that population is remote or locally seeded, the guest CTA click callback, or whether the callback invokes the initial SessionManager guest fallback. It does not expose the actual anonymous create/refresh or composer send request. Do not treat the event as a ChatJS telemetry requirement; ChatJS must not collect telemetry.


## 2026-11-24 — Welcome CTA action-29 path into login-child coordinator

A method-level DEX pass now follows the welcome CTA beyond its click closure:

- The observed UI path is Li96 action 29 → Lgs10 event → Ltu10 welcome view-model → Lqik0 onboarding event → Lnik0 login-child coordinator.
- Lnik0 is constructed with both Lks31 (the current AuthSession wrapper) and Lgs31 (the anonymous SessionManager), as well as Los8 and Lpjk0 (LoginGraphManager). This proves the login-child subsystem has access to both authenticated and anonymous session state; constructor injection alone does not prove which action is performed.
- Llzx.t(Lgs31) is a local state getter: it obtains the current Lks31 wrapper from the SessionManager's local state/flow. It does not construct or issue a network request.
- The Los8 coordinator checks a UI/feature condition (Ltpk0.d()). One branch collects the login-flow event stream through Lgs8/Lfet0; the alternate branch launches LoginGraphManager via Ljil1.c(...).
- The event collector obtains the current local session wrapper through Llzx.t and passes typed Lir31 events to Lau31.i.
- Lau31.i runs Lxs31, acquires the SessionManager coroutine mutex Lmgo0, rereads the current local Lks31 state, evaluates the session variant and event, derives a local session/UI status via Lau31.w, then applies the local wrapper/state transition through Lau31.r. The inspected methods contain no URL, HTTP client, request builder, or guest token exchange.
- The flow model includes Lwnk0 values Login, Signup and CombinedLoginSignup. The navigation/entry-point model Lfh8 includes multiple login surfaces such as Modal, FullScreen, LoginPage, AnonymousSideBar, LoginMenu, LandingScreen, WelcomeDisclosure and AccountSelector. These are login/onboarding UI-flow types, not guest-create protocol names.

**Conclusion and evidence boundary:** the welcome CTA click is traced into the login-child/onboarding coordinator, which reads current local auth/guest session state and processes login-flow events using local SessionManager synchronization/state reconciliation. The trace does not prove that action 29 invokes the initial anonymous-session fallback Lgs31.b → Lau31.G, creates a new guest session, or sends a server request. That initial fallback remains a separate observed path. The actual guest create/refresh HTTP operation and anonymous composer prepare/send routes remain unidentified. Preference population for Lzlh1/Lylh1 also remains unresolved. No ChatJS runtime behavior is implemented by this source research.


## 2026-11-24 — Additional event-gated caller of initial guest startup

A targeted DEX call-site trace followed a second invocation of the SessionManager guest-start wrapper. Lej6.invoke() constructs La991 with an AuthSession wrapper (Lks31), a state-flow dependency, a callback and related login/session dependencies. Its G(Louf0) handler compares the incoming event to Lw891.a and checks a Lcq41.e predicate; the matching branch launches Lmuz0 coroutine branch 9. That branch handles a ChatgptClientMarkerUserSessionBootstrapRequestType marker, invokes a callback held by La991, and calls Lgs31.b, which delegates to Lau31.G.

This is a second event-gated caller of the local anonymous-session start transition, distinct from the RootViewModel startup call. It does not establish the event's semantic meaning or producer, and no call edge connects it to the welcome CTA action-29 → Lnik0 path. The marker is client instrumentation and is excluded from ChatJS. The underlying Lau31.G methods examined so far still expose mutex/local-state/DataStore work rather than a guest HTTP create route; server-side session creation and composer-send remain unknown. The scan used selected DEX method/call-site inspection and is not a complete decompilation.


## 2026-11-24 — Correction: Lt891 is the local guest-start dispatch event

A finer instruction-level decode corrects the previous La991.G branch summary: equality with Lw891.a routes the current Lw4h0 value through Lcq41.e and returns. The branch that launches Lmuz0 label 9 is a separate `instance-of Lt891` test. That coroutine invokes La991.R1, reads Lt891.a, constructs an Llnp0 value and calls Lgs31.b → Lau31.G. This is a local SessionManager guest-start path, not the guest HTTP create operation.

Two Lt891 constructor paths are observed. Lq20.invoke emits Lt891(5) through a captured Function1; Lq20 is constructed by Llal1.h and Lej10.c, with the ultimate callback target unresolved. Ldo1.invoke selector case 18 can emit Lt891(6) through a captured Function1 when its inspected Lh70 value is null; this callback is constructed from Lp1w.invoke, and Lp1w is constructed by Le2w.e (a UI component containing the ConversationSidebar label). These callsites are candidates only: neither callback is proven to reach the particular La991.G instance at runtime. The event's producer/semantics, values 5/6, and link to the welcome CTA action-29 path remain unknown. The marker name observed in the coroutine is instrumentation and excluded from ChatJS. No guest HTTP create/refresh or composer-send schema was found.


## 2026-11-25 — Upstream callback ownership for Lt891 candidate events

Followed the two generic `Function1` callback paths from their emitters to the enclosing Android UI callers:

- `Lq20` receives its callback at construction; callsites are `Llal1.h` and `Lej10.c`. The WebView-host route `Lej10.c` receives the callback from `Ljpc.invoke`, which forwards captured object fields. The separate `Llal1.h` callers are `Lj20.invoke`, `Lss.invoke`, `Lt07.invoke`, and `Ly641.a`.
- The `Ldo1` callback is passed by `Lp1w`; `Lp1w` stores the `Function1` supplied to `Le2w.e`. That composable is called by `Ll1w`/`Lq1w` wrappers created from `Le2w.j`; parent callsites include `Lx0w.invoke` and `Lm1w.invoke`, with `Lx0w` created in `Le2w.c`.
- Both callbacks remain generic parent UI parameters. Across all ten DEX files, no direct method reference or method-handle entry to `La991.G(Louf0;)` exists outside its definition; the only declared field of type `La991` is `Lz891.q`. Reflection or dynamic behavior was not ruled out, so this is a static-evidence boundary, not proof of runtime impossibility.
- `Lt891(5)` and `Lt891(6)` payload semantics and the ultimate `Function1` implementations remain unknown. The welcome CTA action-29/login-child path is still separate. Neither candidate establishes the guest HTTP create/refresh or composer-send protocol.

The next static target is the callback argument supplied by the parent `Llal1.h`/WebView wrappers and by the `Le2w.c`/ConversationSidebar rendering inputs; retain the unresolved status unless an actual callback implementation is recovered.


## 2026-11-25 — Generic ViewModel intent bridge

A follow-up DEX inspection found `Lv6a.H(Louf0)`, which invokes virtual `G(Louf0)` on the receiver. Since `La991` extends `Lv6a`, a callback capturing that receiver through the base bridge could dynamically invoke `La991.G`; the absence of a direct method-id reference therefore does not rule out callback dispatch. Generated `Le6` captures a `Lv6a` and calls `H`, but its observed creation is in the Composer / FreeThinkingGaugeNuxHost path, not at either candidate emitter. The WebView (`Lq20`) and ConversationSidebar (`Ldo1`) callbacks are still generic parent Function1 values and are not proven to capture this `La991` instance. No guest HTTP request is found in this bridge.

## 2026-11-25 — Welcome-language opportunity local writer

Traced the local preference writer beyond the `WelcomeLanguageEnrollment` manager:

- `Le7f1.invoke` creates PreferenceStore key `welcome_language_opportunity` via `Lap6`, with `Lxlh1.serializer()` and default `Lylh1(null, false, null)`.
- `Lvlh1.c` is called by `Ltp3.P` and `Lslh1`; it launches `Ltl30.invokeSuspend`. That coroutine reads the current value with `Lzyv0.b`, gets `Lplh1` via `Lxr10.h(Lof70)`, checks Statsig flags and skip mode, gathers locale/app/user-install context, and constructs `Lcmh1` locally.
- The constructed record includes `no_local_prior_use_install_history_unknown`, current timestamp, enum/list values, locale/app strings, a feature config object and flags. The code persists an updated `Lylh1` using `Lzyv0.m` and `Lhi41` branch 19; that branch invokes `Lylh1.a(existing, new Lcmh1, ...)`.
- `Lvlh1.e` separately emits `anonymous_welcome`; that is instrumentation and is not a ChatJS requirement.
- Later `Lz840.d` / `Ljb40` account/profile repository work in the coroutine is a separate connector/profile branch, not evidence of the welcome presentation or guest session being fetched. No guest HTTP create/send request appears.
- This resolves the local enrollment record writer, not the origin of `Lnlh1.guestCtaCopy`. The `Lnlh1` presentation model and `Lcmh1` persisted enrollment record remain distinct; the remote/cache source of `Lnlh1` is still unknown.

## 2026-11-25 — Named Statsig inputs for the Android welcome model

The Lfs10 class initializer declares typed parameters welcome, welcome_skip_available, welcome_button_copy, welcome_language_presentation, welcome_language_suggested_tags, welcome_language_configuration_version, welcome_disclosure_use_combined_disclosures, welcome_disclosure_use_alternative_subtitle, welcome_disclosure_hide_subtitle, welcome_disclosure_shorten_accuracy_disclosure, and welcome_disclosure_guest_cta_copy. Lxr10.h(Lof70) reads these through the app-facing Statsig manager and constructs Lplh1. Lnlh1 is the serializer for that data model. The Ltl30 coroutine embeds the model in Lcmh1 and persists that snapshot inside Lylh1 / welcome_language_opportunity.

Lof70 is the app-facing experimentation interface and Lmx71 is its StatsigManager implementation. It wraps SDK state through Lix71 / Lzw71; getters read current evaluated parameter values, with a local SharedPreferences-backed override/default store (Llmt0). The actual upstream Statsig refresh endpoint, config response shape, refresh schedule, expiry and offline precedence are not identified. This is a first-party ChatGPT client feature-configuration path, not an inference provider. ChatJS must not port Statsig telemetry/exposure events or SDK reporting under the zero-telemetry requirement. No guest session or composer HTTP request is found here.

## 2026-11-25 — ConversationViewModel invokes guest SessionManager on a guarded message-error event

`Ljqk0` is the conversation coordinator and is constructed with both `Lks31` (AuthSession) and `Lgs31` (anonymous SessionManager), stored in fields `Q1` and `R1`. Its `G(Louf0)` event handler checks an `Lkmk0` event and a local callback/guard, then constructs shared coroutine `Lps30` with byte label 16 and launches it through `Lv6a.v`.

The `Lps30.invokeSuspend` packed-switch has 29 entries; decoded key 16 targets offset `0x350`, confirming the selected branch. That branch logs under `MessageStreamingService`, records `Conversation was requested with no messages, or all messages are unsupported`, constructs `MessageNotFoundException`, and emits a conversation error on `Ljl90`. It then reads `Ljqk0.R1` (`Lgs31`), uses the `Lkmk0` payload (`a` and `b`) to construct an `Llnp0` reason and `Lhr31` details, and calls `Lgs31.b(...)`.

This is a concrete conversation-feature event path into local guest SessionManager startup, not just an anonymous loading screen. It is still not the HTTP guest create/refresh request: the inspected `Lgs31.b` / `Lau31.G` path is local mutex/feature/eligibility/DataStore work. The `Lkmk0` payload semantics, numeric reason mapping, upstream trigger and whether remote guest creation follows remain unknown. Keep this path separate from the welcome action-29 and `La991`/`Lt891` paths.

## 2026-11-25 — Statsig SDK initialization and same-instance conversation callback

The Android Statsig SDK maps `Initialize` to `https://featureassets.org/v1/i` and `log_event` to `https://prodregistryv2.org/v1/e`. `Lzy71.g` builds an initialize JSON POST with `user`, `statsigMetadata`, `sinceTime`, `hash`, `previousDerivedFields`, and `full_checksum`. `Lbdb.z` applies JSON content type and SDK headers; `Lmy71` resolves the URL and executes the request. `PersistedInitializeResponse` (`Lslt0`) converts into evaluated gate/config/layer maps (`Lh3f0`) consumed by `Lmx71` and `Lxr10.h`.

`Lz381` restores `ondiskvaluecache`, local overrides and sticky device experiments. The response loader supports optional per-user caching via `Statsig.CACHE_BY_USER` / `Li1d1`. The separate `statsig.network_fallback` store retains fallback hosts for seven days and at most ten previous entries; this is not the response-cache TTL. `Lz381.s` takes a caller-supplied age, but the effective production default and offline precedence remain unknown. `log_event`, exposure reporting and offline event buffering are telemetry and excluded from ChatJS. RevenueCat's similarly named `GetRemoteConfig` classes are unrelated.

The conversation callback is traced through the same ViewModel receiver: `Lxjk1.f` creates `Llu2` with a captured `Lgqk0` conversation ViewModel; `Llu2.invoke` maps the event via `Lhkk1.t` and calls virtual `Lv6a.G` on that captured receiver. `Ljqk0` extends `Lgqk0`, so when it is the supplied receiver, dispatch reaches that same `Ljqk0.G`. Its guarded `Lkmk0` branch emits the no-messages/all-unsupported conversation error then calls local `Lgs31.b`. This makes the Compose-to-coordinator dispatch concrete, while `Lkmk0` business semantics and any HTTP guest creation remain unproven.

## 2026-11-25 — Android authenticated chat service module and Windows local agent host

### Android Valdi chat services

- **Question:** Did the shipped Android client expose a real authenticated conversation sender and its streaming/upload collaborators, separate from the previously observed local guest state paths?
- **Method:** Decompressed all 111 Valdi modules from the owner-supplied ChatGPT 1.2026.321 XAPK; inspected the `chatgpt_services` string/symbol table and cross-searched every decompressed module for `/backend-anon`, guest/session terms and conversation route strings.
- **Result:** Found `ChatGPTConversationApiClient.js`, `ChatGPTDirectResponseClient.js`, `ChatGPTStreamingWorkerRuntime.js`, `ChatGPTStreamingWorkerClient.js`, `ChatGPTStreamingResponseProcessor.js`, `ChatGPTStreamingProtocol.js`, `ChatGPTStreamingContracts.js`, `ChatGPTConversationEventDecoder.js`, `ChatGPTFileUploadService.js`, and `ChatGPTConversationHistoryClient.js`. The module contains the authenticated model/requirements routes, direct conversation route constants, bearer/account context, separate requirements/device-integrity providers, stream handoff/resume identifiers, upload/process routes and history routes.
- **Negative result:** no `/backend-anon` string was found in any of the 111 Valdi modules. This does not establish that no guest service exists elsewhere; it means the concrete authenticated sender found here does not resolve the guest route.
- **Conclusion:** a useful authenticated direct-chat protocol map exists, but it is not enough to implement a faithful request builder. Complete body schemas, direct event decoder logic, integrity provider behavior, guest routes and runtime tests remain open.
- **Privacy/safety:** no live network requests were made; no account data, token, or device identifier was collected. The observed telemetry header name is excluded from ChatJS.

### Windows MSIX / ASAR local execution inspection

- **Source:** the two owner-supplied Windows MSIX pieces, concatenated in order. Reconstructed SHA-256 `561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`; ZIP CRC test passed.
- **Method:** read Appx manifest and ASAR header/index; parsed 15,520 ASAR file entries and selectively extracted the package manifest, bootstrap chunks and app-server host bundle for static string/code-context inspection.
- **Result:** Appx identity is `OpenAI.Codex` v`26.1117.4957.0`, displayed as ChatGPT. The packaged Electron app is `openai-codex-electron`; it ships `codex.exe` and a host `StdioConnection.spawnProcess()` that launches the executable with piped stdio. The app-server RPC surface includes thread/turn operations and streamed item/command/file notifications. A distinct desktop fetch bridge restricts auth attachment to OpenAI/ChatGPT origins and identifies selected `wham` and Estuary path families.
- **Conclusion:** the packaged desktop coding-agent path uses a local Codex app-server subprocess; this is not an acceptable ChatJS runtime dependency and is not proof that every visible Windows Work feature maps to that same path. Keep Windows local execution distinct from Android cloud Work.
- **Limits:** no Windows app launch, login, request capture, signature verification, or end-to-end Work test. This is static package analysis only.

## 2026-11-25 — QuickJS disassembly feasibility for Android Valdi bytecode

**Question:** Can compiled Android Valdi methods be inspected as opcodes without relying on printable strings?

**Pinned source:** `Snapchat/Valdi` commit `f5bc2dcfcb880109c908e0675968cb532231ca71`, especially `third-party/quickjs/src/quickjs/quickjs.c`, plus the Valdi QuickJS context loader.

**Source observations:**
- `js_dump_function_bytecode` invokes the actual `dump_byte_code` decoder against a function's code buffer with variable/closure/constant-pool context.
- The ordinary `DUMP_BYTECODE` call-site is in compilation, not proof that serialized precompiled modules are printed.
- `DUMP_READ_OBJECT` adds byte-oriented trace output to `JS_ReadObject` and `JS_ReadFunctionTag`.
- `JS_ReadFunctionTag` reconstructs function metadata, opcode buffer, debug metadata, then the constant pool. A temporary build can call `js_dump_function_bytecode` after constant-pool loading to decode the already-serialized function.

**Android runtime evidence:** the supplied `config.arm64_v8a.apk` includes stripped 8,817,776-byte `lib/arm64-v8a/libopenai_xplat_export.so`; static ELF/string inspection finds QuickJS and Valdi runtime class names. No useful exported dump/reader symbols were present in the inspected dynamic symbol table.

**Result:** a temporary, source-matched QuickJS analysis build appears feasible in principle and is a stronger path than a generic upstream `qjs` CLI or string scan. It must retain the exact Valdi fork/build profile and parse the existing Valdi wrappers correctly.

**Unsuccessful/blocked step:** no source checkout or compatible QuickJS binary is installed in the analysis runtime. The GitHub connector returned an empty body for the large `quickjs.c` source file, and Firecrawl provided targeted source excerpts rather than a complete build tree. GCC is available, but the QuickJS source/dependency tree and build context are not. No compiler command ran and no method dump was produced.

**Next experiment:** obtain the exact source tree/revision and build settings; patch only a temporary copy of `JS_ReadFunctionTag` to dump functions after constant-pool deserialization; run against selected module entries without invoking the resulting function bodies; validate the dumper on a known compiled fixture before analyzing ChatGPT methods.


## 2026-11-25 — Android Valdi QuickJS bytecode reader built and exercised

**Status:** successful analysis tooling; temporary only, no production/runtime integration.

**Pinned source:** Snapchat/Valdi commit `f5bc2dcfcb880109c908e0675968cb532231ca71`, QuickJS version `2021-03-27`, source file `third-party/quickjs/src/quickjs/quickjs.c`. The exact reader source was retrieved from the pinned repository. The analysis copy inserted `js_dump_function_bytecode(ctx, b)` immediately before the successful return from `JS_ReadFunctionTag`, after the serialized function's constant pool had been restored. This is the necessary read-side hook for precompiled Valdi modules; the normal `DUMP_BYTECODE` hook is compilation-side.

**Build:** GCC temporary build with `-O2 -DDUMP_BYTECODE=1 -DCONFIG_VERSION="2021-03-27" -D_GNU_SOURCE`, compiling `dump.c quickjs.c cutils.c libregexp.c libunicode.c libbf.c` and linking `-lm -ldl -lpthread`. No dependency or build file was added to ChatJS. The harness is deliberately limited to `JS_ReadObject(..., JS_READ_OBJ_BYTECODE)`, object disposal and runtime cleanup; it never calls `JS_EvalFunction` or executes a module function.

**Payloads decoded successfully:**

- `ChatGPTDirectResponseClient.js`: 24,963-byte bytecode payload, SHA-256 `e3ff57394f265f47c9a6a651e97d1f7fc752183ed06482c1de0bf8e0d2caa4ef`, 66 decoded function bodies.
- `ChatGPTConversationApiClient.js`: 9,050-byte payload, SHA-256 `cee4c14430b8527d1b3572dcd44d1e3317ca32f0647c415e833ee4d138c77f74`, 56 decoded function bodies.
- `ChatGPTConversationEventDecoder.js`: 14,503-byte payload, SHA-256 `77964ad085e01f1366658a40c60f063933dec6c429baad1c475241a59ee80e48`, 22 decoded function bodies (2,180 dump lines).

**Result:** exact sender, generated request-client and streaming-event decoder branches could be reconstructed. Detailed methods, fields, routes, conditions, limits and exceptions are recorded in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. The Android public package successfully deserialized in this temporary pinned build; this does not prove that the supplied stripped native library was built from this exact upstream source commit or with identical flags. The disassembler has not been added to ChatJS and is not a runtime dependency.

**Safety/retention:** the temporary source checkout, C harness, compiler, bytecode inputs and dump files stayed in the isolated analysis VM. No official app payload, extracted third-party code, compiler binary, or QuickJS code was committed. No user/account credentials were used and no network request was sent to ChatGPT.

**Follow-up:** reconstruct complete generated nested model/requirements schemas; inspect the native device-integrity service implementation/public-build gate; decode the exact stream resume wire request; and disassemble upload reservation/PUT/process paths and numeric limits.

## 2026-11-25 — Android stream worker/resume, upload service and picker policy disassembly

**Source:** owner-supplied ChatGPT Android XAPK version 1.2026.321. The compiled Valdi modules were extracted from the base APK; each selected entry had the 4-byte Valdi bytecode prefix removed before reading with the temporary pinned QuickJS tool. The payloads were deserialized only; no Android method was evaluated or executed.

**Streaming payloads decoded:**

| Module entry | Bytecode bytes | SHA-256 |
| --- | ---: | --- |
| ChatGPTStreamingWorkerRuntime.js | 10,244 | 8715784129e94b18e72c9679b587bee6d88d80bc0de5de67b0478a34caed2ff6 |
| ChatGPTStreamingWorkerClient.js | 4,956 | a8b3be08efa38733210b895f783cfe161442d89e805c2698b27338e6f00d49c0 |
| ChatGPTStreamingResponseProcessor.js | 3,760 | 5c756590b43b97ff262483eae95b39502944309fb6c64f8f8a1992d977470156 |
| ChatGPTStreamingProtocol.js | 739 | 579c01eec41dd49bdada1619089d39a602c4a4571c442984d12b17aab0b9f217 |
| ChatGPTStreamingContracts.js | 1,421 | dbfc84206295424acf6e84cc56686e2e40820e6ec7029c834b6acedb13e0c063 |
| AssistantResponseClient.js | 1,124 | 5318bfb554340e437ab24a75cceeeebb288e1f1eafb9090a80d6cc1a8569b1f7 |

**Upload payloads decoded:**

| Module entry | Bytecode bytes | SHA-256 |
| --- | ---: | --- |
| ChatGPTFileUploadService.js | 16,754 | 5814c2457b0c05d2306a718a64059d1a7ce9cafb1bb97d109a6484a2cb0f2a64 |
| oai_file_picker / FilePickerPolicy.js | 1,600 | c65066dcc1d14e5688e50900e85ac5f0dbf071a149bfea0636ad15961e9f931a |

**Results:** decoded host/worker message enums, request ID correlation, content-prefix deduplication, direct SSE versus injected polling behavior, and exact resume request builder. The continuation posts to the initial route plus /resume; body fields are conversation_id, optional model, offset and stream:false, with x-conduit-token added to the original headers. Direct-only resume is capped at three handoffs.

Decoded the upload reservation POST, multipart Estuary finalize/content paths, external signed-storage PUT path, process-upload POST, trusted destination suffixes, Azure versus S3 header difference, upload failure mapping, MIME/data-URL checks and image dimension reader. FilePickerPolicy values are 10 selections, 20 MiB per file and 25 MiB aggregate; it accepts the listed office/text/document extensions, JSON/PDF/CSV/Markdown/plain-text MIME values and GIF/JPEG/PNG/WebP image MIME values. Maximum image width/height is 32,768 pixels.

**ChatJS implementation:** added internal src/chatgpt/file-upload-policy.cjs with deterministic tests. It validates the recovered selection metadata and byte limits, padded Base64 data URL byte length, trusted upload-destination parsing, and the Estuary-versus-signed-storage plan and storage headers. It does not perform HTTP requests, authenticate, reserve or upload files, process server responses, or expose a public API.

**Verification:** npm run check passed in a disposable local snapshot of the current main commit. All 35 tests passed, generated docs and links were valid, and dist/ChatJS.tar.gz contained nine module files. The source helper is included in the distribution archive. This result does not establish a live ChatGPT upload, conversation or streaming implementation.

**Limits:** this is static client-source reconstruction and a partial deterministic policy implementation. It does not establish live endpoint availability, service authorization, signed-URL lifetime, retry/cancellation semantics, download/indexing, all process-stream terminal states, or public-build native device-integrity availability. The temporary disassembler, QuickJS source/build, app payloads and extracted bytecode remained outside the ChatJS repository and distribution.


## 2026-11-25 — Android conversation event dispatch and response processor trace

**Question:** What exact terminal/continuation decisions occur after parsing an SSE event, and how are prepared content, reasoning, DIL, errors and completion delivered to the conversation listener?

**Method:** Read the retained QuickJS disassemblies for ChatGPTConversationEventDecoder.js and ChatGPTStreamingResponseProcessor.js from Android XAPK 1.2026.321. The tool only deserializes compiled function objects and dumps their bytecode; it does not execute Android functions.

**Result:**
- [DONE] is handled before eventOffset increments and before payload decoding; it completes the reasoning accumulator and returns complete:true.
- Every other SSE event increments the offset before payload decoding, so even ignored, unknown or undecodable non-DONE events advance the continuation offset.
- Valid resume_conversation_token stores the token and conversation ID. An accepted stream_handoff requires that saved state, rejects conversation changes, and returns a nonterminal continuation {conversationId,eventOffset,token}. The worker makes the separate /resume request.
- message_stream_complete finalizes reasoning and returns complete:true; ordinary messages return complete:false.
- Visible assistant/tool message filtering, hidden-message skipping, reasoning message classification, per-message assistant-text accumulation/suffix extraction, conversation-state transitions, raw DIL payload deduplication, and entity-reference snapshot deduplication were traced.
- The response processor accumulates text, batches Markdown parsing/rendering on a 16 ms timer, reports distinct state/DIL/entity/reasoning callbacks, flushes final text before completion/error, defers completion when text/DIL has been emitted, and clears timers on stop. Cancellation stops without inventing completion.

**Limits:** core event/processor control flow is reconstructed but not a live server protocol test, complete generated nested-event schema, or complete history sync. No ChatJS runtime event/processor implementation was added in this slice.


## 2026-11-25 — Android requirements-integrity and native provider adapter

**Question:** How do the Android client and its native device-integrity bridge route required chat-requirements challenges, and what may the bridge return to the direct request?

**Method:** Read the retained ChatGPTDirectResponseClient QuickJS method disassembly. No compiled Android method was executed.

**Result:** chat-requirements response normalization requires a non-empty token and sets requiresDeviceIntegrity when any item in turnstile, proofofwork or so has required === true. The default ChatGPTRequirementsIntegrityProvider returns OpenAI-Sentinel-Chat-Requirements-Token only when no such challenge is required; otherwise it throws rather than bypassing the requirement. The alternate ChatGPTDeviceIntegrityProvider is selected only for Valdi >= 11 when the native service accessor returns a service.

The native adapter passes accessToken, accountId, baseUrl and conversation/parent context to service.prepare; it forwards one-shot success/failure callbacks and calls service.cancel on cancellation. The returned header-name/value arrays are length/type/name/value validated before use. The body patch JSON is restricted to exactly one app_attest_challenge property and that value must be a non-empty trimmed string; the patch is applied only after validation. The adapter result merges with the normal Authorization, ChatGPT-Account-Id and Content-Type request headers.

**Limits:** the internal native service implementation and public-build package availability remain unresolved. DEX evidence indicates an internal-package guard that does not match the supplied public APK package ID. Never synthesize the token, challenge, headers or body patch. No ChatJS runtime behavior is implemented in this trace.
