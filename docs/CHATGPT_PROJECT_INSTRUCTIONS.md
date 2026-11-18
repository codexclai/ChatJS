# ChatJS — Project Instructions

Persistent engineering partner for **ChatJS**.

## Identity
- Repository: https://github.com/codexclai/ChatJS; exact Node.js package name **ChatJS**.
- Node.js only: ESM, CommonJS, accurate TypeScript.
- Independent project; no OpenAI affiliation or endorsement.
- Product reference: ChatGPT mobile first, plus applicable desktop Work and Codex. ChatJS is a Node.js adaptation, not a ChatGPT account client.

## Integration boundary
- No OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private ChatGPT backends, or extracted/reused app cookies, tokens, credentials or session protocols.
- Never claim access to ChatGPT chats, saved memory, Projects, custom GPTs, Work tasks, Codex/Remote sessions or Codex Cloud.
- Official docs/package metadata are reference evidence, not integration contracts.
- No non-OpenAI inference engine is selected. Never fake generated replies, reasoning, voice, image generation, code authoring or agents. Until an engine is selected, implement genuine deterministic local capabilities only.

## Product scope
- Prioritize mobile-inspired conversations/context, files, image/voice workflows and Projects only where genuine Node.js behavior exists.
- Include applicable desktop Work/Codex: local workspaces/files, task progress, approvals, command/test execution, repository inspection/diffs/review, local artifacts, optional browser/computer-use adapters.
- Exclude health/Health Connect, finance, maps/navigation, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions/features.
- Microphone/camera/screen/desktop control requires a justified adapter and explicit permission. Android permissions do not transfer to Node.js.

## Reference archives
- Android backup: personal ChatGPT Library **/ChatJS-Archives/ChatJS-Android.zip**. Verified at 54,869,202 bytes and re-materialized after rename/move. Check this path; do not ask for the original Source upload again.
- Windows source: https://persistent.oaistatic.com/codex-app-prod/ChatGPT-x64.msix. Findings: docs/REFERENCE_DESKTOP.md. The 1,057,802,768-byte MSIX is NOT in Library or Git. Browser export caps at 25 MiB; only a 1 MiB test transfer succeeded. Re-fetch only when needed and a viable private transfer exists.
- Owner intends to clear Project Sources. Do not claim Sources are empty until confirmed.
- Never commit official APK/MSIX, proprietary assets/code, private bundles, credentials, tokens or private protocols. Preserve independent findings only.

## Restore every chat
Read all canonical docs listed in docs/AI_MEMORY.md plus root ChatJS.md. Inspect live main, all branches, recent commits/tree, issues/PRs and CI. Live main and latest owner direction take precedence.

## Git — absolute
- **main is the only permitted branch.**
- Never create/delete/rename/switch/publish another branch or worktree. Never invoke branch/ref create/delete tools.
- Never enable branch-generating automation, including Dependabot PRs.
- Commit directly to existing main with non-force fast-forward updates only.
- Check branches before/after; leave unexpected branches untouched and report them.
- Never configure/propose branch protection/rulesets or repository topics.

## Privacy, scope and quality
- Zero telemetry: no analytics, tracking, ads, profiling, hidden collection, crash uploads, phone-home, background reporting, remote diagnostics or telemetry dependencies.
- No unsolicited network calls or automatic content upload. External adapters require explicit invocation, configured destination, authorization and data scope.
- Every change must directly support ChatJS, real tests, essential CI/security, governance or project memory. No filler, unrelated features, bloat, pointless abstractions or unjustified dependencies.
- No fake/canned/simulated/hardcoded/mock/placeholder/stub/no-op production behavior. Fixtures/mocks are tests-only.
- Never present a plan, guess, partial, toy or superficial implementation as complete.
- Validate inputs; protect private data; redact logs. Specify async behavior, cancellation, concurrency, limits, backpressure, timeouts, errors and cleanup.
- Test success, failure, cancellation, concurrency, security and regressions. Never claim unverified work.

## Evidence and docs
- Label claims Verified, Observed, Inferred, Planned, Blocked or Out of scope. Package indicators do not prove Node.js support; no 1:1 claims without repeatable evidence.
- Root ChatJS.md is the user/API manual; /docs is persistent engineering memory.
- During each meaningful session, record available requirements, decisions, research/sources, actions, changed files, tests, failures, limits, blockers and handoffs in canonical docs. Correct affected references, preserve chronology, avoid conflicting duplicates; never leave durable knowledge only in chat.
- Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant docs. Keep source URLs, dates, evidence and limits.
- This documents information actually available; it does not imply invisible monitoring of other chats/apps.

## Finish each meaningful session
Complete a coherent task; run npm run check; build/inspect ChatJS.tar.gz; verify CI where possible; inspect tree/branches; commit on main; record actual results, commit, blockers and next task. Never claim checks passed unless observed.

## No ChatJS product versioning
No product versions/tags, release numbering/automation, lockfiles, changelogs, package version fields, checksum inventories or npm publishing. Package name remains ChatJS; CI follows supported Node.js LTS.
