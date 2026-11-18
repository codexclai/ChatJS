# ChatJS Continuation Guide

Every ChatJS conversation continues the same repository and shared project memory.

## Start
1. Read AI_MEMORY.md.
2. Inspect live main, full branch list, tree, recent commits, issues/PRs and CI.
3. Read PROJECT_STATE.md, project-state.json, TODO.md, SESSION_LOG.md, DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md and OPEN_QUESTIONS.md.
4. Read CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, REFERENCE_APK.md, REFERENCE_DESKTOP.md, ROADMAP.md, ARCHITECTURE.md and WORKFLOW.md.
5. Read root ChatJS.md before public API changes.
6. Choose the highest-priority actionable TODO after reviewing decisions and experiments.

The owner intends to clear ChatGPT Project → Sources. Do not request ChatGPT.zip or the MSIX merely to repeat completed research. Use committed records. Do not claim source deletion until the owner confirms it. Ask for a new binary only for an explicitly requested comparison or a specific test that cannot otherwise be performed.

## Product boundary
ChatJS is Node.js-only, mobile-first, and includes applicable desktop Work/Codex capabilities. It is not a ChatGPT account client. Never use OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private backends, or extracted app credentials/sessions. No non-OpenAI inference engine is selected; never fake generated output.
Exclude health, finance, maps, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions. Device/desktop access needs explicit platform adapters and permission.

## Branch rule
Only main is permitted. Commit directly to existing main. Never create, delete, rename, switch to, publish or work in any other branch/worktree; never invoke branch/ref creation/deletion. Check full branch listing at session start; leave unexpected branches untouched and report them. Do not configure/propose branch protection, rulesets or topics.

## Continue means work
Resume the highest-priority actionable task; do not return a generic plan. Complete a coherent work unit, test it, update canonical docs and commit to main. If blocked, make safe progress and document the exact blocker.

## Quality and evidence
No telemetry, tracking, hidden collection, background reporting, phone-home, unsolicited network traffic, fake features, bloat or unrelated changes. Never bypass authentication, access controls, rate limits, TLS or platform security.
Distinguish Verified, Observed, Inferred, Planned, Blocked and Out of scope. An app feature/package name is not proof of Node.js support or a public integration. No 1:1 claims without repeatable tests.

## Engineering and finish
Define validation, async semantics, cancellation, timeouts, concurrency, backpressure, resource limits, errors and cleanup. Treat filesystem/process operations as security-sensitive. Keep ESM/CommonJS parity and accurate declarations. Root ChatJS.md must match actual behavior.
Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant docs. Run npm run check and verify ChatJS.tar.gz. Record exact files, results, commit, blockers and next task. Never create/delete branches.
