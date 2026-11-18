# GitHub Repository Settings

**Repository:** https://github.com/codexclai/ChatJS

## Verified repository facts

- Visibility: public.
- Default branch: main.
- Connected GitHub account: codexclai, with admin-level repository permission.
- Issues: enabled.
- At the last inspection, repository description and topics were empty.
- At the last inspection, no repository rulesets were returned.
- The branch-protection read request was denied to the connected integration, so its state could not be verified.

The GitHub connector used for repository content changes does not expose mutations for About metadata, branch protection/rulesets, or repository security features. Those settings remain manual. Do not say they are active until checked in GitHub.

## Repository description and topics

Suggested description:

> ChatJS — an independent, modular Node.js library for comprehensive ChatGPT-compatible capabilities and workflows.

Suggested topics:
- nodejs
- javascript
- chatjs
- chatgpt
- ai
- assistant
- sdk
- multimodal
- voice
- developer-tools

Leave the website blank until a real documentation site exists.

## Protect main

Create a branch ruleset targeting main:
- Require pull requests before merge.
- Require review conversations to be resolved.
- Require successful CI checks after they have run successfully and their exact check names are known.
- Block force pushes and branch deletion.
- Require linear history only if it fits the chosen merge workflow.
- While codexclai is the only maintainer, do not require an impossible independent approval. Require at least one independent approval after a trusted maintainer joins.
- Decide explicitly whether administrators may bypass protections for recovery.

## Actions permissions

- Set default workflow token permissions to read-only.
- Keep each workflow's permissions at the smallest required scope.
- Require approval for workflows from first-time contributors.
- Restrict actions to GitHub-owned or explicitly approved actions where practical.
- Keep third-party actions pinned to immutable commit references and review updates.

## Security features

Enable or verify where available:
- Private vulnerability reporting.
- Secret scanning and push protection.
- Code scanning / CodeQL.
- Dependabot security alerts.
- Security policy visibility.
- Branch protection and required checks.

Some features depend on GitHub plan and repository configuration. Use the strongest available alternative if a feature is unavailable.

## Issues and community

Keep Issues enabled. Discussions are optional. Suggested labels: bug, enhancement, documentation, security, research, blocked, breaking-change.

External code contributions remain paused until legal ownership and contributor terms are settled.

## Public repository limitations

A public repository cannot be made impossible to copy, fork, screenshot, mirror, or archive. Branch rules, permissions, and legal rights can reduce risks and improve auditability, but they cannot make the repository technically uncopyable or guarantee a legal outcome.
