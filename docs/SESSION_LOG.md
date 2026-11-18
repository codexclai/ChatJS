# ChatJS Session History

Append a concise but complete entry for each meaningful work session. Preserve the chronological record.

## 2026-11-18 — Main-only, privacy, and project-scope rules

### Goals
Apply the user's latest permanent constraints to ChatJS, update the Project Instructions text, and ensure future chats continue without reintroducing unwanted repository or product behavior.

### Work completed
- Confirmed through GitHub's full branches endpoint that the repository currently has only main; the branch record reports protected=false.
- Confirmed repository topics are empty, the About description is unset, and no repository rulesets were returned.
- Recorded the permanent policy: work directly on main; never create, delete, rename, switch to or publish other branches; do not configure branch protection/rulesets or repository topics.
- Added the zero-telemetry policy: no analytics, tracking, ads, profiling, hidden collection, background reporting, phone-home requests, remote diagnostics or telemetry dependencies.
- Explicitly prohibited fake, canned, predefined, demo-only, placeholder, no-op or mock runtime behavior, and prohibited bloatware, filler and unrelated additions. Test fixtures must remain test-only.
- Updated docs/CHATGPT_PROJECT_INSTRUCTIONS.md, AI_MEMORY.md, CONTINUATION.md, WORKFLOW.md, REPOSITORY_SETTINGS.md, TODO.md, ARCHITECTURE.md, docs/README.md, root README.md and ChatJS.md, project-state.json and generated PROJECT_STATE.md.
- Recorded permanent decisions in DECISIONS.md.
- Inspected the current package manifest and runtime entry points: no runtime dependencies are declared and the current foundation client makes no network requests.
- Kept the Google Play reference APK outside the public repository.

### Verification
- The Project Instructions file is 5,790 characters, below the 6,000-character limit.
- GitHub's branches API returned exactly one branch, main, and marked it unprotected. No repository topics are set.
- The new CI test job completed successfully on the updated main commit.
- The CodeQL run for the updated commit was still in progress at handoff; do not mark it successful until its result is checked.
- An earlier full CI run passed all 9 tests, generated-state synchronization, local Markdown link checks, archive integrity and ESM/CommonJS extraction smoke tests.

### Remaining limitations
- The GitHub repository About description is still empty. The connected GitHub tools do not expose an authorized repository-description update operation.
- The proprietary all-rights-reserved notice still needs legal review.
- The APK ZIP layout is confirmed, but APK internals and visible feature surfaces have not been analyzed.
- ChatGPT feature implementation has not started. The current module is a clearly labelled foundation scaffold, not a finished ChatGPT client.

### Next task
Set the repository description using docs/REPOSITORY_SETTINGS.md, then resume the highest-priority product research task: inspect the available APK source and build an evidence-backed inventory of ChatGPT mobile capabilities and authorized programmatic interfaces.

## 2026-11-18 — Repository foundation and continuity setup

### Goals
Prepare codexclai/ChatJS as a maintainable Node.js project, establish its module identity, and make project work resumable across separate ChatGPT chats.

### Work completed
- Confirmed the public repository and connected account's admin-level access.
- Verified that the repository began empty and uses main as its default branch.
- Established the ChatJS package scaffold, CommonJS and ESM entry points, TypeScript declarations, and minimal client lifecycle.
- Added built-in tests for module loading, API behavior, invalid options, client cleanup, and archive integrity.
- Added conventional README, LICENSE, security, support, contribution, code-of-conduct, issue-template, and GitHub workflow files.
- Created /docs as shared AI memory: state, tasks, session history, decisions, verified knowledge, experiments, open questions, capability tracking, architecture, roadmap, and continuation rules.
- Added root ChatJS.md as the actual module's user/API documentation.
- Added a dependency-free ChatJS.tar.gz builder, archive integrity test, CI extraction and ESM/CommonJS smoke tests, and workflow artifact delivery.
- Located ChatGPT.zip in ChatJS Project → Sources, materialized the Project Source, and confirmed its archive contains a single base.apk entry. The binary remains outside the public Git repository.
- Removed ChatJS product release numbering, the package version field, lockfiles, release workflows, checksum inventories, and npm registry publishing automation.

### Verification
- Current CI ran on the current Node.js LTS runtime (Node.js 26).
- JavaScript syntax checks passed.
- Generated project state was synchronized.
- Local Markdown link validation passed across 25 Markdown files.
- All 9 built-in tests passed.
- ChatJS.tar.gz built successfully with the 7 allowlisted distribution files and passed archive content comparison.
- CI extracted the archive under node_modules/ChatJS and successfully loaded it through CommonJS and ESM.
- The ChatJS workflow artifact upload completed successfully.
- CodeQL completed successfully.

### Remaining limitations
- GitHub repository description/topics are still empty, and no main-branch ruleset was found. Branch-protection state could not be read through the connected integration. Repository settings need manual owner action; see REPOSITORY_SETTINGS.md.
- A GitHub authenticated browser profile is not connected in the automation environment, so repository settings were not changed through the UI.
- The proprietary all-rights-reserved notice is an operational choice and still needs legal review.
- The scaffold is not yet a working ChatGPT client. Feature implementation has not started.
- The APK's ZIP entry layout is confirmed, but APK internals and feature surfaces have not yet been analyzed.
- New chats must search ChatJS Project → Sources for ChatGPT.zip before asking the user for another upload.

### Next task
Inspect the Project Source APK as a high-level reference and build an evidence-backed ChatGPT capability inventory, distinguishing observed Android behavior from authorized programmatic interfaces.
