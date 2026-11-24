# ChatJS Knowledge Base

Index of durable product, technical, compatibility, security, and research knowledge gathered across ChatJS chats.

## Evidence labels

- **Verified:** confirmed by current code/tests, authoritative documentation, or successful archive verification.
- **Observed:** found directly in supplied package content or a prior recorded tool observation; not automatically verified runtime behavior.
- **Inferred:** plausible but not independently confirmed.
- **Planned:** desired, not implemented.
- **Blocked:** a necessary engine, toolchain, host interface, or test environment is unavailable.
- **Out of scope:** explicitly excluded by owner.

## Current project facts

| Topic | Current understanding | Evidence |
| --- | --- | --- |
| Product/module | One general-purpose Node.js module named ChatJS | Owner direction/repository |
| Product target | Actual client-side behavior of official ChatGPT mobile and desktop Work/Codex | Recovered Chat.json and Chat-1.json; latest owner corrections |
| Server scope | Reproduce client behavior; no need to recreate server-side ChatGPT infrastructure | Explicit owner direction |
| Client protocols | Request/response, transport, authentication/session, and payload behavior in the shipped clients are in-scope engineering references | Explicit owner direction; source audit still pending |
| Integration status | Real ChatGPT service connection is not implemented in current foundation | Current repository source |
| Host model | Portable Node.js core; optional host-specific integrations | Explicit owner direction |
| Repository | codexclai/ChatJS; public; default branch main | Live GitHub |
| Branch inventory | Only main at check on 2026-11-20 | GitHub branch API |
| Privacy | No telemetry, tracking, hidden collection, background reporting, phone-home, or unsolicited content upload | Explicit owner requirement |
| Android source | ChatGPT-Android.xapk retained in ChatJS Project → Sources; archive integrity and provider hash match checked | Source upload and local verification, 2026-11-24 |
| Android payload | 4,987 APK entries; ten DEX files; 121 Valdi modules; 4,989 ZIP entries incl README/inventory | Embedded inventory and ZIP listing |
| Android analysis | Payload extraction complete; first-pass Valdi protocol strings/components mapped; full call graphs, exact schemas, and behavior tracing remain open | ANDROID_CLIENT_PROTOCOL_FINDINGS.md |
| Windows source | Two sequential installer pieces in ChatJS Project → Sources; exact reassembly verified byte-for-byte | Source upload and local verification, 2026-11-24 |
| Sources | ChatJS Project → Sources is primary; personal Library is optional only when genuinely useful, needed, accessible, and Sources cannot supply the material | Owner direction, 2026-11-24 |
| Out-of-scope domains | Health, finance, maps, shopping, wallet, contacts, calendar, telephony, unrelated permissions | Explicit owner direction |
| Public API manual | Root ChatJS.md | Repository |
| Distribution | ChatJS.tar.gz built and checked by npm/CI workflow | Script/CI workflow |

## First-pass Android client protocol findings

A static Zstandard decompression/string scan of selected Valdi modules found generated account-check and model/chat-requirements API clients; bearer/account headers; native/encrypted credential-store components; first-party sign-in/session lifecycle identifiers; an explicit device-integrity provider; direct/polling SSE stream components and handoff/resume identifiers; file upload/process/Estuary paths; conversation history, pins and downloads; image bootstrap/recent image generation; and Library file/node/bookmark/directory paths. Exact source-level behavior remains to be traced. See [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md).

## Client-package understanding

The Android archive is the extracted APK payload, not a metadata summary. It contains compiled DEX and Valdi modules, assets, manifest/configuration data, schemas, and notices. Source-level decompilation and request-flow tracing remain open.

The Windows MSIX package previously showed Electron/Node/Codex, an ASAR bundle, sandbox, terminal, browser/computer-use, plugins/skills, and shell integration. The full extracted archive is not currently verified in Library. The owner asked to defer further Windows work.

## Canonical research locations

| Domain | Canonical location |
| --- | --- |
| Client feature map | CHATGPT_CAPABILITY_INVENTORY.md |
| Android extracted payload | REFERENCE_APK.md |
| Windows package/retention | REFERENCE_DESKTOP.md |
| Implementation status | CAPABILITY_MATRIX.md |
| Architecture and protocols | ARCHITECTURE.md |
| Public API | Root ChatJS.md and types/index.d.ts |
| Security/privacy | SECURITY.md and ARCHITECTURE.md |
| Decisions | DECISIONS.md |
| Open questions/tasks | OPEN_QUESTIONS.md and TODO.md |

## Documentation completeness

Record meaningful requirements, decisions, research, actions, changed files, tests, failures, limits, blockers, and handoffs in canonical docs. Update all affected references and generated state. Never imply invisible monitoring.

## Research format

Record question, conclusion, evidence label, source path/date, access date, scope, limitations, confidence, implementation consequence, and related TODO/decision. Keep extracted package content, source-level analysis, observed behavior, and tested Node.js implementation separate.

## Maintenance

When evidence changes a decision, capability assessment, or task priority, update the canonical document and append a session-history entry. Never leave durable knowledge only in chat prose.


## Persistent browser profile

The persistent `ChatJS` browser profile is the sole reusable default for ChatJS browser work. It keeps the owner's Google and ChatGPT sessions authenticated. Never sign out or clear, reset, replace, or delete it. Temporary sessions are allowed only for genuinely disposable tasks and must not become additional reusable profiles.

### Current Android Sentinel and device-integrity evidence — 2026-11-24
The supplied ChatGPT Android 1.2026.321 XAPK has a base APK with ten DEX files and 111 compiled Valdi modules. A full Zstandard decompression of those modules and partial DEX method inspection observed separate ChatGPTRequirementsIntegrityProvider and ChatGPTDeviceIntegrityProvider interfaces, requiresDeviceIntegrity gating, and a native Android DeviceIntegrityService. The native path uses Google Play Standard Integrity: it obtains a token for a random 256-byte nonce, establishes a Secure/unexpired first-party _playintegrity cookie at /backend-api/playintegrity, fetches an empty-body chat-requirements token, then requests another token for the lowercase SHA-256 hex of canonical UTF-8 JSON in field order account_id/conversation_id/device_id/parent_message_id. It returns an X-Sentinel-Payload bot_token object and null bodyPatchJson in this native method. Its UUID device_id is generated locally and persisted in app-private SharedPreferences. The helper is strictly internal-package guarded (com.openai.chatgpt.internal) while the public XAPK uses com.openai.chatgpt; public-app availability is not established. The helper restricts origins, disables redirects, uses 30-second request deadlines and bounds response bodies to 256 KiB. The SDK also has a functional 300-second local TOO_MANY_REQUESTS cooldown, a conditional retry-status classification, and a DeviceRateLimits data store with read/expiry-cleanup/write paths; exact status policy and store scope remain open. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md. This is observed package code, not a working ChatJS implementation or live account test.


## 2026-11-24 — Codex and Work architecture

The pinned official source snapshot is in Project Sources as CodexCLI.zip (openai/codex commit 50aeac27d825007a0ac6bd846087ed4e7095bdb3; 28,071,441 bytes; SHA-256 1ff13fc6e312171f487b0e0f88de302c27c72c9ac20f6bd54325fdee343d66eb). codex exec starts an in-process app-server client; it does not prove that the Codex implementation can be used without the app-server architecture. ChatJS must not wrap it: implement direct client/service communication itself. See CODEX_SOURCE_FINDINGS.md.

Codex source identifies the first-party backend base https://chatgpt.com/backend-api/codex and Responses path /responses, with HTTP SSE and WebSocket transport, OAuth-derived bearer authentication, account and session/thread headers. These are Codex-specific references, not a complete ChatGPT conversation schema or a working ChatJS connection. Upstream analytics/telemetry is excluded.

The owner distinguishes Windows desktop Work Local from Android Work Cloud. Codex CLI is a separate terminal-oriented coding client and must not be required by either Work implementation.


## 2026-11-24 — Android anonymous-session method trace

The public Android DEX now provides method-level evidence for the guest session manager and storage lifecycle: enum Unauthenticated / AnonymousSession / LoggedInSession; a serialized nine-field session metadata record; a SessionManager-tagged class that launches initial state/refresh handling and a post-logout anonymous-start attempt; and a SessionStorageCleanupImpl that validates sessions/guest-<single-segment-id> paths and cleans retired guest storage. Exact guest-session network creation/refresh requests, IDs/expiry and composer send routes remain unknown.

Correction to earlier endpoint attribution: the /backend-anon/f/conversation* constants are used by the LocationCookieInitializer subsystem during locationPermissionCookieSettings processing. They are not established guest composer send/prepare endpoints. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


### Additional 2026-11-24 guest-session transition evidence

The post-logout Lau31.F → Lau31.E path performs a Statsig/feature evaluation through Lof70.G (Lof70 is implemented by StatsigManager Lmx71 and FakeExperimentManager Lbu70), then resolves/updates/checkpoints local session state through Lv2f0 and Lvv31 (session DataStore). No concrete guest create/refresh HTTP request or route was identified in those coroutine bodies. The Lxzp0 helper constructs sessions/guest-* paths using two opaque session-related string values and a hyphen; it does not establish UUID generation or whether these values are server-issued. The AnonymousSessionLoading Compose method exists but its caller/callback was not found in the direct DEX call-reference pass. The phrase "Continue as Guest" belongs to the Shop plugin UI model Li230 (plugin_shop/shop/Shop, Shop checkout/login labels), not the ChatGPT guest flow. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


### 2026-11-24 — Android anonymous backend configuration and profile evidence

Android DEX class Lp6t declares backend-api and backend-anon roots (https://android.chat.openai.com/backend-api/ and https://android.chat.openai.com/backend-anon/). Lvwo0.invoke includes both roots when constructing the global Lar31 network configuration. Lyzo0 recognizes relative paths under either /backend-api/ or /backend-anon/ in its request validation/interceptor. These prove client-side support for an anonymous backend path family, not a specific guest session endpoint or message route.

Lr10 initializes a local session/profile descriptor Lr10.l using Lzk8("id", "anonymous-session", false, emptySet); other profiles use Lxk8("id", "id-session"). Lqz8 (logger tag QrLoginApi) accepts an Lr10 profile and consults its state, but this does not prove the descriptor is a server token or guest-session creation request.

Correction: "Continue as Guest" appears inside the Li230 Shop plugin UI model, alongside Shop checkout and login labels. It is not a ChatGPT guest CTA. The separate AnonymousSessionLoading Compose method has not yet been linked to a caller/session-start callback. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


### 2026-11-24 — RootViewModel login attempt versus guest fallback

The Android Lma11 RootViewModel initialization path first attempts install-referrer AccountSelector login through Los8.f → Lpjk0 → Lgkk0 (LoginGraphManager). It records a dedicated install-referrer login failure. It then invokes Lgs31.b → Lau31.G as the distinct initial anonymous-session fallback. Therefore Los8.f is not guest creation. Lau31.G delegates into Llzx.n and subsequent manager/session-state transitions; the concrete guest HTTP request is still not identified.


### 2026-11-24 — Lau31.G helper boundary

The initial anonymous fallback Lgs31.b delegates to Lau31.G. G calls Llzx.n, which runs Lwk8.invokeSuspend; the inspected helper evaluates local model/session/feature state and collections, with no HTTP interface, URL or request builder. G then continues the SessionManager state transition. This is not the guest create request. The still-missing operation must be found in another injected auth/session dependency or call site; see ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


### 2026-11-24 — Guest-start coordinator and dependency boundary

Lpb11 (RootSessionCoordinator) receives Lgs31 (SessionManager), Lq5d1 (UserScopeManager), Ldrk0 (LogoutCleanupCoordinator) and session state. Ldrk0 coordinates local authenticated and guest retired-storage cleanup. Lau31 (SessionManager) depends on Lsk8 (AuthRepository), which delegates local credential persistence to Lcn8 (AuthStorage), plus Lvv31 session DataStore. The initial Lgs31.b → Lau31.G path acquires Lmgo0's coroutine mutex before Llzx.n/Lwk8 local state evaluation and Lau31.E local resolver/DataStore transition. Lau31.h/Lof70 is Statsig, not auth/session. The Lis31 unauthenticated refresh error path reads a local snapshot via Llzx.u and calls Lau31.u, which applies a local state transition without an HTTP client or route. A separate Lau31.n → Ldt31 → Lsk8/Ld7x path belongs to AuthSession/SessionLogin and credential-backed DPoP/token refresh; it has not been shown to create a guest session. No guest HTTP create request or endpoint was identified in these inspected callers. This narrows the current source trace to local session state, credentials and cleanup; the network create operation remains open.


Additional cross-reference correction: Lxi80 also consumes the backend-anon/backend-api path families, but its method signatures and error models are Files API behavior (files/download, upload-reservation claim/finalize, file processing/indexing). Do not mistake this shared file-transport path handling for guest session creation or chat send endpoints.


### 2026-11-24 — QR-login API is distinct from guest conversation

The Lr10 local anonymous-session profile is passed into a component tagged QrLoginApi (Lqz8). Its associated QR flow references /backend-api/qr-code/details and /backend-api/qr-code/action from QR-login coroutines and review/approval UI. These are QR sign-in actions under the backend-api root, not the anonymous guest conversation create or send protocol. Do not use the descriptor label to infer a guest token or composer route.


### 2026-11-24 — Correction: Statsig vs auth/session dependencies

Lof70 is the Statsig/experimentation interface, implemented by Lmx71 (StatsigManager) and Lbu70 (FakeExperimentManager). Lau31.F calls Lof70.G for feature/experiment evaluation, not to read auth/session state. Lau31.u is called by the Lis31 path that logs Failed to refresh the unauthenticated session; it consumes the Llzx.u local state snapshot and applies Lau31.E/Lau31.r state transitions, with no HTTP route in the inspected method. A separate Lks31 (AuthSession/SessionLogin) → Lau31.n → Ldt31 path reaches Lsk8 AuthRepository and Ld7x CredentialsRepositoryImpl for credential/DPoP/token-refresh work. Do not conflate that account-credential flow with anonymous guest creation. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


### 2026-11-24 — Guest welcome presentation model

Android also contains a ChatGPT welcome-presentation path distinct from the Shop plugin copy. Lnlh1 is a serialized welcome-presentation model with guestCtaCopy, ctaStyle, hideLoginButton, showGoogleCta and presentation/disclosure configuration; Lylh1 is its typed stored value. WelcomeLanguageEnrollment reads it through Lzlh1, a local PreferenceStore subclass using the global_ prefix. Lvlh1 reports anonymous_welcome enrollment, and Lxr10 maps the guest copy/flags into welcome/composer UI state under Statsig gates, including a skip special case. This establishes guest-welcome configuration and display-state mapping, not the preference's origin, tap callback, SessionManager linkage or network create/send route. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


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


### 2026-11-24 — Separate event-gated guest-start caller

A second call path into initial Android guest startup is observed: Lej6.invoke() constructs La991; the La991.G(Louf0) event handler checks Lw891.a and a Lcq41.e condition, then launches Lmuz0 branch 9. That coroutine handles a ChatgptClientMarkerUserSessionBootstrapRequestType marker, invokes a callback held by La991, and calls Lgs31.b → Lau31.G. This is a distinct event-gated local SessionManager start path. The event producer/meaning and relation to welcome CTA action-29 remain unknown. The marker is instrumentation and must not be sent by ChatJS. It is not evidence of the missing guest HTTP create/refresh endpoint or composer route.


### 2026-11-24 — Correction: La991.G guest start is dispatched by Lt891

Correction to the previous event-gated caller note: Lw891.a is handled separately by reading Lw4h0.getValue(), passing it to Lcq41.e, and returning; it is not the guest-start trigger. A distinct `instance-of Lt891` branch launches Lmuz0 label 9, which reads Lt891.a, invokes the captured callback, and calls Lgs31.b → Lau31.G after constructing Llnp0. Lt891 constructors are observed in Lq20.invoke (payload 5) and Ldo1.invoke selector case 18 (payload 6 under an inspected null-Lh70 branch); both forward through generic Function1 callbacks. Their ultimate callback targets and association with the La991 instance are unresolved. The second callback is created in Lp1w.invoke from Le2w.e's ConversationSidebar UI; the first is created in Lq20 WebView callsites. Do not infer either UI callback is actually wired to the current guest-start coordinator. This remains local state startup only, not guest HTTP creation. The welcome CTA action-29 path is still separate and unconnected.
