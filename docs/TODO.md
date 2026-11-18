# ChatJS Task Queue

This is the live prioritized work queue. Keep tasks small enough to verify. Mark items complete only after the repository contains the implementation and its tests.

## P0 — unblock safe project execution

- [ ] Apply GitHub repository About metadata, topics, and the manual protection/security settings in [REPOSITORY_SETTINGS.md](REPOSITORY_SETTINGS.md).
- [ ] Confirm the actual legal rights holder and obtain legal review of the proprietary all-rights-reserved notice.
- [ ] Decide whether the project will remain proprietary or adopt a recognized open-source license before inviting contributors.
- [ ] Confirm control of the npm scope and availability of the proposed package name; do not publish until verified.
- [ ] Configure npm Trusted Publishing (OIDC) for the exact GitHub repository and release workflow after the package has been created on npm.
- [ ] Confirm the repository's security reporting options, secret scanning, push protection, and branch protections are enabled.

## P1 — establish an evidence-backed specification

- [ ] Create a versioned, source-backed ChatGPT mobile capability inventory with dated references.
- [ ] Separate features observable in the Android reference from features available through supported public interfaces.
- [ ] Document account requirements, plan gating, regional limits, platform differences, and unavailable/private backend dependencies.
- [ ] Define product terminology, compatibility levels, and a repeatable conformance-test format.
- [ ] Review current official OpenAI platform documentation and API/service terms before designing any integration.
- [ ] Define non-goals and explicit constraints for features that cannot be provided directly by a Node.js module.

## P1 — design the first stable runtime

- [ ] Write API requirements for configuration, client lifecycle, authentication adapters, transport adapters, and provider interfaces.
- [ ] Specify streaming event names, payloads, ordering, backpressure, cancellation, timeouts, and reconnect behavior.
- [ ] Specify normalized error types, error codes, retryability, and redaction behavior.
- [ ] Design concurrency, request isolation, rate-limit handling, and resource cleanup.
- [ ] Decide whether persistence, caches, and storage adapters are in core or optional modules.
- [ ] Add TypeScript declaration tests and ESM/CommonJS interoperability tests.

## P2 — implement in vertical slices

- [ ] Implement configuration and client lifecycle beyond the current scaffold.
- [ ] Implement an authorized transport/provider adapter against a documented interface.
- [ ] Implement the first conversation and message workflow with streaming and cancellation.
- [ ] Add normalized models, tools, and capability discovery.
- [ ] Add attachment and file abstractions with safe size, MIME, path, and lifecycle rules.
- [ ] Add observability hooks with redaction and opt-in diagnostics.
- [ ] Add an integration test harness with deterministic fixtures.

## P3 — operational maturity

- [ ] Add release notes automation, SBOM generation, provenance verification, and package install smoke tests.
- [ ] Add API reference generation and versioned docs.
- [ ] Add performance and memory benchmarks with regression budgets.
- [ ] Add a compatibility matrix across supported Node.js LTS lines and relevant operating systems.
- [ ] Add deprecation and migration policies.
- [ ] Add maintainership, issue triage, and release checklists.

## Work-in-progress

No feature implementation has started. The next safe unit is to apply the pending GitHub repository protections and legal/package namespace prerequisites, then write the evidence-backed capability specification.
