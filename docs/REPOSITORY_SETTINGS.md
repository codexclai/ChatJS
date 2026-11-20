# GitHub Repository Settings

**Repository:** https://github.com/codexclai/ChatJS

## Verified facts — 2026-11-20

- Public repository; default branch `main`.
- Branch API returned only `main`.
- No open issues or pull requests were returned.
- No branch protection/rulesets or repository topics are wanted by the owner and must not be configured or proposed.
- No branch-generating dependency-update automation is present in the current tree.
- Last observed About description: "ChatJS — an independent, production-focused Node.js library for comprehensive ChatGPT-compatible capabilities and workflows." This is outdated.

## Recommended new About description

> General-purpose Node.js module unifying official ChatGPT mobile and desktop client workflows.

**Status:** recommended wording; not applied. The GitHub actions available in this session can inspect the repository and commit files but do not expose a repository metadata description update. The owner must paste this exact wording into GitHub's About description field.

## Permanent branch policy

Only `main` is permitted. Never create, delete, rename, switch to, or check out another branch/worktree. Never enable branch-generating bots or automation. Commit directly to the existing `main` branch with non-force fast-forward updates. If another branch appears through external action, report it and do not modify or delete it.

## Relevant automation

- CI validates source/tests, builds the module archive, and smoke-tests CommonJS/ESM loading.
- CodeQL scans JavaScript/TypeScript source.
- Dependency Review checks dependency changes in proposed pull requests.
- Third-party GitHub Action references are pinned to immutable commits.

Do not add update bots, release workflows, npm publishing, product version automation, or automation that opens update PRs or creates branches.
