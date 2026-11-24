# ChatGPT Android Client Reference

## Current source

The Android client package is retained in **ChatJS Project → Sources** as:

**`ChatGPT-Android.xapk`** — 123,574,190 bytes.

This is an app bundle containing the ChatGPT base APK and required architecture, language, and density split APKs. Keep the XAPK and its internal structure intact. It is not a standalone APK and must not be treated as one.

## Integrity and provenance

The package was obtained using the official Google Play listing for ChatGPT as the source reference. The local SHA-256 matched the download provider's published hash:

`22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`

The ZIP integrity test completed without errors. This establishes byte integrity against the provider's published hash; it is not an independent malware scan or independent APK certificate verification.

## Engineering use

Use supplied client code, compiled modules, request/response construction, payload schemas, serialization, transport, connection/authentication/session behavior, local state, tools, and resources as technical evidence. Do not reject a client interface merely because public developer documentation does not describe it.

## Analysis status

Earlier work examined a full extracted Android payload archive and recorded ten DEX files, 121 compiled Valdi modules, and first-pass client protocol findings. That work established useful leads, not complete source reconstruction.

Still incomplete: full method-level DEX/Valdi analysis, request-flow tracing, authentication/session tracing, complete schemas, interactive UI audit, emulator testing, and end-to-end Node.js behavior. Do not claim these investigations are complete.

The client package does not include server-side code that was never shipped in the app. ChatJS adapts the client; it does not recreate ChatGPT's server.

## General-purpose ChatJS implications

ChatJS is a general-purpose Node.js library, not a mobile application. It must remain usable across different host applications, operating systems, devices, and deployment environments. Do not assume camera, microphone, screen, Android runtime, or a specific OS feature; host-dependent capabilities belong behind optional adapters.

Keep official packages and extracted third-party payloads out of public Git. Preserve independently authored findings and ChatJS implementation in the repository.

## Current 2026-11-24 package-level inspection

The supplied XAPK manifest identifies version 1.2026.321 (version code 2632129), package com.openai.chatgpt, min SDK 32 and target SDK 37. The supplied 123,574,190-byte XAPK independently passed ZIP CRC testing and its SHA-256 matches the recorded provider hash: 22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d.

Its base APK has 5,080 ZIP entries, ten DEX files and 111 compiled Valdi modules. All 111 Valdi modules were Zstandard-decompressed for a static scan. A partial DEX method-reference scan found the Android native DeviceIntegrity service, its request/response contracts, Google Play Integrity token generation and the first-party chat-requirements/device-integrity exchange. Detailed findings and limitations are in [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md).

These counts describe the currently supplied XAPK. They are not a correction to the historical 2026-11-20 extracted archive's inventory of 121 Valdi modules: the archives represent different package/source snapshots. The hash match and ZIP CRC test do not establish an independent malware scan or independent signing-certificate verification.
