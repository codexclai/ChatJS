# ChatJS Architecture

**Status:** initial design guidance. Interfaces remain provisional until requirements, tests, documentation, and evidence make them deliberate.

## Product identity

ChatJS is one comprehensive, general-purpose Node.js module intended to bring together the actual client-side systems and workflows of official ChatGPT mobile and ChatGPT desktop (including Work and Codex). It is not a standalone ChatGPT clone, a device-specific app, or a recreation of ChatGPT's server.

The intended product integrates with real ChatGPT client/service behavior. The official APK/MSIX packages are the implementation references: use their shipped JavaScript/compiled modules, payload schemas, request/response construction, transport, connection/auth/session flows, persistence, tools, and other client components. Do not discard client behavior merely because public developer documentation does not describe it. Server-side implementation that is not shipped in the client is not required to reproduce client behavior.

Current ChatJS runtime remains foundation-only. No planned workflow may be described as implemented until real Node.js code and end-to-end evidence exist.

## Product-quality target

The accepted project-wide requirements for comprehensiveness, one cohesive module, broad portability, customization, runtime capability discovery, reliability, security/privacy, usability, documentation, and production-readiness gates are specified in [PRODUCT_STANDARD.md](PRODUCT_STANDARD.md). Treat that document as a normative target when designing new APIs and implementations. It does not imply that planned functionality is already present.

The design should expose meaningful configuration and provider choice through validated, documented interfaces while preserving immutable security and authorization requirements. Capability discovery must describe real runtime/provider support, not infer it from OS labels or pretend profiles. Protocol adaptation must be based on verified source evidence and tests, never unsolicited network probing or hidden automatic downloads.

## Goals

- Node.js only, with ESM, CommonJS, and accurate TypeScript declarations.
- One modular package for mobile and desktop client workflows.
- Actual ChatGPT client/service behavior rather than Platform API substitution or fabricated model output.
- Portable core APIs usable from different applications, hosts, operating systems, and deployment environments.
- Optional host integrations for camera, microphone, screen, browser, desktop controls, or other environment-specific facilities.
- Standardized async operations, events, cancellation, limits, errors, backpressure, and cleanup.
- Protect local files, account credentials, session state, and user data.
- Zero telemetry, hidden collection, and unsolicited network activity.

## Capability layers

### ChatGPT client integration

A dedicated integration layer should adapt the real client-side behavior found in the supplied application packages to Node.js. The investigation/implementation should cover, where evidenced in the clients:
- request and response construction, payload schemas, serialization, and parsing;
- connection establishment, transport, streaming, retries, and error semantics;
- legitimate account sign-in, authentication, session lifecycle, and token/cookie handling;
- conversation, project, file, voice, image, search, tool, and task flows;
- local/client persistence and relevant state synchronization.

Treat the source packages as primary evidence. Public developer documentation is not the sole criterion for whether a client-side interface exists. The server implementation is not part of the intended scope; the goal is to reproduce the client behavior from the client side.

All network requests must be part of explicit ChatJS operations. Preserve user authorization, account protections, and access controls. Do not hardcode, log, or commit credentials/session material. No fake output or substitute inference model.

#
## Direct ChatGPT transport and session modes

ChatJS owns its Node.js HTTP/WebSocket/SSE transport. It must reproduce the actual shipped client request construction, authentication, headers, challenge flow, streaming and state transitions directly to the first-party ChatGPT service. It must not spawn Codex CLI, require a separately running Codex app-server, embed the Codex app-server runtime, or substitute Platform API/key access. The official Codex repository is source evidence only; see [CODEX_SOURCE_FINDINGS.md](CODEX_SOURCE_FINDINGS.md).

Keep these session modes distinct:

- **Authenticated account session:** first-party sign-in, secure credential handling, bearer/account headers, refresh/revocation and account entitlement checks.
- **Accountless guest session:** a first-party anonymous session with no account identity. Android source evidence includes AnonymousSession and guest-session storage/lifecycle identifiers. The exact guest message route/body is not yet proven; see [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md). Do not fabricate credentials or convert this into a temporary chat belonging to an authenticated account.
- **Temporary Chat while signed in:** a separate account session with history/training retention behavior controlled by the official client/service. Do not conflate it with logged-out guest mode.

Each mode must preserve its server-enforced feature availability, usage limits, conversation limits, data retention and sign-in prompts. An unavailable/blocked guest mode is a typed service result, not a reason to bypass a gate.

## Distinct Work execution surfaces

The owner has clarified that Windows ChatGPT desktop Work performs local execution on the desktop host, while Android ChatGPT Work uses cloud execution. Implement these as separate client/service execution surfaces with shared high-level task abstractions only where actual behavior supports it.

- **Windows Work Local:** local workspace, processes, approvals, host/native integration and artifacts. Keep the core portable and expose OS/native facilities as explicit host capabilities. Do not require Codex CLI or an app-server process.
- **Android Work Cloud:** cloud task/session creation, remote progress/control, artifacts and service-side state, using the genuine authenticated/guest client mode and account entitlements.
- **Codex CLI:** terminal-oriented coding client, not an execution prerequisite for either Work surface. Its pinned source is reference material only.

Do not infer that accountless guest access to ordinary ChatGPT conversations implies accountless Work/Codex access. Verify each surface's actual requirements independently.

## Portable Node.js core

The portable core should provide reusable primitives for:
- clients, conversations, threads, context, and projects;
- explicit local instructions and profiles;
- file/attachment ingestion and local processing;
- async streaming and cancellation;
- task lifecycle, progress, approval state, and cleanup;
- workspace and filesystem operations;
- process/test execution with policy controls;
- Git inspection, diffs, review, and local artifact generation.

### Optional host integrations

Browser automation, desktop interaction, microphone, camera, screen capture, notifications, and similar facilities are not universal properties of Node.js. Expose them as optional integrations only when the consuming host supplies the relevant mechanism. The core must not assume a device, OS, UI, camera, microphone, or permission model.

## Local workspace contract to define

Before implementing file access:
- require an explicit caller-selected root;
- accept relative paths only and prevent traversal;
- define symlink/junction behavior and concurrent-mutation limits;
- bound file size, depth, item count, and concurrent operations;
- distinguish files, directories, special files, and unavailable paths;
- support cancellation and deterministic cleanup;
- make writes explicit, conflict-aware, and atomic where supported;
- never recursively delete by default;
- test traversal, symlink escape, oversized files, permissions, cancellation, concurrent mutation, and module parity.

## Command execution contract to define

Before command execution:
- no shell by default;
- executable and argv are separate validated inputs;
- working directory is confined to an approved workspace;
- environment inheritance and redaction are explicit;
- command policy/approval is required;
- enforce timeout, cancellation, output limits, process-tree cleanup, concurrency caps, and exit semantics;
- no hidden/background execution.

## Storage and privacy

Persistence must be explicit and have clear retention/deletion semantics. Protect account authentication/session data. Do not silently store or transmit prompts, files, credentials, or conversations. No analytics or telemetry. Network activity is allowed only as a genuine part of the explicitly invoked ChatGPT client integration or a separately configured adapter—not as background phone-home behavior.

## Explicit non-goals

- Recreating ChatGPT's server-side infrastructure.
- Substituting OpenAI Platform API/key workflows for the consumer ChatGPT client integration.
- Fake generated output or a different model provider masquerading as ChatGPT.
- Health, finance, maps, shopping, wallet, contacts, calendar, telephony, unrelated Android permissions.
- Git branches/worktrees or automation that creates them.
- Telemetry, hidden collection, unsolicited network requests, or automatic content uploads.

## Host context, client identity, and first-party integrity

These are separate layers and must not be represented by one synthetic device profile.

1. **Host environment context** describes the actual consuming Node.js environment. The portable core may identify runtime/OS/architecture and expose supported capabilities. Further host/device detail is opt-in through a host adapter; collect only what the caller and an observed client protocol require.
2. **Client-install identity** is a protocol-specific identifier, not automatically a hardware identity. Generate, persist, rotate and delete one only when the actual client behavior demonstrates that it is required. Define storage and privacy semantics; do not use hostnames, MAC addresses, serial numbers or broad fingerprints as substitutes without direct protocol evidence.
3. **First-party integrity/attestation** is an operation that obtains a challenge-bound result from the genuine platform/provider mechanism. It is not a bag of device metadata. It must be request/account scoped where the client is, cancellable where the provider supports cancellation, and return authentic headers/body changes or a typed failure. A protocol-mandated random install UUID can be generated and persisted exactly as the client does; it must not be misrepresented as a hardware-backed proof.

The Android 1.2026.321 source shows separate ChatGPTRequirementsIntegrityProvider and ChatGPTDeviceIntegrityProvider interfaces, a response gate on requiresDeviceIntegrity, and a native Android DeviceIntegrity service. Its native contract includes access token, account ID, base URL, conversation ID and parent message ID on the request, and body-patch/header-name/header-value fields on the response. In the inspected native method, the device ID is an app-generated UUID persisted in app-private preferences; this is legitimate client-install identity, not proof of hardware identity. The native helper uses Google Play Standard Integrity: it establishes a verification cookie with a random 256-byte nonce, then requests a second token using the SHA-256 hex digest of a canonical JSON object containing account_id, conversation_id, device_id and parent_message_id. Its endpoint is restricted to first-party HTTPS origins and its cookie has suffix, Secure, expiry, domain and backend-path checks. This code requires the internal package ID com.openai.chatgpt.internal while the supplied XAPK is com.openai.chatgpt, so its presence does not prove public-app availability. Exact generated Valdi schemas and provider selection remain under investigation; see ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

A Node.js process on Windows or Linux must not impersonate the Android package or fabricate a Play Integrity token. Implement only genuine providers supported by the actual host/platform and protocol. When a required provider is unsupported or unavailable, preserve that state and surface the failure/limitation; do not claim integrity success or silently skip a required check. The app_attest_challenge field name is observed in the Valdi validation path, but its precise meaning and relationship to this Android Play Integrity implementation remain unresolved.

Sentinel/chat requirements, Turnstile, proof-of-work, and device attestation should be modeled as related but distinct protocol stages. Reconstruct each from the client before implementing; do not guess algorithms, invent challenge responses, or disable server requirements. Test fixtures may simulate success/failure for deterministic unit tests only and must never ship as production providers.

## Reliability, capability discovery, and protocol drift

The product objective is maximum practical reliability across supported Node.js hosts and changing service/client implementations. It is not technically honest to promise unconditional 100% availability forever: network/service outages, account entitlements, revoked sessions, provider availability, platform updates, and server-enforced requirements can prevent an operation. ChatJS must make those boundaries observable and recover predictably rather than hide them.

- Discover and report host capabilities explicitly. A capability is available only when the consuming host supplies a real provider and that provider passes its own validation; OS name or a claimed device profile is not evidence of attestation.
- Preserve requirement gates. Authentication, entitlement, Sentinel, Turnstile, proof-of-work and device attestation must not silently downgrade or turn failures into success.
- Use bounded retries only where the observed protocol/provider semantics permit them. Respect server/local rate limits and cooldown markers; never reset or bypass a throttle merely to force another attempt. Retry a provider-initialization failure only where the client does so, and preserve cancellation and finite deadlines. Never automatically repeat a non-idempotent operation unless idempotency is established by the actual client protocol.
- Make state transitions explicit: unsupported, unavailable, expired, unauthorized, rate-limited, failed, timed out, cancelled, and successful must remain distinguishable. Keep errors typed and redact secrets.
- Detect protocol drift rather than guessing. When a shipped reference changes, compare its endpoint/schema/header/provider behavior, update the compatibility evidence, and add tests before changing the implementation. An unknown field, signature or challenge algorithm must not be guessed to keep a connection apparently alive.
- Prefer deterministic local tests for parsing, serialization, cancellation, backoff, provider selection and redaction. Reserve live account tests for explicitly authorized operations and never persist private account payloads in repository fixtures.
- Keep diagnostics local and explicit. No background probing, telemetry, hidden reporting or unsolicited requests may be added as a reliability shortcut.

The intended result is graceful support for every genuinely supported host/provider and precise failure information where the official service requires a capability that the host cannot provide.

## Unified product boundary — owner clarification (2026-11-25)

The single ChatJS package brings together three source/client families: ChatGPT mobile, ChatGPT desktop and Codex CLI. The Codex CLI's client workflows/capabilities are in scope for native Node.js implementation; the upstream CLI executable and its app-server are not required at runtime. The Codex source archive is used to reconstruct its behavior, not to spawn or embed its program. ChatGPT is the only AI service target. Do not create a generalized multi-provider AI SDK.

Internally preserve three distinct behavioral surfaces: Android ChatGPT Work uses cloud execution, Windows ChatGPT desktop Work uses local execution, and Codex CLI is a separate terminal-oriented coding client. One public Node.js module may expose them cohesively without collapsing their protocols or security requirements. Optional host adapters supply actual host facilities such as filesystem/process/browser/desktop access; they are not alternate AI providers.
