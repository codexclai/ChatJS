# ChatJS

**ChatJS** is a general-purpose Node.js module intended to bring together the real client-side systems and workflows of official ChatGPT mobile and ChatGPT desktop (including Work and Codex) in one reusable package.

The purpose is to adapt the actual ChatGPT client behavior to Node.js—not merely list familiar features or substitute a different model service. ChatJS does not recreate ChatGPT's server. It is an independent project, not affiliated with or endorsed by OpenAI.

> **Current implementation:** foundation only. The repository currently provides module entry points, a minimal client lifecycle, a base error, TypeScript declarations, and a generic bounded/cancellable SSE parser. The actual ChatGPT client integration and the broader workflows remain to be implemented.

## Product direction

ChatJS is one package usable from different Node.js applications, operating systems, hosts, devices, and deployment environments. It is not itself a specific mobile or desktop app, and it must not assume a particular camera, microphone, screen, browser, or OS API exists.

Use the actual supplied application package contents as the engineering reference: shipped JavaScript and compiled modules, request/response construction, payload schemas, serialization, transport, connection and authentication/session flows, local persistence, tools, dependencies, and resources. Client interfaces evidenced by the application code must not be dismissed merely because public developer documentation does not describe them. The target is the real consumer ChatGPT experience, not OpenAI Platform API/key integration or a replacement model provider.

Optional host-specific facilities belong behind integrations so consumers can use the portable package without particular hardware or OS capabilities.

## Reference packages

The official Android XAPK, the two sequential Windows MSIX parts, and the pinned official CodexCLI.zip source snapshot are retained in **ChatJS Project → Sources**. That is the normal and primary location for supplied source packages. Keep those third-party packages out of public Git.

The Codex repository is an engineering reference only. ChatJS must implement direct ChatGPT HTTP/WebSocket/SSE client behavior itself; it does not require Codex CLI, a running app-server, or an embedded app-server runtime. See [Codex source findings](docs/CODEX_SOURCE_FINDINGS.md).

The owner has clarified that Windows ChatGPT desktop Work uses local execution, while Android ChatGPT Work uses cloud execution. Keep those paths separate. The Android package contains first-party accountless/guest session evidence; exact anonymous conversation routing is still under investigation. Windows desktop guest Work is not verified. See [the Android protocol findings](docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md) and [the desktop reference](docs/REFERENCE_DESKTOP.md).

## Current API

Install from GitHub:

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

These examples exercise the foundation only; they do not imply that the ChatGPT connection or planned workflows are already implemented. The generic ChatJS.parseServerSentEvents parser is available but does not perform network requests or decode ChatGPT-specific events.

## Development

Use a supported Node.js LTS runtime.

```bash
npm run check
npm run archive
```

CI checks the project, builds and verifies `dist/ChatJS.tar.gz`, extracts it, smoke-tests CommonJS/ESM loading, and uploads it as a workflow artifact.

## Repository layout

- `src/` — module implementation.
- `types/` — TypeScript declarations.
- `tests/` — automated tests.
- `scripts/` — checks and the module archive builder.
- `ChatJS.md` — canonical user/API manual.
- `docs/` — persistent engineering memory and technical records.
- `.github/` — focused CI and security workflows.

## Project continuity

Start future work with [AI Memory](docs/AI_MEMORY.md), [Continuation](docs/CONTINUATION.md), and [TODO](docs/TODO.md). Use the [Android extracted-payload reference](docs/REFERENCE_APK.md) and [Windows desktop reference](docs/REFERENCE_DESKTOP.md) as technical evidence. Keep observed client code separate from completed analysis and tested Node.js behavior.

## Engineering, privacy and rights

No fake features, filler, bloat, unjustified dependencies, telemetry, tracking, hidden collection, phone-home, or remote diagnostics. Do not make unsolicited network requests or upload content automatically. Protect user data and credentials, and preserve legitimate account authentication and authorization. All Git work stays on `main`; never create branches or worktrees.

The public repository carries a proprietary all-rights-reserved notice. Public visibility does not grant permission to reuse or redistribute code. See `LICENSE`, `SECURITY.md`, and `docs/GOVERNANCE.md`.