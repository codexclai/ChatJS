# GitHub Repository Settings Checklist

**Repository:** https://github.com/codexclai/ChatJS  
**Current verified facts:** public repository, default branch main, connected user codexclai has admin permission, initial repository size was zero.  
**Settings mutation status:** pending manual application. The GitHub connector used for this setup can inspect repository metadata and write repository contents, but does not expose repository metadata, branch-protection, ruleset, or security-feature mutation actions. No setting below is claimed to be enabled unless subsequently verified.

## 1. About metadata

Open the repository Settings or About panel and set:

- **Description:** Independent, modular Node.js project for building a comprehensive ChatGPT-compatible capabilities and workflow ecosystem.
- **Website:** leave blank until an official project documentation site exists.
- **Topics:** nodejs, javascript, chatjs, chatgpt, ai, assistant, sdk, multimodal, voice, developer-tools.
- **Default branch:** main.
- **Visibility:** Public (already verified).

Do not imply the package is an official OpenAI SDK or a 1:1 implementation before its compatibility claims have been proven.

## 2. Protect main

Create a branch ruleset or branch protection rule targeting main.

Recommended protections:
- Require a pull request before merging.
- Require all conversations to be resolved.
- Require status checks from the CI workflow: test (22), test (24), and test (26), after those checks have appeared successfully at least once.
- Require branches to be up to date before merging, if the resulting workflow is acceptable.
- Block force pushes.
- Block branch deletion.
- Require linear history if it does not disrupt the chosen merge workflow.
- Do not permit bypass by default; decide explicitly whether repository administrators may bypass in an emergency.
- Start with zero required approvals while codexclai is the only maintainer; require at least one independent approval after another trusted maintainer is added. A single-owner repository cannot provide a meaningful independent review.

Avoid enabling a rule that prevents the owner from merging or repairing a broken workflow before the required checks exist.

## 3. Repository and Actions permissions

- Set Actions workflow default token permissions to read repository contents.
- Require workflows to declare the smallest additional permissions at job level.
- Restrict actions to GitHub-owned actions and explicitly approved actions where practical.
- Enable approval for workflows from first-time contributors.
- Disable unnecessary GitHub Actions write permissions.
- Review the pinned commit SHAs in every workflow whenever updating an action.
- Keep Dependabot enabled for npm and GitHub Actions.

## 4. Security features

Enable or verify:
- Private vulnerability reporting.
- Secret scanning.
- Push protection for secrets.
- Dependabot alerts and security updates.
- Code scanning / CodeQL results.
- Security policy visibility.
- Branch protection and required checks.

Some security features may depend on plan and repository configuration. If a feature is unavailable, record that limitation and use the strongest available alternative.

## 5. Discussions, issues, and labels

- Keep Issues enabled.
- Discussions are optional; enable only if active community support is planned.
- Add labels such as bug, enhancement, documentation, security, research, blocked, good first issue, and breaking change.
- Review issue templates before allowing external contributions. Under the current proprietary notice, external code contributions are not yet accepted.

## 6. npm publishing

Before publishing:
1. Confirm the npm account controls the codexclai scope and the package name is available.
2. Create the package on npm without publishing a release token into GitHub.
3. Configure the npm Trusted Publisher to point to GitHub Actions, repository codexclai/ChatJS, and workflow release.yml. Match the exact branch/environment requirements configured on npm.
4. Ensure public package visibility and OIDC/provenance requirements are correct.
5. Test a release only after legal ownership, license, security, and package metadata are approved.

The release workflow is prepared for OIDC. It is not proof that npm Trusted Publishing is already configured.

## 7. What “untouchable” can and cannot mean

A public GitHub repository cannot be made impossible to copy, fork, screenshot, mirror, or archive. GitHub permissions, branch rules, code review, signed commits, and security controls reduce unauthorized changes and improve auditability; they do not prevent all copying or guarantee legal enforceability.

The all-rights-reserved notice is deliberately restrictive but does not make code technically uncopyable. GitHub's terms and applicable law still apply. Do not describe the repository as uncopyable or legally protected beyond the actual rights and settings that have been verified.

## Verification record

After applying settings, record the date, actor, exact settings, and a fresh verification result in docs/SESSION_LOG.md and .project/state.json. Re-read repository metadata and branch rules rather than assuming a save action succeeded.
