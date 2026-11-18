# ChatJS Knowledge Base

Index of durable technical, product, compatibility, security and research knowledge gathered across ChatJS chats.

## Evidence labels
- **Verified:** confirmed by current code/tests or authoritative documentation.
- **Observed:** static indicator in the supplied APK or direct observation; not proof of user-visible behavior/API access.
- **Inferred:** plausible, not independently confirmed.
- **Planned:** desired behavior, not implemented.
- **Blocked:** required engine, permission, platform or supported integration unavailable.
- **Out of scope:** explicitly excluded by the owner.

## Current project facts

| Topic | Current understanding | Evidence |
| --- | --- | --- |
| Product/module | ChatJS; Node.js only; CommonJS, ESM and TypeScript | Owner direction/repository |
| Product reference | ChatGPT mobile first; applicable desktop Work and Codex | Owner direction and official product docs |
| Repository | codexclai/ChatJS; public; default branch main | Live GitHub |
| Branch inventory | Exactly one branch, main | GitHub branch search, 2026-11-18 |
| Branch policy | Never create/delete/rename/switch branches or worktrees | Explicit owner requirement |
| Privacy | Zero telemetry, tracking, hidden collection, background reporting, phone-home and unsolicited network calls | Explicit owner direction |
| Integration boundary | No OpenAI Platform APIs, keys, Sign in with ChatGPT OAuth, private backends, or app session/cookie reuse | Explicit owner direction |
| Inference engine | No non-OpenAI engine selected | OPEN_QUESTIONS.md |
| Runtime status | Minimal lifecycle foundation only; no ChatGPT feature implemented | Source and CI |
| Android reference | ChatGPT.zip in Project Sources; user says latest Google Play build available to them at acquisition | User-confirmed provenance |
| APK evidence | Static manifest/resource indicators; no emulator/UI or DEX decompilation | CHATGPT_CAPABILITY_INVENTORY.md |
| Desktop product reference | Desktop separates ChatGPT Chat/Work and Codex; Work can use permissioned local files/apps; Codex uses local folders/repos/terminals/dev tools | Official Help Center sources in inventory |
| Out-of-scope domains | Health, finance, maps, shopping, wallet, contacts, calendar, telephony, unrelated permissions | Explicit owner direction |
| Product documentation | Root ChatJS.md | Repository |
| Distribution | ChatJS.tar.gz built, verified, extracted and smoke-tested in CI | Workflow evidence |

## Current product-reference evidence — 2026-11-18

See [ChatGPT App Capability Inventory](CHATGPT_CAPABILITY_INVENTORY.md) for scope and evidence.

- Desktop app exposes ChatGPT (Chat or Work) and a separate Codex view. Desktop Work can use local files and desktop apps with permission; task context may still be stored in cloud while work runs locally. [Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex), [new desktop app](https://help.openai.com/en/articles/20001276-moving-to-the-new-chatgpt-desktop-app).
- Work can research, analyze, create documents/spreadsheets/presentations/reports/Sites and run scheduled/event-triggered/change-monitoring tasks, subject to permissions and approvals. [Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex).
- Codex is a separate desktop experience for local folders, repositories, terminals and developer tools. Supported desktop Codex tasks can be reached from the mobile Remote tab; this is not mobile-native Codex or Codex Cloud. [Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex).
- Current Voice docs distinguish Live, Advanced and Standard. Live lacks video/screen sharing; eligible mobile Advanced sessions support them. Advanced and Standard are scheduled to retire December 11, 2026. [Voice](https://help.openai.com/en/articles/20001274-chatgpt-voice).
- Projects group chats, files and instructions and use project context. ChatJS local projects are separate data. [Projects](https://help.openai.com/en/articles/10169521-projects-in-chatgpt).

These sources are product-reference evidence only. They do not authorize ChatJS to call OpenAI services or access consumer-app data.

## Canonical research locations

| Domain | Canonical location |
| --- | --- |
| Product scope and feature mapping | CHATGPT_CAPABILITY_INVENTORY.md |
| Implementation status | CAPABILITY_MATRIX.md |
| Android provenance | REFERENCE_APK.md and Project Sources |
| Architecture/local Node.js boundaries | ARCHITECTURE.md |
| Actual public API | Root ChatJS.md and types/index.d.ts |
| Security/privacy | SECURITY.md and ARCHITECTURE.md |
| Decisions | DECISIONS.md |
| Open questions/tasks | OPEN_QUESTIONS.md and TODO.md |

## Research format

Record question, conclusion, evidence label, source URL/path, access date, scope, limitations, confidence, implementation consequence and related TODO/decision. Prefer current authoritative sources for changing product behavior, Node.js, security and operating-system interfaces.

## Maintenance

When evidence changes a decision, capability assessment or task priority, update the canonical document and append a session-history entry. Never leave durable requirements or results only in chat prose.
