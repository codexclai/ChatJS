# ChatGPT Android Client Reference — Extracted APK Payload

## Provenance and retention

The owner supplied `ChatGPT.zip` in the earlier ChatJS Project research. It contained one `base.apk`. Project Sources are now intentionally kept empty. The verified personal Library copy is:

**`/ChatJS-Archives/ChatJS-Android.zip`**

The owner reported the APK was exported immediately after a Google Play update and was the latest build available to them at acquisition. This is owner-reported provenance, not a claim it was globally latest.

## Full APK payload extraction — 2026-11-19

The retained ZIP is the full extracted APK payload tree, not the earlier 4 KB metadata-only dossier.

Verified archive facts on 2026-11-20:
- Personal Library file size: 59,454,036 bytes.
- ZIP entry count: 4,989, consisting of all 4,987 extracted APK payload entries plus a README and structured JSON inventory.
- Total uncompressed size of APK payload entries: 106,501,945 bytes.
- Ten compiled DEX files are present.
- 121 compiled Valdi modules (`.valdimodule`) are present.
- The structured inventory records the path, size, and CRC for each extracted APK entry and includes extension/module summaries.
- ZIP CRC test returned no corrupt member.

The payload tree retains the manifest, compiled application code/modules, resources/assets, schemas/protobufs, configuration metadata, third-party notices, fonts, images, animations, strings, and other package content. The archive's `CHATJS-ANDROID-REFERENCE.json` is the detailed per-entry inventory.

## Why the payload matters

The archive contains actual client-side implementation material. It is not merely a metadata summary. It must be used to understand and reproduce the ChatGPT mobile client's request/response construction, payloads, schemas, connection/transport, authentication/session behavior, local state, and other systems where that behavior is present in the package.

Public developer documentation is not the only evidence of a client interface. Do not reject a client-side request or connection merely because it is not described in public API docs. First inspect the shipped code and establish exactly what the client does.

## Analysis status and limits

**Verified:** extracted payload archive and ZIP integrity.

**Observed from the archive inventory:** compiled DEX, compiled Valdi modules, manifest/resources/assets, schemas/configuration, and third-party notices.

**Not yet verified:** source-level DEX decompilation/reconstruction, complete Valdi analysis, request-flow tracing, authentication/session tracing, interactive UI audit, emulator testing, or end-to-end Node.js behavior. Compiled client code is valuable source material but is not already a decompiled Node.js project. Do not claim these investigations are complete until performed and recorded.

Client-side package contents do not include server-side code that was never shipped in the APK. Reproducing the client does not require recreating the ChatGPT server.

## General-purpose ChatJS implications

ChatJS is a general-purpose Node.js library, not a mobile application. Keep it usable across different host applications, operating systems, devices, and deployment environments. The core must not assume the consumer has a camera, microphone, screen, Android runtime, or particular OS feature. Host-dependent capabilities belong behind optional adapters.

Use the extracted package as the substantive technical reference. Record exact source paths, observed behavior, request and payload formats, dependencies, platform requirements, and test evidence as analysis proceeds.

## Private Library archive

The extracted payload archive is stored in the owner's personal Library at **`/ChatJS-Archives/ChatJS-Android.zip`**. Project Sources are intentionally kept empty and are not an archive destination. Do not request another upload merely to repeat extraction or inventory work.

Do not put the official APK, extracted third-party payload, bundled assets/code, credentials, tokens, or account/session material into the public GitHub repository. Preserve useful independent research and the ChatJS implementation in Git.

See [ChatGPT Client Capability Inventory](CHATGPT_CAPABILITY_INVENTORY.md), [Capability Matrix](CAPABILITY_MATRIX.md), and [Windows Desktop Reference](REFERENCE_DESKTOP.md).
