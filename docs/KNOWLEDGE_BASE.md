# ChatJS Knowledge Base

Index of durable product, technical, compatibility, security and research knowledge gathered across ChatJS chats.

## Evidence labels
- **Verified:** confirmed by current code/tests or authoritative documentation.
- **Observed:** static indicator in a supplied package or direct observation; not proof of UI availability or API access.
- **Inferred:** plausible but not independently confirmed.
- **Planned:** desired behavior, not implemented.
- **Blocked:** required engine, permission, platform or supported integration unavailable.
- **Out of scope:** explicitly excluded by owner.

## Current project facts

| Topic | Current understanding | Evidence |
| --- | --- | --- |
| Product/module | ChatJS; Node.js only; CommonJS, ESM, TypeScript | Owner direction/repository |
| Product reference | ChatGPT mobile first; applicable desktop Work and Codex | Owner direction and official product docs |
| Repository | codexclai/ChatJS; public; default branch main | Live GitHub |
| Branch inventory | One branch, main | GitHub branch search, 2026-11-18 |
| Branch policy | Never create/delete/rename/switch branches or worktrees | Explicit owner requirement |
| Privacy | Zero telemetry, tracking, hidden collection, background reporting, phone-home and unsolicited network calls | Explicit owner direction |
| Integration boundary | No OpenAI Platform APIs, keys, Sign in with ChatGPT OAuth, private backends or app session/cookie reuse | Explicit owner direction |
| Inference engine | No non-OpenAI engine selected | OPEN_QUESTIONS.md |
| Runtime status | Minimal lifecycle foundation only; no ChatGPT feature implemented | Source and CI |
| Android reference | ChatGPT.zip supplied privately; user says latest Google Play build available at acquisition | User-confirmed provenance |
| Android evidence | Static manifest/resource indicators; no emulator/UI or DEX decompilation | REFERENCE_APK.md |
| Windows reference | Supplied x64 MSIX downloaded and statically inspected on 2026-11-18; not installed or executed | REFERENCE_DESKTOP.md |
| Windows package identity | Appx identity OpenAI.Codex, x64, display name ChatGPT; embedded Electron package identifies Codex | MSIX manifest and ASAR package metadata |
| Desktop components observed | Separate Codex executable, command runner, code-mode host, sandbox service/setup, bundled Node runtime, PTY/ConPTY, browser native host, computer-use, plugins/skills, Explorer integration, URI handler and document associations | REFERENCE_DESKTOP.md |
| Out-of-scope domains | Health, finance, maps, shopping, wallet, contacts, calendar, telephony, unrelated permissions | Explicit owner direction |
| Source retention | Android ZIP backed up and re-materialized from Library at /ChatJS-Archives/ChatJS-Android.zip; Windows MSIX not retained due 25 MiB export cap; official URL/findings retained; owner intends to clear Sources | Library listing and successful re-materialization; REFERENCE_APK.md and REFERENCE_DESKTOP.md |
| Product documentation | Root ChatJS.md | Repository |
| Distribution | ChatJS.tar.gz built, verified, extracted and smoke-tested in CI | Workflow evidence |

## Current product-reference evidence — 2026-11-18

See [ChatGPT App Capability Inventory](CHATGPT_CAPABILITY_INVENTORY.md), [Android reference](REFERENCE_APK.md), and [Windows desktop package inventory](REFERENCE_DESKTOP.md).

- Desktop separates ChatGPT Chat/Work and Codex. Work can use local files and apps with permission; task context may still be stored in the cloud when work runs locally. [Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex), [new desktop app](https://help.openai.com/en/articles/20001276-moving-to-the-new-chatgpt-desktop-app).
- Desktop Codex supports local folders, repositories, terminals and developer tools. Windows package metadata additionally indicates separate Codex execution, command runner, sandbox, PTY, browser native-host, computer-use, plugin/skill, Explorer and file-association components.
- Mobile Voice docs distinguish Live, Advanced and Standard; the page says Advanced and Standard are scheduled to retire December 11, 2026. [Voice](https://help.openai.com/en/articles/20001274-chatgpt-voice).
- Projects group chats, files and instructions in ChatGPT; ChatJS local projects are separate data. [Projects](https://help.openai.com/en/articles/10169521-projects-in-chatgpt).

These sources describe ChatGPT's app product only. They do not authorize ChatJS to call OpenAI services or access consumer account data.

## Canonical research locations

| Domain | Canonical location |
| --- | --- |
| Product scope and features | CHATGPT_CAPABILITY_INVENTORY.md |
| Android package evidence | REFERENCE_APK.md |
| Windows desktop package evidence | REFERENCE_DESKTOP.md |
| Implementation status | CAPABILITY_MATRIX.md |
| Architecture/local Node.js boundaries | ARCHITECTURE.md |
| Actual public API | Root ChatJS.md and types/index.d.ts |
| Security/privacy | SECURITY.md and ARCHITECTURE.md |
| Decisions | DECISIONS.md |
| Open questions/tasks | OPEN_QUESTIONS.md and TODO.md |

## Documentation completeness
Record meaningful requirements, decisions, research, actions, changed files, tests, failures, limits, blockers and handoffs in canonical docs during the same session. Update affected references; never imply invisible monitoring.

## Research format

Record question, conclusion, evidence label, source URL/path, access date, scope, limitations, confidence, implementation consequence and related TODO/decision. Prefer current authoritative sources for changing product behavior, Node.js, security and operating-system interfaces.

## Maintenance

When evidence changes a decision, capability assessment or task priority, update the canonical document and append a session-history entry. Never leave durable requirements or results only in chat prose.
