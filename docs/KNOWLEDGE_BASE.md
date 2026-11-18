# ChatJS Knowledge Base

Index of durable technical, product, compatibility, security, and research knowledge gathered across ChatJS chats.

## Evidence labels

- **Verified:** confirmed by current code/tests or authoritative documentation.
- **Observed:** seen in the reference application or reported directly by the user, but not an API guarantee.
- **Inferred:** plausible, not independently confirmed.
- **Planned:** desired behavior, not implemented.
- **Blocked:** inaccessible or prevented by a known constraint.

## Current project facts

| Topic | Current understanding | Evidence |
| --- | --- | --- |
| Product and module name | ChatJS | Explicit user direction and repository |
| Repository | codexclai/ChatJS; public; main branch | Live GitHub |
| Runtime | Node.js; ESM and CommonJS; TypeScript declarations | Source code |
| Implementation status | Initial foundation only; no ChatGPT service integration | Code and tests |
| Independence | Not affiliated with OpenAI | Project policy |
| Reference APK | ChatGPT.zip in ChatJS Project → Sources; user says exported immediately after Google Play update and latest for them at acquisition | User-confirmed provenance; REFERENCE_APK.md |
| APK handling | Project Source only; not stored in the public repository | Governance decision |
| Product versioning | No ChatJS release numbers/tags, package version field, or npm publishing | Explicit user direction |
| Product/API manual | Root ChatJS.md | Repository |
| Shared project memory | /docs and docs/project-state.json | AI_MEMORY.md |
| Distribution | ChatJS.tar.gz; built and tested by project scripts/CI | Archive builder and tests |

## Knowledge areas

| Domain | Canonical location | Record |
| --- | --- | --- |
| Product feature scope | CAPABILITY_MATRIX.md and focused research pages | Observable behavior, platform differences, evidence, feasibility |
| Official integrations | Focused research pages linked here | Current APIs, authentication, restrictions, limits |
| Android reference | REFERENCE_APK.md and ChatJS Project Sources | Provenance, flows, confidence |
| Node.js/runtime | ARCHITECTURE.md | Runtime APIs, supported LTS behavior, platform differences |
| Public module API | Root ChatJS.md and types/index.d.ts | Exports, inputs, outputs, events, errors |
| Security/privacy | SECURITY.md and ARCHITECTURE.md | Trust boundaries, sensitive data, threat handling |
| Distribution | Root ChatJS.md and CI workflow | ChatJS.tar.gz contents and smoke tests |
| Repository governance | GOVERNANCE.md and REPOSITORY_SETTINGS.md | Rights, protections, ownership, operational limits |

## Research record format

Record the question, why it matters, conclusion and evidence label, source URL or repository path, source publication/access date, scope, limitations, conflicting evidence, confidence, implementation consequence, and related TODO/decision.

Prefer authoritative current sources for changing product, API, legal, platform, and runtime facts. Community sources can help discover behavior but do not replace official contracts.

## Maintenance

When new evidence changes a decision, capability assessment, or task priority, update the canonical document and append a session-history entry. Do not leave durable knowledge only in chat prose.
