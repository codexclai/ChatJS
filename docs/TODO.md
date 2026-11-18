# ChatJS Task List

Use this as the single authoritative queue. Mark tasks complete only when evidence supports completion.

## P0 — Ownership and governance
- [ ] Confirm rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting external contributors.
- [ ] Verify private vulnerability reporting, secret scanning and push-protection availability.

## P1 — Product scope and references
- [x] Locate and statically inspect the supplied Android package without redistributing it.
- [x] Record mobile manifest/resource observations and inspection limits.
- [x] Review current ChatGPT mobile, desktop Work and Codex product references.
- [x] Download and statically inspect the supplied Windows x64 MSIX manifest and package structure without installing or executing it.
- [x] Record Windows Codex, command runner, sandbox, terminal, browser/native-host, computer-use, plugin/skill, shell and file-integration observations.
- [x] Separate ChatGPT product-reference features from Node.js implementations and account-only services.
- [x] Exclude health, finance, maps, shopping, wallet, contacts, calendar, telephony and unrelated Android permissions/features.
- [x] Permanently exclude OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, private backends and app session access.
- [x] Document that the owner intends to clear Project Sources and that committed inventories are the durable reference.
- [ ] Validate a specific mobile/desktop UI interaction only if the owner later asks for a concrete behavior comparison.

## P1 — Local Work/Codex runtime design
- [ ] Define the local workspace contract: root selection, path confinement, symlink/junction behavior, file size/count limits, cancellation, atomic writes and concurrent-mutation threat model.
- [ ] Define read/write/search/diff operations and concurrent filesystem mutation handling.
- [ ] Define command execution: explicit executable/argv, no shell by default, approval policy, cwd confinement, timeout, cancellation, output limits and process cleanup.
- [ ] Define task lifecycle/progress: queued, running, waiting for approval, completed, failed, cancelled.
- [ ] Define local project instructions and optional memory storage/deletion.
- [ ] Define the inference boundary; no model-powered features until a real non-OpenAI engine is selected.
- [ ] Add TypeScript declaration tests.

## P2 — Complete feature slices
- [ ] Implement a confined local workspace with bounded file operations as the first Work/Codex vertical slice.
- [ ] Implement safe command execution and test-running as a separately reviewed slice.
- [ ] Implement explicit task orchestration, progress, cancellation and approval gates.
- [ ] Add local project context and opt-in memory.
- [ ] Add tested document/spreadsheet/presentation writers only where justified.
- [ ] Add optional browser, desktop, microphone, camera or screen adapters only after platform permission design.
- [ ] Add a ChatJS-owned remote-host protocol only if needed; never reuse ChatGPT Remote credentials/protocol.
- [ ] Keep ChatJS.md synchronized with public API changes.
- [ ] Keep ChatJS.tar.gz limited to the distributable module.
- [ ] Add regressions proving no telemetry, hidden collection or unsolicited network traffic ships.

## P3 — Production readiness
- [ ] Review dependency necessity, security and licensing whenever dependencies are introduced.
- [ ] Add API reference generation only where useful.
- [ ] Add performance, memory and concurrency benchmarks with measurable budgets.
- [ ] Define supported Node.js hosts from actual implementation requirements.
- [ ] Document maintenance and security-response practices.

## Current position

ChatJS remains a Node.js foundation with no product feature implementation. Its reference scope is mobile-first ChatGPT functionality plus applicable desktop Work and Codex. No OpenAI Platform API, API key, OAuth/token-sharing flow, private ChatGPT backend, or app session integration is in scope. Health/finance/maps/shopping and unrelated Android permissions are excluded. Permitted Android and Windows package findings are committed in REFERENCE_APK.md and REFERENCE_DESKTOP.md; original binaries are not retained in Git. The owner intends to clear Project Sources after this inventory is committed. The next engineering slice is a genuine local workspace for Work/Codex workflows; model-powered behavior remains unimplemented until a non-OpenAI inference engine is selected.

Never create branches or worktrees. Keep all work on main.
