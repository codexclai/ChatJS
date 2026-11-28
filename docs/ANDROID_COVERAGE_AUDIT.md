# Android Feature Coverage Audit — Subagent 3

**Identity:** ChatJS Subagent 3 — Android Feature Coverage Auditor  
**Audit date:** 2026-11-28  
**Repository:** `codexclai/ChatJS`, existing `main` branch  
**Scope:** ChatGPT Android non-Work client only. Android Work, Windows/Desktop and Codex CLI remain parked sequencing work, not removed product scope.

## Executive finding

**Verified overall Android client support: no complete Android ChatGPT workflow is implemented.** The runtime remains foundation-only. ChatJS has a real generic SSE framing primitive and several real, deterministic Android-specific private helpers, but no Android-authenticated or guest HTTP client, account/session runtime, conversation send/receive integration, product event stream, or real file transfer. The Android helpers are not exposed as public ChatJS feature APIs.

Do not convert the number of source modules, DEX traces, schema decoders, or passing unit tests into a percentage of the Android product implemented. Those measure research and isolated helper coverage, not usable client workflows.

Evidence levels used below:

- **Discovered:** the supplied Android 1.2026.321 package contains the module/model/route or feature evidence.
- **Traced:** the relevant call graph, serializer, state transition, or request construction has been followed to the documented level. A string or route candidate alone is not a traced workflow.
- **Implemented:** real Node.js production code exists. “Private helper” is not a public product API or complete workflow.
- **Tests:** test code exists for the helper/primitive; passing status is reported only for the exact tested commit.
- **E2E:** authorized interaction with the real service/account and relevant host capability. No Android ChatJS feature has passed this gate.

## Repository and verification snapshot

- Live repository: `codexclai/ChatJS`; default and only branch observed: `main`.
- No open repository issues or pull requests were returned by the GitHub inspection.
- Latest code-bearing commit during the initial audit pass: `14ad8aba3e2d45b5a600944c9f20bf3c64db7509` (2026-11-28), following the LoginAuth response-envelope implementation and syntax/format corrections. Subsequent main commits added Subagent 4's bearer-header validation parity fix (`963c3260`, `a97560a9`) and Subagent 1's manifest evidence (`2d3a6b03`).
- Android source package: ChatGPT 1.2026.321, version code 2632129; supplied XAPK contains ten base-APK DEX files and 111 Valdi modules. This is static source evidence; no app/account/session code was run.
- LoginAuth envelope code-bearing main snapshot `14ad8aba3e2d45b5a600944c9f20bf3c64db7509` passed GitHub CI run **46162580007** and CodeQL run **46162580030**. The CI job's `npm run check` passed; the full suite reported **166 tests, 166 passed, 0 failed**. The archive build created `dist/ChatJS.tar.gz` with 19 module files; extraction and installed CommonJS/ESM smoke-test steps completed successfully. CodeQL's JavaScript analysis job completed successfully.
- CI artifact **15269598067** (38,593 bytes) has digest `sha256:ddbf04e2152233da19793d763b1ffe0f9fc421e092f5512088386a242a1509b0`.
- After that green CI, Subagent 4 changed `android-authenticated-request-policy.cjs` to reuse the source-backed Android bearer-token/account-ID validators and added a CRLF regression test. The latest code-bearing commit is now `a97560a9aa54f4f7c1a122d5cdaf4d0dd7dbe25c` (main head `2d3a6b03` adds manifest documentation). No CI workflow/status was returned for `a97560a9`; **the Subagent 4 request-policy change is not yet verified by CI**. The policy test file now has 14 cases. The 166-test green result applies to `14ad8aba`, not the latest code.
- Subagent 3's audit documentation commits are also on main. No subsequent CI result for the final documentation head was observed.
- A local checkout was not available. A shell clone attempt failed because github.com could not be resolved from the container. No local `npm run check` was claimed or fabricated.
- GitHub inspection showed only `main`; no branch or worktree was created.

## Coverage matrix

| Android area | Source discovered | Workflow traced | ChatJS implementation | Tests / passing evidence | Authorized E2E | Confidence and remaining boundary |
| --- | --- | --- | --- | --- | --- | --- |
| Client architecture / Valdi and native boundary | Yes: 111 Valdi modules, ten DEX files | Partial; selected sender, auth, upload, integrity and LoginAuth paths | No Android client runtime | Static helper tests only; no architecture integration tests | No | High for package inventory; medium for complete client graph. Many module groups and dynamic/native boundaries remain. |
| Conversation creation and messaging | Yes: direct sender, generated conversation API, event/response processors | Authenticated send construction, worker handoff/resume and event processing substantially traced | No conversation API or request transport | Generic SSE tests do not test ChatGPT messages | No | High for recovered static slices; remaining event variants, history synchronization, interruption/recovery and live contract unknown. |
| Payload construction / serialization | Yes: model catalog, chat requirements, account check, LoginAuth DTOs, conversation send DTOs | Several exact generated schemas and request descriptors traced | Private model/requirements, account-check, credential-policy and LoginAuth decoders/builders; no integrated request serializer | Focused helper tests exist; the current 32-case LoginAuth file has not been re-run in CI | No | High for the individually decoded DTOs; full send/guest payload and some LoginAuth variants remain open. |
| Networking / HTTP | Yes: generated clients, bearer service, Ktor and integrity providers | Selected authenticated request, refresh, challenge and retry paths traced | No ChatGPT HTTP transport/client | No Android network integration tests | No | High for selected source paths; no actual ChatJS request/response cycle. |
| SSE / streaming | Yes: direct stream worker, message event processor, resume protocol | Worker messages, callbacks, prepared-content deltas, offsets and three-handoff ceiling traced | Generic bounded/cancellable SSE framing parser only | Generic parser has deterministic tests and passed in prior CI; no product event decoder or stream transport | No | High for the generic parser; no proof it interoperates with Android ChatGPT event payloads. |
| Authenticated sign-in / LoginAuth | Yes: account authorize, first-party authorize/next, LoginAuth response union and step DTOs | Request split, DEVICE_KEY proof submission body, response union and multiple payload serializers traced | Private schema validators only; no login/session operation | Nested payload validators tested; current union tests are pending CI | No | High for traced request/DTO shapes. Provider injection, real transport, token bridge, full response variants and interactive flow remain incomplete. |
| Account/session refresh and DPoP | Yes: AuthSession, credential store, AndroidKeyStore, Ktor DPoP provider and OAuth refresh | Main proof signer call graph, refresh request, timestamp correction and bounded clock retry traced | Credential-record codec, request policy, DER signature formatting, P-256 JWK and DPoP compact-JWS assembly helpers | Private helper tests exist; no signer/session/refresh integration tests | No | High for mapped source slices. Native provider injection, host secure signer, key continuity, encrypted durable storage, full renewal/replay and HTTP remain absent. |
| Account switching / entitlements | Yes: account-check map, access/deactivation and plan fields | Initial account filtering/order/default selection traced | Private account-check decoder and selection helper | Focused helper tests exist; prior CI includes the relevant earlier suite | No | High for helper logic; no live account list, switch, permission or entitlement refresh. |
| Accountless / guest session | Yes: session state enum, serialized metadata, SessionManager, guest storage cleanup and welcome configuration | Local startup/logout/refresh and selected UI-to-local-state paths traced | No guest session runtime | No guest protocol tests | No | High for local state evidence; actual guest create/refresh HTTP and guest composer routes remain unknown. Anonymous route constants are not proven guest composer endpoints. |
| Attachments / file uploads | Yes: picker, reservation, Estuary multipart, signed-storage PUT and process-upload paths | Selection, reservation, transfer branch, destination and process request traced | Private side-effect-free attachment policy helper | Helper tests exist; no live transfer tests | No | High for traced upload stages; actual network transfer, downloads, indexing, expiry, retry, cancellation and cleanup are missing. |
| Images / video / voice / audio | Some modules and route-like markers discovered | Not comprehensively traced | No product APIs or media pipeline | No product tests | No | Low-to-medium depending on module; host media facilities must remain optional. |
| Tools / search / connectors / plugins | Some module groups and route-like candidates discovered | Not comprehensively traced | No Android tool/plugin execution API | No product tests | No | Low; markers are not proof of callable workflows or entitlement. |
| Projects / instructions / context / memory / personalization | Module and route candidates in source inventory | Partial discovery only; no complete workflow trace | No product APIs | No product tests | No | Low-to-medium; exact state, routes, precedence, retention and service behavior remain open. |
| Local state / preferences / persistence | Yes: guest session metadata/cleanup, welcome-language preference, Statsig cache/config and auth storage types | Selected local state transitions and preference writer traced | Credential record codec only; no secure persistent store or preference system | Codec tests exist; no persistence/restart tests | No | High for selected local structures; key/crypto/durability, lifecycle and effective config cache semantics remain open. |
| Errors / retries / cancellation | Yes: API error models, OAuth refresh correction, Ktor retry gates and stream cancellation paths | Several source-specific bounded retry/error paths traced | Rejected-credential classifier, request policy and generic SSE abort/error handling | Helper/parser tests exist; no product retry or cancellation integration tests | No | High for mapped predicates; end-to-end replay ceiling, idempotency, callback cancellation and complete normalization remain open. |
| Device integrity / Sentinel / challenge providers | Yes: requirements routing, native Play Integrity and BodyIntegrityPlugin | Challenge routing and internal native exchange mapped; public package preflight blocks the inspected native worker | No attestation, integrity or Sentinel provider | No provider tests | No | High for the package guard and inspected internal flow; public-build provider availability is unresolved. Do not spoof package identity or bypass first-party integrity. |
| Lifecycle / concurrency / resource cleanup | Yes: source coroutine/session/worker structures; generic parser | Selected local mutex, stream handoff and cleanup paths traced | Foundation client close lifecycle and generic parser cleanup only | Foundation/parser tests pass on the last verified CI snapshot | No | Partial. No integrated client concurrency, socket lifecycle, backpressure, restart or soak evidence. |

## What is actually implemented

These are real code artifacts, but they are internal helpers and do not amount to Android client support:

1. Generic bounded, incremental, cancellable SSE framing.
2. Android model-catalog and chat-requirements request descriptors and response-schema helpers.
3. Android first-party token/account/header/origin/path validation predicates.
4. Account-check schema decoding and initial account-selection policy helper.
5. Credential-record codec and rejected-credential recovery classifier.
6. Authenticated-request header/body/replay policy helper.
7. Android DER ECDSA to 64-byte ES256 signature formatting.
8. P-256 public JWK serialization.
9. Android DPoP signing-input and compact-JWS assembly helpers, with caller-supplied signature and clock inputs only.
10. LoginAuth Lql8 error decoder and nested validators for about_you, email OTP, contact verification, create-account password, login password, external URL, token exchange, passkey login and workspace.
11. A current-main LoginAuth common response-envelope decoder for 15 explicit discriminator strings. Nine payload variants use the decoded validators above; six known payloads remain opaque objects. The final Lmiy fallback is deliberately not guessed.

The LoginAuth outer decoder is the newest work and is **not CI-verified on current main**. None of these helpers logs in, signs with an AndroidKeyStore key, persists encrypted credentials, performs an HTTP request, sends a message, or uploads a file.

## Critical gaps and defects

### P0 — no functioning Android product workflow

- No first-party HTTP transport, request lifecycle, authenticated conversation sender, guest sender, ChatGPT response parser or product-specific streaming client exists.
- No public Android feature API is exposed from the package entry points. The Android helpers are private implementation files.
- No authorized service-level Android account or guest E2E verification exists.

### P0 — authentication and secure session lifecycle

- Native `OAIAuthenticationService` / provider injection remains unresolved.
- AndroidKeyStore key creation/reload and real host signer integration are absent. DPoP helpers format a supplied signature; they do not sign.
- Secure encrypted credential persistence, refresh-token lifecycle, forced renewal, invalidation, SSO and account switching are not implemented.
- LoginAuth request transport, first-party integrity/header behavior and complete typed response handling are not implemented.
- The six opaque LoginAuth payloads and final fallback discriminator remain unresolved.

### P0 — accountless guest and conversation protocols

- Exact guest create/refresh HTTP request and guest composer prepare/send routes remain unknown.
- Local SessionManager state and LocationCookieInitializer anonymous route constants must not be mistaken for guest conversation HTTP.
- Authenticated conversation send and stream handling have not been ported into ChatJS despite substantial static source reconstruction.

### P1 — upload and media

- Actual upload reservation, signed-storage transfer, process-upload, download and indexing are absent.
- Expiry, retry, cancellation and cleanup behavior for file transfers remain to be implemented and tested.
- Voice, video, image, gallery and other media workflows are not comprehensively reconstructed.

### P1 — broader Android feature inventory

- Projects, instructions, context, memory/personalization, search, tools, connectors and plugin workflows require module-by-module tracing and implementation.
- Route-like strings and module names are discovery leads, not evidence that a workflow is available or that an account is entitled to it.

### P1 — compatibility and verification

- Current-main LoginAuth envelope changes have no verified CI result yet. The last passing full CI is for the preceding 164-test snapshot.
- ESM and CommonJS runtime smoke tests passed on the earlier snapshot. A dedicated TypeScript consumer compile matrix, especially CommonJS `import = require` usage, was not evidenced; the shared declaration file is ESM-style. Treat this as a compatibility test gap, not a confirmed runtime defect.
- Generic SSE abort races a pending iterator read and then awaits iterator cleanup. Cooperative async iterators are covered, but arbitrary non-cooperative sources may not stop promptly; cancellation guarantees should be documented and tested against deliberately stalled iterators.
- The DPoP signing-input helper currently fixes `htm` to `POST`. It must remain scoped to the traced POST use unless source evidence and API changes establish other method support.

## Fake behavior, protocol assumptions, security and privacy review

No fake ChatGPT responses, canned conversation output, fabricated capability registry, or speculative live network implementation was found in the inspected foundation. The reviewed Android helpers are deterministic local transformations/validators and do not themselves contact ChatGPT. The public client remains foundation-only.

The inspected runtime contains no evidence of telemetry, hidden uploads, phone-home, analytics or unsolicited ChatGPT requests. Android Statsig/SDK exposure, analytics, Sentry and telemetry-only markers must remain excluded unless a functional non-telemetry configuration behavior is independently required and source-verified.

Do not implement the inspected native Play Integrity exchange as a public-build capability: the source trace shows a package-name preflight for `com.openai.chatgpt.internal`, while the supplied public app package is `com.openai.chatgpt`. No spoofing, bypass or invented fallback is acceptable. Keep account credentials, tokens, private keys, cookies and session contents out of fixtures, logs, docs and Git.

## Main coordinator's recommended next actions

1. **Verify current main after Subagent 4's bearer validation change.** Run full `npm run check`, inspect the archive and installed ESM/CommonJS smoke tests, and run CodeQL on `a97560a9` / current main. The prior `14ad8aba` snapshot passed 166/166 tests, but does not include this later request-policy change.
2. Finish the LoginAuth envelope audit: trace the six opaque payload serializers and the final fallback; validate root/payload errors, nullability and exact dispatch against generated serializers; add negative tests and verify CI.
3. Resolve native auth provider injection and the legitimate host secure-signer/storage interface before attempting account login or DPoP refresh implementation.
4. Implement a real source-backed authenticated transport/session slice, with explicit user intent, secret-safe storage, bounded cancellation and authorized account E2E tests.
5. Trace guest create/refresh and guest composer prepare/send independently from local SessionManager and location-cookie setup; keep it blocked until exact request evidence exists.
6. Port the recovered conversation sender, product event decoder, resume/handoff behavior and history synchronization; add deterministic contract tests and authorized service tests.
7. Implement actual upload/download only after the full source-backed reservation, transfer, processing, expiry, retry and cleanup contracts are complete.
8. Continue the remaining Android non-Work feature inventory. Keep Work, Windows/Desktop and Codex CLI parked until the Android non-Work completion gate is genuinely met.
9. Add TypeScript ESM and CommonJS consumer fixtures, plus cancellation/concurrency/restart/soak tests as each real workflow is added.
10. Keep the capability matrix honest: promote a feature only after source trace, production implementation, tests, public API/types, security review and relevant E2E evidence all pass.

## Audit limitations

This is a static source/code/repository audit, not an Android device run or an authorized ChatGPT account test. No login, token refresh, Play Integrity exchange, private-key operation, user-data request or real upload was attempted. The audit does not claim that every Android module or every possible account-dependent feature has been exhaustively decoded. All unverified paths remain explicitly unknown or incomplete.


## Audit addendum — parallel Android updates after initial review — 2026-11-28

### Subagent 4 bearer-header validation parity

Subagent 4 found that `buildAndroidAuthenticatedRequestHeaders` accepted any string token/account ID, while the Android `OAIBearerAPIService` constructor validates both with `isValidOAIBearerToken` and `isValidOAIAccountIdentifier`. The helper now reuses those source-backed predicates and rejects malformed values before constructing headers. The policy test file has 14 test cases, including a CRLF injection case. This remains a pure local helper, not an HTTP transport. Code change/test commits `963c3260` and `a97560a9` post-date the green 166-test CI on `14ad8aba`; current code requires fresh CI/CodeQL.

### Subagent 1 Android package manifest investigation

The new `ANDROID_MANIFEST_FINDINGS.md` statically records the public APK manifest: 87 permission declarations (43 Health Connect permissions), nine declared hardware/graphics features and 44 first-party application components (12 exported). These are package declarations, not proof of runtime grants, service calls, entitlement or ChatJS capability. The findings explicitly do not impose Android permissions or hardware assumptions on portable ChatJS.
