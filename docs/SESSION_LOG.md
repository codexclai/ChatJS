# ChatJS Session History

Append dated entries for meaningful work. Preserve chronology and actual results.

## 2026-11-18 — Main-only, privacy, strict-scope rules and repository cleanup

### User requirements made permanent
- main is the only permitted branch. Never create, delete, rename, switch to, or check out another branch/worktree; disable branch-generating bots and automation.
- No branch protection/rulesets or repository topics.
- Zero telemetry: no analytics, tracking, ads, profiling, hidden collection, background reporting, phone-home, remote diagnostics, or telemetry dependencies.
- No fake, pretend, canned, hard-coded, placeholder, stub, silent no-op, or predefined production features/responses. Test fixtures are tests-only and never shipped.
- No toy, basic, superficial, demo-only, or partial behavior represented as complete.
- No unrelated files, filler, bloatware, unused scaffolding, decorative material, pointless abstractions, or unjustified dependencies.
- Every file/change must directly support ChatJS, genuine tests, essential build/security checks, necessary governance, or persistent project memory.

### Repository changes
- Verified the live branch list contained only main.
- Removed .github/dependabot.yml because automated update pull requests can create branches.
- Removed unused optional templates: .github/CODEOWNERS, .github/PULL_REQUEST_TEMPLATE.md, CODE_OF_CONDUCT.md, and SUPPORT.md.
- Kept focused CI, CodeQL, Dependency Review, legal/security/contribution records, and issue templates.
- Finalized docs/CHATGPT_PROJECT_INSTRUCTIONS.md below the 6,000-character Project Instructions field limit.
- Updated AI memory, continuation, workflow, repository settings, task queue, architecture, decisions, knowledge, project state, product docs, and session history.

### Source audit
- Inspected both runtime entry points.
- package.json declares no third-party runtime dependencies.
- Current foundation has no outbound service calls or telemetry code. This finding applies only to inspected source; future changes must be reviewed against the permanent zero-telemetry rule.

### Verification
- Previous CI passed all 9 tests, generated-state checks, Markdown link validation, archive integrity, extraction, and CJS/ESM smoke tests.
- Previous CodeQL run succeeded.
- Latest cleanup commit triggered fresh CI and CodeQL runs; they were still in progress at this handoff. Do not call them passed until checked.

### Remaining limitations
- GitHub About description remains empty until the owner pastes the approved wording from REPOSITORY_SETTINGS.md.
- Proprietary all-rights-reserved notice needs legal review.
- APK ZIP layout is confirmed, but APK internals and visible feature surfaces are not yet analyzed.
- ChatGPT feature implementation has not started; current package is a minimal foundation, not a ChatGPT client.

### Next task
Inspect ChatGPT.zip from ChatJS Project → Sources and build an evidence-backed inventory of observable ChatGPT mobile capabilities and authorized programmatic interfaces.
 
## 2026-11-18 — Static APK inventory and public interface research

### Live repository checks
- Confirmed default branch main and branch search returned only main.
- Confirmed no Dependabot configuration or branch-generating update workflow remains.
- Confirmed GitHub About description is already set to: ChatJS — an independent, production-focused Node.js library for comprehensive ChatGPT-compatible capabilities and workflows.
- Confirmed no open issues or pull requests.
- Latest pre-research-change CI run on main (44213974367) passed; latest CodeQL run (44213974407) passed. Documentation changes in this session trigger fresh checks.

### Reference APK inspection
- Located ChatGPT.zip in ChatJS Project → Sources and confirmed it contains one base.apk entry.
- Inspected the Android binary manifest and high-level packaged resource/module names statically.
- Recorded indicators for conversations/streaming, voice/audio, attachments/file preview, image/text processing, search/data sources, code/remote sessions, personalization/projects, health, learning, family, finance, maps, shopping, wallet and Android device integration.
- No emulator/UI session, DEX decompilation, proprietary source extraction, or asset copying was performed. Static package indicators are not proof of active UI behavior, entitlement, granted permissions or public API support.

### Official interface research
- Verified OpenAI recommends the public Responses API for new integrations.
- Verified the Assistants API shut down on August 26, 2026; new integration work must not target it.
- Documented the distinct Sign in with ChatGPT OAuth/plan-usage route, its open-source/local app scope, and its current preview limitations.
- Recorded that plan usage does not expose consumer ChatGPT conversation history or account context. ChatJS's all-rights-reserved notice means OSS eligibility must not be assumed.
- Accepted Responses API as the public integration foundation for new OpenAI model-backed workflows; authentication paths remain separate.

### Scope and implementation status
- No runtime source code, dependencies, package metadata, branch settings or unrelated files were changed in this research unit.
- No ChatGPT feature is implemented yet. Capability statuses remain explicit about research vs implementation.
- GitHub repository description is set. No repository topics or branch protection/rulesets were added.

### Next task
Resolve legal ownership/licensing and Sign in with ChatGPT eligibility without changing LICENSE automatically. In parallel, specify a complete API-key Responses provider slice: credential ownership/redaction, explicit fetch destination, streaming/backpressure/cancellation, timeout/retry rules, typed errors, concurrency isolation and cleanup. Only then implement and test a narrow real text workflow.
