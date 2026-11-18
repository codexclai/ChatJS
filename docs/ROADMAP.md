# ChatJS Roadmap

The roadmap describes intended delivery, not current support. All capability status remains unimplemented until code, tests, documentation, and evidence are present.

## Phase 0 — repository foundation

**Goal:** a clean, secure, maintainable Node.js project ready for feature implementation.

Deliverables:
- Stable repository structure, package metadata, ESM and CommonJS entry points.
- Baseline public types, lifecycle behavior, tests, and CI.
- Security scanning, dependency update automation, release workflow template.
- Documentation system with generated state, task queue, architecture, capability matrix, decisions, and cross-chat handoff.
- Explicit legal, licensing, and independence notices.

**Exit criteria:** CI passes on Node.js 22, 24, and 26; docs are synchronized; legal and repository settings are reviewed.

## Phase 1 — product and compatibility specification

**Goal:** understand the observable feature surface and define a responsible integration strategy.

Deliverables:
- Dated feature inventory across ChatGPT mobile and related product surfaces.
- Evidence tags for official public API, official product documentation, observation, and unknown/private behavior.
- Compatibility-level definitions: native, adapter-backed, user-supplied backend, externally delegated, unavailable.
- Capability contracts, input/output schemas, event contracts, security boundaries, and test plans.
- Feature/plan/platform/region matrix where evidence exists.

**Exit criteria:** every planned feature has a source, owner, feasibility assessment, dependency list, risk assessment, and acceptance criteria.

## Phase 2 — core runtime

**Goal:** establish the shared runtime primitives that every capability uses.

Candidate workstreams:
- Configuration and environment handling.
- Client lifecycle, dependency injection, provider and transport adapters.
- Authentication/session abstraction without hard-coding private login behavior.
- Request scheduling, timeouts, retries, rate limits, and cancellation.
- Typed errors, redaction, diagnostics, telemetry hooks, and structured logging.
- Streaming protocol abstraction, async iterators, events, and backpressure.
- Capability registry and optional plugin lifecycle.

**Exit criteria:** documented stable contracts, deterministic tests, no feature-specific logic leaking into the core.

## Phase 3 — first complete vertical slice

**Goal:** deliver one useful end-to-end workflow before broadening.

Candidate slice: initialize client → establish an authorized service connection → send a message → consume streaming output → cancel or finish → retrieve/update conversation state → handle typed failures.

**Exit criteria:** end-to-end integration tests against a documented and authorized interface; clear configuration and troubleshooting docs; no simulated success path.

## Phase 4 — capability expansion

**Goal:** add independently testable groups of features.

Potential groups include conversations, tools, files, images, audio/voice, model selection, memory, projects, personalization, search, data analysis, and platform integrations. Each group must have explicit dependency and access boundaries.

**Exit criteria:** capability-specific tests, docs, compatibility labels, and regression tests.

## Phase 5 — production hardening

**Goal:** meet operational expectations for a dependable package.

Candidate deliverables:
- Performance, memory, reliability, and concurrency benchmarks.
- Cross-platform compatibility tests and an explicit Node.js support policy.
- API stability, semantic versioning, deprecation, and migrations.
- Release provenance, SBOM, vulnerability response, and install smoke tests.
- Documentation site and versioned API reference.
- Support policy and release cadence.

## Phase 6 — ongoing compatibility maintenance

Track upstream changes, official API additions/deprecations, mobile feature changes, platform differences, and newly exposed capabilities. Update the matrix and tests whenever evidence changes. Never claim a release remains 1:1 without rerunning relevant conformance tests.
