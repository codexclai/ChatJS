# ChatJS Task List

Use this as the single authoritative queue. Mark tasks complete only when evidence supports completion.

## P0 — Continuity and governance

- [ ] Confirm rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting contributors.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.
- [ ] Owner: update GitHub About description to the approved wording in `REPOSITORY_SETTINGS.md`; the available GitHub integration can update repository files but not repository metadata.

## P1 — Actual client implementation research

- [x] Preserve the full extracted Android APK payload in the private Library archive.
- [x] Verify Android archive entry count, payload inventory, and ZIP integrity.
- [x] Record Android DEX and Valdi module counts and analysis limitations.
- [x] Perform a first-pass decompression/string scan of selected Valdi modules and document concrete auth/session, bearer transport, conversation/streaming, upload, history, image-gallery, and Library components and paths.
- [x] Document that Project Sources are intentionally kept empty.
- [ ] Perform deeper DEX/Valdi method-level analysis to identify call graphs, exact request/response schemas, credential lifecycle, Sentinel/device-integrity behavior, SSE event state machines, and upload signing/retry behavior.
- [ ] Build a deeper source-path-to-behavior map for conversations, streaming, files, Projects, voice, images, search/tools, and other client workflows, including exact call graphs and schemas.
- [ ] Document actual dependencies and Node.js portability for each major client component.
- [ ] Define a repeatable client behavior test plan and capture verified request/response examples without storing personal account data.
- [ ] Windows extracted-payload archive work is deferred by the owner; resume only when asked.

## P1 — General-purpose Node.js integration design

- [ ] Define the client factory/configuration/lifecycle API for different host applications.
- [ ] Define the real ChatGPT client connection and legitimate authentication/session lifecycle.
- [ ] Define request/response transport, streaming/backpressure, cancellation, timeouts, retry policy, concurrency, and typed errors from client evidence.
- [ ] Define reusable conversation/thread/context/project models.
- [ ] Define instruction/profile precedence and explicit local persistence/memory behavior.
- [ ] Define file/attachment ingestion, format handling, size limits, and cleanup.
- [ ] Define optional host adapters without requiring specific camera/microphone/screen or OS support.
- [ ] Add TypeScript declaration and ESM/CommonJS contract tests.

## P2 — Complete feature slices

- [ ] Implement a genuine ChatGPT client connection and authentication flow based on verified client behavior.
- [ ] Implement conversation send/receive/stream with real ChatGPT service responses.
- [ ] Implement project/context/instruction handling.
- [ ] Implement file and attachment workflows using observed client request formats.
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

ChatJS is one general-purpose Node.js module targeting the actual client-side behavior of official ChatGPT mobile and desktop (Work/Codex). The current runtime remains foundation-only; no real ChatGPT service connection has been implemented. Android's full extracted APK payload archive is retained and verified in personal Library at `/ChatJS-Archives/ChatJS-Android.zip`. Project Sources are intentionally empty. Windows extracted-payload archive work is deferred; the current Library ZIP is metadata-only, while a previous chat recorded a larger remote archive whose transfer was incomplete and whose status is not currently reverified.

Never create branches or worktrees. Keep all repository work on main.
