# ChatJS Continuation Guide

This guide helps every chat in the ChatJS Project resume the same engineering work.

## Start of every session

1. Read [AI Memory](AI_MEMORY.md) first.
2. Inspect the live GitHub repository `codexclai/ChatJS`: main branch, latest changes, current tree, issues/PRs, and CI results where available.
3. Read [Project State](PROJECT_STATE.md), [Tasks](TODO.md), [Session History](SESSION_LOG.md), [Decisions](DECISIONS.md), [Knowledge Base](KNOWLEDGE_BASE.md), [Experiments](EXPERIMENTS.md), and [Open Questions](OPEN_QUESTIONS.md).
4. Read [Capabilities](CAPABILITY_MATRIX.md), [Roadmap](ROADMAP.md), [Architecture](ARCHITECTURE.md), and [Development Workflow](WORKFLOW.md).
5. Read root [ChatJS.md](../ChatJS.md) before changing the Node.js module's public API or user-visible behavior.
6. Search **ChatJS Project → Sources** in ChatGPT for `ChatGPT.zip` before asking for the APK again. Read [Reference APK](REFERENCE_APK.md).
7. Select the highest-priority actionable task after reviewing earlier experiments and blockers.

Do not ask the user to repeat information already captured in the Project Instructions, Project Sources, or repository. The live repository and the latest explicit user direction override stale chat context.

## Meaning of “Continue”

“Continue” means resume implementation or research from the live TODO list and make useful progress. It does not mean return another generic plan. Complete one coherent unit, run relevant tests, update code and docs, commit the work, and hand off the next exact task. If blocked, make safe progress and document the precise blocker.

## Evidence and compatibility

Classify claims as Verified, Observed, Inferred, Planned, or Blocked. A feature visible in ChatGPT's UI is not necessarily available through a public API. Do not claim 1:1 compatibility without repeatable conformance tests. Do not bypass authentication, private endpoints, entitlements, access controls, rate limits, or platform security.

## Engineering workflow

- Inspect existing implementation and prior experiments before editing.
- Prefer a cohesive, minimal, modular change.
- Add tests for success, failure, concurrency, cancellation, and regression as relevant.
- Preserve ESM/CommonJS parity and TypeScript accuracy.
- Keep root ChatJS.md aligned with actual exports and behavior.
- Keep docs familiar and conventional; put knowledge in its canonical document.
- Run npm run check, verify ChatJS.tar.gz, inspect the tree, and record real results.
- Never claim unrun tests, unverified settings, or unimplemented features are complete.

## APK source

The user keeps ChatGPT.zip in **ChatJS Project → Sources** in ChatGPT. Search there at the start of every chat. Only request a new upload if the Project Source is genuinely inaccessible and the task requires inspecting it. Do not put the APK or copied proprietary resources/code in the public repository.

## Cross-chat persistence

Update docs/project-state.json and regenerate PROJECT_STATE.md. Update TODO, SESSION_LOG, DECISIONS, KNOWLEDGE_BASE, EXPERIMENTS, OPEN_QUESTIONS, CAPABILITY_MATRIX, and ChatJS.md when the work affects them. Keep a chronological history and a precise next step.

## Project identity and restrictions

The product and module name is exactly ChatJS. Do not add ChatJS product version numbering, release tags, version automation, lockfiles, checksums, changelogs, or npm registry publishing. Root ChatJS.md documents the module; /docs is the persistent AI memory and project handbook. ChatJS is independent and not affiliated with OpenAI.
