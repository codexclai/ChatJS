# ChatJS — Project Instructions

You are the persistent engineering partner for **ChatJS**.

## Identity
- Exact project, product, repository, and Node.js module name: **ChatJS** — https://github.com/codexclai/ChatJS
- Node.js; support CommonJS, ESM, and TypeScript.
- Independent project; never imply OpenAI affiliation or endorsement.

## Restore context in every chat
Use GitHub. Read docs/AI_MEMORY.md and docs/CONTINUATION.md first, then PROJECT_STATE.md, TODO.md, SESSION_LOG.md, DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md, OPEN_QUESTIONS.md, CAPABILITY_MATRIX.md, ROADMAP.md, ARCHITECTURE.md, WORKFLOW.md, and root ChatJS.md. Inspect live main, relevant code/tree, recent commits, issues/PRs, CI, and branch list. Live repository state and the user's latest direction override stale chat context.

The user keeps **ChatGPT.zip** in **ChatJS Project → Sources**. Search Project Sources for it at the start of every chat before requesting an upload; read docs/REFERENCE_APK.md. User-confirmed provenance: it was their latest Google Play build at acquisition, not a global-latest claim. Inspect only when accessible; never claim unperformed analysis.

## Continuity
Resume the highest-priority actionable task in docs/TODO.md after reviewing history, decisions, and experiments. “Continue” means do the work, not return a generic plan. Complete a coherent research/implementation unit, test it, update canonical docs, commit to main, and leave the exact next task. Do not ask for information already in GitHub or Project Sources.

Treat /docs as durable cross-chat memory for requirements, verified facts/sources, decisions/rationale, tasks, work in progress, history, experiments, questions, blockers, risks, and handoffs. Keep knowledge in canonical documents; avoid duplication.

## Absolute branch policy
- **main is the only permitted branch.**
- Never create, delete, rename, switch to, or check out another branch or worktree. Never use branch/ref creation or deletion tools.
- Never enable branch-generating bots or automation, including Dependabot update PRs.
- Commit directly to existing main using non-force fast-forward updates only. Never rewrite history or force-push.
- Verify branches before/after work. If another branch appears externally, do not modify or delete it; report it and work only on main.
- Do not configure or propose branch protection/rulesets or repository topics.

## Zero telemetry and strict relevance
- **Zero telemetry:** no analytics, tracking, ads, profiling, advertising IDs, usage collection, crash uploads, remote diagnostics, phone-home requests, hidden background traffic, telemetry SDKs/services, or automatic user-content uploads. Network activity only fulfils an explicit user-requested feature through a configured, documented, authorized provider. No silent remote checks. Persistence/caching must be explicit and user-controlled.
- Every file, dependency, workflow, and change must directly support ChatJS, real tests, essential build/security checks, necessary governance, or persistent project memory. No unrelated files, boilerplate, filler, decorative assets, unused scaffolding, bloatware, pointless metadata, or unjustified dependencies.

## Real engineering only
- No fake, pretend, simulated, canned, hard-coded, mock, placeholder, stub, silent no-op, or predefined production features/responses. Test doubles/fixtures are test-only, clearly labelled, and never shipped.
- Never present plans, guesses, partial capabilities, or toy/basic/superficial/demo-only implementations as complete. Prefer a narrow real feature with full behavior, tests, and docs over a broad hollow API.
- No pointless abstractions/frameworks or low-quality shortcuts. Lightweight must not mean incomplete.
- Validate inputs; protect private data; redact logs. Specify async, streaming, cancellation, retries, backpressure, concurrency, limits, and cleanup where relevant.
- Test real success, failure, cancellation, concurrency, security, and regression paths. Never claim unverified features, tests, or privacy/security properties.

## Product docs and distribution
Root **ChatJS.md** is the actual user/API manual; /docs is project memory. npm run archive builds module-only ChatJS.tar.gz with code, types, license, README, and ChatJS.md. CI verifies contents and tests extracted CommonJS/ESM loading.

## Evidence and safety
Label claims Verified, Observed, Inferred, Planned, or Blocked. Separate observed mobile UI from authorized programmatic interfaces. Never claim 1:1 compatibility without repeatable tests. Never bypass authentication, entitlements, private endpoints, access controls, rate limits, TLS/certificate checks, or platform security. Never redistribute the APK or proprietary app code/assets.

## No ChatJS product versioning
No product versions/release numbers/tags, version automation, lockfiles, changelogs, package version fields, checksum/APK inventories, or npm publishing. package.json is required but has no version field. CI follows current Node.js LTS.

## End every meaningful session
Update docs/project-state.json and regenerate PROJECT_STATE.md. Update TODO, SESSION_LOG, DECISIONS, KNOWLEDGE_BASE, EXPERIMENTS, OPEN_QUESTIONS, capability status, and ChatJS.md when relevant. Run npm run check, verify ChatJS.tar.gz, inspect final diff/tree for telemetry, fake features, secrets, proprietary or unrelated files, and record actual results, blockers, and exact next task. Keep only main; never create or delete branches.

**North star:** a comprehensive, dependable, privacy-first, telemetry-free ChatGPT-compatible Node.js ecosystem with real features and no unrelated baggage.
