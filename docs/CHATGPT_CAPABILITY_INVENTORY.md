# ChatGPT Client Implementation Inventory — Mobile and Desktop

**Reviewed:** 2026-11-25. ChatJS is one general-purpose Node.js module consolidating actual client capabilities from ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI. The overall target includes all three client families; the temporary active execution priority is ChatGPT Android excluding Android Work.

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

The two Windows MSIX pieces are retained in ChatJS Project → Sources and were reassembled and ZIP-tested on 2026-11-25. The Appx manifest identifies ChatGPT / OpenAI.Codex x64 version 26.1117.4957.0; selective ASAR inspection found the packaged Electron host, local codex.exe stdio app-server path, and a separate ChatGPT/OpenAI-origin-restricted bearer-auth bridge. This first pass is not a full Work UI-to-service mapping and does not make the Codex subprocess a ChatJS dependency. It supersedes the earlier 2026-11-20 note that Windows work was deferred and only a metadata ZIP was available. See [REFERENCE_DESKTOP.md](REFERENCE_DESKTOP.md).

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

## Android schema helper implementation — 2026-11-25

`src/chatgpt/android-conversation-api-schema.cjs` now contains private, deterministic helpers for the observed model-catalog GET descriptor and chat-requirements POST descriptor, plus the generated nested response decoders. It preserves unknown properties and enforces required/optional primitive and array types, including rejecting present `null` values where the generated source checks only for `undefined`. The default requirements-token header helper is fail-closed when a required Turnstile, proof-of-work, or `so` challenge is present.

The module is included in the distributable archive and has focused tests. This does not implement HTTP, authenticated sessions, attestation, conversation send/receive, or a model catalog fetch; the overall runtime remains foundation-only.

## Android authentication validation helper — 2026-11-25

Static inspection of the supplied XAPK's decompressed `assets/oai_authentication_session.valdimodule` identified the private source predicates `isValidOAIBearerToken`, `isValidOAIAccountIdentifier`, `isValidHTTPHeaderName`, `isValidHTTPHeaderValue`, and `isTrustedOAIAPIOrigin`, including their observed ASCII alphabets/control-character rule and production/staging HTTPS domain pattern. ChatJS now has a side-effect-free internal implementation of those validation predicates with focused tests.

The same module also contains a much larger authentication controller, native credential service, encrypted credential store, account-check client and request-credential recovery flow. Those are source findings only. Secure Android native storage/foreground admission, interactive sign-in, restore/revalidation, credential renewal/revocation, account selection/switching and authenticated HTTP remain unimplemented. The origin-relative path primitive and service-level space/fragment gate are now method-reconstructed private helpers; neither is wired to transport.

## Not implemented yet

The current ChatJS repository is foundation-only. Actual ChatGPT service connection, authentication/session handling, request transport, conversation features, files, voice, images, Work tasks, and Codex integrations are not implemented. No end-to-end compatibility claims are made.

## Feature-domain coverage

Every capability evidenced by the supplied first-party clients belongs in the feature inventory. Feature-domain labels do not limit scope. Do not infer a working capability from a package string alone or assume host permissions exist; verify implementation, authorization, host requirements, and tests.


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

## 2026-11-25 — Conversation-level guest-start event path

`Ljqk0` is the conversation coordinator and receives both `Lks31` AuthSession and `Lgs31` anonymous SessionManager. Its event handler has a guarded `Lkmk0` path that launches `Lps30` label 16. That exact coroutine branch logs `MessageStreamingService`'s no-messages/all-unsupported condition, constructs and emits `MessageNotFoundException`, and then calls `Lgs31.b` with event-derived `Llnp0` reason and `Lhr31` detail. This is conversation-level local SessionManager startup/recovery coordination. It does not identify the guest HTTP create/refresh request or prove a remote guest session was created; the `Lkmk0` trigger/payload semantics remain unknown.

## 2026-11-25 — Statsig initialize and conversation ViewModel event bridge

The Android Statsig SDK maps `Initialize` to `https://featureassets.org/v1/i` and `log_event` to `https://prodregistryv2.org/v1/e`. Initialize POST data includes `user`, `statsigMetadata`, `sinceTime`, `hash`, `previousDerivedFields`, and `full_checksum`. `PersistedInitializeResponse` is evaluated into gate/config/layer maps. Local stores include `ondiskvaluecache`, optional `Statsig.CACHE_BY_USER`, `Statsig.LOCAL_OVERRIDES`, and `Statsig.STICKY_DEVICE_EXPERIMENTS`; `statsig.network_fallback` separately retains fallback URLs for seven days with at most ten prior entries. The fallback-host TTL is not the response-cache TTL; effective response-cache age and offline precedence remain unresolved. SDK event/exposure reporting is telemetry and excluded from ChatJS.

The conversation UI dispatch is traced through `Lxjk1.f` → captured callback `Llu2` → `Lhkk1.t` event adapter → virtual `Lv6a.G` on the captured `Lgqk0` receiver. `Ljqk0` extends `Lgqk0`; when supplied to this Compose renderer, dispatch reaches that same `Ljqk0.G` instance. Its guarded `Lkmk0` branch launches `Lps30` label 16, emits `MessageNotFoundException` for no-messages/all-unsupported, and calls local `Lgs31.b` with event-derived reason/detail. No guest HTTP create/refresh request or composer-send route is established.

## Additional source evidence — 2026-11-25

The Android 1.2026.321 `chatgpt_services` module now provides a concrete static trace of the **authenticated** ChatGPT model/catalog, chat-requirements, direct conversation send/stream, SSE resume, file upload/process, and conversation-history client modules. Routes and security dependencies are recorded in [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md). This advances research only: full serializers, complete event contracts, request tests, and the guest flow remain incomplete. The client explicitly requires a first-party integrity provider when the response says device integrity is required; ChatJS must not simulate or bypass it.

The newly supplied Windows MSIX was reconstructed and its ZIP integrity passed. First-pass ASAR inspection confirms a packaged local Codex app-server process path for the desktop coding-agent surface, plus a separate restricted ChatGPT/OpenAI authenticated fetch bridge. This is not yet a complete mapping of the user-visible Windows Work surface. The Windows local path must remain separate from Android cloud Work, and ChatJS must not spawn or depend on the packaged `codex.exe` / app-server runtime. See [REFERENCE_DESKTOP.md](REFERENCE_DESKTOP.md).

No production client functionality changed in this research slice. The runtime remains foundation-only; the overall product is not yet functionally connected to ChatGPT.

## 2026-11-25 — Android direct-response and upload field inventory

The compiled `chatgpt_services` module's direct-response string region exposes conversation/message/context identifiers (`conversation_id`, `parent_message_id`, `conversation_mode`, `primary_assistant`, `history_and_training_disabled`, `author`, `user`, `text`, `content_type`, `parts`, `multimodal_text`, `metadata`, model-written DIL fields, skills overrides, `stream`, timezone offset and file/image asset references). The generated API module exposes schema decoders for model catalog and Sentinel requirements. The event decoder exposes delta operations, handoff/resume tokens, conversation-state metadata, DIL/reasoning and entity references. The upload module exposes reservation/process metadata, trusted destination suffixes, Azure block-blob headers and Estuary fallback paths.

This is a stronger field/contract inventory than a route-only scan, but compiled strings alone do not establish JSON nesting, exact route selection, field validation rules, numeric upload limits or complete resume semantics. No production ChatJS conversation, streaming or upload capability is implemented.

## 2026-11-25 — Codex CLI client capability evidence deepening

The pinned `CodexCLI.zip` source snapshot provides a concrete path for the Codex CLI client capability family, which is in scope for ChatJS but not yet implemented:

- **Backend:** ChatGPT Codex base route `https://chatgpt.com/backend-api/codex` plus `/responses`; typed JSON request, HTTP POST/SSE and a distinct Responses WebSocket path.
- **Request/session:** model/context/input/tools/reasoning configuration; `store: false`, streaming, automatic tool choice in the observed builder; conditional `session-id`, `thread-id`, `x-client-request-id`, and source-specific subagent metadata.
- **Auth:** managed ChatGPT OAuth-derived bearer tokens and account identity; guarded refresh and account-state checks. Other upstream auth/provider modes are outside ChatJS scope.
- **Stream:** typed Responses output-item, text, tool-input, reasoning, created, completed, incomplete and failed event mapping, with timeout, stream-close, parse and content-filter handling.
- **CLI task events:** JSONL `thread.started`, `turn.started/completed/failed`, `item.started/updated/completed` and `error` event types, with typed agent-message, reasoning, command, file, MCP, collaboration, web-search, todo and error item kinds.

These are pinned-source observations. They do not mean ChatJS already has a Codex client, auth/session flow, Responses API, WebSocket transport, local coding execution, MCP adapter or JSONL event API. The external Codex CLI and app-server remain prohibited runtime dependencies. The Codex CLI client family is separate from Windows Work Local and Android Work Cloud; preserve all three surfaces through one package without collapsing their protocols.

## 2026-11-25 — Codex CLI local execution and tool-system evidence

The pinned Codex source reveals a separate native local-coding subsystem alongside its ChatGPT Codex Responses client:

- **Interactive commands:** `exec_command` selects an execution environment, resolves a path-URI working directory and shell, prepares policy/sandbox permissions, launches through a shared process manager, and may return a resumable terminal session.
- **Terminal continuation:** `write_stdin` sends input or polls a live terminal session; empty input is an output poll. One-shot command mode has a separate bounded timeout and is not resumable.
- **Policy:** command authorization distinguishes skip, approval required, fresh human approval required, and forbidden. Session approvals are keyed and cannot replace fresh human decisions.
- **Sandbox:** local and remote executor environments use different path/sandbox handling; TTY is feature-gated; cancellation, timeout, bounded output and terminal cleanup are part of the command contract.
- **Patching:** a verified `apply_patch` command may be intercepted and routed to the dedicated patch parser/application path with environment and sandbox checks.
- **MCP:** configured MCP tools are registered separately and wait for their server to be ready before invocation.

This source evidence broadens the native implementation work needed for Codex parity. It does not mean ChatJS currently has a process manager, terminal, sandbox, command approval, patch runtime or MCP integration. These capabilities remain Research/Planned, not supported.

## 2026-11-25 — Codex network policy, dynamic tools, permissions and collaboration

The pinned Codex source documents additional client subsystems that are in the ChatJS Codex capability target but not yet implemented:

- **Command egress approval:** execution-scoped outbound network policy, attribution to a real running command/environment, per-host prompt serialization, once/session/deny decisions, persisted policy amendments, cancellation and fail-closed behavior; remote executor proxy support is capability-checked, with gated credential masking.
- **Scoped permission requests:** `request_permissions` resolves an executor before converting relative paths, normalizes additional filesystem permissions and asks the session approval flow for a decision. The permission response is returned to the tool; it is not silently granted.
- **Dynamic tool search:** deferred tool definitions are searched through a lazy local BM25 index and exposed only after current Code Mode/router policy checks.
- **MultiAgentV2 collaboration:** `spawn_agent`, `send_message` (queue only), `followup_task` (trigger turn), `wait_agent` (mailbox/steering/timeout), `list_agents`, and `interrupt_agent`; thread IDs, child status and activity events are part of the model. Runtime support is configuration/feature-gated.

These findings show that Codex parity extends beyond Responses transport and shell execution. They do not establish any working ChatJS feature; the corresponding APIs and native Node.js state machines remain Research/Planned. All source analytics/telemetry is excluded.

## 2026-11-25 — Codex control tools and interaction surface

Additional pinned Codex CLI control contracts:

- **Plan/context:** `update_plan` emits typed plan events and is rejected in Plan mode; `get_context_remaining` reports context-window budget.
- **Clock:** namespaced `clock.curr_time` uses an injected UTC time provider (not an external time API in this handler).
- **Execution readiness:** `wait_for_environment` awaits a selected environment already marked starting and returns explicit failure/unknown-ID states.
- **User interaction:** blocking root-thread `request_user_input`, non-blocking structured `request_user_input_async`, and non-blocking `send_message_to_user_async`. These need a genuine host interaction path; no display/answer may be fabricated.
- **MCP resources:** list resources, list resource templates, and read resources are distinct from MCP tool calls and are scoped to selected server/environment and current model access.
- **Dynamic tools:** registered tools supplied by the current Codex thread can be direct/deferred, namespaced, and invoked through a real asynchronous request/response callback with start/completion events and cancellation.
- **Plugin/connector catalog:** current discoverable entries can be listed; install requests are checked against that catalog and delivered via explicit MCP elicitation consent, then installation completion is verified before MCP refresh/connector selection update. This is not alternate AI-provider selection. Apply the full source-backed product scope, while treating catalog discovery as evidence of availability—not automatic support or approval.

All findings are static source evidence. ChatJS has no plan/clock/context/user-input/environment/MCP-resource/dynamic-tool/plugin-install implementation yet.

## 2026-11-25 — Codex Responses WebSocket and incremental context lifecycle

The pinned Codex CLI source maps the WebSocket transport in greater detail:

- **Capability gate:** WebSocket use requires provider supports_websockets and a model-client session that has not been disabled by fallback.
- **Handshake:** OpenAI-Beta: responses_websockets=2026-02-06, Responses headers, session-id, thread-id, x-client-request-id, compatibility/routing headers and optional first-party attestation.
- **State:** connection reused inside a turn-scoped ModelClientSession; sticky turn-state/routing data is turn-scoped; credentials may be re-resolved for runtime-authenticated requests.
- **Wire:** response.create tagged JSON request, with optional previous_response_id and generate.
- **Incremental:** only if prior request+response ID exist, non-input request properties match, and new input exactly extends previous input plus server output. Otherwise send full context.
- **Warmup:** optional generate:false connection/context prewarm; following generation may send only a verified delta.
- **Flow:** 1 MiB message fragments, 1 MiB read-ahead and bounded event queue (1,600 in observed source); completion and interrupt acknowledgement are protocol states.
- **Fallback:** HTTP 426 triggers immediate HTTPS fallback; specific WebSocket errors and exhausted retry budgets can switch a model-client session permanently to HTTP. A feature-gated exponential retry path starts at five seconds and caps at sixty seconds for a limited set of external sampling sessions.

This is a different implementation from the existing bounded generic SSE parser in ChatJS and remains unimplemented. No transport support should be claimed until ESM/CommonJS/TypeScript and real authorized end-to-end tests pass.

## Current implementation priority

Complete the full non-Work ChatGPT Android client experience first. The Android Work cloud surface, Windows/Desktop client, and Codex CLI remain in the long-term ChatJS target but are parked until Android non-Work is fully reconstructed, implemented and tested. This is a sequencing decision only.

## Android XAPK module census and auth method update — 2026-11-25

The latest supplied XAPK (ChatGPT Android 1.2026.321) was independently reverified and all **111** Valdi module assets were decompressed. The per-module names, sizes, decompressed SHA-256 values and route-like string candidates are recorded in [ANDROID_CLIENT_MODULE_INVENTORY.md](ANDROID_CLIENT_MODULE_INVENTORY.md). This snapshot has 111 modules; the separate older extracted APK snapshot recorded 121. Do not merge counts across source artifacts. The census is package discovery evidence only, not proof that features are loaded, entitled, reachable or implemented.

Method-level disassembly of `oai_authentication_session.valdimodule` verified the authentication regex flags and exact `isSafeOriginRelativePath` plus the service-level space/fragment restrictions. ChatJS now has private side-effect-free implementations of these path predicates in addition to bearer, account-ID, header and trusted-origin predicates. The generated account-check operation is GET `/backend-api/accounts/check/v4-2023-04-27`, with no query/body fields in its descriptor. The response requires an `accounts` object map (not an array), with optional `account_ordering: string[]`; nested account nullability and record fields are decoded. The controller helper applies explicit ordering followed by remaining map keys, filters only explicit session-denial/deactivation, deduplicates, then prefers the credential account ID or falls back to the first choice.

Seven authentication-session entries were deserialized and bytecode-dumped with a temporary QuickJS reader from pinned public Valdi source. No Android function was evaluated. Controller operation names/states, native credential bridge and revoked/SSO/renewal classifications are source findings only. Secure Android storage, sign-in/restore, account selection, DPoP refresh, authenticated HTTP and public-build device integrity remain unimplemented.

The private `src/chatgpt/android-authentication-api-schema.cjs` helper now contains the exact generated AccountCheck request descriptor, map/record/account decoders, and the controller's initial accessible-account normalization and selection policy. It is tested and has no network, credentials, or session side effects. `accounts` is definitively an object keyed by account ID; older array wording in previous notes was incorrect and is superseded.


The Android standalone `selectAccount` controller method is now separately decoded: it resolves a canonical account by ID from the current session list, guards signed-in/app state and no-op cases, cancels validation/revalidation, advances the operation generation, reconstructs an account-bound in-memory session, updates `SignedIn`, then starts non-awaited credential-store persistence with a warning-only catch. It does not perform a new account lookup request or present the account picker itself. Its UI caller and portable ChatJS switch behavior remain unimplemented.


The Android authentication controller's restore/direct-token/interactive sign-in entry methods are now method-decoded. They coordinate secure credential loading/saving, native session-ID restoration, first-party method capability, foreground admission, generation checks and unfinished native-session cleanup. This is source reconstruction only; ChatJS has no sign-in, restore, native bridge, secure credential persistence or authenticated transport.


The Android `OAICredentialStore` wrapper is now method-decoded, including the browser in-memory/unavailable/encrypted variants, namespace/key/user metadata, `enableEncryption`/`disableBatchWrites` configuration, lifecycle-based foreground admission, JSON load/save/clear wrapper, version-1 token/native-session envelope and nested session/account snapshot validators. A private, tested `android-auth-credential-record.cjs` codec builds/decodes those records and extracts only finite JWT `exp` metadata. It does **not** encrypt, decrypt, access a filesystem/keystore, persist credentials or authenticate. The underlying PersistentStore crypto/key lifecycle remains unresolved.


The Android `OAIRequestCredential` rejection classifier is now method-decoded and represented by a private pure helper. It preserves nested `detail.error` vs `detail.code` vs top-level `error` precedence, recognizes top-level revocation/SSO but not top-level expiry, and only plans a token renewal when the caller-supplied renewal flag is truthy. The source's `reportRevoked` and `accessToken` callbacks are not implemented or invoked in ChatJS; request replay, token replacement, secure clearing and full SSO/DPoP remain unimplemented.


The Valdi-side `OAINativeCredential` wrapper is now separately method-decoded. A runtime/compiler-intrinsic and configured `renewableAuthenticationService` gate controls availability; the wrapper exposes cancellable `signIn` plus `restore`, `accessToken` and `clear`, and validates returned nativeSessionId/accessToken pairs. The related service type module exports Browser/Codex authentication-method and Cancelled/Network/Rejected/Unavailable/Unknown failure enums. The actual native intrinsic, method payload schemas and callback guarantees—particularly `onCleared`—are not present in these interface-only JS modules and remain unresolved.


Android DEX interface inspection now confirms the callback types and native service method descriptors, and the controller's `reportRevoked`/`accessToken` requestCredential closures are traced to `clear`/`accessToken` with stable native-session/account identity. The interface classes in DEX are generated Kotlin-function adapters, not the backing host provider. `OAIPlatformServices` stores typed authentication and renewable-auth services, but the actual provider closures, native clear semantics, `onCleared` promise settlement, DPoP renewal result and failed-request replay remain outside the recovered interface/adapter code.


The Android `OAIBearerAPIService` caller is now method-decoded: it validates the bearer/account inputs, builds account-bound bearer headers, dispatches supported HTTP verbs through an injected client, and performs a bounded 401 recovery sequence. When the classifier/requestCredential context returns a replacement token, it replays the same request once with renewal disabled; without a token it preserves the original 401. A pure internal helper now tests the headers, body rules, runtime gates and replay decision. This does not provide the transport, call native token APIs, perform actual retries, or implement DPoP/account sessions.

 
The Android native-provider DEX census and DPoP subsystem were further investigated. Only generated closure adapters directly implement the native auth-service interface classes; the actual host/native closure path is still unresolved. The Android DEX also contains AndroidKeyStore-backed EC/secp256r1 DPoP keys, SHA256withECDSA signing, ES256/dpop+jwt serialization, DPoP-vs-Bearer header selection, `WWW-Authenticate` scheme parsing and DPoP-vs-Bearer provider selection; the DPoP server-nonce exchange itself is not yet traced and an OAuth refresh path with invalid-proof timestamp correction. These are source findings, not ChatJS support. Native keys are not exportable through this interface; DPoP runtime support remains blocked pending exact claims/nonce/refresh contracts and a legitimate host secure-signer abstraction.


## Android DPoP refresh timestamp source — 2026-11-26

The OAuth refresh coroutine `Lxb8.g` reads the HTTP response `Date` header, parses it through `Lk9y.a` and converts the parser's timestamp field from milliseconds to epoch seconds. `Lxb8.e` uses the `Lxb8.j` error filter, updates the in-memory `Lpvx.b` server-minus-local offset and makes one explicit follow-up refresh call. The exact filter branch semantics for its 30/300 constants, other refresh retry paths and `Lpvx` lifetime/reset remain open. This remains Android source analysis only: ChatJS does not yet parse the header, refresh tokens or generate DPoP proofs.


## Android OAuth refresh skew and API-error classifier — 2026-11-26

The method `Lxb8.j(Likq0, Lu0p0, Ljb8)` requires the `Lpyy0` refresh request model, `Ly0p0` response wrapper and HTTP status 400/401/403. It compares the exact sent refresh `iat` saved by the request coroutine (local epoch seconds plus current stored offset) to the response `Date` timestamp in epoch seconds. It returns a correction timestamp only if the request `iat` is more than 30 seconds later than Date, or Date is more than 300 seconds later than the request `iat`. It then requires an `ApiServiceError` on the throwable or immediate cause: HTTP 400 with field `c` equal to `invalid_grant`, or either raw field `b`/`c` in the set `refresh_token_reused`, `token_expired`, `invalid_dpop_proof`. The caller stores Date-minus-local seconds and performs one additional refresh request. These comparisons are a skew-eligibility filter, not a TTL or overall retry policy. The parser/constructor mapping is now resolved: `ApiServiceError.b` is nested JSON `type`, and `.c` is nested JSON `code`; therefore the HTTP-400 `invalid_grant` comparison is on the code. Other retry paths and DPoP challenge lifecycle remain untraced. Static source research only; no ChatJS runtime support.


## Android DPoP challenge evidence correction — 2026-11-26

The Ktor auth handler reads `WWW-Authenticate`, parses the challenge scheme and chooses the matching `DPoP` or `Bearer` provider; `Lxp` is registered with Ktor Auth. `Lrvx` separately registers `DPoPProofPlugin`, `Ltvx` exposes `DPoPProofProvider`, and the access-token provider calls the outgoing proof builder. The earlier attribution of `X-Nonce` to this flow is superseded: the exact header literal occurs in `Ljz40.b`, a RevenueCat networking header map, not the ChatGPT auth path. The already-traced main JWS serializer includes `htm`/`htu`/`iat`/`jti`/`ath` and no nonce claim. How any server DPoP nonce is conveyed through the opaque parsed challenge/provider path remains unresolved; do not equate it with the OIDC or lookup-key nonce.


## Android Ktor parameterized challenge parsing — 2026-11-26

`Lzuc0.c(String)` in `classes8.dex` returns the generic Ktor `Lyuc0` challenge hierarchy. Parameterized `Lwuc0` retains the scheme, `List<Lwub0>` name/value pairs and parser position; token68 `Lxuc0` carries its opaque token68 value. `Lph8` uses the challenge scheme to choose DPoP or Bearer and builds provider/challenge pairs. `Lsh8.a` accepts a challenge object in its descriptor, but its coroutine continuation `Lqh8` does not capture that object and calls `Lxp.b` using request/auth context. No parameter-list read or nonce proof binding appears in that recovered path. Server-nonce behavior in other provider/native flows remains open. The sole `X-Nonce` header literal is RevenueCat-only, not ChatGPT DPoP evidence.


## Android registered DPoPProofProvider and DEVICE_KEY challenge distinction — 2026-11-26

The registered Ktor DPoP proof provider has been traced end-to-end: builder paths create `Lkl40`, wrap it with `Lsvx`, and register under the `Ltvx.a` provider key. `Lkl40.invokeSuspend` creates `Lke` with `Lyt2`, `Lpqc1` and `Lb6p0`; `Lke` reads the `Lyt2.b` P-256 KeyPair, adds `Lpvx.b` to local Instant epoch seconds, gets the URL from `Lpqc1.h` and calls `Lyls0.s` for the main DPoP JWT. The main JWS serializer has `htm`, `htu`, `iat`, `jti`, `ath` and no nonce claim.

`Lyt2.b(String)` is not that request signer. Its only direct caller across all ten DEX files is `Lsk00.a`, which validates a separate `DEVICE_KEY` challenge. `Lqk00` carries top-level `type`, `purpose`, `data`; nested data `Lpk00` carries `challengeId`, `challenge`, `purpose`, `issuedAt`, `expiresAt`, `signature`. The challenge string is signed with the same P-256 key pair and returned with public JWK as a separate response object. The exact endpoint/transport of the complete DEVICE_KEY challenge workflow remains separate from the main Ktor DPoP proof; do not use it as evidence for a DPoP JWT nonce.
