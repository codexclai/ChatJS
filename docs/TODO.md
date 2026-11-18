# ChatJS Task Queue

This is the live prioritized work queue. Keep tasks actionable. Mark items complete only after the repository contains the implementation and its tests.

## P0 — finish the repository foundation

- [ ] Apply GitHub repository About metadata, topics, and manual protection/security settings in [REPOSITORY_SETTINGS.md](REPOSITORY_SETTINGS.md).
- [ ] Confirm the actual legal rights holder and obtain legal review of the proprietary all-rights-reserved notice.
- [ ] Decide whether the project will remain proprietary or adopt a recognized license before inviting contributors.
- [ ] Confirm private vulnerability reporting, secret scanning, push protection, and branch protection are enabled where available.

## P1 — evidence-backed specification

- [ ] Search the ChatJS Project's Sources in ChatGPT for the user-supplied ChatGPT.zip and inspect its feature surfaces when the APK is available in the current environment.
- [ ] Create a source-backed ChatGPT mobile capability inventory with dated public references and carefully separated observations.
- [ ] Separate features visible in the Android reference from features available through supported public interfaces.
- [ ] Document account requirements, plan gating, regional limits, platform differences, and unavailable/private backend dependencies.
- [ ] Define compatibility labels: native, adapter-backed, user-supplied backend, externally delegated, and unavailable.
- [ ] Review current official OpenAI platform documentation and terms before designing any integration.
- [ ] Define explicit non-goals and constraints for features that cannot be provided directly by a Node.js module.

## P1 — design the first stable runtime

- [ ] Write API requirements for configuration, client lifecycle, authorized service adapters, transport, and provider interfaces.
- [ ] Specify streaming events, payloads, ordering, backpressure, cancellation, timeout, and reconnect behavior.
- [ ] Specify normalized errors, stable codes, retryability, causes, and redaction.
- [ ] Design concurrency, request isolation, rate-limit handling, and resource cleanup.
- [ ] Decide whether persistence, caches, and storage adapters belong in core or optional modules.
- [ ] Add TypeScript declaration tests.

## P2 — implement in complete vertical slices

- [ ] Implement configuration and client lifecycle beyond the current foundation.
- [ ] Implement an authorized transport/provider adapter against a documented interface.
- [ ] Implement a complete conversation and message workflow with streaming and cancellation.
- [ ] Add normalized model discovery and tool invocation abstractions.
- [ ] Add file and attachment abstractions with safe MIME, size, path, and lifecycle rules.
- [ ] Add privacy-preserving observability and deterministic integration fixtures.

## P3 — production quality

- [ ] Add dependency/license reporting when external dependencies are introduced.
- [ ] Add API reference generation and documentation quality checks.
- [ ] Add performance and memory benchmarks with clear budgets.
- [ ] Add operating-system compatibility checks where relevant.
- [ ] Add maintainer, issue triage, and security-response procedures.

## Current work

No ChatGPT feature implementation has started. The next technical task is the evidence-backed capability specification. Manual GitHub protections and legal review remain repository-owner tasks.
