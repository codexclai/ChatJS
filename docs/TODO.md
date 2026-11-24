# ChatJS Task List

Use this as the single authoritative queue. Mark tasks complete only when evidence supports completion.

## P0 — Continuity and governance

- [ ] Confirm rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting contributors.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.
- [ ] Owner: update GitHub About description to the approved wording in `REPOSITORY_SETTINGS.md`; the available GitHub integration can update repository files but not repository metadata.

## P1 — Actual client implementation research

- [x] Add the current ChatGPT Android XAPK app bundle to ChatJS Project → Sources and verify its hash and archive integrity.
- [x] Add the official ChatGPT Windows installer to ChatJS Project → Sources as two sequential pieces and verify exact reconstruction.
- [x] Record Android DEX and Valdi module counts and analysis limitations.
- [x] Perform a first-pass decompression/string scan of selected Valdi modules and document concrete auth/session, bearer transport, conversation/streaming, upload, history, image-gallery, and Library components and paths.
- [x] Establish ChatJS Project → Sources as the primary source location for supplied client packages.
- [ ] Perform deeper DEX/Valdi method-level analysis to identify call graphs, exact request/response schemas, credential lifecycle, Sentinel/device-integrity behavior, SSE event state machines, and upload signing/retry behavior.
- [ ] Continue reconstructing the Android integrity path's remaining unknowns: generated Valdi chat-requirements schema, app_attest_challenge semantics, public-build provider selection, cookie matching/expiry lifecycle, device UUID rotation/deletion, Valdi header validation/application, retryable-status gates/attempt ceilings, DeviceRateLimits schema/scope/retention, 300-second cooldown marker persistence, and cancellation edge cases. Preserve throttles; do not port SDK telemetry metadata.
- [ ] Build a deeper source-path-to-behavior map for conversations, streaming, files, Projects, voice, images, search/tools, and other client workflows, including exact call graphs and schemas.
- [ ] Document actual dependencies and Node.js portability for each major client component.
- [ ] Define a repeatable client behavior test plan and capture verified request/response examples without storing personal account data.
- [x] Add official Codex source snapshot CodexCLI.zip to Project Sources, pinned to a verified upstream commit; document it as reference-only, not a runtime dependency.
- [x] Trace Android anonymous-session state and storage foundations: SessionManager startup/logout/refresh paths, serialized session metadata, sessions/guest-* storage and retired-session cleanup; distinguish location-cookie endpoint constants from composer routes.
- [ ] Reconstruct the exact Android guest session create/refresh network request. The RootViewModel first tries the separate install-referrer AccountSelector login Los8.f → LoginGraphManager, then enters the actual initial anonymous fallback Lgs31.b → Lau31.G. G acquires the Lmgo0 coroutine mutex, runs Llzx.n/Lwk8 local eligibility logic and enters Lau31.E local state work. Correction: Lof70 is Statsig/experimentation (not auth/session); Lau31.u is the local snapshot-to-state refresh path, and Lau31.n → Ldt31 → AuthRepository/CredentialsRepository is the separate credential-backed AuthSession token path. Neither inspected path exposes the guest HTTP create request. Continue through untraced service dependencies/call sites. The global /backend-anon base is configured, but the endpoint is unknown.
- [ ] Trace the origin, generation, persistence, expiry/replacement/retirement policy for the two opaque values used by Lxzp0 to compose sessions/guest-* storage paths.
- [ ] Trace the actual UI composition/caller for AnonymousSessionLoading (Losk1.a) and its relation to the root unauthenticated-session flow. Do not treat "Continue as Guest" as ChatGPT UI; that string belongs to the Shop plugin model Li230.
- [ ] Reconstruct the actual guest conversation composer send/prepare route schemas independently of LocationCookieInitializer.
- [ ] Reconstruct Windows desktop Work Local and Android Work Cloud as separate execution surfaces; never require Codex CLI or app-server.
- [ ] Verify whether Windows desktop Work has a real logged-out guest mode; current evidence is insufficient.
- [ ] Windows extracted-payload archive work is deferred by the owner; resume only when asked.

## P1 — Product completeness, customization and capability architecture

- [ ] Translate PRODUCT_STANDARD.md into a prioritized, source-evidenced capability map covering every in-scope Android and desktop/Work/Codex workflow; track support, partial, experimental, unsupported, blocked and unknown states.
- [ ] Design and test a validated layered configuration model (safe defaults, per-client settings, optional profiles, and per-operation overrides) with explicit precedence, immutable operation snapshots and no security-bypass switches.
- [ ] Design a capability registry and narrow optional host/provider adapter contracts, including discovery, prerequisites, lifecycle, cancellation, cleanup and typed unavailable/unsupported states.
- [ ] Define a tested Node.js/OS/host compatibility matrix; add CI coverage for declared targets and real-host integration tests for platform-specific adapters.
- [ ] Define production-readiness checks for each feature: source evidence, real implementation, ESM/CommonJS/TypeScript parity, error/cancellation/concurrency/security tests, authorized end-to-end evidence, measured resource budgets, packaging and user documentation.
- [ ] Expand public documentation as real APIs land: quick starts, TypeScript/CommonJS examples, configuration reference, host/provider setup, capability states, errors, limits, side effects, troubleshooting and cleanup.
- [ ] Add performance and soak tests for implemented high-use workflows with explicit latency, memory, concurrency and resource ceilings; do not publish unmeasured performance claims.

## P1 — General-purpose Node.js integration design

- [ ] Define the client factory/configuration/lifecycle API for different host applications.
- [ ] Define the real ChatGPT client connection and legitimate authentication/session lifecycle.
- [ ] Define request/response transport, streaming/backpressure, cancellation, timeouts, retry policy, concurrency, and typed errors from client evidence.
- [x] Implement a reusable bounded/cancellable Server-Sent Events framing parser for async byte streams; keep ChatGPT-specific decoding and live transport unimplemented.
- [ ] Define reusable conversation/thread/context/project models.
- [ ] Define instruction/profile precedence and explicit local persistence/memory behavior.
- [ ] Define file/attachment ingestion, format handling, size limits, and cleanup.
- [ ] Define optional host adapters without requiring specific camera/microphone/screen or OS support.
- [ ] Add TypeScript declaration and ESM/CommonJS contract tests.

## P2 — Complete feature slices

- [ ] Implement genuine authenticated-account and accountless-guest ChatGPT session flows using exact first-party client behavior; preserve all gates and guest restrictions.
- [ ] Implement a genuine ChatGPT client connection and authentication flow based on verified client behavior.
- [ ] Implement conversation send/receive/stream with real ChatGPT service responses.
- [ ] Implement project/context/instruction handling.
- [ ] Implement file and attachment workflows using observed client request formats.
- [ ] Implement Work Local for the Windows desktop client and Work Cloud for Android as separate client/service flows; neither may depend on Codex CLI/app-server.
- [ ] Decide and implement a distinct Codex CLI-equivalent coding capability only where source evidence proves user-visible behavior materially separate from Work.
- [ ] Implement Work/Codex task, workspace, command, approval, Git review, and artifact workflows.
- [ ] Add optional voice/image/video and host integrations only where actual client and host evidence supports them.
- [ ] Add security/regression tests for auth lifecycle, secret redaction, cancellation, concurrency, timeouts, and no unsolicited traffic.

## P3 — Production readiness

- [ ] Review dependency necessity, security, and licensing whenever dependencies are introduced.
- [ ] Add API reference generation only where useful.
- [ ] Add performance, memory, and concurrency benchmarks with measurable budgets.
- [ ] Define supported Node.js hosts from actual implementation requirements.
- [ ] Document maintenance and security-response practices.

## Current position

ChatJS is one general-purpose Node.js module targeting the actual client-side behavior of official ChatGPT mobile and desktop (Work/Codex). The current runtime remains foundation-only; no real ChatGPT service connection has been implemented. Current package sources are `ChatGPT-Android.xapk` and the two sequential Windows installer pieces in ChatJS Project → Sources. The personal Library is outside the normal workflow and is not a routine source; access it only for a concrete need when useful and accessible. Any material used there belongs under `ChatJS Project` and must be authentic and necessary. The persistent ChatJS browser profile is the only reusable default profile; temporary sessions are disposable and must not replace it.

Never create branches or worktrees. Keep all repository work on main.


## 2026-11-24 — Current transport and guest-session slice

- [x] Add bounded/cancellable generic SSE parser with CommonJS/ESM/type exports, package archive inclusion and deterministic parser tests.
- [x] Archive the official Codex source snapshot in Project Sources and record its pinned commit/hash; explicitly exclude it as a ChatJS runtime dependency.
- [x] Record Android guest-session identifiers and anonymous endpoint attribution caveat.
- [ ] Finish the exact guest-session call graph and prepare/send payload reconstruction.
- [ ] Continue source-led direct ChatGPT authentication, conversation and Work implementation; no live ChatGPT connection is implemented yet.


- [ ] Trace the writer/population source for WelcomeLanguageEnrollment / Lzlh1 / Lylh1, including the source of guestCtaCopy, local seed vs remote fetch, cache/update conditions and feature gates.
- [ ] Trace Lt891 producers/callback wiring into La991.G. Observed constructors are Lq20.invoke → Lt891(5) and Ldo1.invoke selector case 18 → Lt891(6) via the Le2w.e ConversationSidebar path. The distinct Lt891 branch dispatches Lmuz0 label 9 → Lgs31.b → Lau31.G; W891.a goes to Lcq41.e and returns. Prove which callback targets the coordinator before assigning a UI trigger or connecting it to welcome CTA action-29.

- [ ] Trace the concrete callback implementations supplied by `Llal1.h`/`Lj20`/`Lss`/`Lt07`/`Ly641` and the `Lej10.c`/`Ljpc` WebView host, plus the `Le2w.c`/`Le2w.j` ConversationSidebar callbacks. Determine payload meaning and whether any handler dynamically reaches `La991.G`; the ten-DEX static scan found no direct method-id or method-handle binding outside its own definition.
