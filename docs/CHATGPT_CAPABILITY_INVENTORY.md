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

## First-pass Android protocol findings

See [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md) for observed authentication/session components, bearer headers, model/chat-requirements APIs, conversation and SSE streaming, uploads, history, image-gallery, and Library request paths. These are static module-string findings, not complete source reconstruction or end-to-end behavior verification.
The current 2026-11-24 XAPK scan adds method-reference evidence for separate requirements/device-integrity providers and the Android native Google Play Integrity flow. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md. These observations remain Research: they do not mean ChatJS has implemented attestation, Sentinel, Turnstile, or proof-of-work.

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


## Accountless sessions and execution-surface distinctions — 2026-11-24

Android 1.2026.321 DEX inspection observed Unauthenticated, AnonymousSession and LoggedInSession states, Continue as Guest UI, AnonymousSettings components, a chatgptguestplan identifier, anonymous session metadata and guest storage/cleanup identifiers. Anonymous endpoint constants were observed, but their owning class is LocationCookieInitializer; exact final guest conversation route attribution and request schemas remain unproven. This is a genuine guest-session research lead, not an implemented protocol. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

Windows desktop Work Local and Android Work Cloud are separate owner-confirmed execution surfaces. Codex CLI is a terminal coding client; it is source reference only for current ChatJS implementation work and is not a Work runtime prerequisite. Windows guest Work remains unknown.


## Android guest-session method trace — 2026-11-24

Method-level DEX analysis now observes an Unauthenticated/AnonymousSession/LoggedInSession enum, a serialized session metadata record, SessionManager initial/refresh/logout paths, and SessionStorageCleanupImpl handling of sessions/guest-<id> storage and retired sessions. This substantially strengthens evidence for a genuine first-party accountless mode but does not provide the final guest network schemas or a working ChatJS implementation.

The /backend-anon/f/conversation* constants were traced to LocationCookieInitializer processing the locationPermissionCookieSettings user setting. Do not label them guest composer send routes. Windows desktop guest Work remains unknown. Details and evidence boundaries are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


Further DEX tracing confirms the post-logout anonymous-start attempt enters a SessionManager transition that resolves and checkpoints local auth/session state in the session DataStore; it does not yet reveal the guest create/refresh network request. A storage helper builds sessions/guest-* from two opaque values plus a hyphen, with ID semantics/generation unknown. Guest loading/CTA strings exist, but callback wiring is not yet traced. Do not overstate this as a live or fully reconstructed guest API.
