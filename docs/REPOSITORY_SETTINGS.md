# GitHub Repository Settings

**Repository:** https://github.com/codexclai/ChatJS

## Verified facts
- Public repository; default branch main.
- The full branches endpoint returns only main.
- Branch protection/rulesets are not wanted by the owner.
- Repository topics are not wanted.
- GitHub About description is unset. The connected GitHub tools do not expose a description-write operation.

## GitHub About description
Paste this exact text into the repository About → Description field:

> An independent Node.js library for building ChatGPT-compatible capabilities and workflows.

Do not add topics. Leave the website blank until a real documentation site exists.

## Permanent branch policy
Only main is permitted. Never create, delete, rename, switch to, or check out another branch/worktree. Never enable branch-generating bots or automation, including Dependabot update PRs. Commit directly to main with non-force fast-forward updates. If another branch appears through external action, report it and do not modify or delete it.

Branch protection/rulesets and topics are explicitly not requested; do not configure or propose them.

## Relevant automation
- CI validates the real source/tests, builds the module archive, and smoke-tests CommonJS/ESM loading.
- CodeQL scans JavaScript/TypeScript source.
- Dependency Review checks dependency changes in proposed pull requests.

Do not add update bots, release workflows, npm publishing, product version automation, or automation that opens update PRs or creates branches. Do not add GitHub apps/settings without a concrete ChatJS need.
