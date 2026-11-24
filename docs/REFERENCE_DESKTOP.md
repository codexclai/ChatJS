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
