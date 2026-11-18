# ChatJS AI Memory

**Read this first in every ChatJS chat.** The live GitHub repository on main and committed /docs records are the durable shared memory across conversations.

## Source of truth
1. Live GitHub main: authoritative code and history.
2. docs/project-state.json: structured state; PROJECT_STATE.md is generated.
3. /docs: requirements, product evidence, decisions, tasks, experiments, risks and handoff.
4. Project Instructions and latest owner direction.
5. Remaining Project Sources are optional. The owner intends to clear Sources after this review; committed inventories are durable. Never require the originals merely to continue.
6. Model assumptions never override repository evidence.

Resolve conflicts using live main and latest owner direction, then record the correction.

## Permanent constraints
- Main only. Never create/delete/rename/switch/publish another branch or worktree; never use branch/ref creation/deletion operations. Check all branches each chat; leave unexpected external branches untouched and report them.
- Never configure/propose branch protection, rulesets or repository topics.
- No OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private ChatGPT endpoints, or extracted/reused app credentials, cookies, tokens or private protocols.
- No telemetry, analytics, tracking, ads, profiling, hidden collection, background reporting, phone-home, remote diagnostics or telemetry dependencies.
- No fake/canned/predefined/hardcoded/demo/placeholder/no-op runtime features. Test mocks are tests-only.
- No filler, bloat, unrelated files/features, pointless abstractions or unjustified dependencies.
- Exclude health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions/features.
- Never commit official APK/MSIX binaries, proprietary source/assets, private bundles or credentials. Preserve independent findings and requirements only.

## Product definition
ChatJS is an independent Node.js module inspired by ChatGPT mobile first and applicable desktop Work/Codex workflows. It is not a ChatGPT account client. No non-OpenAI inference engine is selected; do not fake generated output. Prioritize local deterministic Node.js capabilities until an engine is selected. Android permissions do not transfer to Node.js; device/desktop actions require optional platform adapters and explicit permissions.

## Required reading every chat
1. AI_MEMORY.md and CONTINUATION.md.
2. PROJECT_STATE.md, project-state.json, TODO.md and SESSION_LOG.md.
3. DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md and OPEN_QUESTIONS.md.
4. CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, REFERENCE_APK.md and REFERENCE_DESKTOP.md.
5. ROADMAP.md, ARCHITECTURE.md, WORKFLOW.md, root ChatJS.md and README.md.
6. Inspect live main, full branch list, recent commits/tree, issues/PRs and CI.

Do not request ChatGPT.zip or the MSIX merely to repeat completed inspection. Their permitted findings are in REFERENCE_APK.md and REFERENCE_DESKTOP.md. Do not claim Sources are empty until the owner confirms deletion. If the owner requests a different-build comparison, inspect only what is required and do not commit the binary.

## Canonical records
| Information | File |
| --- | --- |
| Memory/continuity | AI_MEMORY.md / CONTINUATION.md |
| State/tasks/history | project-state.json / PROJECT_STATE.md / TODO.md / SESSION_LOG.md |
| Decisions/research | DECISIONS.md / KNOWLEDGE_BASE.md |
| Experiments/unknowns | EXPERIMENTS.md / OPEN_QUESTIONS.md |
| Capability status/map | CAPABILITY_MATRIX.md / CHATGPT_CAPABILITY_INVENTORY.md |
| Mobile/desktop package evidence | REFERENCE_APK.md / REFERENCE_DESKTOP.md |
| Roadmap/design/workflow | ROADMAP.md / ARCHITECTURE.md / WORKFLOW.md |
| Public API | Root ChatJS.md |

## Evidence
Verified = code/tests or authoritative docs. Observed = package/UI indicator, not API guarantee. Inferred = unconfirmed reasoning. Planned = not implemented. Blocked = missing engine/permission/platform/interface. Out of scope = owner excluded it. Keep sources, dates and limitations.

## End of session
Commit coherent work directly to main. Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant docs. Run npm run check, verify ChatJS.tar.gz, inspect final tree, and record actual results, commit refs, blockers and exact next task. Never claim unverified behavior.
