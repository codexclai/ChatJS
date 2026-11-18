# GitHub Repository Settings

**Repository:** https://github.com/codexclai/ChatJS

## Verified repository facts

- Visibility: public.
- Default branch: main.
- Connected GitHub account: codexclai, with admin-level repository permission.
- Issues: enabled.
- The current paginated branch search returned only main; the next page was empty.
- At the last inspection, repository description and topics were empty.
- No repository rulesets were returned. The branch-protection read request was denied to the connected integration, so its state could not be verified.

The user explicitly does **not** want repository topics or branch protection/rulesets configured. Do not create a ruleset or spend time proposing one. The permanent project workflow is main-only: never create, delete, rename, switch to or publish another branch. If an unexpected branch appears, report it; never delete it.

## Repository description

Set this description in the GitHub repository About panel:

> An independent Node.js project building comprehensive ChatGPT-compatible capabilities through verified, authorized interfaces.

Do not add repository topics. Leave the website blank until a real documentation site exists.

The GitHub connector used for repository content changes does not expose About metadata mutations. The repository description therefore remains a manual owner-side change unless a suitable authorized settings control becomes available.

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

Some features depend on GitHub plan and repository configuration. Use the strongest available alternative if a feature is unavailable.

## Issues and contributions

Keep Issues enabled. Discussions are optional. External code contributions remain paused until legal ownership and contributor terms are settled.

## Public repository limitations

A public repository cannot be made impossible to copy, fork, screenshot, mirror or archive. Legal rights and repository permissions cannot guarantee technical uncopyability or a legal outcome.