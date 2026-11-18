# ChatJS Experiments

Chronological record of meaningful technical experiments and product research, including successful, failed, inconclusive, and withdrawn directions.

## Record format
For each investigation include question, setup/method, actual result, conclusion, limitations and follow-up. Never include secrets, private user data or copied proprietary app material.

## Repository foundation

### CommonJS and ESM entry points
- Method: built-in Node test runner requires CJS and imports ESM.
- Result: CI passed ESM/default exports and archive extraction/loading for both formats.
- Conclusion: verified for foundation only.
- Next: preserve parity tests as exports expand.

### Generated docs and archive
- Method: generate PROJECT_STATE.md from project-state.json; validate local Markdown links; build USTAR+gzip with Node built-ins; verify exact allowlist/content; extract and smoke-test.
- Initial issue: archive test treated ChatJS/ directory entry as a file. Corrected to skip validated directory entries and compare file content.
- Result: CI built 7 distributable files; archive integrity, extraction, CJS/ESM tests and artifact upload passed.
- Conclusion: verified for foundation package.
- Next: keep checks and allowlist.

## Product-reference research

### Android package
- Method: privately supplied ChatGPT.zip was inspected; confirmed one base.apk; reviewed Android binary manifest and high-level resource/module names.
- Result: package indicators for conversation/streaming, voice/read-aloud, attachments, image/text processing, search/data, code/remote session, memory/settings, instructions and Projects.
- Limit: static inspection only; no emulator/UI or DEX decompilation. Permissions/resources do not prove active UI, entitlement or Node.js access.
- Conclusion: Observed indicators only. Health, finance, maps, shopping, wallet and unrelated permissions are excluded by owner direction.
- Next: use REFERENCE_APK.md; do not request original merely to repeat inspection.

### Windows desktop MSIX
- Source: user-supplied ChatGPT-x64.msix URL.
- Method: downloaded to temporary browser storage; inspected HTTP metadata, MSIX listing, AppxManifest.xml, Electron ASAR header/directory names and package metadata. No app installation or execution.
- Observed: ChatGPT Windows x64 package identity; ChatGPT.exe and separate Codex.exe; Electron/Chromium; bundled Node; command runner/code-mode host; Windows sandbox service/setup; node-pty/ConPTY; browser native host; computer-use executables; plugin/skill resources; Explorer context-menu, codex: protocol, .skill and document/spreadsheet associations, screen-capture declarations.
- Limits: signature presence noted but not verified; no implementation code, binaries, plugins, docs or assets extracted/copied.
- Conclusion: local workspace, task/process, terminal, sandbox, browser/computer-use, skills, shell integration and artifacts deserve independent ChatJS designs. No private protocol or official service integration is authorized.
- Next: use REFERENCE_DESKTOP.md; re-download only for an owner-requested comparison.

### OpenAI service/API route withdrawn
- Initial exploration reviewed Responses API and Sign in with ChatGPT as possible routes.
- Owner explicitly excluded OpenAI Platform APIs, keys, OAuth and private ChatGPT backends.
- No runtime integration or credentials were added. Do not revive this route unless the owner changes the requirement.

### Desktop Work/Codex mapping
- Official product docs describe desktop Chat/Work/Codex, permissioned local files/apps, local folders, repositories, terminals and developer tools; mobile Remote can reach supported desktop Codex sessions.
- ChatJS conclusion: implement local workspace/file/process/task/artifact foundations independently. ChatGPT cloud Work, account data, private Codex/Remote sessions and Codex Cloud are unavailable.
- Next: implement a confined local workspace before adding command execution.


### Private Library archive rename and Windows large-file transfer
- Android: moved Library item to /ChatJS-Archives/ChatJS-Android.zip and deleted old empty folder. Listing confirmed requested name/path and 54,869,202-byte size; re-materialization after move succeeded.
- Windows: previous browser session held the full temporary MSIX, but file export permits at most 25 MiB. A 1 MiB test chunk exported; direct full 1,057,802,768-byte download failed. No complete Library transfer.
- Conclusion: Android backup verified; Windows backup blocked. Keep official URL/findings. Never store a partial chunk under a complete installer name.


### Private Library archive rename and Windows large-file transfer
- Android: moved Library item to /ChatJS-Archives/ChatJS-Android.zip and deleted old empty folder. Listing confirmed requested name/path and 54,869,202-byte size; re-materialization after move succeeded.
- Windows: previous browser session held the full temporary MSIX, but file export permits at most 25 MiB. A 1 MiB test chunk exported; direct full 1,057,802,768-byte download failed. No complete Library transfer.
- Conclusion: Android backup verified; Windows backup blocked. Keep official URL/findings. Never store a partial chunk under a complete installer name.
