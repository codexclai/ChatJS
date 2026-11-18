# ChatGPT Desktop Reference — Windows MSIX Package Inventory

**Inspection date:** 2026-11-18  
**User-supplied URL:** https://persistent.oaistatic.com/codex-app-prod/ChatGPT-x64.msix  
**Method:** downloaded to temporary browser storage; inspected HTTP metadata, ZIP/MSIX listing, AppxManifest.xml, and Electron ASAR directory metadata. The package was **not installed or executed**.

## Package metadata

The URL returned HTTP 200; downloaded size was **1,057,802,768 bytes** (about 1.06 GB). Response Last-Modified: 2026-11-14; content type: application/vnd.ms-appx.

Appx manifest:
- Display name: **ChatGPT**
- Publisher display name: **OpenAI**
- Package identity: **OpenAI.Codex**
- Architecture: **x64**
- Appx version: **26.1111.2228.0**
- Target family: **Windows.Desktop**
- Minimum Windows version: **10.0.19041.0**
- Maximum tested Windows version: **10.0.26100.0**

Embedded app/resources/app.asar metadata separately identifies package openai-codex-electron, product name Codex, metadata version 26.1111.21308. These independent fields are not a ChatJS version or proof this was the globally latest app build.

AppxSignature.p7x and AppxBlockMap.xml were present. Signature verification was not performed.

## Desktop application structure observed

The package has an Electron/Chromium structure:
- ChatGPT.exe is the declared Windows full-trust app entry point.
- A separate Codex.exe is present.
- Chromium runtime files, resources/app.asar, and webview UI resources are packaged.
- ASAR top-level entries: .vite, native-menu-locales, node_modules, package.json, webview.
- A bundled Node.js runtime is present under resources/cua_node.
- Dedicated Codex and computer-use executables/support are present.

These are package observations, not proof of every feature or permission behavior.

## Codex, terminal, sandbox and developer tools

Relevant package paths/names:
- resources/codex.exe and resources/codex — Codex runtime components.
- resources/codex-command-runner.exe — command runner.
- resources/codex-code-mode-host.exe and companion path — code-mode host.
- resources/codex-windows-sandbox-service.exe and resources/codex-windows-sandbox-setup.exe — Windows sandbox service/setup.
- resources/cua_node/bin/node.exe and node_repl.exe — bundled Node runtime and REPL.
- node-pty components including ConPTY/PTY bindings — terminal support.
- better-sqlite3 native binding — local database dependency.
- resources/rg.exe and resources/rg — ripgrep executables.
- resources/tectonic/tectonic.exe — document/typesetting tool.

The manifest declares a packaged service named CodexSandboxService.OpenAI.Codex running as LocalSystem and a separate command-runner app. This is evidence the official Windows app uses dedicated sandbox/process infrastructure. It is **not** a recommendation for ChatJS to create a LocalSystem service. ChatJS must prefer least privilege, explicit user approval, and confined workspaces.

**Independent ChatJS implications:** local workspace/file APIs; explicit task/process lifecycle; executable+argv process invocation; approval/deadline/output limits; terminal support only with justified licensed platform-compatible dependencies; read-only Git inspection/diffs; reviewed writes; deterministic artifacts. Do not claim the local implementation is official Codex.

## Windows shell and file integration observed

Manifest entries include:
- Explorer context-menu verb OpenProjectInCodex on directories.
- codex: URI protocol handler.
- chatgpt-desktop.exe execution alias.
- .skill file association.
- .csv, .docx, .pptx, .tsv, .xls, .xlsm, .xlsx file associations.
- Separate Chrome native-host application entry.
- Disabled-by-default ChatGPT startup task.
- Programmatic graphics-capture capability declarations.

These indicate shell, file, browser-extension/native-messaging, and capture integrations in the official app. A ChatJS adapter must be independent, opt-in, least-privilege and tested. Do not reuse private protocols or register the same identifiers.

## Browser, computer-use, plugins and skills

Package resource directories include:
- bundled plugin and plugin-signature trees;
- skill resources;
- browser plugin and Chrome native-host resources;
- computer-use and unified-computer-use plugins;
- Codex app tools;
- deep-research, LaTeX and visualization plugin packages;
- browser/desktop-control support within the bundled Node runtime.

The package contains hundreds of plugin/resource entries and thousands of bundled runtime entries. Only package paths/directory names were inspected. Plugin source, signature payloads, bundled docs, implementation code and assets were not extracted or copied.

Possible independent Node.js capabilities, subject to real implementation/security review: browser adapter with explicit browser selection; computer-use adapter with scoped approvals/visible actions; local skill/plugin manifest with validation and declared permissions; deterministic visualization/artifact generation. Research/agent reasoning needs a selected non-OpenAI inference/retrieval engine. Do not copy the official browser extension, host, plugins, private APIs or protocols.

## Privilege boundaries and limitations

The Appx manifest declares full-trust execution, unvirtualized resources, packaged/local-system services, internet client access and programmatic graphics-capture capabilities. Startup task is disabled by default. These are official package permissions and do not transfer to ChatJS. Do not request admin/LocalSystem, capture screens, register global protocols, install browser extensions or start background services without a distinct feature design and explicit user approval.

This was static inspection only: the Windows app was not installed, launched, signed into, or interacted with. Appx signature presence was observed but not cryptographically verified. No app code, executable, DLL, asset, plugin bundle, native library, private doc, token, cookie or service was extracted, executed or copied. No private backend was contacted.

## Retention and future chats

The owner intends to clear ChatGPT Project → Sources after this review. This independently authored inventory preserves the useful permitted package findings and implications. The original 1.06 GB installer is not retained in the repository.

Future sessions must use this file and the capability inventory; do not ask the owner for the MSIX merely to repeat inspection. The supplied URL is retained above for an explicitly requested comparison/reinspection. Do not claim Sources are empty until the owner confirms deletion.

The public ChatJS repository retains product observations and independent requirements, **not** official application binaries, proprietary implementation code, private plugin bundles or app assets.
