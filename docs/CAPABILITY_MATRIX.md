# ChatJS Capability Matrix

**Current status: foundation only.** Product capabilities below are planned or under research. This matrix is not a claim that they are implemented.

## Status definitions

- **Implemented:** working code, documentation, and passing tests exist.
- **Partial:** a defined subset is implemented; gaps are explicit.
- **Research:** behavior or access path is being investigated.
- **Planned:** desired scope is known; implementation has not started.
- **Blocked:** access, legal, technical, or missing-evidence constraint prevents implementation.
- **Not applicable:** intentionally outside the Node.js module's scope.

## Core runtime

| Capability | Status | Evidence required |
| --- | --- | --- |
| Client construction and lifecycle | Partial | Current tests cover construction, status, and close only |
| Configuration and validation | Planned | Typed schema, safe defaults, validation tests |
| Authentication adapters | Research | Authorized integration contract and security review |
| Session lifecycle | Planned | Expiry, refresh, revocation, and failure tests |
| HTTP transport | Planned | Adapter contract and deterministic tests |
| Streaming transport | Planned | Chunk ordering, cancellation, backpressure, reconnect tests |
| Request cancellation | Planned | AbortSignal propagation and cleanup tests |
| Timeout and retry policies | Planned | Retryability rules and deterministic tests |
| Concurrency and isolation | Planned | Race, isolation, and resource-limit tests |
| Typed errors | Partial | Base error exists; feature-specific taxonomy is not defined |
| Logging and diagnostics | Planned | Structured redacted logs and opt-in hooks |
| Capability registry | Planned | Registration, dependency, lifecycle, and isolation tests |

## Conversations and messages

| Capability | Status | Evidence required |
| --- | --- | --- |
| Create/list/get/archive/delete conversations | Planned | Authorized service contract and integration tests |
| Send messages | Planned | Request/response contract and regression tests |
| Stream assistant responses | Planned | Streaming conformance suite |
| Edit, retry, regenerate, branch, continue | Planned | State-transition tests |
| Message attachments and references | Planned | Upload/download and lifecycle tests |
| Conversation search | Planned | Query and pagination tests |
| Conversation synchronization | Planned | Cursor, duplicate, and consistency tests |
| Feedback and response rating | Research | Documented interface or explicitly unavailable |

## Models and generation

| Capability | Status | Evidence required |
| --- | --- | --- |
| Model catalog and capability discovery | Planned | Live catalog source and freshness policy |
| Model selection and preferences | Planned | Normalized model metadata |
| Generation parameters | Planned | Typed parameters and provider mapping |
| Reasoning controls | Research | Publicly supported fields only |
| Structured outputs | Planned | Schema validation and error tests |
| Usage and quota metadata | Research | Supported source and privacy assessment |

## Tools and external actions

| Capability | Status | Evidence required |
| --- | --- | --- |
| Tool calling and hand-offs | Planned | Typed tool lifecycle and security tests |
| Web search | Research | Authorized integration and source attribution |
| Browser/computer interaction | Research | Supported or user-supplied browser adapter |
| Code execution and data analysis | Research | Sandboxed backend boundary and resource limits |
| File search and retrieval | Planned | Indexing, citations, and deletion tests |
| Connectors and third-party apps | Planned | Authentication, scopes, limits, and connector contract |
| MCP integration | Planned | Protocol and permission tests |

## Multimodal

| Capability | Status | Evidence required |
| --- | --- | --- |
| Image input | Planned | MIME, size, upload, and reference tests |
| Image generation | Research | Authorized interface and output lifecycle |
| Audio input and transcription | Planned | Audio formats and streaming tests |
| Text-to-speech and audio output | Planned | Codec, lifecycle, and interruption tests |
| Real-time voice sessions | Research | Session protocol and latency/concurrency tests |
| Video input and understanding | Research | Frame timing and media constraints |
| Screen sharing and live camera | Research | Platform-independent source interface |
| Other rich media | Research | Evidence-backed schemas and tests |

## Personalization and product features

| Capability | Status | Evidence required |
| --- | --- | --- |
| Saved memory | Research | Read/write/delete contract, user control, privacy |
| Custom instructions | Planned | Typed settings model |
| Projects and project files | Planned | Workspace and file-scoping contract |
| Custom GPTs / specialized assistants | Research | Supported configuration and execution path |
| Tasks and reminders | Research | Scheduling and notification delivery boundary |
| Conversation organization | Planned | Folders, pins, archive, labels where supported |
| User settings | Planned | Typed read/write contract |
| Accessibility preferences | Planned | Settings and behavior tests |
| Language and localization | Planned | Locale and fallback tests |
| Sync across devices | Research | Server-owned state and conflict semantics |

## Platform and maintenance

| Capability | Status | Evidence required |
| --- | --- | --- |
| Node.js ESM and CommonJS | Partial | Foundation entry-point tests |
| TypeScript declarations | Partial | Foundation declarations; full API types pending |
| Windows, macOS, Linux | Planned | CI and runtime compatibility tests |
| Module archive | Partial | Archive content test and CI extraction/load check |
| API documentation | Partial | Root ChatJS.md; expand with real features |

## Tracking rules

For every capability promoted to Partial or Implemented, add source/code links, evidence, tests, supported platforms, known gaps, and the relevant session-history entry. Reassess claims when upstream behavior or access requirements change.
