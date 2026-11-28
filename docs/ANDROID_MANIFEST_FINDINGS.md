# Android Package Manifest Findings

**IDENTITY: ChatJS Subagent 1 — Android Source Investigation**  
**Investigation date:** 2026-11-28  
**Source:** supplied `ChatGPT-Android.xapk`, version 1.2026.321 (version code 2632129), public package `com.openai.chatgpt`.

## Source integrity and parsing scope

The supplied XAPK was re-read from `/mnt/data/ChatGPT-Android.xapk` and its SHA-256 recomputed as:

- XAPK: `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d` (123,574,190 bytes).
- Base APK: `312b1d843d326a4c92f52e34ba394b9899d16cb23b3411c851ffeba7ebce3d3c` (104,144,349 bytes).
- Compiled `AndroidManifest.xml`: SHA-256 `2711b75f49bea3754010fd3860c6d3e3413a4bb35f2951a4f7b34b3c7b314f11` (121,120 bytes).

The XAPK contains the base APK and `config.arm64_v8a.apk`, `config.en.apk`, and `config.mdpi.apk` splits. The binary Android XML was decoded statically from the base APK; no Android app was installed or launched, no runtime permission prompt was invoked, and no service, activity, account, or network operation was executed.

## Package and SDK metadata

| Manifest field | Value |
| --- | --- |
| Package | `com.openai.chatgpt` |
| Version | `1.2026.321` |
| Version code | `2632129` |
| Minimum SDK | `32` |
| Target SDK | `37` |
| Compile SDK | `37` |
| Required split types | `base__abi,base__density` |

## Declared permission census

The base manifest declares **87 distinct `uses-permission` entries**, including 43 `android.permission.health.*` permissions. This is a package-level declaration census, not a list of permissions proven to be requested at runtime or granted by a user.

| Area | Manifest evidence | Investigation boundary |
| --- | --- | --- |
| Network and device operation | `INTERNET`, `ACCESS_NETWORK_STATE`, `ACCESS_WIFI_STATE`, `CHANGE_NETWORK_STATE`, `WAKE_LOCK` | Does not establish which client requests use a network, or any Node.js transport behavior. |
| Voice and audio | `RECORD_AUDIO`, `MODIFY_AUDIO_SETTINGS`, `BLUETOOTH`, `BLUETOOTH_CONNECT`, `FOREGROUND_SERVICE_MICROPHONE`, `FOREGROUND_SERVICE_MEDIA_PLAYBACK` | Requires tracing actual voice/audio service consumers, runtime permission checks, and host-specific lifecycle behavior. |
| Camera and location | `CAMERA`, `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION` | Package declarations do not imply camera/location availability or permission grants. |
| Health Connect | 43 `android.permission.health.*` declarations, including `READ_HEALTH_DATA_HISTORY`, `READ_HEALTH_DATA_IN_BACKGROUND`, body measurements, cardiovascular data, activity, nutrition, sleep, mindfulness, reproductive health and exercise data | Health module presence and permission declarations do not prove a connected Health Connect provider, account entitlement, data access, or an active workflow. |
| Screen context and projection | `READ_ASSIST_STRUCTURE_SCREEN_CONTENT`, `DETECT_SCREEN_CAPTURE`, `FOREGROUND_SERVICE_MEDIA_PROJECTION` | These are separate Android platform mechanisms; do not infer screen capture or screen-reading behavior from the declarations alone. |
| Personal and communication data | `READ_CONTACTS`, `READ_CALENDAR`, `WRITE_CALENDAR`, `READ_SMS`, `SEND_SMS`, `CALL_PHONE`, `READ_CALL_LOG`, `MANAGE_OWN_CALLS`, `READ_PHONE_STATE`, `READ_BASIC_PHONE_STATE` | Requires per-operation source tracing, explicit consent, authorization and a portable optional host-adapter boundary. Do not assume ChatGPT core consumes these permissions. |
| Notifications and foreground work | `POST_NOTIFICATIONS`, `POST_PROMOTED_NOTIFICATIONS`, `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_DATA_SYNC`, `FOREGROUND_SERVICE_PHONE_CALL`, `FOREGROUND_SERVICE_MEDIA_PROJECTION`, `VIBRATE` | Manifest declarations do not establish notification scheduling or Android Work semantics. Android Work remains deferred. |
| Authentication and platform services | `USE_BIOMETRIC`, `USE_FINGERPRINT`, `com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE`, `com.google.android.gms.permission.RECEIVE`, `RECEIVE_BOOT_COMPLETED` | Must be traced to the actual Android client flow and must not be treated as credentials or authentication implementation in ChatJS. |
| Billing and other platform integrations | `com.android.vending.BILLING`, `NFC`, `SET_ALARM`, and other platform declarations | Presence alone does not establish a ChatGPT conversation capability or an in-scope ChatJS operation. |
| Advertising identifier | `com.google.android.gms.permission.AD_ID` | Explicitly excluded from ChatJS. No advertising identifier collection, telemetry or profiling is to be implemented. |

The manifest also declares the Android Bluetooth permission with `maxSdkVersion=30` and notification permission with `minSdkVersion=33`; preserve such version qualifiers if a future source-backed compatibility record needs them.

## Declared hardware and graphics features

There are nine `uses-feature` entries. Eight named hardware features are optional (`required=false`): camera.any, camera, camera.autofocus, camera.flash, screen.portrait, telephony, wifi and microphone. The manifest separately declares OpenGL ES `0x30000` (3.0) as required. This graphics requirement belongs to the Android application package and must not be imposed on the general-purpose Node.js module.

## Selected first-party application components

The parser identified 44 application components whose declared class names begin with `com.openai.`; 12 are marked exported. Relevant examples:

| Component | Manifest declaration | What it establishes |
| --- | --- | --- |
| `com.openai.chatgpt.MainActivity` | Exported activity | Main Android application entry component. |
| `com.openai.chatgpt.ChatGptDeeplinkActivity` | Exported activity | A distinct deep-link activity exists; actual intent filters and URI dispatch must be traced separately. |
| `com.openai.feature.onboarding.impl.otp.OtpDeepLinkActivity` | Exported activity | OTP deep-link component exists; not proof of OTP server or callback schema. |
| `com.openai.feature.onboarding.impl.next.deeplink.ContinueRegistrationActivity` | Exported activity | Registration continuation entry component exists. |
| `com.openai.feature.auth.impl.web.WebAuthenticationActivity` | Non-exported activity | A separate in-app web authentication activity exists. |
| `com.openai.feature.conversations.impl.coordinator.ConversationStreamingService` | Non-exported service | A conversation streaming service component is declared; does not prove its request/event protocol. |
| `com.openai.feature.messages.impl.audio.ReadAloudPlaybackService` | Non-exported foreground service | Read-aloud playback has a distinct Android service boundary. |
| `com.openai.voice.webrtc.VoiceModeForegroundService` | Non-exported foreground service | A separate voice-mode service boundary exists. |
| `com.openai.feature.assistant.impl.AssistantVoiceInteractionService` | Exported, protected by `BIND_VOICE_INTERACTION` | Android voice-assistant integration; manifest-enabled state is resource-backed and not resolved here. |
| `com.openai.feature.voice.impl.quicktile.QuickTileService` | Exported, protected by `BIND_QUICK_SETTINGS_TILE` | Quick Settings tile integration. |
| `com.openai.feature.health.impl.HealthConnectRationaleActivity` | Exported activity with resource-backed enabled flag | Health Connect rationale entry point; does not prove a connected health-data workflow. |

The census also found package components with `codex`, Dots, widgets and other feature names. These names are not used here to infer Android Work semantics or conflate Android remote-control features with the separately scoped Codex CLI family. Android Work remains deferred.

This pass did not decode every intent-filter action/category/data tuple or resolve resource-backed `enabled` flags. Exported status alone is not a complete description of an externally usable entry point.

## Implications and strict evidence limits

1. **Manifest declarations are not workflows.** A permission can be merged from a dependency, requested only on a gated path, denied by the user, or unused in a particular account/region/build.
2. **A manifest component is not an API contract.** Service/activity declarations do not prove request payloads, transport, callback schemas, session ownership or behavior.
3. **Host support must remain optional.** ChatJS must not assume Android permission APIs, a camera, microphone, screen, Health Connect, telephony, calendar, contacts, notifications or a foreground-service host. These require source-backed capabilities and optional consumer-provided host adapters where relevant.
4. **User consent and authorization remain mandatory.** Never use package declarations to justify accessing personal data or uploading it without an explicit ChatJS operation and consent.
5. **No telemetry/ads.** The Android manifest's AD_ID permission and package SDK declarations do not override ChatJS's zero-telemetry/no-advertising requirements.

## Recommended follow-up

- Trace callsites and runtime permission checks for camera, microphone, location and screen-content operations in the non-Work Android client.
- Trace Health Connect provider initialization, permission request/denial paths, connection state and data read/write boundaries independently from module-name discovery.
- Trace actual service lifecycle and callbacks for conversation streaming, read-aloud and voice-mode components; keep service declarations separate from Valdi conversation/voice module markers.
- Inspect deep-link intent filters and activity-to-auth/onboarding callback paths without inferring server routes from component names.
- Trace personal-data integrations (contacts, calendar, SMS and telephony) individually, preserving explicit consent and excluding unrelated Android SDK behavior.

**Evidence classification:** Verified package bytes and manifest metadata; Observed component/permission/feature declarations; Inferred only the investigation leads above. No new ChatJS runtime capability is implemented by this document.
