# ChatJS Roadmap

This roadmap describes intended work, not current support. A capability is supported only when implementation, documentation, tests, and evidence exist.

## Mobile-first feature foundation

**Goal:** implement useful ChatGPT mobile-inspired capabilities as independent Node.js behavior, without ChatGPT account/backend access.

- Local conversation/project containers and explicit context.
- User-controlled local instructions and optional memory.
- File/image ingestion and safe local processing.
- Search/research adapters invoked only on explicit calls.
- Voice/multimodal support only after a real non-OpenAI inference engine and platform adapters are selected.

## Desktop Work and Codex foundation

**Goal:** implement local equivalents of useful Work/Codex workflows.

- Confined workspaces and bounded file operations.
- Explicit task lifecycle, progress, cancellation, approvals.
- Safe command and test execution.
- Git inspection/diff/review without branch/worktree creation.
- Local artifact generation with tested format support.
- Optional browser/desktop-control adapters with explicit permissions.
- ChatJS-owned remote-host access only after a concrete need and security design.

## Inference boundary

No OpenAI Platform API, API key, Sign in with ChatGPT OAuth, or private ChatGPT backend integration is permitted. No non-OpenAI inference engine has been selected. Do not implement fake generated answers or autonomous agents. Continue with useful deterministic local features until an acceptable model runtime is selected.

## Production readiness

Focus on measured performance, memory, concurrency, reliability, supported Node.js hosts, security boundaries, dependency governance, API documentation and reproducible checks.

## Compatibility maintenance

Track reference product behavior using official product docs and lawful observations. Update the inventory when features change. Never infer Node.js capability from a mobile permission or APK resource.
