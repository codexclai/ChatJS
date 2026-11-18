# Development Workflow

## Start

1. Read docs/AI_MEMORY.md and docs/CONTINUATION.md.
2. Inspect the live repository, main, complete branch list, latest commit, tasks, decisions, knowledge, experiments and history.
3. Search ChatJS Project → Sources for ChatGPT.zip before requesting the reference APK again.
4. Work only on main. Never create, delete, rename, switch to or publish another branch; never use branch/ref creation or deletion operations. Do not configure or propose branch protection/rulesets or repository topics.
5. Choose one high-priority task and define acceptance criteria before editing.

## Research

- Prefer current official documentation and authoritative sources.
- Record source links, dates, scope and limitations.
- Distinguish official API contracts, public product documentation, observed UI behavior and inference.
- Record unresolved questions rather than hiding uncertainty.
- Check legal, privacy, security, platform and plan limitations early.

## Implementation

- Inspect existing code and conventions.
- Keep changes cohesive and directly related to ChatJS.
- Use the smallest justified dependency set.
- No fake, canned, predefined, mock or placeholder runtime features; test fixtures remain test-only.
- No telemetry, analytics, tracking, profiling, hidden collection, phone-home, background reporting, remote diagnostics or telemetry dependencies.
- No hidden or unsolicited network traffic. Service requests must be explicit, necessary, documented, configured and authorized.
- Define asynchronous behavior, cancellation, concurrency and cleanup.
- Validate inputs; keep credentials/private content out of logs; use stable errors.

## Verification

Run the project check suite before finalizing:
- JavaScript syntax checks.
- Generated project-state synchronization.
- Local Markdown link validation.
- Node.js built-in test suite.
- ChatJS.tar.gz generation and archive-content tests.
- GitHub CI extraction and ESM/CommonJS module-loading smoke tests.

Add focused tests for changed behavior. State clearly if a test was not run or depends on an unavailable service. When network integrations are added, test that no unsolicited requests or telemetry occur.

## Documentation

When behavior or design changes:
- update root ChatJS.md for public API and user-visible behavior;
- update CAPABILITY_MATRIX.md with status and evidence;
- update ARCHITECTURE.md and DECISIONS.md as applicable;
- update TODO.md and ROADMAP.md;
- update docs/project-state.json and regenerate PROJECT_STATE.md;
- append a dated SESSION_LOG.md entry;
- update KNOWLEDGE_BASE.md, EXPERIMENTS.md and OPEN_QUESTIONS.md when relevant.

CI checks generated-state and broken-link drift, but authors remain responsible for semantic accuracy.

## Git hygiene

- Commit focused, descriptive changes directly to main.
- Never create, delete, rename, switch to, publish or modify another branch.
- Never force-push.
- Do not configure or propose branch protection/rulesets or repository topics.
- Review changes for secrets, binary artifacts, unrelated generated files and licensing issues.
- Do not commit dist/ChatJS.tar.gz; CI builds and uploads it as an artifact.

## Finish

Record files changed, actual behavior and remaining gaps, tests actually run, commit references, blockers and the next task. The history must let a different chat resume without asking what happened.