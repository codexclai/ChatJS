# ChatGPT Android Reference

## Provenance
The owner supplied ChatGPT.zip privately in ChatJS Project → Sources and confirmed the APK was exported immediately after a Google Play update and was the latest build available to them at acquisition. This is user-confirmed provenance, not a global-latest claim.

## Static inspection — 2026-11-18
The ZIP contained one base.apk. Inspection covered the binary Android manifest and high-level packaged resource/module names.

Observed indicators included conversation/streaming, voice/read-aloud, attachment/file preview, image/text processing, search/data/connectors, code/remote-session components, memory/settings, custom instructions, library and Projects. Optional camera/microphone and other Android device permissions were also present.

Health/Health Connect, finance, maps/navigation, shopping, wallet, contacts, calendar, telephony and unrelated Android permission domains are explicitly out of ChatJS scope by owner direction. Their appearance in static package metadata is recorded only to explain their exclusion.

This was static inspection only. No emulator or interactive UI session was used; no DEX decompilation or proprietary source extraction was performed. Permissions do not prove grant or runtime use. Resource/module names do not prove visible availability, account entitlement or Node.js access. Complete mobile behavior and feature parity have not been verified.

## Retention
The owner intends to clear ChatGPT Project → Sources after the mobile and desktop review. Permitted findings and implementation implications are preserved in this repository. The original APK and assets are not stored here.

Future sessions must not request ChatGPT.zip merely to repeat this inspection. Treat this document and CHATGPT_CAPABILITY_INVENTORY.md as the durable Android reference. Do not claim Sources are empty until the owner confirms deletion. A new upload is needed only for a specifically requested comparison or UI test where other evidence is insufficient.

## Restrictions
Do not publish/redistribute the APK, copy proprietary source/assets, or extract/replay app credentials, cookies, tokens or private service protocols. Use the package only as high-level product-reference evidence.

See [ChatGPT App Capability Inventory](CHATGPT_CAPABILITY_INVENTORY.md) and [Windows Desktop Reference](REFERENCE_DESKTOP.md).
