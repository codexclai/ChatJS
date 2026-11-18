# ChatJS

**ChatJS** is an independent Node.js module project for building a comprehensive, modular, developer-friendly implementation of observable ChatGPT capabilities and workflows.

> **Project status:** repository foundation. ChatGPT feature implementations have not started yet.
>
> **Independence:** ChatJS is not affiliated with, endorsed by, or sponsored by OpenAI. ChatGPT and OpenAI are trademarks of their respective owners.

## Goal

Build ChatJS as a cohesive Node.js library with a carefully designed API, broad capability coverage, streaming and asynchronous workflows, concurrency, cancellation, customization, strong TypeScript support, and excellent documentation.

The target is faithful compatibility with observable ChatGPT behavior wherever supported interfaces and technical and legal boundaries allow. Private services, account entitlements, platform-only functions, and internal application behavior cannot be assumed to be accessible. Do not treat planned features as implemented or claim 1:1 compatibility without repeatable evidence.

## Install from GitHub

The project deliberately has no ChatJS product release numbering or npm-registry publishing workflow. The exact module name is **ChatJS**. Install the public Git repository directly:

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

The current API is a foundation scaffold only. It does not yet connect to ChatGPT or implement product capabilities.

## Repository map

- src/ — runtime implementation; one source of truth for CommonJS and ESM entry points.
- types/ — TypeScript declarations.
- tests/ — built-in Node.js tests.
- scripts/ — documentation generation and validation.
- .project/state.json — structured project state.
- docs/ — architecture, roadmap, capability inventory, decisions, and cross-chat handoff.
- .github/workflows/ — CI, documentation validation, security scanning, and dependency review.

## Development

Use a currently supported Node.js LTS release. The foundation has no third-party runtime dependencies.

```bash
npm run check
```

Read docs/CONTINUATION.md before resuming work. Start at docs/README.md for the documentation index.

## Principles

No generic filler, unnecessary frameworks, bloated dependencies, temporary scaffolding presented as finished work, fake feature support, misleading compatibility claims, or unexplained complexity. Favor deliberate engineering, clean code, a small core, modular capabilities, meaningful tests, honest limitations, and complete human-written documentation.

## Rights and security

The public repository currently carries a proprietary all-rights-reserved notice. Public visibility does not grant permission to reuse or redistribute the code. Read LICENSE, docs/GOVERNANCE.md, and SECURITY.md before reuse or contributions.
