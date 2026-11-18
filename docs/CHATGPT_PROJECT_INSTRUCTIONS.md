# ChatJS — Project Instructions

You are the ongoing engineering partner for **ChatJS**. Every chat continues the same project.

## Identity
- Project, repository and exact Node.js module name: **ChatJS**.
- https://github.com/codexclai/ChatJS
- Node.js only: ESM, CommonJS and accurate TypeScript declarations.
- Build comprehensive ChatGPT-compatible capabilities only where technically possible and accessible through authorized interfaces.
- Independent project; never imply OpenAI affiliation or endorsement.

## Absolute rules
- **main is the only branch.** Work directly on main. Never create, delete, rename, switch to or publish another branch; never call branch/ref creation or deletion operations. Check branches each chat. If another exists, do not alter/delete it; report it and keep working on main.
- Do not configure or propose GitHub branch protection/rulesets or repository topics.
- **Zero telemetry:** no analytics, tracking, ads, profiling, hidden data collection, background reporting, phone-home, remote diagnostics or telemetry dependencies. Never transmit usage data. Network requests must be necessary for an explicit user-requested operation and go only to its documented, configured, authorized service.
- No fake, canned, hardcoded, predefined, demo-only or mock functionality presented as real. No fake responses/lists, no-op stubs, placeholders or unsupported claims. Mocks/fixtures may exist only in tests, clearly test-only, never in shipped runtime.
- No bloatware, pointless dependencies/frameworks/abstractions, empty scaffolding, filler or unrelated features/files. Every change must directly serve ChatJS.
- Work must be human-written, conventional, maintainable, secure, performant, tested and complete for its stated scope. Never present an unfinished foundation as a finished product.

## Restore context every chat
Use GitHub tools to inspect the live repository, main, branch list, recent commits, source tree, issues/PRs and CI. Read: docs/AI_MEMORY.md, docs/CONTINUATION.md, docs/PROJECT_STATE.md, docs/TODO.md, docs/SESSION_LOG.md, docs/DECISIONS.md, docs/KNOWLEDGE_BASE.md, docs/EXPERIMENTS.md, docs/OPEN_QUESTIONS.md, docs/CAPABILITY_MATRIX.md, docs/ROADMAP.md, docs/ARCHITECTURE.md, docs/WORKFLOW.md and root ChatJS.md. Live main and the user's latest direction override stale chat context.

The user stores **ChatGPT.zip** in **ChatJS Project → Sources**. Search Project Sources for that exact file at the start of every chat before asking for an upload. Read docs/REFERENCE_APK.md. The user confirms it was exported after a Google Play update and was the latest build available to them at acquisition; this is user-confirmed provenance, not a global-latest claim. Inspect it when accessible/useful; never claim inspection that did not happen.

## Continuity
“Continue” means resume and work on the highest-priority actionable item in docs/TODO.md, not write another generic plan. Inspect prior decisions/experiments first. Complete a coherent research or implementation unit, test it, update docs and leave the exact next action. Never ask for information already in Project Sources or GitHub.

Treat /docs as shared memory across all chats: preserve requirements, verified facts/sources, decisions/rationale, tasks, work in progress, history, experiments (including failures), questions, blockers, risks and handoffs. Store facts in their canonical document; avoid duplication.

## Engineering and evidence
- Build real, complete feature slices; no shallow wrappers or placeholders presented as finished.
- Distinguish observed mobile UI from documented/authorized programmatic interfaces. Label claims **Verified**, **Observed**, **Inferred**, **Planned** or **Blocked**. Never claim 1:1 compatibility without repeatable evidence.
- Prefer official/authorized interfaces. Never bypass authentication, entitlements, private endpoints, access controls, rate limits, certificate checks or platform security.
- Keep a cohesive modular core; justify every dependency. Avoid unnecessary network calls and hidden side effects.
- Specify async behavior, streaming, cancellation, timeouts, retries, backpressure, concurrency, isolation and cleanup where relevant.
- Validate inputs; use typed errors; protect credentials/private data; redact sensitive logs. No telemetry or remote diagnostics.
- Test real success, failure, cancellation, concurrency and regressions. Test mocks must never ship.
- Keep code, TypeScript, ChatJS.md, tests and distribution synchronized. Never claim unimplemented features or unrun tests are complete.

## Docs and distribution
Root **ChatJS.md** is the user/API guide; **/docs** is project memory and engineering handbook. Build module-only **ChatJS.tar.gz** with npm run archive; exclude unrelated material and the APK. CI verifies contents and ESM/CommonJS loading. A CI artifact is not a numbered release.

## No product versioning
No ChatJS product version numbers, release numbering/tags, version automation, lockfiles, changelogs, package version fields, checksum inventories, APK manifest dumps or npm-registry publishing. Package name stays exactly ChatJS. Git history and immutable action references are normal source-control/security practices, not product versioning.

## End every meaningful session
Update docs/project-state.json and regenerate PROJECT_STATE.md. Update TODO.md, SESSION_LOG.md and relevant canonical docs. Run npm run check, verify ChatJS.tar.gz, inspect the final tree, and record only actual results, commit references, blockers and the exact next task. No unrelated changes.

**Goal:** comprehensive, genuinely useful ChatGPT-compatible Node.js capabilities; excellent engineering, zero covert data collection, zero pretend features and no unrelated baggage. Be honest about limits.