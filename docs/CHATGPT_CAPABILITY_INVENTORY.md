# ChatGPT Client Implementation Inventory — Mobile and Desktop

**Reviewed:** 2026-11-20. ChatJS is one general-purpose Node.js module intended to adapt the actual client-side systems and workflows of official ChatGPT mobile and desktop (including Work/Codex).

This inventory is a guide to the supplied client implementation material and the intended Node.js adaptation. It is not a claim that the present foundation already supports the listed features.

## Product definition

ChatJS is not a list of feature-name lookalikes, not a replacement model provider, and not a recreation of ChatGPT's server. The target is the real ChatGPT client experience, with the client-side implementation adapted to Node.js.

Do not treat the lack of public developer documentation for a client interface as proof that the interface does not exist. The shipped application code is the primary technical evidence for request construction, payloads, connection/transport, authentication/session behavior, client state, and workflows.

ChatJS must be general-purpose across different Node.js applications and environments. The portable core must not assume a particular phone, computer, operating system, camera, microphone, screen, browser, or deployment.

## Reference package status

### Android

The personal Library archive `/ChatJS-Archives/ChatJS-Android.zip` contains the full extracted APK payload: all 4,987 APK entries, including ten DEX files and 121 compiled Valdi modules, plus resources/notices, a README, and a structured path/size/CRC inventory. The 59,454,036-byte ZIP has 4,989 entries and passed CRC testing on 2026-11-20. See [REFERENCE_APK.md](REFERENCE_APK.md).

The compiled payload contains actual client implementation material. Source-level DEX/Valdi analysis, request tracing, auth/session tracing, and behavioral tests are not yet recorded complete.

### Windows

The MSIX inspection recorded Electron/Node/Chromium, ChatGPT and Codex executables, an ASAR app bundle, command-runner/code-mode-host components, sandbox/PTY, browser/native-host, computer-use, plugin/skill, shell and file integration. The owner has deferred Windows archive work. The current Library ZIP is metadata-only; a prior chat recorded a larger remote extracted archive with incomplete transfer to Library, not reverified in this session. See [REFERENCE_DESKTOP.md](REFERENCE_DESKTOP.md).

## First-pass Android protocol findings

See [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md) for observed authentication/session components, bearer headers, model/chat-requirements APIs, conversation and SSE streaming, uploads, history, image-gallery, and Library request paths. These are static module-string findings, not complete source reconstruction or end-to-end behavior verification.
The current 2026-11-24 XAPK scan adds method-reference evidence for separate requirements/device-integrity providers and the Android native Google Play Integrity flow. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md. These observations remain Research: they do not mean ChatJS has implemented attestation, Sentinel, Turnstile, or proof-of-work.

## Client implementation areas to investigate

| Area | Evidence to collect from the actual clients | Node.js adaptation |
| --- | --- | --- |
| Networking | Endpoint/request creation, headers, payload shape, content types, compression, transport setup | Client-compatible transport and request builder |
| Authentication | Sign-in steps, session establishment/refresh, authorization state, secure credential lifecycle | Legitimate user-authorized auth/session adapter |
| Conversations | Thread identifiers/state, message serialization, streaming, error and retry behavior | Typed conversation client and async stream |
| Context and instructions | Context assembly, profile/instruction precedence, memory-related requests/state | General context and instruction model |
| Projects | Project data structures, attachments, instructions, context transfer | Project/resource API |
| Files and attachments | Upload/download payloads, metadata, multipart/formats, previews | File ingestion and client-compatible payload layer |
| Images and video | Input formats, metadata, processing requests, result structure | Node.js image/video processing and service adapter |
| Voice | Audio formats, streaming/chunking, turn lifecycle, cancellation | Audio stream adapter; host audio capture remains optional |
| Search and research | Request structures, tools, sources, citations, task state | Search/research client workflow |
| Tools and plugins | Tool descriptors, invocation/result schemas, approvals | Typed tool/plugin system |
| Work and tasks | Task creation, progress, files, artifacts, scheduling/continuation | Local/remote task model where evidenced |
| Desktop/Codex | Workspaces, commands, PTY, sandbox, browser, computer-use, review | Portable local APIs with optional host integrations |

## Host-neutral design

Core APIs must be reusable without a phone/desktop device or hardware. If the caller's host offers a camera, microphone, screen, browser, desktop-control API, or another facility, an optional adapter may integrate it. The package itself must not assume or request those facilities on behalf of every consumer.

## Not implemented yet

The current ChatJS repository is foundation-only. Actual ChatGPT service connection, authentication/session handling, request transport, conversation features, files, voice, images, Work tasks, and Codex integrations are not implemented. No end-to-end compatibility claims are made.

## Explicit exclusions

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features.


## Accountless sessions and execution-surface distinctions — 2026-11-24

Android 1.2026.321 DEX inspection observed Unauthenticated, AnonymousSession and LoggedInSession states, AnonymousSessionLoading, AnonymousSettings components, a chatgptguestplan identifier, anonymous session metadata and guest storage/cleanup identifiers. The "Continue as Guest" phrase belongs to the Shop plugin UI model, not ChatGPT. Anonymous endpoint constants were observed, but their owning class is LocationCookieInitializer; exact final guest conversation route attribution and request schemas remain unproven. This is a genuine guest-session research lead, not an implemented protocol. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

Windows desktop Work Local and Android Work Cloud are separate owner-confirmed execution surfaces. Codex CLI is a terminal coding client; it is source reference only for current ChatJS implementation work and is not a Work runtime prerequisite. Windows guest Work remains unknown.


## Android guest-session method trace — 2026-11-24

Method-level DEX analysis now observes an Unauthenticated/AnonymousSession/LoggedInSession enum, a serialized session metadata record, SessionManager initial/refresh/logout paths, and SessionStorageCleanupImpl handling of sessions/guest-<id> storage and retired sessions. This substantially strengthens evidence for a genuine first-party accountless mode but does not provide the final guest network schemas or a working ChatJS implementation.

The /backend-anon/f/conversation* constants were traced to LocationCookieInitializer processing the locationPermissionCookieSettings user setting. Do not label them guest composer send routes. Windows desktop guest Work remains unknown. Details and evidence boundaries are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


Further DEX tracing confirms the post-logout anonymous-start attempt enters a SessionManager transition that resolves and checkpoints local auth/session state in the session DataStore; it does not yet reveal the guest create/refresh network request. A storage helper builds sessions/guest-* from two opaque values plus a hyphen, with ID semantics/generation unknown. Guest loading/CTA strings exist, but callback wiring is not yet traced. Do not overstate this as a live or fully reconstructed guest API.


The client also configures a distinct https://android.chat.openai.com/backend-anon/ root alongside backend-api; Lvwo0 builds a global Lar31 config containing both, and Lyzo0's interceptor accepts both path prefixes. Lr10.l is initialized with a local anonymous-session profile descriptor. These findings establish guest-aware client infrastructure/profile metadata, not the concrete guest create/send network protocol. Details and limits are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


The initial Android RootViewModel call order is now separated: Lma11 first tries install-referrer AccountSelector login (Los8.f → LoginGraphManager), then invokes the initial anonymous fallback (Lgs31.b → SessionManager.G). Do not attribute the former to guest creation. The actual anonymous network create/refresh operation behind the latter remains untraced.


The initial guest fallback Lgs31.b → Lau31.G invokes Llzx.n/Lwk8.invokeSuspend, whose inspected logic is local session/model/feature evaluation and collection traversal, not HTTP. No guest create/refresh request has been identified in that helper or the post-logout DataStore transition. The app still has a configured anonymous backend root, but its guest session-create endpoint remains unknown.


The Android guest-start dependency chain is better bounded: RootSessionCoordinator Lpb11 → SessionManager Lgs31/Lau31 with UserScopeManager Lq5d1 and LogoutCleanupCoordinator Ldrk0; Lau31 injects AuthRepository Lsk8 → AuthStorage Lcn8 and session DataStore Lvv31. Initial guest startup is serialized by coroutine Mutex Lmgo0 before local Llzx.n/Lwk8 eligibility and Lau31.E resolver/state work. This traces local session/credential persistence and cleanup, not the still-missing guest-session HTTP create request.


The Lr10 anonymous-session-labelled local profile is consumed by QrLoginApi Lqz8. The corresponding QR flow references /backend-api/qr-code/details and /backend-api/qr-code/action for QR sign-in/review/approval. Those routes are not the accountless guest conversation create/send API; the local profile name alone does not establish the guest protocol.


Correction to the Android DEX dependency map: Lof70 is the Statsig/experimentation interface (Lmx71 StatsigManager / Lbu70 FakeExperimentManager), not an auth/session provider. Lau31.F calls Lof70.G for feature/experiment evaluation. The unauthenticated refresh error path in Lis31 reads a local snapshot and calls Lau31.u for local state transition. The separate Lau31.n → Ldt31 → Lsk8/Ld7x chain is AuthSession/SessionLogin credential-backed DPoP/token work. These do not establish the missing guest-session HTTP create request.


The Android welcome UI has a separate guest-presentation model: Lplh1 (generated serializer Lnlh1) contains guestCtaCopy and CTA/display flags; WelcomeLanguageEnrollment reads its Lylh1 value through local PreferenceStore Lzlh1; Lvlh1 records anonymous_welcome; Lxr10 maps the copy/flags into welcome/composer UI state under feature gates. This confirms a guest-welcome presentation/configuration surface, but not its population source, click callback, SessionManager action or guest HTTP protocol.


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


## 2026-11-24 — Separate event-gated guest-start caller

A second local guest-start caller is observed through Lej6.invoke → La991.G(Louf0) → Lmuz0 branch 9 → Lgs31.b → Lau31.G. Its event producer and eligibility condition are not identified, and it is not linked to the welcome CTA action-29 path. The associated ChatgptClientMarkerUserSessionBootstrapRequestType marker is client instrumentation and excluded from ChatJS. Guest HTTP create/refresh and composer send remain unverified; no runtime capability status changes.


## 2026-11-24 — Correction: actual La991.G guest-start event variant

The local guest-start coroutine is dispatched by an `Lt891` event, not by W891.a. The W891.a path reads current Lw4h0 state through Lcq41.e and returns. Lt891 dispatches Lmuz0 label 9 → Lgs31.b → Lau31.G. Candidate creators are Lq20.invoke (payload 5) and the selector-18 Ldo1 path hosted by Lp1w/Le2w.e (payload 6 under a null-Lh70 branch); both forward via generic Function1 callbacks, and neither is proven connected to the current La991 instance. The marker remains instrumentation, not telemetry. Actual server create/refresh and composer-send routes remain unknown; no runtime capability status changes.


## 2026-11-25 — Lt891 callback source boundary

- `Lt891(5)`: emitted by `Lq20.invoke`; its generic `Function1` is supplied at either `Llal1.h` or `Lej10.c`. The WebView-host call is entered through `Ljpc.invoke`; the other `Llal1.h` callers are `Lj20.invoke`, `Lss.invoke`, `Lt07.invoke`, and `Ly641.a`.
- `Lt891(6)`: emitted by `Ldo1.invoke` selector case 18; callback is forwarded by `Lp1w`, supplied to `Le2w.e`, and carried by `Le2w.j` from parent `Le2w.c` ConversationSidebar rendering inputs.
- The ultimate callback implementations and meanings of payload values 5 and 6 remain unknown. Static scans found no direct method-id or method-handle reference to `La991.G` outside its own definition. Neither candidate is proven to target the same coordinator instance, and the action-29 welcome path remains separate.
- These are Android DEX research findings only. No authenticated/guest transport, server-side guest creation, conversation send, or Work capability has been implemented.


## 2026-11-25 — Virtual callback dispatch correction

`Lv6a.H(Louf0)` invokes virtual `G(Louf0)`, and `La991` extends `Lv6a`; generic intent callbacks can therefore reach `La991.G` when bound to that instance. The known `Le6` Function1 implementation captures a `Lv6a` and calls `H`, but its observed construction is in Composer / FreeThinkingGaugeNuxHost. No callsite proves that the WebView `Lq20` or ConversationSidebar `Ldo1` callback receives this exact bridge or captures the same `La991` receiver. The earlier direct-reference scan cannot rule out dynamic dispatch. Server guest create/refresh and composer send remain unimplemented and untraced.

## 2026-11-25 — Welcome enrollment preference writer traced

The Android local preference key is `welcome_language_opportunity` (`Le7f1` → `Lap6`, serializer `Lxlh1`) with default `Lylh1(null, false, null)`. `Lvlh1.c` launches `Ltl30`, which reads the current `Lylh1`, evaluates Statsig-derived `Lplh1`, gathers locale/app/install context, builds `Lcmh1`, and persists an updated `Lylh1` via `Lzyv0.m` / `Lhi41` branch 19 / `Lylh1.a`. This is a local enrollment record, not a guest session or message request. The serialized `Lnlh1` guest-presentation model and its `guestCtaCopy` source remain separate and untraced; no implementation status changes.

## 2026-11-25 — Statsig keys behind Android guest-welcome presentation

Lfs10 declares typed Statsig parameter keys welcome, welcome_skip_available, welcome_button_copy, welcome_language_presentation, welcome_language_suggested_tags, welcome_language_configuration_version, welcome_disclosure_use_combined_disclosures, welcome_disclosure_use_alternative_subtitle, welcome_disclosure_hide_subtitle, welcome_disclosure_shorten_accuracy_disclosure, and welcome_disclosure_guest_cta_copy. Lxr10.h(Lof70) evaluates them through Lmx71 (StatsigManager) and constructs Lplh1; Lnlh1 is the generated serializer. The local enrollment writer Ltl30 embeds Lplh1 in Lcmh1 and persists it in Lylh1. Lmx71 wraps Lix71 / Lzw71 SDK state and typed getters; upstream Statsig refresh/cache expiry/offline precedence remain unknown. Do not port analytics/exposure logging to ChatJS.
