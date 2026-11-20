# ChatJS Continuation Guide

Every ChatJS conversation continues the same repository and shared project memory.

## Start

1. Read `AI_MEMORY.md`.
2. Inspect live `main`, complete branch list, tree, recent commits, issues/PRs, CI, and TODO.
3. Read state, session history, decisions, knowledge, experiments, and open questions.
4. Read capability matrix/inventory, Android/desktop reference records, roadmap, architecture, and workflow.
5. Read root `ChatJS.md` before public API changes.
6. Resume the highest-priority actionable work; do not return only a plan.

## Product direction

ChatJS is one comprehensive, general-purpose Node.js module bringing together the real client-side systems and workflows of official ChatGPT mobile and desktop (Work/Codex). It is not a device-specific app, a feature-name imitation, a replacement model provider, or a recreation of ChatGPT's server.

Use the actual shipped client code and package contents as the primary technical basis, including request/response construction, schemas, transport, connection/auth/session flows, local persistence, modules, tools, and resources. Do not prohibit a client interface merely because public developer documentation does not describe it. The server-side code that is not shipped in the clients is not needed to reproduce the client behavior.

The Node.js package must be usable by different hosts and applications. Do not assume a particular device, operating system, camera, microphone, screen, browser, or deployment model. Such capabilities are optional integrations when the consuming environment supports them.

Current implementation remains foundation-only. Never present intended scope or research as implemented behavior.

## Reference archives

Project Sources are intentionally kept empty. Use the personal Library archives; do not ask for repeat uploads.

- Android: `/ChatJS-Archives/ChatJS-Android.zip`, 59,454,036 bytes, 4,989 ZIP entries, complete extraction of all 4,987 APK payload entries plus README and structured inventory. Ten DEX files and 121 Valdi modules are recorded. ZIP integrity passed on 2026-11-20.
- Windows: set aside by the owner. The current Library `ChatJS-Windows.zip` is metadata-only (418,238 bytes, seven entries). A preceding chat recorded a 1.1 GB/3,758-entry extracted archive in a remote workspace with transfer to Library incomplete; that remote archive was not reverified in this session. Do not resume Windows work unless asked.

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
