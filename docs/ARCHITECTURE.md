# ChatJS Architecture

**Status:** initial architecture principles, not a frozen implementation specification. Public interfaces must be reviewed through explicit decisions and tests before they are considered stable.

## Design objectives

1. Make Node.js the primary and complete runtime, not a browser UI disguised as a package.
2. Keep the core small, deterministic, and dependency-light.
3. Isolate service-specific behavior behind adapters.
4. Let optional capabilities be installed or omitted without forcing a monolith.
5. Provide consistent asynchronous, streaming, event, cancellation, and error semantics.
6. Keep user credentials and conversation data private by default.
7. Design for concurrency and cleanup from the beginning.
8. Make all supported behavior observable, testable, and documented.

## Proposed layers

### Public API layer

A stable entry point for client construction, configuration, lifecycle, capability discovery, and typed errors. The current source exposes only a minimal foundation and does not yet implement ChatGPT operations.

### Client and orchestration layer

Coordinates capability modules and provider adapters. It should validate inputs, own request lifecycles, propagate AbortSignals, and manage shared resources. It must not embed undocumented service endpoints.

### Provider and transport adapters

Adapters encapsulate an authorized remote interface or user-supplied backend. Transport concerns include fetch, HTTP, streaming formats, retry policy, and connection lifecycle. Provider-specific response formats are normalized at the boundary.

### Capability modules

Feature groups should be independent modules with explicit dependencies and contracts. Candidate modules include conversations, models, tools, files, images, audio, voice sessions, search, memory, projects, personalization, and settings. A module may declare itself unavailable when no supported integration exists.

### State and storage adapters

Persistence is opt-in and pluggable. Avoid silently persisting tokens, prompts, files, or conversation content. Define retention, encryption, serialization, migration, and deletion semantics before implementing durable storage.

### Observability layer

Structured diagnostics, metrics, tracing hooks, and logs should be opt-in or privacy-preserving. Redact credentials and sensitive content. Avoid collecting raw user prompts or outputs by default.

## Cross-cutting contracts to specify

- Client lifecycle: initialization, readiness, close, idempotent cleanup.
- Async operations: Promise behavior, AbortSignal support, timeouts, retries, and cleanup.
- Streaming: typed events, ordering guarantees, backpressure, cancellation, terminal events, and partial failures.
- Errors: stable codes, retryability, causes, safe messages, and redaction.
- Concurrency: per-client isolation, request-scoped context, shared resource ownership, and race behavior.
- Compatibility: explicit capability flags and evidence-backed support labels.
- Security: secret storage, TLS, URL validation, path traversal prevention, upload limits, and SSRF controls for any fetch/browser feature.

## Node.js compatibility

CI tracks the current supported Node.js LTS runtime dynamically. The support target is reviewed against the official Node.js release schedule during maintenance rather than frozen to a ChatJS-specific runtime number.

Use platform-native APIs where stable and appropriate. Avoid unnecessary polyfills and dependencies. Any runtime-specific behavior must be isolated and tested.

## Module design

The long-term architecture should allow:
- Core-only installation.
- Optional feature modules.
- Optional transport and storage adapters.
- Feature registry and capability introspection.
- Clear dependency and peer-dependency declarations.
- Tree-shakable ESM exports where appropriate.
- CommonJS compatibility without maintaining two divergent implementations.

## Public API stability

Do not freeze a large guessed API surface. Start with one complete vertical slice. Promote methods and types to stable only after:
1. requirements and evidence are written;
2. success and failure semantics are defined;
3. TypeScript declarations match runtime behavior;
4. ESM and CommonJS tests pass;
5. tests cover cancellation, concurrency, cleanup, and failure cases relevant to the method;
6. docs and examples have been reviewed.

## Explicit boundary

ChatGPT's mobile client may use private services, application-only credentials, entitlement checks, or platform integrations that a third-party Node.js package cannot lawfully or technically reproduce. ChatJS must expose supported alternatives or document those limitations rather than bypassing controls or fabricating equivalent behavior.
