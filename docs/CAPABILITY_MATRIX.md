# ChatJS Capability Matrix

**Current implementation status: foundation only.** The product goal is one general-purpose Node.js module bringing together the actual client-side systems of official ChatGPT mobile and desktop (Work/Codex). Source material and intended compatibility are not themselves implementation.

## Status definitions

- **Implemented:** working code, docs, and repeatable tests.
- **Partial:** a defined subset exists; gaps are explicit.
- **Research:** package/client behavior or host mechanism is being examined.
- **Planned:** intended but not started.
- **Blocked:** a necessary engine, toolchain, host interface, or test environment is unavailable.
- **Out of scope:** explicitly excluded.

## Current foundation

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| CommonJS and ESM entry points | Implemented | Automated tests load both |
| Client factory/lifecycle | Partial | Construction, status, assert-open, close |
| Error base type | Partial | Foundation validation/closed-client errors |
| TypeScript declarations | Partial | Foundation API plus generic SSE parser |
| Generic Server-Sent Events framing | Implemented | Async byte-iterable parser, UTF-8/chunk boundaries, event fields, limits, abort and iterator cleanup; does not connect to ChatGPT or decode a product-specific event schema |
| No telemetry in current foundation | Verified for inspected source | Re-review with every network-capable change |

## Actual ChatGPT client integration

| Capability | Status | Evidence / acceptance boundary |
| --- | --- | --- |
| Client request/response construction | Research (first-pass module evidence) | Generated API clients and request paths observed in Android Valdi modules; full call graphs and body schemas remain open |
| Connection and transport | Research (first-pass module evidence) | Bearer transport, WebSocket integration, SSE clients, and stream processors observed; exact runtime state machine remains open |
| Authenticated account session | Research | Android client exposes account/session services, secure credential storage and bearer transport; exact sign-in, refresh, revocation and Node.js storage flow remain open |
| Accountless / anonymous guest session | Research | Android method-level DEX traces the Unauthenticated/AnonymousSession/LoggedInSession state enum, nine-field session metadata, SessionManager startup/logout/refresh paths, guest storage/retirement cleanup, a global backend-anon base URL/path family and an anonymous-session-labelled local profile descriptor. Exact guest create/refresh network schema and composer send routes remain open. Lof70 is Statsig/experimentation, not auth/session; the unauthenticated refresh path inspected is local state transition. A separate AuthSession DPoP/token refresh path is credential-backed and not proven guest creation; observed /backend-anon/f/conversation constants belong to LocationCookieInitializer during location-cookie setup. "Continue as Guest" is a Shop UI string, not ChatGPT |
| Windows desktop accountless/guest Work | Unknown | Current inspection did not establish a ChatGPT guest-session path in the Windows Work client |
| Sentinel and device integrity | Research (current Android source scan) | Separate requirements/device-integrity providers and Android native Play Integrity exchange observed; challenge schemas and cross-host provider behavior remain unresolved |
| Chat conversations and streaming | Planned | Use actual ChatGPT client behavior; no canned/fake responses |
| Files and attachments | Research/Planned | Trace supported client payloads and real Node.js processing |
| Projects/instructions/context | Research/Planned | Reproduce relevant client models and state behavior |
| Voice/image/video | Research/Planned | Use actual client behavior where evidenced; optional host/device facilities |
| Windows desktop Work Local | Research | Owner-confirmed local execution surface; actual desktop client/native-host call graph remains to be reconstructed; no CLI/app-server dependency |
| Android Work Cloud | Research | Owner-confirmed cloud execution surface; Codex-related Android request paths observed, full Work protocol not yet reconstructed |
| Codex CLI | Source reference only | Official source archived/pinned; not a ChatJS Work runtime or an external prerequisite |
| Search/tools/Work/Codex workflows | Research/Planned | Trace each actual client surface and implement tested direct Node.js transports/adapters |

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

## Explicit scope exclusions

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features.

## Evidence and promotion

Keep package observation, source inspection, behavior tracing, implemented Node.js behavior, and end-to-end account tests as different evidence levels. A client interface evidenced by shipped code must not be rejected merely because it is missing from public API documentation. Mark a feature Implemented only after real code, success/failure tests, relevant cancellation/concurrency/security coverage, ESM/CommonJS parity, accurate declarations, user docs, and actual integration evidence.


Android guest-welcome UI evidence: Lnlh1/Lylh1 carries guestCtaCopy and CTA display flags; WelcomeLanguageEnrollment reads it from local PreferenceStore Lzlh1; Lxr10 maps it into UI state. The observed CTA action-29 click path reaches Ltu10/Lqik0/Lnik0 login-child coordination, reads current Lks31 session state via Llzx.t, and processes login-flow events through local Lau31.i/Lxs31 state reconciliation. It is not proven to call Lgs31.b → Lau31.G or create a guest session. The preference population source and guest network requests remain unknown.


Android guest-start research addendum (2026-11-24): a separate event-gated caller is traced through Lej6 → La991.G → Lmuz0 branch 9 → Lgs31.b → Lau31.G. This remains static source evidence for local session startup only. It does not change ChatJS runtime capability status: authenticated/guest transport and conversation remain unimplemented; the marker is not a telemetry requirement.


Android guest-start research correction (2026-11-24): only the Lt891 event branch in La991.G launches Lmuz0 label 9 → Lgs31.b → Lau31.G. W891.a instead forwards current state through Lcq41.e and returns. Candidate Lt891(5) and Lt891(6) producers exist in Lq20 and Ldo1/ConversationSidebar code respectively, but callback wiring into the coordinator is unverified. This is source research only; no ChatJS guest/auth transport capability is implemented.

Android guest-start callback source evidence (2026-11-25): `Lt891(5)` is forwarded by `Lq20` through a generic `Function1` supplied by `Llal1.h` or the `Lej10.c` WebView host via `Ljpc.invoke`. `Lt891(6)` is forwarded by `Ldo1` through `Lp1w`/`Le2w.e` and the parent `Le2w.j`/`Le2w.c` ConversationSidebar callback. No static call-site or method-handle binding to `La991.G` was found. This remains partial source tracing only; it does not change runtime support status or establish server guest creation.

Android callback dispatch correction (2026-11-25): generic ViewModel callbacks can dispatch to `La991.G` through `Lv6a.H` because dispatch is virtual. The known `Le6` bridge belongs to Composer / FreeThinkingGaugeNuxHost, and no same-instance binding to WebView/ConversationSidebar event callbacks is established. This does not change runtime support status.
