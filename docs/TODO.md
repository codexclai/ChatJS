# ChatJS Task List

Use this as the single authoritative queue for remaining work. Keep tasks actionable and mark them complete only when evidence supports completion.

## P0 — Ownership and eligibility

- [ ] Confirm the rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts an open-source license before inviting external contributors.
- [ ] Resolve whether ChatJS can qualify for Sign in with ChatGPT plan usage under its chosen licensing/hosting model. Do not change the license or assume eligibility.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.

## P1 — Product and compatibility research

- [x] Locate ChatGPT.zip in ChatJS Project → Sources and inspect available static package metadata without redistributing proprietary material.
- [x] Record high-level Android manifest/resource indicators and the limits of static-only inspection.
- [x] Separate APK package indicators from documented, authorized Node.js interfaces.
- [x] Map major product areas to current official API routes and note account/plan/preview restrictions.
- [x] Review current official OpenAI documentation for supported integration paths.
- [x] Record capability classifications and do not assume access to ChatGPT consumer conversations or memory.
- [ ] Validate selected APK-indicated product surfaces against observable behavior where a lawful reference session is available.

## P1 — Core runtime design

- [ ] Specify client configuration, lifecycle, and validation.
- [ ] Define explicit caller-provided API-key configuration and credential redaction/rotation behavior.
- [ ] Define the authorized Responses API provider and Node.js transport contract.
- [ ] Specify typed streaming events, payloads, ordering, backpressure, cancellation, timeout, and cleanup.
- [ ] Define typed errors, stable codes, retryability, causes, and safe redaction.
- [ ] Design concurrency, request isolation, rate-limit handling, and resource cleanup.
- [ ] Decide whether API conversation persistence belongs in core or optional adapters.
- [ ] Add TypeScript declaration tests.

## P2 — Complete feature slices

- [ ] Implement an authorized Responses API provider as a complete, tested vertical slice.
- [ ] Implement a real text conversation workflow with streaming and cancellation.
- [ ] Add model discovery and function calling where documented interfaces permit them.
- [ ] Add safe file and attachment handling with explicit storage/deletion semantics.
- [ ] Add image, audio, and voice implementations only where supported by the chosen auth route.
- [ ] Add regression tests proving the shipped runtime has no telemetry, tracking, or unsolicited network requests.
- [ ] Keep ChatJS.md synchronized with every public API change.
- [ ] Keep ChatJS.tar.gz limited to and synchronized with the distributable module.

## P3 — Production readiness

- [ ] Review dependency necessity, security, and licensing whenever dependencies are introduced.
- [ ] Add API reference generation and documentation checks only where useful.
- [ ] Add performance, memory, and concurrency benchmarks with measurable budgets.
- [ ] Add supported-platform checks based on actual implementation requirements.
- [ ] Document maintenance and security-response practices.

## Current position

The repository foundation and module archive pipeline are established. Static APK package indicators and the current documented OpenAI integration surface have been inventoried, but no ChatGPT feature is implemented. OpenAI's Responses API is the chosen public foundation for new model-backed work. Sign in with ChatGPT plan-usage eligibility remains unresolved because the repository currently uses an all-rights-reserved notice. The repository has only main; branch-generating dependency automation is removed. No telemetry or unrelated functionality is wanted.

The next technical task is to specify and implement a narrow API-key Responses workflow only after defining credential handling, streaming/cancellation, errors, timeouts, concurrency, and cleanup. Do not implement plan-usage OAuth until eligibility is resolved.
