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


## 2026-11-24 — Correction: Statsig dependency and unauthenticated state refresh

A more careful DEX implementation/call-site pass corrected an earlier misattribution:

- Lof70 is the experimentation/Statsig interface, not an auth/session provider. Its concrete implementations in the supplied DEX are Lmx71 (constructor logger tag StatsigManager, with Experimentation config) and Lbu70 (FakeExperimentManager). Lau31.h, Lma11.b, and Lq5d1.e are feature/experiment dependencies. Lau31.F invokes Lof70.G as feature/experiment evaluation before its post-logout Lau31.E state transition; it does not read auth/session state from Lof70.
- The Lis31 path that logs Failed to refresh the unauthenticated session obtains the current local session snapshot via Llzx.u, packages it as an Lal8 state/decision value and calls Lau31.u. Lau31.u derives the next state and delegates to Lau31.E/Lau31.r. The inspected method graph contains no HTTP client, URL, or request builder. The error-log wording identifies local unauthenticated state refresh/reconciliation, not proof of a server request.
- A separate Lks31 class is tagged AuthSession and creates a SessionLogin event. Its coroutine calls Lau31.n → Ldt31, then Lsk8 (AuthRepository) and Ld7x (CredentialsRepositoryImpl). This credential/token path includes DPoP handling, missing/invalid refresh-credential errors, background-refresh policy and token/credential persistence failures. It is separate authenticated credential management and has not been shown to create the anonymous guest session.
- Correct dependency attribution for Lau31: field h:Lof70 = Statsig/experimentation; c:Lvv31 = local session DataStore; i:Lcn8 = AuthStorage; j:Lsk8 = AuthRepository. Keep feature gates, account credentials, local session metadata and server-side anonymous session creation separate.
- Updated current Android findings, open questions, experiments, knowledge base, capability inventory/matrix, AI memory, continuation guide and TODO. Earlier session entries remain chronological; this addendum supersedes the inaccurate Lof70/auth-session attribution.
- No guest network create/refresh request has been identified in these paths. The actual accountless HTTP operation and guest composer route remain open.


## 2026-11-24 — Guest welcome presentation trace and session closeout

### Source findings
- Traced Lnlh1 as a serialized Android welcome-presentation model. Its observed fields include guestCtaCopy, ctaStyle, hideLoginButton, showGoogleCta and presentation/disclosure configuration. Lylh1 is the typed stored value.
- Traced WelcomeLanguageEnrollment to injected Lzlh1, a PreferenceStore subclass using the global_ preference namespace. The inspected manager reads/writes the welcome value through inherited local preference-store methods; no HTTP client/request builder was found in that path.
- Lvlh1 reports an anonymous_welcome enrollment event. Lxr10 maps guestCtaCopy and the CTA/display flags into welcome/composer UI state under Statsig/feature gates, including a special skip value.
- This is positive evidence of a ChatGPT guest-welcome presentation/configuration path. It does not reveal who initially populates the preference, whether it is remotely delivered or locally seeded, the CTA click callback/action, or whether a tap reaches SessionManager.
- Do not conflate this model with Li230's Shop plugin "Continue as Guest" string. The latter remains Shop UI, not ChatGPT guest UI.
- No guest create/refresh HTTP request or guest composer send/prepare route was identified in this slice.

### Corrections and implementation status
- Retained the corrections that Lof70 is Statsig/experimentation, Lau31.u is local unauthenticated session-state refresh, and Lau31.n/Ldt31 is credential-backed AuthSession/DPoP work. None of those paths establishes guest network creation.
- ChatJS runtime remains the foundation plus generic bounded/cancellable SSE parser. No authenticated/accountless ChatGPT transport, conversation, or Work workflow has been implemented. Do not claim this Android source research is working runtime behavior.
- Updated Android protocol findings, experiments, knowledge base, open questions, capability inventory/matrix, AI memory, continuation, TODO, structured state, generated state, and root ChatJS.md.

### Verification and repository state
- Live main before this slice: 3796c881835943e86322fa8c6a0323469c3f53c3, tree 231d5dbb6c596acbb31baf4b378e616c560af768.
- At that head, GitHub CI run 45429744610 passed; CodeQL run 45429744521 passed, with a later CodeQL run 45434025650 also completed successfully.
- Final closeout validation after all guest-welcome documentation changes: npm run docs:sync completed, then /tmp/node26/bin/npm run check passed under Node.js 26.13.1/npm 11.20.0. Syntax checks passed; docs:check confirmed generated state synchronized and 27 Markdown local links; node:test passed 23/23; archive generation created eight intended module files.
- Final archive inspected after the closeout changes: dist/ChatJS.tar.gz, 9,897 bytes, SHA-256 a613410e07b71de70150f92ad7d5a01d8edadbe5b15b70549d50b6714a494238; it contains exactly ChatJS/package.json, ChatJS/ChatJS.md, ChatJS/README.md, ChatJS/LICENSE, ChatJS/src/index.cjs, ChatJS/src/index.mjs, ChatJS/src/sse.cjs and ChatJS/types/index.d.ts.
- The guest-welcome research update was committed directly to main as a802d5f3b3e2514823f36036da8294a4ed5baf9d, using a non-force expected-head update from 3796c881835943e86322fa8c6a0323469c3f53c3. GitHub CI run 45436181327 and CodeQL run 45436181361 both completed successfully on the new commit.
- Final live repository review: main is the only branch; there are no open issues or pull requests. The CI workflow ran the Node LTS full checks, installed-module CommonJS/ESM smoke tests and archive upload.

## 2026-11-24 — Android welcome CTA and login-child session-state boundary

### Source and findings
- Continued from live GitHub main at 536f3d8cf0c394642b15095e565db72e76be1afa; refreshed the exact source snapshot and canonical records before analysis. Only main exists; open issue and PR searches returned no results.
- Followed the Android welcome CTA action closure into the login/onboarding layer: Li96 action 29 → Lgs10 event → Ltu10 welcome view-model → Lqik0 onboarding event → Lnik0 login-child coordinator.
- Lnik0 is injected with both Lks31 (current AuthSession wrapper) and Lgs31 (anonymous SessionManager), plus Los8 and Lpjk0 (LoginGraphManager). This proves access to both auth and guest state, not which operation the CTA completes.
- Llzx.t(Lgs31) is a local getter for the current Lks31 wrapper from the manager's local flow/state. The Los8 coordinator branches between login-flow event collection (Lgs8/Lfet0) and LoginGraphManager (Ljil1.c).
- The event collector obtains the local session wrapper with Llzx.t and passes Lir31 flow events to Lau31.i. Its coroutine Lxs31 acquires Lmgo0, rereads local session state, evaluates the session variant/event, derives a local state record with Lau31.w, and applies the wrapper/state transition with Lau31.r.
- Lwnk0 contains Login, Signup and CombinedLoginSignup; Lfh8 contains login navigation surfaces. This identifies login/onboarding flow handling.
- None of the inspected action-29 coordinator methods contains an HTTP client, route, request builder or guest-token exchange. No evidence connects action 29 to the separate initial guest fallback Lgs31.b → Lau31.G. That method remains an independently observed local startup path whose concrete server-side create operation is still unidentified.
- The earlier welcome presentation preference facts remain: Lnlh1/Lylh1, Lzlh1 (global_ PreferenceStore), Lvlh1 enrollment marker and Lxr10 UI-state mapping. The preference population source is still unknown. The anonymous_welcome instrumentation is not a ChatJS telemetry requirement.

### Decisions, limits and implementation status
- Correct the prior documentation statement that the welcome click callback was untraced. The click-to-login-child/onboarding path is observed; the action-to-new-guest-session behavior is not proven.
- Keep anonymous session creation and composer send schemas/routes open. Do not infer network behavior from injected dependencies, feature flags, local state, or the backend-anon root.
- No runtime code or public API was changed. ChatJS remains a foundation plus generic bounded/cancellable SSE framing parser; no authenticated/accountless ChatGPT connection, guest creation, conversation, or Work engine is implemented.

### Changed records
- Update Android protocol findings, experiments, knowledge base, open questions, TODO, capability matrix/inventory, AI memory, continuation, project-state, generated project state, root ChatJS.md, and this session log.

### Verification and handoff
- Local npm run check, generated state sync, archive listing/integrity, remote CI and CodeQL results are to be recorded after this documentation-only slice is validated and published.
- Next trace: resolve the action-29 coordinator branch and determine whether any explicit event calls the separate Lgs31.b → Lau31.G path; continue the preference writer and guest HTTP create/refresh/composer request investigation. Then continue the separately scoped Windows Work Local and Android Work Cloud traces.


## 2026-11-24 — Additional event-gated Android guest-start caller

### Source findings
- Followed another DEX call-site into the initial local anonymous-session startup method, separate from the welcome CTA click path.
- Lej6.invoke() constructs La991 with the current Lks31 AuthSession wrapper, a Lw4h0 state-flow dependency, a Function0 callback and related login/session dependencies.
- La991.G(Louf0) compares the incoming event with Lw891.a and evaluates Lcq41.e; the matching branch launches Lmuz0 coroutine branch 9.
- Branch 9 handles the ChatgptClientMarkerUserSessionBootstrapRequestType marker, invokes La991.R1, and calls Lgs31.b(...). The wrapper delegates to Lau31.G(...), so this is a second event-gated caller of local SessionManager guest startup.
- The producer/meaning of the Louf0 event and the Lcq41.e condition are not established. No call edge connects this path to welcome CTA action-29 → Lgs10 → Ltu10 → Lqik0 → Lnik0; keep the paths separate until an event publisher is traced.
- The client marker is instrumentation; ChatJS must not send or port it as telemetry. The examined Lau31.G path remains local mutex/eligibility/state/DataStore work. No guest HTTP create/refresh request, guest token exchange, or composer route was identified.
- Analysis used selected DEX method/call-site inspection and a purpose-built partial scanner, not a complete decompiler or full call graph. No network request was made and no guest session was created.

### Canonical records updated
- Updated Android protocol findings, open questions, TODO, experiments, knowledge base, capability matrix/inventory, AI memory, continuation guide, root ChatJS status, structured project state and generated project state.

### Verification and limits
- At the start of this slice, main was fd3761dcdd0eba2f2dcd185b53c7dcc972d71613; only main existed, with no open issues or pull requests. CI run 45453168174 and CodeQL run 45453168157 passed on that head.
- The local container did not have a checked-out repository for running npm run check or inspecting a locally generated archive. The generated project state was rendered using the checked-in generator's template. Remote CI will be checked after this documentation-only update; no local test/archive result is claimed.
- No production code, package API, dependencies or tests were changed. ChatJS remains foundation-only; authenticated/guest ChatGPT connection, conversation send/stream decoding, and Work execution remain unimplemented.

### Handoff
- Trace the producer/meaning of Louf0 and Lcq41.e, and whether the action-29 login-child route emits the event consumed by La991.G.
- Continue the welcome PreferenceStore writer/population trace, then locate the actual guest HTTP create/refresh and composer prepare/send clients independently.
- Keep Android Work Cloud and Windows Work Local as separate client surfaces; Codex CLI/app-server remains reference-only.


## 2026-11-24 — Correction to Android guest-start event dispatch

### Source correction
- A further instruction-level decode of La991.G(Louf0) corrected the preceding event summary. The W891.a equality branch reads the current Lw4h0 value, passes it to Lcq41.e and returns. It does not launch guest startup.
- The separate `instance-of Lt891` branch constructs Lmuz0 label 9. That coroutine invokes the captured La991.R1 callback, reads Lt891.a, constructs the local Llnp0 argument and calls Lgs31.b → Lau31.G. The method-level local SessionManager path remains mutex/eligibility/state/DataStore work, not a recovered HTTP request.
- Two candidate Lt891 producers are now identified: Lq20.invoke emits Lt891(5) through a captured Function1 in the Llal1.h / Lej10.c WebView UI callsites; Ldo1.invoke selector case 18 can emit Lt891(6) through a captured Function1 on an inspected null-Lh70 branch, where the lambda is hosted by Lp1w constructed in Le2w.e (ConversationSidebar UI). Neither captured Function1 is proven to target this La991 instance. The event payload semantics and relationship to welcome CTA action-29 remain unknown.
- The ChatgptClientMarkerUserSessionBootstrapRequestType value remains client instrumentation; no telemetry is to be ported. The welcome CTA action-29 → Lgs10 → Ltu10 → Lqik0 → Lnik0 flow remains its own login-child/local-session reconciliation path.

### Canonical synchronization
- Corrected Android protocol findings, experiments, knowledge base, open questions, TODO, capability matrix/inventory, AI memory, continuation, root ChatJS status, structured project state and generated state. This correction supersedes the previous wording that associated W891.a with guest-start coroutine dispatch.

### Verification and limits
- Correction starts from main commit 74d9d4d32daaed83472b71ee348e425e4482f6f7. Parent main 94d1d8d1552dccceb82cfb29c8c193c973e9ca96 had passing GitHub CI run 45456885471 and CodeQL run 45456885469. The correction commit's own remote checks are to be verified after push.
- No production JS/TS, tests, dependencies, or package API were modified. The environment does not provide a local ChatJS checkout with Node/npm/git; npm run check and local archive build/inspection are unavailable in this slice and are not claimed.
- The DEX analysis is selected static method/call-site decoding, not a full decompilation or runtime trace. No HTTP request was made and no guest session was created.

### Handoff
- Resolve the callback owners for both Lt891 constructors and establish whether either reaches the La991 instance. Keep the welcome action-29 flow separate until an actual connection appears.
- Continue the preference writer/population trace, then identify exact guest HTTP create/refresh and composer-send request builders.
- Continue Windows Work Local and Android Work Cloud as independent client implementations; Codex CLI/app-server stays reference-only.


## 2026-11-25 — Upstream callback ownership for Lt891 guest-start candidates

### Source findings
- Followed the generic callback used by `Lq20.invoke` one layer upstream. `Lq20` has two observed constructor sites: `Llal1.h` and `Lej10.c`. The `Llal1.h` callers are `Lj20.invoke`, `Lss.invoke`, `Lt07.invoke`, and `Ly641.a`. In the WebView-host route, `Lej10.c` receives its first `Function1` from caller `Ljpc.invoke`, which forwards captured values from generic object fields.
- Followed the `Ldo1.invoke` selector-case-18 callback through `Lp1w` and `Le2w.e`. Its `Function1` comes from the parent ConversationSidebar rendering path: `Le2w.j`, recomposition wrappers `Ll1w`/`Lq1w`, and parent `Le2w.c`/`Lx0w` inputs. This maps upstream UI callback parameters but not the final callback implementation.
- Scanned all ten base-APK DEX files for references to `La991.G(Louf0;)`: no call-site method-id reference and no method-handle entry exists outside the method's own definition. The only field with declared type `La991` is `Lz891.q`. This static scan does not rule out reflection or dynamically supplied behavior; neither generic callback is proven to target this coordinator.
- Integer values 5 and 6 in `Lt891` remain opaque. No semantic meaning is assigned and no connection to welcome CTA action-29 is established. The `Lt891` event branch's established local path remains `Lmuz0` label 9 → `Lgs31.b` → `Lau31.G`; it still does not reveal the guest HTTP create/refresh route or guest composer send client.

### Canonical records updated
- Updated Android protocol findings, experiments, knowledge base, open questions, TODO, capability matrix/inventory, AI memory, continuation, root ChatJS status, structured project state, generated project state and this session log.

### Verification and limits
- Live `main` at the start of this slice: `bb4f0319cb7b7b722d6855d6a04946d0f68cf75b`. Only `main` existed, with no open issues or pull requests. Parent CI run `45461107985` and CodeQL run `45461107883` passed.
- No production JavaScript/TypeScript, tests, dependencies or package API were modified. This was static source inspection only; no HTTP request was made and no guest session was created.
- Local `npm run check` and archive inspection will be run against a fresh current-main checkout before publication; no local verification result is claimed yet.

### Handoff
- Trace the concrete callback implementations behind `Llal1.h`/WebView `Ljpc` and the parent `Le2w.c`/ConversationSidebar parameters; assign no meaning to payload 5/6 unless the consuming callback is recovered.
- Continue the welcome PreferenceStore writer/population trace, then locate actual guest HTTP create/refresh and composer prepare/send clients separately.
- Keep Android Work Cloud and Windows Work Local separate, with no Codex CLI/app-server runtime dependency.


## 2026-11-25 — Final verification after callback trace and generated-state correction

### Callback/source handoff
- The callback-owner trace and ten-DEX static reference scan are recorded in the preceding 2026-11-25 entry and Android findings. They do not prove either Function1 reaches La991.G; values 5/6 remain opaque and the action-29 welcome CTA remains separate.

### CI failure and correction
- Commit `a724ef3d05336db8de08938eb30280818c180196` failed GitHub CI run `45463982211` at `docs:check`. The generated `docs/PROJECT_STATE.md` had a single stray leading space before the generated-file notice; the state JSON was otherwise valid. No tests or package steps ran in that failed job.
- Commit `df7e4a3ea26f590e12175ad96a8d7f1e3f060cf8` corrected only that leading space. GitHub CI run `45464064323` and CodeQL run `45464064689` both passed on this commit.
- Full CI ran Node.js `26.13.1` / npm `11.20.0`: lint, generated-state check, 27 Markdown local-link checks, 23 tests (23 passed, 0 failed), archive creation with eight package files, and installed-consumer CommonJS and ESM smoke tests all succeeded.

### Distribution artifact inspection
- Downloaded CI artifact ID `14953152606` from the corrected build. Its outer ZIP passed `unzip -t`; contained `ChatJS.tar.gz` is 10,280 bytes, SHA-256 `4a7f8fcc1536c64a32e0b93a24f05bd1df676bf59f9220b2359a6cd6746dad2c`; `gzip -t` passed.
- Inspected tar contents: exactly eight expected files are present (`package.json`, `ChatJS.md`, `README.md`, `LICENSE`, `src/index.cjs`, `src/index.mjs`, `src/sse.cjs`, `types/index.d.ts`).
- Extracted this exact artifact locally and passed installed CommonJS and ESM consumer smoke tests under Node.js `22.16.0`; `node --check` also passed for `src/index.cjs` and `src/sse.cjs`.
- The local environment still cannot fetch a fresh GitHub checkout because outbound GitHub DNS is unavailable, so a separate local full `npm run check` was not run. The full check was run successfully by GitHub CI; no local full-suite result is claimed.

### Repository status and implementation boundary
- `main` is the only branch; no open issues or pull requests; repository tree has 49 files. No production JS/TS, tests, dependencies or public API changed in this research/documentation slice.
- ChatJS remains a foundation: generic bounded/cancellable SSE framing and package lifecycle only. Actual ChatGPT authenticated/accountless session, conversation send/receive, and Windows Work Local / Android Work Cloud are not implemented. No guest HTTP create/refresh or composer-send request has been identified, and no guest session was created.

### Next actions
- Resolve the concrete Function1 callback implementations/receivers for Lt891(5) and Lt891(6); investigate dynamic wiring carefully because the static ten-DEX scan found no La991.G method-id or method-handle references outside the method itself.
- Trace welcome PreferenceStore population, then exact guest HTTP create/refresh and composer prepare/send clients independently.
- Continue Windows Work Local and Android Work Cloud as separate direct ChatGPT client workflows; Codex CLI/app-server remains source reference only.


## 2026-11-25 — Android virtual ViewModel bridge and callback receiver boundary

### Source findings
- Confirmed `La991` extends `Lv6a`; base method `Lv6a.H(Louf0)` invokes virtual `G(Louf0)` on its receiver. A generic callback capturing a La991 instance through this base method can dynamically dispatch to `La991.G`.
- Located generated `Le6` Function1: its constructor captures a `Lv6a`; its `invoke` calls `Lv6a.H`. The observed creation site is `Lgbs.e` under the `Composer` label; it is passed to `Lzx1.l` / `FreeThinkingGaugeNuxHost`. This verifies the generic dispatch pattern but not that the object is supplied to the candidate WebView or ConversationSidebar callbacks.
- The WebView callback passed to `Lq20` through `Lej10.c` is a parent Function1 forwarded by `Ljpc.invoke`. The alternative `Lq20` construction through `Llal1.h` has callers including `Ly641.a` / `Lyi1.J`, with the latter carrying the UI label `SettingsWorkspaceListItem`. The `Ldo1` Function1 remains a parent callback carried through `Le2w.c`, `Lx0w`/`Lm1w`, `Le2w.j`, `Le2w.e` and `Lp1w` for `ConversationSidebarContent`.
- There is still no direct call-site method-id or method-handle reference to `La991.G` outside its definition in the ten DEX files, but this is not evidence against dynamic dispatch through `Lv6a.H`. The actual callback object and receiver binding to the same La991 instance remain unknown.
- The confirmed `Lt891` branch still does only local SessionManager startup/state coordination through `Lmuz0` branch 9 → `Lgs31.b` → `Lau31.G`. No guest HTTP create/refresh route, request/response schema or composer send route was recovered. The welcome CTA action-29/login-child path remains separate.

### Canonical records updated
- Updated Android protocol findings, experiments, knowledge base, open questions, TODO, capability matrix/inventory, AI memory, continuation, root ChatJS status, structured state, generated state and this session log.

### Verification and limits
- Live `main` at the start of this slice: `fed4eff6d0f1a10eb0bae0f0c7b44ba9052b2b16`. Parent CI `45464456049` and CodeQL `45464455961` passed on the parent-verified head `7a6812ae3c15bd9d7405996986da20e4d0a04db9`.
- No production JavaScript/TypeScript, tests, dependencies or public APIs were modified. This was static method/callsite inspection only; no live ChatGPT network call or guest-session creation occurred.
- Full local `npm run check` and archive inspection will be performed against the resulting commit before closeout; no local result is claimed yet.

### Handoff
- Continue from the parent callback objects and resolve their actual receivers (especially `Lv6a.H` capture); keep Lt891 payload meanings and the welcome CTA connection unknown until recovered.
- Continue the welcome PreferenceStore writer/population trace, then identify guest HTTP create/refresh and composer prepare/send builders separately.
- Keep Android Work Cloud and Windows Work Local separate; no Codex CLI/app-server runtime dependency.


## 2026-11-25 — Callback-dispatch research verification and closeout

- Repository source research remains documentation-only; no production JavaScript/TypeScript, public package API, tests, or dependencies changed in this slice.
- `npm run check` passed on exact source commit `91e21251eeab72a38d5aa00dc2a9365408943ae8` under Node.js 22.23.2/npm 10.9.8: all syntax checks passed; generated project state was synchronized; all 27 Markdown local links passed; node:test passed 23/23.
- Distribution archive: `dist/ChatJS.tar.gz`, 10,397 bytes, SHA-256 `8889b685390e25a6c9ee17e332ea4910a8f776e4b54eb9b2d86eb1d9dac401ff`. `gzip -t` and tar listing passed. The archive contains exactly eight intended package files. Extracted CommonJS and ESM imports both loaded and returned the explicit `foundation-only` status.
- GitHub CI run `45474704964` and CodeQL run `45474704958` both passed on commit `91e21251eeab72a38d5aa00dc2a9365408943ae8`.
- Final repository inspection: `main` is the only branch; there are zero open issues and zero open pull requests.
- The Android work is source research only. No guest create/refresh request, composer-send route, real authenticated/guest ChatGPT connection, or Work Local/Work Cloud runtime has been implemented. The final callback boundary is accurately captured in Android findings and continuation records.

## 2026-11-25 — WelcomeLanguageEnrollment local preference writer

### Source findings
- Traced `Le7f1.invoke` to the typed `Lap6` preference key named `welcome_language_opportunity`, using `Lxlh1.serializer()` and default `Lylh1(null, false, null)`.
- Confirmed `Lvlh1.c(Lr10,Lof70)` is invoked from `Ltp3.P` and a separate `Lslh1` coroutine. `Lvlh1.c` launches `Ltl30.invokeSuspend`.
- `Ltl30` reads the current `Lylh1` via `Lzyv0.b`, evaluates `Lxr10.h(Lof70)` to get Statsig-derived `Lplh1`, checks feature and `skip` flags, and gathers locale (`Locale.toLanguageTag()`), app/environment, supplied user/install/session context and wall-clock time.
- It constructs an `Lcmh1` model, including `no_local_prior_use_install_history_unknown`, timestamp, enum/list data, locale/app strings, configuration and boolean flags. It then creates `Lhi41` callback variant 19 and calls `Lzyv0.m`; that callback invokes `Lylh1.a(existing, new Lcmh1, ...)` and returns the updated preference value.
- This resolves local construction and persistence for the enrollment record. It does not establish that the separate serialized `Lnlh1` presentation model or `guestCtaCopy` is populated from `Lcmh1` or fetched by this coroutine.
- The later `Lz840.d` / `Ljb40` calls in the broad coroutine belong to account/profile service work, with connector/profile endpoints and Cloudflare handling; they are not evidence of the guest create or welcome presentation fetch. `anonymous_welcome` remains Android instrumentation and is excluded from ChatJS.

### Corrections, limits and implementation status
- Keep three separate concepts: `Lnlh1` presentation copy/model, `Lcmh1` local enrollment record inside `Lylh1`, and actual server-side anonymous session lifecycle. No call/data-flow between the first two and no guest HTTP create/send request have been recovered.
- No production JavaScript/TypeScript, public API, dependencies or tests changed. This is static method/constructor/call-site inspection of the supplied public Android XAPK, not a full decompilation or runtime trace. No live account request was made and no guest session was created.
- No ChatJS runtime capability status changes.

### Canonical records updated
- Updated Android findings, experiments, knowledge base, open questions, TODO, capability inventory, AI memory, continuation, structured state, generated state, and this session log.

### Handoff
- Trace the writer/source of `Lnlh1` (especially `guestCtaCopy`) independently. Verify whether the feature model `Lplh1` contains or refers to this presentation value, and where its transport/cache data is installed.
- Continue the `La991` receiver binding investigation without inferring it from a shared generic callback type.
- Locate the real guest HTTP create/refresh and guest composer prepare/send clients separately; keep Windows Work Local and Android Work Cloud distinct.

## 2026-11-25 — Android welcome Statsig parameter names and cached evaluation

### Source findings
- Corrected the obfuscated class mapping: Lnlh1 is the generated Kotlin serializer; Lplh1 is the actual welcome presentation data class.
- Lnlh1's generated descriptor contains presentation, useCombinedDisclosures, useAlternativeSubtitle, ctaStyle, guestCtaCopy, hideLoginButton, and showGoogleCta.
- Lfs10.<clinit> declares named typed Statsig parameters: welcome, welcome_skip_available, welcome_button_copy, welcome_language_presentation, welcome_language_suggested_tags, welcome_language_configuration_version, welcome_disclosure_use_combined_disclosures, welcome_disclosure_use_alternative_subtitle, welcome_disclosure_hide_subtitle, welcome_disclosure_shorten_accuracy_disclosure, and welcome_disclosure_guest_cta_copy.
- Lxr10.h(Lof70) evaluates these typed inputs through the Lof70 experimentation interface and constructs Lplh1. The app-facing Lof70 implementation is Lmx71 (StatsigManager), wrapping SDK state through Lix71 / Lzw71. Ltl30 embeds Lplh1 as Lcmh1 field j and writes the updated local Lylh1 value through Lzyv0.m / Lhi41 branch 19.
- Lmx71 getters use the current evaluated/cache-backed SDK state. Its separate Llmt0 helper loads local SharedPreferences override/default maps into manager-side state; it is not the welcome PreferenceStore.
- The exact Statsig SDK remote config refresh endpoint, request/response schema, fetch/refresh timing, cache expiry/persistence and offline/default precedence remain unidentified. No endpoint has been inferred from the parameter declarations.
- Statsig is part of the shipped Android app's feature configuration, not an inference provider. ChatJS must not port SDK telemetry, exposure logging, analytics callbacks or captured-event reporting.

### Evidence boundary and implementation status
- The actual welcome parameter key names and data flow into Lplh1 / Lcmh1 / Lylh1 are static DEX findings from the supplied public Android 1.2026.321 APK.
- No Statsig network fetch, analytics event, guest session creation, or guest composer request was run.
- No production JS/TS, dependencies or public package API changed. No ChatJS implementation status changes.

### Canonical records updated
- Corrected current serializer/model attribution; updated Android protocol findings, experiments, knowledge base, open questions, TODO, capability matrix/inventory, AI memory, continuation, structured project state, generated state and this session log.

### Handoff
- Continue the Statsig SDK config refresh/cache machinery only if it clarifies the shipped client data flow; avoid integrating analytics/exposure behavior into ChatJS.
- Then prioritize the actual anonymous guest create/refresh HTTP client and guest composer prepare/send path, which remain the critical missing protocol.
- Keep Windows Work Local and Android Work Cloud as separate client implementations.

## 2026-11-25 — ConversationViewModel guest-session recovery branch

### Source findings
- Identified `Ljqk0` as the Android conversation coordinator/ViewModel (`Lgqk0` superclass). Its constructor receives `Lks31` AuthSession and `Lgs31` anonymous SessionManager; fields are `Q1` and `R1`.
- `Ljqk0.G(Louf0)` handles a guarded `Lkmk0` event. After the local `Lx2a.invoke` guard, it constructs `Lps30` with coroutine byte label 16 and launches it through `Lv6a.v`.
- Decoded `Lps30.invokeSuspend`'s packed-switch payload: 29 entries, keys 0–28; key 16 targets offset `0x350`. This maps the actual constructor-selected coroutine label to the branch rather than inferring from nearby shared-callback code.
- Branch 16 logs under `MessageStreamingService` the no-messages/all-unsupported condition, constructs `MessageNotFoundException`, and emits a conversation error via `Ljl90`. It then reads `Ljqk0.R1` (`Lgs31`), reads `Lkmk0.a`/`b`, constructs an `Llnp0` reason from event data (including `a + 1` and constant `22`), wraps details in `Lzbz`/`Lhr31`, and invokes `Lgs31.b(...)`.
- This is a real conversation-level, guarded local SessionManager start/recovery transition after the selected message error. It is separate from the reusable `AnonymousSessionLoading` ViewModel, whose constructor did not inject `Lgs31`, and separate from welcome CTA action-29 and `La991`/`Lt891`.

### Evidence boundary
- The inspected `Lgs31.b` / `Lau31.G` path performs local mutex, feature/eligibility and state/DataStore work. This trace does not reveal the actual guest HTTP create/refresh request, request/response shape, server-issued guest ID/token, or prove remote creation succeeds.
- The `Lkmk0` producer/business meaning, payload fields, numeric `Llnp0` reason semantics, guard meaning, and any subsequent server request remain open. Do not claim every message-not-found exception starts a guest session; this is this specific guarded event branch.
- Static DEX disassembly only; no network operation, guest session creation, or production code change occurred.

### Canonical records updated
- Added the method-level finding to Android protocol findings, experiments, knowledge base, capability inventory, AI memory and continuation; updated root ChatJS status, open questions, TODO, project-state JSON and generated state.

### Handoff
- Trace who emits `Lkmk0`, the meaning of its integer/detail payload and the `Llnp0` reason mapping; trace the coordinator's resulting session state to see whether a distinct request client follows.
- Locate the real Android guest create/refresh HTTP request and composer prepare/send transport separately; do not misattribute LocationCookieInitializer's URL constants or Files API operations.
- Continue Windows Work Local and Android Work Cloud as separate first-party client surfaces.

## 2026-11-25 — Conversation-recovery trace verification

- The conversation coordinator trace is documentation-only. No production JavaScript/TypeScript, public API, dependencies, or tests changed.
- Exact commit `97864ca192fd12538dc6efd755b7f417bf272567` passed `npm run check` under Node.js 22.23.2/npm 10.9.8: syntax checks passed, generated `PROJECT_STATE.md` synchronized, all 27 Markdown local links resolved, and node:test passed 23/23.
- The package build generated `dist/ChatJS.tar.gz` (10,633 bytes; SHA-256 `06e344023dd4b6e741232c0c5956a407b7c0aabb188c4ac57c28057d6403e847`). gzip/tar integrity passed; the archive contains exactly eight intended distribution files. Extracted CommonJS and ESM entry-point smoke tests both loaded and returned `{ state: 'initialized', implementationStatus: 'foundation-only' }`.
- GitHub CI run `45483713918` succeeded on this source commit. CodeQL run `45483714123` was still in progress at the time of this entry; it is not claimed as passed here.
- Repository inspection showed only `main`, no open issues and no open pull requests.
- Android source findings remain static evidence only: no real guest HTTP create/refresh request, successful server guest session, composer transport, or ChatJS ChatGPT capability has been implemented.

## 2026-11-25 — Statsig SDK transport/cache and same-instance conversation dispatch

### Source findings
- Mapped the Android Statsig SDK endpoint enum in `Lyx71`: Initialize uses `https://featureassets.org/v1/i`; `log_event` uses `https://prodregistryv2.org/v1/e`. Similar `GetRemoteConfig` / `RemoteConfigSource` models seen in the scan belong to RevenueCat request handling, not Statsig.
- Followed `Lzy71.g` initialize request serialization: `user`, `statsigMetadata`, `sinceTime`, `hash`, `previousDerivedFields`, and `full_checksum`. `Lmy71.invokeSuspend` resolves the URL and performs JSON POST via the SDK transport.
- `Lbdb.z` sets JSON content-type, `STATSIG-API-KEY`, SDK type `android-client`, SDK version `5.5.0`, and client time; the worker may add `STATSIG-STABLE-ID`. No secret value was recorded.
- `PersistedInitializeResponse` (`Lslt0`) converts to evaluated `Lh3f0` feature-gate, dynamic-config and layer-config maps. The app-facing `Lmx71` StatsigManager exposes typed getter state consumed by `Lxr10.h` for Android welcome presentation.
- `Lz381` restores `ondiskvaluecache`, `Statsig.LOCAL_OVERRIDES`, and `Statsig.STICKY_DEVICE_EXPERIMENTS`. `Lz381.t` restores persisted initialize maps and supports optional per-user cache via `Statsig.CACHE_BY_USER` / `Li1d1`. The separate `statsig.network_fallback` store holds fallback URLs with seven-day expiry and up to ten previous URLs; this is not response-cache TTL. `Lz381.s` takes a caller age value, but effective production default and offline precedence remain open.
- Corrected attribution: RevenueCat's `GetRemoteConfig` and `RemoteConfigSource` classes/URLs are unrelated to Statsig. Do not document their request types as Statsig config transport.
- Traced same-instance Compose conversation event dispatch: `Lxjk1.f` receives `Lgqk0` and constructs `Llu2` capturing that receiver; `Llu2.invoke` applies `Lhkk1.t` and calls virtual `Lv6a.G` on the captured `Lgqk0`. `Ljqk0` extends `Lgqk0`; when the renderer is supplied that `Ljqk0`, dispatch reaches the same instance's coordinator method.
- `Lhkk1.t` maps `Lkmk0` by preserving its integer `a` and supplying a contextual `Lybz` route value. `Lkmk0` has integer and detail fields; `Lybz` has route descriptor, optional Long and boolean; `Lhe11` exposes content-key/label/same-route methods. Their business semantics remain unknown.
- The guarded `Ljqk0.G` path continues into `Lps30` label 16: no-messages/all-unsupported `MessageStreamingService` condition, `MessageNotFoundException`, then local `Lgs31.b` with event-derived reason/details. This is not evidence of a guest HTTP create request.

### Privacy and implementation limits
- Statsig `log_event`, `rgstr_e`, exposure reporting and offline event queues are instrumentation and excluded from ChatJS.
- Statsig initialize contains a user object and SDK metadata. This research is not approval to add an unsolicited or broad Statsig SDK dependency to ChatJS. Any future adaptation requires a justified need, explicit caller operation and data minimization.
- No guest HTTP create/refresh request, server guest ID/token, guest composer request or Work protocol was recovered. No production JS/TS, tests, dependencies or public API changed; no live network request or guest session was created.

### Canonical updates and verification
- Updated Android protocol findings, experiments, knowledge base, capability inventory/matrix, AI memory, continuation, open questions, TODO, root ChatJS status, structured state, generated state and this session log.
- Parent live `main`: `f94949a2c8abae7892460ff634e1cf91adff74b9`; parent CI `45483861937` and CodeQL `45483861951` both passed. The repository had only `main`, no open issues and no open PRs at the start of this slice.
- Full local `npm run check`, distribution archive inspection, and new-head CI/CodeQL verification remain to be run after this documentation-only update.

### Handoff
- Trace the `Lkmk0` producer and reason/detail semantics, then whether the local session transition is followed by a real service request.
- Prioritize locating the exact anonymous guest create/refresh HTTP request and the separate composer prepare/send route.
- Resolve Statsig response-cache age/offline precedence only if needed for the presentation behavior; never port telemetry or exposure reporting.
- Continue Windows Work Local and Android Work Cloud as separate client surfaces.

## 2026-11-25 — Android authenticated service clients and Windows MSIX/ASAR

### Source evidence and actions

- Restored live repository `codexclai/ChatJS` on existing `main`. At start: head `29ba5a17f6607ae336f1158dad7f85d7a499f0c9`; only branch `main`; no open issues or pull requests. Latest prior-head CI run `45487942578` and CodeQL run `45487942606` both completed successfully.
- Android XAPK SHA-256: `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`. Decompressed all 111 Valdi modules and inspected `chatgpt_services` symbol/string data. Located generated model/chat-requirements client, authenticated direct conversation client, separate requirements/device-integrity provider roles, direct SSE stream/resume pipeline, file upload/process service and conversation history/pin client.
- Cross-searched all 111 decompressed Valdi modules; no `/backend-anon` route string was present. This is a negative result for the scanned Valdi modules, not proof of global absence. The known DEX anonymous route constants remain attributed to LocationCookieInitializer; guest HTTP create/refresh and composer prepare/send remain unresolved.
- Reconstructed Windows parts (400,000,000 + 396,523,063 bytes) into 796,523,063-byte MSIX. SHA-256 `561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`; `unzip -t` passed. Parsed Appx manifest and ASAR header/index (15,520 entries); selectively inspected package manifest, early bootstrap chunks and app-server host.
- Windows static finding: the packaged Electron local coding-agent path spawns the bundled `codex.exe` through a stdio app-server connection and exchanges thread/turn RPC plus progress events. A separate desktop fetch bridge enforces OpenAI/ChatGPT origin restrictions and identifies `wham` and Estuary auth path families. This is not proof that every visible Windows Work feature maps to the same path and does not change the owner requirement that ChatJS must not require Codex CLI/app-server.
- Reviewed project TODO/state and verified the latest existing main commit and CI/CodeQL status. No credentials, cookies, tokens or private account content were accessed or recorded; no live service request or Windows app launch occurred.

### Changed files

- `docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md`
- `docs/REFERENCE_DESKTOP.md`
- `docs/CHATGPT_CAPABILITY_INVENTORY.md`
- `docs/KNOWLEDGE_BASE.md`
- `docs/OPEN_QUESTIONS.md`
- `docs/EXPERIMENTS.md`
- `docs/TODO.md`
- `docs/CONTINUATION.md`
- `docs/AI_MEMORY.md`
- `docs/SESSION_LOG.md`
- `docs/project-state.json`
- Generated `docs/PROJECT_STATE.md`
- `ChatJS.md`

### Implementation and verification

- No production JS/TS, tests, dependencies or public APIs changed. The implementation remains foundation-only; no real ChatGPT session, conversation or Work operation has been implemented.
- No local `npm run check` was run because the repository working tree is not mounted locally. New-commit CI/CodeQL must be checked after the documentation commit. The prior main head's CI and CodeQL runs passed; they are not validation of this new docs commit.
- Windows package CRC was checked; Appx publisher signature, app launch, live account/session behavior and runtime traffic were not verified.

### Historical-status correction

- Corrected the 2026-11-20 Windows reference notes in the capability inventory, knowledge base, and experiments so the earlier Library-only/deferred status is explicitly historical and superseded by the 2026-11-25 owner-supplied MSIX reassembly and first-pass ASAR inspection.

### Handoff

- Decode the Android direct conversation request-body serializer, route/method selection, complete Sentinel requirements response and first-party integrity provider flow; keep telemetry excluded.
- Decode direct SSE events and resume/handoff behavior, then upload reservation/PUT/process semantics.
- Locate guest create/refresh and guest composer prepare/send independently of the authenticated Android sender.
- Trace Windows Work UI separately from the packaged Codex coding-agent app-server path and determine how to reproduce local execution without subprocess dependency.

## 2026-11-25 — Android authenticated request/event/upload contract deepening

### Work performed

- Restored ChatJS context from live GitHub main, reading AI_MEMORY.md and CONTINUATION.md first, then project state, TODO and canonical technical records. Verified main-only workflow, recent commits and latest CI/CodeQL.
- Reopened the supplied `ChatGPT-Android.xapk` at `/mnt/data/ChatGPT-Android.xapk`, extracted its base APK member, extracted `assets/chatgpt_services.valdimodule`, and decompressed its Zstandard frame.
- Located and inspected compiled module regions for DirectResponseClient, generated model/chat-requirements API client, streaming worker/contracts/event decoder, and file-upload service.
- Added a direct-response field inventory, generated decoder names and primitive validation indicators, SSE delta/handoff/resume identifiers, entity-reference fields, upload metadata keys, Azure block-blob headers and trusted storage suffixes to the Android findings. Explicitly recorded what the string pool cannot establish: object nesting, requiredness, route branch condition, full decoder graph, resume mapping, handoff ceiling and numeric upload limits.
- No app launch, account/session access, token extraction, live HTTP request, guest-session creation or telemetry operation occurred. No production source, public API, test or dependency changed.

### Changed files

- `docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md`
- `docs/OPEN_QUESTIONS.md`
- `docs/TODO.md`
- `docs/SESSION_LOG.md`
- `docs/CONTINUATION.md`
- `docs/AI_MEMORY.md`
- `docs/project-state.json`
- Generated `docs/PROJECT_STATE.md`

### Verification and limits

- This was compiled Valdi module string/symbol-region inspection, not bytecode decompilation. It narrows the field inventory but does not justify implementing a guessed serializer.
- No local npm run check was executed in this remote-only repository session. Verify the documentation commit using GitHub CI; the previous main head's CI and CodeQL success are not proof for the new commit.
- Keep the overall completion estimate unchanged: research progress is not a working ChatGPT integration.

## 2026-11-25 — Owner product-identity clarification, expanded quality target and Valdi format reconstruction

### Owner directions recorded

- The owner clarified the exact product identity: ChatJS is one ordinary, general-purpose Node.js client module consolidating the actual client capabilities/workflows of ChatGPT mobile, ChatGPT desktop and Codex CLI into one ChatJS package/API.
- All three source/client families are in scope. The Codex CLI capability family is not merely a source-only reference; its verified client/workflow behavior is to be implemented natively inside ChatJS. The separate codex/codex.exe executable and Codex app-server remain excluded as runtime dependencies.
- ChatGPT is the only AI service target. This is not a generalized multi-provider AI SDK, replacement application, server, or daemon. Optional host adapters provide real host facilities only.
- Preserve actual distinctions: Android ChatGPT Work is cloud execution; Windows ChatGPT desktop Work is local execution; Codex CLI is its own terminal-oriented coding client.
- The expanded user quality requirement covers dynamic/automatic capability awareness, full safe customization/control, asynchronous/concurrent operations, real-time streaming where supported, measured low-latency/lightweight performance, current compatibility, and consumer-controlled long-running/24×7 readiness. Requirements and acceptance gates are in PRODUCT_STANDARD.md sections 1 and 14; they do not promise universal support or uninterrupted service.

### Android format research

- Cross-referenced the owner-supplied Android assets/chatgpt_services.valdimodule structure with public Snapchat/Valdi source pinned at f5bc2dcfcb880109c908e0675968cb532231ca71.
- Verified from source that the archive packet uses magic 0x0100C633; repeated archive entries use high-bit padding lengths; compiled JS wrappers use magic 0x0100C634; the Valdi QuickJS backend reads bytecode with JS_ReadObject(..., JS_READ_OBJ_BYTECODE), then evaluates it via JS_EvalFunction.
- Identified the vendored QuickJS reference version as 2021-03-27, with Valdi-specific modifications and upstream merges.
- This narrows the next analysis tool requirement to a Valdi-fork-compatible bytecode inspector. No method-body disassembly was achieved; direct conversation serializer, model/requirements decoder, SSE resume and upload branch semantics remain unknown.

### Changes

- docs/PRODUCT_STANDARD.md
- ChatJS.md
- README.md
- docs/CHATGPT_PROJECT_INSTRUCTIONS.md
- docs/AI_MEMORY.md
- docs/CONTINUATION.md
- docs/DECISIONS.md
- docs/ARCHITECTURE.md
- docs/ROADMAP.md
- docs/CAPABILITY_MATRIX.md
- docs/CODEX_SOURCE_FINDINGS.md
- docs/TODO.md
- docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md
- docs/project-state.json
- Generated docs/PROJECT_STATE.md
- This session log

### Verification and limits

- No production JS/TS, test, dependency or public API implementation changed. No feature is newly claimed as supported.
- The repository has no local working-tree checkout in this session; local npm run check and local archive inspection could not be run.
- New-head CI and CodeQL verification remain pending.
- Overall implementation progress remains approximately 3%; documentation/source research is not implemented product functionality.

## 2026-11-25 — Host-adapter terminology tightened

- Reviewed the owner's earlier objection to optional “providers” and audited product-standard/architecture language.
- Clarified that ChatGPT is the sole AI service; no AI-provider selection or multi-provider abstraction belongs in ChatJS.
- Reworded generic extensibility/reliability references as host adapters or actual platform-integrity mechanisms. Kept exact first-party Android integrity interface names only where documenting source evidence.
- No implementation or public API behavior changed.

## 2026-11-25 — Codex CLI ChatGPT client protocol and event contract research

### Source inspected

- Owner-supplied official `CodexCLI.zip`, pinned to openai/codex commit `50aeac27d825007a0ac6bd846087ed4e7095bdb3`.
- `codex-rs/model-provider-info/src/lib.rs`, `codex-rs/codex-api/src/lib.rs`, `codex-rs/codex-api/src/endpoint/responses.rs`, `codex-rs/codex-api/src/requests/headers.rs`, `codex-rs/codex-api/src/common.rs`, `codex-rs/codex-api/src/sse/responses.rs`, `codex-rs/core/src/client.rs`, `codex-rs/login/src/auth/manager.rs`, `codex-rs/exec/src/exec_events.rs`, and `codex-rs/exec/src/lib.rs`.

### New findings

- Mapped the ChatGPT Codex backend root and Responses route, typed JSON POST/SSE request, session/thread/request-correlation headers, subagent metadata and special private tool-results 307/308 redirect handling.
- Recovered the serialized `ResponsesApiRequest` field order and the reason routing fields lead the body. Documented dynamic model/input/tools/reasoning/metadata options and the observed `store: false`, streaming, auto tool-choice builder behavior without turning them into a fixed universal request template.
- Mapped ChatGPT OAuth-derived bearer/account handling, configurable/provenance-derived refresh endpoint, JSON refresh grant, 45-second timeout, guarded refresh lock and account-state checks. Other upstream authentication modes are explicitly not ChatJS scope.
- Mapped selected Responses event handling for created, output items, text/tool/reasoning deltas, completed, incomplete/interrupted, failed, error and content-filter conditions; idle timeout and unexpected stream closure are distinct error cases.
- Mapped the CLI JSONL thread/turn/item/error event types and typed item categories, which are separate from the backend Responses SSE event protocol.
- Confirmed the source `codex exec` path starts `InProcessAppServerClient`; ChatJS will implement in-scope behavior natively instead of invoking/embedding that server.
- Confirmed the pinned source defaults analytics on for `codex exec`; all analytics, telemetry, tracing, feedback, profiling and remote diagnostics remain excluded.

### Scope and limits

- Source files were inspected from the pinned ZIP; no Codex CLI command, app-server, OAuth flow, network request or account/session was launched or accessed.
- Source tests visible in the repository were not executed during this inspection.
- No production ChatJS JS/TS, API, test or dependency changed. No Codex authenticated/guest session, Responses client, WebSocket transport, event decoder, tool lifecycle, or local coding engine is implemented.
- Codex auth is not evidence for ChatGPT guest chat. Android guest create/refresh and composer routes remain separate unresolved questions.
- Overall completion remains approximately 3%; research does not count as shipped Node.js behavior.

## 2026-11-25 — Codex local execution, approval and sandbox source trace

### Work performed

- Inspected the pinned Codex CLI source for unified command execution, one-shot mode, terminal continuation, sandbox/approval policy, apply-patch interception and MCP tool handling.
- Mapped `exec_command` as an environment-selected command preparation and process-manager lifecycle; interactive execution may be resumed through `write_stdin`, while one-shot mode is bounded and non-resumable.
- Traced workdir resolution through a `PathUri`, distinct local/remote executor and host-native path requirements, TTY feature gating, bounded output, cancellation and terminal-session semantics.
- Recovered typed command policy outcomes (`Skip`, `NeedsApproval`, `NeedsHumanApproval`, `Forbidden`) and session-keyed approval reuse. Fresh human approvals cannot be satisfied by a session approval cache.
- Mapped the verified `apply_patch` interception path and separate MCP readiness/tool invocation handling.
- Added these findings and new Codex local-runtime tasks to the canonical source map, capability inventory, open questions, TODO, AI memory, continuation and this session log.

### Limits

- No command, PTY, sandbox, approval, patch or MCP operation was executed; this was static source inspection only.
- No production JS/TS, tests, dependencies or public API changed. ChatJS still has no Codex execution engine, approval policy, sandbox, patch system or MCP runtime.
- The Codex local coding engine remains separate from Windows ChatGPT Work Local and Android ChatGPT Work Cloud; no shared Work runtime was inferred.

## 2026-11-25 — Codex network egress, scoped permissions, dynamic tool search and multi-agent collaboration

### Source inspected

Pinned Codex source: `codex-rs/core/src/tools/network_approval.rs`, `tools/handlers/request_permissions.rs`, `tools/handlers/tool_search.rs`, `tools/handlers/multi_agents_v2.rs`, `multi_agents_v2/spawn.rs`, `message_tool.rs`, `send_message.rs`, `followup_task.rs`, `wait.rs`, `list_agents.rs` and `interrupt_agent.rs`.

### New findings

- Mapped command-scoped network egress approval to active command executions and executor environments. Unattributed/ambiguous ownership and cancelled executions fail closed. Host approval key includes environment, lowercase hostname, protocol and port; prompts are serialized per host and concurrent pending approvals are coordinated.
- Identified explicit `AllowOnce`, `AllowForSession`, `Deny` outcomes, session-scoped allow/deny caches, policy amendment persistence and cancellation/deferred outcome handling. The inline review path respects `AskForApproval` and managed permission-profile policy.
- Mapped remote executor network proxy negotiation and fail-closed behavior when a required executor-local proxy is unsupported; credential masking is feature/capability-gated.
- Mapped `request_permissions`: selected executor resolution precedes path normalization; relative read/write permissions are converted to typed filesystem entries, normalized, and passed to a session approval request. Empty permission sets fail validation; cancellation is explicit.
- Mapped `tool_search` as lazy local BM25 search over registered deferred tools, with a cached index rebuilt when sources change and additional per-step Code Mode/router filtering before definitions are exposed.
- Mapped MultiAgentV2 actions: spawn with child-thread request and fork/model/reasoning/service-tier options; queue-only send; trigger-turn followup; activity-based wait with bounded configured timeout; list under current parent/source context; interrupt by resolved child target.
- Kept collaboration analytics wrappers and all upstream telemetry out of ChatJS scope.

### Limits

- Static inspection only; no network proxy, approval UI, permission grant, agent thread, tool-search index, or MCP server was executed.
- No production ChatJS JS/TS, API, tests or dependencies changed. No ChatJS network policy, permission system, tool search or multi-agent runtime is implemented.
- Dynamic discovery and multi-agent availability are source/configuration gated; this research does not prove universal availability across all Codex releases/hosts.

## 2026-11-25 — Codex core control tools, user interaction, MCP resources and extension install

### Source inspected

- `codex-rs/core/src/tools/handlers/plan.rs`, `current_time.rs`, `get_context_remaining.rs`, `wait_for_environment.rs`
- `request_user_input.rs`, `request_user_input_async.rs`, `send_message_to_user_async.rs`
- `mcp_resource/list_mcp_resources.rs`, `list_mcp_resource_templates.rs`, `read_mcp_resource.rs`
- `dynamic.rs`, `list_available_plugins_to_install.rs`, `request_plugin_install.rs`

### New findings

- Traced `update_plan` as a typed plan event with a Plan-mode restriction; `clock.curr_time` uses the session's time provider; `get_context_remaining` reads context-window token status.
- Mapped `wait_for_environment` to an already-starting selected environment, with explicit ready/failed/unknown-ID paths.
- Mapped blocking root-thread `request_user_input`, async structured `request_user_input_async`, and `send_message_to_user_async`; these are separate UI delivery and reply contracts.
- Mapped MCP resources/list, resources/templates/list and resources/read as separate server/environment-scoped operations that check current turn access.
- Traced dynamic tools as definitions supplied by the current Codex thread, direct or deferred, with async request/response registration, lifecycle events and cancellation.
- Traced plugin/connector listing and installation: candidates come from the current discoverable catalog, unknown IDs are rejected, install is requested through MCP elicitation and requires explicit Accept; verification then controls runtime refresh/connector selection merge. Decline/cancel remain distinct. TUI mode has a source restriction.
- Upstream analytics around installs and tools are excluded from ChatJS.

### Limits

- No user interface, user answer, environment startup, MCP resource request, dynamic tool call or plugin/connector installation occurred.
- No production ChatJS code, tests, dependencies or APIs changed. These remain Research/Planned.
- ChatJS must not claim a user question or status update was displayed without an actual host interaction path, or claim installation/readiness without a real successful result.

## 2026-11-25 — Android QuickJS native runtime and bytecode disassembly feasibility

### Work performed

- Extracted the owner-supplied `config.arm64_v8a.apk` split from `ChatGPT-Android.xapk` and statically inspected the native library inventory.
- Inspected `lib/arm64-v8a/libopenai_xplat_export.so`: 8,817,776 bytes, ELF64 AArch64 Android, minimum API 24, NDK r28c build metadata, stripped. Printable strings identify QuickJS and Valdi module archive/context/heap/factory classes. No reusable `JS_ReadObject`/dump symbols were observed in the exported dynamic symbol table.
- Retrieved targeted excerpts from the pinned Valdi QuickJS source and identified `js_dump_function_bytecode`, `DUMP_BYTECODE`, `DUMP_READ_OBJECT`, `JS_ReadObject`, and `JS_ReadFunctionTag`.
- Distinguished compilation-time bytecode dumping from deserialization tracing: `DUMP_BYTECODE` is normally called from compilation, while `DUMP_READ_OBJECT` traces serialized bytes/metadata. `JS_ReadFunctionTag` reconstructs opcodes before reading the constant pool; the temporary patch must call `js_dump_function_bytecode` after the constant pool is read.
- Defined a bounded, analysis-only approach: unwrap one Valdi compiled-JS entry, pass bytecode to `JS_ReadObject` with `JS_READ_OBJ_BYTECODE`, instrument deserialized function dumping, and never evaluate application code.

### Limits and blockers

- The current analysis runtime has GCC but no installed `qjs`, `quickjs` or `qjsc` tool/source tree.
- The GitHub connector returned an empty content body for the very large `quickjs.c`; Firecrawl returned exact targeted source excerpts, not a complete local source/build tree. Therefore no temporary utility was compiled or executed.
- The Android native library's embedded QuickJS/Valdi strings do not prove exact source revision/build options or expose a ready-made disassembler.
- No method body, request serializer branch, or decoder control flow has been recovered. No app launch, account access, credential extraction, HTTP request, injection or telemetry occurred. No production ChatJS code, tests, API or dependency changed.

## 2026-11-25 — Codex Responses WebSocket v2 and context continuation trace

### Source inspected

Owner-supplied pinned Codex source: codex-rs/core/src/client.rs, responses_retry.rs, session/startup_prewarm.rs, codex-rs/codex-api/src/common.rs, and endpoint/responses_websocket.rs; source tests in codex-rs/core/tests/suite/client_websockets.rs.

### Findings

- Confirmed WebSocket eligibility requires provider supports_websockets and a model-client session not disabled by fallback.
- Recovered V2 beta header responses_websockets=2026-02-06 and source handshake session/thread/request correlation IDs, compatibility/routing headers and optional attestation.
- Mapped turn-scoped connection reuse and turn-state affinity, plus the response.create typed wire request.
- Reconstructed incremental continuation prerequisites: previous request, previous completed response ID, identical selected non-input properties and exact ordered current input extension after accounting for server output items. Mismatches cause a full request.
- Mapped generate:false prewarm and first-inference reuse, 1 MiB frames/read-ahead, bounded 1,600-event channel, response-specific interrupt acknowledgement, stream-close-before-completion errors, and server message-size checks.
- Mapped immediate HTTP fallback for HTTP 426, selected retryable error codes with Retry-After, one-way session disable after fallback, and restricted feature-gated unbounded retry branch (five-second initial delay, sixty-second cap, non-internal sampling only, provider exclusions).
- Read the source V2 WebSocket test, which asserts two request frames on one connection and a subsequent request containing previous_response_id plus only the new user input delta. Rust tests were inspected but not executed here.

### Limits

- Static source inspection only; no WebSocket handshake or live request was sent.
- No ChatJS WebSocket, Codex Responses client, context continuation or fallback state machine is implemented. No production JS/TS, test, dependency or API changed.
- No prewarm/keepalive behavior is approved by this research; ChatJS must retain explicit-operation-only network behavior.

## 2026-11-25 — Owner reinstates full feature-domain coverage and sets Android-first execution order

### Product scope correction

The owner clarified that the long-term ChatJS target remains the complete consolidation of ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI capabilities in one Node.js module. The owner's request to set desktop/Codex and Android Work aside is a temporary sequencing instruction only; none of those source families or capabilities has been removed from the target.

The owner explicitly revoked the earlier category-level exclusions for health, finance, location/maps, shopping/commerce, wallets/payments, contacts, calendars, telephony/communications and other domains. No entire first-party client feature domain is excluded merely by category. Implement what the actual source clients expose and what legitimate service/host capabilities support, with source evidence, authorization, user consent, privacy/security, and tests.

### Active execution priority

Complete the ChatGPT Android client comprehensively, excluding Android Work, before resuming any other client-family work. During this phase, Android Work Cloud, ChatGPT Desktop/Windows (including Windows local Work), and Codex CLI are parked in the backlog. After Android non-Work is genuinely complete and tested, resume Android Work, Windows/Desktop, and Codex CLI in that order.

### Project Instructions field correction

Rewrote docs/CHATGPT_PROJECT_INSTRUCTIONS.md as a stable, enduring project charter. It contains product identity, full source-backed capability scope, technical and security invariants, Project Sources/browser continuity, main-only workflow and verification rules. It no longer contains a mutable task list, temporary active priority, or category-level feature exclusions. Active priorities and detailed task queues remain in CONTINUATION.md, TODO.md, and project-state.json.

### Verification limits

No production JS/TS, dependencies, public APIs, or tests changed in this documentation correction. The repository had no local checkout in this session, so local npm run check and local archive inspection were not run. Parent main commit b2a2b310cb91cee2e6b0ec8ea6cf4418ea6dd793 had successful CI run 45565771152 and CodeQL run 45565771054; the new documentation commit requires fresh CI/CodeQL verification.

## 2026-11-25 — Final closeout verification and documentation synchronization

- Updated the package description and README to name all three permanent source/client families: ChatGPT mobile, ChatGPT desktop, and Codex CLI.
- Moved the Android non-Work-first execution queue to the top of TODO; Android Work, Windows/Desktop, and Codex CLI remain parked, not removed from the long-term target.
- Confirmed the Project Instructions charter is 7,455 characters, contains no temporary priority or feature-domain blacklist, and keeps ongoing priorities/tasks in the repository state/continuation/TODO records.
- Confirmed the prior category-based exclusions were removed from current requirements, capability matrix, manual, and instructions; historical references are explicitly marked superseded. No category-level feature exclusions remain in current product scope.
- The latest TODO-ordering commit 7fc0dec69fcefbce9915043eed73cd004e417d4f passed CI run 45567211063 and CodeQL run 45567211014. CI ran npm checks/tests/archive build, extracted the package and smoke-tested ESM/CommonJS loading; CodeQL analysis succeeded.
- The latest repository tree has 57 entries, one branch (main), zero open issues and zero open pull requests. No production JS/TS, API, test or dependency changed in this documentation correction; ChatJS remains foundation-only.
- This final state/log commit records the latest verified parent commit and run IDs. No claim is made that the ChatGPT Android runtime features are implemented; those remain the active engineering target.


## 2026-11-25 — Android-first scope and project-charter correction

**Owner direction reaffirmed:** ChatJS remains the single Node.js module targeting ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI. The active phase is to complete ChatGPT Android non-Work first. Android Work, Windows/Desktop, and Codex CLI are parked until Android non-Work is fully reconstructed, implemented, and tested. This is a sequencing rule only; the permanent target is unchanged.

**Scope audit:** found live domain blacklists in `docs/KNOWLEDGE_BASE.md` and the explicit non-goals list in `docs/ARCHITECTURE.md`. Removed those exclusions and standardized the product charter, README, user manual, feature inventory, capability matrix, decisions, continuity, product standard, and structured state so feature-domain labels no longer restrict first-party source-backed coverage. Rewrote `docs/CHATGPT_PROJECT_INSTRUCTIONS.md` as an enduring project charter, without a mutable priority list or enumerated domain blacklist.

**Android source re-verification:** checked the supplied XAPK at `/mnt/data/ChatGPT-Android.xapk`. SHA-256 `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`; ZIP test passed; six outer entries; base APK 5,080 entries, ten DEX files and 111 Valdi modules. Recorded the exact observed feature-area asset names and evidence limitations in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. Static package presence does not establish entitlement, route/schema reconstruction, or a working ChatJS implementation.

**Implementation status:** no production runtime capability was added in this documentation/scope correction. ChatJS remains foundation-only; Android request schemas, guest create/send, full streaming decode, integrity providers, and attachment processing still require deeper source reconstruction before implementation. Local `npm run check` was not run because the container could not resolve GitHub to clone the live repository; run and record the main-branch CI result for this commit before treating validation as complete.


## 2026-11-25 — Task-list wording normalization

A final review found the TODO's positive scope sentence still enumerated feature domains. Replaced it with the source-driven coverage rule and clarified the current Android non-Work phase in the current-position paragraph. This removes category lists from live working guidance while retaining the same complete feature coverage requirement.


## 2026-11-25 — Verification of Android-first scope correction

The documentation/scope correction at commit `326e31ea27ed659e63291ae691b79e8c1eba4c85` passed CI run `45569022968` and CodeQL run `45569022949`. The final TODO normalization at `bf33b71acd0e0b0680e5781582fe0a38ed1d9db3` passed CI run `45569111404` and CodeQL run `45569111347`; both are successful. CI's `Run checks, tests, and build archive` and `Extract and smoke-test ChatJS as an installed module` steps passed on the current Node.js LTS.

Downloaded the latest CI artifact and inspected it independently: artifact ZIP 12,011 bytes (SHA-256 `9094face7dfad57daba89728471f396761e0f506a4e54292d55b99c95a86d3b0`); contained `ChatJS.tar.gz` 11,866 bytes (SHA-256 `5694b717d5371ae4cdb0f8e174dacf9f6e5b460cfca07db530307848bbdf3c9b`). The gzip tar passed parsing and contains the expected package metadata, README/manual, license, CommonJS/ESM entry points, SSE implementation, and TypeScript declarations. The only branch remains `main`, at the final TODO-normalization commit at time of check.

A local clone and local `npm run check` were unavailable because this container could not resolve `github.com`; the CI workflow ran the repository check/build and installed-module smoke-test steps successfully. No runtime product capability was added in this documentation-only correction. The next implementation work remains the Android non-Work request-contract reconstruction described in TODO and ANDROID_CLIENT_PROTOCOL_FINDINGS.


## 2026-11-25 — Architecture non-goal wording clarification

Clarified the former category-blacklist line under `docs/ARCHITECTURE.md`'s explicit non-goals so it unambiguously rejects blanket feature-domain restrictions instead of reading like a capability exclusion. No product capability or runtime code changed.


## 2026-11-25 — Android Valdi bytecode disassembly and direct protocol reconstruction

**Active scope:** continued the Android non-Work phase only. Android Work, Windows/Desktop and Codex CLI remain parked as sequencing; the permanent three-family product goal is unchanged.

**Source and tooling:** reverified use of the supplied official Android 1.2026.321 XAPK and its chatgpt_services.valdimodule. Retrieved the pinned public Snapchat/Valdi QuickJS source at commit f5bc2dcfcb880109c908e0675968cb532231ca71 (QuickJS 2021-03-27). Built a temporary analysis-only QuickJS reader with js_dump_function_bytecode(ctx, b) immediately before JS_ReadFunctionTag returns, after constant-pool reconstruction. Compiled with GCC using -O2 -DDUMP_BYTECODE=1 -DCONFIG_VERSION="2021-03-27" -D_GNU_SOURCE and QuickJS sources quickjs.c cutils.c libregexp.c libunicode.c libbf.c, linking -lm -ldl -lpthread. The harness calls JS_ReadObject(...JS_READ_OBJ_BYTECODE) and releases the result; no module function was evaluated or invoked.

**Decoded entries and verification:**
- ChatGPTDirectResponseClient.js: 24,963-byte bytecode, SHA-256 e3ff57394f265f47c9a6a651e97d1f7fc752183ed06482c1de0bf8e0d2caa4ef, 66 function bodies.
- ChatGPTConversationApiClient.js: 9,050 bytes, SHA-256 cee4c14430b8527d1b3572dcd44d1e3317ca32f0647c415e833ee4d138c77f74, 56 function bodies.
- ChatGPTConversationEventDecoder.js: 14,503 bytes, SHA-256 77964ad085e01f1366658a40c60f063933dec6c429baad1c475241a59ee80e48, 22 function bodies.

**New source findings:** reconstructed authenticated sender message selection, body shape/optional fields, attachment mapping, direct POST and distinct parent GET routes, generated requirements operation/body, separation of requirements integrity from device integrity, default provider fail-closed behavior, native provider injection gate and response validation, streaming completion/resume/handoff state, delta schema/operations/path limits, and source error mapping. Exact details and evidence boundaries are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

**Open limits:** generated nested model/requirements schemas remain incomplete; the native device-integrity DEX path has an internal package-ID guard and public-build availability is unproven; exact resume HTTP request mapping and worker behavior remain open; upload reservation/PUT/process/limits need separate method-level tracing; guest routes and payloads remain independent and unresolved. The pinned source successfully decoded the three real payloads, but this does not prove the exact native library revision/build flags.

**Changed files:** source/experiment/continuity/memory/TODO/open-question/session records and root manual will be updated in the current documentation commit. No production runtime code/dependencies changed. No ChatGPT network call or account/session access occurred. Tests/CI for the documentation commit will be recorded after commit; prior local clone check was unavailable because of GitHub DNS/connectivity in the container.


## 2026-11-25 — Generated project-state synchronization correction

The first CI run for the Android bytecode-trace documentation commit failed in the "Run checks, tests, and build archive" step. Source inspection identified the reason: project-state.json had the revised Android next-action queue, but the generated PROJECT_STATE.md still contained the previous queue. Regenerated PROJECT_STATE.md from the current JSON using the repository generator's exact rendering rules. No runtime code or tests changed; a fresh main-branch CI run is required to establish the corrected result.


## 2026-11-25 — Generated Android catalog/requirements schema reconstruction

Continued decoding the generated `ChatGPTConversationApiClient` validators. Recovered required/optional properties and primitive/nested array types for ModelCatalogRequest, ModelCatalogModel, ModelCatalogPreset, ModelCatalogVersion, ModelCatalogResponse, ChatRequirementChallenge, and ChatRequirementsResponse. Optional field checks are against undefined, so explicit null fails the declared decoder. The generated decoder copies additional object keys, so unknown model/requirements fields remain pass-through and their actual consumers still need tracing.

Updated Android protocol findings, TODO/open questions, AI memory, continuation handoff, and session log. No production runtime code was changed. Current local disassembler and third-party sources remain isolated outside Git.


## 2026-11-25 — Android stream worker, resume, upload policy and tests

**Active scope:** continued Android non-Work only. Android Work, Windows/Desktop and Codex CLI remain parked as sequencing; the permanent product target is unchanged.

**Source work:** using the supplied ChatGPT Android 1.2026.321 XAPK and temporary pinned Valdi QuickJS reader, disassembled ChatGPTStreamingWorkerRuntime, ChatGPTStreamingWorkerClient, ChatGPTStreamingResponseProcessor, ChatGPTStreamingProtocol, ChatGPTStreamingContracts, AssistantResponseClient, ChatGPTFileUploadService and the separate oai_file_picker/FilePickerPolicy entry. The reader only deserializes with JS_ReadObject and dumps function bytecode; it never evaluates app functions. Analysis artifacts and third-party source/build remained outside the repository.

**New stream findings:** reconstructed host/worker enums and request correlation; direct POST SSE with reconnect disabled; injected polling fallback; per-callback state/DIL/reasoning/entity-reference/text handling; exact continuation builder using /resume, conversation_id, optional model, offset, stream:false and x-conduit-token; direct-only resume with a maximum of three handoffs. Core worker and response processor mapping is in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

**New upload findings:** reconstructed authenticated POST /backend-api/files reservation body/result checks; first-party Estuary multipart finalize/content-bytes branches; signed-storage PUT path without ChatGPT bearer/account headers; Azure headers except AWS S3; process-upload POST and failure mapping; secure destination suffix/origin rules; supported MIME/extensions, ten-file / 20-MiB-file / 25-MiB-total limits, 32,768-pixel image dimension ceiling, and file name/MIME validation.

**Code changed:** added internal src/chatgpt/file-upload-policy.cjs. Added tests/android-file-upload-policy.test.cjs (12 tests), included the module in scripts/build-module-archive.cjs and the archive regression test, and added syntax checking to package.json. The helper is pure/side-effect-free, not public, and makes no network requests; actual reservation/upload/process/download workflows remain unimplemented.

**Validation:** npm run check passed on a disposable snapshot of the exact main commit 1a7b0ab77d94e3bb7aa86eebd12d46ac4c387656. All 35 tests passed; generated state and links passed; dist/ChatJS.tar.gz was built and inspected with nine module files (14,935 bytes; SHA-256 a7ea49529be2001718712af47fc454d0e34df57fababc1d91e6b8a1687b86854). The parent commit's CI run 45575887848 and CodeQL run 45575887722 were green before this change; verification for the new commit remains pending.

**Still open:** native public-build device-integrity behavior; Turnstile/proof-of-work/so challenge consumers; authenticated account/guest session lifecycles; remaining stream event/processor variants and authorized live transport testing; signed URL expiry/retry/cancellation; upload download/indexing; and comprehensive Android non-Work feature coverage. The source trace does not imply entitlement, live endpoint success, or working ChatJS product support.


## Validation update — 2026-11-25

Commit `49f27e3b946489d0c37854a62d384e8876bf08c2` passed GitHub CI run `45579506954` and CodeQL run `45579507125`. A clean extraction of that exact commit also passed `npm run check`: all 35 tests passed, generated project state was synchronized, all 27 Markdown link targets existed, and `dist/ChatJS.tar.gz` was inspected (9 module files, 14,932 bytes, SHA-256 `1accbb3ea4def56e19220c78e4664b7d11f41b7058b8c8c3021dd9ba00e9f992`). The attachment data URL validator now verifies the expected Base64 encoded length from the declared file size before calling `Buffer.from`, preventing an oversized encoded value from triggering a disproportionate allocation.


## 2026-11-25 — Android event dispatcher and response processor completion trace

**Active phase:** Android non-Work only. Android Work, Windows/Desktop and Codex CLI remain parked as execution priority; the long-term target is unchanged.

**Source work:** read the complete retained ChatGPTConversationEventDecoder and ChatGPTStreamingResponseProcessor QuickJS disassemblies from supplied Android XAPK 1.2026.321. No Android bytecode was evaluated or executed and no temporary analysis artifact was added to Git.

**New findings:** decoded [DONE] versus non-DONE event offset order; valid resume token capture; nonterminal stream_handoff continuation and conversation binding; message_stream_complete terminal behavior; assistant/tool/hidden/reasoning message filtering; assistant-text suffix tracking by message ID; DIL and entity-reference deduplication; conversation-state update conditions; response processor 16 ms render batching, Markdown block parsing, separate callbacks, final text flush, delayed completion, error flush, cancel-without-terminal-callback, and timer/resource cleanup.

**Repository changes:** updated ANDROID_CLIENT_PROTOCOL_FINDINGS.md, EXPERIMENTS.md, TODO.md and OPEN_QUESTIONS.md with method-level evidence and marked the core event/processor source reconstruction complete. Also updated the current-main continuation, AI memory, root guide, state snapshot and this session log. No new product runtime feature is claimed; the live ChatGPT conversation/stream/history workflow remains unimplemented.

**Prior validation preserved:** parent commit 96b46051976cf0f3230fae95f49feebc244c372a passed GitHub CI run 45579851986 and CodeQL run 45579852002. The attachment helper’s full 35-test package check and nine-file archive were previously inspected; this documentation-only source trace still needs its own npm run check and CI verification after commit.

**Still open:** challenge-specific requirements providers and native public-build integrity behavior; authenticated and accountless guest session lifecycle; remaining event payload types; history synchronization after terminal streams; authorized interruption/resume/cancel tests; full upload lifecycle (expiry/retry/cancel/download/indexing); and comprehensive Android non-Work inventory.


## 2026-11-25 — Android requirements-integrity routing and native adapter trace

**Source:** retained method-level disassembly of ChatGPTDirectResponseClient from supplied Android XAPK 1.2026.321. Read-only deserialization; no Android code execution.

**Findings:** decoded challenge normalization and detection for required turnstile/proofofwork/so descriptors; default requirements provider returns the OpenAI-Sentinel-Chat-Requirements-Token only when no challenge requires device integrity and otherwise fails closed; alternate native adapter selection requires Valdi >= 11 and an available service. Reconstructed native adapter session/account/backend/conversation context, one-shot success/failure callback and cancellation behavior. Reconstructed strict header pair/name/value validation and exact one-key app_attest_challenge JSON body-patch constraint.

**Repository changes:** extended ANDROID_CLIENT_PROTOCOL_FINDINGS.md and EXPERIMENTS.md; reconciled TODO and OPEN_QUESTIONS to distinguish decoded routing/adapter behavior from unresolved native internals; updated continuation, AI memory, root guide, project state and session log. No Node.js integrity provider was implemented and no network operation was performed.

**Validation baseline:** parent commit 2c6dc3a076c98f37491c98f5560d93535ebeaeeb passed GitHub CI 45580575658 and CodeQL 45580575737. A clean extraction of that exact commit passed npm run check with all 35 tests, synchronized generated state, 27 valid Markdown local links and a nine-file 15,336-byte archive (SHA-256 de215aaa5df00f7c1cf537e9262e4147a71db981a729d318dc2942e32d204835). The new source update still requires its own check/CI.

**Still open:** public-build availability of native device integrity; internal challenge exchange, cookies/device UUID and retry/cooldown persistence; authenticated account and independent guest lifecycles; remaining event/history payloads and authorized live testing; complete attachment lifecycle; exhaustive Android non-Work feature inventory.


## 2026-11-25 — Android native integrity factory and internal-package guard confirmed

**Source:** directly extracted the supplied ChatGPT-Android.xapk base APK (manifest package com.openai.chatgpt, version 1.2026.321). Parsed the native Valdi module asset, registration marker, relevant DEX class definitions, class-data fields and bytecode for the factory, request/response marshalling types, service/task interfaces, service implementation and preflight runnable. This is static inspection only; no Android app code or integrity request was executed.

**Findings:** the APK contains the DeviceIntegrityNativeModuleFactoryImpl marker and DEX class. Its onLoadModule method constructs a Valdi wrapper using the application context; the wrapper's createDeviceIntegrityService method instantiates com.openai.valdi.integrity.b, which implements DeviceIntegrityService. Request fields are accessToken, accountId, baseUrl, conversationId and parentMessageId. Response fields are bodyPatchJson, headerNames and headerValues; completion and cancel interfaces are present.

The native worker com.openai.valdi.integrity.a.run calls Context.getPackageName() and checks exact equality with com.openai.chatgpt.internal. On mismatch it throws "Install the official-debug-signed internal Android application to verify this device." before the network exchange. The supplied public package com.openai.chatgpt therefore fails the native worker gate. The later internal package_name JSON field and OAI-Package-Name header are reached only after that guard.

**Repository changes:** findings, TODO/open questions, continuation, AI memory, root guide, project state and this session log now distinguish "factory packaged" from "public package can use it." Marked the exact public XAPK gate reconstructed. No bypass, fake token, package spoofing, Android network request or ChatJS integrity implementation was added.

**Prior validation:** parent commit fcef555fe57971f11e9c111fe16fd7deaadcfc9a passed GitHub CI 45581273364 and CodeQL 45581273282. A clean extracted snapshot of that commit passed npm run check: all 35 tests, generated-state synchronization, 27 valid Markdown local links, and a nine-file 15,678-byte distribution archive (SHA-256 6d8b01f9fa7135fdcb714ee3a5e945a15b18e7c28f06c60db6e68331e2b96cd7). The new research update itself still requires its own checks.

**Still open:** another authentic public-build provider path, if any; internal-build-only cookie/nonce/device UUID/cooldown/retry mechanics; challenge-specific Turnstile/proof-of-work semantics; authenticated and independent guest session routes; remaining event/history payload variants; complete attachment expiry/retry/cancel/download/index flow; comprehensive Android non-Work coverage.


## 2026-11-25 — Android native integrity response bridge and DEX provenance

**Source:** supplied ChatGPT Android 1.2026.321 XAPK, package com.openai.chatgpt, version code 2632129. Method-level DEX inspection covers the native module factory, Valdi wrapper, DeviceIntegrityService, package-guarded worker, HTTP/cookie helper, UUID persistence and final response callback. Exact DEX and Valdi asset SHA-256 values are recorded in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

**Result:** the callback constructs DeviceIntegrityResponse with bodyPatchJson=null and six paired headers: OpenAI-Sentinel-Chat-Requirements-Token, X-Sentinel-Payload, OAI-Client-Type, OAI-Device-Id, OAI-Package-Name and User-Agent. X-Sentinel-Payload carries the JSON bot_token/play_integrity_token/chat_requirement_token bundle; it is not a body patch. The authenticated helper uses POST JSON, bearer/account/device headers, redirects disabled, 30-second connect/read timeouts, Set-Cookie/CookieManager handling, bounded response reads and cancellable disconnect.

The first Standard Integrity token is nonce-bound using 256 SecureRandom bytes; the later token uses SHA-256 of ordered account/conversation/device/parent identity JSON. The internal /backend-api/playintegrity body contains package_name, nonce, integrity_token and device_id. The helper persists a random client-install UUID in the app-private oai_device_integrity/device_id preference.

The native DEX user-agent is ChatGPT/1.2026.209 (build 2620909), unlike the enclosing 1.2026.321 (2632129) XAPK.

**Limits:** the worker still rejects the public com.openai.chatgpt package before HTTP because it requires com.openai.chatgpt.internal. This static trace did not invoke native code, request a Play Integrity token, create a cookie or contact an endpoint. Retry ceilings, DeviceRateLimits scope/retention, cooldown persistence, exact cookie and UUID lifecycle, UA-version explanation and a distinct public-build provider remain open.


## 2026-11-25 — Android model-catalog and chat-requirements schema helper

### Implementation
- Added private `src/chatgpt/android-conversation-api-schema.cjs` with the exact source-traced model-catalog GET descriptor, chat-requirements POST descriptor, generated request/response decoders and fail-closed default requirements-header decision.
- Added `tests/android-conversation-api-schema.test.cjs` covering the request paths and query ordering, required flags, nested model/version/preset/challenge schemas, unknown-property preservation, optional-versus-null behavior, non-empty token requirement and device-integrity-required failure.
- Added the helper to package syntax checks and `ChatJS.tar.gz` inclusion. It remains private; no public export or transport code was added.
- Updated `ChatJS.md`, `CAPABILITY_MATRIX.md`, `CHATGPT_CAPABILITY_INVENTORY.md`, `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`, `TODO.md`, `OPEN_QUESTIONS.md`, `AI_MEMORY.md`, and `CONTINUATION.md` to record the exact implementation boundary and handoff.

### Validation and limits
- `node --check src/chatgpt/android-conversation-api-schema.cjs`: passed.
- Focused Node test run: 9 tests passed, 0 failed.
- The initial CI run failed because `tests/archive.test.cjs` still expected the previous nine-file archive. Updated the exact expected manifest to include the new helper, then reran the workflow successfully: CI `45600962485` passed `npm run check` with 44/44 tests, docs checks, archive build and installed CommonJS/ESM smoke tests; CodeQL `45600962380` passed on `6eff5056dc95db2c2780097d026aa1e7c2b82305`.
- Downloaded and inspected the CI artifact: `ChatJS.tar.gz` contains exactly ten intended files, is 17,944 bytes, passes gzip/tar integrity, and has SHA-256 `0f99e0639f97d8926caedee5bba182ffb6a446576bc929d1fdc854072fe8b05c`. Extracted-helper smoke checks passed.
- No authenticated HTTP request, model fetch, conversation send, guest flow, upload, device-integrity exchange or account credential handling was implemented or executed. The supplied public Android package's internal-only integrity gate is unchanged.


## 2026-11-25 — Android authentication validation and credential architecture

### Source inspection
- Re-extracted `assets/oai_authentication_session.valdimodule` from the owner-supplied XAPK after verifying the outer archive SHA-256. The decompressed payload is 70,816 bytes with SHA-256 `5211ced4520704e13e14ebb1f2faf51a91de091877f596a5a0516bd8bebd8917`.
- Recorded compiled module identifiers and schema/error/regex strings for ChatGPTAuthenticationApiClient, SessionAuthenticatedAccountService, OAIAuthenticationController, OAINativeCredential, OAICredentialStore, OAIRequestCredential, OAIBearerAPIService and OAIAuthenticationValidation.
- Identified first-party account-check path `/backend-api/accounts/check/v4-2023-04-27`, bearer/account headers, token-rejection code families, account metadata fields, validation patterns, and the state/secure-store/foreground lifecycle strings. This was a static string/symbol pass only; no Android method, login, token, request or account was executed or used.

### Implementation
- Added internal `src/chatgpt/android-auth-validation.cjs` for bearer-token, account-identifier, HTTP header-name/value and trusted HTTPS origin predicates.
- Added `tests/android-auth-validation.test.cjs` with seven focused deterministic tests; all seven pass locally.
- Added the module to package syntax checks and archive inclusion, and updated user-facing docs, capability matrix, findings, TODO, open questions, continuity, AI memory and session log.

### Evidence boundary and remaining work
- Authentication/controller/native secure-store/renewal/account-switching behavior is researched but not implemented. No plaintext credential fallback or fake login was added.
- The safe origin-relative path validation and exact regex flags remain to be disassembled. The new helper is not used by an HTTP client and is not a public API.
- Account-check complete schema/method selection, native credential callback contract, encrypted secure-store lifecycle, DPoP/token refresh and the separate accountless guest create/refresh/composer routes remain open.
- Full repository CI run `45606423090` passed 51/51 tests, syntax checks, generated-state sync, all 27 Markdown links, 11-file archive build and installed CommonJS/ESM smoke tests. CodeQL run `45606423246` passed on implementation commit `acdf32c7413644be86cb1759ab9e1e041488c71b`.
- Downloaded workflow artifact ZIP (18,741 bytes; SHA-256 `62895b9d2ce9fa76bc264d36fb626f3a5e254ea24b9a722d597ee0245a35e9e9`), passed ZIP integrity, inspected its inner `ChatJS.tar.gz` (18,591 bytes; SHA-256 `29e8d05e0986719832c629c5583ba4f460121ad0d38ebf106d8cf2d718649389`), and passed gzip/tar integrity plus an extracted-helper smoke test.

## 2026-11-25 — Android full module census and authentication method reconstruction

**Active phase:** Android ChatGPT non-Work. Android Work/cloud, Windows/Desktop/local Work and Codex CLI remain parked for task sequencing only; the long-term three-family product goal is unchanged.

**Source work:** reverified the supplied Android XAPK and decompressed all 111 Valdi module assets from app version 1.2026.321. Recorded every module's compressed/decompressed sizes and decompressed SHA-256, plus route-like string hits across 19 modules, in `docs/ANDROID_CLIENT_MODULE_INVENTORY.md`. Strings are discovery only; internal module imports, concatenated constants, fixtures and telemetry are explicitly not promoted to route/workflow evidence.

Rebuilt the temporary pinned Valdi QuickJS reader (commit `f5bc2dcfcb880109c908e0675968cb532231ca71`, QuickJS 2021-03-27), correctly parsed Valdi archive and inner JavaScript framing, and method-decoded seven `oai_authentication_session` entries without executing application code. Exact regex flags and the two-layer origin-relative path check are now established. Account-check is GET `/backend-api/accounts/check/v4-2023-04-27` with no query/body fields in its descriptor; the top response requires `accounts` and has optional account ordering. Controller operations/states, native credential bridge and token revoked/SSO/renewal classifications were also recovered. Nested schema alternatives, full lifecycle and secure-storage semantics remain open.

**Repository implementation:** expanded private `src/chatgpt/android-auth-validation.cjs` with `isSafeOriginRelativePath` and `isSafeAuthenticatedRequestPath`; expanded `tests/android-auth-validation.test.cjs` to ten deterministic tests. These helpers perform no network/storage/authentication and remain private. Added the full 111-module census and updated protocol, capability, task, open-question, continuity, memory and user documentation.

**Prior verified baseline:** parent `996b18fe1a8ebf75c2fb8d129927c72ff81b5184` passed GitHub CI `45606752316` and CodeQL `45606752411`. Baseline local `npm run check` passed 51 tests, generated-state and link checks, and the 11-file archive. The new changes still require the complete `npm run check`, archive inspection, GitHub CI and CodeQL verification.

**Still open:** complete nested account-check schema and selection rules; controller concurrency/generation/foreground/cancellation; native sign-in/restore and session-ID ownership; encrypted store layout/atomicity; token renewal/SSO/DPoP; guest create/refresh/composer routes; method-level coverage for remaining Android non-Work feature modules; history and upload lifecycle; authorized end-to-end ChatGPT tests. No live ChatGPT request or authentication operation was performed.