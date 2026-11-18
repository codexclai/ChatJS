# ChatJS — Project Instructions

Persistent engineering partner for **ChatJS**.

## Identity and product
- Repository/module: https://github.com/codexclai/ChatJS; exact package name **ChatJS**.
- Node.js only: ESM, CommonJS and accurate TypeScript.
- Independent project; no OpenAI affiliation or endorsement.
- Reference: ChatGPT mobile first, plus applicable desktop Work and Codex. ChatJS is not a ChatGPT account client.

## Integration exclusions
- Never use OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private ChatGPT backend endpoints, or extracted/reused ChatGPT cookies, tokens, credentials or session protocols.
- Never claim access to ChatGPT chats, saved memory, Projects, custom GPTs, Work tasks, Codex sessions, Remote sessions or Codex Cloud.
- Official product docs/packages are reference evidence only, not integration contracts.
- No non-OpenAI inference engine is selected. Never fake generated replies, reasoning, voice, image generation, code authoring or agent behavior. Implement genuine deterministic local features until an engine is selected.

## Scope
- Prioritize mobile-inspired conversations/context, files, images, voice and projects only where genuine Node.js functionality exists.
- Include desktop Work/Codex equivalents: local workspaces/files, tasks/progress, approvals, command/test execution, repository inspection/diffs, optional browser/computer-use adapters, and local artifacts.
- Exclude health/Health Connect, finance, maps/navigation, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions/features.
- Microphone/camera/screen/desktop control requires an optional platform adapter and explicit permission.
- Git worktrees and branch-based parallelism are forbidden.

## Reference binaries and continuity
- The owner supplied ChatGPT.zip (Android) and a Windows ChatGPT-x64.msix URL. Permitted findings are in docs/REFERENCE_APK.md, docs/REFERENCE_DESKTOP.md and docs/CHATGPT_CAPABILITY_INVENTORY.md.
- The owner intends to clear ChatGPT Project → Sources. Do not request original binaries merely to repeat completed research.
- Never commit official APK/MSIX, app assets, compiled code, private bundled modules, credentials, tokens or private protocols. Preserve independent observations, metadata, public links and implementation requirements only.
- Re-download the desktop installer only for an owner-requested comparison or OS test. Ask for a new Android file only for a specific necessary test when no lawful source exists.
- Do not claim Project Sources are empty until the owner confirms deletion.

## Restore every chat
Read docs/AI_MEMORY.md and CONTINUATION.md; then PROJECT_STATE.md, project-state.json, TODO.md, SESSION_LOG.md, DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md, OPEN_QUESTIONS.md, CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, REFERENCE_APK.md, REFERENCE_DESKTOP.md, ROADMAP.md, ARCHITECTURE.md, WORKFLOW.md and root ChatJS.md. Inspect live main, full branch list, recent commits/tree, issues/PRs and CI. Live main and latest owner direction take precedence.

## Git — absolute
- **main is the only permitted branch.**
- Never create, delete, rename, switch to, publish or work in another branch/worktree. Never invoke branch/ref create/delete tools.
- Never enable branch-generating automation, including Dependabot PRs.
- Commit directly to existing main using non-force fast-forward updates only.
- Check branches before/after work; leave unexpected branches untouched and report them.
- Never configure/propose branch protection/rulesets or repository topics.

## Privacy and relevance
- Zero telemetry: no analytics, tracking, ads, profiling, hidden collection, crash uploads, phone-home, background reporting, remote diagnostics or telemetry dependencies.
- No unsolicited network calls or automatic content upload. External adapters require explicit invocation, configured destination, authorization and data scope.
- Every change must directly support ChatJS, real tests, essential CI/security, governance or project memory. No filler, unrelated features, bloat, pointless abstractions or unjustified dependencies.

## Engineering
- No fake/canned/simulated/hardcoded/mock/placeholder/stub/no-op production behavior. Fixtures/mocks are tests-only.
- Never present a plan, guess, partial, toy or superficial implementation as complete.
- Validate inputs; protect files/private data; redact logs. Specify async behavior, cancellation, concurrency, limits, backpressure, timeouts, errors and cleanup.
- Test success, failure, cancellation, concurrency, security and regressions. Never claim unverified behavior.

## Docs, archive and evidence
- Root ChatJS.md is the user/API manual; /docs is persistent project memory.
- npm run archive builds module-only ChatJS.tar.gz; CI verifies its contents and CJS/ESM loading.
- Label claims Verified, Observed, Inferred, Planned, Blocked or Out of scope. App features/package names do not prove Node.js support. Never claim 1:1 compatibility without repeatable tests.
- Never bypass authentication, access controls, rate limits, TLS or platform security. Never redistribute official app materials.

## No ChatJS product versioning
No product versions/tags, release numbering, automation, lockfiles, changelogs, package version fields, checksum inventories or npm publishing. Package name remains ChatJS; CI uses current Node.js LTS.

## End every meaningful session
Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant docs; run npm run check; verify ChatJS.tar.gz; inspect final tree; record actual results, blockers, commit and exact next task. Keep only main.

**Goal:** a dependable privacy-first Node.js ecosystem inspired by ChatGPT mobile and desktop Work/Codex, without OpenAI service integration, unrelated domains, telemetry, fake features or bloat.
