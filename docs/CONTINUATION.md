# ChatJS Continuation Guide

Every ChatJS conversation continues the same repository and shared project memory.

## Start

1. Read `AI_MEMORY.md`.
2. Inspect live `main`, complete branch list, tree, recent commits, issues/PRs, CI, and TODO.
3. Read state, session history, decisions, knowledge, experiments, and open questions.
4. Read capability matrix/inventory, Android protocol findings, Android/desktop reference records, roadmap, architecture, and workflow.
5. Read root `ChatJS.md` before public API changes.
6. Resume the highest-priority actionable work; do not return only a plan.

## Product direction

ChatJS is one comprehensive, general-purpose Node.js module bringing together the real client-side systems and workflows of official ChatGPT mobile and desktop (Work/Codex). It is not a device-specific app, a feature-name imitation, a replacement model provider, or a recreation of ChatGPT's server.

Use the actual shipped client code and package contents as the primary technical basis, including request/response construction, schemas, transport, connection/auth/session flows, local persistence, modules, tools, and resources. Do not prohibit a client interface merely because public developer documentation does not describe it. The server-side code that is not shipped in the clients is not needed to reproduce the client behavior.

The Node.js package must be usable by different hosts and applications. Do not assume a particular device, operating system, camera, microphone, screen, browser, or deployment model. Such capabilities are optional integrations when the consuming environment supports them.

Current implementation remains foundation-only. First-pass Android client findings are in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`; they are not full source reconstruction or a working Node.js integration. Never present intended scope or research as implemented behavior.

## Reference packages and browser profile

Use ChatJS Project → Sources as the normal and primary location for supplied ChatGPT packages. The personal Library is outside the normal workflow; do not depend on it or treat it as a primary or routine source. Access it only for a concrete task when particular material is genuinely useful, necessary, and actually accessible. Any material used there must be under a folder named **ChatJS Project**, containing only authentic, necessary sources or useful original findings.

- Android: `ChatGPT-Android.xapk`, 123,574,190 bytes; an app bundle containing the base APK and required splits, not a standalone APK. ZIP integrity and published-hash match were verified.
- Windows: `ChatGPT-Windows.msix.part001` (400,000,000 bytes) and `ChatGPT-Windows.msix.part002` (396,523,063 bytes). Sequential pieces of one installer; neither is independently installable. Reassembly matched the original byte-for-byte, SHA-256 `561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`.

### Latest Android source findings — 2026-11-24

The currently supplied Android XAPK is ChatGPT 1.2026.321 (version code 2632129); its base APK has ten DEX files and 111 Valdi modules. The XAPK SHA and ZIP CRC were verified. The native code scan found a 256-byte random nonce, UUID.randomUUID install identity, genuine Google Play Integrity, cookie exchange and bot_token X-Sentinel-Payload header. The inspected native path requires package com.openai.chatgpt.internal, while the supplied XAPK is com.openai.chatgpt, so public-build availability is unproven. Continue from docs/ANDROID_CLIENT_PROTOCOL_FINDINGS.md. Separate host facts, install identity and genuine first-party attestation; do not invent the latter. No runtime integration is implemented.

## Persistent ChatJS browser profile

The persistent browser profile named **ChatJS** is the sole default reusable profile for all ChatJS browser work. It already has the owner's Google and ChatGPT sessions authenticated. Always use it for browser-based ChatJS tasks.

Use a separate browser session only when genuinely required for temporary or disposable work. Keep it temporary; never save it as another reusable profile or replace ChatJS with it.

Never sign out of Google or ChatGPT in the ChatJS profile. Never clear its cookies, site data, local storage, or saved sessions; never reset, delete, replace, or recreate it. Avoid actions that could invalidate either login. Preserve the authenticated session and save profile changes. Do not expose credentials, cookies, tokens, or private account/session data. Normal permissions, entitlements, and first-party security checks still apply.

## Operating rules

- Work only on existing `main`. Never create, delete, rename, switch, or publish branches/worktrees. Never force-push. Never configure branch protection, rulesets, or topics.
- No telemetry, tracking, hidden collection, background reporting, phone-home, remote diagnostics, or unsolicited content upload.
- Do not hardcode, log, or commit credentials or user session material. Preserve legitimate user authentication and authorization; do not bypass access controls or entitlements.
- No fake runtime behavior, canned output, bloat, unrelated features, or unjustified dependencies.
- Keep ESM/CommonJS parity and accurate TypeScript declarations.
- Exclude health, finance, maps, navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions.

## Documentation and finish

Record meaningful requirements, decisions, sources/dates, actions, changed files, tests, failures, limits, blockers, and handoffs in canonical docs. Correct affected references and preserve chronology. Update `project-state.json` and regenerate `PROJECT_STATE.md`; update TODO and the chronological session log.

Run `npm run check`, build/inspect the module archive, verify CI where possible, inspect the final tree and branch list, and commit directly to the existing `main` branch using a non-force fast-forward update. Record actual results; never claim unverified work.
