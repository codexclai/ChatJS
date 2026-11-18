# ChatJS

**ChatJS** is an independent Node.js module inspired by ChatGPT mobile first, with applicable desktop Work and Codex workflows.

> **Current status:** initial foundation only. No ChatGPT-style application features have been implemented yet.
>
> **Integration boundary:** ChatJS does not use OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, or private ChatGPT application backends. It does not access ChatGPT account data.
>
> **Independence:** ChatJS is not affiliated with, endorsed by, or sponsored by OpenAI.

## Product documentation

- [ChatJS.md](ChatJS.md) — canonical documentation for the Node.js module and its actual public API.
- [ChatJS.tar.gz](https://github.com/codexclai/ChatJS/actions) — generated module archive attached to successful CI runs.

## Intended scope

The project targets real Node.js implementations of local conversations/context, projects, safe workspaces and file operations, task orchestration, command/test execution, repository inspection, diffs/review, approval gates, and local artifacts. Voice, image generation/understanding, model reasoning, and autonomous agents require a real non-OpenAI inference engine, which has not been selected.

Health/Health Connect, finance, maps, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions are explicitly out of scope. Node.js does not inherit mobile app permissions.

## Install from GitHub

```bash
npm install github:codexclai/ChatJS
```

CommonJS:
```js
const ChatJS = require('ChatJS');
const client = ChatJS.create();
console.log(client.getStatus());
client.close();
```

ES modules:
```js
import ChatJS from 'ChatJS';
const client = ChatJS.create();
console.log(client.getStatus());
client.close();
```

## Development

Use a currently supported Node.js LTS runtime.

```bash
npm run check
npm run archive
```

The archive is created at dist/ChatJS.tar.gz. CI builds, verifies, smoke-tests, and uploads it as a workflow artifact.

## Repository layout

- src/ — module implementation.
- types/ — TypeScript declarations.
- tests/ — automated tests.
- scripts/ — documentation checks and distribution build.
- ChatJS.md — user/API documentation.
- docs/ — persistent project knowledge, requirements, decisions, tasks, experiments, and history.
- .github/ — focused issue templates and CI/security workflows.

## Project continuity

Every new chat in the ChatJS Project should read [AI Memory](https://github.com/codexclai/ChatJS/tree/main/docs/AI_MEMORY.md), [Continuation Guide](https://github.com/codexclai/ChatJS/tree/main/docs/CONTINUATION.md), and the [Task List](https://github.com/codexclai/ChatJS/tree/main/docs/TODO.md). Search ChatJS Project → Sources for ChatGPT.zip before requesting the Android reference again.

## Quality and privacy

No fake features, filler, bloatware, pointless dependencies, unrelated domains, telemetry, analytics, tracking, hidden collection, phone-home requests, or remote diagnostics. External access must be explicit, configured, authorized, and necessary for the requested operation. All work stays on main; no branches or worktrees are created.

## Rights and security

The public repository carries a proprietary all-rights-reserved notice. Public visibility does not grant permission to reuse or redistribute code. See LICENSE, SECURITY.md and docs/GOVERNANCE.md.
