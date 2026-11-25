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
| Android first-party authentication input/path validators | Implemented (internal helper only) | Method-decoded bearer/account-ID/header/origin regex flags and origin-relative path/service path gates; no credentials, secure storage, request transport or account selection |
| No telemetry in current foundation | Verified for inspected source | Re-review with every network-capable change |

## Actual ChatGPT client integration

| Capability | Status | Evidence / acceptance boundary |
| --- | --- | --- |
| Client request/response construction | Research (partial internal helpers) | Android model-catalog and chat-requirements route descriptors/typed response decoders have tested internal helpers; conversation send body, authenticated transport, session lifecycle and live server behavior remain unimplemented |
| Connection and transport | Research (first-pass module evidence) | Bearer transport, WebSocket integration, SSE clients, and stream processors observed; exact runtime state machine remains open |
| Authenticated account session | Research (validation/schema subset implemented) | Private validators and account-check map/selection helper are tested. The helper reproduces initial access filtering/order/default selection only; login, controller lifecycle, native credentials, secure persistence, refresh/SSO/DPoP, full account switching and authenticated HTTP remain unimplemented |
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
