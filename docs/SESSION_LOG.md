# ChatJS Session History

Append dated entries for meaningful work. Preserve chronology and actual results.

## 2026-11-20 — Full project context recovery and correction of ChatJS product direction

### Conversation sources reviewed

- Inspected the supplied `Chat.json` (2,144,008 bytes) and `Chat-1.json` (314,068 bytes), including all user messages and the preceding handoff.
- The earlier user direction says to extract and preserve all useful application payload contents from the Android APK and Windows MSIX, not merely retain the installer files or a metadata-only index.
- The owner explicitly clarified that the code and client-side request/connection behavior shipped in those application packages are the implementation source for ChatJS. Reproducing those client behaviors does not require recreating ChatGPT's server.
- The owner specified one comprehensive, general-purpose Node.js module, not separate device-specific apps and not a feature-name imitation.
- The owner requested the ChatGPT Project Instructions field be concise assistant operating instructions, separate from repository-specific engineering documentation.
- The owner confirmed Project Sources will intentionally remain empty.
- The owner asked to set Windows archive work aside while the remaining project corrections are completed.

### Android archive verification

- Re-materialized `/ChatJS-Archives/ChatJS-Android.zip` from personal Library: 59,454,036 bytes.
- ZIP contains 4,989 entries: all 4,987 extracted APK payload entries plus README and structured inventory.
- The embedded inventory records 106,501,945 uncompressed payload bytes, ten DEX files, and 121 compiled Valdi modules.
- ZIP CRC test returned no corrupt member.
- Confirmed this is the full extracted APK payload tree, not a metadata-only dossier. Source-level DEX/Valdi decompilation and request/behavior tracing remain incomplete.

### Windows archive status — deferred

- The current Library `ChatJS-Windows.zip` is a 418,238-byte, seven-entry metadata/index/manifest/notice ZIP; it is not the extracted desktop payload.
- The previous Chat-1 conversation records a remote extracted ZIP of about 1.1 GB and 3,758 entries with a reported successful remote integrity check and SHA-256 `3961a94aa6229564ba0eac5fd4fc22f1e40b4568b00b85c333bb0bbe1d510507`. Transfer into Library was incomplete. That remote archive was not reverified in this session.
- The owner explicitly asked to pause Windows archive work. No download/extraction/transfer was attempted in this session.

### Corrected product direction and repository changes

- ChatJS is one general-purpose Node.js module targeting the actual client-side systems/workflows of official ChatGPT mobile and desktop Work/Codex.
- Actual client-side request/response construction, payload schemas, transport, connection/auth/session behavior, and shipped application modules are in-scope technical material. A client interface must not be dismissed solely because public developer docs do not describe it.
- ChatJS is not a server-side ChatGPT clone. Server code not shipped in the app packages is not needed to adapt the client.
- The product must remain usable across different hosts and applications. Camera, microphone, screen, and OS integrations are optional capabilities, not assumptions required by the core.
- The runtime remains foundation-only; no actual ChatGPT service connection or major product workflow is implemented yet.
- The Project Instructions file now contains assistant operating instructions rather than a copy of the repository handbook.
- Updated public README/API manual, package description, project memory, decisions, architecture, workflow, inventories, references, TODO, roadmaps, repository settings, and state records to align with the owner's clarified direction.

### Integration/authorization note

The current project direction uses the real ChatGPT client behavior found in the supplied packages, not OpenAI Platform API/key substitution. Implement authentication and connection behavior as the official client does, while preserving legitimate user authorization and protecting credentials. Never claim successful integration before end-to-end tests.

### Remaining owner action and verification

- Recommended GitHub About description: `General-purpose Node.js module unifying official ChatGPT mobile and desktop client workflows.` The available GitHub repository tools do not expose a repository-metadata update action; this value is recorded for the owner to paste into the About description field.
- Exact changed paths, local check results, archive build/inspection, new CI/CodeQL outcomes, and commit SHA must be recorded after the commit and verification are complete.
