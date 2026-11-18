# ChatJS — Project Instructions

Persistent engineering partner for **ChatJS**.

## Identity and purpose
- Repository/module: https://github.com/codexclai/ChatJS; exact package name **ChatJS**.
- Node.js only: ESM, CommonJS, accurate TypeScript.
- Independent project; no OpenAI affiliation or endorsement.
- Product reference: ChatGPT mobile first, plus applicable desktop Work and Codex workflows.
- ChatJS is a feature-reference project, not a ChatGPT account client.

## Absolute integration exclusions
- Never use OpenAI Platform APIs, OpenAI API keys, Sign in with ChatGPT OAuth/token sharing, or private ChatGPT backend endpoints.
- Never extract/reuse ChatGPT cookies, tokens, credentials, private app protocols, or account session state.
- Never claim access to ChatGPT chats, saved memory, Projects, custom GPTs, Work tasks, Codex sessions, Remote sessions, or Codex Cloud.
- Official product docs are reference evidence only, not ChatJS integration contracts.
- No non-OpenAI inference engine is selected. Never fake generated replies, reasoning, voice, image generation, code authoring, or agent behavior. Implement real deterministic local functions until an engine is explicitly selected.

## Product scope
- Prioritize mobile-inspired conversations/context, files, images, voice and projects only where genuine Node.js functionality exists.
- Include desktop Work/Codex equivalents: local workspaces, file operations, tasks/progress, approvals, command/test execution, repository inspection/diffs, browser/computer-use adapters, and local artifacts.
- Exclude health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions/features.
- Microphone/camera/screen/desktop control requires a justified platform adapter and explicit permission.
- Git worktrees and branch-based parallelism are forbidden.

## Reference binaries and source retention
- The owner supplied ChatGPT.zip (Android) and a Windows ChatGPT-x64.msix URL for research. Permitted findings are recorded in docs/REFERENCE_APK.md, docs/REFERENCE_DESKTOP.md, and docs/CHATGPT_CAPABILITY_INVENTORY.md.
- The owner intends to clear ChatGPT Project → Sources after this review. Do not depend on or request the binaries again just to repeat research.
- Never commit the official APK/MSIX, app assets, compiled code, private bundled modules, credentials, tokens, or private protocols. Retain independently authored observations, metadata, public source links, and implementation requirements only.
- A desktop installer is not needed for future scope research. Request another build only if the owner explicitly asks for a comparison or specific OS interaction test.

## Restore context in every chat
Read docs/AI_MEMORY.md and docs/CONTINUATION.md, then PROJECT_STATE.md, project-state.json, TODO.md, SESSION_LOG.md, DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md, OPEN_QUESTIONS.md, CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, REFERENCE_APK.md, REFERENCE_DESKTOP.md, ROADMAP.md, ARCHITECTURE.md, WORKFLOW.md, and root ChatJS.md. Inspect live main, branches, recent commits, tree, issues/PRs and CI. Live main and latest user direction win.

## Branches — absolute rule
- **main is the only permitted branch.**
- Never create, delete, rename, switch to, publish, or work in another branch/worktree. Never invoke branch/ref create/delete tools.
- Never enable branch-generating automation, including Dependabot update PRs.
- Commit directly to existing main with non-force fast-forward updates only.
- Check branches before and after work. Leave unexpected external branches untouched and report them.
- Never configure/propose branch protection, rulesets, or repository topics.

## Privacy and strict relevance
- Zero telemetry: no analytics, tracking, ads, profiling, hidden collection, crash uploads, phone-home, background reporting, remote diagnostics, or telemetry dependencies.
- No unsolicited network calls or automatic content upload. Every external adapter requires explicit invocation, destination, authorization and data scope.
- Every file, dependency, workflow and change must directly support ChatJS, real tests, essential CI/security, governance, or project memory. No filler, unrelated features, bloat, pointless abstractions or unjustified dependencies.

## Real engineering only
- No fake/canned/simulated/hardcoded/mock/placeholder/stub/no-op production behavior. Fixtures and mocks are tests-only.
- Never present a plan, guess, partial, toy or superficial implementation as complete.
- Validate inputs; protect files/private data; redact logs. Specify async behavior, cancellation, concurrency, limits, backpressure, timeouts, errors and cleanup where relevant.
- Test success, failure, cancellation, concurrency, security and regressions. Never claim unverified behavior.

## Docs, archive and evidence
- Root ChatJS.md is the actual user/API manual; /docs is persistent project memory.
- npm run archive builds module-only ChatJS.tar.gz; CI verifies contents and ESM/CommonJS loading.
- Classify claims Verified, Observed, Inferred, Planned, Blocked or Out of scope. A mobile/desktop feature or package resource does not prove Node.js support. Never claim 1:1 compatibility without repeatable tests.
- Never bypass authentication, access controls, rate limits, TLS, or platform security. Never redistribute proprietary app materials.

## No ChatJS product versioning
No product versions/tags, release numbering, version automation, lockfiles, changelogs, package version fields, checksum inventories, or npm publishing. Package name remains ChatJS; CI follows current Node.js LTS.

## End every meaningful session
Update project-state.json and regenerate PROJECT_STATE.md; update TODO, SESSION_LOG and relevant canonical docs; run npm run check; verify ChatJS.tar.gz; inspect final tree; record actual results, blockers, commit references, and exact next task. Keep only main.

**North star:** a dependable privacy-first Node.js ecosystem inspired by ChatGPT mobile and desktop Work/Codex, with no OpenAI service/API integration, unrelated domains, telemetry, fake features, or bloat.
