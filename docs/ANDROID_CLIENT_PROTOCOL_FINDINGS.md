# Android ChatGPT Client Protocol Findings — First-Pass Static Module Scan

**Inspection date:** 2026-11-20  
**Source:** personal Library archive `/ChatJS-Archives/ChatJS-Android.zip`  
**Method:** selected `.valdimodule` members were extracted from the ZIP, decompressed from Zstandard frames, and inspected for embedded module identifiers and printable strings. This is a first-pass static string/structure scan, not full source-level reconstruction or execution.

## Why this matters

The APK archive contains actual client implementation modules, not only feature names. This first pass confirms concrete client components for ChatGPT authentication/session handling, authenticated network transport, conversation requests and streaming, uploads, history, image gallery, and Library services. Public developer documentation is not the only evidence of these client-side interfaces.

## Authentication and authenticated requests

Observed in `assets/oai_authentication_session.valdimodule`:

- Generated client `src/generated/ChatGPTAuthenticationApiClient.js`, with an account-check operation and path `/backend-api/accounts/check/v4-2023-04-27`.
- Account-check schema identifiers include `account_id`, `account_user_id`, `is_deactivated`, `plan_type`, `profile_picture_url`, and account ordering/access fields.
- `SessionAuthenticatedAccountService` validates bearer credentials and restricts requests to encoded origin-relative paths.
- `OAIRequestCredential` contains handling for revoked, invalidated, and expired credentials, including renewal/invalidation behavior.
- `OAINativeCredential` integrates with a native credential client and a first-party authentication service.
- `OAICredentialStore` contains memory, unavailable, and encrypted credential-store implementations. Its messages refer to native secure storage, foreground lifecycle, and Android API-level requirements; it fails closed when secure credential storage is unavailable.
- `OAIBearerAPIService` validates bearer credentials and account identifiers, builds authenticated HTTP requests, and uses `Authorization: Bearer ...` and `ChatGPT-Account-Id` headers.
- The module contains trusted-origin checks for ChatGPT/OpenAI production and staging domains, plus first-party sign-in/session operations such as interactive credential request, session establishment, restore, revalidation, and clearing.

Observed in `assets/oai_authentication_transport.valdimodule` and `assets/oai_websocket.valdimodule`:

- `OAIAuthenticatedTransport` integrates with `WebSocketSession`.
- The WebSocket module exposes connect, send/receive, ready-state, health-check, abort, close, and disposal-related operations.
- The authenticated transport tracks request/socket lifecycle and account-session termination.

These findings show that authentication and session state are explicit client subsystems. They do not provide or authorize use of any user's credentials. ChatJS must implement the legitimate user sign-in/session flow and secure storage lifecycle, not bypass authentication or fabricate tokens.

## Accountless / anonymous ChatGPT session evidence — 2026-11-24

A separate static DEX string, field and method-reference pass over the supplied public Android XAPK found first-class anonymous-session concepts. This is evidence of a distinct logged-out guest session model, not merely Temporary Chat inside an authenticated account.

Observed identifiers and strings include:

- Session states Unauthenticated, AnonymousSession, and LoggedInSession.
- UI/session evidence includes the AnonymousSessionLoading Compose method, AnonymousSettingsScreen, and AnonymousSettings. The separate phrase "Continue as Guest" was traced to the Shop plugin model Li230 and is not a ChatGPT guest-login CTA.
- A guest plan identifier chatgptguestplan.
- SessionManager error paths for failing to start the initial anonymous session and for failing to start one after logout.
- Session metadata fields userId, isAnonymous, authSessionId, anonymousSessionId, retiredGuestSessionIds, legacyGuestPreferencesOwnerId, guestPreferencesInitialized, deniedLegacyFileDirectories, and pendingReplacement.
- Guest-session storage/cleanup identifiers including sessions/guest- and retired guest session file cleanup.
- Endpoint string constants /backend-anon/f/conversation, /backend-anon/f/conversation/prepare, /backend-api/f/conversation, and /backend-api/f/conversation/prepare.

**Important route-attribution limit:** the method-level trace confirms these endpoint constants are stored and consumed by Lx4k0, a class tagged LocationCookieInitializer; its caller maps the remote-user-settings property locationPermissionCookieSettings and invokes the location-cookie initialization flow. These constants therefore belong to a location-permission cookie subsystem in the observed call path. They are not proof of the guest composer message-send routes. The actual guest conversation request owner, prepare/send body schemas, guest cookie/session headers, and route selection remain untraced. Do not treat these path strings as a completed guest chat protocol.

ChatJS must model accountless sessions as a genuine first-party session mode with its own creation, storage, request, expiry/retirement and cleanup rules. It must not fabricate guest tokens, borrow authenticated account credentials, silently convert a guest session into an account session, or bypass any server-required sign-in gate. Preserve the service's guest feature restrictions and one-active-conversation/history-retention limits where enforced.

The public ChatGPT web experience also supports logged-out use in eligible regions, subject to first-party availability and restrictions. OpenAI's Help Center describes one active conversation at a time and that logged-out history is not saved to an account. This web product evidence does not prove that the Windows desktop Work surface has the same anonymous-session path.

**Windows desktop boundary:** in the Windows bundle material inspected in this work, an anonymous marker found in a generic browser-transport subsystem was not sufficient to establish a ChatGPT guest session or a signed-out Work flow. Windows desktop Work guest support remains unverified; continue from the Windows package only when the relevant payload/call path is actually available. Do not infer it from the generic browser transport.


### Android anonymous session state and storage call graph — method-level DEX trace, 2026-11-24

The follow-up pass disassembled selected methods from the public XAPK's base DEX files and followed method/field references. This improves the earlier string-only evidence, but remains static analysis of compiled client code rather than a fully reconstructed or live-tested protocol.

**Session state model**

- Lvr71 is an enum containing exactly Unauthenticated, AnonymousSession, and LoggedInSession.
- Lov31 is the serialized session metadata record. Its Lmv31 generated serializer declares these nine fields in order: userId (string), isAnonymous (boolean), authSessionId (string), anonymousSessionId (string), retiredGuestSessionIds (set), legacyGuestPreferencesOwnerId (string), guestPreferencesInitialized (boolean), deniedLegacyFileDirectories (set), and pendingReplacement (nested Llv31 record).
- Llv31 itself contains three strings and a boolean. Its exact business interpretation was not recovered in this trace; do not assign semantics to those four members from their types alone.

**SessionManager startup and logout behavior**

- Lau31 constructs a logger tagged SessionManager. Its Lof70 dependency is the Statsig/experimentation interface (implemented by Lmx71, logger tag StatsigManager, and Lbu70, logger tag FakeExperimentManager), not an auth/session provider. Its local session-state store is Lvv31; its auth-related dependencies are separately injected as Lcn8 (AuthStorage) and Lsk8 (AuthRepository).
- Its constructor launches the Lis31 coroutine as part of manager initialization.
- Lis31.invokeSuspend reads current state/flags, invokes the Lau31.q flow when handling a guest session it cannot support, and has explicit error handling for Failed to log out unsupported guest session. It also invokes the unauthenticated-session refresh flow and logs Failed to refresh the unauthenticated session if that work fails.
- The separate Lau31.F coroutine is the post-logout anonymous-start path. It calls Lof70.G on the Statsig/experimentation provider to evaluate a feature/experiment value, then enters Lau31.E for the SessionManager transition. Lof70.G is not a session lookup. If the attempt fails, the coroutine logs Failed to start an anonymous session after logout and returns false.
- The initial fallback and post-logout paths are distinct: the RootViewModel calls Lgs31.b → Lau31.G for initial anonymous startup, while Lau31.F → Lau31.E is the post-logout restart path. The G coroutine invokes Llzx.n, which creates/runs the Lwk8 suspend helper. The inspected Lwk8.invokeSuspend reads local model/session state, enumerates collections, consults feature/config records, and produces a local decision value. Its visible call graph contains no HTTP client, request builder, or endpoint. Lau31.G then continues into the SessionManager transition. This does not exclude network work in an untraced injected dependency, but the inspected helper itself is local state/eligibility logic, not the guest create request.
- Lma11 is tagged RootViewModel and owns the initial auth/session orchestration. Its coroutine first invokes Los8.f through the install-referrer/account-selector path; Los8.f delegates through Lpjk0 to Lgkk0 (logger tag LoginGraphManager) and passes Lfh8.AccountSelector. Failure is logged as Failed to start install-referrer account-selector login. The same root coroutine then invokes Lgs31.b for the separate initial anonymous-session fallback; Lgs31.b delegates to Lau31.G, whose failure is logged as Failed to start the initial anonymous session. Do not confuse the install-referrer AccountSelector attempt with guest-session creation.
- The Lis31 unauthenticated-session refresh error path has a specific local boundary: it reads the current session snapshot with Llzx.u, wraps that Lcl8 snapshot into the Lal8 state/decision record, then invokes Lau31.u. Lau31.u derives the next local state and delegates to Lau31.E / Lau31.r; the inspected method contains no HTTP client, URL, or request builder. The log phrase "Failed to refresh the unauthenticated session" therefore identifies the state-refresh operation, but does not establish a server request.
- The Lof70 dependency injected into Lau31 is unambiguously experimentation/feature gating: the interface has implementations Lmx71 (StatsigManager) and Lbu70 (FakeExperimentManager). Its method G is an experiment/feature evaluation. Earlier descriptions of Lof70 as an auth/session provider were incorrect and are superseded by this implementation attribution.
- A separate Lau31.n path is invoked by Lks31.c, whose logger tag is AuthSession and which creates a SessionLogin event. It constructs Ldt31, reaches Lsk8 (AuthRepository) and Ld7x (CredentialsRepositoryImpl), and uses the credential/token subsystem with DPoP, NoCredentialsAvailable, InvalidRefreshTokenException, background-refresh policy and token-refresh/persistence error paths. This is credential-backed authenticated-session work. The inspected path does not prove that anonymous guest startup uses this credential flow, so do not attribute it to guest-session creation.
- These call paths prove the app has distinct startup, logout, guest-session handling and local unauthenticated-session state refresh work. The exact request that creates/replaces the anonymous session, its URL/body/headers, and whether the same request is shared with the public conversation client are still not identified.

**Guest session storage and retirement**

- Lgv31 constructs a logger tagged SessionStorageCleanupImpl. Its cleanup coroutine obtains the app file system, resolves the sessions root, verifies that the root is a directory, and enumerates stored session entries.
- The cleanup code reads persisted session metadata keys including user_id and pending_credential_deletion, and tracks ownership before reconciling/removing stored entries. It explicitly recognizes names beginning with guest-; the guest-session storage method validates that a guest session ID is a single path segment and resolves it under sessions/guest-.
- The cleanup routine consumes sets of retired/denied session-related entries and has a dedicated Failed to delete retired session storage error path. It separately handles legacy account databases and legacy account preferences; those account cleanup paths must not be conflated with guest-session deletion.
- A second helper (Lxzp0) also constructs a guest-prefixed directory name under sessions/ and passes it into the app file-system/session-storage helpers. The full ID-generation/retention policy and the exact relationship between this helper and SessionManager remain open.

**Correct attribution of anonymous endpoint constants**

The route ownership is now more specific than the earlier string scan:

- /backend-anon/f/conversation, /backend-anon/f/conversation/prepare, /backend-api/f/conversation, and /backend-api/f/conversation/prepare are stored in Lx4k0, whose constructor logs the tag LocationCookieInitializer.
- The initialization path in Lcl00 invokes Lx4k0.m after mapping the remote-user-settings property locationPermissionCookieSettings into the location-cookie settings model. Lx4k0 then uses the lower-level Lgnw request interface and the Lpmw request model.
- This proves the observed endpoint constants are used by the location-permission cookie initialization subsystem. It does not prove that the normal guest composer sends user messages to these routes. The /backend-anon substring is therefore not enough to infer a guest conversation endpoint.
- The exact purpose of each route variant, request/response body, and whether any location-cookie bootstrap request is shared with a conversation client remain open. Keep the guest chat send/prepare routes unassigned until their actual conversation-client call sites are traced.



**Further post-logout transition trace**

- Lau31.F is the post-logout anonymous-start coroutine. It evaluates a Statsig/experimentation value through Lof70.G, converts the resulting feature decision into the SessionManager transition input, and calls Lau31.E. The log message is emitted when that manager transition returns an unsuccessful result or throws; it is not evidence that Lof70 provides auth/session state.
- The inspected Lau31.E coroutine delegates to Lau31.e / Lv2f0 to resolve the selected auth state, reads and updates the persisted record through Lvv31, obtains the manager's current session state, builds a Lzk8 session-selection/context record, and checkpoints it through the session-store API. Its visible method references are to the manager, auth repository/resolver, and Lvv31 DataStore operations; no concrete HTTP client, request builder, or anonymous create-session URL was identified in this coroutine body.
- Lau31.l reads the serialized Lov31 record via Lvv31's session DataStore and constructs a Lzk8 record using opaque session-related string values, a boolean and a set. The meanings of the Lzk8 constructor arguments were not independently recovered, so do not map them to a particular server token or guest ID.
- This narrows the evidence: the post-logout "start anonymous session" flow is definitely a SessionManager state transition, but the inspected call path does not itself establish the network operation that creates or refreshes a guest session. That operation may be elsewhere in the injected session/auth dependencies; keep its route and payload unknown until the exact owner is traced.

**Guest storage-path construction helper**

- Lxzp0.invoke composes a path beneath sessions/ with a guest- prefix. It uses string values obtained from a session-state object (Lks31) and a separate two-string value record (Lxk8), with a hyphen delimiter, then passes the resulting path into the app FileSystem helper and a session-storage record.
- Lxk8 is a two-string value record. The DEX trace did not recover the semantic names, generation algorithm, entropy source, or whether either value is server-issued. Therefore the path composition does not prove a random UUID or establish the guest-session ID lifecycle.
- Ld1d1.b checks a candidate storage path against local filesystem and session/credential ownership state, including the guest- path form. This is a local storage validation/ownership check, not a network request.

**Guest UI evidence follow-up**

The public APK contains the AnonymousSessionLoading Compose method Losk1.a. A static DEX call-reference search did not find a direct invocation of that method or a callback connecting it to SessionManager; the actual caller may be supplied through a higher-level UI/Valdi/navigation composition and remains untraced. The phrase "Continue as Guest" is not ChatGPT guest UI: it is a field in Li230, whose constructor also defines plugin_shop, shop, Shop, "Search for products and check out with Shop.", Checkout, and "Log in with Shop". This is the Shop plugin UI model. Do not use that string as evidence for a ChatGPT guest-entry button or create a task to trace it as such.



**Global anonymous API base and request-path acceptance**

- Lp6t declares the global first-party backend roots. Field d is https://android.chat.openai.com/backend-api/; field e is https://android.chat.openai.com/backend-anon/.
- Lvwo0.invoke consumes both Lp6t.d and Lp6t.e when constructing the Lar31 network/base-URL configuration, alongside the ChatGPT web root, Skybridge, realtime/public API roots, Codex cloud roots, platform metadata, device name, Android SDK level, package name and related configuration. This is a configuration-construction path; the inspected method does not issue a guest-session HTTP request.
- Lyzo0 request-path validation/interceptor recognizes relative request paths beginning with /backend-api or /backend-api/, and /backend-anon or /backend-anon/, before forwarding the request. This proves that the Android networking layer allows both authenticated and anonymous backend path families. It does not identify a concrete anonymous session-create route, request body, or guest composer endpoint.
- An additional apparent cross-reference, Lxi80, is a Files API client rather than the guest-session manager. Its methods include file download (files/download/), upload reservation claim/finalize (/files/upload_reservations/{reservation_id}/claim_and_finish), upload processing, and file processing/indexing events. Its shared request helper also recognizes /backend-anon and /backend-api roots. This is file-service transport/path support, not evidence for anonymous guest-session creation or guest composer send routes.
- The earlier /backend-anon/f/conversation* constants remain attributed to Lx4k0 (LocationCookieInitializer) during locationPermissionCookieSettings processing. Global anonymous-root configuration and generic path acceptance must not be conflated with proof that those location-cookie endpoints are guest message APIs.

**Anonymous-session profile descriptor**

- Lr10 static initialization constructs a profile object stored in Lr10.l using Lzk8("id", "anonymous-session", false, emptySet). The same initializer constructs other Lr10 profile objects using an Lxk8("id", "id-session") descriptor.
- In the root-view-model path, Los8.f is the install-referrer AccountSelector/login attempt, not the anonymous fallback. The subsequent Lgs31.b → Lau31.G call is the initial anonymous-session path. The current trace follows Lau31.G into a coroutine helper and local session-state transition, but has not recovered a concrete guest HTTP request builder or route from those methods.
- Lzk8 is a local four-field value record (two strings, boolean, set); Lxk8 is a local two-string value record. The strings are used as values in these descriptors. The source code names and complete semantics of every field are not available from the obfuscated DEX.
- Lqz8 is tagged QrLoginApi; its constructor accepts an Lr10 instance, and one of its methods consults Lr10.a(). The associated QR-login flow has separate request paths /backend-api/qr-code/details and /backend-api/qr-code/action, referenced from QR-login coroutine/UI paths (including Lj32 and Lj1v0). These are QR sign-in/review/approval operations under backend-api, not guest conversation create/send routes. The local anonymous-session descriptor is passed into this QR-login component, but this does not establish that it is a server-issued guest token, a conversation ID, or the HTTP operation that creates a guest session.
- These are useful static markers of a separately configured anonymous session profile, but remain local configuration/model evidence. No server response, session token, guest ID generation, or request schema is established by these constants alone.

**Shop-string attribution correction**

The string "Continue as Guest" belongs to Li230, a serialized Shop plugin UI model. The same constructor includes the plugin identifiers and labels plugin_shop, shop, Shop, "Search for products and check out with Shop.", Checkout, and "Log in with Shop". It must not be represented as a ChatGPT anonymous-session button. The AnonymousSessionLoading Compose method remains a distinct finding; its caller/callback was not established by this pass.



**Guest welcome-presentation model and local preference path — 2026-11-24**

- Lnlh1 is the generated Kotlin serializer for Lplh1, the actual welcome-presentation model. Lplh1's serialized fields include presentation, useCombinedDisclosures, useAlternativeSubtitle, ctaStyle, guestCtaCopy, hideLoginButton, and showGoogleCta. It is distinct from the unrelated Shop plugin model Li230 containing the phrase "Continue as Guest".
- The typed welcome value is stored as Lylh1. The WelcomeLanguageEnrollment manager receives Lzlh1, a PreferenceStore subclass using the global_ preference namespace. The inspected manager reads/writes this value through inherited local preference-store methods; the traced path does not contain an HTTP client or request builder.
- Lvlh1 records an anonymous_welcome enrollment event. This is evidence that the app has a separately named anonymous-welcome enrollment/presentation concept. It does not reveal the server-side source of the preference value, the eligibility policy in full, or an anonymous-session creation endpoint.
- Lxr10 maps the nested guestCtaCopy and presentation flags into welcome/composer UI state. The inspected mapping includes Statsig/feature gates and a special "skip" value. This establishes consumption of the guest CTA copy in UI state; it does not establish the click callback, what action a tap performs, or that it calls SessionManager.
- Evidence boundary: the current trace reaches a persisted welcome model and its UI-state mapping. The preference-population path, complete CTA interaction/callback, session-manager linkage, and guest HTTP create/refresh and composer-send routes remain untraced. Do not port the Android anonymous_welcome instrumentation as ChatJS telemetry; ChatJS remains zero-telemetry.

**Corrected Statsig, local-state refresh, and authenticated token boundaries**

- The field Lau31.h:Lof70 is not an auth/session provider. Lof70 is the experimentation interface: Lmx71 implements it with logger tag StatsigManager and experimentation configuration, while Lbu70 is the FakeExperimentManager implementation. Lau31.F invokes Lof70.G as a feature/experiment evaluation before its post-logout state transition. Similar Lof70 injections in Lma11 and Lq5d1 are feature-gate dependencies, not the source of account or guest session state.
- In the Lis31 startup coroutine, the branch whose failure log is Failed to refresh the unauthenticated session reads the current snapshot through Llzx.u and passes it to Lau31.u. The Lau31.u(Lal8) body derives a local state value and invokes Lau31.E / Lau31.r; its inspected call graph contains no network client, route, or request builder. This is local session-state refresh/reconciliation, not a proven HTTP refresh request.
- A different Lau31.n method is called through Lks31.c. Lks31 is tagged AuthSession and creates a SessionLogin event. Lau31.n constructs Ldt31; that coroutine reaches Lsk8 (AuthRepository) and Ld7x (CredentialsRepositoryImpl), whose token machinery includes DPoP, missing-credential and invalid-refresh-token error handling and credential-refresh persistence paths. This is a distinct credential-backed authenticated-session/token flow. It has not been shown to be the anonymous guest create/refresh operation.
- Correct attribution: Lau31.h is Statsig/experimentation; Lau31.i is AuthStorage (Lcn8); Lau31.j is AuthRepository (Lsk8); Lau31.c is the session DataStore provider (Lvv31). Keep feature flags, persisted account credentials, local session metadata and server-side anonymous session creation as separate layers.

**SessionManager dependency and coordinator boundary**

A further pass inspected the immediate injected dependencies and orchestration classes around the initial anonymous fallback:

- Lpb11 is tagged RootSessionCoordinator. Its constructor receives Lgs31 (session manager), Lq5d1, Ldrk0, Lmj2, and session-related sets/state. Lq5d1 is tagged UserScopeManager; Ldrk0 is tagged LogoutCleanupCoordinator.
- Ldrk0 coordinates logout cleanup through Lsk8, Lvv31 and Lgv31. Its coroutine handles retired authenticated storage and retired guest storage separately, including Failed to clean retired authenticated storage, Failed to clean retired guest session, and Failed to read retired guest sessions. This is local cleanup, not guest session creation.
- Lsk8 is tagged AuthRepository and injects Lcn8, tagged AuthStorage, plus credential/session and logging dependencies. The inspected methods resolve persisted credential records, update/remove credential storage and coordinate user-scope work. Lcn8 uses an application-context-backed store and local maps/metadata, with migration/ownership handling; its inspected methods are storage operations, not an anonymous HTTP create endpoint.
- The initial guest path Lgs31.b → Lau31.G enters Lmgo0.a, which is a coroutine Mutex.lock operation. It serializes the transition so concurrent guest-start attempts do not run simultaneously. After acquiring the mutex, Lau31.G runs Llzx.n, awaits a local async/mutex dependency, evaluates current session state, reads the selected session context through Llzx.u, and then calls Lau31.E. The inspected method graph contains no HTTP client, endpoint or request builder.
- The post-logout Lau31.F → Lau31.E route uses the same manager state transition family, while Lau31.E resolves/checkpoints local state through Lv2f0 and Lvv31.
- This is a more complete view of the local lifecycle boundary: RootViewModel → RootSessionCoordinator/SessionManager → mutex + resolver + AuthRepository/AuthStorage + DataStore + cleanup coordinator. The concrete operation that obtains or refreshes the server-side anonymous session is still not identified in these inspected dependencies. Do not assume the global /backend-anon/ base or anonymous-session profile string reveals its endpoint.

**Evidence limits:** method names shown above are obfuscated DEX class/method identifiers; descriptive names such as SessionManager and LocationCookieInitializer are observed logger tags, not recovered Java/Kotlin source class names. No guest token was generated, no live account/session request was made, and no server behavior was inferred from the client-only DEX. No ChatJS guest-session implementation exists yet.

## Model discovery and conversation requirements

Observed in `assets/chatgpt_services.valdimodule`:

- `src/generated/ChatGPTConversationApiClient.js` exposes `getModels` and `getChatRequirements`.
- Request paths include `/backend-api/models` and `/backend-api/sentinel/chat-requirements`.
- Chat-requirements response identifiers include challenge-related token, Turnstile, and proof-of-work fields.
- The service module wires together `OAINetworkClient`, `OAIBearerAPIService`, device-integrity support, an HTTP client, and streaming clients.

## Sending messages and streaming responses

The same module contains:

- `ChatGPTDirectResponseClient` and `ChatGPTConversationTransportAdapter`.
- Conversation request paths including `/backend-api/f/conversation` and `/backend-api/conversation`.
- Client request metadata strings including `conversation_id`, `parent_message_id`, `history_and_training_disabled`, `enableModelWrittenDIL`, model-written DIL fields, and conversation mode/metadata.
- An explicit `ChatGPTDeviceIntegrityProvider` integration. The client reports that some accounts require a first-party device-integrity provider before sending messages and that a required first-party integrity check can fail. Do not bypass this check or claim an arbitrary Node.js host can satisfy it.
- Request-header identifiers including `OpenAI-Sentinel-Chat-Requirements-Token`, `x-sentinel-dc`, `x-sentinel-payload`, `oai-device-id`, `oai-client-type`, `oai-package-name`, `user-agent`, `Authorization`, and `ChatGPT-Account-Id`.
- The string `oai-telemetry` also occurs in request metadata. Its exact meaning and whether it is required for a given request were not established in this scan. ChatJS's zero-telemetry rule remains in force; investigate this deliberately before implementing any such field.

Streaming modules include `ChatGPTStreamingWorkerRuntime`, `ChatGPTStreamingWorkerClient`, `ChatGPTStreamingResponseProcessor`, `ChatGPTStreamingProtocol`, `ChatGPTStreamingContracts`, `ChatGPTConversationEventDecoder`, `ServerSentEventClient`, and `StreamingHTTPClient`.

Embedded strings identify direct and polling stream modes, message deltas, reasoning events, DIL results, entity references, conversation state, stream handoffs, resume tokens, and the `message_stream_complete` event. The HTTP module validates the `text/event-stream` response type. This is evidence of a real client-side streaming protocol; complete event schemas and state transitions still need tracing.

## Files and attachments

The client module includes `ChatGPTFileUploadService` and request paths:

- `/backend-api/files`
- `/backend-api/files/process_upload_stream`
- `/api/estuary/upload_content_bytes`
- `/api/estuary/upload_content_and_finalize`

Strings identify upload creation, file-content transfer, processing/finalization, file metadata, upload limits, cancellation, and signed upload URL handling. The package also contains host upload transports and references to blob-storage URL domains. Exact multipart/chunk schemas, signature lifetime, and retry rules remain to be traced.

## Conversation history, image gallery, and Library

Observed client components and request paths include:

- `ChatGPTConversationHistoryClient`: `/backend-api/conversations`, `/backend-api/conversation`, `/backend-api/pins`, and `/backend-api/files/download`; strings include pagination, offset/limit, order, archive state, title, messages, and rename/delete/pin operations.
- `ChatGPTImageGalleryClient`: `/backend-api/my/recent/image_gen` and `/backend-api/images/bootstrap`; the client can fall back to inspecting recent account conversations when the generated-image library is unavailable.
- `ChatGPTLibraryClient`: `/backend-api/files/library`, `/backend-api/files/library/nodes`, `/backend-api/files/library/bookmarks`, and `/backend-api/files/library/directories`, with folder, bookmark, saved-entity, thumbnail, and inline-content models.

## Related shipped client modules

Additional Android Valdi modules include `oai_platform_services`, `oai_conversation`, `oai_attachments`, `oai_voice_service`, `oai_reasoning`, `oai_websocket`, `chatgpt_global_search`, `memory_settings_ui`, `personalization_settings_ui`, `codex_core`, `codex_api`, `codex_protocol`, and `codex_ui`. Their exact responsibilities and data models require separate inspection.

The Codex-related Android module strings include paths such as `/backend-api/wham/profiles/me`, `/backend-api/codex-app-server/prediction`, and `/backend-api/codex/remote/control`. Treat these as observed references, not evidence that ChatJS has implemented those capabilities.

## What is verified versus outstanding

**Verified in this first pass:** the archive contains Zstandard-compressed Valdi modules with embedded client module identifiers, request paths, authentication/header names, transport components, and protocol/event strings described above.

**Not yet completed:** full Valdi bytecode/source reconstruction, method-level call graph, exact serialized request bodies for all operations, complete response schemas, exact authentication/sign-in mechanism, credential refresh/revocation behavior under live use, Sentinel/device-integrity implementation, SSE event decoding/state transitions, upload chunk/signature behavior, and end-to-end testing against an authorized ChatGPT account.

The Android archive is the technical basis for the client integration. Do not dismiss these interfaces because public API documentation does not cover them. At the same time, do not bypass first-party authentication/device-integrity checks or claim unverified compatibility.

## 2026-11-24 — Current XAPK integrity-provider and DEX call-reference scan

**Source:** ChatJS Project → Sources, ChatGPT-Android.xapk. Package manifest identifies ChatGPT 1.2026.321, version code 2632129, package com.openai.chatgpt, minimum SDK 32 and target SDK 37. The supplied XAPK is 123,574,190 bytes; its SHA-256 independently recomputed as 22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d. ZIP CRC verification passed.

The base APK contains 5,080 ZIP entries, ten DEX files and 111 compiled Valdi modules. All 111 Valdi modules were Zstandard-decompressed for a static pass (77,451,888 decoded bytes). This is a newer source package than the historical extracted-payload archive described above; its 111-module count must not overwrite the older archive's 121-module inventory.

### Valdi-side provider interfaces and conversation gating

Observed in chatgpt_services:

- Distinct interfaces/types named ChatGPTRequirementsIntegrityProvider and ChatGPTDeviceIntegrityProvider, with a createChatGPTDeviceIntegrityProvider factory reference.
- The generated conversation API client identifies GET /backend-api/models and POST /backend-api/sentinel/chat-requirements. The exact serialized request body and complete response schema have not been reconstructed.
- The chat-requirements response references token, turnstile and proofofwork fields. A separate validator refers to app_attest_challenge; its exact semantics and relationship to the Android native provider are not established.
- The conversation send path checks result.requiresDeviceIntegrity. The client has explicit failures for accounts requiring a first-party provider, failure to start or complete that provider, invalid request headers, and invalid challenge data. It does not silently describe an arbitrary host as verified.
- The integrity response model contains bodyPatchJson, headerNames and headerValues. The module checks returned header names against the openai-sentinel- prefix. The exact body-patch merge and header-application sequence remains to be traced.

### Android native DeviceIntegrity contract

The Android DEX contains com.openai.valdi.integrity.DeviceIntegrityService with an asynchronous prepare(request, completion) operation returning a cancellable DeviceIntegrityTask. Completion has onSuccess(DeviceIntegrityResponse) and onFailure(DeviceIntegrityFailure). DeviceIntegrityRequest fields are accessToken, accountId, baseUrl, conversationId and parentMessageId. DeviceIntegrityResponse fields are bodyPatchJson, headerNames and headerValues.

The implementation is wired through the native OAIDeviceIntegrity service, not solely a JavaScript environment-information provider. Static method-reference and constant inspection of the relevant DEX classes shows this Android flow:

1. The native helper issues POST /backend-api/sentinel/chat-requirements with an empty JSON object ({}), then reads a non-empty token property from the JSON response. This establishes the request body for this particular native helper only; it does not reconstruct the generated Valdi conversation API client's full request schema or response contract.
2. The first integrity operation generates 256 random bytes using SecureRandom, Base64-encodes them with Android URL-safe/no-wrap flags, and passes that nonce to the Google Play Integrity token generator. The resulting genuine token is used in the Play Integrity exchange below. The Android implementation has explicit failures when Google Play does not return a genuine device-integrity token.
3. The native helper POSTs JSON to /backend-api/playintegrity. The observed JSON keys are package_name, nonce, integrity_token, and device_id; the package value in this implementation is com.openai.chatgpt.internal. Requests are sent with application/json, bearer authorization, ChatGPT-Account-Id, OAI-Client-Type: android, OAI-Device-Id, OAI-Package-Name, and User-Agent. The HTTP helper disables redirects and sets 30-second connect/read timeouts.
4. The Android helper processes Set-Cookie through a CookieManager for the integrity endpoint and requires a valid device-verification cookie. It then fetches the chat-requirements token via the empty-body native request and obtains a second Play Integrity token for a request hash. The hash input is now reconstructed exactly: the helper serializes a JSON object in this field order — account_id, conversation_id, device_id, parent_message_id — with string values escaped for JSON; encodes the resulting string as UTF-8; computes SHA-256; and converts each digest byte to lower-case two-digit hexadecimal. The caller supplies accountId, device_id, conversationId and parentMessageId in that order to the hash helper. This request hash is passed to the Standard Integrity token provider's requestExpressIntegrityToken operation. It is distinct from the first token, which was requested with a random 256-byte nonce to establish the device-verification cookie.
5. The resulting DeviceIntegrityResponse contains bodyPatchJson: null for this inspected native method and parallel header-name/header-value arrays. In order, the header names are OAI-Client-Type, OAI-Device-Id, OAI-Package-Name, User-Agent, OpenAI-Sentinel-Chat-Requirements-Token, and X-Sentinel-Payload. The corresponding values are android, the generated app device UUID, com.openai.chatgpt.internal, the helper's user-agent, the chat-requirements token, and a JSON string with shape {"bot_token":{"play_integrity_token":...,"chat_requirement_token":...}}. This describes the native response bridge; exact Valdi-side validation/application ordering still requires tracing.

Important package guard (now confirmed end to end): the native factory is registered in assets/valdi_native_modules and its DEX onLoadModule path creates a Valdi wrapper whose createDeviceIntegrityService method instantiates the class implementing DeviceIntegrityService. Its worker calls Context.getPackageName() and requires exact equality with com.openai.chatgpt.internal; otherwise it throws Install the official-debug-signed internal Android application to verify this device. The supplied public XAPK manifest is com.openai.chatgpt, so this worker rejects the public package before reaching the HTTP exchange. The factory is bundled, but the native operation is internal/debug-package-only in this XAPK. Do not remove, imitate or bypass the guard.

The helper creates device_id with UUID.randomUUID().toString() when no valid saved value is present, and persists it in app-private SharedPreferences file oai_device_integrity under key device_id; failure to save is fatal to this path. This is a client-install identifier generated by the app, not a physical hardware serial, MAC address, or cryptographic attestation. Its lifetime, rotation and deletion semantics remain unknown. The DEX also contains Play Integrity retry/cooldown handling after TOO_MANY_REQUESTS, Play Services/Store failure paths, HTTP errors and task cancellation that disconnects the HTTP connection.

The inspected helper's user-agent string identifies ChatGPT/1.2026.209 (build 2620909), whereas the current XAPK manifest identifies version 1.2026.321 (version code 2632129). The reason for this mismatch is unknown and is another reason not to assume that the internal native code path reflects the public app's active runtime path.

### Architecture consequence

Keep three concepts separate:

- Host environment context: truthful, minimal information about the Node.js runtime and capabilities, with additional OS/device details only through an explicit optional host adapter.
- Client-install identity: a protocol-specific identifier only where the observed client flow requires it, with deliberate generation, storage and deletion semantics. Do not assume it is a physical hardware identifier.
- First-party integrity/attestation: a challenge-bound result produced by the genuine platform/provider mechanism. It cannot be replaced by arbitrary environment metadata, a synthetic Android profile, or a made-up token.

Android Google Play Integrity is platform-specific. A Linux or Windows Node.js host must not pretend to be an Android device or claim Play Integrity success. A supported host adapter may invoke a genuine platform attestation provider when one exists; otherwise the capability must be reported as unsupported/unavailable and the corresponding account/request limitation surfaced honestly. Test-only fixtures may simulate provider outcomes but must never be used as production attestation.

### Evidence class and limitations

**Observed:** package version/inventory, compiled Valdi interface names and string contracts, DEX class/field/method identifiers, relevant invoke references, endpoint/header/body-key constants, persistent preference names and error/cancellation strings.

**Not established:** exact mapping of every retryable status to retry/refresh/terminal behavior and attempt ceilings; DeviceRateLimits record schema/scope/retention and its relationship to the 300-second cooldown marker; cooldown marker persistence across process restart; exact cookie name/value, expiry and deletion semantics; device UUID lifetime/rotation/deletion; why the internal-only package guard exists; why the native helper user-agent version differs from the XAPK version; app_attest_challenge semantics outside the null-body-patch native response; Windows equivalent; a separate public-build provider in another authentic source; or any authorized live-account behavior. Selected DEX methods are now disassembled, but this is not a complete decompilation or live service test. Do not treat it as an implemented ChatJS provider.

### Standard Integrity provider lifecycle and strict endpoint/cookie validation

The Android native helper uses the Google Play Standard Integrity API, not a locally computed substitute:

- Provider preparation uses the StandardIntegrityManager path (prepareIntegrityToken / warm-up). The helper builds the preparation request with the bundled cloud-project-number value and waits up to 30 seconds for provider preparation.
- The prepared provider is cached by the native helper. Token requests use the Standard Integrity requestExpressIntegrityToken path and wait up to 30 seconds for completion.
- The first request uses the 256-byte random URL-safe/no-wrap nonce as its request hash. The second request uses the lower-case SHA-256 hex value of the canonical identity JSON described above.
- The native helper checks Google Play's API exception status code -19; on that path it invalidates/re-prepares the cached provider and retries token acquisition once. Other provider failures propagate. The bundled SDK also contains the explicit invalid/outdated-provider message directing the caller to call prepareIntegrityToken; the exact symbolic mapping of the numeric status in this callsite is not asserted beyond the observed retry branch.
- Empty token strings are rejected with the message that Google Play did not return a genuine device-integrity token.

### SDK retry classification and local cooldown

The OpenAI integrity SDK's PlayIntegrityTokenGenerator wrapper has a static retryable-status classification list containing -19, -18, -12, 0, -100, -8, and -9. The classification helper checks membership in this list and a feature/configuration condition; this is not evidence that every listed status is unconditionally retried. A separate token-generation coroutine contains additional status branches (including -15 and -14) whose complete state transitions and retry counts have not been reconstructed. Do not turn these partial lists into a new blanket retry policy.

The wrapper has a local cooldown gate for the TOO_MANY_REQUESTS condition. Its default duration is constructed as 300 seconds. When active, the helper surfaces a local-cooldown state with cooldown_remaining_ms and rejects token generation with the message Play Integrity token generation skipped because the client is cooling down after TOO_MANY_REQUESTS. The helper checks this gate before proceeding and records a local cooldown marker when the applicable SDK result requests one. This is functional throttling, not an instruction to retry sooner or to bypass the limit.

The SDK also constructs a data store named DeviceRateLimits. Its observed coroutine methods read rate-limit records, discard expired records, filter/sort records and remember updated records; it has explicit read, expiry-cleanup and write failure paths. The exact record schema, account/device scope, retention policy, and relationship between this store and the 300-second in-memory/local cooldown marker are not yet established. Do not assume cooldown state survives process restart until that is traced.

The same SDK methods assemble instrumentation metadata such as initialization_retry_count, token_retry_count, lifetime_integrity_initialization_count, play_services and play_store. These are diagnostic/metrics data, not required client request behavior established by this scan. ChatJS's zero-telemetry rule means they must not be sent to any analytics/telemetry endpoint or copied as background reporting. Reproduce only functional retry/throttle behavior that is actually required by the client protocol; keep any necessary retry state local and explicit.

The native helper applies strict origin constraints before constructing either relative API request. The base URL must be an HTTPS origin on one of openai-staging.com, chatgpt-staging.com, openai.com, or chatgpt.com, including their subdomains. It rejects user information, explicit ports, a non-empty raw path, query strings and fragments. This is an origin allowlist, not a general-purpose URL fetcher.

For its HttpURLConnection requests, the helper uses POST, JSON Accept and Content-Type, bearer authorization, ChatGPT-Account-Id, Android client/device/package headers, and a 30-second connect and read timeout. Redirect following is disabled. Only 2xx responses are accepted; non-2xx responses become a typed HTTP error. The response body is read in 8 KiB chunks with a 256 KiB maximum; oversized responses fail with a dedicated device-verification requirements error. Cancellation disconnects the active connection.

Cookie handling is part of the two-stage exchange:

- The playintegrity response's Set-Cookie values are parsed as HttpCookie objects and passed through the Android CookieManager.
- The candidate cookie name must end in _playintegrity; its value must be non-empty, it must be Secure and unexpired, and its domain must match a trusted first-party host or its permitted parent-domain suffix.
- Cookie paths are validated against the integrity helper's backend API endpoint path allowlist. A missing path is normalized to /backend-api before storage. The inspected allowlist includes /backend-api/f/conversation, /backend-api/sentinel/chat-requirements, and /backend-api/conversation; the helper does not accept arbitrary cookie path scope.
- The helper reuses a compatible existing default CookieManager; if there is no default handler, it creates a CookieManager with CookiePolicy.ACCEPT_ORIGINAL_SERVER and installs it as the process default. An incompatible existing handler fails closed with a secure-cookie-store error. The native operation then explicitly checks that a valid device-verification cookie is present before continuing.

The native bridge runs its work on a cached executor and posts success/failure completion through a main-thread Handler. The DeviceIntegrityTask exposes cancellation; the shared cancellation token is checked across the work, and the active HTTP connection is disconnected. The DeviceIntegrityRequest constructor order is accountId, accessToken, baseUrl, conversationId, parentMessageId; the response constructor order is bodyPatchJson, headerNames, headerValues.

These are observed details of the internal-package native implementation only. The public XAPK/package mismatch and version mismatch described above remain decisive limitations; do not assume this implementation is selected by or available to the public Android build.


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


## 2026-11-24 — Separate event-gated SessionManager guest-start path

A further DEX call-site trace found another caller of the initial anonymous-session start wrapper, separate from the welcome CTA action-29/login-child path:

- Lej6.invoke() constructs La991, passing its current Lks31 AuthSession wrapper, a Lw4h0 state-flow dependency, a Function0 callback and other login/session dependencies.
- La991.G(Louf0) compares the incoming event with the observed Lw891.a event value and evaluates a Lcq41.e condition. The matching branch launches the generated Lmuz0 coroutine with branch value 9.
- Branch 9 handles a client marker identified in the DEX as protobuf_analytics_events/v1/ChatgptClientMarkerUserSessionBootstrapRequestType, invokes the La991.R1 Function0 callback, and calls Lgs31.b(...). The Lgs31.b wrapper delegates to Lau31.G(...), the SessionManager's initial anonymous-start transition.
- This establishes a second event-gated call path into the local SessionManager guest-start operation. The producer/meaning of the Louf0 event and the Lcq41.e eligibility condition are not recovered. The DEX trace does not connect this event to the separate welcome CTA action-29 → Lgs10 → Ltu10 → Lqik0 → Lnik0 path.
- The previously inspected Lau31.G implementation still leads through a coroutine mutex, local model/session/feature evaluation, local state resolution and DataStore transition. This additional caller does not reveal an HTTP client, guest-create route, request body, server-issued guest token or composer-send endpoint.
- The ChatgptClientMarkerUserSessionBootstrapRequestType value is client instrumentation. ChatJS must not transmit or reproduce it as telemetry.

**Evidence boundary:** this is static DEX evidence from selected method and call-site inspection using a purpose-built partial bytecode scanner, not a full decompilation or complete call graph. The trigger's semantic name, event producer, relationship to welcome CTA, and server-side guest creation remain unknown. Do not merge the two UI/event paths or infer a network request from the marker name.


## 2026-11-24 — Correction: Lt891, not W891.a, dispatches local guest startup

A subsequent instruction-by-instruction decode of La991.G(Louf0) corrects the previous branch summary above. The equality check against singleton Lw891.a follows a distinct path: it reads the current Lw4h0 value, passes it to Lcq41.e, and returns. **It does not launch the guest-start coroutine.** The coroutine is launched by the separate `instance-of Lt891` branch.

The Lt891 branch constructs Lmuz0 with branch label 9. In that coroutine, the captured La991.R1 callback is invoked and the Lt891.a integer payload is read; the coroutine constructs the local Llnp0 argument and calls Lgs31.b, which delegates to Lau31.G. Thus the call path into the local SessionManager start is `La991.G(Lt891)` → `Lmuz0` branch 9 → callback / `Llnp0` → `Lgs31.b` → `Lau31.G`. The event payload is used as an input to this local start; this is not itself the server-side guest-create request.

Two Lt891 construction sites are currently observed:

- `Lq20.invoke` constructs `Lt891(5)` and passes it to a captured Function1. Lq20 is constructed from two UI callsites (`Llal1.h` and `Lej10.c`) with a Context and Function1. The ultimate callback target is not proven.
- The branch-18 case of `Ldo1.invoke` (selected by a constructor call in `Lp1w.invoke`) can construct `Lt891(6)` when its inspected `Lh70` value is null, then passes it to a captured Function1. `Lp1w` is constructed by `Le2w.e`, whose UI component contains the `ConversationSidebar` label. The actual callback target and runtime path into this La991 instance are not proven.

The event producer(s), meaning of payload values 5 and 6, and concrete callback wiring into the La991 instance are still open. Do not claim that the ConversationSidebar or WebView path necessarily starts a guest session. The welcome CTA action-29/login-child flow remains separate; no evidence yet connects it to either Lt891 producer. The associated ChatgptClientMarkerUserSessionBootstrapRequestType is instrumentation, not a ChatJS telemetry field.

**Evidence boundary:** static method/call-site inspection of selected DEX methods and generated coroutine/lambda code; this is not a complete decompilation or runtime trace. No HTTP client, route, request body, or server-issued guest token is exposed by this branch. Guest create/refresh and composer-send protocols remain unknown.


## 2026-11-25 — Upstream callback ownership for the Lt891 guest-start candidates

A targeted caller/constructor pass followed the generic callbacks that carry the two observed `Lt891` values one layer above their emitters:

- The WebView-side `Lq20` callback is supplied at construction. Its two observed constructor sites are `Llal1.h` and `Lej10.c`. In the `Lej10.c` route, the first `Function1` is passed by its caller `Ljpc.invoke`, which forwards captured callback values from generic object fields. The separate `Llal1.h` callers are `Lj20.invoke`, `Lss.invoke`, `Lt07.invoke`, and `Ly641.a`. These identify callback provenance through UI wrappers, not the ultimate callback implementation.
- The ConversationSidebar-side callback is passed as a `Function1` input to `Le2w.e`, then stored by `Lp1w` and forwarded into `Ldo1`. `Le2w.e` is reached by the `Ll1w` and `Lq1w` recomposition wrappers created from `Le2w.j`. The callback parameter is supplied through the parent `Le2w.j` inputs; `Le2w.j` is called from `Lx0w.invoke` and `Lm1w.invoke`, with `Lx0w` created by `Le2w.c`. This narrows ownership to a parent ConversationSidebar callback parameter, but its concrete target is opaque.
- A static reference scan of all ten supplied base-APK DEX files found no call-site method reference and no method-handle entry to `La991.G(Louf0;)` outside its own definition. The only field with declared type `La991` is `Lz891.q`. This does not exclude reflection or dynamically supplied behavior, but the inspected DEX does not statically bind either candidate `Function1` to this `La991` instance.
- Integer values 5 and 6 remain opaque constructor payloads in the `Lt891` value object. Their business meaning, the exact callback implementations, and any relationship to welcome CTA action-29 remain unverified. Do not infer that WebView or ConversationSidebar necessarily starts a guest session.
- The established local state path remains only: `La991.G(Lt891)` → `Lmuz0` branch 9 → `Lgs31.b` → `Lau31.G`. The inspected branch and SessionManager methods do not reveal the server-side guest-create HTTP request or guest composer route.

**Evidence boundary:** method/field reference and constructor-call analysis across the ten DEX files using the purpose-built partial scanner; no full decompilation, runtime callback observation, or live network operation. No ChatJS behavior is implemented by these findings.


## 2026-11-25 — Virtual ViewModel intent dispatch and callback-instance boundary

`La991` extends the shared `Lv6a` ViewModel base. `Lv6a.H(Louf0)` invokes virtual `G(Louf0)` on its receiver, so a generic function reference that captures a `La991` instance and calls `Lv6a.H` can dynamically dispatch to `La991.G` even without a direct method reference to `La991.G`.

The generated `Le6` Function1 bridge captures a `Lv6a` receiver and invokes `Lv6a.H`. Its observed construction is in `Lgbs.e` under the Compose label `Composer`; it is passed to `Lzx1.l`, whose UI label is `FreeThinkingGaugeNuxHost`. This proves the generic ViewModel-intent callback pattern, but not that either candidate guest-start callback receives this particular object.

The WebView-side `Lq20` callback enters through `Lej10.c` (`DilWebViewHost`) and the generated `Ljpc.invoke` wrapper. A separate `Lq20` constructor path is called by `Llal1.h`; one traced caller reaches `Ly641.a` from `Lyi1.J`, labelled `SettingsWorkspaceListItem`. The ConversationSidebar-side `Ldo1` callback remains a parent Function1 forwarded through `Le2w.c` → `Lx0w`/`Lm1w` → `Le2w.j` → `Le2w.e` → `Lp1w`.

The scan across all ten DEX files still found no direct call-site method-id or method-handle reference to `La991.G` outside its definition. That static absence does not rule out virtual dispatch through `Lv6a.H`; however, the observed `Le6` instance is in the Composer/FreeThinkingGaugeNuxHost path and is not statically connected to either the WebView or ConversationSidebar callback. Their concrete callback objects and receiver bindings to the same `La991` instance remain unknown. The confirmed `Lt891` branch reaches only local SessionManager coordination (`Lmuz0` branch 9 → `Lgs31.b` → `Lau31.G`), not a recovered guest HTTP create/refresh or composer-send request. The instrumentation marker remains excluded from ChatJS.

## 2026-11-25 — WelcomeLanguageEnrollment local preference writer

A further Android DEX trace followed the actual writer of the local welcome-language opportunity preference. This identifies the local record-construction path, but not the origin of the separate guest presentation copy model.

### Preference key and local model
- `Le7f1.invoke` constructs a typed `Lap6` PreferenceStore key named `welcome_language_opportunity`, using `Lxlh1.serializer()` and a default `Lylh1` value whose fields are `Lcmh1 = null`, boolean false, and nullable long = null.
- `Lvlh1` owns the `Lzlh1` key and the `Lzyv0`-backed read/update operations. Its `a()` path reads the current `Lylh1`; `d()` and related enrollment paths update it. Its `e(Lcmh1,String,Lfmh1)` path records the `anonymous_welcome` event; that event is Android instrumentation and must not be copied into ChatJS.
- `Lvlh1.c(Lr10,Lof70)` is invoked from `Ltp3.P` and from a separate `Lslh1` coroutine. The exact lifecycle/event condition that selects the coordinator path is not fully recovered.

### Concrete writer coroutine
- `Lvlh1.c` launches `Ltl30.invokeSuspend`. The coroutine first reads the stored `Lylh1` through `Lzyv0.b`.
- It evaluates `Lxr10.h(Lof70)`, which returns the Statsig-derived `Lplh1` presentation/feature model. The coroutine checks its nested mode/flags (including the `skip` mode) and evaluates additional `Lof70.c` / `Lof70.G` feature parameters.
- It collects local context: the device locale via `Lqcf1.G(context).toLanguageTag()`, application/environment information via `Le3k0`, and user/install/session-related values already supplied to the coroutine. It also reads the current wall-clock timestamp and a serialized enum name.
- It constructs a separate `Lcmh1` record. One explicit value is `no_local_prior_use_install_history_unknown`; other fields include timestamp, enum/list values, locale/app-context strings, the `Lplh1` configuration object and boolean flags. The code therefore derives this enrollment record locally using feature-configuration and app context; it is not simply copying the `Lnlh1` presentation DTO.
- At `Ltl30` instruction offset `0x1ab`, it calls `Lzyv0.m(Function1,...)` with generated callback `Lhi41` branch 19. That callback passes the existing `Lylh1` and newly constructed `Lcmh1` to `Lylh1.a` (the data-class copy/update method) and returns the updated `Lylh1` to the PreferenceStore. This is the concrete local write path.
- Later work in the same coroutine invokes `Lz840.d` and `Ljb40` account/profile repository operations. Their inspected service/coroutine paths contain connector/profile operations and Cloudflare handling; they are not evidence that the welcome presentation model or `guestCtaCopy` was fetched from a guest-session endpoint. Keep that service branch separate until an actual data dependency is traced.

### Evidence boundary
- This establishes the local default key, read, Statsig/config evaluation, local metadata construction, update lambda, and PreferenceStore write.
- It does not establish the server source, fetch route, cache/update policy, or writer for the separate serialized `Lnlh1` model containing `guestCtaCopy`. The `Lnlh1` presentation model and `Lcmh1` enrollment record must remain distinct until their exact data-flow connection is shown.
- It does not create an anonymous session, call the guest SessionManager start method, generate a server guest ID, or send a composer request. `anonymous_welcome` is telemetry instrumentation and remains excluded from ChatJS.
- This was selected static DEX disassembly/reference tracing of the supplied public XAPK, not a full decompilation or runtime network trace. No user/account request was made and no session was created.

## 2026-11-25 — Statsig welcome parameter declarations and evaluation boundary

A further DEX pass mapped the exact Statsig parameter declarations consumed when constructing the Android welcome presentation model.

### Typed parameter declarations
- The static initializer of Lfs10 declares these named Statsig parameters using the Ly7t typed-parameter builder:
  - welcome (boolean)
  - welcome_skip_available (boolean)
  - welcome_button_copy (enum/string presentation choice)
  - welcome_language_presentation (enum presentation mode)
  - welcome_language_suggested_tags (list)
  - welcome_language_configuration_version (string; declared default is the empty string)
  - welcome_disclosure_use_combined_disclosures (boolean)
  - welcome_disclosure_use_alternative_subtitle (boolean)
  - welcome_disclosure_hide_subtitle (boolean)
  - welcome_disclosure_shorten_accuracy_disclosure (boolean)
  - welcome_disclosure_guest_cta_copy (enum/string choice)
- Lxr10.h(Lof70) reads these typed keys through the app's StatsigManager interface and constructs Lplh1. It also checks a separate Lo680-typed Statsig gate/condition before returning the complete model; exact remote parameter/gate defaults are not inferred from the callsite alone.
- Lnlh1 is the generated Kotlin serializer for Lplh1, not the data model. Lplh1 is embedded by Ltl30 as field j in Lcmh1; Lcmh1 is then stored within Lylh1 under the local welcome_language_opportunity preference.

### What the Statsig manager trace establishes
- Lof70 is the app-facing experimentation interface; Lmx71 is its StatsigManager implementation. Lxr10.h calls the typed parameter evaluation methods on that interface.
- Lmx71 wraps a Statsig SDK instance (Lix71 / Lzw71) and reads evaluated config/parameter results from the SDK's current in-memory/cache-backed state. The app-facing parameter getters are not the guest-session HTTP client.
- The SDK wrapper also has a local SharedPreferences-backed override/default store (Llmt0) and asynchronous SDK lifecycle/user-update hooks (Lix71). These are distinct from the welcome-enrollment PreferenceStore (Lzlh1).
- The inspected getters do not identify the upstream Statsig network refresh endpoint, exact response/config payload, download timing, persistence/expiry strategy, or offline fallback precedence. That SDK acquisition/cache trace remains open.

### Separation and policy
- This is a feature-configuration/presentation path inside the shipped ChatGPT Android app. It is not another inference provider, model backend, or ChatJS runtime provider.
- ChatJS must not port Statsig analytics, exposure logging, SDK diagnostics, anonymous_welcome, or captured-event transport. The owner requires zero telemetry and no unsolicited network traffic.
- No guest SessionManager start, guest HTTP create/refresh request, server guest ID, or composer-send request is established by these Statsig keys.

Evidence boundary: selected static DEX method and class-initializer inspection of the supplied public Android 1.2026.321 XAPK. No live Statsig request, analytics call, account operation, or guest session was initiated.

## 2026-11-25 — ConversationViewModel guest-session recovery branch

A further instruction-level trace located a second, conversation-specific call into the anonymous `SessionManager`, distinct from the root startup fallback and the `La991` / `Lt891` event path.

### Coordinator and event dispatch
- `Ljqk0` is the Android conversation coordinator/ViewModel (superclass `Lgqk0`). Its constructor receives both `Lks31` (authenticated `AuthSession` wrapper) and `Lgs31` (anonymous `SessionManager`); the corresponding instance fields are `Q1` and `R1`.
- `Ljqk0.G(Louf0)` handles conversation UI/session events. On the `Lkmk0` event path, after the local callback/guard at `Lx2a.invoke`, it constructs `Lps30` with byte label `16` and launches it through `Lv6a.v`.
- `Lps30.invokeSuspend` contains a 29-entry packed switch. The decoded key `16` targets bytecode offset `0x350`; this is the branch selected by the `Ljqk0.G` callsite, not a neighboring branch in the shared generated coroutine class.

### Exact label-16 branch
- The selected branch logs under `MessageStreamingService` and reports: `Conversation was requested with no messages, or all messages are unsupported`.
- It constructs `MessageNotFoundException`, creates the corresponding conversation error model, and emits that error through the captured `Ljl90` event/state stream.
- The same branch then reads the `Ljqk0.R1` field (the injected `Lgs31` SessionManager), reads the `Lkmk0` event's integer field `a` and detail field `b`, constructs an `Llnp0` reason value from that event data (including `a + 1` and constant `22`), wraps the detail in `Lzbz` / `Lhr31`, and invokes `Lgs31.b(...)` with the coordinator's local session context.
- This establishes an actual conversation-feature event/error path that requests the local anonymous SessionManager start transition after the `MessageNotFoundException` / unsupported-empty-conversation condition. It is stronger than the separate `AnonymousSessionLoading` presentation component, whose ViewModel construction did not inject `Lgs31`.

### Evidence boundary
- This call is still a client-side SessionManager transition. The selected `Lgs31.b` / `Lau31.G` path inspected so far performs local mutex, feature/eligibility and state/DataStore work; this finding does not expose a guest HTTP create/refresh route, a server-issued guest ID/token, or proof that remote session creation succeeded.
- The `Lkmk0` event's business meaning, the significance of the numeric `Llnp0` reason fields, and the exact upstream UI/action that creates the event remain open. Do not describe this as a universal retry or assert that every message-not-found error starts a guest session; it is this specific guarded event branch.
- This path is separate from the welcome CTA action-29 → `Lnik0` login-child flow and from the `La991` / `Lt891` callback path. No edge connecting those paths has been found.
- This was static instruction-level DEX analysis of the supplied Android 1.2026.321 public APK. No request was sent and no guest session was created by the analysis.

## 2026-11-25 — Statsig initialize/cache and same-instance conversation intent dispatch

### Statsig welcome configuration acquisition
- The bundled Android Statsig SDK maps `Initialize` to `https://featureassets.org/v1/i` and `log_event` to `https://prodregistryv2.org/v1/e` through `Lyx71` and `Lgrc1`. Similar `GetRemoteConfig` and `RemoteConfigSource` models seen in the scan belong to RevenueCat request handling, not Statsig.
- `Lzy71.g` builds the initialize JSON POST with `user`, `statsigMetadata`, `sinceTime`, `hash`, `previousDerivedFields`, and `full_checksum`. `Lmy71.invokeSuspend` resolves the URL, creates the request and submits it through the SDK transport.
- `Lbdb.z` applies JSON content type, `STATSIG-API-KEY`, SDK type `android-client`, SDK version `5.5.0`, and client time; the worker may add `STATSIG-STABLE-ID`. Header names only are recorded; no key value or user/session secret is captured.
- `PersistedInitializeResponse` (`Lslt0`) converts to evaluated `Lh3f0` feature-gate, dynamic-config and layer-config maps. The app-facing `Lmx71` StatsigManager exposes typed getters; `Lxr10.h(Lof70)` consumes evaluated `welcome_*` values to build `Lplh1`, whose generated serializer is `Lnlh1`.

### Cache and fallback separation
- SDK startup restores `ondiskvaluecache`, `Statsig.LOCAL_OVERRIDES`, and `Statsig.STICKY_DEVICE_EXPERIMENTS` through `Lz381`; `Lz381.t` restores persisted initialize response maps and supports per-user caching via `Statsig.CACHE_BY_USER` / `Li1d1`.
- A separate `statsig.network_fallback` (`networkfallback`) store contains fallback URLs. The inspected `Lou70` writer assigns a seven-day expiry and retains at most ten previous fallback URLs. This is fallback-host retention, **not** the initialize-response cache TTL.
- The cache-refresh helper `Lz381.s` takes a caller-supplied age parameter. The effective production age/default and complete offline/default precedence were not established in this pass.

### Same-instance conversation event dispatch
- `Ljqk0` is the concrete conversation ViewModel and extends `Lgqk0`; it receives `Lks31` AuthSession and `Lgs31` anonymous SessionManager in fields `Q1` / `R1`. `Lgqk0` extends `Lv6a`.
- Compose method `Lxjk1.f` receives a `Lgqk0` conversation ViewModel and constructs `Llu2`, a callback capturing that receiver. `Llu2.invoke` maps the incoming conversation event through `Lhkk1.t(...)`, then calls virtual `Lv6a.G(Louf0)` on the captured `Lgqk0` instance. Because `Ljqk0` is a subclass of `Lgqk0`, when this renderer is supplied the `Ljqk0` instance the call dispatches to that same instance's `Ljqk0.G` implementation. This resolves the generic callback dispatch mechanism for this conversation renderer; it does not mean every `Lgqk0` renderer uses `Ljqk0`.
- In the `Lkmk0` mapping branch, `Lhkk1.t` preserves event integer `a` and constructs a new `Lkmk0` with contextual `Lybz` route metadata. `Lkmk0` carries `a:int` and `b:Lybz`; `Lybz` carries a route descriptor `Lhe11`, optional `Long`, and boolean. `Lhe11` exposes content-key, label and same-route accessors. These types establish event shape, not the business meaning of the integer or route metadata.
- The guarded `Ljqk0.G(Lkmk0)` branch launches `Lps30` label 16. Its exact packed-switch branch logs the no-messages/all-unsupported `MessageStreamingService` condition, emits `MessageNotFoundException`, then invokes local `Lgs31.b` with event-derived reason/detail data. The inspected SessionManager path still performs mutex/feature/eligibility/DataStore work, not a guest HTTP create request.

### Privacy and evidence boundary
- Statsig `log_event`, `rgstr_e`, exposure reporting and the offline event queue are instrumentation. ChatJS must not port or call these endpoints, SDK diagnostics, analytics callbacks or telemetry buffering.
- Statsig initialize is feature-configuration retrieval from a bundled SDK; it contains a `user` object and SDK metadata. This is not a ChatGPT auth, guest-create or conversation endpoint. No ChatJS SDK integration is implemented or implied; any future adaptation requires separate necessity, minimization and explicit-operation review.
- The Compose-to-`Ljqk0.G` callback bridge and guarded local SessionManager recovery are static DEX findings. The `Lkmk0` producer/meaning, exact reason-code semantics, subsequent HTTP guest creation, guest composer request and Work protocol remain unknown. No live request or guest session was created during this research.

**Evidence boundary:** selected static disassembly/reference tracing of the supplied public Android 1.2026.321 APK; not a complete decompilation or runtime network trace.

## Android authenticated conversation, streaming, and upload clients — 2026-11-25

A second-pass scan of the supplied ChatGPT Android 1.2026.321 package decompressed all 111 Valdi modules. The `chatgpt_services` module exposes concrete authenticated service-client modules and route constants that were not present in the earlier first-pass notes.

### Generated conversation API client

`src/generated/ChatGPTConversationApiClient.js` exports `getModels` and `getChatRequirements`. Its generated request/response decoders include `ModelCatalogRequest`, `ModelCatalogResponse`, `ModelCatalogModel`, `ModelCatalogPreset`, `ModelCatalogVersion`, `ChatRequirementChallenge`, and `ChatRequirementsResponse`. The module contains the route constants:

- `/backend-api/models`
- `/backend-api/sentinel/chat-requirements` (the client strings include `POST` for this operation)

The response model strings include `models`, `default_model_slug`, `model_slug`, `supported_model_picker_upgrade_presets`, `versions`, `required`, `token`, `turnstile`, and `proofofwork`. This is a partial generated-schema inventory, not a complete field/validation reconstruction.

### Direct authenticated conversation client

`src/conversations/ChatGPTDirectResponseClient.js` exports `createChatGPTDirectResponseClient` and `createChatGPTDeviceIntegrityProvider`. Its symbols identify separate requirements-integrity and device-integrity provider roles, plus methods `prepare`, `streamResponse`, `resolveModel`, `resolveParentMessageId`, `send`, and `cancel`. It depends on the generated conversation API client, conversation transport adapter, streaming clients, the platform `OAIDeviceIntegrity` service, and the file upload service.

The client contains authenticated conversation route constants `/backend-api/f/conversation` and `/backend-api/conversation`. Request context symbols include `activeAccount`, `accessToken`, `accountId`, `baseUrl`, `conversationId`, and `parentMessageId`; observed HTTP header names include `Authorization`, `Bearer `, `ChatGPT-Account-Id`, and `Content-Type: application/json`.

Requirements/Sentinel-related symbols include `x-sentinel-dc`, `x-sentinel-payload`, and response header `OpenAI-Sentinel-Chat-Requirements-Token`. The code contains an explicit failure when `result.requiresDeviceIntegrity` is true but a first-party device-integrity provider is unavailable. It also has explicit failures for inability to start or complete the first-party integrity check. ChatJS must preserve these security gates; it must not fabricate Sentinel values, substitute a successful attestation result, or silently bypass a required provider.

The module also contains client-identification header names such as `oai-client-type`, `oai-device-id`, `oai-package-name`, and `user-agent`. Their complete construction/validation requirements are not yet reconstructed. The string `oai-telemetry` is also present but is expressly excluded from ChatJS under the project no-telemetry requirement.

### Streaming and resume pipeline

`ChatGPTStreamingWorkerRuntime.js`, `ChatGPTStreamingWorkerClient.js`, `ChatGPTStreamingResponseProcessor.js`, `ChatGPTStreamingProtocol.js`, `ChatGPTStreamingContracts.js`, and `ChatGPTConversationEventDecoder.js` form a concrete direct-stream path built on the packaged `valdi_http/ServerSentEventClient` and `StreamingHTTPClient`.

Observed operations include `startDirect`, `connectDirect`, `createStream`, `receiveEvent`, `resumeDirect`, `finishTransport`, `cancel`, and `removeStream`. The client passes decoded conversation state, DIL results, entity references, reasoning and text deltas to the response processor. Resume-contract strings include `resume_conversation_token`, `x-conduit-token`, `conversation_id`, `model`, `offset`, `stream`, and the `/resume` path suffix. The decoder also references continuation/handoff and `message_stream_complete` state. The exact handoff limit and all event payload schemas remain to be decoded.

### Files and conversation history

`src/files/ChatGPTFileUploadService.js` exposes `createFileUpload`, `uploadFileContents`, and `processUploadedFile`. Its route strings include `/backend-api/files`, `/backend-api/files/process_upload_stream`, `/api/estuary/upload_content_and_finalize`, and `/api/estuary/upload_content_bytes`. The observed flow includes an upload reservation/URL, `file_id`, a byte upload using `PUT`, Azure block-blob headers, and a subsequent processing request. The client validates the destination origin and includes allow-list suffixes such as `.blob.core.windows.net` and `.blob.storage.azure.net`. Upload signing, retry/expiry behavior, and all size/type constraints are not yet reconstructed.

`ChatGPTConversationHistoryClient.js` exposes load/list, pin, rename, delete, update, and image-resolution methods with route strings `/backend-api/conversations`, `/backend-api/conversation`, `/backend-api/pins`, and `/backend-api/files/download`.

### Guest-session boundary and evidence limit

A string scan of all 111 decompressed Valdi modules found no `/backend-anon` route string. The `chatgpt_services` conversation client is explicitly account-oriented: its types and method context use authenticated account/session fields and it is named `AuthenticatedChatGPT...`. This does **not** prove that no guest service exists elsewhere in the app; it means this concrete authenticated service module does not identify the guest composer route. The DEX `/backend-anon/f/conversation*` constants remain attributable to `LocationCookieInitializer`, not to this send client.

**Evidence boundary:** static symbol/string inspection of the official Android 1.2026.321 package only. No request was sent, no account/session data was accessed, and no complete source body serializer or live response was recovered. The Android authenticated send path is a strong implementation lead, not a working ChatJS integration. Guest create/refresh and guest composer prepare/send remain unresolved.

## 2026-11-25 — Direct-response payload, stream decoder, and upload contract string reconstruction

### Scope and method

Reopened the owner-supplied `ChatGPT-Android.xapk` (1.2026.321), extracted its base APK, selected `assets/chatgpt_services.valdimodule`, and decompressed its Zstandard frame with the system Zstandard utility. Inspected the compiled module's file/module table, symbol/string pools and bytecode-adjacent string regions for the direct-response client, generated API client, streaming worker/contracts/event decoder, and file-upload service. This is a deeper static string/symbol pass than the earlier 111-module scan; it is not a Valdi bytecode decompilation or runtime trace.

### Direct authenticated request builder: field inventory

The `ChatGPTDirectResponseClient.js` module string region contains these conversation and message identifiers:

- Conversation/context: `conversation_id`, `parent_message_id`, `conversation_mode`, `primary_assistant`, and `history_and_training_disabled`.
- Message/content: `author`, `user`, `text`, `content_type`, `parts`, and `multimodal_text`.
- Additional metadata: `metadata`, `model_written_dil`, `model_written_dil_v2`, and `skills_settings_overrides`.
- Request controls/context: `stream` and `timezone_offset_min`.
- Attachment/content references: `file`, `mimeType`, `fileId`, `imageDimensions`, `file-service://`, `asset_pointer`, `image_asset_pointer`, `height`, `width`, `size`, `size_bytes`, and `mime_type`.

The same module has both `/backend-api/f/conversation` and `/backend-api/conversation` route constants, a `POST` method string, and a request body serialized through `JSON.stringify` after construction. It also has a separate `bodyPatchJson` value supplied by the integrity preparation path, and the requirements response header `OpenAI-Sentinel-Chat-Requirements-Token`.

**Not established:** precise object nesting, required/optional/nullability rules, exact route-selection condition, whether every listed key is emitted for every message, and byte-for-byte serializer order. Some strings are shared by request, response, and helper code in the same compiled module. Do not turn this inventory into a public request schema or production serializer yet.

### Generated model and chat-requirements decoders

The generated `ChatGPTConversationApiClient.js` region identifies decoder functions for `ModelCatalogRequest`, `ModelCatalogModel`, `ModelCatalogPreset`, `ModelCatalogVersion`, `ModelCatalogResponse`, `ChatRequirementChallenge`, and `ChatRequirementsResponse`. Its validation strings distinguish object, array, string, finite number, integer, boolean and null expectations, plus supported enum values and scalar query values.

Observed model/catalog keys include `slug`, `model_slug`, `intelligence_presets`, `supports_model_picker_upgrade_presets`, `default_model_slug`, `models`, and `versions`. Chat-requirements keys include `required`, `token`, `turnstile`, and `proofofwork`. Operations are GET `/backend-api/models` and POST `/backend-api/sentinel/chat-requirements`. The current scan does not recover the complete decoder instruction graph, per-field optionality, or all nested challenge variants.

### Streaming and event-decoder contract

The event decoder exposes these concrete identifiers:

- Stream completion and handoff: `[DONE]`, `complete`, `resume_conversation_token`, `stream_handoff`, `continuation.message_stream_complete`, and `resume_sse_endpoint`.
- Resume context: `conversation_id`, `type`, `token`, `conversationId`, `resumeToken`, and `eventOffset`.
- Message state: `author`, `assistant`, `role`, `tool`, `metadata`, `content`, `thoughts`, `content_type`, `recipient`, and `channel`.
- Delta operations: Add, append, Patch, Remove, Replace, and Truncate; delta paths are validated and unsafe/nested paths produce explicit errors.
- Entity references: `$content_references`, `start_idx`, `end_idx`, `entity`, `category`, `notes`, and `extra_params`.
- DIL/reasoning: model-written DIL result decoding, assistant reasoning accumulation, reasoning snapshots and delta state.

The streaming contracts additionally expose `body`, `conversationId`, `conversation_id`, `model`, `eventOffset`, `offset`, `stream`, `token`, `x-conduit-token`, and the `/resume` path suffix. The worker has separate direct and polling paths; the observed direct stream uses POST and an SSE client, while the development polling path is explicitly unavailable in this worker. The decoder rejects missing/invalid resume tokens and a handoff targeting a different conversation. Exact resume request body, header/value mapping, offset semantics, handoff ceiling, and every event variant remain unverified.

### Upload service: concrete metadata and destination rules

The upload module exposes `createFileUpload`, `uploadFileContents`, and `processUploadedFile`, with reservation and processing routes `/backend-api/files` and `/backend-api/files/process_upload_stream`. Metadata identifiers include `client_resolved_mime_type`, `chat_composer`, `entry_surface`, `file_name`, `size`, `file_size`, `declared_mime`, `mime_resolution_source`, `reset_rate_limits`, `file_picker`, `selection_method`, `timezone_offset_min`, `image`, `multimodal`, `ace_upload`, and `use_case`.

The byte-upload code includes a PUT path with `Authorization: Bearer`, `x-ms-blob-type: BlockBlob`, and `x-ms-version: 2020-04-08`. It validates upload destinations and contains allow-list suffixes `.blob.core.windows.net`, `.blob.storage.azure.net`, `.amazonaws.com`, and `.oaiusercontent.com`. Additional Estuary paths are `/api/estuary/upload_content_and_finalize` and `/api/estuary/upload_content_bytes`. The module has constants `MAX_PICKED_FILES`, `MAX_PICKED_FILE_BYTES`, and `MAX_PICKED_TOTAL_BYTES`, but their numeric values were not decoded. It also validates base64/data-URL content and inspects PNG/GIF/JPEG/WebP image dimensions.

The code has explicit error branches for invalid/untrusted destinations, invalid processing responses, expired sessions, upload-limit errors, cancellation and HTTP/service errors. Reservation response schema, signed URL lifetime, retries, numeric limits and all MIME rules remain unresolved.

### Implementation consequence

This narrows the next reverse-engineering target, but does not justify implementing a guessed authenticated sender. Next decode compiled method bodies/constructor field layouts for direct request creation and route selection, integrity result assembly, event decoder/resume, and upload reservation/numeric limits. Guest create/refresh and guest composer routes remain a separate unresolved investigation.

**Evidence boundary:** static inspection of the owner-supplied public Android 1.2026.321 compiled Valdi module. No app launch, account access, token extraction, HTTP request, guest-session creation, or telemetry operation occurred. No production ChatJS code changed.

## 2026-11-25 — Compiled Valdi archive and QuickJS bytecode boundary

The supplied Android assets/chatgpt_services.valdimodule was previously decompressed and inspected as a compiled archive. A source-level format cross-check is now available from the public Snapchat/Valdi repository, pinned for this investigation to commit f5bc2dcfcb880109c908e0675968cb532231ca71:

- valdi_core/cpp/Resources/ValdiPacket.cpp defines the packet header as two 32-bit fields: magic 0x0100C633 and data length.
- valdi_core/cpp/Resources/ValdiArchive.cpp parses repeated filename/data length fields. The high bit 0x80000000 indicates four-byte padding; lower 31 bits are the payload length.
- valdi/runtime/JavaScript/JavaScriptUtils.cpp declares precompiled-JS wrapper magic 0x0100C634; makePreCompiledJsModule prefixes the bytecode with this four-byte marker, and getPreCompiledJsModuleData removes it.
- valdi/quickjs/QuickJSJavaScriptContext.cpp evaluates the unwrapped payload using JS_ReadObject(..., JS_READ_OBJ_BYTECODE) followed by JS_EvalFunction.
- third-party/quickjs/README.md records the fork lineage and upstream merges through 2021-03-27; third-party/quickjs/VERSION is 2021-03-27. This is a modified/forked QuickJS implementation, not a guarantee that arbitrary upstream QuickJS tools will accept every emitted module.

The compiled module entries inspected here begin with the 0x0100C634 wrapper marker. This explains why a printable-string scan finds method names but not the executable control flow. It provides a concrete next route: a bytecode inspection utility must match the precise Valdi QuickJS fork/build and its serialized object format. No such disassembler has yet been run, and no method body, request serializer, branch condition or schema has been decoded by this step.

**Scope and evidence boundary:** the only Android artifact was the owner-supplied ChatGPT-Android.xapk; the Valdi source is third-party format/runtime reference material. No APK launch, account access, credential/session extraction, HTTP request or telemetry occurred. Do not bundle the third-party Valdi/QuickJS runtime into ChatJS merely to ease static analysis; first assess license, compatibility, and whether temporary analysis tooling suffices.

## 2026-11-25 — Android native QuickJS runtime and deserialized-bytecode disassembly route

The compiled Valdi container investigation now has a concrete disassembly approach based on the pinned public Valdi QuickJS fork source (`Snapchat/Valdi` commit `f5bc2dcfcb880109c908e0675968cb532231ca71`) and the owner-supplied Android split package.

### Native runtime confirmation

The supplied `config.arm64_v8a.apk` contains `lib/arm64-v8a/libopenai_xplat_export.so`:

- Size: 8,817,776 bytes.
- ELF: 64-bit AArch64 Android shared library (minimum Android API 24; build metadata identifies NDK r28c).
- The binary is stripped. Exported-symbol inspection did not reveal a ready-made `JS_ReadObject`, `JS_WriteObject`, or QuickJS dump entry point.
- Static printable strings include `QuickJS`, `ValdiModuleArchiveWrapper`, `ValdiModuleArchive`, and the Valdi QuickJS context/heap/factory class names (`QuickJSJavaScriptContext`, `QuickJSHeap`, `QuickJSJavaScriptContextFactory`).

This confirms the supplied Android application packages a native Valdi/QuickJS runtime alongside the compiled service modules. It does not prove the exact native build hash/source revision, that debug dump flags are enabled in this release, or that the stripped library exposes a reusable disassembler. Do not treat it as executable analysis tooling.

### QuickJS dump hooks and the important call-site distinction

The pinned Valdi-fork `third-party/quickjs/src/quickjs/quickjs.c` contains:

- `DUMP_BYTECODE`, a compile-time flag with bits for final/pass-2/pass-1 bytecode, standard-library functions, raw bytecode hex, line tables and stack-size calculation.
- `js_dump_function_bytecode(JSContext*, JSFunctionBytecode*)`, an internal function that prints function identity, arguments/locals/closure variables, stack size and decodes `byte_code_buf` with `dump_byte_code(...)`.
- `DUMP_READ_OBJECT`, a separate compile-time guard that enables `bc_read_trace` byte/structure tracing while `JS_ReadObject` deserializes an object.
- `JS_ReadFunctionTag`, which reconstructs each `JSFunctionBytecode`: reads flags/name/counts, allocates the function, reads local and closure definitions, reads the bytecode, then reads debug metadata and the constant pool.
- `JS_ReadObject(..., JS_READ_OBJ_BYTECODE)` calls the atom reader and recursive object reader; nested function values in constant pools are deserialized recursively.

Crucial distinction: the existing `DUMP_BYTECODE` call-site is in the compilation path, so merely defining that macro does not establish that precompiled Android functions read from the module are dumped. `DUMP_READ_OBJECT` provides a byte-level deserialization trace and structural metadata; it is not by itself the readable opcode disassembly needed to reconstruct request serializer control flow.

### Proposed temporary analysis patch (not yet built or run)

In a **separate temporary copy** of the pinned QuickJS fork, instrument `JS_ReadFunctionTag` to call the existing `js_dump_function_bytecode(ctx, b)` after the function's constant pool has been fully deserialized (and before it is returned). The constant pool must be populated first because the opcode dumper resolves constant-pool operands. The recursive reader should then naturally reach nested function objects in module/function constant pools. Enable `DUMP_READ_OBJECT` separately only when a serialized-byte trace is useful.

The analysis harness should:
1. use the exact Valdi QuickJS source revision and build options corresponding to the Android module where possible;
2. preserve the module's `0x0100C634` wrapper handling and pass only the unwrapped payload to `JS_ReadObject` with `JS_READ_OBJ_BYTECODE`;
3. parse the enclosing Valdi packet/archive with validated size bounds and do not execute the functions;
4. dump a narrow allow-listed set of methods (first `ChatGPTDirectResponseClient.prepare/send`, then generated catalog/requirements decoders, stream/resume decoder and upload methods);
5. compare function name, parameter/local tables, opcode references, constant-pool values and call sites before drawing control-flow conclusions;
6. record engine revision/build flags and output provenance; keep the tool and third-party runtime out of the ChatJS production package unless a separate, justified architecture/licensing decision is made.

### Current status and blocker

This is a source-supported proposed path, **not a working disassembler**. No QuickJS analysis build was compiled, no method bytecode was dumped, and no ChatGPT protocol method body has yet been reconstructed. The repository's GitHub file wrapper returned an empty body for the very large `quickjs.c`; Firecrawl retrieval provided targeted source excerpts but not a complete local source tree. This session's runtime has GCC but no installed `qjs`, `quickjs` or `qjsc` executable/source tree. A full compatible source checkout/build context is still required before this approach can be tested.

**Safety/evidence boundary:** no Android app was launched; no account/session data, credentials, device identifiers or HTTP traffic were accessed. No app modification, injection, hooking or bypass was attempted. The only library operation was static ELF metadata/string/export inspection. No production ChatJS code or dependency changed.


## Android feature-area module inventory — 2026-11-25

**Source verification:** the supplied `ChatGPT-Android.xapk` at `ChatJS Project → Sources` is also mounted at `/mnt/data/ChatGPT-Android.xapk` for this session. Its SHA-256 is `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`, matching the previously recorded provider hash. The outer XAPK ZIP test passed and contains six entries. Its `com.openai.chatgpt.apk` base package contains 5,080 ZIP entries, ten DEX files, and 111 `.valdimodule` assets.

Observed feature-related module assets include:

- Finance and account data: `chatgpt_finance`, `chatgpt_finance_accounts`, `chatgpt_finance_connections`, and `chatgpt_finance_transactions`.
- Maps and location integration: `chatgpt_maps` and `oai_location_service`.
- Wallet-related implementation: `chatgpt_wallet`, `chatgpt_wallet_approval`, `chatgpt_wallet_core`, and `chatgpt_wallet_strings`.
- Health-related implementation: `chatgpt_health`, `chatgpt_health_connect_permissions`, and `chatgpt_health_preview`.
- Commerce and shopping: `chatgpt_commerce_reporting` and `chatgpt_shopping`.
- Other shipped client areas: `chatgpt_global_search`, `chatgpt_library`, `custom_instructions_ui`, `memory_settings_ui`, `oai_conversation`, and `oai_voice_service`.

**Evidence boundary:** these are observed filenames inside the supplied public app package. They establish that related implementation assets are shipped; they do not alone prove the active UI path, service route/schema, account entitlement, availability in every region, host support, or a working ChatJS implementation. Trace each workflow from its actual source before coding or claiming support. None of these areas is omitted solely because of its subject-matter category.


## Method-level Android conversation protocol reconstruction — 2026-11-25

### Analysis method and provenance

A temporary read-only disassembler was built from the pinned public Valdi QuickJS source at Snapchat/Valdi commit f5bc2dcfcb880109c908e0675968cb532231ca71, QuickJS version 2021-03-27. The compiled tool inserts js_dump_function_bytecode(ctx, b) immediately before JS_ReadFunctionTag returns, after the deserialized function's constant pool is restored. The ordinary DUMP_BYTECODE hook is compilation-side and does not decode precompiled module entries.

The harness calls JS_ReadObject(..., JS_READ_OBJ_BYTECODE), releases the resulting object and runtime, and never evaluates, invokes, or executes an Android application function. No QuickJS/Valdi source or analysis binary was added to ChatJS or its production dependencies.

| Android module entry | Bytecode bytes after Valdi wrapper | SHA-256 | Decoded function bodies |
| --- | ---: | --- | ---: |
| src/conversations/ChatGPTDirectResponseClient.js | 24,963 | e3ff57394f265f47c9a6a651e97d1f7fc752183ed06482c1de0bf8e0d2caa4ef | 66 |
| src/generated/ChatGPTConversationApiClient.js | 9,050 | cee4c14430b8527d1b3572dcd44d1e3317ca32f0647c415e833ee4d138c77f74 | 56 |
| src/conversations/ChatGPTConversationEventDecoder.js | 14,503 | 77964ad085e01f1366658a40c60f063933dec6c429baad1c475241a59ee80e48 | 22 |

The successful reads establish bytecode-format compatibility for these entries. They do not prove that the stripped Android native runtime was built from this exact upstream source commit or identical flags. The native library remains stripped; no app function was executed.

### Authenticated direct-response request

The decoded ChatGPTDirectResponseClient call graph establishes: resolve model; resolve parent message ID; validate and upload selected-user-message attachments; prepare first-party integrity headers/body patch; build and JSON-serialize the request; then send it through the direct streaming client/worker.

The sender searches the supplied messages from newest to oldest and selects the last message whose author role is user. If none exists or its trimmed content is empty, it throws "Enter a message before starting a ChatGPT conversation." The original content string is used in the body after this non-empty validation.

The no-attachment payload shape is:

    {
      "action": "next",
      "conversation_mode": {
        "kind": "primary_assistant",
        "history_and_training_disabled": false
      },
      "messages": [{
        "author": { "role": "user" },
        "content": {
          "content_type": "text",
          "parts": ["<selected user message>"]
        },
        "id": "<new client message ID>",
        "metadata": {}
      }],
      "model": "<resolved model>",
      "parent_message_id": "<resolved parent message ID>",
      "stream": false,
      "timezone_offset_min": 0
    }

Optional/conditional behavior:
- conversation_id is emitted only when the requested conversation differs from the session's current conversationId; it is omitted when equal.
- With attachments, content_type is multimodal_text and mapped file parts precede the text. A separate attachments array is also added to the message.
- Image parts are {asset_pointer: "file-service://" + fileId, content_type: "image_asset_pointer", size_bytes, height?, width?}. Other file parts use {id, mime_type, name, size, source: "local"}.
- skills_settings_overrides appears only when enableModelWrittenDIL === false, setting model_written_dil and model_written_dil_v2 false.
- timezone_offset_min is Date.getTimezoneOffset(); stream is false; message metadata is {}.
- The request is built after the integrity provider returns. This is not permission to skip that step.

The direct conversation POST is /backend-api/f/conversation. Headers include Authorization: Bearer <session access token>, ChatGPT-Account-Id: <active account id>, and Content-Type: application/json, merged only with validated first-party integrity headers.

### Parent-message lookup

resolveParentMessageId returns a caller-supplied parent ID when present; otherwise it creates a new client message ID when the target conversation equals the current session conversation. For a different conversation it performs GET /backend-api/conversation/{encodeURIComponent(conversationId)} and requires a string current_node. This is parent/context lookup, not the direct send endpoint.

### Requirements integrity versus device integrity

The default ChatGPTRequirementsIntegrityProvider calls generated getChatRequirements({}). The generated operation is POST /backend-api/sentinel/chat-requirements with JSON body {}. Its typed ChatRequirementsResponse contains a required token and optional turnstile, proofofwork and so challenge descriptors.

For the default provider, requiresDeviceIntegrity is true when any challenge descriptor has required === true. If true, it throws rather than sending without a device-integrity provider. Otherwise, it returns OpenAI-Sentinel-Chat-Requirements-Token. That requirements token is not device attestation.

A separate ChatGPTDeviceIntegrityProvider can be injected only when Valdi.isVersionAtLeast(11) and getDeviceIntegrityService(session) returns a service. It receives session access token, active account ID, base URL, applicable conversation ID and resolved parent message ID. Its response can supply bodyPatchJson and parallel header-name/header-value arrays.

Response validation requires equal-length header arrays; lowercase token-style names; names beginning openai-sentinel- or in an explicit allowlist; string values without CR, LF or NUL; and no duplicate normalized names. The inspected JSON body patch must be an object with exactly one key, app_attest_challenge, whose value is a non-empty trimmed string. Malformed or additional-key patches fail closed.

The supplied public XAPK bundles the OAIDeviceIntegrity factory and service classes, but its native worker explicitly rejects Context.getPackageName() != com.openai.chatgpt.internal before any HTTP exchange. The supplied package is com.openai.chatgpt. Treat this provider as unavailable to this public package; do not spoof the internal identity, bypass the guard, fabricate a proof or skip any required stage.

### Generated model/requirements API

The generated client has getModels and getChatRequirements operations. The observed catalog operation is GET /backend-api/models with query values iim=true and supports_model_picker_upgrade_presets=false. Decoder identifiers include ModelCatalogRequest, ModelCatalogModel, ModelCatalogPreset, ModelCatalogVersion, ModelCatalogResponse, ChatRequirementChallenge and ChatRequirementsResponse. This pass establishes routes, challenge fields consumed by the provider and selected primitive validation, not every nested field's optionality/nullability.

### SSE event decoder, deltas and resume state

The decoded event consumer establishes:
- [DONE] flushes reasoning and completes; message_stream_complete also flushes reasoning and completes.
- Every non-[DONE] event increments eventOffset before payload decoding, including ignored/unknown events.
- resume_conversation_token stores a non-empty token string and string conversation_id.
- stream_handoff requires an options array containing at least one object option and a previously stored resume token/conversation. Missing resume state throws; a conflicting string conversation_id throws. Valid continuation is {conversationId, eventOffset, token}.
- Direct stream handoff count is capped at three. The exact resume HTTP mapping is recorded in the later worker/contract trace below.
- Normal message updates accept assistant/tool roles and non-empty message IDs; visually hidden messages are skipped. Assistant text is accumulated by message ID and emitted as the newly appended suffix. The decoder also tracks conversation state, DIL result changes, entity-reference changes and reasoning snapshots.

The delta decoder reads c (channel), o (operation), p (path), and v (value), retaining prior channel/operation/path values when subsequent delta events omit them. Supported operations are Add, Append, Patch, Remove, Replace and Truncate. Add inserts into an array at a numeric index or assigns an object property. Append concatenates strings, appends array values, or merges plain-object values. Patch recursively applies an array of nested operations. Remove splices/deletes. Replace assigns. Truncate requires a non-negative integer and truncates a string or array.

Paths are slash-delimited JSON-pointer-like strings, limited to 2,048 characters and 64 segments. The decoder maps ~1 to slash and ~0 to tilde, converts canonical non-negative integer segments to indices, and rejects __proto__, constructor and prototype. Invalid paths, unknown operations and malformed nested patches throw explicit errors.

### Error and evidence limits

The sender maps HTTP 401 to session-expired, HTTP 403 to account/device-integrity error, and HTTP 429 to temporary rate-limit error. These are source-derived branches, not evidence that ChatJS currently handles them.

Still open: full generated nested schemas and challenge-specific provider consumers; native device-integrity implementation/public-build availability; upload destination expiry, cancellation/retry and download/index lifecycle; and independent guest create/refresh and guest composer protocols. The resume request wire mapping, reservation/PUT/process sequence, and file-picker limits have been recovered by the later method-level traces below.

**Runtime status:** this is static Android source knowledge only. ChatJS still has no product-specific connection, authenticated/guest session implementation, conversation sender/decoder, file workflow or integrity provider.


## Generated model catalog and chat-requirements schema — method-level validation, 2026-11-25

The generated ConversationApiClient decoder functions expose these typed fields. The decoders require an object, validate the listed properties, and preserve additional own properties:

| Decoder | Required fields | Optional fields | Validation |
| --- | --- | --- | --- |
| `ModelCatalogRequest` | `iim`, `supports_model_picker_upgrade_presets` | none in the generated request type | Both required booleans |
| `ModelCatalogModel` | none | `slug` | String |
| `ModelCatalogPreset` | none | `model_slug` | String |
| `ModelCatalogVersion` | none | `intelligence_presets` | Array of `ModelCatalogPreset` |
| `ModelCatalogResponse` | `default_model_slug` | `models`, `versions` | String; arrays of `ModelCatalogModel` and `ModelCatalogVersion` |
| `ChatRequirementChallenge` | none | `required` | Boolean |
| `ChatRequirementsResponse` | `token` | `turnstile`, `proofofwork`, `so` | String; arrays of `ChatRequirementChallenge` |

The optional checks are specifically against `undefined`. If an optional field is present as `null`, the subsequent string/boolean/array decoder rejects it; null is not treated as omission. Nested model/preset/version/challenge decoders preserve other object properties without exhaustively typing their contents. This is the concrete generated validation contract, not a closed schema for every field the service may return.

The catalog API method calls the `ModelCatalogRequest` decoder and serializes scalar query properties with `encodeURIComponent`; array-valued query parameters are serialized as repeated keys. The inspected direct client supplies `iim=true` and `supports_model_picker_upgrade_presets=false` on GET `/backend-api/models`.

The requirements API calls `ChatRequirementsResponse`; its `token` is required. Each challenge item preserves extra properties but only validates the optional `required` flag at this generated layer. Exact payload semantics of Turnstile, proof-of-work and `so` remain to be followed into their consumers and any separate challenge providers.


## 2026-11-25 — Android stream worker, continuation transport and file-upload methods

This section supersedes the earlier string-only uncertainty about the resume wire request, attachment reservation/upload/process structure, and the numeric picker limits. It is based on read-only disassembly of the compiled Valdi bytecode entries in the supplied ChatGPT Android 1.2026.321 XAPK. The pinned QuickJS reader only deserialized functions; it did not evaluate or execute the Android modules. These findings establish client source behavior, not live server acceptance or ChatJS feature completion.

### Streaming host/worker protocol

The ChatGPTStreamingProtocol module defines two small integer message enums:

| Direction | Name | Value |
| --- | --- | ---: |
| Host → worker | StartPolling | 0 |
| Host → worker | StartDirect | 1 |
| Host → worker | Cancel | 2 |
| Worker → host | PreparedContent | 0 |
| Worker → host | ConversationState | 1 |
| Worker → host | DILResult | 2 |
| Worker → host | Reasoning | 3 |
| Worker → host | Complete | 4 |
| Worker → host | Error | 5 |
| Worker → host | EntityReferences | 6 |

The host-side ChatGPTStreamingWorkerClient owns a request-ID counter starting at 1 and a Map of active streams. Each start allocates a request ID, stores its callbacks and accumulated prepared content, and posts the relevant start message. A failed post removes the Map entry and propagates the error. Cancellation deletes that request's state and posts a correlated Cancel message when the endpoint is available.

Worker responses are correlated by requestId. Prepared content is either sent to onPreparedContent, or—when that callback is absent—compared with the already delivered content and only the new appended suffix is delivered through onTextDelta. Conversation state, DIL, entity references and reasoning are routed to separate callbacks. Complete and Error delete the request entry and invoke their corresponding terminal callbacks; error messages are wrapped as ChatGPTBackgroundStreamError.

The worker's direct mode uses the packaged StreamingHTTPClient and ServerSentEventClient with a POST request, the supplied path/body/headers, UTF-8 JSON body bytes, and SSE automatic reconnection disabled. The alternate polling mode is driven by an injected optional client and fails when that client is unavailable; it is not evidence of a general production polling transport.

### Exact direct-stream resume request

ChatGPTStreamingContracts.resumeChatGPTDirectStream(request, continuation) builds a new request instead of replaying the original body:

    {
      baseUrl: request.baseUrl,
      path: request.path.replace(/\/+$/, '') + '/resume',
      body: {
        conversation_id: continuation.conversationId,
        ...(typeof request.body.model === 'string'
          ? { model: request.body.model }
          : {}),
        offset: continuation.eventOffset,
        stream: false
      },
      headers: {
        ...request.headers,
        'x-conduit-token': continuation.token
      }
    }

The worker permits resume only for direct-mode streams. It increments the handoff counter and throws after the third handoff, closes or cancels the prior request, and invokes the direct connection with the generated continuation request. A non-direct stream cannot use this resume method.

The runtime maps decoded conversation state, text delta, reasoning, DIL and entity-reference updates into separate response-processor calls. When the transport reports the exact error message The SSE connection closed after text has already been received, the worker treats it as completion; otherwise it reports a transport failure. These are observed source branches, not a claim that the ChatJS runtime now performs live streaming.

### Upload reservation and processing requests

ChatGPTFileUploadService has a three-stage flow:

1. Create a first-party upload reservation with POST /backend-api/files.
2. Transfer bytes to the returned URL using one of two distinct upload modes.
3. For the upload_content_bytes path, process the uploaded file with POST /backend-api/files/process_upload_stream. The upload_content_and_finalize path is already a combined upload/finalize operation and skips the separate processing call.

The reservation request includes client_resolved_mime_type, entry_surface: "chat_composer", file_name, file_size, mime_resolution_source: "declared_mime", mime_type, reset_rate_limits: false, selection_method: "file_picker", timezone_offset_min, and use_case (multimodal for image MIME types, otherwise ace_upload). The response is accepted only when status is success, file_id is a string matching ^[A-Za-z\d_-]{1,256}$, and upload_url is present as a string.

The content data URL must begin with the declared MIME type and ;base64,. The padded Base64 content is decoded and its byte length must equal the declared file size.

### Destination validation and transport separation

The upload URL parser accepts HTTPS destinations, rejects malformed authorities, credentials, non-default ports, fragments and unsafe hostname forms, and constrains destinations to either the active backend origin or the following host suffixes:

- .blob.core.windows.net
- .blob.storage.azure.net
- .amazonaws.com
- .oaiusercontent.com

A destination is routed according to its path suffix:

| Destination suffix | Transfer | Separate process request |
| --- | --- | --- |
| /api/estuary/upload_content_and_finalize | Multipart POST | No |
| /api/estuary/upload_content_bytes | Multipart POST | Yes |
| Other trusted signed destination | Raw PUT | Yes |

The two Estuary multipart paths use the first-party upload client and include the authenticated session bearer and account headers. The multipart fields include the file bytes and upload URL; the combined finalize path additionally carries the file ID/name, use case, index_for_retrieval: false, and entry_surface: "chat_composer".

The signed-storage path is deliberately different: it PUTs the decoded file bytes with Content-Type. It does not attach the ChatGPT bearer token or account ID to the external signed URL. Non-Amazon destinations also receive x-ms-blob-type: BlockBlob and x-ms-version: 2020-04-08; .amazonaws.com destinations do not receive those Azure headers.

The separate process request carries entry_surface, file_id, file_name, index_for_retrieval: false, and use_case. Its newline-delimited response is JSON-decoded; malformed lines and error/failed/cancelled/unknown event suffixes fail the processing operation. The client also maps HTTP 401 to an expired-session error and HTTP 429 to an attachment-upload-limit error.

### Android file-picker policy values

The separate oai_file_picker module exposes the following values:

| Policy | Value |
| --- | ---: |
| Maximum selected files | 10 |
| Maximum single file | 20,971,520 bytes (20 MiB) |
| Maximum combined selection | 26,214,400 bytes (25 MiB) |
| Maximum image dimension | 32,768 pixels |
| Maximum file-name length in the upload service | 512 characters |
| Maximum MIME declaration length | 128 characters |

Accepted document filename extensions are .csv, .doc, .docx, .json, .md, .pdf, .ppt, .pptx, .txt, .xls, and .xlsx. Accepted document MIME values are application/json, application/pdf, text/csv, text/markdown, and text/plain. Accepted image MIME values are image/gif, image/jpeg, image/png, and image/webp. The policy accepts a recognized extension or a recognized MIME value; the upload service separately validates the MIME syntax and file name.

The upload module reads dimensions for PNG, GIF, JPEG and WebP inputs and rejects non-positive or over-limit width/height values. It returns dimensions for later conversation attachment mapping.

### Partial ChatJS implementation boundary

ChatJS now contains an internal, side-effect-free policy helper at src/chatgpt/file-upload-policy.cjs. It implements the reconstructed selection metadata/size/type checks, padded Base64 byte-length verification, trusted upload-destination parsing, and Estuary-versus-signed-storage request-plan/header distinction. It is packaged internally and covered by deterministic tests. It is not a public API, uploader, reservation client, authenticated transport, streaming processor, or live ChatGPT operation. No network request is made by the helper.

**Still open:** actual signed-URL expiry and service-side signature semantics; upload retry/cancellation behavior across every transport; file download, image-gallery, and file-indexing workflows; complete process-stream terminal/progress schema; a distinct public-build integrity provider in another authentic source; remaining challenge-specific Turnstile/proof-of-work/so consumers; authenticated account and anonymous guest lifecycles; and authorized end-to-end service tests.


## 2026-11-25 — Android event-dispatch and streaming response-processor lifecycle

This section extends the existing event/resume and worker trace with the top-level dispatch outputs and the separate response-rendering/terminal processor. Source is the supplied ChatGPT Android 1.2026.321 compiled Valdi module set, read with the temporary deserializer only; no app methods were executed.

### Event offset and terminal dispatch

The ChatGPTConversationEventDecoder decode method checks event.data === "[DONE]" before incrementing the offset or passing data to the payload decoder. For this terminal marker it completes the reasoning accumulator and returns complete: true, adding the finalized reasoning snapshot when present.

For every other event, it increments eventOffset first, then decodes the event payload. An undecodable payload or an event rejected by the decoder's object predicate returns complete: false without a message update. Thus offsets advance for non-DONE events even when their payload is not converted into a visible response update.

A resume_conversation_token event is accepted only when token is a non-empty string and conversation_id is a string. When valid, the decoder stores both values and returns a non-terminal result. A stream_handoff event is acted on only when its options array contains an accepted option. It requires previously stored resume token and conversation ID, rejects an explicitly supplied different conversation ID, and returns a non-terminal continuation object with the stored conversation ID, current eventOffset, and token. The event itself does not mean the response is complete; the direct worker uses this continuation to create the separate /resume request.

message_stream_complete is the other explicit terminal event. It completes the reasoning accumulator and returns complete: true, including the final reasoning state when present. Ordinary decoded message updates return complete: false.

### Message and incremental update selection

The normal message branch accepts assistant and tool roles with a non-empty string message ID. Messages classified as visually hidden are skipped. The reasoning accumulator consumes each eligible message before the visible-text branch is selected.

Messages are routed to the reasoning output rather than assistant text when they are tool-role messages, use thoughts or reasoning_recap content types, carry the thinking-preamble metadata flag, or have a recipient other than all or assistant. A reasoning change is returned separately and is never folded into the assistant text delta.

For normal assistant text, the decoder stores the accumulated content by message ID. If the new text starts with the previously stored content, it emits only the suffix; otherwise it emits no appended suffix for that update. This is the basis for the worker/host append-only text-delta path.

Conversation-state output is emitted when the current message supplies a conversation ID different from the decoder's current conversation context; the state includes the new conversation ID and message ID as parent. Model-written DIL is decoded from message metadata and content with the streamed conversation metadata context. Its raw payload is compared with the previous raw payload so repeated values are not emitted. Entity references are similarly decoded and compared by JSON snapshot before an update is emitted.

The ordinary decoder result is complete: false with only the fields that actually changed: optional conversationState, non-empty delta, changed dilResult, changed entityReferences, and changed reasoning.

### Response processor

ChatGPTStreamingResponseProcessor is a separate listener-facing rendering/terminal state machine. Its constructor stores the listener, initializes content to an empty string, and initializes dirty, finished, and hasDILResult to false.

- append(text) ignores calls after finish and empty text, appends to accumulated content, and schedules a single 16 ms render timer when a render is not already pending and DIL content has not taken over the update path.
- The timer clears its own handle and calls flush(true). flush(streaming) only emits while the processor is active, the content is eligible for a flush, and no DIL result is active.
- emitPreparedContent(streaming) calls listener.onPreparedContent with the full accumulated content, parsed Markdown blocks from Markdown.parse(content).blocks, and the streaming flag.
- conversationState, entityReferences, and reasoning call their corresponding listener callbacks while active; entity-reference and reasoning callbacks are optional.
- dilResult(result) flushes pending text, marks that a DIL result has been received, then calls listener.onDILResult.
- complete() emits any final pending text with streaming: false when no DIL result has superseded text rendering. When text or DIL output exists, it stops the processor and schedules onComplete after the completion delay; when neither exists, it stops and calls onComplete immediately.
- fail(error, code) emits final pending text under the same no-DIL condition, stops, then calls listener.onError(error, code).
- cancel() stops without synthesizing completion or an error callback. hasReceivedText() reflects whether accumulated content is non-empty.
- stop() marks the processor finished, clears the render and completion timers, and removes their handles. All subsequent append/state/DIL/entity/reasoning updates are ignored.

This processor delay is a UI/render lifecycle detail, distinct from transport reconnect, resume handoff, server completion, or request cancellation.

### Remaining boundary

The static trace now maps the core decoder's event offsets, resume-token/handoff, terminal markers, assistant/tool/reasoning selection, content suffix, DIL/entity-reference deduplication, and the complete response-processor terminal behavior. It still does not establish every possible generated payload subtype, server behavior under interruption, history synchronization after completion, or an authorized live session. ChatJS has not implemented this event decoder or response processor as production conversation behavior.


## 2026-11-25 — Android requirements-integrity and native device-provider routing

This section records the provider-selection and adapter behavior from method-level disassembly of ChatGPTDirectResponseClient in the supplied Android XAPK 1.2026.321. It distinguishes the Valdi adapter contract from the native device-integrity implementation found in DEX.

### Requirements normalization and default provider

The direct client first decodes the chat-requirements response. A non-empty trimmed token is mandatory. The turnstile, proofofwork, and so arrays are inspected for any descriptor where required === true; the normalized result contains the token and a requiresDeviceIntegrity boolean.

ChatGPTRequirementsIntegrityProvider.prepare(session, requestContext) uses that normalized response. When no challenge requires device integrity, it returns a header pair:

- OpenAI-Sentinel-Chat-Requirements-Token
- The decoded requirements token

When any of those challenge arrays contains a required challenge, this default provider throws a specific first-party integrity-required error. It does not return an empty value, synthesize a challenge token, or silently skip the requirement.

The provider obtains the response through the generated conversation API client. Its request supports cancellation; the API result is awaited, and failures are mapped to a conversation-integrity error.

### Alternate native provider selection

createChatGPTDirectResponseClient checks the Valdi runtime version and the native device-integrity service accessor. It injects ChatGPTDeviceIntegrityProvider only when the runtime is at least version 11 and the service accessor returns an available service. Otherwise the client uses the default requirements provider.

The native adapter's prepare request contains the legitimate session context:

- access token
- active account ID
- backend base URL
- conversation ID when the requested conversation differs from the session conversation
- parent message ID

The adapter forwards success/failure through one-shot callbacks. A failed operation is surfaced as a first-party device-integrity error; failure to start the native operation is separately surfaced. Its cancellation path calls the native service's cancel method and avoids duplicate terminal callback delivery. These are the Valdi-facing adapter semantics; they do not reveal the complete implementation inside the imported native service.

### Native provider output validation and request application

The adapter result has paired headerNames and headerValues arrays. The client requires both to be arrays of equal length and validates the headers before merging them into the authenticated direct request. Header names must pass the header-token syntax check; non-openai-sentinel- names are limited to the source-defined built-in allow-list; reserved names are rejected; values must be strings without CR, LF, or NUL. Invalid output throws a first-party integrity-provider error.

The optional JSON body patch is parsed separately and must be an object with exactly one property: app_attest_challenge. That property's value must be a non-empty trimmed string. Malformed JSON, extra/missing properties, wrong value types or an empty challenge value throw an integrity-provider error. The validated value is then applied to the conversation request body. The provider's header pair is merged with the normal session Authorization, ChatGPT-Account-Id and Content-Type headers.

### Evidence boundary and remaining gaps

The provider selection, default fail-closed behavior, native adapter inputs/callbacks/cancellation, output validation, factory registration, service construction, package preflight, and internal DEX request/callback bridge are now method-level decoded. The native factory is present in the public APK, but the worker rejects com.openai.chatgpt because it requires com.openai.chatgpt.internal; this happens before its HTTP exchange. The internal request path is source-reconstructed but has not been executed or accepted by the live service, and a distinct public-build alternative remains unverified. Do not bypass the service, spoof the package, simulate its result or emit a fabricated token. No ChatJS integrity provider or authenticated request implementation is claimed.


## 2026-11-25 — Native module registration, service construction, and public-package gate

The supplied XAPK was re-examined directly rather than relying only on the prior class/string scan. The XAPK manifest identifies the base application as package com.openai.chatgpt, version 1.2026.321 (version code 2632129).

### Packaged factory and service bridge

The base APK contains:
- assets/oai_device_integrity.valdimodule, a small Zstandard-compressed Valdi module which decompresses to a DeviceIntegrityTypes.js module record.
- An assets/valdi_native_modules/com.openai.valdi.integrity.DeviceIntegrityNativeModuleFactoryImpl registration marker.
- DEX definitions for DeviceIntegrityNativeModuleFactoryImpl, DeviceIntegrityRequest, DeviceIntegrityResponse, DeviceIntegrityCompletion, DeviceIntegrityService and DeviceIntegrityTask.

Method-level call path:
1. DeviceIntegrityNativeModuleFactoryImpl.onLoadModule obtains the Valdi runtime and application context, and constructs the Lik00 Valdi wrapper.
2. Lik00.createDeviceIntegrityService constructs com.openai.valdi.integrity.b.
3. com.openai.valdi.integrity.b implements DeviceIntegrityService; its prepare method creates the worker/task and dispatches the operation.
4. com.openai.valdi.integrity.a.run performs the application-package preflight before the service's network exchange.

The Valdi request marshalling type contains five string fields: accessToken, accountId, baseUrl, conversationId and parentMessageId. The response marshalling type contains bodyPatchJson, headerNames and headerValues. DeviceIntegrityCompletion defines onSuccess/onFailure, while DeviceIntegrityTask defines cancel. This confirms the shipped factory/service bridge shape and matches the Valdi adapter contract already traced.

### Exact internal-package gate

The preflight runnable calls Android Context.getPackageName() and compares its result with the literal com.openai.chatgpt.internal. On mismatch, it throws DeviceIntegrityPreparationException with the message:

> Install the official-debug-signed internal Android application to verify this device.

This branch occurs before the native helper reaches its HTTP request methods. The public XAPK manifest's package is com.openai.chatgpt, so this exact supplied public package cannot pass the traced native worker gate. The service is present in the public APK's assets and DEX, but its inspected execution path is intentionally restricted to the internal/debug-signed application identity. This is stronger evidence than a package-name constant in an outgoing request: it is an explicit local preflight rejection.

The internal-only branch also carries com.openai.chatgpt.internal as package_name in the /backend-api/playintegrity JSON and OAI-Package-Name request header. Those values are only reached after the package preflight succeeds; they must not be copied into a public ChatJS request or treated as a supported public-build identity.

### Consequence for ChatJS

For the supplied public Android build, the alternate device-integrity provider is not a usable production capability, even though its native factory and service classes are bundled. When the direct client selects that service for a required challenge, the native operation fails the package gate before the integrity exchange. ChatJS must preserve that failure and the existing requirements-provider fail-closed behavior. It must not spoof the internal package name, remove the check, imitate the internal app signature, call the internal-only path through a different transport, or fabricate a Google Play Integrity result.

No alternate public-build native provider was found in this XAPK trace. Whether another independently distributed public build or later client version contains a different first-party provider is a separate, unresolved source question. This is static control-flow evidence, not an executed app test or live service result.

### Earlier wording reconciled

The earlier note that described public-build availability as simply unproven is superseded for this exact XAPK: the native factory is present, and its execution path explicitly rejects the public application package before networking. The internal implementation's full challenge/cookie/retry details remain useful for source understanding, but do not make this flow available to the public package.


## 2026-11-25 — Native integrity DEX response bridge and source-version verification

This addendum records the native method-level callback mapping and bytecode provenance. It does not supersede the public-package gate established above.

### Factory, worker and callback mapping

The native factory class DeviceIntegrityNativeModuleFactoryImpl loads the Valdi wrapper; its createDeviceIntegrityService method creates com.openai.valdi.integrity.b, the DEX implementation of DeviceIntegrityService. prepare schedules the worker and returns the cancellable task.

The worker first checks Context.getPackageName() against com.openai.chatgpt.internal. A public package mismatch throws DeviceIntegrityPreparationException with the internal-debug-signed-app message before the HTTP helper is called. The native service being registered or selected by the Valdi adapter therefore does not imply that its prepare operation can run in the public package.

The final callback adapter Ldz2.invoke constructs DeviceIntegrityResponse with bodyPatchJson set to null and six paired headers. In the method's exact returned order, the names are:

1. OpenAI-Sentinel-Chat-Requirements-Token
2. X-Sentinel-Payload
3. OAI-Client-Type
4. OAI-Device-Id
5. OAI-Package-Name
6. User-Agent

The X-Sentinel-Payload value is the JSON token bundle containing bot_token, play_integrity_token and chat_requirement_token. It is a header value, not bodyPatchJson. This is distinct from the Valdi adapter's optional app_attest_challenge JSON body-patch validator: that optional field is not populated by this inspected native method.

### Authenticated HTTP helper and cookie path

The native HTTP helper resolves a relative API path against the supplied base URL, uses POST with JSON, disables automatic redirects, and sets 30,000 ms connect/read timeouts. It applies Accept and Content-Type, bearer authorization, ChatGPT-Account-Id, and the native Android client/device/package/user-agent headers. The internal package header is only reached after the package preflight. It rejects non-success responses, bounds response reading, collects Set-Cookie, and disconnects the active connection when its cancellable task is cancelled.

Set-Cookie values are parsed into the active Android CookieManager. The later verification step requires a non-empty, Secure, unexpired, trusted-domain device-verification cookie with a path accepted for the relevant backend API route. This is an internal-only client flow, not a public ChatJS request template.

### Two token roles and source version

The first Google Play Standard Integrity token is requested with a fresh 256-byte SecureRandom nonce, Base64 URL-safe/no-wrap encoded, and is used in the first /backend-api/playintegrity exchange to establish the device-verification cookie. A second token is requested using a SHA-256 hash of canonical identity JSON containing account_id, conversation_id, device_id, and parent_message_id in that order. These are distinct inputs; the request hash is not the initial nonce.

The native helper hardcodes User-Agent ChatGPT/1.2026.209 (Android ; build 2620909), while the enclosing public XAPK manifest is ChatGPT 1.2026.321, version code 2632129. The mismatch is observed; its cause and compatibility implications are unknown. Do not update the native user-agent to match the APK or assume a different version behaves identically without new source evidence.

### Reproducible DEX and asset provenance

- classes2.dex: 9,475,272 bytes; SHA-256 aae7493e3716d33b94af3c707acfd201fe0e8bbf3a34e56ad06d0e67af0a490a.
- classes4.dex: 13,680,548 bytes; SHA-256 a9fea19ad93d2d6e48bbb6605df2d538bdd8d01a54db30374d484369ce9c6643.
- Compressed assets/oai_device_integrity.valdimodule: 252 bytes; SHA-256 70d9ee72d56620d384d7a4ec675a0ed0bf2e1f7a7f16f495bf951e6fafc4b6ba.
- Decompressed type-module payload: 336 bytes; SHA-256 d087b397d9138492dc3476c65f1390dab6fa0a760f4847d32a1c503ab29713b5.

### Evidence boundary

This is static DEX and packaged-asset analysis only. No Android method was executed, no Play Integrity token or cookie was requested, and no HTTP endpoint was called. The package gate still makes this native exchange unavailable to the supplied public package. Remaining details include retry attempt ceilings, DeviceRateLimits scope/retention and cooldown persistence, exact cookie-name/lifetime/rotation/deletion, device UUID rotation/deletion, the UA mismatch, a distinct public provider in another authentic build, and live service behavior.


## 2026-11-25 — ChatJS Android model-catalog and chat-requirements schema helpers

The source-traced generated API contract now has a private Node.js implementation in `src/chatgpt/android-conversation-api-schema.cjs`:

- `buildModelCatalogRequest` validates the two required boolean request fields and produces the `GET /backend-api/models` path with `iim` and `supports_model_picker_upgrade_presets` query values in the observed order.
- `buildChatRequirementsRequest` returns the observed `POST /backend-api/sentinel/chat-requirements` descriptor with an empty JSON object body.
- The response decoders implement `ModelCatalogResponse` and its nested model/version/preset arrays, plus `ChatRequirementsResponse` and its Turnstile/proof-of-work/`so` challenge arrays. Required fields and optional field types match the generated decoder contracts documented above.
- Optional values are omitted only when `undefined`; present `null` values are passed to the corresponding primitive/array validator and rejected. Additional object properties are preserved rather than stripped.
- `resolveDefaultRequirementsIntegrityHeader` requires a non-empty requirements token and returns the source-named header only when no challenge descriptor is marked `required === true`. Any required challenge throws `CHATGPT_ANDROID_API_DEVICE_INTEGRITY_REQUIRED`; no challenge result is fabricated or bypassed.

The helper is internal and side-effect-free. Nine deterministic tests cover the request descriptors, schema nesting, optional/null behavior, extension-field pass-through and fail-closed challenge routing. It makes no network requests and is not authentication, a public native integrity provider, a challenge solver, or an implemented conversation workflow. The supplied public XAPK's `com.openai.chatgpt.internal` package preflight remains respected. Authorized end-to-end service tests and public-build device-integrity support remain open.


## 2026-11-25 — Android authentication validation predicates and credential architecture

### Source provenance and inspection depth

The supplied `ChatGPT-Android.xapk` was rechecked in this session (SHA-256 `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`). The base APK's `assets/oai_authentication_session.valdimodule` was extracted and Zstandard-decompressed. The decompressed Valdi payload is 70,816 bytes, SHA-256 `5211ced4520704e13e14ebb1f2faf51a91de091877f596a5a0516bd8bebd8917`. This pass examined embedded module names, method identifiers, schema identifiers, endpoint constants, regular-expression patterns, and error/state strings. It is a static compiled-module string/symbol inspection, not method-body disassembly and not execution of Android app code.

### Authentication/session component map visible in the module

The module identifies these separate client components:

- `ChatGPTAuthenticationApiClient`: generated account-check operation at `/backend-api/accounts/check/v4-2023-04-27`. The embedded schema identifiers include `account_id`, `account_user_id`, `is_deactivated`, `plan_type`, `profile_picture_url`, `account.can_access_with_session`, and account-ordering fields. Exact HTTP method/body/query branch, requiredness and complete nested decoder behavior are not yet disassembled.
- `SessionAuthenticatedAccountService`: checks bearer credential validity and encoded origin-relative request paths; its errors include invalid bearer and unsafe path rejection.
- `OAIAuthenticationController`: a stateful controller. Identified operations include capability discovery, subscription, restore, interactive sign-in, access-token authentication, account selection, sign-out, request/credential operation admission, foreground waiting, cancellation, session establishment, credential validation, session revalidation, secure save/clear, expired-credential cleanup, and guarded state updates.
- `OAINativeCredential`: bridge to a native first-party authentication/credential client with sign-in, restore, access-token, clear and cancellation callbacks. The visible result model includes access token, native session ID and failure kind.
- `OAICredentialStore`: memory, unavailable and encrypted credential-store implementations. The secure implementation references native secure storage, Android API level 23 or newer, foreground-only access, encrypted persistent storage, and fail-closed errors when secure storage is unavailable. A browser-specific path remains in memory when native secure storage is unavailable; it is not evidence of durable browser credential storage.
- `OAIRequestCredential`: handles first-party rejected-credential error identifiers `token_revoked`, `token_invalidated`, `require_sso_login`, and `token_expired`, with Revoked/RequiresSSO/Renew recovery classifications visible in the compiled strings. Exact branch ordering, renewal and invalidation rules require method disassembly.
- `OAIBearerAPIService`: validates bearer token and account identifier before authenticated requests, sends `Authorization: Bearer ...` and `ChatGPT-Account-Id`, and includes an authenticated-image path with a signed-content-origin check, image MIME validation and bounded response checks.
- `OAIAuthenticationValidation`: exports `isValidOAIBearerToken`, `isValidOAIAccountIdentifier`, `isValidHTTPHeaderName`, `isValidHTTPHeaderValue`, `isTrustedOAIAPIOrigin`, and `isSafeOriginRelativePath`.

Visible authentication-controller states include SignedOut, Restoring, SigningIn, SignedIn, InvalidToken and typed Network, InvalidResponse, Storage, Cancelled and StorageTemporarilyUnavailable failures. Credential-store strings include a versioned record containing accessToken, nativeSessionId, baseUrl, expiresAt and account metadata. These identifiers establish the presence of those structures, not their complete serialization order or state-transition semantics.

### Concrete validation patterns observed

The compiled validation module contains these pattern strings and constraints:

- Bearer token: `^[a-z\\d._~+/=-]+$`
- Account identifier: `^[a-z\\d._-]+$`
- HTTP header name: `^[!#$%&'*+.^_`|~a-z0-9-]+$`
- HTTP header value: rejects any `[\\u0000-\\u001f\\u007f]` control character.
- Trusted API origin: `^https:\\/\\/(?:[a-z\\d-]+\\.)*(?:openai\\.com|chatgpt\\.com|openai-staging\\.com|chatgpt-staging\\.com)$`

The generated client and bearer service also contain the route `/backend-api/accounts/check/v4-2023-04-27` and the headers `Authorization` and `ChatGPT-Account-Id`. The ChatJS helper currently applies case-insensitive ASCII matching to the lowercase character classes; this pass did not independently recover the compiled regular-expression flags, so exact flag parity remains a bytecode-disassembly item. The separate safe-origin-relative-path function is deliberately not ported from its name alone; its exact rules remain open.

### ChatJS implementation

Added private `src/chatgpt/android-auth-validation.cjs` and `tests/android-auth-validation.test.cjs`. The pure functions are `isValidOAIBearerToken`, `isValidOAIAccountIdentifier`, `isValidHTTPHeaderName`, `isValidHTTPHeaderValue`, and `isTrustedOAIAPIOrigin`. Seven deterministic tests cover valid token/account/header alphabets, ASCII control-character rejection, trusted production/staging HTTPS origins, and rejection of other schemes, ports, paths and lookalike domains.

The helper performs no storage, authentication, account lookup, request construction or network operation, and it is not a public ChatJS export. No real credential or account data was used in tests. Android's actual native credential service and secure storage are not reproduced by this slice.

### Remaining authentication questions

1. Disassemble the exact validation functions, including regex flags, Unicode behavior and the complete `isSafeOriginRelativePath` rules before using it for a transport.
2. Trace `OAIAuthenticationController` operation-generation/cancellation/foreground lifecycle and all state transitions in method bodies.
3. Reconstruct the native sign-in/restore bridge protocol, credential callback/error schemas, account selection and native session ID lifecycle.
4. Trace the encrypted `OAICredentialStore` serialization, secure-store ownership, atomicity, unavailable-state behavior, expiry and clear semantics. Do not port Android's keystore assumptions to a Node host.
5. Decode the complete generated account-check request/response schema and method selection; verify account ordering and `can_access_with_session` branch usage.
6. Trace `OAIRequestCredential` status/recovery branches, renewal authorization, SSO-required handling, revocation persistence and account-switch safety.
7. Implement a portable host secure-storage adapter only after the source lifecycle is reconstructed; absence of a secure adapter must remain observable and must not fall back to plaintext persistence.
8. Keep the accountless guest SessionManager lifecycle separate; this module's credential-backed AuthSession is not evidence of guest create/refresh.
## 2026-11-25 — Android authentication validation and account-check method reconstruction

### Source provenance and safe inspection

The supplied `ChatGPT-Android.xapk` was rechecked (SHA-256 `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`). The base APK contains `assets/oai_authentication_session.valdimodule`; its decompressed 70,816-byte Valdi archive packet has SHA-256 `5211ced4520704e13e14ebb1f2faf51a91de091877f596a5a0516bd8bebd8917`.

A temporary reader was rebuilt from public `Snapchat/Valdi` commit `f5bc2dcfcb880109c908e0675968cb532231ca71` (QuickJS `2021-03-27`). The outer Zstandard payload was parsed using the Valdi archive packet/entry framing; each JavaScript entry's own precompiled marker was stripped before `JS_ReadObject(..., JS_READ_OBJ_BYTECODE)`. A bytecode-dump hook ran after constant-pool reconstruction. The harness only deserializes bytecode and frees objects: it does not evaluate functions, execute Android code, make network requests, or access credentials. The Android native library's exact QuickJS source revision/build flags are not verified. The temporary tool and extracted app payloads remain outside the ChatJS repository and production archive.

Seven authentication-session JavaScript entries were method-decoded: generated `ChatGPTAuthenticationApiClient`, `SessionAuthenticatedAccountService`, `OAIAuthenticationValidation`, `OAIAuthenticationController`, `OAINativeCredential`, `OAICredentialStore`, and `OAIRequestCredential`. This is static method-body evidence, not live behavior or a ChatJS implementation.

### Validation predicates and authenticated path boundary

Compiled regular-expression flags were recovered from the constant pool and checked against pinned QuickJS:
- `isValidOAIBearerToken`: `^[a-z\d._~+/=-]+$` with ignore-case (`/i`).
- `isValidOAIAccountIdentifier`: `^[a-z\d._-]+$` with `/i`.
- `isValidHTTPHeaderName`: `^[!#$%&'*+.^_`|~a-z0-9-]+$` with `/i`.
- `isValidHTTPHeaderValue`: rejects `[\u0000-\u001f\u007f]`; compiled regex has no ignore-case flag.
- `isTrustedOAIAPIOrigin`: `^https://(?:[a-z\d-]+\.)*(?:openai\.com|chatgpt\.com|openai-staging\.com|chatgpt-staging\.com)$` with `/i`.

`isSafeOriginRelativePath` requires a leading `/`, rejects a leading `//`, any backslash, any `://` substring and ASCII control characters. It does not itself reject spaces or `#`. `SessionAuthenticatedAccountService` calls this predicate and then separately rejects literal space and `#`; the complete service boundary rejects both. Its bearer helper validates before constructing `Bearer `. Its method normalizer accepts only GET, POST, PUT, DELETE and PATCH.

The private ChatJS helper now ports both path layers separately as `isSafeOriginRelativePath` and `isSafeAuthenticatedRequestPath`. A Node-side type guard makes non-string input return false. Ten focused tests cover source-derived allow/reject cases, including a single backslash, spaces, fragments, controls, case-insensitive patterns and trusted-origin boundaries. Neither predicate is wired to transport.

### Generated account-check operation

The generated operation is **GET** `/backend-api/accounts/check/v4-2023-04-27`. Its request descriptor contains only `method: GET` and `path`; it adds no query or body fields. The transport operation is named `checkAccounts`.

The generated response decoder establishes:
- `AccountCheckResponse.accounts` is a required object map keyed by account ID, with each value decoded as `AccountCheckRecord`; `account_ordering` is optional and decoded as `string[]`. Additional response properties are preserved. (Corrected by the later method-level map/schema section.)
- `AccountCheckRecord.account` and `can_access_with_session` are optional decoded properties; extra record properties are preserved.
- `AccountCheckAccount` has optional decoded `account_id`, `account_user_id`, `is_deactivated`, `name`, `plan_type`, `structure`, and `profile_picture_url`; extra account properties are preserved.

Remaining union/nullable alternatives, full `structure` schema, `account_ordering` element type and every nested decoder constraint are not fully documented. Route/method are established, but account availability/selection policy and controller use of `can_access_with_session` remain open.

### Authentication controller, native credentials and recovery

`OAIAuthenticationController` method names confirm capability discovery/subscription, restore/native restore, sign-in/interactive sign-in, access-token authentication, account selection, sign-out, operation admission, interactive credential request/cancellation, session establishment, credential validation, session construction, request/revalidation, secure save, expired-session invalidation/cleanup, operation failure, app-state admission, generation checks, foreground waiting and guarded state updates. Visible states are `SignedOut`, `Restoring`, `SigningIn`, `SignedIn`, `InvalidToken`, `Network`, `InvalidResponse`, `Storage`, `Cancelled`, and `StorageTemporarilyUnavailable`. Transition order, operation-generation races, and cancellation/foreground ordering still need branch-by-branch reconstruction.

`OAINativeCredential` bridges to Android's first-party native credential service for sign-in, restore, access-token retrieval, clear and cancellation callbacks. The bridge carries an access token, native session ID and typed failure information; an arbitrary token string is not a complete Android session. No native sign-in/restore method was invoked.

`OAIRequestCredential` maps `token_revoked` and `token_invalidated` to revoked. For HTTP 401 details, observed `code`/`type` cases distinguish revoked, `require_sso_login` (SSO required), `token_expired` (renewal), and no known recovery. Do not collapse these into generic retry. Renewal permission, persistence/invalidation and retry order remain open.

`OAICredentialStore` exposes memory, unavailable and encrypted variants. Earlier static identifiers point to Android native secure storage, API 23+, foreground-only access and fail-closed behavior when unavailable. Encryption serialization, key ownership, atomicity, migration and full error lifecycle are not method-reconstructed. Never substitute plaintext Node persistence. `OAIBearerAPIService` separately validates bearer/account IDs and constructs `Authorization: Bearer ...` and `ChatGPT-Account-Id`; its authenticated image path adds signed-content origin, MIME and bounded-body restrictions.

### ChatJS implementation and limits

Private `src/chatgpt/android-auth-validation.cjs` now includes seven pure predicates: bearer token, account identifier, header name/value, trusted HTTPS origin, origin-relative path and full authenticated account-service path. `tests/android-auth-validation.test.cjs` has ten deterministic tests. These helpers are not public exports. They do not acquire/persist/refresh credentials, call native auth, select accounts, make authenticated requests, solve integrity challenges or contact ChatGPT.

### Remaining authentication work

1. Complete nested `AccountCheckAccount`, `AccountCheckRecord` and `AccountCheckResponse` union/nullable decoders; trace account ordering and session-access flags.
2. Reconstruct controller concurrency, generation invalidation, foreground/background transitions, cancellation, sign-out and expiry cleanup.
3. Reconstruct native sign-in/restore bridge request/result/error schemas and native session-ID ownership; do not assume a Node token-string method is equivalent.
4. Decode encrypted credential record format, native key lifecycle, atomic save/clear, unavailable-state behavior and migration. Define a portable secure-storage adapter only after the contract is understood; otherwise fail closed.
5. Trace status/error precedence, renewal authorization, SSO reauthentication, invalidation and retry.
6. Trace DPoP/token refresh/account switching separately from accountless guest `SessionManager` operations.
7. Do not implement authenticated network operations until credential ownership, request contract, public-build integrity requirements, cancellation and legitimate authorization are established and tested.
## 2026-11-25 — Android account-check map schema and account-selection policy

### Corrected generated response shape

The generated `AccountCheckResponse.accounts` field is an **object map keyed by account ID**, not an array. The generated decoder validates the value as an object, enumerates its own keys and decodes each value as an `AccountCheckRecord`. Unknown properties are preserved at the response, record and account levels. Earlier notes that described `accounts` as an array were incorrect and are superseded by this method-level reconstruction.

`account_ordering` is optional and, when present, is a `string[]`. The generated decoder treats only `undefined` as omission; a present `null` is sent through the array decoder and rejected.

Each map value (`AccountCheckRecord`) has optional:
- `account`: `AccountCheckAccount` object when present; a present `null` is rejected.
- `can_access_with_session`: boolean when present; a present `null` is rejected.

`AccountCheckAccount` has these optional fields and exact decoded types:
- `account_id`: string.
- `account_user_id`: string or null.
- `is_deactivated`: boolean.
- `name`: string or null.
- `plan_type`: string.
- `structure`: string or null.
- `profile_picture_url`: string or null.

### Controller ordering, access filtering and initial selection

The controller's account-normalization method uses `account_ordering` first, then appends every key from `Object.keys(accounts)` in JavaScript property enumeration order. It resolves each key against the account map, ignores missing keys, normalizes valid entries, and deduplicates by the normalized account ID. The first occurrence therefore wins; accounts absent from `account_ordering` are still considered through the map-key fallback.

The normalization method excludes a record when `can_access_with_session === false`, when its `account` object is absent, when `account_id` is not a non-empty valid account identifier, or when `is_deactivated === true`. The method does not require an explicit `can_access_with_session === true` or `is_deactivated === false`; absent values do not trigger those exact-false/exact-true exclusions (the generated decoder still rejects wrong present types). It produces an account choice with:
- `id` from `account_id`;
- `name` from a non-empty string `name`, otherwise `Personal account`;
- `accountUserId` only for a valid string `account_user_id`;
- `planLabel` only for a non-empty string `plan_type`;
- `isWorkspace` only for `structure === 'personal'` or `structure === 'workspace'`;
- `pictureURL` only when `profile_picture_url` is a string matching an HTTPS-prefix check.

If no eligible choices remain, the controller fails with `InvalidResponse` and the message `The access token did not provide an accessible account.`

During this credential-validation path, initial selection prefers the account whose normalized `id` equals the supplied credential's `accountId`; if no match exists it falls back to the first normalized account in the resolved order. This method does not itself issue a user-facing picker prompt. The controller also declares a separate `selectAccount` operation; its method body is reconstructed in the later standalone `selectAccount` section. Its caller/UI wiring and underlying secure-store durability semantics remain open.

### ChatJS implementation

Added private `src/chatgpt/android-authentication-api-schema.cjs` with the exact GET request descriptor, generated response decoding (including the accounts object map, nested optional/nullable fields and extra-property pass-through), controller account normalization/ordering/deduplication, and preferred-account/first-account selection. Twelve deterministic tests cover request method/path, rejection of array-shaped accounts, nested field types, undefined-versus-null behavior, account ordering, access/deactivation filtering, identifier validation, normalization, deduplication, preferred-account fallback and the no-accessible-account error.

The helper is internal, has no public API or authenticated transport, and makes no network/storage/credential changes. No ChatGPT request or account operation was executed. The Android authentication controller's concurrency, native credential ownership, secure storage, revalidation, DPoP and full account-switching lifecycle remain unimplemented.

## 2026-11-25 — Android standalone `selectAccount` controller method

The compiled `OAIAuthenticationController.selectAccount` method is distinct from the automatic preferred-account selection used when first validating an access token. It accepts an account choice, but does not trust that object as the session account. It resolves a canonical entry from the current signed-in session's `accounts` list by matching `candidate.id === requested.id`.

Observed behavior, in method order:

1. Returns without changes when the controller is disposed or the app state is not allowed for the operation.
2. Returns unless the current state is `SignedIn` and has a current session.
3. Searches the current session's `accounts` by account ID. Returns if no matching account exists or if the requested ID is already the active account ID.
4. Cancels the current `validationTask` if present, clears `validationTask` and `revalidation`, increments `operationGeneration`, and emits `lifecycleChanges.next(lifecycleChanges.value)` to notify lifecycle observers.
5. Calls `makeSession` using the existing access token, current account list, the canonical matched account object, and the new operation generation. `makeSession` constructs a new account-bound API service and request-credential context; it does not itself perform the selected-account HTTP operation.
6. Updates controller state to `SignedIn` with the newly constructed session, then calls `saveSession(newSession, generation)` and attaches a rejection handler.
7. The save rejection handler only emits the guarded warning `The selected account could not be saved securely.`. The selection method does not await the save promise, propagate that persistence error, roll back the in-memory session, or transition the UI state to a storage failure in this catch path.

The method contains no account-check network request and does not show a user-facing picker; it receives a choice from its caller. The caller/UI wiring that supplies that choice remains untraced. The persistence call is routed through the controller's `saveSession` wrapper to the credential-store save method, but this does not establish the encrypted store's serialization, key ownership, atomicity or durability semantics. Those remain separate work.

This is method-level source evidence only. ChatJS does not yet implement an authenticated controller, account selection UI, session mutation, credential persistence or account switching. The private account-check helper implements only the initial account-choice normalization/preference function; it must not be described as a complete switch workflow.

## 2026-11-25 — Android authentication restore and sign-in orchestration

The decoded controller methods also establish these distinct entry paths. They are static method behavior, not an operational ChatJS authentication client.

### Restore

- `restore()` begins a new credential operation in `Restoring` state and runs its work through the controller's credential-operation wrapper.
- It loads the saved record from the credential store. If there is no record, the controller returns to `SignedOut` for the still-current operation.
- If the saved record has a `nativeSessionId`, the controller stores that ID as the expected native session and calls `restoreNativeToken`. A missing access token from that native restore is treated as a storage/restore failure. If the operation generation has changed, the restore result is discarded rather than establishing a session.
- `restoreNativeToken(record)` requires a configured `renewableAuthenticationService`; when absent it raises a `Storage` failure saying `The saved session requires its native credential provider.` It calls the native service's `restore(record)` and requires the returned `nativeSessionId` to exactly equal the saved record's ID. A mismatch is `InvalidResponse` (`The saved sign-in has changed.`). It returns the restored access token only after this check.
- If there is no saved `nativeSessionId`, the saved `accessToken` is used directly as the candidate token. Both branches call `establishSession` only after the operation-generation guard.
- An `InvalidToken` restore failure triggers `clearExpiredCredential`; other errors go through `failOperation`. Unknown restore errors are mapped to `Storage` (`The secure session could not be restored.`). Cancellation/generation changes prevent stale work from establishing a new session.

### Direct access-token sign-in

`signIn(accessToken)` begins a `SigningIn` operation and delegates to `authenticateAccessToken`. That method trims the supplied token, validates its syntax with `isValidOAIBearerToken`, then runs the account-validation path. It saves the validated session before setting the controller state to `SignedIn`; if secure save fails, it raises a `Storage` failure (`The access token could not be saved securely.`). Operation-generation checks prevent an outdated operation from overwriting newer state.

### Interactive sign-in

`signInInteractively(method)` first requires an available first-party authentication service and a supported method. Unsupported host/method combinations fail as `InvalidResponse` (`This host does not provide the selected first-party sign-in method.`). It begins a `SigningIn` operation and waits for app foreground admission when necessary.

- For the `Browser` method when a renewable/native authentication service is available, it calls that service's `signIn()`, stores the interactive task, awaits its result, and uses the returned access token and native session ID. If the operation generation changed during the wait, it clears the unfinished native session instead of continuing.
- Otherwise it delegates to `requestInteractiveCredential(authenticationService, method, generation)` and awaits the host-interactive credential result.
- After either branch it rechecks operation generation and calls `authenticateAccessToken` with the token. If a newly-created native session fails authentication, the controller attempts to clear that unfinished native session. Failure to clear is only logged as `The unfinished native login could not be removed.` when logging is enabled; the original failure is then surfaced.

### Security and implementation boundary

The controller uses a serialized/guarded credential-operation lifecycle, foreground admission, operation generations, native-session ownership checks, save-before-`SignedIn` for initial direct-token authentication, and cleanup of unfinished native sign-in. These are distinct from the accountless guest `SessionManager` state machine. The source trace does not justify a Node.js token-only login shortcut: native session IDs, legitimate host authentication service, secure credential storage, account validation, cancellation and first-party integrity requirements remain material parts of the lifecycle.

ChatJS still does not implement `restore`, sign-in, native credential bridge, secure persistence, or authenticated transport. No credential was requested/read, no native operation was invoked, and no network request was made during this analysis.

## 2026-11-25 — Android restore, direct-token and interactive sign-in controller methods

### Restore and native-session identity

`restore()` starts a new credential operation in `Restoring`, then runs credential-store loading through the controller operation wrapper. With no saved record it transitions back to `SignedOut` for the current generation. When a saved record contains `nativeSessionId`, the controller records that ID as the expected native owner and calls `restoreNativeToken(record)`. The native restore result must contain the same `nativeSessionId`; a mismatch is `InvalidResponse` (`The saved sign-in has changed.`). The returned native access token is used to establish a session only after the operation-generation guard. A record with no native session ID uses its saved access token as the candidate. An invalid-token restore failure clears the expired credential; unknown restore failures are mapped to `Storage` (`The secure session could not be restored.`). Stale generations do not establish a session.

`restoreNativeToken(record)` fails with a storage error if `renewableAuthenticationService` is unavailable (`The saved session requires its native credential provider.`). Otherwise it awaits that service's restore operation, validates native session ID equality, and only then returns the access token. This is why a Node.js bearer-token string alone is not equivalent to restoring an Android credential-backed session.

### Direct access-token sign-in

`signIn(accessToken)` begins an operation in `SigningIn` and delegates to `authenticateAccessToken`. That method trims the input, applies `isValidOAIBearerToken`, runs `validateCredential` (including authenticated account-check and account choice), then awaits `saveSession`. Only after secure save succeeds and the operation generation still matches does it update controller state to `SignedIn`. A non-authentication persistence failure becomes a `Storage` error with message `The access token could not be saved securely.` The controller does not accept invalid tokens or silently treat them as a saved session.

### Interactive sign-in

`signInInteractively(method)` requires both an available first-party authentication service and `supportsAuthenticationMethod(method)`. Missing/unsupported host capability fails as `InvalidResponse` (`This host does not provide the selected first-party sign-in method.`). It begins a `SigningIn` operation, waits for foreground admission if necessary, and checks the operation generation before requesting credentials.

- When `method === Browser` and a `renewableAuthenticationService` is available, the controller calls that service's `signIn()`, stores the returned interactive task, awaits its typed result, and receives an access token plus native session ID. It records the native ID and uses the token for authenticated account validation. If the operation generation changes while waiting, it clears the unfinished native session instead of continuing.
- Otherwise it calls `requestInteractiveCredential(authenticationService, method, generation)` and awaits the host-interactive credential result.
- After either branch it checks the generation again and invokes `authenticateAccessToken`. If the newly-created native sign-in fails after obtaining a native session ID, the controller attempts native `clear`; failure to remove that unfinished login is only logged (`The unfinished native login could not be removed.`) and the original authentication error is preserved.

### Boundaries

These traces identify controller orchestration and sequencing only. The native service request/result/cancel payloads, exact host capability contracts, secure credential-store serialization/key management, full operation queue/concurrency rules and DPoP/renewal semantics remain open. No native sign-in/restore method was invoked, no access token or account was used, and no ChatGPT network request was made. ChatJS does not implement login, restore, native credential handling, persistence or authenticated transport. Android guest `SessionManager` is separate from this authenticated `AuthSession` lifecycle.

## 2026-11-25 — Android encrypted credential-store method reconstruction

The compiled `OAICredentialStore` entry is now method-decoded. It defines three distinct store implementations:

- `OAIMemoryCredentialStore`: `isPersistent === false`; `load` resolves the current in-memory record, `save` replaces it, and `clear` sets it to `undefined`.
- `OAIUnavailableCredentialStore`: `isPersistent === false`; `load` and `save` reject with `Secure native credential storage is unavailable.`; `clear` resolves without a durable write.
- `OAIEncryptedCredentialStore`: `isPersistent === true`; delegates durable data operations to the app `PersistentStore` adapter.

### Encrypted-store construction and admission

`createOAICredentialStore` uses these method-level branches:

- If a lifecycle is supplied and the application is not foregrounded at construction, it throws `PersistentStoreTemporarilyUnavailableError` rather than creating a store in an unavailable state.
- On the web platform, it warns that browser authentication remains in memory because secure native credential storage is unavailable and returns `OAIMemoryCredentialStore`. This is explicitly non-persistent, not a durable browser fallback.
- On Android, it parses the system version and rejects non-integer or API levels below 23 with `Secure authentication requires Android API level 23 or newer.`
- The persistent adapter is constructed with store identifier `com.openai.valdi.authenticated_session`, `enableEncryption: true`, `disableBatchWrites: true`, and store user identifier `authenticated-session-bootstrap`. Its access policy is `ForegroundOnly` when a lifecycle is configured, or `AnyAppState` when no lifecycle is supplied.
- A `PersistentStoreTemporarilyUnavailableError` from construction is propagated. Other native secure-store construction failures are logged when enabled and select `OAIUnavailableCredentialStore`; the factory does not silently fall back to plaintext or an ordinary persistent string store.

Before store operations, `checkAdmission` invokes an optional `checkOperation` callback. If a lifecycle is configured, it also checks the application foreground state and throws `PersistentStoreTemporarilyUnavailableError` when backgrounded. Load/save/clear call this admission gate around persistent-store operations.

### Serialized record validation and operations

`load` checks whether the credential key exists. If absent it returns `undefined`. Otherwise it fetches the stored string and parses JSON. Malformed JSON becomes `The encrypted authentication credential could not be decoded.`; an invalid record becomes `The encrypted authentication credential has an invalid format.`

The top-level record must be a non-array object and must carry exactly one credential identity form:
- a non-empty string `accessToken` with no `nativeSessionId`, or
- a non-empty string `nativeSessionId` with no `accessToken`.

An optional `accountId` must be a string when present. An optional `session` snapshot is validated separately; invalid snapshots are dropped rather than accepted. The snapshot requires `version === 1`, a string `baseUrl`, optional finite-number `expiresAt`, a non-empty `accounts` array, and every account choice must have a string `id` and `name`; optional `accountUserId`/`planLabel`/`pictureURL` must be strings and `isWorkspace` must be boolean. The decoded record preserves its other top-level properties, carries back only the validated credential identity form, and includes the validated account ID/session snapshot when present.

`save(record)` checks admission then writes `JSON.stringify(record)` through `PersistentStore.storeString`. `clear()` checks admission, tests key existence, and removes the key only when it exists. This module does not contain the encryption algorithm or key derivation; `enableEncryption: true` is a configuration handed to the native `PersistentStore` implementation. Its crypto provider, key ownership/rotation, backing database, transactional atomicity, crash consistency and user/logout deletion semantics are not established by this entry.

### ChatJS implementation boundary

These findings are method-level source evidence, not permission to store ChatGPT credentials in a Node.js plaintext file or to assume an arbitrary host has Android's native secure store. ChatJS still has no secure credential-store adapter or authentication session. A future portable host must expose a real protected-storage capability with explicit ownership, encryption, atomicity, foreground/availability and clear semantics; where that capability is unavailable, authenticated persistence must fail closed. No token or credential record was loaded, saved, cleared or otherwise accessed during this static analysis.

## 2026-11-25 — Android credential-store record, persistence configuration and admission lifecycle

### Persistent-store configuration

`createOAICredentialStore(options)` selects among three stores:

- `OAIMemoryCredentialStore` is selected for the Web device path. It holds a single credential object in memory, reports `isPersistent === false`, and its load/save/clear operations only read/write/clear that in-memory property. The source logs that browser authentication remains in memory because secure native credential storage is unavailable.
- `OAIUnavailableCredentialStore` is the fail-closed fallback. `load` and `save` reject with `Secure native credential storage is unavailable.`; `clear` resolves without persistence. It reports `isPersistent === false`.
- `OAIEncryptedCredentialStore` wraps the Valdi `PersistentStore`. On Android, the factory checks that `Device.getSystemVersion()` parses as an integer at least 23, otherwise throws `Secure authentication requires Android API level 23 or newer.` The persistent store is constructed with namespace `com.openai.valdi.authenticated_session`, storage key `credential`, and options `enableEncryption: true`, `disableBatchWrites: true`, `userId: 'authenticated-session-bootstrap'`. Its access policy is `AnyAppState` when no application lifecycle is supplied and `ForegroundOnly` when lifecycle is supplied. A non-temporary construction failure logs and selects the unavailable store; `PersistentStoreTemporarilyUnavailableError` is propagated so the controller can wait for foreground admission.

The auth module delegates encryption to `PersistentStore`; no cipher, key derivation, keystore alias, key rotation, serialized ciphertext format or atomicity guarantee is established by this module's bytecode. Do not infer any of those from `enableEncryption: true`.

### Encrypted store operation contract

`checkAdmission()` first calls the optional controller-supplied `checkOperation()` callback. When an application lifecycle is supplied, it also requires `ApplicationState.isApplicationForeground(lifecycle.getState())`; otherwise it throws `PersistentStoreTemporarilyUnavailableError`.

- `load()` checks admission, calls `store.exists('credential')`, checks admission again, and returns `undefined` if absent. It then calls `fetchString('credential')`, checks admission, parses JSON, validates the top-level credential envelope and normalizes its optional nested session snapshot. JSON parse errors become `The encrypted authentication credential could not be decoded.`; invalid top-level shape becomes `The encrypted authentication credential has an invalid format.`. Invalid nested session metadata is discarded (and logged when enabled) while the outer credential can still be returned.
- `save(record)` checks admission and calls `store.storeString('credential', JSON.stringify(record))`. This wrapper performs JSON serialization; the encrypted persistence layer is the separate Valdi `PersistentStore`.
- `clear()` checks admission, checks whether the `credential` key exists, checks admission again, and removes the key if present.

### Persisted record envelope

The top-level record distinguishes mutually exclusive credential owners:

- Access-token form: `accessToken` must be a non-empty string after trimming; `nativeSessionId` is absent.
- Native-session form: `nativeSessionId` must be a non-empty string; `accessToken` is absent. The native session ID is the credential owner/restore handle and is not substituted with a bearer token.
- `accountId` is optional and must be a string when present. Unknown top-level properties are preserved by the decoder.

The optional nested `session` snapshot must be an object with `version === 1`, string `baseUrl`, optional finite-number `expiresAt`, and a non-empty `accounts` array. Each stored account requires string `id` and `name`; optional `accountUserId` and `planLabel` must be strings, `isWorkspace` must be boolean, and `pictureURL` must be a string. Unknown properties are preserved. A malformed nested snapshot is dropped rather than invalidating the outer token/native-session envelope.

`saveSession` builds an access-token record with `accountId` and derives an optional expiry from the JWT payload's finite numeric `exp` claim. It includes the version-1 `session` snapshot only when that expiry is available. For a native-session credential it stores `nativeSessionId` (not `accessToken`), `accountId`, and the version-1 snapshot with `baseUrl`/`accounts`; it does not derive or persist an `expiresAt` from the access token on that path. JWT decoding here is only expiry metadata extraction; it does not verify a JWT signature or establish token validity.

### Serialized controller credential operations

The controller initializes `pendingCredentialOperation` to a resolved promise and chains each credential-store operation after the prior one, swallowing only the prior completion/rejection so a failed operation does not permanently block later operations. `runCredentialOperation` records the operation generation, waits for foreground admission, checks that generation/owner has not changed, lazily constructs the credential store with both the app lifecycle and a generation-check callback, runs the requested store action, and checks generation/foreground state again. A temporary persistent-store unavailability updates the current auth state to `StorageTemporarilyUnavailable`; with an app lifecycle, the operation waits for a lifecycle change/foreground admission and retries. Without lifecycle to observe, that temporary failure is surfaced. The credential operation generation is cleared in a `finally` path.

This controller queue is distinct from ChatJS's future general request concurrency. The trace does not establish safe multi-process coordination or encryption-store atomicity; those remain open.

### ChatJS implementation and limits

Added private `src/chatgpt/android-auth-credential-record.cjs` with the version-1 record constants, strict outer token/native-session envelope decoder, nested stored-session/account validation, JWT `exp` metadata extraction and source-shaped record builder. Sixteen focused tests cover the record forms, null/undefined/invalid fields, optional snapshot handling, account snapshot validation, expiry decoding and both builder branches. The helper is pure and private; it does not open files, persist credentials, encrypt/decrypt, invoke native services or perform network requests.

The Android persistence metadata/encryption key lifecycle, encryption algorithm, key storage, atomicity/crash recovery, multi-process locking, secure clear guarantees, exact native credential callback payloads and public Node host secure-storage adapter remain unimplemented. A portable ChatJS host must supply a genuine secure storage capability or authentication must fail closed; never use an ordinary file or in-memory fallback as durable credential storage.

## 2026-11-25 — Android rejected-credential recovery classifier

The compiled `OAIRequestCredential` module exports `recoverRejectedCredential` and four recovery outcomes: `None`, `Renew`, `Revoked`, and `RequiresSSO`. Its generated error envelope contains optional/resilient `detail` and top-level `error` objects. `detail.code` is an optional string; `detail.error` is an optional/resilient `APIError`. `APIError.message` is required string, while `code` and `type` are optional strings. An invalid optional/resilient nested APIError is discarded; an invalid `detail.code` invalidates the detail object. Invalid/absent response data is treated as `None` by the classifier.

### Exact classification order

1. No response body or failed JSON/schema decoding -> `None`.
2. When `detail.error` decoded successfully, only its `code` is examined: `token_revoked` or `token_invalidated` -> `Revoked`; any other/missing code -> `None`. It does not consult `detail.error.type` and does not fall through to the top-level `error` after this branch.
3. Otherwise, if `detail.code` exists: `require_sso_login` -> `RequiresSSO`; `token_expired` -> `Renew`; any other code -> `None`. An unrecognized detail code does not fall through to top-level error.
4. Otherwise the top-level `error` is examined: `code` or `type` equal to `token_revoked`/`token_invalidated` -> `Revoked`; `code` or `type` equal to `require_sso_login` -> `RequiresSSO`; all other/missing values -> `None`. In particular, top-level `token_expired` is **not** classified as `Renew` by this source helper.

### Recovery action side effects and caller gate

`recoverRejectedCredential(requestCredentialContext, accountId, responseBody, allowRenewal)` first classifies the response:

- `Revoked` and `RequiresSSO` both call and await `requestCredentialContext.reportRevoked(accountId, requiresSSO)`, with the boolean true only for `RequiresSSO`. Failure is caught and only emits the guarded warning `Unable to invalidate the rejected account credential.`; the method then resolves without a token.
- `Renew` calls `requestCredentialContext.accessToken(accountId)` only when `allowRenewal` is truthy; otherwise it resolves without a token. The permission is an explicit caller-supplied gate, not an automatic refresh on every expiry-like response.
- `None` has no recovery action.

This function delegates actual invalidation and token acquisition to the session request-credential context. It does not itself identify the secure-store clear operation or prove whether a renewed token is accepted by the original request; those semantics must be traced through its caller/session context separately. No API request is replayed here.

### ChatJS implementation and limits

Added private `src/chatgpt/android-request-credential-recovery.cjs`, a pure ErrorEnvelope/APIError decoder, exact source-ordered recovery classifier and a side-effect-free recovery plan. Seventeen deterministic tests cover generated optional/resilient schema behavior, the nested-vs-top-level precedence, the absence of top-level expiry renewal, and explicit renewal permission. The helper does not call `reportRevoked`, call `accessToken`, clear credentials, refresh, retry a request, or access a session. It is private and not wired to authenticated transport.

The remaining native request-credential/session context, actual revoke/clear implementation, token renewal and retry semantics, SSO reauthentication flow, DPoP lifecycle and authorized end-to-end behavior remain unimplemented in ChatJS.

## 2026-11-25 — Android native credential bridge wrapper and service failure enums

The related `oai_authentication` Valdi package contains small type/interface modules in addition to `OAINativeCredential`:

- `OAIAuthenticationService` exports `OAIAuthenticationMethod` (`Browser`, `Codex`) and `OAIAuthenticationServiceFailureKind` (`Cancelled`, `Network`, `Rejected`, `Unavailable`, `Unknown`). The compiled runtime body is enum construction only; no implementation of the authentication service methods is included in this module.
- `OAIRenewableAuthentication` and `OAIScopedAuthorization` have no runtime exports in the inspected module payload (their TypeScript/interface-only declarations are erased). They do not reveal a concrete token-renewal or native storage implementation.

### Native-client wrapper availability and methods

`OAINativeCredential.getNativeCredentialClient(options)` first checks the compiler intrinsic `isVersionAtLeast(483)`, then reads `options.renewableAuthenticationService`. It returns `undefined` when the runtime gate fails or that service is absent. When both conditions are met it returns a wrapper exposing `signIn`, `restore`, `accessToken` and `clear` methods. The literal version threshold is recorded as `483`; its display/version interpretation is not inferred here.

The wrapper's `signIn` path creates an operation task containing a `result` promise and `cancel` function. The cancel closure is a no-op until a native task has been recorded, then delegates to the native task's `cancel()`. The underlying native sign-in call is made through the supplied renewable-authentication service. The `restore` and `accessToken` wrappers similarly delegate to that native service; the actual native callback payload contract and all argument semantics are not present in the interface-only JS module.

The `clear` wrapper delegates to the native service and registers callback properties named `onCredential`, `onCleared` and `onFailure`. One callback path validates a returned `(nativeSessionId, accessToken)` pair: session ID length must be non-zero and the token must pass `isValidOAIBearerToken`; a valid pair is forwarded as `{ nativeSessionId, accessToken }`, while an invalid pair is forwarded as a failure with kind `Unknown`. A separate fallback callback also constructs an `Unknown` failure. The detailed completion/error meaning of `onCleared` and all native-side callback invocation guarantees remain unresolved; the callback names alone are not enough to recreate them.

### Controller mapping of service failures

The decoded controller maps service failure kinds differently by operation:

- Interactive first-party sign-in: `Cancelled` becomes controller `Cancelled`; `Rejected` and `Unavailable` become `InvalidResponse` with `The selected first-party sign-in method is unavailable.`; other/malformed failures become `Network` with `First-party sign-in could not be completed.`
- Native restore: `Rejected` becomes `InvalidToken` (`Your ChatGPT session expired. Sign in again.`); `Cancelled` becomes `Cancelled`; other failures become `Network` (`The saved credential is temporarily unavailable.`).
- A separate controller mapper only at its own runtime gate `isVersionAtLeast(14)` converts service failure kind `Unavailable` to `PersistentStoreTemporarilyUnavailableError`. This is a distinct gate from the native-client factory's literal threshold `483`.

The method/enum value `OAIAuthenticationMethod.Codex` is an Android first-party authentication-method value. It is not evidence that this Android module contains or invokes the separate Codex CLI client family.

### Evidence boundary

This is the complete recoverable Valdi-side wrapper/interface evidence from the inspected package. The backing native `CompilerIntrinsics` client implementation, actual native request/result/cancel payloads, `onCleared` semantics, native session ownership, secure storage, OS authentication UI and credential renewal implementation are not present in these JavaScript interface modules. Do not invent their payloads, simulate success, or replace the host/native bridge with an arbitrary bearer-token string. ChatJS has no native credential adapter or working sign-in/restore implementation; it will need a legitimate explicit host capability and the complete native protocol before such operations can be implemented.

## 2026-11-25 — Android authentication service DEX interfaces and controller credential callbacks

The supplied public base APK's `classes2.dex` provides the concrete method descriptors for the Java/Kotlin interfaces that were only type declarations in the Valdi modules. This is a source/interface reconstruction, not a native service implementation.

### Exact DEX interface contracts

- `OAIAuthenticationCapabilities` stores two booleans: `browser` and `codex`.
- `OAIAuthenticationService.getCapabilities()` returns those capabilities. `signIn(method: OAIAuthenticationMethod, completion: OAIAuthenticationCompletion)` returns `OAIAuthenticationTask`.
- `OAIAuthenticationCompletion.onAuthenticated(accessToken: String)` and `.onFailure(failure: OAIAuthenticationServiceFailure)` are the interactive completion callbacks.
- `OAIAuthenticationTask.cancel()` is the task cancellation operation.
- `OAIRenewableAuthentication.signIn(completion: OAIRenewableAuthenticationCompletion)` returns `OAIAuthenticationTask`.
- `OAIRenewableAuthentication.restore(nativeSessionId: String, completion)` is callback-based and returns `void`.
- `OAIRenewableAuthentication.accessToken(nativeSessionId: String, accountId: String, completion)` is callback-based and returns `void`.
- `OAIRenewableAuthentication.clear(nativeSessionId: String, accountId: String, requiresSSO: boolean, completion)` is callback-based and returns `void`.
- `OAIRenewableAuthenticationCompletion.onCredential(nativeSessionId: String, accessToken: String)`, `.onCleared()`, and `.onFailure(failure)` are distinct callback outcomes. `onCleared` has no result parameters; it is not the same as delivering a replacement credential.

`OAIAuthenticationServiceFailure` wraps one `OAIAuthenticationServiceFailureKind`: `Cancelled`, `Network`, `Rejected`, `Unavailable`, or `Unknown`. The separate `OAIAuthenticationMethod` enum values are `Browser` and `Codex`.

### DEX bridge classes are function adapters, not proof of the host implementation

The APK contains generated adapters that implement these interfaces by forwarding to Kotlin function closures:

- `Lxhq0` implements `OAIAuthenticationService`, forwarding getCapabilities through `Function0` and signIn through `Function2`.
- `Ldjq0` implements `OAIRenewableAuthentication`, forwarding signIn through `Function1`, restore through `Function2`, accessToken through `Function3`, and clear through `Function4` (the clear boolean is boxed for the Kotlin function call).
- `Lwhq0` forwards `OAIAuthenticationCompletion.onAuthenticated/onFailure` to two `Function1` callbacks.
- `Lcjq0` forwards `OAIRenewableAuthenticationCompletion.onCredential` to `Function2`, `onCleared` to `Function0`, and `onFailure` to `Function1`.

These generated adapters prove callback/method bridging shape. They are not the Android authentication backend and do not reveal what the supplied closures do. No other direct DEX class implementation of these interfaces was identified in the ten classes*.dex definitions examined; a native/runtime-provided service may still be injected through Valdi/CompilerIntrinsics.

### Platform-service container and helper gates

`OAIPlatformServices` has typed `_authenticationService`, `_renewableAuthenticationService`, and `_scopedAuthorizationService` members, and its full constructor accepts those service interfaces as separate parameters. Its no-argument constructor initializes the members to null. The inspected `OAIPlatformServices.js` Valdi entry exports no helper logic.

`OAIAuthenticationService.js` in `oai_platform_services.valdimodule` exports three helpers:

- `getAuthenticationService(services)` returns `services.authenticationService` only when `services` is present and `CompilerIntrinsics.isVersionAtLeast(14)`; otherwise it returns undefined.
- `withAuthenticationService(services, authenticationService)` leaves the input unchanged when it is the same value or the runtime gate is unavailable; otherwise it shallow-copies the service object and fills `authenticationService` only when that property is nullish (an existing service is not overwritten).
- `supportsAuthenticationMethod(capabilities, method)` returns `capabilities.browser` for Browser and `capabilities.codex` for Codex; other methods return undefined.

The runtime threshold `14` is distinct from the native credential wrapper's literal `isVersionAtLeast(483)` gate. The platform helper exposes `authenticationService`; the renewable service is consumed separately through `OAINativeCredential` options. The exact native container-to-Valdi options wiring is not established by these helper bodies alone.

### Controller's use of the renewable service

Method-level `OAIAuthenticationController.requestCredential` creates a request-credential context only when both the current `renewableAuthenticationService` and `nativeSessionId` are present. The returned context contains:

- `reportRevoked(accountId, requiresSSO)`, which delegates to `renewableAuthenticationService.clear(nativeSessionId, accountId, requiresSSO, completion)`. It does not itself perform a ChatJS/local credential-store clear. The caller's boolean is passed unchanged as the native clear method's third argument; the DEX method signature names that argument only by type, so the semantic meaning beyond the source caller's `requiresSSO` name is not inferred.
- `accessToken(accountId)`, which delegates to `renewableAuthenticationService.accessToken(nativeSessionId, accountId, completion)` and awaits its credential callback. It checks the current operation generation and then requires the returned credential's `nativeSessionId` to exactly equal the captured ID. A changed native session throws controller `Cancelled` with `The account changed.`; only a matching session's accessToken is returned.

This explains why rejected-credential classification is not equivalent to token renewal itself: the classifier invokes these context functions, and the context delegates to an injected native service with an explicit native-session/account identity pair. Whether native `clear` removes server credentials, locally persisted native credentials, or both; how `onCleared` settles the wrapper promise; whether a renewed access token has DPoP material; and how/when the failed request is retried remain unknown.

### Implementation boundary

No native sign-in, restore, accessToken, clear or callback was invoked. ChatJS does not implement these native interfaces, and a Node host must not fabricate a service response or treat a bearer token as a replacement for native session ownership. Continue only after the actual native provider/caller implementation, secure-store behavior and request retry/SSO/DPoP rules are reconstructed.

## 2026-11-25 — Android authenticated bearer transport, one-shot 401 recovery and request headers

The compiled `OAIBearerAPIService` entry (10,393 bytes; SHA-256 `f0fde9becf87d6efc012ea161b36ad1b50aa452f01142761a3d7ac570ce0d558`) was fully deserialized and method-dumped. It is the authenticated HTTP adapter around an injected client transport; it is not itself the native HTTP implementation.

### Construction and headers

The constructor captures `client`, `accessToken`, `accountId`, `onUnauthorized`, and `requestCredential`. It validates the access token with `isValidOAIBearerToken`. When accountId is not `undefined`, it validates it with `isValidOAIAccountIdentifier`; it does not silently omit an invalid supplied account.

`makeRequestHeaders(accept, accessToken)` builds:

- `Accept: accept`
- `Authorization: Bearer <accessToken>`
- `ChatGPT-Account-Id: <accountId>` only when accountId is not `undefined`.

For JSON request descriptors, `Content-Type: application/json` is added only when `bodyJson !== undefined`; in that case `TextEncoder.encode(bodyJson)` produces the body bytes. `undefined` means no JSON body; a defined value is encoded. An additional `x-openai-use-sheep: 1` header is added only when Valdi runtime is at least 117 **and** the request's `useSheepGateway` option is exactly `true`.

Method dispatch supports GET, POST, PUT, DELETE and PATCH. PATCH uses the transport's `perform(request, 'PATCH', body, headers)` path and fails with `The authenticated HTTP transport does not support PATCH.` when the injected client has no `perform` function. The helper module does not reveal transport wire serialization, redirects, connection pooling or socket behavior.

### Exact authenticated 401 recovery and replay

`performAuthenticated` makes the initial request first. Credential recovery is skipped when the request is in its cancelled state, the response status is not exactly 401, or the response `body` is `undefined`. For an eligible response it decodes the body with `TextDecoder` and calls `OAIRequestCredential.recoverRejectedCredential(requestCredential, accountId, bodyText, allowRenewal)`.

- If recovery returns `undefined`, the original 401 response is returned unchanged.
- If recovery returns an access token, the **same request descriptor** is executed again using that replacement token, and the retry invocation passes `false` for further credential renewal. This is one source-coded credential replay, not an unbounded retry loop.
- `allowRenewal` is calculated by the caller from the Valdi runtime and request option: it is false only when `CompilerIntrinsics.isVersionAtLeast(377)` and `disableAutomaticRetries === true`; otherwise it is true. This flag only gates the `Renew` -> `requestCredential.accessToken(accountId)` action. `Revoked` and `RequiresSSO` continue to call `reportRevoked`, even when renewal is disabled.
- A failed/missing replacement credential does not cause a blind replay. The original response remains the result when the recovery helper resolves without a token.

This ties the earlier classifier/context findings together: a 401 can lead to `reportRevoked`/native clear for revoked or SSO-required credentials, or to native `accessToken(nativeSessionId, accountId, completion)` for an eligible expiry response. The controller's request-credential context verifies operation generation and native session ID equality before yielding the renewed token. The bearer service itself does not know how to authenticate a user or manufacture a token.

### Response and unauthorized notifications

The request task transitions through `Scheduled`, `Pending`, `Cancelling` and `Finished`; it validates origin-relative paths before starting transport, forwards the final response to the supplied `onResponse`, and reports failures through `onFailure`. Its cancellation path attempts transport cancellation and reports a cancellation failure; transport cancellation errors are logged and do not replace the cancel path. The final response callback occurs after the recovery/replay helper has settled.

For ordinary requests, a final 401 triggers the optional `onUnauthorized` callback only when a request-credential context exists. The separate authenticated-image path has its own 401 handling and invokes `onUnauthorized` when the request-credential context is absent. The controller's `reportUnauthorized` closure calls `invalidateExpiredSession` only when its captured request-credential context is absent; the native renewable-context path instead uses `reportRevoked`/`clear`. These are distinct paths, not duplicate unconditional local and native clears.

### Authenticated image path

`loadAuthenticatedImage` accepts only a first-party signed content URL matching the source URL pattern under trusted OpenAI/ChatGPT production/staging hosts and `/backend-api/estuary/content?...`. It sends GET with `Accept: image/*`, requires a successful HTTP status, an `image/` content type, a present non-empty body and a response body no larger than 8,388,608 bytes (8 MiB). Its callbacks carry status/body bytes/content type. This matches the separate upload/download trust boundary and is not a general-purpose arbitrary URL fetcher.

### Private ChatJS helper

Added `src/chatgpt/android-authenticated-request-policy.cjs`, a pure helper for the observed bearer/account header construction, JSON `Content-Type`/UTF-8 body rules, the exact runtime `117` Sheep header gate, the runtime `377` renewal opt-out and the no-recovery/original-response/one-replay decision. Thirteen deterministic tests cover these rules. It is included in lint and the exact distribution allowlist, but is not wired to a transport or auth session; it does not issue requests, invoke `requestCredential`, retry, or call native providers.

The actual `client` transport implementation, authorized live HTTP behavior, native renewal/clear implementation, DPoP proof/header lifecycle, full request-controller cancellation races and end-to-end account-entitled session behavior remain unimplemented in ChatJS.

 
## 2026-11-25 — Android native auth provider DEX census and DPoP signing/refresh call graph

### Native authentication service provider boundary

The supplied ChatGPT-Android.xapk (SHA-256 22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d) was re-opened for this pass; the extracted base APK SHA-256 is 312b1d843d326a4c92f52e34ba394b9899d16cb23b3411c851ffeba7ebce3d3c. All ten base APK DEX files were parsed for implementations, typed references, method descriptors and direct callsites to OAIAuthenticationService, OAIRenewableAuthentication and OAIPlatformServices.

- The only classes directly implementing the two auth-service interfaces in this DEX census are Lxhq0 (OAIAuthenticationService) and Ldjq0 (OAIRenewableAuthentication), the generated Kotlin-function adapters already seen in the earlier bridge pass. Their methods forward to supplied Function0/1/2/3/4 closures; they do not contain a concrete credential provider.
- OAIPlatformServices has typed _authenticationService and _renewableAuthenticationService fields, a no-argument constructor, and a full constructor that accepts both interfaces (among its other typed service dependencies). The no-argument constructor leaves these auth services unset. The direct DEX callsite sweep found the ordinary platform-service builder path but no direct call to the full constructor that supplies the authentication services.
- Other DEX classes hold an OAIPlatformServices reference for unrelated contexts, but that alone does not populate either auth field. A service may still be injected from native/runtime code, reflection, or another host integration point not represented as a direct DEX constructor call.

This is a bounded negative result: no concrete auth-service provider closure was identified in the ten DEX class tables/direct call graph. It is not proof that the app has no provider. The actual CompilerIntrinsics/native host provider and the origin of the two Kotlin closures remain unresolved. Do not synthesize success or add a fake provider to ChatJS.

### DPoP signing key lifecycle

The same DEX sweep found a substantial Android DPoP implementation in the auth/network stack:

- A DPoP signing-key repository uses the alias prefix openai.login.dpop. Credential metadata keys include key_pair_alias and pending_credential_deletion; the repository has explicit persistence/cleanup code and reports “Failed to persist DPoP key pair alias” / SaveCredentialsFailed when alias metadata cannot be saved.
- The backing crypto path references AndroidKeyStore, EC key pairs and the secp256r1 curve. Signing uses SHA256withECDSA. The login-key creation/cleanup path has a separate “Failed to delete a partially generated login key” failure and cleanup for abandoned login signing keys.
- The JWS serializer/model fixes the DPoP JOSE header values to typ=dpop+jwt and alg=ES256. The call graph also includes DPoP proof creation, public-key/JWK conversion and a URL-safe-base64 nonce/lookup-key parser. The complete proof claim set, signing input encoding and all failure branches have not yet been exhaustively reconstructed.
- The HTTP auth plugin uses an access-token object that records whether it has a DPoP signer. It chooses the Authorization scheme between DPoP and Bearer and adds a separate DPoP proof header when the signer is present. This is an Android/Ktor source path, not the separate Valdi OAIBearerAPIService helper's simple bearer header builder.
- Ktor auth reads `WWW-Authenticate`, parses challenge schemes and selects the `DPoP` or `Bearer` provider. The prior attribution of literal `X-Nonce` to this ChatGPT DPoP path is superseded: its only exact DEX reference is the RevenueCat Purchases request builder `Ljz40.b`, not the ChatGPT auth code. The refresh/auth repository includes `refresh_token_reused`, `token_expired` and `invalid_dpop_proof` cases and the OAuth token endpoint `https://auth.openai.com/oauth/token`. Its invalid-proof branch contains a separate timestamp-correction retry path; the network stack also recognizes `dpop_iat_out_of_range`. The generic Ktor parser retains parameterized challenge values, but the recovered DPoP provider callback does not consume the parsed parameter list; actual ChatGPT DPoP server-nonce handling remains unproven.
- A runtime setting named android_dpop_signing_concurrency and internal DPoP signing queue/wait/duration/result dimensions are present. Those are source observations only; ChatJS must not reproduce analytics, telemetry or background reporting.

### What this means for ChatJS

The Android implementation depends on a non-exportable AndroidKeyStore private key and the native/platform session's signer/nonce state. A Node.js client cannot recreate this by generating a random PEM key, copying an Android alias, or treating a bearer token as a DPoP credential. The general Node.js design needs an explicit host signing-key capability with secure, non-exportable key ownership and the exact first-party authorization/session contract; absent that capability it must fail closed. No DPoP key was created, loaded, exported or used in this investigation, and no OAuth request was made.

No DPoP runtime helper was added: the remaining proof claims, nonce lifecycle, token/refresh payload mapping, timestamp-correction conditions, native provider closures and secure-key adapter are not yet complete enough for a correct portable implementation. The current ChatJS runtime still has no authenticated HTTP client, native credential provider, DPoP proof creation, token refresh, credential clear or sign-in implementation.




## Android P-256 ES256 signature serialization — 2026-11-25

### Method-level source trace

The Android DEX method `Ljj51.m(byte[], KeyPair)` signs the supplied bytes with JCA `SHA256withECDSA` and the key pair's private key. The returned JCA signature is ASN.1 DER: the method requires a DER SEQUENCE and parses two DER INTEGER members (`r` and `s`), with explicit failures for a missing sequence or unexpected integer tags. It constructs unsigned `BigInteger(1, bytes)` values, normalizes each component through `Ljj51.n(byte[])` to 32 bytes, and concatenates them into a 64-byte `r || s` signature. This is the fixed-width signature representation expected by JOSE ES256.

A specific caller, `Lyt2.b(String)`, decodes a URL-safe Base64 nonce and requires exactly 32 decoded bytes, obtains the key pair and a public-key JWK, signs the nonce through `Ljj51.m`, and returns the JWK plus URL-safe Base64 signature. This establishes that lookup-key nonce proof path. It does **not** by itself prove that this exact caller is the main DPoP JWT proof builder or establish the complete DPoP request protocol.

### ChatJS implementation and limits

Added private `src/chatgpt/android-es256-signature.cjs` with `normalizeAndroidEs256Signature`. It validates the DER sequence and two INTEGER members, strips leading sign padding, left-pads each scalar to 32 bytes, and returns exactly 64 bytes. Seven deterministic tests cover real P-256 `SHA256withECDSA` signatures verified by Node's P-256 verifier, padding, sign-byte handling, malformed tags/lengths, truncation, overflow, trailing bytes, and invalid input types. The module is included in syntax checks and the distribution archive, but is not exported from the public API.

This helper only converts bytes. It does not generate/import/export keys, sign messages, access AndroidKeyStore or a host keystore, prove hardware-backed key ownership, create a JWK, create a DPoP JWT, process a nonce challenge, authenticate, or perform network requests. Android's native key ownership, full DPoP claims/nonce lifecycle, provider injection, OAuth refresh schema and bounded retry policy remain unresolved. The existing DPoP implementation work therefore remains blocked pending full evidence and legitimate secure host capabilities.




## Android P-256 key lifecycle and public JWK serialization — 2026-11-25

### AndroidKeyStore EC key lifecycle

DEX class `Lchy` contains a dedicated EC keypair path distinct from its generic AES-GCM encryption methods:

- `Lchy.d(alias)` obtains `KeyPairGenerator("EC", "AndroidKeyStore")`, configures `ECGenParameterSpec("secp256r1")` and the `SHA-256` digest, then generates the keypair in AndroidKeyStore.
- `Lchy.f(alias)` loads AndroidKeyStore, reads a `PrivateKeyEntry`, and reconstructs a `KeyPair` from its certificate public key and stored private key; absence returns null.
- `Lchy.e(alias)` loads AndroidKeyStore, checks `containsAlias` and deletes the entry.
- Cross-DEX callsites connect the DPoP manager `Lcn8` to the stored alias path. Its `openai.login.dpop.` prefix and `key_pair_alias` / `pending_credential_deletion` metadata are separate from the generic Valdi Keychain secret key under alias `Valdi`. Do not conflate them.

The related `Lzt2` lookup-key helper first attempts `Lchy.f(alias)` and, when absent, generates with `Lchy.d(alias)`; its delete path calls `Lchy.e(alias)`. `Lqhk0.a()` constructs an alias using the `openai.login.dpop.` prefix and enters that helper. This is method-level call-flow evidence; it does not reveal a portable host signer contract or prove that every DPoP request uses this exact lookup-key path.

### Public P-256 JWK schema

DEX method `Ljj51.p(ECPublicKey)` reads affine X/Y from `ECPublicKey.getW()`, converts each positive `BigInteger` to bytes, normalizes each coordinate to 32 bytes with `Ljj51.n`, then encodes with the URL-safe Base64 encoder without padding (`Ljj51.e`). The resulting `Lfk50` model serializer `Ldk50` fixes the wire fields and constants to `kty: "EC"`, `crv: "P-256"`, `x` and `y`. Its two-string constructor supplies the first two constants and stores the encoded coordinates.

The existing `Lyt2.b(String)` caller uses this public-key model with a URL-safe nonce decoded to exactly 32 bytes, signs that nonce through `Ljj51.m`, and returns the JWK plus Base64URL signature. This is the traced lookup-key nonce proof caller; it is not evidence by itself that the same object is the main DPoP JWT proof builder.

### ChatJS implementation and limits

Added private `src/chatgpt/android-p256-jwk.cjs` with `encodeAndroidP256PublicKeyJwk`. It normalizes signed `BigInteger` coordinate byte arrays to exactly 32 bytes, removes the positive sign byte when present, and emits the exact four-field public JWK model with unpadded Base64URL X/Y. Six deterministic tests include comparison against the JWK exported by a real Node P-256 key, short and sign-padded coordinate cases, invalid coordinate lengths/types, and Base64URL alphabet/padding. The helper is private and does not generate or load keys, sign, access a keystore, assert hardware protection, build a DPoP JWT, authenticate or send requests.

The full first-party proof protocol, exact relationship between lookup-key nonce and the main DPoP challenge flow, OAuth refresh payload, retry bounds, native provider and portable secure non-exportable host signer remain unresolved. No key was generated or accessed during source research; no credentials or network requests were used.


## Android DPoP compact-JWS source trace and private serializer — 2026-11-25

DEX caller `Ln1d1.b` obtains the DPoP key pair, request URL, access-token string, and a clock-derived long with the DPoP clock-offset value applied; it calls `Lyls0.s(KeyPair, "POST", URL, long, accessToken, ...)`. The `jti` originates from 16 bytes filled by `SecureRandom.nextBytes` and converted to the internal `Lfbd1` identifier representation.

Generated Android serializers establish the exact compact-JWS schema/order:

- Header `Lsfx0`: `typ=dpop+jwt`, `alg=ES256`, then `jwk` (EC/P-256 public key).
- Payload `Lvfx0`: `htm`, `htu`, numeric long `iat`, `jti`, `ath`.
- `htm` is fixed to `POST` in this method.
- `ath` is SHA-256 over access-token UTF-8 bytes, encoded as unpadded Base64URL.
- `htu` lowercases scheme/host, removes default HTTPS 443 / HTTP 80 ports, retains non-default ports, defaults empty path to `/`, and excludes query/fragment. The source uses `URL.getPath()`, preserving path spelling.
- Header and payload JSON are encoded as UTF-8, Base64URL encoded without padding, joined by a dot, passed to an ES256 callback, and assembled as three compact-JWS segments. The callback signature is fixed-width 64-byte `r || s`.

The clock input is an instant-derived long plus stored DPoP offset. Its exact unit and rounding remain unresolved; ChatJS treats `iat` as an already-computed integer and does not choose the clock or unit.

Added private `src/chatgpt/android-dpop-jws.cjs`: `canonicalizeAndroidDpopUrl`, `buildAndroidDpopSigningInput`, and `assembleAndroidDpopJws`. Seven tests verify URL normalization, exact field names/order, `ath`, integer preservation, compact assembly, and a real ephemeral P-256 signature check. The module is included in syntax checking and the distribution archive/contract test, but is not exported publicly.

This is serialization only. Callers must supply a real public JWK, authorized timestamp, jti, access token, and 64-byte signature from an explicit host-owned secure non-exportable signer. No key generation/storage, AndroidKeyStore access, secure signer/provider, credential refresh, nonce/challenge state, authentication, or HTTP request is implemented. No DPoP proof was sent to a service and no credentials were used in tests.


## Android DPoP epoch-second clock and timestamp correction — 2026-11-25

The earlier handoff marked the `iat` unit/rounding unresolved. That is superseded by this method-level trace:

- In `Ln1d1.b`, the Android caller obtains the current Instant from `La8l.a()`, reads the epoch-second long field `Lblf0.a`, reads the stored offset field `Lpvx.b`, and performs a 64-bit `add-long`. That sum is passed to `Lyls0.s` as the JWS `iat`.
- In `Lxb8.e`, the invalid-proof timestamp-correction path obtains a server-supplied long, obtains the current Instant and reads its epoch-second field, then performs `serverEpochSeconds - localEpochSeconds` and stores the result in `Lpvx.b`.
- The method logs: “Retrying refresh token request after correcting the DPoP proof timestamp.”
- Therefore `iat = localEpochSeconds + (serverEpochSeconds - localEpochSeconds)`: server-aligned epoch seconds. The offset is in seconds, not milliseconds. The Instant nanosecond field is not used in this calculation.

The exact original server timestamp response/header/error field and the overall retry ceiling remain unresolved; preserve bounded, source-specific retry behavior.

### ChatJS helper

The private `calculateAndroidDpopIssuedAt(localEpochSeconds, serverClockOffsetSeconds)` helper in `android-dpop-jws.cjs` adds integer epoch seconds and offset. It preserves large values with BigInt when needed and rejects fractional/unsafe Number inputs. Two tests cover positive/negative offsets, BigInt/mixed values and invalid numbers. It does not acquire the clock, parse server time, persist offset state or retry requests.

## Android OAuth refresh HTTP Date timestamp source and correction retry — 2026-11-26

The earlier 2026-11-25 note that the original server timestamp field was unknown is superseded by this method-level DEX trace:

- In the OAuth refresh coroutine `Lxb8.g`, the response-exception path reads the HTTP response header named `Date` through `Lxb81.e`.
- `Lk9y.a` parses that string by trying the date-format list initialized by `Lk9y`. The parsed `Ll9a0` value's timestamp field `i` is divided by 1000 and boxed as a `Long`, so the value supplied to the refresh result wrapper is epoch seconds rather than milliseconds.
- `Lxb8.e` passes the failure and refresh-result wrapper to `Lxb8.j`. That classifier gates on response statuses 400, 401 or 403 and inspects structured failure details before returning a usable server timestamp. Its bytecode also compares timestamp values with numeric constants 30 and 300; the complete branch semantics are not treated here as a TTL or as a global retry bound.
- When the classifier returns a timestamp, `Lxb8.e` computes `serverEpochSeconds - localInstantEpochSeconds`, writes that offset to `Lpvx.b`, and invokes `Lxb8.g` one additional time. This establishes one explicit corrective refresh retry in this path, not a general retry policy for every OAuth failure.
- `Lpvx` is a small in-memory holder with an injected clock and a mutable long offset. The holder type is consumed by the AuthApiImpl refresh path and the DPoP proof-building path. No persistence, TTL, or clearing operation appears in the traced holder/call path; the dependency-injection lifetime and reset behavior remain unresolved.

This resolves the server timestamp source and the explicit correction retry count. It does not resolve the full `Lxb8.j` time/error predicate, unrelated refresh retry branches, the holder's lifetime, nonce semantics, the native provider, or the secure host signer. No Android method was executed, no credential/key was used, and ChatJS still does not parse HTTP Date headers, update clock state, retry refresh requests, sign DPoP proofs, or perform authentication.


## Android OAuth refresh timestamp/error classifier — exact DEX predicate — 2026-11-26

The earlier note left the exact `Lxb8.j` 30/300-second and error branches unresolved. The full method `Lxb8.j(Likq0, Lu0p0, Ljb8): Long` has now been inspected in `classes.dex` (method index 59398; code offset 5424192):

1. The request must be the concrete `Lpyy0` OAuth refresh request model. The failure must be a `Ly0p0` response-exception wrapper, and its HTTP status field must be in the static allowlist `{400, 401, 403}` held by `Lxb8.h`.
2. The `Ljb8` timestamp pair must contain both values: `a()` is the `iat` value saved for the outgoing refresh request, and `c()` is the parsed response `Date` value in epoch seconds. The outgoing `iat` is the local `Instant.epochSecond` plus the currently held `Lpvx.b` offset; it is not the raw local wall clock once a correction has already been applied.
3. The classifier proceeds only when either `requestIat - responseDate > 30` seconds or `responseDate - requestIat > 300` seconds. Equivalently, it accepts an `iat` more than 30 seconds ahead of the response Date, or a response Date more than 300 seconds ahead of the request `iat`. Values at or inside the asymmetric inclusive window return `null`. These are eligibility thresholds, not an offset TTL, expiry duration, retry count, or global clock policy.
4. It examines the underlying `ApiServiceError` on the response exception's throwable or its immediate cause. For HTTP 400, `ApiServiceError.c == "invalid_grant"` independently qualifies. Otherwise the static error set `Lxb8.i` is exactly `{refresh_token_reused, token_expired, invalid_dpop_proof}`; the classifier tests both internal string fields `ApiServiceError.c` and `ApiServiceError.b` against that set. If none match, it returns `null`.
5. When the method returns the parsed server timestamp, the caller `Lxb8.e` computes `responseDate - localInstant.epochSecond`, stores the offset in `Lpvx.b`, and invokes `Lxb8.g` once more. That is the one confirmed corrective reattempt for this timestamp-error path.

The JSON field mapping is now source-resolved. In `Lwn00.a`, the parser reads the nested JSON properties `type` and `code` and passes those values as the second and third String arguments to the `ApiServiceError` constructor. The constructor stores those arguments in fields `b` and `c`, respectively: `ApiServiceError.b = type` and `ApiServiceError.c = code`. The exact `invalid_grant` check is therefore against the parsed error code; the other three accepted values can match either the error type or code. Other OAuth refresh retry branches, any DPoP server-nonce path outside the recovered scheme-only Ktor challenge callback, `Lpvx` provider lifetime/reset, native auth provider and a portable secure non-exportable signer remain open. `X-Nonce` is RevenueCat-only and is not part of this ChatGPT DPoP question. This was static bytecode inspection only; no Android code ran, and no credentials, keys or network requests were used. ChatJS still does not implement this classifier, clock state, refresh or DPoP signing.


## Android DPoP authentication-provider and challenge negotiation — 2026-11-26

### Source-backed Ktor auth flow

The Android DEX contains a Ktor authentication integration distinct from the OAuth refresh timestamp-correction coroutine:

- `Lsh8.<clinit>` (classes2.dex, method index 49795) creates `io.ktor.client.plugins.auth.Auth` and registers the `Lxp` `AccessTokenDPoPPlugin` as an authentication provider.
- `Lph8.invokeSuspend` (classes2.dex, method index 43384, code offset 2355612) handles a response without a usable authentication context, reads `WWW-Authenticate` from the response through `Lxb81.d`, passes its value to the challenge parser, obtains each parsed challenge's scheme, and compares it with the literal schemes `DPoP` and `Bearer`. It builds provider/challenge pairs and selects the matching provider. If the header is absent/empty, it produces the source message that token acquisition/refresh cannot proceed without `WWW-Authenticate`.
- `Lrvx.<init>` registers a separate Ktor plugin named `DPoPProofPlugin`. `Ltvx` exposes a dependency-injected `DPoPProofProvider`. `Lqvx.invokeSuspend` checks the DPoP feature/configuration gate and invokes the provider path; `Lsvx.a` is an adapter to the injected callback.
- `Lvp.invokeSuspend` is the access-token provider's request path. It chooses the `Authorization` scheme as `DPoP ` or `Bearer ` based on the token's signing capability and delegates proof creation to `Lfq.a`. `Lfq.a` invokes the source DPoP request-proof builder and attaches the resulting proof through the outgoing request metadata/header path.

This establishes that Android's challenge handler negotiates the authentication scheme and that DPoP proof generation is a separate outgoing-request plugin/provider path. The `WWW-Authenticate` challenge object is paired with the selected provider; the current method trace does not show a DPoP nonce parameter being read from it, persisted, or inserted into the main proof.

### Correction: `X-Nonce` was a RevenueCat header, not established ChatGPT DPoP behavior

The only exact `X-Nonce` string reference found in the inspected DEX is in `Ljz40.b` (classes.dex, method index 27830, code offset 4029292). That method constructs a separate SDK request header map containing `X-Platform`, `X-Platform-Flavor`, `X-Platform-Version`, `X-Client-*`, `X-Observer-Mode-Enabled`, `X-Nonce`, and `X-Post-Params-Hash`, and its same header map contains RevenueCat-specific headers such as `Accept-RC-Element-Encoding` and `application/x-rc-format`. This is the RevenueCat Purchases networking path, not the ChatGPT authentication provider. Prior notes that attributed this literal `X-Nonce` to Android's DPoP challenge flow are corrected and superseded.

The main DPoP compact-JWS serializer previously traced in `Lyls0.s` has the observed payload fields `htm`, `htu`, `iat`, `jti`, and `ath`; no `nonce` claim appears in that serializer. Other `nonce` strings belong to distinct flows, including the OIDC authorization request and the lookup-key nonce proof. The exact DPoP server-nonce wire mechanism, whether carried through another challenge parameter/object or another request path, and how it is bound to a proof remain unverified. Do not implement or document a DPoP nonce header/value until its actual source caller is recovered.

No ChatJS runtime change was made. No Android method was executed, and no credential, key, or network request was used.

## Android Ktor challenge parser parameter model and DPoP callback handoff — 2026-11-26

The earlier provider trace established that `Lph8.invokeSuspend` parses `WWW-Authenticate` and selects `DPoP`/`Bearer`. A further DEX trace in `classes8.dex` now identifies the actual generic Ktor challenge parser and data model:

- `Lzuc0.c(String): ArrayList` (method index 58378, code offset 3520468) parses challenge strings into `Lyuc0` challenge objects. It constructs `Lwuc0` objects for parameterized challenges and `Lxuc0` objects for token68 challenges.
- `Lyuc0` is the base scheme type: its constructor validates and stores the scheme string in field `.a`; `a()` returns that scheme.
- `Lwuc0` extends `Lyuc0`; its constructor stores a `List` of parameter pairs in field `.b` and the parser position in `.c`. Each `Lwub0` pair stores the parameter `name` in `.a` and `value` in `.b`.
- `Lxuc0` also extends `Lyuc0`; it stores the token68 value in `.b`.
- `Lph8.invokeSuspend` receives the parser's challenge objects, reads `Lyuc0.a()` for scheme matching, and pairs the matching `Lxp` provider with the challenge object in `Lyzr0`. The selection logic explicitly compares the scheme against `DPoP` and `Bearer`.
- The selected DPoP branch enters `Lsh8.a`, whose method signature includes a `Lyuc0` challenge argument. Its coroutine continuation `Lqh8`, however, captures only the request/auth context values and does not retain a `Lyuc0`/`Lwuc0` challenge object or its parameter list. The coroutine invokes `Lxp.b` with the request auth context (`Lfyc0`) and continuation. No read of `Lwuc0.b` or a named challenge parameter is present in this recovered DPoP provider callback.

Therefore the generic Ktor parser does preserve parameterized challenge data, but the recovered ChatGPT DPoP provider selection/proof callback only demonstrates scheme selection; it does not demonstrate consumption of challenge parameters or a server nonce. The already-decoded main JWS payload (`htm`, `htu`, `iat`, `jti`, `ath`) has no `nonce` claim. This does not prove that no other DPoP nonce path exists elsewhere in the product; the remaining provider callbacks, other response flows and native integration still require tracing.

The exact `X-Nonce` string remains isolated to `Ljz40.b`, a RevenueCat Purchases header map containing `Accept-RC-Element-Encoding` and `application/x-rc-format`; it is not evidence for the ChatGPT DPoP flow. OIDC authorization nonce and the separate lookup-key nonce signature remain distinct mechanisms.

No ChatJS runtime code was changed, no Android methods were executed and no credentials, tokens, keys or network requests were used.


## Android registered DPoPProofProvider callback and separate DEVICE_KEY challenge proof — 2026-11-26

### Main Ktor DPoP request-proof path

Client construction registers `DPoPProofProvider` under `Ltvx.a`. Two recovered construction paths (`Lf91.invokeSuspend`, classes5 index 13156, and `Lxq8.invokeSuspend`, classes7 index 60056) construct `Lkl40`, wrap it with `Lsvx`, and register the callback. `Lsvx.a` delegates to the captured `Lkl40` function.

`Lkl40.invokeSuspend` (classes6 index 21717, offset 4109164) constructs and invokes an `Lke` coroutine with the DPoP key holder `Lyt2`, request descriptor `Lpqc1`, and session/clock context `Lb6p0`. `Lke.invokeSuspend` (classes7 index 27595, offset 2157348) reads `Lyt2.b` as the `java.security.KeyPair`, reads `Instant.epochSecond`, adds the held `Lpvx.b` server-minus-local offset, constructs a URL from `Lpqc1.h`, and calls the main `Lyls0.s` compact-JWS builder with the key pair, URL, adjusted timestamp and token/proof inputs.

This is the concrete main Ktor DPoPProofProvider path. It consumes the key pair directly and does not call `Lyt2.b(String)`. The `Lyls0.s` serializer previously decoded from DEX emits main JWS fields `htm`, `htu`, `iat`, `jti`, and `ath`; no `nonce` claim appears in that serializer.

### Separate DEVICE_KEY lookup-key authentication challenge

A direct callsite census across all ten DEX files finds only one caller of `Lyt2.b(String)`: `Lsk00.a` (classes7 method index 47413). This is a distinct challenge-signing workflow:

- `Lqk00` is a generated response model whose serializer `Llk00` defines top-level JSON properties `type`, `purpose`, and `data`. `Lqk00.a()` returns `type`; the consumer requires the literal `DEVICE_KEY` or raises `Invalid lookup-key authentication challenge`.
- The nested `data` model `Lpk00`, serialized by `Lnk00`, has JSON properties `challengeId`, `challenge`, `purpose`, `issuedAt`, `expiresAt`, and `signature`. `Lsk00` validates this model and calls `Lyt2.b(String)` with the challenge string.
- The helper checks that the Base64URL challenge decodes to 32 bytes, signs those challenge bytes with the same stored P-256 key pair, and returns public JWK plus unpadded Base64URL signature material. `Lsk00.a` packages this as a separate `Livk0` result; its caller is `Lrk00.invokeSuspend` in the broader `Lge70` app coroutine path.

The two workflows share the `Lyt2` key holder/key pair but have different proof inputs and outputs: the registered Ktor `DPoPProofProvider` builds the ordinary compact DPoP JWT from request method/URL, issued-at time, jti and access-token hash; the separate `DEVICE_KEY` lookup-key signer signs a server-provided challenge string and returns a JWK/signature response. Do not treat the lookup-key challenge as the main DPoP nonce or add its challenge value to the DPoP JWT.

This resolves the implementation path for the registered DPoPProofProvider and identifies the lookup-key challenge as a separate key-proof workflow. It does not prove that no other DPoP nonce mechanism exists in other provider/native/response paths. Search for any separate nonce-bearing response and provider integration before claiming the product does not use a server nonce. Static DEX inspection only; no Android code executed and no credentials, keys or network requests were used. No ChatJS runtime change was made.


## Android main DPoP signer result handling and retry-marker evidence — 2026-11-26

### One signing attempt per provider invocation

The registered Ktor DPoP provider path `Lkl40` → `Lke` → `Lyls0.s` invokes the signing helper through `Ln1d1.b`. The result coroutine `Lgmq0.invokeSuspend` (classes5 method 16392, code offset 6810408) calls `Ln1d1.b` once for that invocation and wraps either the returned proof in `Lavb1` success state or the caught exception in the `Lbvb1` error hierarchy. It returns a `Lovx` result with a state, an integer result/status value and a nullable integer field. This method does not loop or invoke the proof builder a second time after a signer failure.

The outer `Lfq.a` access-token authenticator (classes2 method 18746, code offset 1881912) obtains the concurrency permit, invokes the signer coroutine once, then branches on `Lovx` state. For a `Lavb1` success it combines the access token with the `DPoP ` authorization scheme and resulting proof. For an error state it unwraps the throwable, logs the DPoP proof-creation failure through the diagnostics path, maps known platform exceptions (`UserNotAuthenticatedException`, `SignatureException`, `InvalidKeyException`, `KeyPermanentlyInvalidatedException`, and `DPoPSigningKeyUnavailableException` with its numeric code) into the failure metadata, releases the concurrency permit, and returns a credentials-acquisition failure. No signer retry loop or second call to `Ln1d1.b` is present in this method.

### DPoPClockRetryAttempted request attribute

`Lyp.<clinit>` (classes2 method 62733) creates an internal Ktor `AttributeKey` named `DPoPClockRetryAttempted`. The only app-DEX read of `Lyp.b` found in the ten DEX files is `Lxp.b` (classes2 method 60744). It reads this key from the request's attribute map; when the attribute is already present, the provider acquisition method returns early instead of re-entering `Lxp.c`. This is an in-request recursion/retry guard at the Ktor auth-provider boundary, not proof that the signer itself retries.

A complete callsite/reference scan found no in-package code that writes `Lyp.b` or sets this attribute. Consequently, the exact producer and the higher-level action that may set it are not recovered from the supplied DEX. The name alone does not prove that timestamp correction is performed by the DPoP proof plugin, nor does it identify a retry trigger, HTTP status, maximum attempt count, or retry policy. Keep it separate from the verified OAuth refresh timestamp correction in `Lxb8.e`, which uses HTTP `Date`, `Lxb8.j` and exactly one explicit second `Lxb8.g` call.

### DPoP metadata and header markers are instrumentation, not protocol behavior

`RequestDPoPMetadata` is declared by `Lwvx.<clinit>` (classes2 method 58899). `Lwvx.a(Luvx)` serializes DPoP diagnostic state into span attributes including `dpop_signing_attempted`, `dpop_signing_result`, `dpop_failure_reason`, `dpop_first_failure_reason`, `dpop_retry_outcome`, `dpop_first_keystore_error_code`, `dpop_signing_duration_ms`, `dpop_signing_queue_wait_ms`, `dpop_signing_concurrency_limit`, `dpop_header_present`, and `authorization_scheme`. The metadata is merged into OpenTelemetry request-span attributes through the request tracing/observability path. These values are telemetry/diagnostics and are not required request fields or authority to add tracking to ChatJS; none of this instrumentation is to be copied.

The exact literal `OpenAI-Device-Key` reference in `Lil31.g` (classes2 method 24998) belongs to Sentry's OkHttp request/response event recorder. The recorder copies an allowlist of headers plus `DPoP` and `OpenAI-Device-Key` into diagnostic events. It does not construct or emit the header. Neither `OpenAI-Device-Key` nor `RequestDPoPMetadata` appears in the 111 decompressed Android Valdi modules in the supplied XAPK. These observations are not evidence of a main ChatGPT protocol header or capability.

**Current boundary:** the registered DPoP provider's one-attempt signing result handling and an internal Ktor re-entry guard are traced, but the guard's writer/upstream retry caller remains unknown. Other challenge or timestamp-recovery flows may exist outside these methods. ChatJS still has no signer, native provider, DPoP request or retry implementation. This was static DEX analysis only; no Android code executed and no credential, key or network operation was used.
