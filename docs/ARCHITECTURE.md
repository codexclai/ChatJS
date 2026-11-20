# ChatJS Architecture

**Status:** initial design guidance. Interfaces remain provisional until requirements, tests, documentation, and evidence make them deliberate.

## Product identity

ChatJS is one comprehensive, general-purpose Node.js module intended to bring together the actual client-side systems and workflows of official ChatGPT mobile and ChatGPT desktop (including Work and Codex). It is not a standalone ChatGPT clone, a device-specific app, or a recreation of ChatGPT's server.

The intended product integrates with real ChatGPT client/service behavior. The official APK/MSIX packages are the implementation references: use their shipped JavaScript/compiled modules, payload schemas, request/response construction, transport, connection/auth/session flows, persistence, tools, and other client components. Do not discard client behavior merely because public developer documentation does not describe it. Server-side implementation that is not shipped in the client is not required to reproduce client behavior.

Current ChatJS runtime remains foundation-only. No planned workflow may be described as implemented until real Node.js code and end-to-end evidence exist.

## Goals

- Node.js only, with ESM, CommonJS, and accurate TypeScript declarations.
- One modular package for mobile and desktop client workflows.
- Actual ChatGPT client/service behavior rather than Platform API substitution or fabricated model output.
- Portable core APIs usable from different applications, hosts, operating systems, and deployment environments.
- Optional host integrations for camera, microphone, screen, browser, desktop controls, or other environment-specific facilities.
- Standardized async operations, events, cancellation, limits, errors, backpressure, and cleanup.
- Protect local files, account credentials, session state, and user data.
- Zero telemetry, hidden collection, and unsolicited network activity.

## Capability layers

### ChatGPT client integration

A dedicated integration layer should adapt the real client-side behavior found in the supplied application packages to Node.js. The investigation/implementation should cover, where evidenced in the clients:
- request and response construction, payload schemas, serialization, and parsing;
- connection establishment, transport, streaming, retries, and error semantics;
- legitimate account sign-in, authentication, session lifecycle, and token/cookie handling;
- conversation, project, file, voice, image, search, tool, and task flows;
- local/client persistence and relevant state synchronization.

Treat the source packages as primary evidence. Public developer documentation is not the sole criterion for whether a client-side interface exists. The server implementation is not part of the intended scope; the goal is to reproduce the client behavior from the client side.

All network requests must be part of explicit ChatJS operations. Preserve user authorization, account protections, and access controls. Do not hardcode, log, or commit credentials/session material. No fake output or substitute inference model.

### Portable Node.js core

The portable core should provide reusable primitives for:
- clients, conversations, threads, context, and projects;
- explicit local instructions and profiles;
- file/attachment ingestion and local processing;
- async streaming and cancellation;
- task lifecycle, progress, approval state, and cleanup;
- workspace and filesystem operations;
- process/test execution with policy controls;
- Git inspection, diffs, review, and local artifact generation.

### Optional host integrations

Browser automation, desktop interaction, microphone, camera, screen capture, notifications, and similar facilities are not universal properties of Node.js. Expose them as optional integrations only when the consuming host supplies the relevant mechanism. The core must not assume a device, OS, UI, camera, microphone, or permission model.

## Local workspace contract to define

Before implementing file access:
- require an explicit caller-selected root;
- accept relative paths only and prevent traversal;
- define symlink/junction behavior and concurrent-mutation limits;
- bound file size, depth, item count, and concurrent operations;
- distinguish files, directories, special files, and unavailable paths;
- support cancellation and deterministic cleanup;
- make writes explicit, conflict-aware, and atomic where supported;
- never recursively delete by default;
- test traversal, symlink escape, oversized files, permissions, cancellation, concurrent mutation, and module parity.

## Command execution contract to define

Before command execution:
- no shell by default;
- executable and argv are separate validated inputs;
- working directory is confined to an approved workspace;
- environment inheritance and redaction are explicit;
- command policy/approval is required;
- enforce timeout, cancellation, output limits, process-tree cleanup, concurrency caps, and exit semantics;
- no hidden/background execution.

## Storage and privacy

Persistence must be explicit and have clear retention/deletion semantics. Protect account authentication/session data. Do not silently store or transmit prompts, files, credentials, or conversations. No analytics or telemetry. Network activity is allowed only as a genuine part of the explicitly invoked ChatGPT client integration or a separately configured adapter—not as background phone-home behavior.

## Explicit non-goals

- Recreating ChatGPT's server-side infrastructure.
- Substituting OpenAI Platform API/key workflows for the consumer ChatGPT client integration.
- Fake generated output or a different model provider masquerading as ChatGPT.
- Health, finance, maps, shopping, wallet, contacts, calendar, telephony, unrelated Android permissions.
- Git branches/worktrees or automation that creates them.
- Telemetry, hidden collection, unsolicited network requests, or automatic content uploads.
