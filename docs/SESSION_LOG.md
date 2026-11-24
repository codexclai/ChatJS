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


## 2026-11-20 — Android client protocol findings from compiled Valdi modules

- Performed a first-pass static scan of selected Zstandard-compressed Android `.valdimodule` files extracted from the verified personal Library archive.
- Observed real client authentication/session services (`SessionAuthenticatedAccountService`, `OAIRequestCredential`, `OAINativeCredential`, `OAICredentialStore`, `OAIBearerAPIService`), generated account-check/model/chat-requirements APIs, bearer and account headers, trusted-origin checks, secure credential-store implementations, and first-party sign-in/session lifecycle identifiers.
- Observed client transport and conversation modules (`OAIAuthenticatedTransport`, `WebSocketSession`, `ChatGPTDirectResponseClient`, `ChatGPTConversationTransportAdapter`), conversation request paths, explicit device-integrity provider, and sentinel/chat-requirements headers.
- Observed SSE/direct/polling stream modules, event decoder/processor, message deltas, reasoning/DIL/entity event strings, resume/handoff identifiers, and message completion.
- Observed file upload/process/Estuary paths, conversation history/pins/download, image gallery/bootstrap, and Library file/node/bookmark/directory APIs.
- Detailed module names, paths, headers, and remaining limitations are recorded in `docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md`.
- This is evidence that the package contains actual client-side service and session implementation material. It is not full Valdi/DEX reconstruction, complete request/response schemas, or a working Node.js ChatGPT integration. The `oai-telemetry` string was observed in request metadata but its semantics are unknown; the zero-telemetry rule remains in force.


## 2026-11-20 — Final Project Instructions field refinement

- Expanded the dedicated `docs/CHATGPT_PROJECT_INSTRUCTIONS.md` from generic continuity guidance into a copy/paste-ready Project operating guide that captures ChatJS's actual client-integration goal, general-purpose Node.js architecture, private Library/Sources status, main-only workflow, credential/security rules, exclusions, documentation synchronization, and finish checks.
- Kept the file separate from the full engineering handbook and below the previously used 6,000-character Project Instructions field limit (4,728 characters).
- The Project Instructions field inside ChatGPT itself is not remotely editable through the available GitHub repository actions; owner must paste the committed text into the ChatGPT Project settings field.


## 2026-11-24 — Finalized durable ChatJS instructions and corrected continuity

- Clarified the separation between the repository's detailed, durable ChatJS operating record and the compact evergreen ChatGPT Project Instructions field.
- Made ChatJS Project → Sources the normal and primary location for supplied client packages. The personal Library is outside the normal workflow and is not treated as a primary or routine source; access it only for a concrete task when specific material is genuinely useful, necessary, and accessible. Any such material must be inside a folder named `ChatJS Project`, with only authentic, necessary sources or useful original findings.
- Designated the persistent `ChatJS` browser profile as the sole reusable default for ChatJS browser work. Temporary/disposable sessions are allowed only when genuinely required and must not be saved as another reusable profile.
- Preserved the authenticated Google and ChatGPT sessions with the rule never to sign out, clear, reset, delete, replace, or recreate the `ChatJS` profile.
- Recovered the full chronological session log from the last intact repository snapshot and appended this entry after an earlier malformed log write. No prior dated project history was intentionally discarded.
- No runtime implementation, dependencies, tests, source packages, or user-facing package behavior were changed.

## 2026-11-24 — Android 1.2026.321 integrity-provider and cross-host architecture research

### Live repository and source restoration
- Restored the latest public main snapshot at bf752be1bf37a07f08bed83393da91eb106c314b and read the required memory, continuation, state, task, decision, research, capability, reference, architecture, workflow and public API records.
- Confirmed main is the only branch (including the completed second branch-search page), no open issues or pull requests, and no repository PRs in any state.
- Confirmed the latest CI and CodeQL runs for bf752be1bf37a07f08bed83393da91eb106c314b both completed successfully (CI 45366236282; CodeQL 45366236260).
- Restored the exact commit snapshot in the persistent ChatJS browser VM and ran npm run check before modifications: Node.js v22.23.2, npm 10.9.8; syntax checks passed; generated state was synchronized; all 25 Markdown files passed local-link validation; all 9 tests passed; the seven-file ChatJS.tar.gz was created and inspected.
- The local container could not resolve github.com, so the exact public archive was restored through the existing authenticated ChatJS browser profile. The profile was not reset, signed out, or cleared.

### Android source inspection — observed, not implemented
- Inspected the newly supplied ChatGPT-Android.xapk (123,574,190 bytes). The manifest identifies ChatGPT 1.2026.321, version code 2632129, package com.openai.chatgpt, minimum SDK 32 and target SDK 37.
- Recomputed SHA-256: 22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d; ZIP CRC check passed.
- The base APK contains 5,080 ZIP entries, ten DEX files and 111 Valdi modules. All 111 modules decompressed from Zstandard successfully (77,451,888 decoded bytes). The prior 121-module count belongs to the older historical extracted archive and was not overwritten.
- Valdi strings show distinct ChatGPTRequirementsIntegrityProvider and ChatGPTDeviceIntegrityProvider interfaces; a requiresDeviceIntegrity send gate; an app_attest_challenge validator key; and separate token, turnstile and proofofwork chat-requirements fields.
- The Android DEX includes DeviceIntegrityService.prepare(request, completion) with a cancellable task; request fields accessToken, accountId, baseUrl, conversationId and parentMessageId; response fields bodyPatchJson, headerNames and headerValues.
- Partial DEX method/constant inspection observed an empty-object POST to /backend-api/sentinel/chat-requirements; a 256-byte SecureRandom nonce encoded Base64 URL-safe/no-wrap; genuine Google Play Integrity token generation; POST /backend-api/playintegrity with package_name/nonce/integrity_token/device_id JSON; a first-party device-verification cookie; and a second request-scoped token returned in X-Sentinel-Payload as a bot_token object containing play_integrity_token and chat_requirement_token. The DeviceIntegrityResponse bodyPatchJson is null in this inspected path. The native helper requires package com.openai.chatgpt.internal while the XAPK manifest uses com.openai.chatgpt, and its User-Agent says 1.2026.209/build 2620909 rather than XAPK 1.2026.321; public-build selection/availability is unresolved.
- The native Android helper creates device_id with UUID.randomUUID().toString() when no valid value is saved and persists it in app-private SharedPreferences file oai_device_integrity under key device_id. It is a client-install UUID, not a hardware serial or attestation; lifetime/rotation/deletion remain unknown. The inspected native method sends it in OAI-Device-Id and JSON device_id fields.
- Observed retry/cooldown after Play Integrity TOO_MANY_REQUESTS, Play Services/Store failure paths and cancellation that disconnects the HTTP connection. The internal package/debug-signature path is visible in constants/errors, but its selection conditions are unknown.
- The current DEX work is a partial method-reference/selected-method scan, not full decompilation or a complete call graph. The generated Valdi chat-requirements schema, app_attest_challenge semantics, exact derived input for the second token, cookie name/scope/lifetime, UUID lifecycle, Valdi-side header validation/application, internal package guard/provider selection and Windows equivalent remain open. No live account request was made.

### Architecture decision and limits
- Added a permanent requirement separating truthful host/runtime context, protocol-specific client-install identity and genuine first-party integrity/attestation.
- A Windows/Linux host must not impersonate Android or fabricate Google Play Integrity. Optional host providers must invoke genuine supported platform mechanisms; unsupported/unavailable/failed/cancelled states remain explicit. Ordinary environment metadata is not an attestation proof. Test simulations are tests-only.
- No runtime feature, dependencies, fake provider, telemetry, or API surface was added.

### Changed canonical records
- Updated AI_MEMORY, CONTINUATION, ANDROID_CLIENT_PROTOCOL_FINDINGS, REFERENCE_APK, REFERENCE_DESKTOP, DECISIONS, ARCHITECTURE, WORKFLOW, TODO, OPEN_QUESTIONS, CAPABILITY_MATRIX, CHATGPT_CAPABILITY_INVENTORY, KNOWLEDGE_BASE, EXPERIMENTS and project-state.json; regenerated PROJECT_STATE.md from the JSON and verified synchronization.
- Next work: continue exact Android requirements/device-integrity challenge serialization and control-flow reconstruction, then define real portable provider contracts from verified protocol requirements. Do not claim a Node.js integrity implementation or account-compatible connection yet.

### Windows source verification recheck — 2026-11-24

- Reassembled ChatGPT-Windows.msix.part001 and ChatGPT-Windows.msix.part002 from Project Sources in numeric order.
- Result: 796,523,063 bytes; SHA-256 561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963; ZIP CRC test passed with no compressed-data errors.
- This is a byte-integrity recheck only. No publisher-signature verification, install, launch, or full app-payload analysis was performed. Full Windows extracted-payload work remains deferred until explicitly requested.

### Follow-on DEX trace — Standard Integrity request hash, provider and cookie gate — 2026-11-24

- Continued targeted method disassembly after fixing the custom DEX parser's const-wide instruction width handling.
- Reconstructed the second request hash: Lxwf.f(accountId, deviceId, conversationId, parentMessageId) builds JSON in the exact key order account_id/conversation_id/device_id/parent_message_id, escapes values as JSON strings, UTF-8 encodes, computes SHA-256, and returns lower-case hex. The native caller feeds that string to the Standard Integrity token provider.
- Mapped provider operations to the bundled Google Play Standard Integrity wrapper: prepare/warm-up provider (prepareIntegrityToken) and request token (requestExpressIntegrityToken), 30-second waits, provider cached, and a single prepare-and-retry path for the observed invalid-provider status. The wrapper's full throttle/backoff policy remains open.
- Confirmed the first integrity nonce is 256 SecureRandom bytes, Base64 URL-safe/no-wrap; the resulting genuine token accompanies the internal package name, nonce and UUID device ID in POST /backend-api/playintegrity.
- Reconstructed origin checks and HTTP bounds: first-party HTTPS exact/subdomain host allowlist; no user info, explicit port, base path, query or fragment; POST, redirects disabled, 30-second connect/read timeout, 2xx accepted, 8 KiB read buffer, 256 KiB response cap, cancellation disconnects active connection.
- Reconstructed cookie acceptance checks: name suffix _playintegrity, non-empty value, Secure, not expired, trusted domain, backend API route path allowlist; missing path set to /backend-api. Compatible default CookieManager reused; absent manager created with ACCEPT_ORIGINAL_SERVER; incompatible handler fails closed.
- Request constructor order: accountId/accessToken/baseUrl/conversationId/parentMessageId. Response constructor order: bodyPatchJson/headerNames/headerValues. Async work on cached executor, callbacks posted to main-thread Handler.
- These are internal native implementation observations subject to the same package guard (com.openai.chatgpt.internal) and public XAPK mismatch. No public consumer-build use, live-account success or ChatJS runtime provider is claimed.

### Integrity SDK retry and cooldown trace — 2026-11-24

- Inspected selected retry/cooldown methods in Android classes2.dex (com.openai.integrity.impl.g, Lxrf0, Lhm00).
- Observed retry classification integers: -19, -18, -12, 0, -100, -8, -9. The eligibility helper additionally reads a configuration/feature boolean, so these are candidate statuses, not unconditional retry instructions. The token coroutine also branches on other values (-15, -14, etc.); their semantics and total attempt ceilings remain untraced.
- Confirmed the local TOO_MANY_REQUESTS cooldown default is constructed from 300 SECONDS. The wrapper checks for an active cooldown before token generation and surfaces cooldown_remaining_ms; the matching error states generation is skipped while the client is cooling down.
- Observed a named SDK data store DeviceRateLimits whose methods read stored limits, discard expired records, filter/sort and persist updates. Exact schema, scope, retention and relationship to the separate cooldown marker are unknown.
- Identified instrumentation-only fields/counters (initialization_retry_count, token_retry_count, lifetime_integrity_initialization_count, play_services, play_store). ChatJS must not export/replicate these as telemetry; the zero-telemetry rule remains absolute.
- Did not invoke Google Play Integrity, make a live service request, or implement a ChatJS provider. This remains static method analysis.


## 2026-11-24 — Comprehensive product-quality and customization standard

### Direction and repository state
- Continued from live GitHub main at 9edb6019deb06bd68fa7240e6c5039bb67d33e30; the repository metadata identifies main as the default branch. The complete branch listing contains only main; open issue and pull-request searches returned no results.
- Verified the preceding commit's GitHub Actions runs: CI run 45372931412 completed successfully and CodeQL run 45372931487 completed successfully. These results apply to commit 9edb6019, not to this documentation change until its own CI finishes.
- Refreshed the exact 9edb6019 source snapshot in the existing persistent ChatJS browser VM; no profile, Google/ChatGPT session or cookie state was reset.
- The owner asked that ChatJS permanently target the broadest practical all-in-one functionality, production quality, dynamic adaptation, portability, extensive customization/control and user-friendliness.

### Decisions and documentation
- Added docs/PRODUCT_STANDARD.md as the normative requirements and feature acceptance document. It defines product ambition, unified modular architecture, portable host support, validated configuration layers, capability discovery/protocol drift, reliability/lifecycle, security/privacy, UX/docs, production-readiness gates and quality dimensions.
- Clarified that "maximum everywhere/forever" is a quality objective, not a technically supportable promise that every capability works on every host or that external services, entitlements, providers and protocols remain available forever.
- Customization is required to expose meaningful, validated user control, but must never override legitimate authentication, authorization, entitlements, first-party checks, service rate limits/cooldowns, privacy, or security policy. Dynamic adaptation must use verified evidence and must not introduce unsolicited network requests, remote-code downloads or hidden background activity.
- Linked the standard from root ChatJS.md, docs/README.md, docs/ARCHITECTURE.md, AI_MEMORY.md, CONTINUATION.md, DECISIONS.md, TODO.md, ROADMAP.md and WORKFLOW.md. Updated docs/project-state.json; PROJECT_STATE.md is generated from that source.
- Added explicit future work for capability inventory, layered configuration, optional host/provider adapters, tested compatibility matrix, feature acceptance gates, documentation, performance and soak tests.

### Implementation status and limits
- This is a documentation/requirements change only. No runtime API, capability, adapter, authentication flow, protocol integration or product feature was implemented in this work unit.
- Existing runtime status remains foundation-only. The Android/Windows reference research is not equivalent to working Node.js support.
- Ran npm run docs:sync and npm run check successfully after the documentation changes: syntax checks passed; generated PROJECT_STATE.md matched project-state.json; all 26 Markdown files passed local-link validation; all 9 Node tests passed; dist/ChatJS.tar.gz built with the seven intended package files.
- Inspected the archive listing and SHA-256: edbc4740faa998f4bedc0b8445fd337cd4f1a3db9b48588fae37fa42861a91ac. The archive includes package.json, ChatJS.md, README.md, LICENSE, src/index.cjs, src/index.mjs and types/index.d.ts; it excludes docs, tests, reference payloads and dist itself.
- The preceding main commit 9edb6019 has passing CI and CodeQL; the new documentation commit still requires its own remote CI/CodeQL verification after publication.


## 2026-11-24 — Direct streaming foundation, Codex source, anonymous sessions and Work split

### Owner direction preserved
- ChatJS must implement direct first-party ChatGPT HTTP/WebSocket/SSE client communication in Node.js.
- Do not require or wrap Codex CLI, a standalone app-server process, or an embedded Codex app-server runtime. The official Codex repository is source evidence only.
- Windows desktop Work Local and Android Work Cloud are distinct execution surfaces.
- Accountless ChatGPT is a genuine logged-out guest session, distinct from an authenticated account and from Temporary Chat while signed in.

### Source work
- Retrieved the official openai/codex repository snapshot at commit 50aeac27d825007a0ac6bd846087ed4e7095bdb3, verified the ZIP archive, and uploaded CodexCLI.zip to ChatJS Project → Sources (28,071,441 bytes; SHA-256 1ff13fc6e312171f487b0e0f88de302c27c72c9ac20f6bd54325fdee343d66eb).
- Inspected codex exec and found it starts InProcessAppServerClient, confirming that it embeds app-server internals. The repository's direct Responses HTTP/WebSocket client and SSE models are source evidence for independent ChatJS implementation, not code to run as a dependency.
- Verified that the upstream exec analytics default is enabled; its telemetry/analytics behavior is excluded from ChatJS.
- Android DEX evidence records AnonymousSession/Unauthenticated/LoggedInSession states, Continue as Guest UI, guest plan/session metadata, guest storage/cleanup identifiers and anonymous endpoint constants. Exact message route ownership remains open because the observed constants appear in a LocationCookieInitializer class.
- Correction: Windows inspection did not establish a ChatGPT guest Work path. A generic anonymous browser-transport marker is insufficient evidence; desktop guest Work remains unknown.

### Implementation
- Added src/sse.cjs, exported ServerSentEventError and parseServerSentEvents through CommonJS/ESM and TypeScript.
- Added bounded incremental UTF-8/SSE framing, CR/LF/CRLF handling, event/id/retry parsing, AbortSignal handling and async-iterator cleanup.
- Added regression tests, including an empty-data-line memory-bound case.
- Added the SSE module to the distribution archive and updated root ChatJS.md plus engineering records to distinguish a generic parser from a real ChatGPT integration.

### Verification so far
- npm run lint passed after initial implementation.
- The focused SSE parser suite passed 13/13, including memory-bound, Node Readable, WHATWG ReadableStream and pre-aborted signal cases.
- Full npm run check passed: syntax checks, generated-state synchronization, 27 Markdown local-link checks, all 23 tests, and archive creation.
- dist/ChatJS.tar.gz is 9,774 bytes, SHA-256 592cff5830330130c32446aed3a3a3265126109b8f3b379bc54bae1484077c57. It contains exactly eight module files; extracted CJS/ESM imports and an extracted SSE parsing smoke test passed.
- Live main before this change was a8f6d715da4aa55eae4122ad2fa2ba824cdbfea4. Commit 952fa35d341a0f2678a06363eac5809d1c217c02 advanced main by a non-force fast-forward update; no other branch was created.
- The first implementation commit and diagnostics-only follow-up initially failed in docs:check. The diagnostic identified the exact cause: the GitHub blob upload reader strips trailing newlines, leaving PROJECT_STATE.md one byte short (actual 20,261 bytes; expected 20,262). The same reader had omitted the final newline from all 29 changed text blobs.
- Rebuilt all 29 text blobs from the verified local workspace with their actual final newline preserved and committed the correction as f085a4729e2ed15ae69af5623b4fb63dca7649bb. CI run 45413077153 and CodeQL run 45413077182 both completed successfully on that commit. The CI job passed npm run check, installed-package CommonJS/ESM smoke tests and archive upload.

### Changed files
- src/sse.cjs, src/index.cjs, src/index.mjs, types/index.d.ts, package.json
- tests/sse.test.cjs, tests/public-api.test.cjs, tests/esm-entry.test.cjs, tests/archive.test.cjs
- scripts/build-module-archive.cjs, scripts/generate-project-state.cjs (CI mismatch diagnostics)
- ChatJS.md, README.md
- docs/CODEX_SOURCE_FINDINGS.md, ANDROID_CLIENT_PROTOCOL_FINDINGS.md, REFERENCE_DESKTOP.md, ARCHITECTURE.md, DECISIONS.md, CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, KNOWLEDGE_BASE.md, OPEN_QUESTIONS.md, EXPERIMENTS.md, AI_MEMORY.md, CONTINUATION.md, TODO.md, project-state.json, PROJECT_STATE.md

### Remaining work and handoff
- Continue exact Android guest-session call graph and accountless prepare/send route reconstruction.
- Continue the Windows local Work and Android cloud Work source traces; no live ChatGPT login/conversation/Work feature is implemented yet.
- Continue exact Android guest-session call graph and accountless prepare/send route reconstruction.
- Continue the Windows local Work and Android cloud Work source traces; no live ChatGPT login/conversation/Work feature is implemented yet.


## 2026-11-24 — Android guest-session method and storage trace

### Source and analysis
- Continued static DEX analysis of the supplied public Android 1.2026.321 XAPK base APK using custom, local DEX class/field/method-reference parsers. No live account request, guest token creation, or server call was made.
- Identified Lvr71 as the three-state enum Unauthenticated / AnonymousSession / LoggedInSession.
- Mapped Lov31 and its generated Lmv31 serializer to nine session metadata properties: userId, isAnonymous, authSessionId, anonymousSessionId, retiredGuestSessionIds, legacyGuestPreferencesOwnerId, guestPreferencesInitialized, deniedLegacyFileDirectories and pendingReplacement. The nested pendingReplacement record Llv31 has three strings and a boolean; its business meaning remains unresolved.
- Traced Lau31 (constructor logger tag SessionManager): it stores auth/session and session-state dependencies, observable state and async jobs, and launches the Lis31 startup coroutine. Lis31 has explicit unsupported-guest logout and unauthenticated-session refresh error paths. Lau31.F is the post-logout anonymous-start attempt; it queries current auth/session state before entering Lau31.E and logs a specific failure if the attempt fails. The exact network request inside the transition remains unresolved.
- Traced Lgv31 (constructor logger tag SessionStorageCleanupImpl): it resolves and checks the sessions directory, reads user_id and pending_credential_deletion metadata, recognizes guest-prefixed entries, validates guest IDs as single path segments under sessions/guest-, handles retired session storage and separately cleans legacy account DB/preferences. Lxzp0 is a second helper constructing guest-prefixed session paths; full ID-generation and retention policy are open.
- Corrected route attribution: Lx4k0 logs LocationCookieInitializer. Its caller Lcl00 maps remote settings property locationPermissionCookieSettings and invokes the location-cookie initializer flow. That subsystem consumes /backend-anon/f/conversation, /backend-anon/f/conversation/prepare and authenticated counterpart constants through the lower-level Lgnw request interface. These are not proven guest composer message-send routes.

### Conclusions and remaining limits
- The Android package contains a genuine accountless guest-session state/lifecycle subsystem distinct from authenticated login and Temporary Chat.
- Guest session persistence has its own sessions/guest-<single-segment-id> storage and retired-session cleanup.
- The exact guest create/refresh HTTP route/body/headers, guest ID derivation/expiry/replacement policy, actual composer guest prepare/send routes, guest SSE schema and account/feature restrictions remain open.
- Windows desktop guest Work remains unverified. Windows Work Local and Android Work Cloud remain separate, owner-confirmed execution surfaces; neither should depend on Codex CLI/app-server.

### Changed records
- docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md, docs/OPEN_QUESTIONS.md, docs/EXPERIMENTS.md, docs/KNOWLEDGE_BASE.md, docs/CHATGPT_CAPABILITY_INVENTORY.md, docs/TODO.md, docs/project-state.json, docs/PROJECT_STATE.md and docs/SESSION_LOG.md.

### Verification and handoff
- Final pre-research main commit c813e6f7749a2e80ed6b1ca030407bacef6b8a81 had passing CI run 45413586725 and CodeQL run 45413586728.
- The method-level work above is static source inspection only, not a runtime integration. npm run docs:sync and npm run check passed after the additions: generated project state synchronized, 27 Markdown local links valid, 23 tests passed, and the eight-file distribution archive was rebuilt. The exact Node.js 26.13.1/npm 11.20.0 run is also required before commit verification.
- The existing main head c813e6f7749a2e80ed6b1ca030407bacef6b8a81 had passing CI run 45413586725 and CodeQL run 45413586728 before this documentation-only research slice. Commit the new docs via a non-force expected-head fast-forward. When creating Git blobs from browser-file reads, append the verified trailing newline; the previous CI incident was caused by that reader trimming final newlines.


## 2026-11-24 — Further Android guest transition and path-construction trace

### New method-level evidence
- Followed Lau31.F (post-logout anonymous-start coroutine): it queries the auth/session provider through Lof70.G, constructs the manager transition input, and calls Lau31.E.
- Inspected Lau31.E and Lau31.l call references. The transition resolves selected auth state through Lv2f0, reads/updates/checkpoints session metadata through Lvv31's local session DataStore, builds a Lzk8 session-selection/context record and updates SessionManager state. No concrete HTTP client, request builder, or anonymous create-session URL was identified in the inspected coroutine bodies. This is local session-state reconciliation evidence, not proof of a server session-create request.
- Traced Lxzp0.invoke: it composes a sessions/guest-* path using two opaque session-related values (from Lks31 and Lxk8) separated by a hyphen, prefixes guest-, and passes the path through the app FileSystem/session-storage helper. The Lxk8 two-string value record's semantics, ID-generation algorithm, entropy and server origin remain unknown; do not call this a UUID.
- Ld1d1.b checks a candidate guest storage path against local filesystem and session/credential ownership state. It is local storage validation.
- The public APK references AnonymousSessionLoading and a Continue as Guest UI/string model. This pass did not trace the click callback through to SessionManager; keep the UI-to-start linkage open.

### Correctly bounded conclusion
The Android app has a substantive guest-session state manager and persistence model, a separate local guest-storage path helper, and a visible guest entry/loading affordance. The specific service request that creates or refreshes the anonymous session, the source of the opaque guest path values, and the real guest composer send/prepare API are not yet recovered. The anonymous URL constants already attributed to LocationCookieInitializer remain unrelated to a proven composer route.

### Verification
- After these docs updates, npm run docs:sync and the full npm run check passed under Node.js 26.13.1/npm 11.20.0: generated state synchronized, 27 Markdown local links passed, 23 tests passed, and the eight-file archive was rebuilt.
- Static DEX inspection only; no live guest/session request or ChatJS guest implementation was attempted.

### Files updated in this follow-up
- docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md, docs/OPEN_QUESTIONS.md, docs/EXPERIMENTS.md, docs/KNOWLEDGE_BASE.md, docs/CHATGPT_CAPABILITY_INVENTORY.md, docs/TODO.md, docs/project-state.json, docs/PROJECT_STATE.md, docs/SESSION_LOG.md.


## 2026-11-24 — Anonymous transport/profile trace and guest-CTA attribution correction

### New DEX findings
- Lp6t declares the Android roots https://android.chat.openai.com/backend-api/ and https://android.chat.openai.com/backend-anon/.
- Lvwo0.invoke consumes both roots when building a global Lar31 network configuration alongside the web/Skybridge/realtime/Codex/platform roots and platform metadata. This is configuration assembly, not an HTTP request.
- Lyzo0 request path validation/interceptor accepts relative paths beginning /backend-api/ and /backend-anon/. This confirms both route families are supported by the client networking layer; it does not identify a guest create/refresh route or a conversation send API.
- Lr10.<clinit> initializes Lr10.l from Lzk8("id", "anonymous-session", false, emptySet) and other local descriptors using Lxk8("id", "id-session"). Lqz8 (logger tag QrLoginApi) accepts an Lr10 profile and consults its state. This is local session/profile configuration evidence; it does not prove a server token, guest ID, or HTTP creation operation.
- The "Continue as Guest" phrase was traced to Li230, a serialized Shop plugin UI model containing plugin_shop, shop, Shop, product-search/checkout text, Checkout, and Log in with Shop. It is not ChatGPT guest UI and must not be used as a guest-session callback target.
- AnonymousSessionLoading is a separate Compose method Losk1.a. A direct DEX call-reference pass did not identify a caller/callback connecting it to SessionManager. Keep its composition/navigation path open.

### Corrections to prior research wording
Earlier notes grouped the Shop "Continue as Guest" string with ChatGPT anonymous UI. This was an attribution error. Corrected the primary Android findings, capability inventory/matrix, AI memory, continuation guide, TODO, experiments and knowledge base. Historical session-log entries remain as originally recorded; this addendum supplies the correction.

### Conclusions and remaining limits
Android has a genuine anonymous backend base/path family and a locally configured anonymous-session profile alongside the known state/storage model. The inspected initial fallback Lgs31.b → Lau31.G, post-logout transition and global backend configuration still do not expose the actual HTTP request that creates/refreshes a guest session. The composer route remains unknown. No live guest request, token creation, or ChatJS integration was attempted.

### Verification and changed files
- Run npm run docs:sync and npm run check under Node.js 26.13.1/npm 11.20.0 before commit.
- Updated: docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md, docs/OPEN_QUESTIONS.md, docs/TODO.md, docs/KNOWLEDGE_BASE.md, docs/EXPERIMENTS.md, docs/CHATGPT_CAPABILITY_INVENTORY.md, docs/CAPABILITY_MATRIX.md, docs/AI_MEMORY.md, docs/CONTINUATION.md, docs/SESSION_LOG.md, docs/project-state.json and generated docs/PROJECT_STATE.md.


### Additional initial-session orchestration trace — 2026-11-24
- Lma11 carries the RootViewModel logger tag and stores the auth/session, install-referrer and guest-session coordinator dependencies.
- Its initialization coroutine first invokes Los8.f through Lpjk0 → Lgkk0 (LoginGraphManager), passing Lfh8.AccountSelector. This is the install-referrer account-selector login attempt; a dedicated failure message is "Failed to start install-referrer account-selector login".
- The same coroutine then calls Lgs31.b. That method delegates to Lau31.G and has the separate failure message "Failed to start the initial anonymous session". This is the actual initial guest fallback path; it is distinct from Los8.f.
- Lau31.G constructs/runs a suspend helper through Llzx.n, then continues with manager/session state transitions. The helper's full behavior and any HTTP request nested beneath it remain untraced. No route/body/header claim is made.
- Updated Android findings, experiments, knowledge base, capability inventory, TODO, open questions, AI memory and continuation notes with this call-order separation.


### Lau31.G helper call-graph boundary — 2026-11-24
- Followed Llzx.n from the initial guest fallback. It constructs/runs Lwk8.invokeSuspend.
- Lwk8.invokeSuspend accesses local session/model/config fields, iterates model-associated lists, reads feature/config records and compares the session-state object. No HTTP client, URL constant, request builder or network interface appears in the inspected method call graph.
- Lau31.G then continues into SessionManager transition work. This inspected helper is local eligibility/state logic, not the missing guest HTTP create operation. Continue through injected auth/session service dependencies beyond it.
- Updated Android findings, open questions, TODO, experiments, knowledge base, capability inventory, AI memory and continuation.


### Root session manager dependency boundary — 2026-11-24
- Identified Lpb11 as RootSessionCoordinator; it owns/coordinates Lgs31 SessionManager, Lq5d1 UserScopeManager, Ldrk0 LogoutCleanupCoordinator and session-related state.
- Ldrk0 orchestrates local logout cleanup through Lsk8, Lvv31 and Lgv31, and distinguishes retired authenticated storage from retired guest sessions.
- Lsk8 is tagged AuthRepository; it delegates to Lcn8, tagged AuthStorage, backed by application context and local credential/session metadata stores. Inspected methods resolve, persist, migrate and remove local credentials; no guest HTTP create endpoint appears in the inspected methods.
- Lau31.G first calls Lmgo0.a, the coroutine Mutex.lock operation, serializing concurrent anonymous-start transitions. It then runs Llzx.n/Lwk8 local eligibility and state evaluation, resolves session context via Llzx.u and enters Lau31.E.
- This traces the local coordination/storage stack more completely but does not expose a server-side anonymous-session create/refresh request. The /backend-anon/ root and local anonymous-session profile remain infrastructure/configuration evidence only.


### Additional backend-anon cross-reference disambiguation — 2026-11-24
- Inspected Lxi80 after finding /backend-anon references in its code.
- Lxi80 is a Files API client: methods cover files/download, upload-reservation claim/finalize, upload-processing and file processing/indexing events, with FileServiceException/FileDownloadError types.
- Its shared request helper recognizes both backend-anon and backend-api path roots. This is file-service transport/path handling, not guest session creation or guest conversation send.
- Added the disambiguation to Android protocol findings, experiments, knowledge base, open questions and structured project evidence limits.


## 2026-11-24 — Final guest-session source-trace consolidation

### Attribution corrections and method boundaries
- Corrected the Shop plugin string "Continue as Guest": Li230 is a Shop UI model, not a ChatGPT guest-login CTA. AnonymousSessionLoading is a distinct Compose method Losk1.a; no direct DEX caller/callback to SessionManager has been established.
- Confirmed the global Android network config has both backend-api and backend-anon roots (Lp6t/Lvwo0) and the generic request interceptor accepts both prefixes (Lyzo0). This is infrastructure, not a guest-specific route.
- The Lr10 local profile is labelled anonymous-session and is consumed by QR-login-related configuration; it is not proven to be a server-issued guest token or create operation.
- The separate RootViewModel order is install-referrer AccountSelector login (Los8.f → LoginGraphManager) first, then the initial anonymous fallback (Lgs31.b → Lau31.G).
- Lau31.G serializes the transition with Lmgo0 Mutex, then runs Llzx.n/Lwk8 local session/model/feature evaluation and Lau31.E local state resolution.
- The coordinator chain includes RootSessionCoordinator Lpb11, UserScopeManager Lq5d1, LogoutCleanupCoordinator Ldrk0, AuthRepository Lsk8, AuthStorage Lcn8, session DataStore Lvv31 and guest storage cleaner Lgv31. Their inspected methods cover local credentials, session state and retired-storage cleanup, not the server-side guest create/refresh HTTP request.
- Lx4k0 backend-anon/f/conversation* constants are used by LocationCookieInitializer during locationPermissionCookieSettings handling, not proven guest composer routes.
- Lxi80 is a Files API client (download, upload reservation claim/finalize, file processing/indexing) whose shared request helper recognizes both backend-api and backend-anon. It is not guest session creation or chat send.
- The anonymous guest create/refresh service request and actual guest conversation composer send/prepare route remain untraced. No live request, token generation or ChatJS integration was attempted.

### Validation
- npm run docs:sync completed and generated docs/PROJECT_STATE.md.
- /tmp/node26/bin/npm run check passed under Node.js 26.13.1/npm 11.20.0: syntax checks, synchronized project state, 27 Markdown local links, all 23 tests, and eight-file ChatJS.tar.gz generation.
- Archive inspection: dist/ChatJS.tar.gz, 9,774 bytes, SHA-256 592cff5830330130c32446aed3a3a3265126109b8f3b379bc54bae1484077c57; it contains the eight intended package files.
- At the start of this slice live main was 631042dcd97b8c4039b593df28ad6fcd4d453bfd, whose CI run 45418072676 and CodeQL run 45418072883 succeeded. The documentation correction committed as 2bb67fdf0215948304d8ab738d88aaededfb9cc2 passed CI run 45424297229 and CodeQL run 45424297125. Live branch search still returns only main; open issue and pull-request searches are empty.
- Git blob uploads from the KERNEL browser-file reader must append the verified final LF; prior CI failures were caused by trimmed terminal newlines.

### Remaining work
- Locate the concrete lower-level network service/call site behind guest create/refresh; do not infer from the anonymous base URL or the local session manager.
- Trace the true guest composer prepare/send route independently of location-cookie and file-service clients.
- Continue Android AnonymousSessionLoading composition and guest ID lifecycle research, then the separate desktop Work Local / Android Work Cloud traces.


### QR-login profile disambiguation — 2026-11-24
- Followed Lr10's anonymous-session-labelled descriptor into Lqz8 (logger tag QrLoginApi).
- The corresponding QR sign-in/review/approval path references /backend-api/qr-code/details (Lj32 coroutine) and /backend-api/qr-code/action (Lj1v0 coroutine).
- These are backend-api QR-login routes, not the guest conversation create/refresh or composer send API. The Lr10 descriptor is local configuration consumed by QrLoginApi and is not proof of a server guest token.
- Added this attribution to Android findings, experiments, knowledge base, capability inventory, AI memory and continuation.


### Final verification and QR-profile cross-reference — 2026-11-24
- The final state/history commit 10da00ee3f34de333e4371e0ef094dbddf8021a4 passed CI run 45425100314 and CodeQL run 45425100577.
- A final source cross-reference follows Lr10's anonymous-session-labelled local profile into QrLoginApi Lqz8. QR-login UI coroutines reference /backend-api/qr-code/details (Lj32) and /backend-api/qr-code/action (Lj1v0). This is a separate QR sign-in/review/approval feature under backend-api, not the missing guest conversation create/send protocol.
- Local validation after this QR attribution update: npm run docs:sync and /tmp/node26/bin/npm run check passed; generated state synchronized, all 27 Markdown links passed, all 23 tests passed, and the eight-file module archive was rebuilt.
- Current main at start of this follow-up was 10da00ee3f34de333e4371e0ef094dbddf8021a4. Remote CI/CodeQL for the QR-attribution doc update remain to be verified after its fast-forward commit.
