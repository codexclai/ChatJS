# ChatJS Task List

Use this as the single authoritative queue for work that remains open. Keep entries actionable and mark them complete only when implementation and verification support that status.

## P0 — Repository and project setup

- [ ] Set the GitHub repository description and topics; apply and verify main-branch protection and available security settings using [Repository Settings](REPOSITORY_SETTINGS.md).
- [ ] Confirm the rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether the project remains proprietary or adopts a recognized license before inviting external contributors.
- [ ] Verify private vulnerability reporting and secret scanning/push protection availability.

## P1 — Product and compatibility research

- [ ] Search ChatJS Project → Sources for ChatGPT.zip and inspect it when available and relevant.
- [ ] Create a source-backed inventory of observable ChatGPT mobile capabilities.
- [ ] Separate visible application behavior from authorized programmatic interfaces.
- [ ] Record account, plan, regional, and platform limits where supported by evidence.
- [ ] Define compatibility categories: implemented locally, public-interface adapter, user-supplied backend, externally delegated, unavailable.
- [ ] Review current official OpenAI platform documentation and terms before designing integrations.
- [ ] Define explicit non-goals and limitations for features that cannot be provided directly by a Node.js module.

## P1 — Core runtime design

- [ ] Specify client configuration and lifecycle.
- [ ] Define authorized provider and transport adapter contracts.
- [ ] Specify streaming events, payloads, ordering, backpressure, cancellation, timeouts, and reconnection.
- [ ] Define typed errors, stable codes, retryability, causes, and safe redaction.
- [ ] Design concurrency, request isolation, rate-limit handling, and resource cleanup.
- [ ] Decide whether persistence, caching, and storage belong in core or optional adapters.
- [ ] Add TypeScript declaration tests.

## P2 — Complete feature slices

- [ ] Extend client configuration and lifecycle beyond the foundation.
- [ ] Implement an authorized transport/provider adapter against a documented interface.
- [ ] Implement a complete conversation/message workflow with streaming and cancellation.
- [ ] Add model discovery and tool invocation abstractions.
- [ ] Add safe file and attachment handling.
- [ ] Add image, audio, and voice capability abstractions where interfaces exist.
- [ ] Add privacy-preserving diagnostics and deterministic integration fixtures.
- [ ] Keep ChatJS.md synchronized with every public API change.
- [ ] Keep ChatJS.tar.gz limited to and synchronized with the distributable module.

## P3 — Production readiness

- [ ] Add dependency/license review when third-party packages are introduced.
- [ ] Add API reference generation and documentation checks where useful.
- [ ] Add performance, memory, and concurrency benchmarks with measurable budgets.
- [ ] Add supported-platform checks based on actual implementation requirements.
- [ ] Document maintenance, support, and security-response practices.

## Current position

The repository foundation and initial module scaffold exist, but ChatGPT feature implementation has not started. Next technical work is the source-backed capability inventory and feasibility analysis. Manual GitHub protection and legal review remain repository-owner actions.
