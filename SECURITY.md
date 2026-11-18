# Security Policy

## Scope

This policy covers the ChatJS source code and project-controlled workflows in this repository. It does not make claims about the security of OpenAI services, third-party providers, user systems, or external infrastructure.

## Reporting a vulnerability

**Do not open a public issue or pull request for an undisclosed vulnerability.**

Use the repository's GitHub Security tab and private vulnerability reporting / private advisory mechanism when available. If private reporting is not enabled, contact the repository owner through a private channel available from the GitHub profile and ask for a secure reporting route. Do not include exploit details in a public issue.

Include, where safe:
- affected commit, tag, or version;
- impact and realistic attack prerequisites;
- minimal reproduction steps;
- proof-of-concept that does not expose real users or data;
- suggested mitigation;
- whether the issue is already public or actively exploited.

Do not send passwords, access tokens, cookies, user conversations, private keys, or personal data.

## Response expectations

The project is not yet a staffed security-response program and cannot promise a fixed response SLA. The maintainer should acknowledge receipt, assess impact, coordinate remediation, and publish an advisory only when disclosure is safe and appropriate.

## Secure development baseline

- Least-privilege GitHub Actions permissions.
- Pinned third-party workflow actions.
- Automated dependency review and Dependabot updates.
- CodeQL scanning.
- No hard-coded secrets or tokens.
- Redacted diagnostics and no raw prompt/output logging by default.
- Input validation and explicit resource limits.
- Tests for authentication, authorization, cancellation, concurrency, and error paths as applicable.
- No bypass of service access controls or platform security.

## Supported versions

Only versions explicitly listed in the release documentation will receive security support. At bootstrap, no production release has been published.
