# ChatJS Capability Matrix

**Current overall status: foundation only.** Every product capability below is planned or needs research. Nothing in this matrix should be interpreted as implemented support.

## Status vocabulary

- **Implemented:** working code, documented behavior, and passing tests exist.
- **Partial:** a specific subset is implemented and the gaps are listed.
- **Research:** behavior and access path are being investigated.
- **Planned:** desired scope is identified, but design or implementation has not started.
- **Blocked:** a known dependency, access boundary, legal issue, or missing interface prevents implementation.
- **Not applicable:** intentionally outside the Node.js module's scope.

## Core runtime

| Capability | Status | Acceptance evidence |
| --- | --- | --- |
| Client construction and lifecycle foundation | Partial | Current tests cover construction, status, and close only |
| Configuration and validation | Planned | Typed schema, safe defaults, and validation tests |
| Authentication adapters | Research | Authorized integration contract and security model |
| Session lifecycle | Planned | Expiry, refresh, revocation, and failure tests |
| HTTP transport | Planned | Adapter contract and deterministic tests |
| Streaming transport | Planned | Chunk ordering, cancellation, backpressure, and reconnect tests |
| Request cancellation | Planned | AbortSignal propagation and cleanup tests |
| Timeout and retry policies | Planned | Retryability matrix and deterministic clock tests |
| Concurrency and isolation | Planned | Race, isolation, and resource-limit tests |
| Typed errors | Partial | Base error type exists; feature error taxonomy is not defined |
| Logging and diagnostics | Planned | Structured redacted logs and opt-in hooks |
| Plugin/capability registry | Planned | Registration, dependency, lifecycle, and isolation tests |

## Conversations and messages

| Capability | Status | Acceptance evidence |
| --- | --- | --- |
| Create/list/get/archive/delete conversations | Planned | Authorized service contract and integration tests |
| Send messages | Planned | Request/response contract and regression tests |
| Stream assistant responses | Planned | Streaming conformance suite |
| Edit, retry, regenerate, branch, and continue | Planned | State-transition matrix |
| Message attachments and references | Planned | Upload/download and lifecycle tests |
| Conversation search | Planned | Query behavior and pagination tests |
| Conversation sync and pagination | Planned | Cursor, duplicate, and consistency tests |
| Feedback and response rating | Planned | Documented interface or explicitly unavailable status |

## Models and generation

| Capability | Status | Acceptance evidence |
| --- | --- | --- |
| Model catalog and capability discovery | Planned | Live catalog source and freshness policy |
| Model selection and preferences | Planned | Normalized model metadata |
| Generation parameters | Planned | Type-safe parameters and provider mapping |
| Reasoning controls | Research | Publicly supported fields only |
| Structured outputs and JSON modes | Planned | Schema validation and error tests |
| Usage and quota metadata | Research | Supported source and privacy assessment |

## Tools and external actions

| Capability | Status | Acceptance evidence |
| --- | --- | --- |
| Tool calling and hand-offs | Planned | Typed tool lifecycle and security tests |
| Web search | Research | Authorized integration and source attribution |
| Browser/computer interaction | Research | Supported connector or user-supplied browser adapter |
| Code execution / data analysis | Research | Sandboxed backend boundary and resource limits |
| File search / retrieval | Planned | Indexing, citation, and data deletion tests |
| Connectors and third-party apps | Planned | Auth, scopes, rate limits, and per-connector contract |
| MCP integration | Planned | Protocol and permission boundaries |

## Multimodal

| Capability | Status | Acceptance evidence |
| --- | --- | --- |
| Image input | Planned | MIME, size, upload, and reference tests |
| Image generation | Research | Authorized service interface and output lifecycle |
| Audio input and transcription | Planned | Audio format and streaming tests |
| Text-to-speech and audio output | Planned | Codec and interruption tests |
| Real-time voice sessions | Research | Session protocol and latency/concurrency suite |
| Video input and understanding | Research | Frame timing and media constraints |
| Screen sharing and live camera | Research | Platform-independent source interface |
| Spatial or other rich media | Research | Evidence-backed schema and tests |

## Personalization and product features

| Capability | Status | Acceptance evidence |
| --- | --- | --- |
| Saved memory | Research | Read/write/delete contract, user control, privacy |
| Custom instructions | Planned | Typed settings model |
| Projects and project files | Planned | Workspace and file-scoping contract |
| Custom GPTs / specialized assistants | Research | Publicly supported configuration and execution path |
| Tasks and reminders | Research | Scheduling and notification delivery boundary |
| Conversation organization | Planned | Folders, pins, archive, and labels where supported |
| User settings | Planned | Typed read/write schema |
| Accessibility preferences | Planned | Settings and behavior conformance |
| Language and localization | Planned | Locale and fallback tests |
| Sync across devices | Research | Server-owned state and conflict semantics |

## Platform and operations

| Capability | Status | Acceptance evidence |
| --- | --- | --- |
| Node.js ESM and CommonJS | Partial | Foundation entry-point tests |
| TypeScript types | Partial | Foundation declarations; full API types pending |
| Windows, macOS, and Linux | Planned | CI and runtime compatibility tests |
| Package size and dependency budgets | Planned | Measured packed size and dependency policy |
| API documentation | Planned | Generated reference and docs quality checks |

## Tracking rules

For every row promoted to Partial or Implemented, update the code links, source/evidence, test references, supported platforms, known gaps, and relevant commit references. Re-evaluate claims whenever upstream behavior or access requirements change.
