# ChatJS AI Memory

**Read first in every ChatJS chat.** The live GitHub repository on main and committed /docs records are the durable project memory.

## Source of truth
1. Live GitHub main: authoritative code/history.
2. docs/project-state.json: structured state; PROJECT_STATE.md is generated.
3. /docs: requirements, reference findings, decisions, tasks, experiments, risks and handoff.
4. Project Instructions and latest owner direction.
5. Project Sources are optional: the owner intends to clear them. The Android ZIP is backed up in the personal Library at /ChatJS-Reference-Archives/ChatGPT-Android.zip; the Windows MSIX can be re-fetched from the URL in REFERENCE_DESKTOP.md. Never request the old Project Sources merely to repeat research.
6. Model assumptions never override repository evidence.

Resolve conflicts using live main and latest owner direction, then record the correction.

## Permanent constraints
- Main only. Never create/delete/rename/switch/publish another branch or worktree; never use branch/ref create/delete operations. Check all branches each chat; leave unexpected branches untouched and report them.
- Never configure/propose branch protection, rulesets or repository topics.
- No OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private ChatGPT backends, or extracted/reused app credentials/cookies/tokens/protocols.
- No telemetry, analytics, tracking, ads, profiling, hidden collection, background reporting, phone-home, remote diagnostics or telemetry dependencies.
- No fake/canned/predefined/hardcoded/demo/placeholder/no-op runtime features. Test mocks are tests-only.
- No filler, bloat, unrelated features, pointless abstractions or unjustified dependencies.
- Exclude health/Health Connect, finance, maps, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions.
- Never commit official APK/MSIX binaries, proprietary app source/assets, private bundles or credentials. Preserve independent findings only.

## Product definition
ChatJS is an independent Node.js module inspired by ChatGPT mobile first and applicable desktop Work/Codex. It is not a ChatGPT account client. No non-OpenAI inference engine is selected; never fake generated output. Prioritize genuine local Node.js features until an engine is selected. Device/desktop actions need optional platform adapters and explicit permission.

## Required reading every chat
1. AI_MEMORY.md, CONTINUATION.md.
2. PROJECT_STATE.md, project-state.json, TODO.md, SESSION_LOG.md.
3. DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md, OPEN_QUESTIONS.md.
4. CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, REFERENCE_APK.md, REFERENCE_DESKTOP.md.
5. ROADMAP.md, ARCHITECTURE.md, WORKFLOW.md, root ChatJS.md.
6. Inspect live main, full branch list, recent commits/tree, issues/PRs and CI.

## Canonical records
| Information | File |
| --- | --- |
| Memory/continuity | AI_MEMORY.md / CONTINUATION.md |
| State/tasks/history | project-state.json / PROJECT_STATE.md / TODO.md / SESSION_LOG.md |
| Decisions/research | DECISIONS.md / KNOWLEDGE_BASE.md |
| Experiments/unknowns | EXPERIMENTS.md / OPEN_QUESTIONS.md |
| Capability status/map | CAPABILITY_MATRIX.md / CHATGPT_CAPABILITY_INVENTORY.md |
| Mobile/desktop evidence | REFERENCE_APK.md / REFERENCE_DESKTOP.md |
| Roadmap/design/workflow | ROADMAP.md / ARCHITECTURE.md / WORKFLOW.md |
| Public API | Root ChatJS.md |

## Evidence
Verified = code/tests or authoritative docs. Observed = package/UI indicator, not API guarantee. Inferred = unconfirmed. Planned = not implemented. Blocked = missing engine/permission/platform/interface. Out of scope = owner excluded it. Keep sources, dates and limits.

## End of session
Commit coherent work directly to main. Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant docs. Run npm run check, verify ChatJS.tar.gz, inspect final tree, and record actual results, commit refs, blockers and next task. Never claim unverified behavior.
