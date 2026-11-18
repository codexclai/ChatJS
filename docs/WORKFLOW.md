# Engineering Workflow

## Start

1. Synchronize the local mental model with the live repository through the GitHub connector.
2. Read docs/CONTINUATION.md and the current state, task queue, capability matrix, decisions, and session log.
3. Confirm the exact branch and latest commit.
4. Pick one high-priority task and define its acceptance criteria before editing.

## Research

For product or compatibility questions:
- Prefer current official documentation and source material.
- Use dated sources and record the publication/access date.
- Distinguish official API contracts, public product documentation, observed UI behavior, and inferred behavior.
- Record unresolved questions rather than masking them with assumptions.
- Check legal, privacy, security, platform, and plan limitations early.

## Implementation

- Inspect the relevant code and existing patterns first.
- Keep a change cohesive and avoid unrelated refactors.
- Use the smallest viable dependency set.
- Make asynchronous behavior, cancellation, concurrency, and cleanup explicit.
- Validate data at boundaries and keep secrets out of logs.
- Provide stable error codes and useful safe messages.
- Keep optional features optional.

## Verification

Run the complete project check before finalizing:
- JavaScript syntax checks.
- Generated documentation synchronization check.
- Local Markdown link validation.
- Node built-in test suite.
- Package dry run and supported Node.js matrix in CI.

Add targeted tests for the changed behavior. State clearly if any test was not run or depended on unavailable services.

## Documentation synchronization

When implementation or decisions change:
- update the capability matrix with status and evidence;
- update API and architecture docs;
- update TODO and roadmap;
- add or amend a decision record;
- update package docs and changelog as appropriate;
- update .project/state.json and regenerate docs/PROJECT_STATE.md;
- append a dated session summary.

CI verifies generated project-state documentation and local Markdown links. This prevents a known class of documentation drift; it does not automatically infer all semantic changes from source code. Authors remain responsible for updating the right documents.

## Git hygiene

- Prefer short, descriptive commits.
- Never force-push without explicit need and authorization.
- Keep the main branch protected after required checks are configured.
- Review all staged changes for secrets, binary artifacts, unrelated generated files, and license problems.
- Do not publish or create a release until the release prerequisites are satisfied.

## Finish

Record:
- files changed and why;
- implementation behavior and remaining gaps;
- tests actually run and their results;
- commit and pull request URLs;
- open blockers or decisions;
- the next recommended action.

The final user-facing handoff should be brief but concrete. The repository log must be detailed enough for a different chat or maintainer to resume.
