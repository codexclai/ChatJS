# GitHub Repository Settings

**Repository:** https://github.com/codexclai/ChatJS

## Verified facts — 2026-11-18
- Public repository; default branch main.
- The branch listing contains only main.
- Branch protection/rulesets and repository topics are not wanted by the owner and must not be configured or proposed.
- GitHub About description is already set to:

> ChatJS — an independent, production-focused Node.js library for comprehensive ChatGPT-compatible capabilities and workflows.

- No Dependabot configuration or other branch-generating dependency update automation remains.
- No open issues or pull requests were present at the last inspection.

## Permanent branch policy

Only main is permitted. Never create, delete, rename, switch to, or check out another branch/worktree. Never enable branch-generating bots or automation, including Dependabot update PRs. Commit directly to the existing main branch with non-force fast-forward updates. If another branch appears through external action, report it and do not modify or delete it.

## Relevant automation

- CI validates source/tests, builds the module archive, and smoke-tests CommonJS/ESM loading.
- CodeQL scans JavaScript/TypeScript source.
- Dependency Review checks dependency changes in proposed pull requests.
- All third-party GitHub Action references are pinned to immutable commits.

Do not add update bots, release workflows, npm publishing, product version automation, or automation that opens update PRs or creates branches. Do not add GitHub apps/settings without a concrete ChatJS need.
