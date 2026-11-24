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
- Follow-up: explicitly deferred at the owner's request; do not resume unless asked.

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

Lau31 constructs a logger tagged SessionManager and launches the Lis31 startup coroutine. The coroutine has explicit unsupported-guest logout and unauthenticated-session refresh error paths. Lau31.F is a post-logout anonymous-start attempt that queries the current auth/session provider before calling the Lau31.E transition and logs a dedicated failure if the attempt fails. The final guest create/refresh network route and payload were not reconstructed.

Lgv31 tags itself SessionStorageCleanupImpl. Its coroutine resolves and validates the sessions directory, reads user_id and pending_credential_deletion metadata, recognizes guest-prefixed entries, validates guest IDs as single path segments, uses retired session-related sets and has a dedicated retired-session-storage deletion error path. It separately removes legacy account DB/preferences. Lxzp0 also constructs sessions/guest-<id> storage paths via the app file-system layer; the full ID-generation and retention policy remain open.

The earlier anonymous URL constants were re-attributed: Lx4k0 logs LocationCookieInitializer; Lcl00 maps remote user settings locationPermissionCookieSettings and invokes the location-cookie initializer, which uses the constants and a lower-level Lgnw request interface. These paths are not proven to be the guest message composer routes. This distinction has been added to the Android findings/open questions. Static analysis only; no live session request, token creation, or ChatJS integration was attempted.


## 2026-11-24 — Android post-logout transition and guest path helper

A further public-XAPK DEX pass narrowed the post-logout guest flow. Lau31.F reads auth/session state through Lof70.G, constructs the transition input and invokes Lau31.E. The inspected Lau31.E body calls the Lv2f0 initial-session resolver and Lvv31 session store/DataStore methods to read, update and checkpoint session metadata, along with SessionManager state transitions. Lau31.l reads the serialized Lov31 record from the session DataStore and constructs a Lzk8 selection/context record from opaque strings, a boolean and a set. No HTTP client/request builder/anonymous session creation URL was identified in these coroutine bodies. This confirms a local lifecycle/state transition, not the missing service-side creation/refresh operation.

Lxzp0.invoke constructs a path below sessions/ with guest- prefix, joining two values from Lks31 and a two-string Lxk8 record with a hyphen, then passes it through the app FileSystem/session-storage helper. The values semantics, generation, entropy and server origin remain unknown. Ld1d1.b checks a candidate path against filesystem and local credential/session ownership state. Do not call the guest path a UUID or infer server token semantics.

A UI method references AnonymousSessionLoading; a separate UI/string model contains Continue as Guest. This confirms the visible guest entry/loading affordance exists in the public APK, but the callback-to-SessionManager linkage was not traced. Static analysis only; no live API call or ChatJS integration was attempted.
