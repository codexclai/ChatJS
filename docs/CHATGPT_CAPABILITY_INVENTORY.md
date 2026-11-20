# ChatGPT Client Implementation Inventory — Mobile and Desktop

**Reviewed:** 2026-11-20. ChatJS is one general-purpose Node.js module intended to adapt the actual client-side systems and workflows of official ChatGPT mobile and desktop (including Work/Codex).

This inventory is a guide to the supplied client implementation material and the intended Node.js adaptation. It is not a claim that the present foundation already supports the listed features.

## Product definition

ChatJS is not a list of feature-name lookalikes, not a replacement model provider, and not a recreation of ChatGPT's server. The target is the real ChatGPT client experience, with the client-side implementation adapted to Node.js.

Do not treat the lack of public developer documentation for a client interface as proof that the interface does not exist. The shipped application code is the primary technical evidence for request construction, payloads, connection/transport, authentication/session behavior, client state, and workflows.

ChatJS must be general-purpose across different Node.js applications and environments. The portable core must not assume a particular phone, computer, operating system, camera, microphone, screen, browser, or deployment.

## Reference package status

### Android

The personal Library archive `/ChatJS-Archives/ChatJS-Android.zip` contains the full extracted APK payload: all 4,987 APK entries, including ten DEX files and 121 compiled Valdi modules, plus resources/notices, a README, and a structured path/size/CRC inventory. The 59,454,036-byte ZIP has 4,989 entries and passed CRC testing on 2026-11-20. See [REFERENCE_APK.md](REFERENCE_APK.md).

The compiled payload contains actual client implementation material. Source-level DEX/Valdi analysis, request tracing, auth/session tracing, and behavioral tests are not yet recorded complete.

### Windows

The MSIX inspection recorded Electron/Node/Chromium, ChatGPT and Codex executables, an ASAR app bundle, command-runner/code-mode-host components, sandbox/PTY, browser/native-host, computer-use, plugin/skill, shell and file integration. The owner has deferred Windows archive work. The current Library ZIP is metadata-only; a prior chat recorded a larger remote extracted archive with incomplete transfer to Library, not reverified in this session. See [REFERENCE_DESKTOP.md](REFERENCE_DESKTOP.md).

## Client implementation areas to investigate

| Area | Evidence to collect from the actual clients | Node.js adaptation |
| --- | --- | --- |
| Networking | Endpoint/request creation, headers, payload shape, content types, compression, transport setup | Client-compatible transport and request builder |
| Authentication | Sign-in steps, session establishment/refresh, authorization state, secure credential lifecycle | Legitimate user-authorized auth/session adapter |
| Conversations | Thread identifiers/state, message serialization, streaming, error and retry behavior | Typed conversation client and async stream |
| Context and instructions | Context assembly, profile/instruction precedence, memory-related requests/state | General context and instruction model |
| Projects | Project data structures, attachments, instructions, context transfer | Project/resource API |
| Files and attachments | Upload/download payloads, metadata, multipart/formats, previews | File ingestion and client-compatible payload layer |
| Images and video | Input formats, metadata, processing requests, result structure | Node.js image/video processing and service adapter |
| Voice | Audio formats, streaming/chunking, turn lifecycle, cancellation | Audio stream adapter; host audio capture remains optional |
| Search and research | Request structures, tools, sources, citations, task state | Search/research client workflow |
| Tools and plugins | Tool descriptors, invocation/result schemas, approvals | Typed tool/plugin system |
| Work and tasks | Task creation, progress, files, artifacts, scheduling/continuation | Local/remote task model where evidenced |
| Desktop/Codex | Workspaces, commands, PTY, sandbox, browser, computer-use, review | Portable local APIs with optional host integrations |

## Host-neutral design

Core APIs must be reusable without a phone/desktop device or hardware. If the caller's host offers a camera, microphone, screen, browser, desktop-control API, or another facility, an optional adapter may integrate it. The package itself must not assume or request those facilities on behalf of every consumer.

## Not implemented yet

The current ChatJS repository is foundation-only. Actual ChatGPT service connection, authentication/session handling, request transport, conversation features, files, voice, images, Work tasks, and Codex integrations are not implemented. No end-to-end compatibility claims are made.

## Explicit exclusions

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features.
