# ChatJS Continuation Guide

Every ChatJS conversation continues the same repository and shared project memory.

## Start of every session

1. Read [AI Memory](AI_MEMORY.md) first.
2. Inspect live GitHub state: main, complete branch list, current tree, recent commits, issues/PRs and CI.
3. Read PROJECT_STATE.md, project-state.json, TODO.md, SESSION_LOG.md, DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md and OPEN_QUESTIONS.md.
4. Read CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, ROADMAP.md, ARCHITECTURE.md and WORKFLOW.md.
5. Read root ChatJS.md before changing public API or user-visible behavior.
6. Search ChatJS Project → Sources for ChatGPT.zip before requesting another upload; read REFERENCE_APK.md.
7. Select the highest-priority actionable task from TODO.md after checking decisions and prior experiments.

Do not ask the user to repeat information already in Project Instructions, Project Sources or the repository. Live main and the user's latest direction override stale context.

## Product scope

ChatJS is a Node.js-only, mobile-first feature implementation inspired by ChatGPT mobile, with applicable desktop Work and Codex capabilities. It is not a client for a ChatGPT account.

Never use OpenAI Platform APIs, OpenAI API keys, Sign in with ChatGPT OAuth/token sharing, private ChatGPT backend endpoints, or extracted app credentials/session state. No non-OpenAI inference engine is selected; never fake generated output. Until one is selected, prioritize real local Work/Codex foundations.

Health/Health Connect, finance, maps, shopping, wallet, contacts, calendar, telephony, and unrelated Android permission domains are out of scope. Read CHATGPT_CAPABILITY_INVENTORY.md for detailed product-to-Node.js classification.

## Branch rule

Only **main** is permitted. Commit directly to main. Never create, delete, rename, switch to or publish another branch or worktree; never invoke branch/ref creation or deletion. Check the full branch listing at session start. If another branch appears, leave it untouched, report it, and continue only on main. Do not configure/propose branch protection, rulesets or repository topics.

## Meaning of “Continue”

“Continue” means resume implementation/research from the live TODO list and make useful progress, not return another generic plan. Complete a coherent work unit, run relevant checks, update canonical docs and commit to main. If blocked, make safe progress and document the precise blocker.

## Evidence, privacy and compatibility

Classify claims as Verified, Observed, Inferred, Planned, Blocked or Out of scope. A feature visible in ChatGPT or indicated by an APK resource is not automatically a Node.js capability. Never claim 1:1 compatibility without repeatable tests.

Zero telemetry: no analytics, tracking, ads, profiling, hidden data collection, background reporting, phone-home, remote diagnostics or telemetry dependencies. Network requests must be explicit, necessary, configured, authorized and user-controlled. Never bypass authentication, access controls, rate limits, TLS/certificate checks or platform security.

## Engineering workflow

- Inspect current code, architecture, TODO, decisions and prior experiments before editing.
- Prefer one complete, focused feature slice with real behavior.
- Define input validation, async behavior, cancellation, timeouts, backpressure, concurrency, limits, errors and cleanup.
- Treat local workspace and command execution as security-sensitive; follow ARCHITECTURE.md before implementation.
- Keep ESM/CommonJS parity and TypeScript declarations accurate.
- No fake features, canned responses, mock runtime behavior, bloat or unrelated changes.
- Keep root ChatJS.md aligned with actual exports and behavior.
- Run npm run check, verify ChatJS.tar.gz, inspect the final tree and record actual results.

## APK and desktop references

The user keeps ChatGPT.zip in Project Sources. Search for it at every new session; do not request an upload if it is present. The Android APK is private reference material only; do not copy its code/assets into GitHub.

Official desktop documentation is sufficient for desktop feature-scope research. A desktop installer/executable is not required unless a specific local OS interaction needs hands-on validation.

## End of session

Update project-state.json and regenerate PROJECT_STATE.md. Update TODO, SESSION_LOG and relevant canonical docs. Record exact files, commit references, tests, blockers and the next task. Never claim tests or feature support that were not verified.
