# ChatJS Capability Matrix

**Current implementation status: foundation only.** Intended scope is inspired by ChatGPT mobile first and desktop Work/Codex. Research is not implementation. See [ChatGPT App Capability Inventory](CHATGPT_CAPABILITY_INVENTORY.md).

## Status definitions
- **Implemented:** working code, documentation, repeatable tests.
- **Partial:** a defined subset exists; gaps are explicit.
- **Research:** product behavior or platform mechanism is being assessed.
- **Planned:** desired scope known; implementation has not started.
- **Blocked:** required engine, permission, platform or supported integration unavailable.
- **Out of scope:** explicitly excluded.

## Local Work/Codex foundations

| Capability | Status | Evidence / acceptance boundary |
| --- | --- | --- |
| Client lifecycle | Partial | Construction, status, close only |
| Local workspace roots | Planned | Caller-selected directory; canonical root/path confinement |
| File listing/reading | Planned | Bounded size/count, symlink policy, cancellation, typed errors |
| Safe writes/diffs | Planned | Atomic writes, conflicts, symlink/race threat model, approval |
| Local project context/instructions | Planned | Local configuration, explicit persistence |
| Local memory store | Planned | Caller-owned location, retention/read/write/delete; not ChatGPT memory |
| Task lifecycle/progress | Planned | Real state/events, pause/cancel, cleanup |
| Command/process runner | Planned | No shell by default, argv separation, executable policy, timeout/cancel/output limits |
| Git status/diff/review | Planned | Read-only first; no branches/worktrees |
| Artifact generation | Planned | Real formats, integrity tests, justified dependencies |
| Scheduled tasks | Planned | Explicit scheduler while host is running or user-configured service |
| Approval gates | Planned | Explicit approval for writes, commands, desktop actions, external effects |

## Mobile reference areas

| Product area | Status | Boundary |
| --- | --- | --- |
| Chat/conversation containers | Planned | Local state; generated replies require an inference engine |
| Streaming responses | Blocked on inference engine | No canned or simulated stream |
| Custom instructions/profiles | Planned | Local profiles, not ChatGPT settings |
| Saved memory | Planned | Explicit local store, not consumer memory |
| Projects | Planned | Local workspaces/context, no ChatGPT sync |
| File/image/video attachments | Planned | Local ingestion; model understanding requires inference |
| Voice conversation | Blocked on speech/inference engine | Real engine and microphone permission required |
| Live video/screen share | Research/platform adapter | Not portable Node.js core |
| Search/research | Planned/adapter-based | Explicit retrieval/browser source; not ChatGPT Search |
| Image generation/editing | Blocked on inference engine | No fake outputs |
| Work tasks | Planned | Local orchestration, no cloud Work connection |
| Mobile Remote Codex | Out of scope as ChatGPT integration | Could later build a distinct ChatJS remote-host adapter |

## Desktop Work reference areas

| Capability | Status | Boundary |
| --- | --- | --- |
| Long-running tasks/progress | Planned | Local task engine, no cloud Work connection |
| Local files/folders | Planned | Explicit workspace and bounded operations |
| Desktop app interaction | Research/platform adapter | Permission-gated OS-specific adapter |
| Browser research | Research/adapter | User-configured browser/search, no implicit network |
| Connected apps | Research/adapters | Explicit configuration, scoped consent, approvals |
| Documents/spreadsheets/presentations/reports/sites | Planned | Genuine local artifact generation and tested formats |
| Scheduled/repeating tasks | Planned | Explicit scheduler; no hidden process/reporting |
| Voice task coordination | Blocked on speech/inference engine | No selected engine |

## Desktop Codex reference areas

| Capability | Status | Boundary |
| --- | --- | --- |
| Local folders/repositories | Planned | Confined workspace |
| Terminal/developer tools | Planned | Safe process runner and approvals |
| Test execution | Planned | Bounded process/output/time |
| Diff/review/apply changes | Planned | Human review and approval |
| Multiple agent orchestration | Blocked on inference engine | No simulated agents |
| Computer use | Research/platform adapter | Narrow OS permissions and approvals |
| Remote control | Planned/separate design | ChatJS-owned protocol only |
| Codex Cloud | Out of scope | ChatGPT-hosted environment |
| Git worktrees/branch parallelism | Out of scope | Conflicts with main-only policy |

## Explicitly out of scope

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features.

## Permanent product boundaries

- No OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth/token sharing, private ChatGPT backends, or reuse of app credentials/cookies/session tokens.
- No access claims for ChatGPT consumer chats, memory, Projects, custom GPTs, Work, Codex, Remote sessions, or Codex Cloud.
- No fake generated output; no non-OpenAI inference engine is selected.
- Node.js core only; native access requires justified optional adapters and explicit permissions.
- Never create/delete/rename/switch branches or worktrees.

## Promotion rules

Mark Implemented only after real code, success/failure tests, cancellation/concurrency/security coverage where relevant, ESM/CommonJS parity, accurate declarations, user docs and evidenced limitations.
