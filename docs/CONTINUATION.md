# ChatJS Continuation Guide

Every ChatJS conversation continues the same repository and shared project memory.

## Start
1. Read AI_MEMORY.md.
2. Inspect live main, full branch list, tree, recent commits, issues/PRs and CI.
3. Read state, TODO, session history, decisions, knowledge, experiments and open questions.
4. Read capability matrix/inventory, Android/desktop reference records, roadmap, architecture and workflow.
5. Read root ChatJS.md before public API changes.
6. Choose the highest-priority actionable TODO after reviewing decisions and experiments.

The owner intends to clear ChatGPT Project → Sources. The Android archive is retained in personal Library at /ChatJS-Archives/ChatJS-Android.zip. The Windows MSIX is not retained in Library; its URL and findings are in REFERENCE_DESKTOP.md. Do not request the old Project Source files merely to repeat completed research. Do not claim Sources are empty until owner confirms. Ask for a new build only for an explicitly requested comparison/test.

## Product boundary
ChatJS is Node.js-only, mobile-first, with applicable desktop Work/Codex. It is not a ChatGPT account client. No OpenAI APIs, API keys, Sign in with ChatGPT OAuth, private backends or app credential/session reuse. No non-OpenAI inference engine is selected; never fake generated output.
Exclude health, finance, maps, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions. Device/desktop access needs explicit platform adapters and user permission.

## Branch rule
Only main. Commit directly to existing main. Never create, delete, rename, switch to, publish or work in another branch/worktree; never invoke branch/ref creation/deletion. Check all branches; leave unexpected branches untouched and report them. Do not configure/propose branch protection, rulesets or topics.

## Documentation rule
Record available meaningful requirements, decisions, research, actions, changed files, tests, failures, limits, blockers and handoffs in canonical docs during the same session. Correct references and preserve chronology. Never claim invisible monitoring or unsupported facts.

## Continue means work
Resume the highest-priority actionable task; do not return a generic plan. Complete a coherent work unit, test, update canonical docs and commit to main. If blocked, document the exact blocker.

## Quality and evidence
No telemetry, tracking, hidden collection, background reporting, phone-home, unsolicited network traffic, fake features, bloat or unrelated changes. Never bypass authentication, access controls, rate limits, TLS or platform security.
Distinguish Verified, Observed, Inferred, Planned, Blocked and Out of scope. App features/package names do not prove Node.js support. No 1:1 claims without repeatable tests.

## Engineering and finish
Define validation, async semantics, cancellation, timeouts, concurrency, backpressure, limits, errors and cleanup. Treat filesystem/process operations as security-sensitive. Keep ESM/CommonJS parity and accurate declarations.
Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant docs. Run npm run check and verify ChatJS.tar.gz. Record exact files, results, commit, blockers and next task. Never create/delete branches.
