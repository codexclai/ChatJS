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
