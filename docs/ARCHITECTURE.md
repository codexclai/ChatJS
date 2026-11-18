# ChatJS Architecture

**Status:** initial design guidance. Treat interfaces as provisional until requirements, tests and documentation make them deliberate.

## Goals

- Node.js is the primary runtime.
- Keep the core cohesive, predictable and dependency-light.
- Isolate remote service behavior behind provider and transport adapters.
- Keep optional capabilities modular.
- Make asynchronous, streaming, event, cancellation and error behavior consistent.
- Protect credentials and private user data by default.
- Design for concurrency and deterministic resource cleanup.
- Document and test every supported behavior.
- Never add product telemetry, tracking or hidden data collection.

## Proposed components

### Public API

Client construction, configuration, lifecycle, capability discovery and typed errors. The current source exposes only a minimal foundation and does not implement ChatGPT operations.

### Client and orchestration

Coordinates feature modules and provider adapters. It validates inputs, owns request lifecycles, propagates AbortSignals and manages shared resources. It must not embed undocumented service endpoints.

### Providers and transports

A provider adapter implements an authorized interface or connects to a user-supplied backend. Transport concerns include HTTP, streaming formats, timeouts, retry policies and connection lifecycle. Provider-specific response formats are normalized at the boundary. Network requests must be initiated only for an explicit operation and sent to a documented, configured, authorized service.

### Capability modules

Independent feature groups with explicit dependencies and contracts. Candidate modules include conversations, models, tools, files, images, audio, voice sessions, search, memory, projects, personalization and settings. A module must report unavailable capabilities honestly when no supported integration exists. Do not ship fake, predefined or no-op implementations.

### State and storage

Persistence is opt-in and pluggable. Do not silently persist credentials, prompts, files or conversation content. Define retention, encryption, serialization, migration and deletion behavior before implementing durable storage.

### Privacy and diagnostics

There is no product telemetry: no analytics, metrics collection, tracking, tracing, ads, profiling, phone-home, background reporting, remote diagnostics or telemetry dependencies. Do not collect or transmit usage data. Do not add hidden or unsolicited network calls. Local error information may be exposed to the caller without transmitting it anywhere. The current foundation makes no network requests.

## Contracts to define

- Client lifecycle: initialization, readiness, close and idempotent cleanup.
- Async operations: Promise behavior, AbortSignal support, timeouts, retries and cleanup.
- Streaming: typed events, ordering guarantees, backpressure, cancellation, terminal events and partial failures.
- Errors: stable codes, retryability, causes, safe messages and redaction.
- Concurrency: per-client isolation, request-scoped context, shared-resource ownership and race behavior.
- Compatibility: explicit capability flags and evidence-backed support labels.
- Security: TLS, URL validation, path traversal prevention, upload limits and SSRF controls for network/browser features.

## Node.js compatibility

CI follows the current supported Node.js LTS runtime. Review the policy against the official Node.js release schedule during maintenance.

Prefer stable platform APIs. Avoid unnecessary polyfills and dependencies. Isolate and test runtime-specific behavior.

## Module organization

The design should support:
- a minimal core;
- optional feature modules;
- optional transport and storage adapters;
- explicit capability discovery;
- clear dependencies and peer dependencies;
- ESM and CommonJS parity;
- TypeScript declarations matching actual runtime behavior.

## Public API criteria

Do not freeze a large guessed API surface. Start with a complete vertical slice. Promote methods to stable public behavior only after requirements, success/failure semantics, types, ESM/CommonJS tests, cancellation/concurrency tests and user documentation are in place.

## Explicit boundary

ChatGPT's mobile client may use private services, application-only credentials, account entitlements or platform integrations that a third-party Node.js package cannot lawfully or technically reproduce. ChatJS must use supported alternatives or document limitations rather than bypass controls or fabricate equivalent behavior.