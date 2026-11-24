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
