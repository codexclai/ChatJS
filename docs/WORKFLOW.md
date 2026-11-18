# Development Workflow

## Start
1. Read AI_MEMORY.md and CONTINUATION.md.
2. Inspect live main, complete branch list, latest commit/tree, issues/PRs, CI and TODO.
3. Use REFERENCE_APK.md and REFERENCE_DESKTOP.md as evidence. Android archive: Library /ChatJS-Archives/ChatJS-Android.zip. Windows MSIX is not retained; use its official URL when needed. Do not request original binaries merely to repeat inspection; the owner intends to clear Project Sources.
4. Work only on main. Never create/delete/rename/switch branches or worktrees. Do not configure/propose branch protection, rulesets or repository topics.
5. Choose one high-priority task and define acceptance criteria.

## Product boundary
- Mobile-first ChatGPT feature reference, with applicable desktop Work/Codex capabilities translated into Node.js.
- No OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth/token sharing, private backends, cookies/tokens/session state.
- Official product docs and package metadata are reference evidence, not integration contracts.
- No non-OpenAI inference engine is selected; never fake generated answers, agents, voice or image generation.
- Exclude health, finance, maps, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions.
- Node.js does not inherit Android permissions. Desktop/mobile device access needs a specific platform adapter and explicit approval.

## Persistent documentation
Record meaningful requirements, decisions, research/sources, actions, changed files, tests, failures, limits, blockers and handoffs in canonical docs. Update affected references, state JSON/generated Markdown, TODO and chronological session log. Distinguish verified, intended and blocked; never claim invisible monitoring or unperformed work.

## Research
- Prefer current official product and Node.js/OS documentation.
- Record URLs, inspection dates, scope, evidence class and limitations.
- Separate APK/MSIX package indicators from visible product behavior and supported Node.js APIs.
- Separate local ChatJS features from ChatGPT account/cloud-only services.
- Do not copy official source/assets/binaries, private protocols or credentials.

## Implementation
- Every change must directly serve ChatJS.
- Use the smallest justified dependency set.
- No fake, canned, mock, placeholder or no-op runtime features.
- Zero telemetry, hidden collection, phone-home, background reporting or unsolicited network traffic.
- Filesystem/process operations need explicit caller scope, validation, limits, cancellation, approvals and cleanup.
- Command execution uses executable/argv separately, no shell by default, and a policy gate.
- External/platform adapters require explicit configuration, permissions, authorization and side-effect review.
- Protect private data; redact logs; do not persist content silently.

## Verification
Run npm run check: syntax, generated-state sync, local Markdown links, Node tests, ChatJS.tar.gz archive contents/integrity. CI also extracts the archive and smoke-tests CommonJS/ESM loading. Add success/failure/cancellation/concurrency/security tests as relevant; state tests not run.

## Documentation and finish
Update root ChatJS.md for actual APIs; update capability matrix/inventory, architecture/decisions, TODO/roadmap, project-state JSON and generated state, knowledge/experiments/open questions as relevant; append SESSION_LOG.md.
Commit focused changes directly to main. Never force-push or create/delete/rename/switch branches/worktrees. Do not commit dist archive or proprietary binaries. Record actual files, behavior, gaps, tests, commit, blockers and next task.
