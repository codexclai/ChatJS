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


The Android welcome UI has a separate guest-presentation model: Lnlh1 contains guestCtaCopy and CTA/display flags; WelcomeLanguageEnrollment reads its Lylh1 value through local PreferenceStore Lzlh1; Lvlh1 records anonymous_welcome; Lxr10 maps the copy/flags into welcome/composer UI state under feature gates. This confirms a guest-welcome presentation/configuration surface, but not its population source, click callback, SessionManager action or guest HTTP protocol.


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
