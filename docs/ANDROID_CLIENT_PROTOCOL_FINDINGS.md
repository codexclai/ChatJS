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
