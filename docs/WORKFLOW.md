# Development Workflow

## Start

1. Read docs/AI_MEMORY.md and docs/CONTINUATION.md.
2. Inspect live repository/main, full branch list, latest commit, tree, issues/PRs, CI and TODO.
3. Search ChatJS Project → Sources for ChatGPT.zip before asking for another upload.
4. Work only on main. Never create/delete/rename/switch branches or worktrees. Do not configure or propose branch protection/rulesets or repository topics.
5. Choose one high-priority task and define acceptance criteria before editing.

## Product boundary

- ChatJS is mobile-first, with applicable desktop Work/Codex capabilities translated into Node.js.
- Do not use OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth/token sharing, private ChatGPT backend endpoints, or app cookies/tokens/session state.
- Treat official ChatGPT product docs only as descriptions of the reference app.
- No non-OpenAI inference engine is selected. Do not fake generated answers, agent behavior, voice or image generation.
- Exclude health, finance, maps, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions/features.
- See CHATGPT_CAPABILITY_INVENTORY.md and DECISIONS.md.

## Research

- Prefer current official product documentation and authoritative Node.js/OS documentation.
- Record source links, access dates, scope, limitations and evidence class.
- Separate observed APK package indicators from actual user-visible product behavior.
- Separate ChatGPT app features from Node.js local capabilities and account-only/cloud services.
- Record unknowns and blockers rather than converting assumptions into facts.

## Implementation

- Inspect existing code and prior experiments before editing.
- Every change must directly serve ChatJS.
- Use the smallest justified dependency set.
- No fake, canned, mock, placeholder or no-op runtime features.
- Zero telemetry, hidden collection, phone-home, background reporting or unsolicited network traffic.
- Local filesystem/process operations require explicit caller scope, validated inputs, limits, cancellation and cleanup.
- Command execution must use explicit executable/argv, no shell by default, and an approval policy.
- External/platform adapters require explicit configuration, permissions, authorization and side-effect review.
- Protect credentials and private data; redact logs; do not persist content silently.

## Verification

Run npm run check before finalizing:
- JavaScript syntax checks.
- Generated project-state synchronization.
- Local Markdown link validation.
- Node.js built-in test suite.
- ChatJS.tar.gz generation and archive-content tests.
- CI extraction and CommonJS/ESM package-loading smoke tests.

Add tests for success, failure, cancellation, concurrency, security and regressions as relevant. State clearly if a test was not run.

## Documentation

When behavior or design changes:
- update root ChatJS.md for actual public API/user-visible behavior;
- update CAPABILITY_MATRIX.md and CHATGPT_CAPABILITY_INVENTORY.md;
- update ARCHITECTURE.md and DECISIONS.md as applicable;
- update TODO.md and ROADMAP.md;
- update project-state.json and regenerate PROJECT_STATE.md;
- append SESSION_LOG.md;
- update KNOWLEDGE_BASE.md, EXPERIMENTS.md and OPEN_QUESTIONS.md when relevant.

## Git hygiene

- Commit focused, descriptive changes directly to main.
- Never create/delete/rename/switch/publish/modify another branch or worktree.
- Never force-push.
- Review changes for secrets, binaries, unrelated generated files and proprietary content.
- Do not commit dist/ChatJS.tar.gz; CI builds and uploads it.

## Finish

Record changed files, actual behavior, gaps, tests, commit references, blockers and the next exact task. No background work or future-delivery promises.
