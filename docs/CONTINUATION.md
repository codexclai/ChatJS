# ChatJS — Continuation and Handoff Protocol

This document is the operating contract for every ChatJS work session, including a completely new chat in this ChatGPT Project. Repository-backed continuity avoids reliance on private conversational history.

## 1. Identity and north star

- Project, repository, and exact Node module name: **ChatJS**.
- GitHub repository: **codexclai/ChatJS**.
- Runtime: Node.js, with ESM and CommonJS entry points and TypeScript declarations.
- Product goal: build a comprehensive, modular, polished Node.js module that reproduces observable ChatGPT capabilities and mobile workflows as faithfully as technically and legally possible.
- Quality bar: organized, human-friendly, secure, fast, lightweight, responsive, extensible, asynchronous, concurrent, documented, tested, and production-minded.
- No generic filler, bloatware, needless dependencies, temporary junk, fake feature support, or placeholders presented as finished work.
- ChatJS is independent and is not an OpenAI product. Never imply endorsement or official status.

The goal is ambitious, but capability claims must always match implemented and verified behavior. A feature is not supported merely because it is on the roadmap or visible in a reference application.

## 2. Mandatory start-of-session procedure

At the beginning of every new ChatJS chat:

1. Open the GitHub repository using the GitHub connector. Do not assume a previous chat's repository snapshot is current.
2. Inspect the default branch, latest commit, changed files, open issues and pull requests, and CI state where the connector exposes them.
3. Read this file, then read docs/PROJECT_STATE.md, docs/TODO.md, docs/ROADMAP.md, docs/CAPABILITY_MATRIX.md, docs/SESSION_LOG.md, and docs/DECISIONS.md.
4. Read docs/ARCHITECTURE.md before designing or changing public interfaces.
5. Search the **ChatJS Project's Sources in ChatGPT** for **ChatGPT.zip**. The user keeps the updated Google Play APK there. Inspect it when a task needs direct app-reference evidence; do not ask for another upload before checking Project Sources.
6. Read docs/REFERENCE_APK.md before drawing conclusions from the supplied Android reference.
7. Compare the current repository with the last recorded session. GitHub is authoritative when persisted notes and the live repository disagree.
8. Identify the highest-priority safe and actionable task. Preserve unfinished work; do not silently discard experiments or TODOs.

Do not ask the user to repeat project details already recorded in the repository or Project Sources. If the task is clear and safe, proceed. If an important fact is unknown, identify the exact uncertainty and make the best evidence-backed progress possible.

## 3. Meaning of “Continue”

When the user says “Continue”, “keep going”, or equivalent:

- Resume from the live repository and persisted state, not from a guessed conversation summary.
- Select the highest-priority actionable item in docs/TODO.md.
- Continue implementation, research, testing, or repository work through completion of a coherent unit.
- Do not merely give another plan; make repository changes when authorized and possible.
- Do not start a parallel subsystem while a higher-priority foundation task is incomplete.
- Update tests and all affected documentation before finishing.
- Leave an exact handoff: what changed, relevant links, test results, open questions, and next task.

If no implementation task is ready, investigate a blocked prerequisite, improve the specification, or record a concrete decision proposal. Do not invent implementation status.

## 4. Evidence and compatibility rules

Use three explicit evidence categories:
- **Verified public behavior:** supported by current official documentation, an official public API, or reproducible tests.
- **Observed reference behavior:** visible or inferable from the supplied APK or user-provided observations, but not necessarily a public integration contract.
- **Planned or unknown:** desired behavior, inaccessible internals, or assumptions that need validation.

Never silently turn observed UI behavior into a public API guarantee. Do not claim 1:1 compatibility without a documented, repeatable conformance test. Do not bypass authentication, access controls, rate limits, private endpoints, certificate checks, or security boundaries. Prefer officially documented and authorized interfaces. Document any required user-owned backend or external dependency.

## 5. Android reference artifact

The user supplied ChatGPT.zip in the ChatJS Project's Sources in ChatGPT and confirms it was exported immediately after updating ChatGPT through Google Play. Treat it as the latest build available to the user at the time supplied.

- Search Project Sources at the start of every new chat before asking for another upload.
- The file may not be mounted locally by default; use the Project file tools and materialize it only when direct inspection is needed.
- Do not commit, publicly host, or redistribute the APK.
- Do not copy proprietary app assets, source, strings, branding, images, or code into this public repository.
- Do not claim to have inspected the file in a new chat unless it is actually accessible there.
- Record observations as observations and independently verify public behavior where possible.

## 6. Engineering quality bar

For every change:
1. Inspect the existing code and conventions before editing.
2. Prefer small, modular, well-named, typed public interfaces and clear internal boundaries.
3. Keep the runtime lightweight. Add dependencies only when benefits, maintenance cost, security posture, and license have been reviewed.
4. Design explicit async, streaming, cancellation, timeout, retry, concurrency, and error semantics where relevant.
5. Validate inputs, avoid leaking credentials, and never log secrets or private user content by default.
6. Add unit, integration, compatibility, and regression tests appropriate to the change.
7. Test against the current supported Node.js LTS runtime in CI.
8. Update README, API docs, capability matrix, roadmap, state, decisions, and migration guidance as applicable.
9. Run the full check suite and inspect the final diff before committing.
10. State clearly what was and was not tested.

No placeholder method may be documented as a completed feature. No swallowed exception, fake success response, silent no-op, or undocumented network call is acceptable.

## 7. Documentation and project memory

The repository is the cross-chat memory:
- .project/state.json is structured current state.
- docs/PROJECT_STATE.md is generated; update JSON and run npm run docs:sync, never hand-edit the generated file.
- docs/TODO.md tracks actionable open work.
- docs/SESSION_LOG.md records meaningful sessions chronologically.
- docs/DECISIONS.md records durable decisions and reversals.
- docs/CAPABILITY_MATRIX.md tracks feature status and evidence.
- docs/REFERENCE_APK.md tracks artifact provenance and observations.
- docs/CONTINUATION.md defines this workflow.

At the end of every session, update state, task queue, session log, and affected specifications. Keep the handoff exact enough that a new chat can continue without asking what happened.

## 8. GitHub and repository operations

Use the GitHub connector and live repository as the authoritative workspace. Work on a feature branch when branch protection is enabled; otherwise keep changes atomic and use reviewed commits. Never force-push, delete branches, change repository visibility, relax protections, merge a PR, or alter legal rights without explicit authorization.

If the connector cannot apply a setting, document the exact manual action in docs/REPOSITORY_SETTINGS.md and report it as pending. Do not say a setting is enabled until verified.

## 9. Security, legal, and package rules

The repository is public and currently carries a proprietary all-rights-reserved notice, not an open-source license. Treat that notice as an operational choice, not legal advice. Do not accept external code contributions until ownership and contributor terms are settled. Do not add private keys, API tokens, cookies, user databases, internal endpoints, or APK contents.

The only package metadata file should be the minimal package.json needed for Node.js module resolution; its exact package name is ChatJS. Do not introduce ChatJS product release numbering, semantic-release automation, release tags, lockfiles, checksum inventories, changelog/version machinery, package version fields, APK manifest dumps, or npm registry publishing. Git commit history is normal source-control history, not a product versioning system. CI follows the current supported Node.js LTS runtime.

## 10. Completion checklist

A session is complete only when:
- The task is implemented or its blocker is precisely documented.
- Tests and checks have actually run and their real results are recorded.
- Documentation and project state match the repository.
- TODOs and decisions reflect what changed.
- No generated, temporary, or sensitive artifacts were accidentally committed.
- The handoff names relevant files, commit/PR references, test outcomes, unresolved risks, and next action.

Always prefer accurate, maintainable progress over inflated claims or rushed feature lists.
