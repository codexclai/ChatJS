# ChatGPT Android Reference

## Source and provenance

The user keeps **ChatGPT.zip** in **ChatJS Project → Sources** in ChatGPT. The user confirms the APK was exported immediately after updating ChatGPT through Google Play and identifies it as the latest build available to them at the time they supplied it. This is user-confirmed acquisition provenance, not an independently verified global-latest claim.

## Storage and access

The archive remains in Project Sources, not in the public GitHub repository. Search Project Sources for ChatGPT.zip at the beginning of every ChatJS chat before asking the user to attach it again.

## Inspection record — 2026-11-18

The Project Source was found. Its ZIP contains one entry named base.apk. Static inspection covered the binary Android manifest and high-level packaged resource/module names.

Package-level indicators include:
- conversation and streaming components;
- voice interaction and read-aloud playback components;
- file/attachment preview and image/text-processing entry points;
- search, external-data, and connector-related resources;
- code-oriented and remote-session resources;
- memory/settings, custom-instruction, library and project-related resources;
- health, learning, family, finance, maps, shopping, wallet and service-related resource names;
- optional camera, autofocus, flash, microphone and telephony features, plus declared OS permissions for areas including location, contacts, calendar, notifications and health data.

These are static package indicators only. No emulator or interactive app session was used. Permissions do not prove grant or runtime use. Resource/module names do not prove that a user-facing feature is enabled, entitled, or available to third-party Node.js software. The actual user experience and feature parity have not been verified.

No DEX decompilation, proprietary source extraction, code copying, or resource redistribution was performed. The APK, package version, checksums and raw manifest dump are not committed.

## Appropriate use

Use the APK only as a high-level reference to identify areas for further investigation. Any inferred feature must be labelled **Observed in APK** until supported by official documentation, an authorized interface, or repeatable tests. An app label, resource, manifest component or permission does not prove that a feature is accessible to Node.js.

See [ChatGPT Capability and Interface Inventory](CHATGPT_CAPABILITY_INVENTORY.md) for the evidence inventory and current public-interface mapping.

## Restrictions

- Do not publish or redistribute the APK.
- Do not copy proprietary source, compiled implementation, icons, fonts, strings, branding, or other assets into ChatJS.
- Do not bypass authentication, entitlements, certificate validation, or service access controls.
- Prefer official documentation, authorized interfaces and independent implementations.
- Do not claim a later chat inspected the APK unless the Project Source is actually accessible in that chat.

## New-chat procedure

Search **ChatJS Project → Sources** for ChatGPT.zip before requesting another upload. Ask the user to attach it again only if the Project Source is genuinely inaccessible and direct APK inspection is necessary.
