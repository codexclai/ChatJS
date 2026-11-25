# ChatJS Roadmap

This roadmap describes intended work, not current support. The accepted completeness, portability, customization and production-quality target is defined in [PRODUCT_STANDARD.md](PRODUCT_STANDARD.md). A capability is supported only when implementation, documentation, tests, compatibility evidence, and applicable end-to-end verification exist.

## 1. Complete the real client implementation research

- Audit the extracted Android DEX and Valdi modules to identify client application layers and request/payload construction.
- Trace the actual ChatGPT connection, transport, streaming, authentication/session, and refresh behavior in the supplied client code.
- Map conversation, context, project, instructions, memory, file, image, voice, search, tool, Work, and desktop flows.
- Record source locations, schemas, dependencies, host requirements, and exact verified behavior.
- Keep server-side systems not shipped in the client package outside the reconstruction scope.

Windows desktop archive work is paused at the owner's request. Resume it only when explicitly asked.

## 2. Build the ChatGPT client integration for Node.js

Use the verified client behavior as the source of truth. Implement the real request/response, connection, authentication/session, streaming, error, and data-model behavior in Node.js. Do not substitute OpenAI Platform APIs/keys, a different model provider, or fake outputs.

Define secure credential/session handling, cancellation, timeouts, backpressure, concurrency, retries, redaction, and cleanup. Preserve the legitimate user authentication/authorization flow.

## 3. Build portable package APIs

- Conversation/thread/context and project models.
- Instructions, profiles, and explicit persistence/memory.
- File/attachment ingestion and processing.
- Streaming and asynchronous task primitives.
- Work/Codex workspace, file, process, Git, review, approval, and artifact workflows.
- Optional host adapters for facilities not universally available in Node.js.

## 4. General-purpose host behavior

Keep the package reusable across applications, Node.js environments, OSes, and deployment styles. Camera, microphone, screen, browser, and desktop interaction must remain optional integrations rather than assumed core hardware.

## 5. Product configuration and dynamic capability model

- Define validated configuration layers and explicit override precedence, without security or authorization bypasses.
- Add runtime capability discovery backed by genuine providers and explicit support states.
- Define narrow optional host adapters and a tested Node.js/OS compatibility matrix.
- Maintain client/protocol compatibility evidence and update only from verified source changes and contract tests.
- Keep protocol discovery, update checks and diagnostics free of hidden background network traffic.

## 6. Production readiness

Focus on correctness, tests, measurable performance, memory/concurrency limits, reliable cancellation/cleanup, Node.js host compatibility, security, dependency governance, accurate API docs, and reproducible checks.

No fake features or version/release automation. Use PRODUCT_STANDARD.md as the feature acceptance gate; the target is maximum practical verified quality, not a promise of universal availability or indefinite compatibility.

## 8. Implement the unified ChatGPT mobile + desktop + Codex CLI client

ChatJS is one Node.js package consolidating three actual client/source families. Treat Codex CLI workflows as in-scope product capabilities rather than a source-only/non-goal, but implement them directly in Node.js without requiring the separate Codex executable or app-server. Keep ChatGPT Android cloud Work, ChatGPT Windows local Work, and Codex CLI coding-client semantics distinct behind the same package API. Reconstruct each source protocol and client capability independently, then expose a consistent lifecycle, configuration, errors, cancellation, events and TypeScript surface. ChatGPT remains the only AI service target.

## 9. Responsive, real-time and sustained-operation quality

The expanded owner quality requirements are normative in PRODUCT_STANDARD.md, section 14. Apply them across all three client families:

- Design I/O workflows around asynchronous execution, explicit cancellation, finite deadlines, bounded concurrency, queue limits and deterministic cleanup.
- Provide true incremental streaming and progress where the official ChatGPT/Codex client protocol exposes them; measure time-to-first-event and apply backpressure.
- Treat long-running/24×7 operation as an optional consumer-owned lifecycle with graceful shutdown, recovery and soak testing. Do not add hidden daemons, auto-start behavior, keepalive polling, telemetry or unsolicited network activity.
- Establish benchmarks and measurable CPU/memory/latency/throughput budgets before claiming performance or lightweight footprint.
- Keep Node.js/platform/client-protocol compatibility evidence current through explicit source review and contract tests when updated official packages or verified releases become available. Do not self-update or execute remote code.
- Make automatic capability discovery local and side-effect-free by default; remote readiness operations require explicit caller intent and real evidence.

## Owner-directed implementation order — 2026-11-25

The product goal remains unchanged: ChatJS ultimately consolidates ChatGPT Android/mobile, ChatGPT Windows/desktop, and Codex CLI. The active implementation order is now explicitly:

1. Complete ChatGPT Android's entire non-Work client experience.
2. Complete Android Work Cloud as a distinct client engine.
3. Complete ChatGPT Windows/Desktop, including its local Work surface.
4. Complete the Codex CLI client capability family natively within ChatJS.

Steps 2–4 remain in the product target; they are parked for the current phase. No domain category is blanket-excluded from feature coverage. Use actual source evidence and legitimate host/service support to determine what can be implemented.
