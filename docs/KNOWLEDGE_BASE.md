# ChatJS Knowledge Base

Index of durable product, technical, compatibility, security, and research knowledge gathered across ChatJS chats.

## Evidence labels

- **Verified:** confirmed by current code/tests, authoritative documentation, or successful archive verification.
- **Observed:** found directly in supplied package content or a prior recorded tool observation; not automatically verified runtime behavior.
- **Inferred:** plausible but not independently confirmed.
- **Planned:** desired, not implemented.
- **Blocked:** a necessary engine, toolchain, host interface, or test environment is unavailable.
- **Out of scope:** explicitly excluded by owner.

## Current project facts

| Topic | Current understanding | Evidence |
| --- | --- | --- |
| Product/module | One general-purpose Node.js module named ChatJS | Owner direction/repository |
| Product target | Actual client-side behavior of official ChatGPT mobile and desktop Work/Codex | Recovered Chat.json and Chat-1.json; latest owner corrections |
| Server scope | Reproduce client behavior; no need to recreate server-side ChatGPT infrastructure | Explicit owner direction |
| Client protocols | Request/response, transport, authentication/session, and payload behavior in the shipped clients are in-scope engineering references | Explicit owner direction; source audit still pending |
| Integration status | Real ChatGPT service connection is not implemented in current foundation | Current repository source |
| Host model | Portable Node.js core; optional host-specific integrations | Explicit owner direction |
| Repository | codexclai/ChatJS; public; default branch main | Live GitHub |
| Branch inventory | Only main at check on 2026-11-20 | GitHub branch API |
| Privacy | No telemetry, tracking, hidden collection, background reporting, phone-home, or unsolicited content upload | Explicit owner requirement |
| Android source | ChatGPT-Android.xapk retained in ChatJS Project → Sources; archive integrity and provider hash match checked | Source upload and local verification, 2026-11-24 |
| Android payload | 4,987 APK entries; ten DEX files; 121 Valdi modules; 4,989 ZIP entries incl README/inventory | Embedded inventory and ZIP listing |
| Android analysis | Payload extraction complete; first-pass Valdi protocol strings/components mapped; full call graphs, exact schemas, and behavior tracing remain open | ANDROID_CLIENT_PROTOCOL_FINDINGS.md |
| Windows source | Two sequential installer pieces in ChatJS Project → Sources; exact reassembly verified byte-for-byte | Source upload and local verification, 2026-11-24 |
| Sources | ChatJS Project → Sources is primary; personal Library is optional only when genuinely useful, needed, accessible, and Sources cannot supply the material | Owner direction, 2026-11-24 |
| Out-of-scope domains | Health, finance, maps, shopping, wallet, contacts, calendar, telephony, unrelated permissions | Explicit owner direction |
| Public API manual | Root ChatJS.md | Repository |
| Distribution | ChatJS.tar.gz built and checked by npm/CI workflow | Script/CI workflow |

## First-pass Android client protocol findings

A static Zstandard decompression/string scan of selected Valdi modules found generated account-check and model/chat-requirements API clients; bearer/account headers; native/encrypted credential-store components; first-party sign-in/session lifecycle identifiers; an explicit device-integrity provider; direct/polling SSE stream components and handoff/resume identifiers; file upload/process/Estuary paths; conversation history, pins and downloads; image bootstrap/recent image generation; and Library file/node/bookmark/directory paths. Exact source-level behavior remains to be traced. See [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md).

## Client-package understanding

The Android archive is the extracted APK payload, not a metadata summary. It contains compiled DEX and Valdi modules, assets, manifest/configuration data, schemas, and notices. Source-level decompilation and request-flow tracing remain open.

The Windows MSIX package previously showed Electron/Node/Codex, an ASAR bundle, sandbox, terminal, browser/computer-use, plugins/skills, and shell integration. The full extracted archive is not currently verified in Library. The owner asked to defer further Windows work.

## Canonical research locations

| Domain | Canonical location |
| --- | --- |
| Client feature map | CHATGPT_CAPABILITY_INVENTORY.md |
| Android extracted payload | REFERENCE_APK.md |
| Windows package/retention | REFERENCE_DESKTOP.md |
| Implementation status | CAPABILITY_MATRIX.md |
| Architecture and protocols | ARCHITECTURE.md |
| Public API | Root ChatJS.md and types/index.d.ts |
| Security/privacy | SECURITY.md and ARCHITECTURE.md |
| Decisions | DECISIONS.md |
| Open questions/tasks | OPEN_QUESTIONS.md and TODO.md |

## Documentation completeness

Record meaningful requirements, decisions, research, actions, changed files, tests, failures, limits, blockers, and handoffs in canonical docs. Update all affected references and generated state. Never imply invisible monitoring.

## Research format

Record question, conclusion, evidence label, source path/date, access date, scope, limitations, confidence, implementation consequence, and related TODO/decision. Keep extracted package content, source-level analysis, observed behavior, and tested Node.js implementation separate.

## Maintenance

When evidence changes a decision, capability assessment, or task priority, update the canonical document and append a session-history entry. Never leave durable knowledge only in chat prose.


## Persistent browser profile

The persistent `ChatJS` browser profile is the sole reusable default for ChatJS browser work. It keeps the owner's Google and ChatGPT sessions authenticated. Never sign out or clear, reset, replace, or delete it. Temporary sessions are allowed only for genuinely disposable tasks and must not become additional reusable profiles.
