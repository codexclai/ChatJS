# ChatJS Task List

Use this as the single authoritative queue for remaining work. Keep entries actionable and mark them complete only when implementation and verification support that status.

## P0 — Ownership and repository setup

- [ ] Set the GitHub repository description to the wording in [Repository Settings](REPOSITORY_SETTINGS.md). Do not add topics or branch protection/rulesets.
- [ ] Confirm the rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether the project remains proprietary or adopts a recognized license before inviting external contributors.
- [ ] Verify private vulnerability reporting, secret scanning and push protection availability.

## P1 — Product and compatibility research

- [ ] Search ChatJS Project → Sources for ChatGPT.zip and inspect it when available and relevant.
- [ ] Create a source-backed inventory of observable ChatGPT mobile capabilities.
- [ ] Separate visible application behavior from authorized programmatic interfaces.
- [ ] Record account, plan, regional and platform limits where evidence supports them.
- [ ] Define compatibility categories: implemented locally, public-interface adapter, user-supplied backend, externally delegated, unavailable.
- [ ] Review current official OpenAI platform documentation and terms before designing integrations.
- [ ] Define non-goals and limitations for features unavailable to a Node.js module.

## P1 — Core runtime design

- [ ] Specify client configuration and lifecycle.
- [ ] Define authorized provider and transport adapter contracts.
- [ ] Specify streaming events, payloads, ordering, backpressure, cancellation, timeouts and reconnection.
- [ ] Define typed errors, stable codes, retryability, causes and safe redaction.
- [ ] Design concurrency, request isolation, rate-limit handling and resource cleanup.
- [ ] Decide whether persistence, caching and storage belong in core or optional adapters.
- [ ] Add TypeScript declaration tests.

## P2 — Complete feature slices

- [ ] Extend client configuration and lifecycle beyond the foundation.
- [ ] Implement an authorized transport/provider adapter against a documented interface.
- [ ] Implement a complete conversation/message workflow with streaming and cancellation.
- [ ] Add model discovery and tool invocation abstractions where authorized interfaces exist.
- [ ] Add safe file and attachment handling.
- [ ] Add image, audio and voice capability implementations where authorized interfaces exist.
- [ ] Add regression tests proving shipped runtime has no telemetry, tracking or unsolicited network requests.
- [ ] Keep ChatJS.md synchronized with every public API change.
- [ ] Keep ChatJS.tar.gz limited to and synchronized with the distributable module.

## P3 — Production readiness

- [ ] Review dependency necessity, security and licensing whenever dependencies are introduced.
- [ ] Add API reference generation and documentation checks only where useful.
- [ ] Add performance, memory and concurrency benchmarks with measurable budgets.
- [ ] Add supported-platform checks based on actual implementation requirements.
- [ ] Document maintenance, support and security-response practices.

## Current position

The repository foundation, cross-chat memory and module archive pipeline exist. ChatGPT feature implementation has not started. The branch listing currently contains only main, and the project has a permanent main-only/no-branch-creation-or-deletion policy. No telemetry or unrelated functionality is wanted. The next technical work is source-backed capability and interface research. Ownership/legal review and the repository description remain owner-side tasks.