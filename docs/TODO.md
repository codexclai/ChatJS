# ChatJS Task List

Use this as the single authoritative queue for remaining work. Keep tasks actionable and mark them complete only when evidence supports completion.

## P0 — Ownership and governance
- [ ] Confirm the rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting external contributors.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.

## P1 — Product scope and evidence
- [x] Locate ChatGPT.zip in ChatJS Project → Sources and inspect available static package metadata without redistributing proprietary material.
- [x] Record high-level Android manifest/resource indicators and limits of static-only inspection.
- [x] Research current ChatGPT mobile, desktop Work, and desktop Codex product surfaces from official documentation.
- [x] Separate product-reference behavior from Node.js capabilities and account-only services.
- [x] Exclude health, finance, maps, shopping, wallet, contacts, telephony, and unrelated Android permissions/features.
- [x] Record the permanent exclusion of OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, and private backend/session access.
- [ ] Validate selected mobile/desktop product surfaces against observable UI behavior when a lawful local reference session is available.

## P1 — Local Work/Codex runtime design
- [ ] Define the local workspace contract: root selection, path confinement, symlink/junction handling, file size/count limits, cancellation, atomic writes, and cleanup.
- [ ] Define read/write/search/diff operations and the threat model for concurrent local filesystem changes.
- [ ] Define the command runner: explicit executable/argv, no shell by default, allowlist/approval policy, cwd confinement, timeouts, cancellation, output limits, and process cleanup.
- [ ] Define task lifecycle/progress events: queued, running, waiting for approval, completed, failed, cancelled.
- [ ] Define local project instructions and optional memory storage/deletion semantics.
- [ ] Define the inference boundary; no model-powered feature until a non-OpenAI engine is selected.
- [ ] Add TypeScript declaration tests.

## P2 — Complete feature slices
- [ ] Implement a confined local workspace with bounded file operations as the first Work/Codex vertical slice.
- [ ] Implement safe command execution and test-running as a separate reviewed slice.
- [ ] Implement explicit task orchestration, progress, cancellation, and approval gates.
- [ ] Add local project context and opt-in memory storage.
- [ ] Add tested document/spreadsheet/presentation writers only where format needs justify dependencies.
- [ ] Add optional browser, desktop, microphone, camera, or screen adapters only after platform-specific permission design.
- [ ] Add a ChatJS-owned remote host protocol only if it has a concrete need; never reuse ChatGPT Remote credentials/protocol.
- [ ] Keep ChatJS.md synchronized with every public API change.
- [ ] Keep ChatJS.tar.gz limited to the distributable module.
- [ ] Add regressions proving the shipped runtime has no telemetry, hidden collection, or unsolicited network requests.

## P3 — Production readiness
- [ ] Review dependency necessity, security, and licensing whenever dependencies are introduced.
- [ ] Add API reference generation and documentation checks only where useful.
- [ ] Add performance, memory, and concurrency benchmarks with measurable budgets.
- [ ] Add supported-platform checks based on actual implementation requirements.
- [ ] Document maintenance and security-response practices.

## Current position

ChatJS remains a Node.js foundation with no product feature implementation. Its reference scope is mobile-first ChatGPT functionality plus applicable desktop Work and Codex experiences. No OpenAI Platform API, API key, OAuth/token-sharing flow, or private ChatGPT backend is in scope. Health/finance/maps/shopping and unrelated Android permissions are excluded. The next engineering slice is a genuine local workspace for Work/Codex workflows; model-powered behavior remains unimplemented until a non-OpenAI inference engine is explicitly selected.

Do not add Git branches or worktrees. Keep all work directly on main.
