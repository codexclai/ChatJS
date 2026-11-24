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
| Accountless / anonymous guest session | Research | Android DEX exposes AnonymousSession, Unauthenticated, LoggedInSession, guest plan/storage identifiers and anonymous endpoint strings; exact conversation route attribution and request schemas remain open |
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