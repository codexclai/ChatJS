# ChatJS — Continuation and Handoff Protocol

This file is the operating contract for every ChatJS work session, whether it happens in this conversation or a completely new chat. It makes repository-backed continuity possible without assuming that ChatGPT conversation memory is shared.

## 1. Identity and north star

- Product and repository name: **ChatJS**.
- GitHub repository: **codexclai/ChatJS**.
- Package working name: **@codexclai/chatjs** (proposed; verify npm namespace ownership and availability before publishing).
- Runtime: Node.js.
- Product goal: build a comprehensive, modular, polished Node.js module that reproduces observable ChatGPT capabilities and mobile workflows as faithfully as technically and legally possible.
- Quality bar: organized, detailed, human-friendly, production-minded, secure, fast, lightweight, responsive, extensible, asynchronous, concurrent, documented, and testable.
- ChatJS is independent and is not an OpenAI product. Never imply endorsement or official status.

The goal is ambitious, but capability claims must always match implemented and verified behavior. A feature is not supported merely because it is on the roadmap or visible in a reference application.

## 2. Mandatory start-of-session procedure

At the beginning of every new ChatJS chat:

1. Open the GitHub repository using the GitHub connector. Do not assume a previous chat's repository snapshot is current.
2. Inspect the default branch, latest commit, changed files, open issues and pull requests, and current workflow/CI state where the connector exposes them.
3. Read this file, then read docs/PROJECT_STATE.md, docs/TODO.md, docs/ROADMAP.md, docs/CAPABILITY_MATRIX.md, docs/SESSION_LOG.md, and docs/DECISIONS.md.
4. Read docs/ARCHITECTURE.md before designing or changing public interfaces.
5. Read docs/REFERENCE_APK.md before drawing conclusions from the supplied Android artifact.
6. Compare the current repository with the last recorded session. GitHub is authoritative when this file and the live repository disagree.
7. Identify the highest-priority safe and actionable task. Preserve unfinished work; do not silently discard experiments or TODOs.

Do not ask the user to repeat project details already recorded in the repository. If the task is clear and safe, proceed. If an important fact is unknown, identify the exact uncertainty and make the best evidence-backed progress possible.

## 3. Meaning of “Continue”

When the user says “Continue”, “keep going”, or equivalent:

- Resume from the live repository and the persisted state, not from a guessed conversation summary.
- Select the next highest-priority actionable item in docs/TODO.md.
- Continue implementation, research, testing, or repository work through completion of a coherent unit.
- Do not merely describe what could be done; make the repository changes when authorized and possible.
- Do not start a parallel or unrelated subsystem while a higher-priority foundation task is incomplete.
- Update tests and all affected documentation before finishing.
- Leave a concise, exact handoff: what changed, commit/PR links, test results, open questions, and the next task.

If no implementation task is ready, investigate a blocked prerequisite, improve the relevant specification, or record a concrete decision proposal. Do not invent implementation status.

## 4. Evidence and compatibility rules

Use three explicit evidence categories:

- **Verified public behavior:** supported by current official documentation, an official public API, or reproducible tests.
- **Observed reference behavior:** visible or inferable from the supplied artifact or user-provided observations, but not necessarily supported as a public integration contract.
- **Planned or unknown:** desired behavior, inaccessible internals, or assumptions that need validation.

Never silently turn observed UI behavior into a public API guarantee. Do not claim 1:1 compatibility without a documented, repeatable conformance test. Do not bypass authentication, access controls, rate limits, private endpoints, certificate checks, or security boundaries. Prefer officially documented and authorized interfaces. Clearly document any necessary user-owned backend or external dependency.

## 5. Android reference artifact

The user supplied ChatGPT.zip, which contains one Android base.apk entry. Its measured SHA-256 and inventory are in docs/REFERENCE_APK.md. It is a reference for safe, high-level feature discovery only.

- Do not upload the APK or copied proprietary assets, source, strings, branding, images, or code into this public repository.
- Do not infer that its archive timestamp proves it is the latest release.
- Do not claim the manifest version or package identifier unless decoded and recorded from the actual file.
- Record observations as observations, cite their source, and independently verify public behavior where possible.
- Recheck the reference provenance before each new investigation; the original attachment may not be mounted in a future chat.

## 6. Engineering quality bar

For every change:

1. Inspect the existing code and conventions before editing.
2. Prefer small, modular, well-named, typed public interfaces and clear internal boundaries.
3. Keep the runtime lightweight. Add dependencies only when their benefits, maintenance cost, security posture, and license have been reviewed.
4. Design explicit async, streaming, cancellation, timeout, retry, concurrency, and error semantics where relevant.
5. Validate inputs, avoid leaking credentials, and never log secrets or private user content by default.
6. Add unit, integration, compatibility, and regression tests appropriate to the change.
7. Test all supported Node.js LTS lines in CI.
8. Update README, API docs, capability matrix, roadmap, state, decisions, changelog, and migration notes as applicable.
9. Run the full check suite and inspect the final diff before committing.
10. State clearly what was and was not tested.

No placeholder method may be documented as a completed feature. No swallowed exception, fake success response, silent no-op, or undocumented network call is acceptable.

## 7. Documentation and project memory

The repository is the cross-chat memory.

- .project/state.json is the structured source for the current project snapshot.
- docs/PROJECT_STATE.md is generated; update the JSON and run npm run docs:sync, never hand-edit the generated file.
- docs/TODO.md tracks actionable open work and priority.
- docs/SESSION_LOG.md records meaningful completed sessions chronologically.
- docs/DECISIONS.md records durable decisions and reversals.
- docs/CAPABILITY_MATRIX.md tracks feature status and evidence.
- docs/REFERENCE_APK.md tracks the artifact and observations.
- docs/CONTINUATION.md defines this workflow.

At the end of every session, update the state, task queue, session log, and any affected specifications. Keep the handoff exact enough that a new chat can continue without asking what happened.

## 8. GitHub and repository operations

Use the GitHub connector and the live repository as the authoritative workspace. Work on a feature branch when branch protection is enabled; otherwise keep changes atomic and use reviewed commits. Never force-push, delete branches, change repository visibility, relax protections, merge a PR, publish a package, or alter legal rights without explicit authorization.

The connector may not expose repository metadata or settings mutation. If it cannot apply a setting, document the exact manual action in docs/REPOSITORY_SETTINGS.md and report it as pending. Do not say that a setting is enabled until it has been verified in GitHub.

## 9. Security and legal boundaries

The repository is public and currently carries a proprietary all-rights-reserved notice, not an open-source license. Treat the notice as a conservative project decision, not a substitute for legal advice. Do not accept outside contributions or publish the package until ownership, rights, contributor terms, and npm namespace are confirmed. Do not add private keys, API tokens, cookies, user databases, internal endpoints, or APK contents.

## 10. Completion checklist

A session is complete only when:
- The requested task is implemented or its blocker is precisely documented.
- Tests and applicable checks have been run and their actual results recorded.
- Documentation and project state match the repository.
- TODOs and decisions reflect what changed.
- No generated, temporary, or sensitive artifacts were accidentally committed.
- The final handoff names relevant files, commit/PR references, test outcomes, unresolved risks, and the next action.

Always prefer accurate, maintainable progress over inflated claims or rushed feature checklists.
