# ChatJS Decisions

Record durable project and technical decisions with rationale.

## Node.js-first, mobile-first product
**Status:** accepted  
**Decision:** ChatJS is a Node.js module whose primary feature reference is ChatGPT mobile, extended with applicable ChatGPT desktop Work and Codex capabilities.  
**Rationale:** explicit owner direction.  
**Consequences:** prioritize local conversation/context and mobile-inspired workflows plus desktop local Work/Codex tooling. Do not treat every Android permission or bundled service as a product feature.

## No OpenAI Platform/API integration
**Status:** accepted; permanent user requirement  
**Decision:** no OpenAI Platform APIs, OpenAI API keys, Sign in with ChatGPT OAuth/token sharing, private ChatGPT backend endpoints, or extraction/reuse of ChatGPT app cookies, tokens, credentials, or session state.  
**Rationale:** explicit owner direction.  
**Consequences:** official ChatGPT product docs are product-reference evidence only, not integration contracts. A non-OpenAI inference approach is not selected; model-powered features remain unimplemented until a real engine is selected.

## App account data is not local ChatJS data
**Status:** accepted boundary  
**Decision:** ChatJS must not claim access to ChatGPT consumer chats, saved memory, Projects, custom GPTs, cloud Work tasks, Codex sessions, Remote sessions, or Codex Cloud.  
**Rationale:** no supported ChatJS interface has been established; private endpoint/session extraction is excluded.  
**Consequences:** local conversations, projects, instructions, memory, workspaces and tasks are ChatJS-owned data with explicit storage/deletion semantics.

## Product scope exclusions
**Status:** accepted; permanent owner direction  
**Decision:** health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features are out of scope.  
**Rationale:** owner explicitly clarified these are not appropriate ChatJS Node.js capabilities.  
**Consequences:** do not add these to runtime APIs, dependencies, documentation promises or roadmap merely because they appear in the APK.

## Desktop Work and Codex scope
**Status:** accepted as product-reference scope  
**Decision:** include applicable desktop Work and Codex experiences: local workspaces/files, task orchestration, artifacts, command/test execution, repository inspection, diffs/review, approvals, and optional permissioned desktop/browser adapters.  
**Rationale:** explicit owner direction and current official desktop docs.  
**Consequences:** implement local equivalents only where genuine and secure. Do not claim compatibility with ChatGPT accounts/sessions or cloud services. Git worktrees/branch features are excluded by the main-only rule.

## Evidence-backed compatibility
**Status:** accepted  
**Decision:** product behavior and ChatJS implementation must be reported separately.  
**Rationale:** an app feature name or APK package indicator does not prove Node.js access.  
**Consequences:** label APK indicators Observed; cite current product docs; distinguish local implementation, inference-dependent features, platform adapters, account-only features and exclusions. Never claim 1:1 without repeatable tests.

## Single-branch repository workflow
**Status:** accepted; permanent user requirement  
**Decision:** only main. Commit directly to main. Never create, delete, rename, switch to, or publish another branch; never invoke branch/ref creation/deletion. No branch protection/rulesets or repository topics.  
**Consequences:** check live branches each chat. Report unexpected branches; never delete or modify them.

## No product telemetry or hidden collection
**Status:** accepted; permanent user requirement  
**Decision:** no telemetry, analytics, tracking, ads, profiling, hidden collection, phone-home, background reporting, remote diagnostics or telemetry dependencies.  
**Consequences:** no usage data. Network requests only when a caller explicitly invokes a separately authorized adapter and configures its destination. No silent calls or automatic content uploads.

## No pretend features or unrelated bloat
**Status:** accepted; permanent user requirement  
**Decision:** no fake, canned, predefined, hardcoded, demo-only, placeholder, no-op or test-mock runtime behavior. No bloatware, pointless dependencies, filler or unrelated files/features.  
**Consequences:** test fixtures are tests-only; every feature is implemented, tested, documented and represented honestly.

## Public repository with proprietary rights notice
**Status:** provisional; legal review required  
**Decision:** keep the public repository with an all-rights-reserved notice unless the owner explicitly changes the license.  
**Consequences:** confirm legal rights holder and contribution terms before accepting external contributions. The license governs permission to use code; it is not a prerequisite for implementing the ChatJS feature set.

## ESM and CommonJS
**Status:** accepted  
**Decision:** expose ESM and CommonJS backed by one implementation with TypeScript declarations.  
**Consequences:** test both systems and keep exports aligned.

## Current Node.js LTS
**Status:** accepted  
**Decision:** CI follows supported Node.js LTS, not a ChatJS product version system.

## GitHub and Project Sources as cross-chat memory
**Status:** accepted  
**Decision:** repository and ChatJS Project Sources are durable project memory. Search Project Sources for ChatGPT.zip in each new session.

## APK as a private reference source
**Status:** accepted  
**Decision:** keep ChatGPT.zip in Project Sources, not the public repository. Never commit the APK or copy proprietary assets/code.

## No ChatJS product versioning
**Status:** accepted  
**Decision:** no product versions, tags, lockfiles, changelogs, checksums, npm publishing, or package version field. Module name exactly ChatJS.

## Separate product documentation and project memory
**Status:** accepted  
**Decision:** root ChatJS.md documents the actual Node.js module; /docs is the persistent project handbook.


## Private reference archive policy
**Status:** accepted, Windows transfer pending  
**Decision:** retain Android source in personal Library at /ChatJS-Archives/ChatJS-Android.zip. Never put official APK/MSIX binaries in public Git. Keep the Windows official URL and findings; claim private backup only after verifying the complete file.  
**Consequences:** Android verified. Windows transfer is blocked by the 25 MiB browser export limit; do not claim retention.

## Canonical documentation completeness
**Status:** accepted; permanent workflow requirement  
**Decision:** record meaningful requirements, decisions, research, actions, changed files, verification, failures, limits, blockers and handoffs in canonical docs during the same session. Correct affected references.  
**Consequences:** preserve chronology/evidence; do not claim invisible monitoring or unsupported facts.
