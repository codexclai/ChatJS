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
