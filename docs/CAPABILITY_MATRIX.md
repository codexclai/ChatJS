# ChatJS Capability Matrix

**Current implementation status: foundation only.** The product goal is one general-purpose Node.js module consolidating the actual client-side capabilities of ChatGPT mobile, ChatGPT desktop and Codex CLI. Their protocols remain distinct internally. Source material and intended compatibility are not themselves implementation.

## Status definitions

- **Implemented:** working code, docs, and repeatable tests.
- **Partial:** a defined subset exists; gaps are explicit.
- **Research:** package/client behavior or host mechanism is being examined.
- **Planned:** intended but not started.
- **Blocked:** a necessary engine, toolchain, host interface, or test environment is unavailable.

## Current foundation

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| CommonJS and ESM entry points | Implemented | Automated tests load both |
| Client factory/lifecycle | Partial | Construction, status, assert-open, close |
| Error base type | Partial | Foundation validation/closed-client errors |
| TypeScript declarations | Partial | Foundation API plus generic SSE parser |
| Generic Server-Sent Events framing | Implemented | Async byte-iterable parser, UTF-8/chunk boundaries, event fields, limits, abort and iterator cleanup; does not connect to ChatGPT or decode a product-specific event schema |
| Android generated model-catalog and chat-requirements schema helpers | Implemented (internal helper only) | Exact GET/POST descriptors, generated nested response validation, undefined-vs-null behavior, extra-field pass-through and fail-closed default requirements-header decision; no network, auth or device attestation |
| Android generated account-check schema and selection helpers | Implemented (internal helper only) | Exact GET descriptor; `accounts` dictionary/map decoder with nested optional/nullable fields; ordered access/deactivation filtering, deduplication and initial-account preference; no network, credentials, session or account-switch side effects |
| Android persisted credential record codec | Implemented (internal helper only) | Version-1 access-token/native-session record decode/build, optional account/session snapshot validation and JWT `exp` metadata; no encryption, filesystem, native keystore or persistence |
| Android rejected-credential recovery classifier | Implemented (internal helper only) | Generated ErrorEnvelope decoder and exact None/Renew/Revoked/RequiresSSO precedence; explicit renewal permission plan only, no invalidation, token access, refresh or replay |
| Android authenticated request policy | Implemented (internal helper only) | Bearer/account headers, JSON body header/encoding rules, Sheep/runtime gates and one-shot 401 replay decision; no HTTP transport, native token retrieval or actual retry |
| Android first-party authentication input/path validators | Implemented (internal helper only) | Method-decoded bearer/account-ID/header/origin regex flags and origin-relative path/service path gates; no credentials, secure storage, request transport or account selection |
| No telemetry in current foundation | Verified for inspected source | Re-review with every network-capable change |

## Actual ChatGPT client integration

| Capability | Status | Evidence / acceptance boundary |
| --- | --- | --- |
| Client request/response construction | Research (partial internal helpers) | Android model-catalog and chat-requirements route descriptors/typed response decoders have tested internal helpers; conversation send body, authenticated transport, session lifecycle and live server behavior remain unimplemented |
| Connection and transport | Research (first-pass module evidence) | Android bearer-service request/recovery methods traced and pure header/replay policy helper tested; actual authenticated HTTP transport, native renewal and account/session runtime behavior remain unimplemented. WebSocket integration, SSE clients and stream processors were observed but are not implemented |
| Authenticated account session | Research (validation/schema subset implemented) | Private validators and account-check map/selection helper are tested. The helper reproduces initial access filtering/order/default selection only; login, controller lifecycle, native credentials, secure persistence, native refresh/SSO/DPoP, full account switching and authenticated HTTP remain unimplemented; private request-policy helpers do not issue requests or invoke renewal |
| Accountless / anonymous guest session | Research | Android method-level DEX traces the Unauthenticated/AnonymousSession/LoggedInSession state enum, nine-field session metadata, SessionManager startup/logout/refresh paths, guest storage/retirement cleanup, a global backend-anon base URL/path family and an anonymous-session-labelled local profile descriptor. Exact guest create/refresh network schema and composer send routes remain open. Lof70 is Statsig/experimentation, not auth/session; the unauthenticated refresh path inspected is local state transition. A separate AuthSession DPoP/token refresh path is credential-backed and not proven guest creation; observed /backend-anon/f/conversation constants belong to LocationCookieInitializer during location-cookie setup. "Continue as Guest" is a Shop UI string, not ChatGPT |
| Windows desktop accountless/guest Work | Unknown | Current inspection did not establish a ChatGPT guest-session path in the Windows Work client |
| Sentinel and device integrity | Research (current Android source scan) | Separate requirements/device-integrity providers and Android native Play Integrity exchange observed; challenge schemas and cross-host provider behavior remain unresolved |
| Chat conversations and streaming | Planned | Use actual ChatGPT client behavior; no canned/fake responses |
| Files and attachments | Research/Planned | Trace supported client payloads and real Node.js processing |
| Projects/instructions/context | Research/Planned | Reproduce relevant client models and state behavior |
| Voice/image/video | Research/Planned | Use actual client behavior where evidenced; optional host/device facilities |
| Windows desktop Work Local | Research | Owner-confirmed local execution surface; actual desktop client/native-host call graph remains to be reconstructed; no CLI/app-server dependency |
| Android Work Cloud | Research | Owner-confirmed cloud execution surface; Codex-related Android request paths observed, full Work protocol not yet reconstructed |
| Codex CLI client workflows | Research / Planned | Codex CLI's ChatGPT-backed coding-client capabilities are in-scope for native Node.js implementation inside ChatJS; CodexCLI.zip is the pinned source reference, not a required executable/app-server runtime |
| Search/tools/ChatGPT Work/Codex CLI workflows | Research/Planned | Trace each source/client surface independently and implement tested Node.js transports and local host operations under one ChatJS API |

## Portable Node.js and desktop workflows

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| General-purpose host API | Planned | Must work across hosts; no device assumptions |
| Local project/context containers | Planned | Caller-controlled state and persistence |
| Local instructions/memory | Planned | Explicit storage and retention/deletion |
| Workspace/files | Planned | Caller-selected roots, path confinement, bounded operations |
| Task lifecycle/progress | Planned | Local state, cancellation, approval gates, cleanup |
| Command/test execution | Planned | Executable/argv separation, approval, timeout, cancellation, output limits |
| Git inspection/diff/review | Planned | Read-only first; no branches/worktrees |
| Local artifacts | Planned | Real formats and integrity tests |
| Browser/desktop/device integrations | Planned/adapter-based | Optional when the host offers the relevant facility |

## Host model

ChatJS is a reusable Node.js library, not a device-specific application. Do not assume any consumer has a particular OS, camera, microphone, screen, browser, or desktop UI. Make such capabilities optional integrations that are absent unless the consuming host provides them.

## Feature-domain coverage

Every capability evidenced by the supplied first-party clients is eligible for coverage. Feature-domain labels do not determine scope; capability status reflects source evidence, legitimate service support, authorization, entitlements, host prerequisites, and actual implementation readiness.

## Evidence and promotion

Keep package observation, source inspection, behavior tracing, implemented Node.js behavior, and end-to-end account tests as different evidence levels. A client interface evidenced by shipped code must not be rejected merely because it is missing from public API documentation. Mark a feature Implemented only after real code, success/failure tests, relevant cancellation/concurrency/security coverage, ESM/CommonJS parity, accurate declarations, user docs, and actual integration evidence.


Android guest-welcome UI evidence: Lplh1 (generated serializer Lnlh1) carries guestCtaCopy and CTA display flags; WelcomeLanguageEnrollment reads it from local PreferenceStore Lzlh1; Lxr10 maps it into UI state. The observed CTA action-29 click path reaches Ltu10/Lqik0/Lnik0 login-child coordination, reads current Lks31 session state via Llzx.t, and processes login-flow events through local Lau31.i/Lxs31 state reconciliation. It is not proven to call Lgs31.b → Lau31.G or create a guest session. The preference population source and guest network requests remain unknown.


Android guest-start research addendum (2026-11-24): a separate event-gated caller is traced through Lej6 → La991.G → Lmuz0 branch 9 → Lgs31.b → Lau31.G. This remains static source evidence for local session startup only. It does not change ChatJS runtime capability status: authenticated/guest transport and conversation remain unimplemented; the marker is not a telemetry requirement.


Android guest-start research correction (2026-11-24): only the Lt891 event branch in La991.G launches Lmuz0 label 9 → Lgs31.b → Lau31.G. W891.a instead forwards current state through Lcq41.e and returns. Candidate Lt891(5) and Lt891(6) producers exist in Lq20 and Ldo1/ConversationSidebar code respectively, but callback wiring into the coordinator is unverified. This is source research only; no ChatJS guest/auth transport capability is implemented.

Android guest-start callback source evidence (2026-11-25): `Lt891(5)` is forwarded by `Lq20` through a generic `Function1` supplied by `Llal1.h` or the `Lej10.c` WebView host via `Ljpc.invoke`. `Lt891(6)` is forwarded by `Ldo1` through `Lp1w`/`Le2w.e` and the parent `Le2w.j`/`Le2w.c` ConversationSidebar callback. No static call-site or method-handle binding to `La991.G` was found. This remains partial source tracing only; it does not change runtime support status or establish server guest creation.

Android callback dispatch correction (2026-11-25): generic ViewModel callbacks can dispatch to `La991.G` through `Lv6a.H` because dispatch is virtual. The known `Le6` bridge belongs to Composer / FreeThinkingGaugeNuxHost, and no same-instance binding to WebView/ConversationSidebar event callbacks is established. This does not change runtime support status.

Android welcome configuration source (2026-11-25): Lplh1 is constructed by Lxr10.h(Lof70) from the typed welcome_* Statsig keys declared in Lfs10, including welcome_disclosure_guest_cta_copy. Lnlh1 is the generated serializer; Ltl30 embeds the model in Lcmh1 and persists it via Lylh1. Lmx71 is the app-facing StatsigManager over SDK state (Lix71 / Lzw71); exact upstream config refresh/cache expiry/offline precedence remain untraced. This is app feature configuration, not inference-provider selection; no Statsig telemetry is to be implemented in ChatJS.

Android Statsig transport evidence (2026-11-25): SDK initialize is `https://featureassets.org/v1/i` with a user/SDK-metadata body and persisted gate/config/layer response; local response cache, optional per-user cache, overrides and sticky experiment stores are observed. The separate fallback-host store has seven-day expiry/max-ten entries. These are Android feature-config internals, not ChatGPT auth/chat APIs; SDK telemetry is excluded.

Android conversation dispatch evidence (2026-11-25): Compose `Lxjk1.f` captures the supplied `Lgqk0` ViewModel in `Llu2`, whose mapped event is delivered through virtual `Lv6a.G`. Because `Ljqk0` extends `Lgqk0`, a supplied `Ljqk0` reaches its own coordinator handler. Its guarded `Lkmk0` branch emits the empty/unsupported conversation error and invokes local guest SessionManager transition. This is source evidence only; no HTTP guest creation or runtime support status changes.

## 2026-11-25 — Codex additional capability evidence

Codex CLI source research now includes additional permission, network, discovery and agent-collaboration components: execution-scoped outbound network approval; request/approval of extra filesystem permissions; lazy BM25 search over deferred tools with per-step Code Mode policy filtering; and configuration-gated MultiAgentV2 spawn/message/followup/wait/list/interrupt tools. These are all **Research**, not Node.js support. The source contains upstream analytics around some of these paths; those are excluded from ChatJS.

## 2026-11-25 — Codex control and extension surface evidence

Pinned Codex CLI research also identifies plan/context/clock controls; deferred execution-environment readiness; blocking and asynchronous user-question/message flows; separate MCP resource list/template/read operations; current-thread dynamic tool callbacks; and catalog-validated, explicitly consented plugin/connector installation. These remain Research/Planned; the capability inventory and Codex source findings define their evidence boundaries. Host user-interaction surfaces are optional and must not be simulated.

## 2026-11-25 — Codex Responses WebSocket source detail

The pinned Codex source now maps WebSocket v2 more specifically: provider capability/session-state gating, beta handshake headers and optional attestation, turn-scoped connection and routing affinity, strict incremental continuation using previous_response_id, optional generate:false prewarm, bounded frame/read-ahead/event buffering, protocol-acknowledged interrupts, and session-scoped permanent HTTPS fallback when required. These remain Research/Planned; no ChatJS WebSocket transport or Codex Responses client is implemented.

## Current execution priority — Android non-Work first (2026-11-25)

This is temporary sequencing, not a change to product scope. Complete the full ChatGPT Android client other than Android Work first. Android Work, Windows/Desktop and Codex CLI remain part of the long-term target but are parked until Android non-Work has been fully traced, implemented and tested. See CONTINUATION.md, TODO.md, and project-state.json.

## Android source coverage update — 2026-11-25

The supplied Android 1.2026.321 XAPK contains 111 decompressed Valdi modules. Nineteen module groups contain route-like string candidates, catalogued in [ANDROID_CLIENT_MODULE_INVENTORY.md](ANDROID_CLIENT_MODULE_INVENTORY.md). These are package/string discovery evidence, not proven route callsites, entitlement or available workflows. `chatgpt_ads` is a package marker only and is excluded; telemetry strings are excluded from ChatJS. Android authentication path predicates and the account-check dictionary schema/initial account-selection policy are method-verified private helpers. Authentication lifecycle, secure credential storage, refresh/SSO/DPoP, standalone account switching and authenticated HTTP remain research-only.

 
## Android DPoP and native authentication provider evidence — 2026-11-25

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Android native authentication provider injection | Research (DEX interface/adapter census complete; provider not located) | All ten base APK DEX files checked; only generated Function adapters directly implement OAIAuthenticationService/OAIRenewableAuthentication; no direct full OAIPlatformServices constructor call identified. Native/CompilerIntrinsics/reflective provider path remains unknown |
| Android DPoP signing and refresh | Research (DEX call graph traced; not implemented) | AndroidKeyStore EC/secp256r1 key aliases, SHA256withECDSA, dpop+jwt/ES256, Ktor `WWW-Authenticate` scheme parsing, DPoP-vs-Bearer provider selection, a separate Ktor DPoP proof plugin/provider traced end-to-end to `Lkl40` → `Lke` → `Lyls0.s`, which uses the stored P-256 KeyPair and adjusted clock. OAuth refresh and invalid-proof timestamp correction are also traced. Ktor retains parameterized `WWW-Authenticate` challenge parameters and token68 separately; `Lph8` selects by scheme, while the recovered `Lsh8.a` callback does not capture/read the parameter list. `Lyt2.b(String)` is a separate `DEVICE_KEY` challenge signer called only by `Lsk00`, not the main DPoP JWT. The sole `X-Nonce` literal reference is RevenueCat-specific and not DPoP evidence. `Lxb8.j` requires a refresh request, response exception status 400/401/403, `iat - Date > 30s` or `Date - iat > 300s`, and one of the specific API-error matches; the caller makes one explicit corrective retry. The signer result path is also traced: one `Ln1d1.b` call per provider invocation; `Lfq.a` returns DPoP auth on success or a credentials-acquisition failure on error, with no internal retry loop. `DPoPClockRetryAttempted` is written by `Lwp` on `dpop_iat_out_of_range` after parsing response Date and updating `Lpvx.b`; the request context is copied and replayed via `Ldk31.a`, while `Lwp` and `Lxp.b` enforce marker-presence guards against a second clock-correction replay/provider re-entry. `RequestDPoPMetadata` and `OpenAI-Device-Key` are telemetry/header-capture instrumentation, not protocol support. A separate `token_expired` Ktor branch invokes rejected-token persistence (`Lcd01.d`) and forced credential renewal (`Lcd01.e` → `b(true)` → `Lgk8`/`Ld7x.j` → `Lu5x.f`/`Ld7x.l`); its full wire/replay contract remains open. Exact proof claims, any DPoP server-nonce transport/consumption/proof binding outside the recovered main Ktor proof path and separate `DEVICE_KEY` challenge signer, full refresh non-success response/error mapping, other retry paths and holder lifetime/reset remain open; successful response DTO `Llkq0` (seven properties) and `Ly4b1.h` conversion to credential-bound `Lvg8` are traced; request endpoint/body are traced as POST `https://auth.openai.com/oauth/token` with `clientId`, `refreshToken`, default `grantType=refresh_token` and a separate DPoP proof header; `ApiServiceError.b` maps to JSON `type` and `.c` to JSON `code`. `Lxb8.g` wraps the API result/sent `iat`/optional Date in `Ljb8`; `Ly0p0` HTTP response failures expose status/Date/API error, while generic `Lw0p0` transport/serialization errors have no Date. Full non-success normalization and token-expiry replay remain open; no ChatJS signing or token refresh |


## Android P-256 ES256 signature-format helper — 2026-11-25

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Android DER ECDSA to ES256 `r || s` serialization | Implemented (private helper only) | `normalizeAndroidEs256Signature` converts DER P-256 ECDSA signature bytes to 64-byte fixed-width form; seven deterministic tests include verification against a real Node P-256 signature. It does not sign, manage keys, access a keystore, create a JWK/DPoP proof, authenticate or send requests. |



## Android P-256 key serialization helpers — 2026-11-25

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Android DER ECDSA to ES256 `r || s` serialization | Implemented (private helper only) | Seven tests; pure DER-to-64-byte formatting, no signing or keystore. |
| Android P-256 public JWK coordinate serialization | Implemented (private helper only) | Six tests; exact `kty`/`crv`/`x`/`y` source schema and Base64URL coordinate encoding. It does not generate/load keys, sign or implement DPoP. |



## Android DPoP compact-JWS serialization — 2026-11-25

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Android DPoP header/payload and compact-JWS serialization | Implemented (private serializer only) | Source-traced header `typ`/`alg`/`jwk` and payload `htm`/`htu`/`iat`/`jti`/`ath`; canonical URL and token hash; 64-byte signature assembly. Seven tests include real P-256 signature verification. No key generation, host signer, session/nonce/refresh workflow or HTTP transport. |



### Android DPoP timestamp alignment — 2026-11-25

The JWS `iat` input is the request's `Instant.epochSecond` plus stored server-minus-local epoch-second offset. The refresh correction uses the response `Date` header and the `Lxb8.j` predicate: the request `iat` must lead Date by more than 30 seconds, or Date must lead `iat` by more than 300 seconds, and the response must match the 400/401/403 plus API-error allowlist. The eligible branch updates the offset and performs one corrective refresh retry. The `Lpvx` holder is in-memory in the traced path; its DI lifetime/reset and other refresh retries remain unresolved. The private ChatJS helper still only applies supplied integer values and does not parse headers, persist state or retry.


## Android LoginAuth response-schema decoders — 2026-11-27

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Decode shared Android LoginAuth Lql8 errors | Implemented (private pure helper) | Validates optional nullable recoverability, enum-keyed string-list field errors, form errors and structured metadata; six focused tests. |
| Decode Android LoginAuth about_you Lp4 payload | Implemented (private pure helper) | Validates optional nullable Lql8 errors and optional non-null fullName; two focused tests. Other Lyl8 payloads and top-level union dispatch remain unimplemented. |


## Android LoginAuth email OTP payload decoder — 2026-11-27

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Decode Android LoginAuth email_otp_verification payload | Implemented (private pure helper) | Five additional tests; validates optional nullable errors, nine exact verification modes, four source-enumerated polymorphic login method types, and passkey challenge optional/null semantics with required JsonObject/String nested members. Does not parse top-level Lyl8, authenticate, sign, or send requests. |


## Android LoginAuth BodyIntegrityPlugin source trace — 2026-11-27

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Trace DI-installed BodyIntegrityPlugin through shared and cloned LoginAuth Ktor clients | Source-resolved; not implemented in ChatJS | Ly3b -> Lx3b -> Ltvc0; Lb6p0 clones the shared plugin maps; Lf91 uses the cloned client. |
| Resolve BodyIntegrity host allow-list | Source-resolved; not implemented in ChatJS | Exact hosts and dot-boundary subdomains; auth.openai.com is admitted; host-only predicate. |
| Resolve integrity success/failure HTTP headers | Source-resolved; not implemented in ChatJS | Success header carries Looa1.c; failure header carries normalized Lrnk1.j string. Both are validated by Ktor's HeadersBuilder. |
| Resolve request-body preservation | Source-resolved; not implemented in ChatJS | Original bytes are buffered and rewrapped as Lper0, preserving content type, length and headers metadata on both outcome branches. |

## Android LoginAuth contact verification payload decoder — 2026-11-27

| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Decode Android LoginAuth contact_verification payload Lhwt0 | Implemented (private pure helper) | Validates optional nullable Lql8 errors, the shared nine-value Lfer0 phoneVerificationMode, and List<Lmnk0> using the source-traced password/passwordless-OTP/passkey/unknown variants and passkey challenge. Three new tests; focused response-schema suite now has 16 tests. Does not parse the outer Lyl8 union or perform authentication/transport. |
## Android LoginAuth contact verification payload decoder — 2026-11-27

| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Decode Android LoginAuth contact_verification payload Lhwt0 | Implemented (private pure helper) | Validates optional nullable Lql8 errors, the shared nine-value Lfer0 phoneVerificationMode, and List<Lmnk0> using the source-traced password/passwordless-OTP/passkey/unknown variants and passkey challenge. Three new tests; focused response-schema suite now has 16 tests. Does not parse the outer Lyl8 union or perform authentication/transport. |
## Android LoginAuth external_url payload decoder — 2026-11-27

| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Decode Android LoginAuth external_url payload Lzq70 | Implemented (private pure helper) | Requires the generated required, non-null string url; preserves extension members. Two tests. No URL parsing/navigation/allow-list is inferred, and no outer Lyl8 union or transport is implemented. |
## Android LoginAuth token_exchange payload decoder — 2026-11-27

| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Decode Android LoginAuth token_exchange payload Ltoa1 | Implemented (private pure helper) | Requires the generated required, non-null string code; preserves extension members. Two tests. No OAuth code-format inference or exchange/network operation; no outer Lyl8 union or transport. |

## Android LoginAuth password-step payload decoders — 2026-11-28

| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Decode Android LoginAuth create_account_password payload Lwxw | Implemented (private pure helper) | Validates optional nullable Lql8 errors and optional nullable List<Lmnk0> loginMethods using shared validators; two focused tests. Does not submit or validate a password or decode the outer Lyl8 union. |
| Decode Android LoginAuth login_password payload Lcpk0 | Implemented (private pure helper) | Same source-confirmed optional nullable errors and loginMethods contract; two focused tests. Does not submit or validate a password or decode the outer Lyl8 union. |


## Android LoginAuth login_passkey payload decoder — 2026-11-28

| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Decode Android LoginAuth login_passkey payload Lqok0 | Implemented (private pure helper) | Validates optional nullable Lql8 errors, required non-null Lmds0 passkeyChallengeOption, and optional non-null Boolean fallbackAllowed; three focused tests. No passkey ceremony, assertion or authentication is implemented. |


## Android LoginAuth workspace payload decoder — 2026-11-28

| Capability | Status | Evidence and limits |
| --- | --- | --- |
| Decode Android LoginAuth workspace payload Lo5i1 and entries Lxn8 | Implemented (private pure helper) | Validates optional nullable errors/workspaces, required nullable id/kind, optional non-null name/reauthentication strings; three focused tests. No workspace selection or reauthentication workflow is inferred. |
