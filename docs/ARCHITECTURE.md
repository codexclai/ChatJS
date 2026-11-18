# ChatJS Architecture

**Status:** initial design guidance. Interfaces remain provisional until requirements, tests and documentation make them deliberate.

## Product identity and boundaries

ChatJS is an independent Node.js module inspired by ChatGPT mobile first and applicable desktop Work/Codex capabilities. It does not connect to OpenAI Platform APIs, use OpenAI API keys/OAuth, call private ChatGPT endpoints, or reuse ChatGPT credentials/session state.

The ChatGPT applications are product references, not ChatJS dependencies. ChatJS-owned conversations, projects, memory, tasks and files are distinct from the user's ChatGPT account data.

## Goals

- Node.js only, with ESM, CommonJS and accurate TypeScript declarations.
- Prioritize useful mobile-inspired context/conversation features and desktop local Work/Codex workflows.
- Keep core cohesive, predictable, dependency-light and platform-neutral.
- Isolate platform-specific operations behind explicit adapters.
- Standardize async operations, events, cancellation and errors.
- Protect local files, commands and private user data by default.
- Deterministic cleanup, no telemetry, no hidden data collection.
- No fake model output or unsupported compatibility claims.

## Capability layers

### Local Node.js core
Candidate capabilities that do not require a generative model:
- caller-selected workspace roots;
- bounded file listing, reading, writing and search;
- local project instructions and opt-in memory;
- task lifecycle, progress events, cancellation and approval state;
- process execution with explicit executable/argv, policies, timeouts and output limits;
- Git status/diff/log inspection without branch/worktree changes;
- local artifact generation with tested formats;
- opt-in scheduling only while a caller-managed host process/service is active.

### Inference-dependent features
Natural-language generation, reasoning, summarization, code authoring/review, voice conversation, image understanding/generation, and autonomous agent decisions require a real inference engine. None is selected. OpenAI APIs/keys/OAuth and private ChatGPT endpoints are excluded. Do not simulate these features.

### Platform adapters
Microphone, camera, screen capture, desktop application control, notifications and browser automation need host-specific mechanisms and explicit permissions. They are not automatically available to Node.js. No native Android companion app is in current scope.

### Separately authorized adapters
Future third-party connectors or ChatJS-owned remote-host adapters need documented protocols, explicit configuration, least-privilege scopes, approvals, cancellation and cleanup. They must not reuse ChatGPT app integrations or credentials.

## Local workspace contract to define

Before implementing file access:
- require an explicit caller-selected canonical root;
- accept relative paths only and prevent traversal;
- define symlink/junction behavior and local concurrent-mutation threat model;
- bound file size, depth, item count and concurrent operations;
- distinguish files, directories, special files and unavailable paths;
- support cancellation and deterministic handle cleanup;
- make writes explicit, conflict-aware and atomic where supported;
- never recursively delete by default;
- test traversal, symlink escape, oversized files, permissions, cancellation, concurrent mutation and module parity.

## Command execution contract to define

Before Codex-style command execution:
- no shell by default;
- executable and argv are separate validated inputs;
- working directory is confined to an approved workspace;
- environment inheritance and redaction are explicit;
- command policy/approval is required;
- enforce timeout, cancellation, output-byte limits, process-tree cleanup, concurrency caps and exit semantics;
- no background execution as a side effect.

## Task lifecycle

Long tasks need explicit states, progress, cancellation and approval waits. Scheduling is opt-in and caller-managed. A stopped Node.js process cannot continue a task. Do not promise ChatGPT Work sync, Codex Cloud, or ChatGPT Remote sessions.

## Storage and privacy

Persistence is opt-in and local by default. Do not silently store credentials, prompts, files or conversations. Define retention, encryption, serialization, migration and deletion before durable storage. No usage data is collected or transmitted.

## Explicit non-goals

- OpenAI Platform/API or Sign in with ChatGPT auth.
- ChatGPT private endpoint/session integration.
- ChatGPT account chats, account memory, Projects, custom GPTs, Work sessions, Codex sessions or Codex Cloud.
- Health, finance, maps, shopping, wallet, contacts, calendar, telephony, unrelated Android permissions.
- Git branches/worktrees or automation that creates them.
- Telemetry, hidden collection, unsolicited network calls, or fake model behavior.
