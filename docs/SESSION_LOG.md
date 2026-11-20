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


## 2026-11-18 — Archive consolidation and documentation completeness

- Created private Library folder /ChatJS-Archives.
- Moved Android archive from /ChatJS-Reference-Archives/ChatGPT-Android.zip to /ChatJS-Archives/ChatJS-Android.zip; deleted old empty folder.
- Verified Library listing: exact name/path, 54,869,202 bytes. Re-materialized moved file successfully to /mnt/data/chatjs-android-final-check/ChatJS-Android.zip.
- Windows request: owner wants private ChatJS-Windows.zip. Original is a 1,057,802,768-byte MSIX; changing extension alone would not produce a ZIP or preserve installer format.
- Transfer investigation: browser VM held prior download; browser file export caps at 25 MiB. A 1 MiB test chunk exported, but full direct container download failed. No complete Windows file was copied to Library, Sources or Git. Blocked; official URL/static inventory remain in REFERENCE_DESKTOP.md.
- Updated Project Instructions, AI Memory, Continuation, Android/Desktop references, TODO, Knowledge Base and workflow.
- Owner requires comprehensive contemporaneous documentation. Canonical workflow records available meaningful requirements, decisions, research, actions, files, tests, failures, limits, blockers and handoffs, without claiming invisible monitoring.
- Owner intends to clear Project Sources; deletion is not confirmed.

## 2026-11-18 — Cross-chat context restoration and archive/instruction handoff

- Owner reaffirmed the required private archive folder name `ChatJS-Archives`, requested complete copy/paste-ready ChatGPT Project Instructions, and requires meaningful project work—including Library/reference handling—to be documented contemporaneously and carried forward between chats.
- Inspected the live public repository before continuing. Branch listing contained exactly one branch, `main`; current HEAD at inspection was `f1ec13ba581c2afc289b0695e5762e0eda360b44`. No issues or pull requests were returned by the repository searches.
- Verified the private Library folder listing contains `/ChatJS-Archives/ChatJS-Android.zip`, MIME type `application/zip`, size 54,869,202 bytes. This verifies the current Library record, not a fresh re-materialization in this session.
- The current conversation file listing returned no attached items. This does not establish whether ChatGPT Project → Sources were cleared; that remains unconfirmed and must not be represented as complete.
- Verified the committed `docs/CHATGPT_PROJECT_INSTRUCTIONS.md` is 5,611 characters, below the previously established 6,000-character Project Instructions field limit. It records the main-only rule, private archive location, required reading, evidence labels, contemporaneous documentation, privacy/security constraints and session finish requirements. The exact committed content is to be supplied to the owner for pasting into the Project Instructions field; the field itself was not edited from this session.
- Verified pre-update workflows on the inspected HEAD: CI run 44294288693 succeeded and CodeQL run 44294288642 succeeded. Documentation cleanup below triggers fresh checks; do not infer their result until observed.
- Removed exact duplicate private-archive/documentation policy sections from `docs/DECISIONS.md`, duplicate archive-transfer experiment entry from `docs/EXPERIMENTS.md`, and a duplicated archive-retention paragraph from root `README.md`.
- No runtime source, public API, dependency, binary or product-scope change was made. Android/MSIX binaries remain excluded from public Git; Windows MSIX retention remains blocked as documented in `docs/REFERENCE_DESKTOP.md`.
- Next engineering priority remains the bounded, caller-selected, read-only local workspace contract in `docs/TODO.md`; do not skip its symlink/junction, traversal, size/count/depth, cancellation, concurrency and filesystem-race requirements.
- Follow-up review found the archive-transfer experiment uses a third-level Markdown heading, so the first duplicate-section pass did not touch it. Removed the remaining exact duplicate subsection after comparing its full content; one canonical entry remains.

### Additional handoff detail recorded from the recovered prior-chat transcript

- The owner asked for the original Android APK and Windows desktop MSIX to remain available to future chats without repeated uploads, preferably in Project Sources when feasible and otherwise in personal Library. The owner requested the names `ChatJS-Android.zip` and `ChatJS-Windows.zip`, in a folder called `ChatJS-Archives` (the verified Library folder is spelled exactly `/ChatJS-Archives`).
- Current private Library listing was checked directly: `/ChatJS-Archives/ChatJS-Android.zip`, `application/zip`, 54,869,202 bytes. This is a verified Library record; the full ZIP had also been re-materialized successfully in the earlier recorded session.
- Project Sources search for `ChatGPT.zip` and the current conversation attachment listing returned no file in this session. This is not proof that the Project Sources collection was deleted or is empty. No available authorized action in this session exposed a way to add the Library copy to Project Sources, so no such transfer is claimed.
- Windows: the requested `ChatJS-Windows.zip` was never created. The source is a 1,057,802,768-byte `.msix` installer. Browser export limit of 25 MiB and failed full direct download blocked private retention; a 1 MiB transfer test is not the full installer. The official URL and package-level findings remain in `docs/REFERENCE_DESKTOP.md`. Preserve the original `.msix` format if a complete private transfer later becomes possible.
- The optional request to put original binaries in the repository was not followed: the public repository must not contain official APK/MSIX files, proprietary implementation/assets or private bundles. Keep permitted, independently authored findings in Git and originals in private storage.
- Revised `docs/CHATGPT_PROJECT_INSTRUCTIONS.md` to include Sources-first/Library-fallback behavior, exact verified Android archive path, requested Windows filename and actual retention blocker, contemporaneous documentation requirements, and the no-public-binary rule. The revised text is 5908 characters, below the 6,000-character field limit. This repository file is the exact copy to paste; the Project Instructions field itself was not changed by this session.
- CI on parent commit `e5f8a85989ecd85d1e5d853e2d7e1d4ae97b38a2` passed (run 44296023240). CodeQL on that commit was still running at last check; verify the new commit's runs before reporting completion.


## 2026-11-20 — Repository synchronization, checks, and integration direction correction

### Owner direction consolidated

The recovered chat exports and this session establish the current direction: ChatJS is one general-purpose Node.js module adapting the real client-side systems of official ChatGPT mobile and desktop Work/Codex. Use client request/response construction, payload schemas, transport, connection and legitimate authentication/session behavior found in the supplied packages. Do not dismiss a client interface merely because public developer documentation does not describe it. The project does not need to recreate server-side ChatGPT infrastructure. The package must not assume a particular phone, computer, OS, camera, microphone, screen, or browser.

Project Sources are intentionally kept empty. The verified Android full extracted-payload archive remains in personal Library. Windows archive work is paused at the owner's instruction.

### Main-branch repository change

Committed the corrected documentation and project state directly to the existing `main` branch.

- Commit: `56b5c543fcea2cb7f3ddcf9273a6f80b1b2c4857`
- Tree: `0c66bdf31f9e7cfd9f791b23d8c00da20b802d0d`
- Changed paths (23): `README.md`, `ChatJS.md`, `package.json`, `docs/CHATGPT_PROJECT_INSTRUCTIONS.md`, `docs/AI_MEMORY.md`, `docs/CONTINUATION.md`, `docs/DECISIONS.md`, `docs/ARCHITECTURE.md`, `docs/WORKFLOW.md`, `docs/REFERENCE_APK.md`, `docs/REFERENCE_DESKTOP.md`, `docs/CAPABILITY_MATRIX.md`, `docs/CHATGPT_CAPABILITY_INVENTORY.md`, `docs/ROADMAP.md`, `docs/TODO.md`, `docs/OPEN_QUESTIONS.md`, `docs/KNOWLEDGE_BASE.md`, `docs/EXPERIMENTS.md`, `docs/REPOSITORY_SETTINGS.md`, `docs/README.md`, `docs/SESSION_LOG.md`, `docs/project-state.json`, and generated `docs/PROJECT_STATE.md`.
- The ChatGPT Project Instructions text now contains assistant operating/continuity instructions rather than a duplicate repository handbook. The ChatGPT Project field itself was not edited by this GitHub commit.

### Verification — observed

On the codeload snapshot of commit `56b5c543fcea2cb7f3ddcf9273a6f80b1b2c4857`, using Node.js v22.23.2 and npm 10.9.8:

- `npm run check` exited 0.
- Syntax checks passed.
- Generated project-state synchronization passed.
- Markdown link checker passed: 24 Markdown files, no missing local targets.
- Node test suite passed: 9 tests, 0 failures.
- Archive builder passed and produced `dist/ChatJS.tar.gz`, 6,521 bytes, seven distributable module files.
- Archive listing was inspected; it contains the package manifest, README/manual/license, CommonJS/ESM entry points, and TypeScript declarations only.
- GitHub CI run `44742483920` for this commit completed successfully.
- CodeQL run `44742483925` was still in progress at the last status check; do not call it passed until a later check confirms success.

### Repository state

At the post-commit inspection, the only branch was `main`, pointing to `56b5c543fcea2cb7f3ddcf9273a6f80b1b2c4857`. No open issues or pull requests were returned.

The GitHub About description was not changed because the available GitHub integration exposes file commits but not repository metadata updates. Recommended owner-paste description is recorded in `docs/REPOSITORY_SETTINGS.md`.

### Remaining work and limits

- The Android extracted payload is preserved, but DEX/Valdi source-level analysis, request/auth/session tracing, and end-to-end ChatGPT connection tests have not been performed.
- The Windows remote archive reported by the prior conversation was not reverified in this session; its transfer into personal Library was incomplete. The current Library Windows ZIP is metadata-only. Windows work remains paused.
- The actual ChatGPT client connection and major workflows remain unimplemented; the repository runtime is foundation-only.


## 2026-11-20 — Preserve chronology and finalize documentation checks

- Restored the complete pre-existing chronological session history rather than leaving only the current session entry. The earlier Nov 18 directions remain as historical records; the current Nov 20 ChatGPT-client integration direction supersedes their local-only/account-client exclusions.
- Updated `CONTRIBUTING.md` so its public contribution guidance protects credentials, account/session secrets, and personal information without treating client interfaces present in the supplied packages as out of scope. It now says the application packages are valid technical references for independent ChatJS implementation, subject to third-party rights and notices.
- Second documentation/history commit: `e769397a504a17e5609f9c8926c46b85b6a44e09`.
- The second commit's GitHub CI run `44742773789` completed successfully. CodeQL run `44742773904` was still in progress at the last status check; do not report it as passed until confirmed.
- Re-ran `npm run check` against the second commit's main snapshot: exit 0; 24 Markdown files passed local-link checks; generated state synchronized; all 9 Node tests passed; archive built with seven distributable files at 6,521 bytes and its listing was inspected.
