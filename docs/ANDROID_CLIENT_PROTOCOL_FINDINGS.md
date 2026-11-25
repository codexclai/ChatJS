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

Important package guard: before the native operation, the implementation checks that the Android Context package name is exactly com.openai.chatgpt.internal; on mismatch it throws: Install the official-debug-signed internal Android application to verify this device. The supplied public XAPK manifest identifies com.openai.chatgpt, not .internal. Therefore the code is present in this package's DEX, but this scan does not establish that this native implementation is callable/selected in the public Play-distributed app. Do not remove or imitate this package guard. Its wiring/selection conditions require further reconstruction.

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

**Not established:** complete decompiled control flow; generated Valdi client's exact chat-requirements request/response schema; exact mapping of every retryable status to retry/refresh/terminal behavior and attempt ceilings; DeviceRateLimits record schema/scope/retention and its relationship to the 300-second cooldown marker; cooldown marker persistence across process restart; exact allowed-cookie path matching and cookie lifetime/deletion semantics; device UUID lifetime/rotation/deletion; why the internal-only package guard exists in this package snapshot; why its user-agent version differs from the XAPK version; Valdi-side validation/application ordering for returned headers; app_attest_challenge semantics; Windows equivalent; or any authorized live-account behavior. The DEX inspection used a purpose-built partial bytecode/reference scanner and selected method disassembly, not a full decompiler or complete call graph. Do not treat this as a complete reconstruction or an implemented ChatJS provider.

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
