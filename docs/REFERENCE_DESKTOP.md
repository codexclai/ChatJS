# ChatGPT Desktop Reference — Windows Client Package and Extracted Payload Status

**User-supplied source:** https://persistent.oaistatic.com/codex-app-prod/ChatGPT-x64.msix  
**Package inspection:** 2026-11-18  
**Current archive status:** Windows work deliberately deferred at the owner's request on 2026-11-20.

## Package metadata and observations previously recorded

The supplied x64 MSIX returned HTTP 200 and the earlier inspection recorded a downloaded size of 1,057,802,768 bytes, Last-Modified 2026-11-14, and content type `application/vnd.ms-appx`.

Appx manifest:
- Display name: **ChatGPT**
- Publisher display name: **OpenAI**
- Package identity: **OpenAI.Codex**
- Architecture: **x64**
- Appx version recorded at inspection: **26.1111.2228.0**
- Target family: **Windows.Desktop**

Embedded `app/resources/app.asar` metadata separately identified the Electron/Codex application package. AppxSignature.p7x and AppxBlockMap.xml were present; signature verification was not recorded.

The package structure previously showed Electron/Chromium, ChatGPT and separate Codex executables, a bundled Node runtime, command runner/code-mode host, Windows sandbox service/setup, PTY/ConPTY, browser/native-host, computer-use, plugin/skill, shell integration, file associations, and screen-capture capability declarations. These are client-package observations, not proof every feature is active for every account or already available in ChatJS.

## The intended Windows reference archive

The owner's requirement is to preserve the useful extracted desktop application contents—not merely retain the original MSIX, rename MSIX bytes to `.zip`, or create a file-name index. When resumed, the archive should capture the actual application payload needed for engineering analysis, including the ASAR application bundle and its contents, shipped JavaScript, executables, DLLs/native libraries, Node modules/dependencies, plugins/skills, resources, manifests, notices, and related metadata.

The purpose is to study the desktop client's actual local and service-connected behavior and reproduce applicable client-side systems in ChatJS. The server-side ChatGPT implementation is not part of the target.

## Last recorded remote extraction — prior conversation, not reverified here

The supplied `Chat-1.json` conversation records a previous assistant report that a remote extracted Windows ZIP had:
- approximately 1.1 GB compressed size;
- 3,758 entries;
- the ASAR application bundle, executables, libraries, resources, dependencies, and other extracted payload;
- a reported successful remote integrity check;
- SHA-256 reported as `3961a94aa6229564ba0eac5fd4fc22f1e40b4568b00b85c333bb0bbe1d510507`.

The same handoff explicitly said transfer into the personal Library was incomplete. These are prior-chat recorded results, not independently reverified in this session. Do not claim this archive is currently retained in Library.

## Current Library file verified 2026-11-20

The personal Library item `/ChatJS-Archives/ChatJS-Windows.zip` was re-materialized in this session and has:
- size: 418,238 bytes;
- seven ZIP entries;
- contents: README, third-party notices, AppxManifest.xml, ASAR file index, dependency catalog, manifest summary, and MSIX file index;
- 3,847,303 uncompressed bytes across those seven entries;
- ZIP CRC test: no corrupt member.

This is a metadata/reference ZIP, **not** the reported 1.1 GB extracted application payload archive. The distinction must be preserved.

## Owner instruction — pause Windows work

The owner explicitly asked in the 2026-11-20 chat to finish the other project corrections first and set the Windows archive work aside. Do not resume download, extraction, archive transfer, or Library replacement unless the owner asks.

## Public repository boundary

Keep original application packages and extracted third-party application payload archives in the owner's private Library, not public Git. Commit independently authored findings, technical analysis, and ChatJS implementation. Preserve provenance and license notices. Do not publish account credentials, cookies, tokens, or user session data.
