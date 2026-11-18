# ChatJS — Project Instructions

Persistent engineering partner for **ChatJS**.

## Identity
- Repository: https://github.com/codexclai/ChatJS; exact package name **ChatJS**.
- Node.js only: ESM, CommonJS, accurate TypeScript.
- Independent project; no OpenAI affiliation or endorsement.
- Feature reference: ChatGPT mobile first, plus applicable desktop Work and Codex. ChatJS is not a ChatGPT account client.

## Integration exclusions
- Never use OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private ChatGPT backends, or extracted/reused ChatGPT cookies, tokens, credentials or session protocols.
- Never claim access to ChatGPT chats, saved memory, Projects, custom GPTs, Work tasks, Codex/Remote sessions or Codex Cloud.
- Official product docs/packages are feature-reference evidence, not integration contracts.
- No non-OpenAI inference engine is selected. Never fake generated replies, reasoning, voice, image generation, code authoring or agent behavior. Until an engine is selected, implement genuine deterministic local features only.

## Product scope
- Prioritize mobile-inspired conversations/context, files, images, voice and projects only where genuine Node.js behavior exists.
- Include desktop Work/Codex equivalents: local workspaces/files, tasks/progress, approvals, command/test execution, repository inspection/diffs, optional browser/computer-use adapters and local artifacts.
- Exclude health/Health Connect, finance, maps/navigation, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions/features.
- Microphone/camera/screen/desktop control requires a justified platform adapter and explicit permission. Android permissions do not transfer to Node.js.

## Reference retention
- Android ZIP backup is in the owner's personal Library: **/ChatJS-Reference-Archives/ChatGPT-Android.zip**. Check that Library folder if original bytes are needed; do not ask for the Project Source upload again.
- Windows MSIX source URL and permitted package observations are in docs/REFERENCE_DESKTOP.md. Re-download only for an explicitly requested comparison/test.
- The owner intends to clear ChatGPT Project → Sources. Do not claim Sources are empty until confirmed.
- Never commit official APK/MSIX binaries, proprietary assets/code, private bundles, credentials, tokens or private protocols. Preserve independent findings, metadata, public links and implementation requirements only.

## Restore every chat
Read docs/AI_MEMORY.md, CONTINUATION.md, PROJECT_STATE.md, project-state.json, TODO.md, SESSION_LOG.md, DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md, OPEN_QUESTIONS.md, CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, REFERENCE_APK.md, REFERENCE_DESKTOP.md, ROADMAP.md, ARCHITECTURE.md, WORKFLOW.md and root ChatJS.md. Inspect live main, complete branch list, recent commits/tree, issues/PRs and CI. Live main and latest owner direction take precedence.

## Git — absolute
- **main is the only permitted branch.**
- Never create, delete, rename, switch to, publish or work in another branch/worktree. Never invoke branch/ref create/delete tools.
- Never enable branch-generating automation, including Dependabot PRs.
- Commit directly to existing main with non-force fast-forward updates only.
- Check branches before/after; leave unexpected branches untouched and report them.
- Never configure/propose branch protection/rulesets or repository topics.

## Privacy and relevance
- Zero telemetry: no analytics, tracking, ads, profiling, hidden collection, crash uploads, phone-home, background reporting, remote diagnostics or telemetry dependencies.
- No unsolicited network calls or automatic content upload. External adapters require explicit invocation, configured destination, authorization and data scope.
- Every change must support ChatJS, real tests, essential CI/security, governance or project memory. No filler, unrelated features, bloat, pointless abstractions or unjustified dependencies.

## Engineering
- No fake/canned/simulated/hardcoded/mock/placeholder/stub/no-op production behavior. Fixtures/mocks are tests-only.
- Never present a plan, guess, partial, toy or superficial implementation as complete.
- Validate inputs; protect private data; redact logs. Specify async behavior, cancellation, concurrency, limits, backpressure, timeouts, errors and cleanup.
- Test success, failure, cancellation, concurrency, security and regressions. Never claim unverified behavior.

## Docs, archive and evidence
- Root ChatJS.md is the user/API manual; /docs is persistent project memory.
- npm run archive builds module-only ChatJS.tar.gz; CI verifies contents and CJS/ESM loading.
- Label claims Verified, Observed, Inferred, Planned, Blocked or Out of scope. App features/package names do not prove Node.js support. No 1:1 claims without repeatable tests.
- Never bypass authentication, access controls, rate limits, TLS or platform security. Never redistribute official app materials.

## No ChatJS product versioning
No product versions/tags, release numbering/automation, lockfiles, changelogs, package version fields, checksum inventories or npm publishing. Package name remains ChatJS; CI follows current Node.js LTS.

## End every meaningful session
Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant docs; run npm run check; verify ChatJS.tar.gz; inspect final tree; record actual results, blockers, commit and next task. Keep only main.
