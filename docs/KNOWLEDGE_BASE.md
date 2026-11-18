# ChatJS Knowledge Base

Index of durable technical, product, compatibility, security and research knowledge gathered across ChatJS chats.

## Evidence labels

- **Verified:** confirmed by current code/tests or authoritative documentation.
- **Observed:** static indicator in the supplied APK or directly reported by the user; not an API guarantee.
- **Inferred:** plausible, not independently confirmed.
- **Planned:** desired behavior, not implemented.
- **Blocked:** inaccessible or prevented by a known constraint.

## Current project facts

| Topic | Current understanding | Evidence |
| --- | --- | --- |
| Product and module name | ChatJS | Explicit user direction and repository |
| Repository | codexclai/ChatJS; public; default branch main | Live GitHub |
| Branch inventory | Exactly one branch, main | GitHub branch search, 2026-11-18 |
| Repository About | Description set as documented in REPOSITORY_SETTINGS.md; no topics by request | Live GitHub metadata and owner instruction |
| Branch/ruleset policy | Never create/delete/rename/switch branches; no branch protection/rulesets or topics setup | Explicit user direction |
| Runtime | Node.js; ESM and CommonJS; TypeScript declarations | Source code |
| Runtime network behavior | Foundation makes no network requests; no third-party runtime dependencies | Source and package.json |
| Privacy | Zero telemetry, tracking, hidden collection, background reporting or phone-home | Explicit user direction |
| Implementation status | Initial foundation only; no ChatGPT service integration | Source and CI |
| Independence | Not affiliated with OpenAI | Project policy |
| Reference APK | Project Source; user says latest Google Play build available to them at acquisition | User-confirmed provenance; REFERENCE_APK.md |
| APK inspection | Static manifest and high-level asset/module names; no emulator/UI test or DEX decompilation | CHATGPT_CAPABILITY_INVENTORY.md |
| APK handling | Project Source only; not public repository | Governance decision |
| Product versioning | No ChatJS release numbering/tags, package version field or npm publishing | Explicit user direction |
| Product/API manual | Root ChatJS.md | Repository |
| Shared project memory | /docs and docs/project-state.json | AI_MEMORY.md |
| Distribution | ChatJS.tar.gz built, verified, extracted and smoke-tested in CI | Workflow run |

## Verified public-interface research — 2026-11-18

See [ChatGPT Capability and Interface Inventory](CHATGPT_CAPABILITY_INVENTORY.md) for evidence, limitations, feature mapping and source links.

- OpenAI recommends Responses API for new integrations. Assistants API shut down on August 26, 2026; do not use it for new work. Sources: [Responses migration](https://developers.openai.com/api/docs/guides/migrate-to-responses), [Assistants migration](https://developers.openai.com/api/docs/assistants/migration).
- Responses API documents streaming, model discovery, multimodal input, function calling, web search, file search, Code Interpreter, computer use and remote MCP. Each has distinct permissions, model support and data-lifecycle requirements.
- Sign in with ChatGPT plan usage is a separate OAuth route, not ordinary API-key auth. OpenAI documents it for open-source and locally hosted apps; paid or remotely hosted apps are directed to an interest form. It does not provide consumer ChatGPT conversations or account context. Sources: [overview](https://developers.openai.com/siwc/token-sharing-open-source), [quickstart](https://developers.openai.com/siwc/quickstart).
- Plan-usage preview requires HTTP Responses requests to set `store:false` and `stream:true`, send complete context and avoid persistent conversation references. Image generation, file search, Code Interpreter, native computer use, hosted MCP/connectors, Files upload, audio/video input and transcription are unsupported. See [preview limitations](https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations).
- ChatJS has an all-rights-reserved notice. Public visibility does not establish open-source eligibility. Keep the question open.

## Research areas and canonical locations

| Domain | Canonical location | Record |
| --- | --- | --- |
| Product feature scope | CAPABILITY_MATRIX.md and CHATGPT_CAPABILITY_INVENTORY.md | APK indicators, API mapping and feasibility |
| Official integrations | CHATGPT_CAPABILITY_INVENTORY.md | Interfaces, auth, restrictions and limits |
| Android reference | REFERENCE_APK.md and Project Sources | Provenance, static indicators, confidence |
| Node.js/runtime | ARCHITECTURE.md | Runtime APIs and contracts |
| Public module API | Root ChatJS.md and types/index.d.ts | Exports, inputs, outputs, events, errors |
| Security/privacy | SECURITY.md and ARCHITECTURE.md | Trust boundaries and zero telemetry |
| Distribution | Root ChatJS.md and CI | ChatJS.tar.gz and smoke tests |
| Repository governance | GOVERNANCE.md and REPOSITORY_SETTINGS.md | Rights, license and owner decisions |

## Research record format

Record question, conclusion, evidence label, source URL or path, access date, scope, limitations, confidence, implementation consequence and related TODO/decision. Prefer current authoritative sources for changing product, API, legal, platform and runtime facts.

## Maintenance

When evidence changes a decision, capability assessment or task priority, update the canonical document and append a session-history entry. Do not leave durable knowledge only in chat prose.
