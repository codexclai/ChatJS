# Development Workflow

## Start

1. Read `AI_MEMORY.md` and `CONTINUATION.md`.
2. Inspect live `main`, complete branch list, latest commit/tree, issues/PRs, CI, and TODO.
3. Use `REFERENCE_APK.md` and `REFERENCE_DESKTOP.md`. Android full extracted payload is in personal Library at `/ChatJS-Archives/ChatJS-Android.zip`. Project Sources are intentionally empty. Windows archive work is deferred; do not resume unless the owner asks.
4. Work only on `main`. Never create/delete/rename/switch branches or worktrees. Do not configure/propose branch protection, rulesets, or repository topics.
5. Resume the highest-priority actionable work; do not return a generic plan.

## Product definition

ChatJS is one comprehensive, general-purpose Node.js module adapting the actual client-side systems and workflows of official ChatGPT mobile and desktop (Work/Codex). It is not a feature-name imitation, different model provider, device-specific app, or recreation of ChatGPT's server.

## Reference research

- Use the supplied package contents as substantive technical evidence: client code, compiled modules, request/response construction, payload schemas, transport, connection/auth/session behavior, persistence, tools, dependencies, and resources.
- Do not reject a client interface because public developer docs do not describe it. Inspect the actual code and record direct evidence.
- Distinguish complete extraction, source-level decompilation, behavioral tracing, and a tested Node.js implementation.
- The Android payload is fully extracted and retained in private Library. Source-level DEX/Valdi analysis and request-flow tracing remain to do.
- Windows archive work is deferred. The existing Library ZIP is metadata-only; a larger remote archive was reported by a previous chat but its current status was not reverified.
- Record source paths, dates, scope, evidence class, and limitations.

## Integration, privacy, and security

- Target the real ChatGPT client/service behavior in the supplied package; do not substitute OpenAI Platform APIs/keys or another model provider.
- Preserve legitimate user authentication, authorization, entitlements, and access controls. Do not bypass them.
- Never hardcode, log, publish, or commit credentials/session material.
- No telemetry, hidden collection, phone-home, background reporting, remote diagnostics, or unsolicited network traffic.
- Network activity must result from an explicit ChatJS operation. No automatic content upload.
- Host-specific device/desktop integrations are optional; the core must not assume a particular host or hardware.

## Implementation

- Every change must directly serve ChatJS.
- Use the smallest justified dependency set.
- No fake, canned, mock, placeholder, or no-op runtime features.
- Filesystem/process operations need explicit caller scope, validation, limits, cancellation, approvals where appropriate, and cleanup.
- Command execution uses executable/argv separately, no shell by default, and a policy gate.
- Keep ESM/CommonJS parity and accurate declarations.

## Verification

Run `npm run check`: syntax, generated-state sync, local Markdown links, Node tests, and `ChatJS.tar.gz` contents/integrity. CI also extracts the archive and smoke-tests CommonJS/ESM loading. Add success/failure/cancellation/concurrency/security tests as relevant; state tests not run.

## Documentation and finish

Update root `ChatJS.md` for actual APIs; update capability matrix/inventory, architecture/decisions, TODO/roadmap, state JSON/generated Markdown, knowledge/experiments/open questions as relevant; append SESSION_LOG.

Commit focused changes directly to `main`. Never force-push or create/delete/rename/switch branches/worktrees. Do not commit generated `dist` archive or extracted third-party reference payloads. Record actual files, behavior, gaps, tests, commit, blockers, and next task.
