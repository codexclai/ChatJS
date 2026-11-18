# ChatJS

**ChatJS** is an independent Node.js module inspired by ChatGPT mobile first, with applicable desktop Work and Codex workflows.

> **Current status:** initial foundation only. No ChatGPT-style application features have been implemented yet.
>
> **Integration boundary:** no OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private ChatGPT backends, or ChatGPT account access.
>
> **Independence:** ChatJS is not affiliated with, endorsed by, or sponsored by OpenAI.

## Intended scope
Real Node.js implementations of local conversations/context, projects, confined workspaces/files, task orchestration, command/test execution, repository inspection, diffs/review, approvals and local artifacts. Voice, image understanding/generation, reasoning and autonomous agents require a real non-OpenAI inference engine, which is not selected.

Health/Health Connect, finance, maps, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions are out of scope. Node.js does not inherit mobile permissions.

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
Use a supported Node.js LTS runtime.

```bash
npm run check
npm run archive
```

CI builds, verifies, extracts, smoke-tests and uploads dist/ChatJS.tar.gz as a workflow artifact.

## Repository layout
- src/ — module implementation.
- types/ — TypeScript declarations.
- tests/ — automated tests.
- scripts/ — checks and archive builder.
- ChatJS.md — canonical user/API manual.
- docs/ — persistent project knowledge and engineering memory.
- .github/ — focused issue templates and CI/security workflows.

## Project continuity
Every new ChatJS session should read [AI Memory](https://github.com/codexclai/ChatJS/blob/main/docs/AI_MEMORY.md), [Continuation Guide](https://github.com/codexclai/ChatJS/blob/main/docs/CONTINUATION.md), and [TODO](https://github.com/codexclai/ChatJS/blob/main/docs/TODO.md).

Use the committed [Android reference](https://github.com/codexclai/ChatJS/blob/main/docs/REFERENCE_APK.md) and [Windows desktop reference](https://github.com/codexclai/ChatJS/blob/main/docs/REFERENCE_DESKTOP.md). The owner intends to clear Project Sources; do not request the original binaries merely to repeat completed inspection. Do not claim deletion until confirmed.

## Quality, privacy and rights
No fake features, filler, bloatware, unjustified dependencies, unrelated domains, telemetry, tracking, hidden collection, phone-home or remote diagnostics. External access must be explicit, configured, authorized and necessary. All Git work stays on main; never create/delete/switch branches or worktrees.

The public repository carries a proprietary all-rights-reserved notice. Public visibility does not grant permission to reuse or redistribute code. See LICENSE, SECURITY.md and docs/GOVERNANCE.md.
