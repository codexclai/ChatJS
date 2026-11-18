# GitHub Repository Settings Checklist

**Repository:** https://github.com/codexclai/ChatJS

**Verified:** public repository, default branch main, connected account codexclai has admin-level permission.

**Important limitation:** the GitHub connector used for this setup can inspect repository metadata and write repository contents, but does not expose repository About metadata, branch-protection, ruleset, or security-feature mutation. Those controls are therefore pending manual application. Do not claim they are active until verified.

## About metadata

Set the repository description to:

> ChatJS — an independent, modular Node.js library for comprehensive ChatGPT-compatible capabilities and workflows.

Suggested topics: nodejs, javascript, chatjs, chatgpt, ai, assistant, sdk, multimodal, voice, developer-tools.

Keep the website blank until a real documentation site exists. The repository is already public and uses main as its default branch.

## Protect main

Create a ruleset targeting main:
- Require pull requests before merge.
- Require all review conversations resolved.
- Require successful CI and documentation checks after they have run successfully at least once.
- Block force pushes and branch deletion.
- Require linear history only if it fits the chosen merge workflow.
- Start with zero independent approvals while codexclai is the only maintainer; require one independent approval when another trusted maintainer joins.
- Decide explicitly whether administrators may bypass for recovery.

Do not enable required checks before the workflows have produced the corresponding successful status names.

## Actions permissions

- Set default workflow token permissions to read-only.
- Keep permissions declared at the smallest job level.
- Restrict workflows to GitHub-owned or explicitly approved actions where practical.
- Require approval for workflows from first-time contributors.
- Review pinned action commit identifiers when updating workflow dependencies.

## Security controls

Enable or verify:
- Private vulnerability reporting.
- Secret scanning and push protection.
- Dependabot alerts and security updates.
- Code scanning / CodeQL.
- Security policy visibility.
- Branch protection and required checks.

Availability may depend on GitHub plan and account configuration. Use the strongest available alternative when a feature is unavailable.

## Issues and community

Keep Issues enabled. Discussions are optional. Suggested labels: bug, enhancement, documentation, security, research, blocked, breaking-change.

External code contributions remain paused while proprietary ownership and contributor terms are unsettled.

## Project package policy

The Node module is named exactly ChatJS. It has a minimal package.json for Node.js resolution, no ChatJS product release numbering, no package version field, and no npm-registry publishing workflow. Install directly from GitHub using npm's Git dependency support.

The only version key retained in a third-party tool configuration may be a mandatory configuration schema marker (for example, Dependabot's required schema version); it is not a ChatJS product version.

## Repository protection limits

A public GitHub repository cannot be made impossible to copy, fork, screenshot, mirror, or archive. Branch rules and access controls help prevent unauthorized changes; they do not guarantee that code cannot be copied or that legal rights are enforceable. Do not describe the repository as uncopyable.
