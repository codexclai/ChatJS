# Engineering Workflow

## Start

1. Synchronize the project context with the live GitHub repository.
2. Read docs/CONTINUATION.md and the current state, task queue, capability matrix, decisions, and session log.
3. Search ChatGPT Project Sources for ChatGPT.zip before requesting the reference APK again.
4. Confirm the current branch and latest commit.
5. Pick one high-priority task and define acceptance criteria before editing.

## Research

For product or compatibility questions:
- Prefer current official documentation and source material.
- Use dated sources and record the publication/access date.
- Distinguish official API contracts, public product documentation, observed UI behavior, and inferred behavior.
- Record unresolved questions rather than masking them with assumptions.
- Check legal, privacy, security, platform, and plan limitations early.

## Implementation

- Inspect relevant code and existing patterns first.
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
- Current supported Node.js LTS runtime CI.

Add targeted tests for changed behavior. State clearly if any test was not run or depended on unavailable services.

## Documentation synchronization

When implementation or decisions change:
- update the capability matrix with status and evidence;
- update API and architecture docs;
- update TODO and roadmap;
- add or amend a decision record;
- update README and examples as appropriate;
- update .project/state.json and regenerate docs/PROJECT_STATE.md;
- append a dated session summary.

CI verifies generated project-state documentation and local Markdown links. This prevents a known class of documentation drift; it does not automatically infer all semantic changes from source code. Authors remain responsible for updating the right documents.

## Git hygiene

- Prefer short, descriptive commits.
- Never force-push without explicit need and authorization.
- Keep main protected after required checks are configured.
- Review all changed files for secrets, binary artifacts, unrelated generated files, and license problems.

## Finish

Record:
- files changed and why;
- implementation behavior and remaining gaps;
- tests actually run and their results;
- commit and pull request URLs;
- open blockers or decisions;
- next recommended action.

The final handoff should be brief but concrete. The repository log must be detailed enough for a different chat or maintainer to resume.
