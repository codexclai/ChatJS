# ChatJS

**ChatJS** is an independent Node.js module for building a comprehensive, modular implementation of observable ChatGPT capabilities and workflows.

> **Current status:** foundation scaffold. ChatGPT feature integrations have not started.
>
> **Independence:** ChatJS is not affiliated with, endorsed by, or sponsored by OpenAI.

## Product documentation

- [ChatJS.md](ChatJS.md) — canonical documentation for the Node.js module and its public API.
- [ChatJS.tar.gz](https://github.com/codexclai/ChatJS/actions) — generated module archive attached to successful CI runs as a downloadable workflow artifact.

## Goal

Build ChatJS as a cohesive Node.js library with a consistent API, broad capability coverage, streaming and asynchronous workflows, concurrency, cancellation, customization, TypeScript support, and complete documentation.

Compatibility must be supported by evidence. Private services, account entitlements, platform-only functions, and internal application behavior cannot be assumed to be accessible. Do not treat planned features as implemented.

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
```

Build the module archive:

```bash
npm run archive
```

This creates `dist/ChatJS.tar.gz`. CI builds, verifies, smoke-tests, and uploads the archive as a workflow artifact.

## Repository layout

- `src/` — module implementation.
- `types/` — TypeScript declarations.
- `tests/` — automated tests.
- `scripts/` — documentation checks and distribution build.
- `ChatJS.md` — module/API documentation.
- `docs/` — persistent project knowledge, AI memory, tasks, decisions, experiments, and history.
- `.github/` — issue templates, dependency automation, and CI/security workflows.

## Project continuity

Every new chat in the ChatJS Project should read the repository's [AI Memory](https://github.com/codexclai/ChatJS/tree/main/docs/AI_MEMORY.md) and [Continuation Guide](https://github.com/codexclai/ChatJS/tree/main/docs/CONTINUATION.md), inspect the live repository, and resume from the [Task List](https://github.com/codexclai/ChatJS/tree/main/docs/TODO.md). Search ChatJS Project → Sources for `ChatGPT.zip` before requesting the Android reference again.

## Quality principles

No generic filler, bloatware, pointless dependencies, temporary scaffolding presented as finished work, fake feature support, or misleading compatibility claims. Favor deliberate engineering, a clean core, meaningful tests, and clear human-written documentation.

## Rights and security

The public repository currently carries a proprietary all-rights-reserved notice. Public visibility does not grant permission to reuse or redistribute the code. See [LICENSE](LICENSE), [SECURITY.md](SECURITY.md), and [Governance](https://github.com/codexclai/ChatJS/tree/main/docs/GOVERNANCE.md).
