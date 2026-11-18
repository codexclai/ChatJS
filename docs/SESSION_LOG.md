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

 
### Verification of the research commit
- Commit 6a49b98f233527714462c53b35c5d5a533b4154f: CI run 44286673988 completed successfully on current Node.js LTS.
- The CI steps passed JavaScript syntax checks, generated project-state synchronization, Markdown link validation, the Node.js test suite, ChatJS.tar.gz archive build/integrity checks, extracted CommonJS and ESM smoke tests, and archive artifact upload.
- All 9 tests passed; the uploaded ChatJS artifact is 5,910 bytes (artifact ID 14419396712).
- CodeQL run 44286674156 completed successfully on the same commit.
- Project-state JSON and generated PROJECT_STATE.md were checked for exact synchronization. The session-log update itself is a documentation-only commit and is followed by fresh CI/CodeQL validation.

## 2026-11-18 — Owner clarification: mobile-first product scope and desktop Work/Codex

### Direction superseding prior assumptions
- Owner clarified ChatJS is a mobile-first Node.js implementation inspired by ChatGPT mobile, with applicable ChatGPT desktop Work and Codex capabilities.
- Owner explicitly excluded OpenAI Platform APIs, OpenAI API keys, Sign in with ChatGPT OAuth/token sharing, and private ChatGPT backend endpoints. The earlier Responses API/API-key/OAuth direction is withdrawn; it was not implemented.
- Owner explicitly excluded health/Health Connect, finance/banking, maps/navigation, shopping, wallet, and unrelated mobile permissions/features.
- ChatJS must not claim access to ChatGPT account history, saved memory, Projects, custom GPTs, Work tasks, Codex sessions, Remote sessions, or Codex Cloud.
- No non-OpenAI inference engine has been selected. Model-powered behavior must remain unimplemented rather than simulated.

### Product research
- Rechecked ChatGPT.zip in Project Sources; it remains present and contains base.apk.
- Reviewed official current ChatGPT Work/Codex, new desktop app, Voice, Projects, and Codex documentation.
- Documented desktop Chat/Work/Codex separation, permissioned local files/apps, cloud/local task-context distinction, scheduling concepts, desktop Codex local folders/repositories/terminals/developer tools, and mobile Remote access to supported desktop Codex sessions.
- Documented mobile Voice Live versus Advanced boundary and the dated notice that Advanced/Standard are scheduled to retire December 11, 2026.
- No desktop installer/executable is required for product-scope research; a local app/session may help later for a specific OS interaction test.

### Scope decisions
- Reclassified APK package indicators versus actual Node.js suitability.
- Local workspaces, bounded file operations, task lifecycle, safe process execution, Git inspection/diffs, approvals, and local artifact generation are the first Node.js-aligned foundations.
- Native microphone/camera/screen/desktop control requires explicit platform adapters; Android permissions do not transfer to Node.js.
- Git worktrees and branch-based parallelism are excluded because the repository must remain on main only.
- No runtime implementation or dependency was added in this scope correction.

### Next task
Specify and implement a local Work/Codex vertical slice: a caller-selected, path-confined workspace with bounded file operations. Define symlink/race handling, size/depth limits, cancellation, atomic writes, and tests before exposing the public API.

 
## 2026-11-18 — Windows MSIX static inspection and durable reference handoff

- Downloaded the supplied Windows x64 MSIX to temporary browser storage (1,057,802,768 bytes; response Last-Modified 2026-11-14).
- Inspected AppxManifest.xml, package listing and Electron ASAR directory/package metadata. Identity OpenAI.Codex, x64, display name ChatGPT; Appx version 26.1111.2228.0; embedded Electron package metadata names Codex / openai-codex-electron / 26.1111.21308.
- Observed ChatGPT.exe and separate Codex.exe; Electron/Chromium; bundled Node runtime; command runner/code-mode host; Windows sandbox service/setup; node-pty/ConPTY; browser native host; computer-use executables; plugin/skill resources; Explorer OpenProjectInCodex context menu; codex: protocol; .skill and document/spreadsheet associations; screen-capture capability declarations.
- Signature/blockmap files were present but signature verification was not performed. App was not installed/launched/signed into. No proprietary source, binaries, docs, plugins, assets, tokens, cookies or private protocols were extracted, executed or copied.
- Added docs/REFERENCE_DESKTOP.md and linked it from the capability inventory, knowledge base and project index. Updated Android reference and future-chat continuity rules.
- The owner intends to clear ChatGPT Project → Sources after this review. This records intention only; never claim Sources are empty until the owner confirms it.
- Original Android APK and Windows MSIX are not committed to the public repo. Permitted, independently authored observations and implementation implications are the durable reference.
- Next: define a secure read-only local workspace contract and implement it as the first deterministic Work/Codex feature.


## 2026-11-18 — Android archive preserved in private Library

- Created the personal Library folder /ChatJS-Reference-Archives.
- Copied the supplied ChatGPT.zip archive (54,869,202 bytes) into /ChatJS-Reference-Archives/ChatGPT-Android.zip from the existing imported file snapshot.
- Verified the Library listing showed ChatGPT-Android.zip (54,869,202 bytes, application/zip).
- Re-materialized that exact Library file back into the working container successfully. This confirms the retained copy is accessible independently of Project Sources.
- Updated future-chat instructions to use this personal Library path; do not request the owner to attach ChatGPT.zip again merely to repeat inspection.
- The Windows MSIX (1,057,802,768 bytes) is not retained as a binary. Its exact official URL and static package findings remain in docs/REFERENCE_DESKTOP.md for an explicitly requested future re-download/comparison.
- Neither proprietary binary is committed to public GitHub. The public repo retains independently authored observations, package metadata and implementation requirements.
- The owner intends to clear Project Sources; actual deletion is not confirmed by this session.
