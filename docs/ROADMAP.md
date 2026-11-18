# ChatJS Roadmap

This roadmap describes intended work, not current support. A feature is supported only when implementation, documentation, tests, and evidence exist.

## Repository and module foundation

**Goal:** establish a clean, secure, maintainable Node.js project ready for feature work.

Deliverables:
- ChatJS module with ESM and CommonJS entry points.
- TypeScript declarations and built-in tests.
- Conventional source, test, type, and documentation layout.
- CI, documentation validation, and security checks.
- Root ChatJS.md for module users.
- A clean ChatJS.tar.gz module archive, verified and uploaded by CI.
- Shared project memory, decisions, tasks, experiments, and cross-chat history.

## Product and compatibility research

**Goal:** understand the observable feature surface and choose safe, supported implementation paths.

Deliverables:
- Dated inventory of ChatGPT mobile capabilities.
- Evidence labels for official API, product documentation, observed UI behavior, and inaccessible/private behavior.
- Compatibility classifications for local implementation, public-interface adapters, user-owned backends, external delegation, and unavailable features.
- Capability contracts, event schemas, security boundaries, dependencies, and acceptance criteria.
- Account, plan, region, and platform limitations where evidence exists.

## Core runtime

**Goal:** establish shared primitives used by all capabilities.

Work areas:
- Configuration and environment handling.
- Client lifecycle and provider/transport adapters.
- Authorized authentication abstraction.
- Request scheduling, timeouts, retries, rate limits, and cancellation.
- Typed errors, redaction, diagnostics, and local diagnostics with no telemetry or remote reporting.
- Streaming protocol abstraction, async iterators, events, and backpressure.
- Capability discovery and optional module lifecycle.

## First complete workflow

**Goal:** deliver one useful end-to-end workflow before broadening the feature surface.

Candidate: initialize client → connect through an authorized interface → send a message → consume streaming output → cancel or finish → manage conversation state → handle typed failures.

Acceptance requires integration tests against a documented and authorized interface, clear setup/troubleshooting docs, and no simulated success path.

## Capability expansion

Build independently testable groups such as conversations, models, tools, files, images, audio/voice, search, data analysis, memory, projects, personalization, settings, and platform adapters. Every group must have explicit dependencies and access boundaries.

## Production readiness

Focus on measured performance, memory, concurrency, reliability, supported platforms, security response, dependency governance, API documentation, and reproducible checks.

## Ongoing compatibility maintenance

Track upstream behavior and official interface changes. Update the capability matrix and tests when evidence changes. Never claim broad compatibility without rerunning relevant conformance tests.
