# ChatGPT Android Reference

## Source and provenance

The user keeps **ChatGPT.zip** in **ChatJS Project → Sources** in ChatGPT. The user confirms that the APK was exported immediately after updating ChatGPT through Google Play and identifies it as the latest build available to them at the time they supplied it.

Treat this as the user's current Google Play reference build. This is user-confirmed acquisition provenance, not an independently verified claim about the latest global release.

## Storage and access

The archive is kept in the ChatJS Project's Sources, not in the public GitHub repository.

At the start of every ChatJS chat, search Project Sources for ChatGPT.zip before asking the user to attach it again. Use the available Project/Files tools to inspect the existing source when relevant. A Project Source may be available without being mounted as a local file; materialize it only when direct binary inspection is necessary.

Do not add the APK to the public repository:
- it is a proprietary third-party application binary;
- committing it publicly would redistribute the application;
- a large binary would add unnecessary weight to the source repository;
- Project Sources keep the reference independent of the codebase.

## Appropriate use

Use the APK as a high-level reference for:
- identifying product areas to investigate;
- understanding visible navigation and interaction patterns;
- creating an observable capability checklist;
- comparing behavior when the user supplies relevant screenshots or reproducible steps.

Any feature inferred from the APK must be labelled **Observed** until supported by current official documentation, an authorized interface, or repeatable tests. An app label or resource does not prove a feature is accessible to Node.js code.

## Restrictions

- Do not publish or redistribute the APK.
- Do not copy proprietary source, compiled implementation, icons, fonts, strings, branding, or other assets into ChatJS.
- Do not bypass authentication, entitlements, certificate validation, or service access controls.
- Prefer official documentation, authorized interfaces, and independent implementations.
- Do not claim a later chat inspected the APK unless the Project Source is actually accessible in that chat.

## New-chat procedure

Search **ChatJS Project → Sources** for ChatGPT.zip before requesting another upload. Ask the user to attach it again only if the Project Source is genuinely inaccessible and the task needs direct APK inspection.
