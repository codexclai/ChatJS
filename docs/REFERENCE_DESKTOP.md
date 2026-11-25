# ChatGPT Desktop Reference — Windows Client Package

## Current source

The official Windows x64 installer is retained in **ChatJS Project → Sources** as two sequential parts:

- `ChatGPT-Windows.msix.part001` — 400,000,000 bytes.
- `ChatGPT-Windows.msix.part002` — 396,523,063 bytes.

They are byte chunks of one installer, not independent packages. Joining part001 followed by part002 reproduced the original 796,523,063-byte installer byte-for-byte.

Reconstructed SHA-256:

`561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`

Official source: https://persistent.oaistatic.com/codex-app-prod/ChatGPT-x64.msix  
Deployment reference: https://learn.chatgpt.com/docs/enterprise/windows-deployment

## Earlier package observations

Previous static inspection recorded an Electron/Chromium desktop application, ChatGPT and Codex components, a bundled Node runtime, command execution and code-mode components, sandbox and terminal support, browser/native-host integration, computer-use, plugins/skills, shell integration, and file associations.

These are package observations, not proof that every capability is available to every account or already implemented in ChatJS.

## Analysis status and limits

The installer is retained in Project Sources in two parts. Full extraction and complete desktop behavior analysis are not implied by the installer upload or earlier static observations.

The purpose of further analysis is to understand the desktop client's actual local and service-connected behavior and reproduce applicable client-side systems in ChatJS. The server-side ChatGPT implementation is outside the target.

## General-purpose ChatJS implications

ChatJS remains a general-purpose Node.js library. Host-specific desktop, browser, process, filesystem, and UI capabilities must be optional integrations rather than assumptions about the runtime host.

Keep original application packages and extracted third-party application payloads out of public Git. Commit independently authored findings, technical analysis, and ChatJS implementation.

## 2026-11-24 source-piece integrity recheck

The two Project Sources pieces were reassembled in numeric order in a temporary working directory. The resulting 796,523,063-byte MSIX has SHA-256 561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963; unzip -t reported no compressed-data errors. This rechecks the byte-level container integrity only. The MSIX publisher signature and full Windows application extraction/runtime behavior were not verified in this session. Full Windows payload analysis remains deferred in the task list.

## Work, Codex, and accountless-session boundaries — 2026-11-24

The owner's required product distinction is that Windows ChatGPT desktop Work uses local execution on the desktop host, while Android ChatGPT Work uses the cloud execution surface. These must be traced and implemented as separate execution paths; neither may depend on an installed Codex CLI or a separately running Codex app-server.

The upstream Codex source snapshot is now retained separately as CodexCLI.zip in ChatJS Project → Sources. Its findings and pinned commit are recorded in [CODEX_SOURCE_FINDINGS.md](CODEX_SOURCE_FINDINGS.md). It is protocol/behavior reference material only, not an app-server runtime dependency.

No Windows ChatGPT guest/session or signed-out Work path was established by the current inspection. An anonymous marker within a generic browser-transport subsystem is not evidence of a ChatGPT accountless session. Keep desktop guest mode Unknown until its actual client call path is traced. Android's separate guest session evidence is recorded in [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md).

## 2026-11-25 — reconstructed MSIX and first-pass ASAR inspection

The two owner-supplied parts were rejoined in numeric order in the working session:

- Total reconstructed MSIX: 796,523,063 bytes.
- SHA-256: `561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`.
- `unzip -t`: all entries passed; no compressed-data/CRC errors were reported.

The Appx manifest identifies package `OpenAI.Codex`, x64 version `26.1117.4957.0`, with display name **ChatGPT** and publisher **OpenAI**. The ASAR's `package.json` identifies the Electron package as `openai-codex-electron`, internal package version `26.1117.41037`, with main entry `.vite/build/early-bootstrap.js`. The parsed ASAR header exposes 15,520 file entries. The archive contains `app/resources/codex.exe` (407,428,400 bytes) and a compiled `.vite/build/app-server-host.js` host.

### Verified local execution architecture in this package

Static inspection of the bundled host and bootstrap chunks shows a `StdioConnection.spawnProcess()` implementation that uses Node's child-process spawn with piped stdin/stdout/stderr and reports failure as `Failed to spawn Codex CLI at ...`. The executable resolver recognizes the packaged Windows `codex.exe` path. The local RPC method inventory includes `thread/start`, `thread/resume`, `turn/start`, `turn/interrupt`, `thread/items/list`, and related thread/turn operations; streamed notifications include `turn/started`, `turn/completed`, `item/started`, `item/completed`, command output, and file-change events.

This confirms that the supplied Windows desktop package contains a local Codex app-server process path for its coding-agent execution. It is **not** evidence that every user-visible ChatGPT Work surface is the same feature or that Android's cloud Work uses this protocol. The packaged implementation is technical reference material only. ChatJS must not spawn or depend on `codex.exe`, a separate Codex CLI, or an app-server process; any required local execution behavior must be implemented inside ChatJS with explicit, optional host capabilities and real tests.

### Separate authenticated ChatGPT network bridge

The desktop bootstrap also contains a separate authenticated fetch bridge. Its URL allow-list is restricted to OpenAI/ChatGPT origins and explicitly rejects attaching account credentials to unrelated origins. The helper recognizes selected first-party path families including `/wham`, `/api/wham`, `/backend-api/wham`, and `/backend-api/estuary/content` when deciding whether Codex API auth should be attached. The helper obtains/refreshes its bearer token through an app-server client method and uses account binding checks before attaching it. This is useful evidence of a distinct authenticated network path, but it is not a complete Work endpoint/payload specification and does not remove the bundled local process dependency in the coding-agent path.

### Limits and corrections to earlier status

This session supersedes the previous **deferred** status only for a first-pass inspection of the newly supplied, reconstructed MSIX and selected ASAR JavaScript bundles. It does not claim a full ASAR extraction review, application launch, live login, runtime request capture, publisher-signature validation, or complete UI-to-backend mapping. Windows logged-out guest mode remains unknown. Keep the product distinctions explicit: Android Work Cloud and the Windows local execution surface are separate; the local Codex path found in this package must not be mistaken for a proven full mapping of every ChatGPT Work feature.
