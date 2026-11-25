# ChatJS Product and Engineering Standard

**Status:** accepted project-wide target standard; implementation is not implied.  
**Purpose:** translate the owner's direction for ChatJS to be comprehensive, all-in-one, highly capable, dynamically adaptable, customizable, controllable, portable, user-friendly, and production-quality into requirements that can be implemented and verified.

## 1. Product ambition

ChatJS is one conventional, general-purpose Node.js client module that brings together the actual client-side capabilities and workflows of **ChatGPT mobile, ChatGPT desktop, and Codex CLI** under the single package name and API, **ChatJS**. These are three source/client families consolidated into one Node.js module—not three separate packages and not three runtime products that consumers must install or launch independently.

The aim is to adapt their real client-side behavior into Node.js: ChatGPT mobile and desktop sessions/conversations and their Work surfaces, plus the Codex CLI's ChatGPT-backed coding-client workflows and local coding-agent capabilities. ChatJS itself implements those workflows in Node.js using verified first-party behavior. It must not require users to install or spawn the separate Codex CLI executable, run a Codex app-server, or embed the app-server as a dependency. The Codex source archive is essential reference material for implementing its in-scope client behavior, not a substitute runtime.

Keep the actual product boundaries accurate: Android ChatGPT Work is the cloud execution surface; Windows ChatGPT desktop Work is the local execution surface; Codex CLI is a distinct terminal-oriented coding client/capability family. Consolidating them in ChatJS does not mean treating these three experiences as identical or merging their different protocols into one guessed transport. Expose them through one coherent Node.js API while retaining the source-specific session, protocol, security, and execution semantics.

ChatJS is a normal reusable Node.js library—not a replacement ChatGPT app, server, framework, daemon, generalized multi-AI-provider SDK, or unrelated automation platform. ChatGPT remains the only AI service/product target. Optional host adapters are only for genuine host facilities that are not universal (such as filesystem/process/browser/desktop integration), not alternative AI providers.

The target is the broadest useful and legitimately implementable coverage supported by the supplied official client implementations and verified host capabilities. Prefer a complete, coherent user experience over disconnected feature demos. Prefer a small number of well-integrated APIs over a pile of unrelated packages or one-off adapters. Keep optional capabilities composable so consumers can use only what their environment supports.

"All-in-one", "full-featured", "full control", "dynamic", "everywhere", and "maximum" are product goals, not permission to invent unsupported behavior or an assertion that every feature works on every machine. They mean:

- **Comprehensive:** implement every in-scope client workflow that can be reconstructed, legitimately used, and verified, and record the remaining gaps.
- **All-in-one:** expose cohesive capabilities through the ChatJS module with consistent lifecycle, configuration, errors, types, events, and documentation.
- **Maximum practical capability:** avoid arbitrary omissions and shallow feature-name clones; use actual client evidence and genuinely supported host integrations.
- **Portable:** keep the core independent of any one operating system, device, UI, or hardware facility; isolate host-specific dependencies behind optional adapters.
- **Customizable and controllable:** make meaningful behavior explicit and configurable without allowing configuration to bypass authentication, authorization, service requirements, or safety invariants.
- **Dynamic:** support runtime capability discovery and deliberate adaptation to verified client/protocol changes, without hidden background traffic or guessing.
- **Production-quality:** require implementation, tests, security review, limits, lifecycle handling, accurate declarations, packaging checks, and usable documentation before calling a feature supported.
- **User-friendly:** favor discoverable APIs, safe defaults, clear errors, consistent naming, useful examples, and predictable behavior.

## 2. Scope and non-negotiable identity

Use the supplied official ChatGPT application packages and committed analysis as primary technical evidence for client requests, payloads, serialization, transport, connection, legitimate authentication/session behavior, persistence, tools, and workflows. Public developer documentation is not the sole test of whether a client-side interface exists. Do not recreate ChatGPT server-side code that is not shipped in the clients.

ChatJS targets the actual consumer ChatGPT mobile and desktop client experience and the Codex CLI client experience. All three are consolidated as first-party client capability families in one ChatJS Node.js module. ChatGPT is the sole AI service target. Do not substitute OpenAI Platform APIs, API keys, another inference provider, a synthetic assistant, or canned/demo output. Preserve genuine user authentication, account authorization, entitlements, and first-party security checks.

No first-party client feature domain is categorically excluded by category. This includes personal/financial workflows, location and map-related capabilities, shopping/commerce, wallet/payment experiences, contacts, calendar, communications/telephony, health, and other feature areas where they are genuinely implemented by the supplied clients or supported through legitimate host integrations. Determine coverage from source evidence, actual service behavior, authorization, and host capabilities—not a category blacklist. Technical privacy/security invariants remain mandatory: no telemetry, tracking, ads, hidden collection, background reporting, phone-home, unsolicited network requests, or automatic content uploads.

## 3. One cohesive, modular package

The intended package is one ChatJS entry point with coherent capability areas. Internal modules may be separated for maintainability, but their public behavior should share:

- a consistent client and resource lifecycle;
- common validated configuration and capability discovery;
- consistent cancellation, deadlines, concurrency controls, typed errors, and event semantics;
- consistent identity, authentication/session, storage and privacy boundaries;
- ESM and CommonJS parity with accurate TypeScript declarations;
- a discoverable public API and complete reference documentation.

Feature groups should compose naturally: ChatGPT mobile/desktop client connection and sessions; conversations, messages, threads and streaming; projects and context; files and attachments; image, video and voice workflows where supported; search and tools present in the client; Android cloud Work and Windows local Work as separate surfaces; Codex CLI-equivalent coding-client workflows; workspaces, filesystem operations and artifacts; approvals, command/test execution and Git/review workflows; and optional host integrations where the consuming environment supplies the real facility.

Do not add a feature merely because a name appears in a package. Trace its implementation, host requirements, dependencies, security boundaries, and real request/response behavior first. Do not build unrelated functionality or abstraction layers without a concrete use and tests.

## 4. Portability and host support

The portable core must be usable by different Node.js applications, operating systems and deployment styles. Do not assume that a Node.js process has a phone runtime, desktop UI, browser session, camera, microphone, screen capture, GPU, particular filesystem layout, shell, package manager, or special OS permission.

- Keep the core free of mandatory host-specific APIs and optional device permissions.
- Provide optional host adapters for real browser, desktop, microphone, camera, screen, sandbox, process, secure-storage, and platform-integrity facilities only when the consuming environment genuinely supplies them.
- Define adapter contracts, capability checks, lifecycle, errors, cancellation, cleanup, and security expectations explicitly.
- Report actual runtime/OS/architecture facts accurately; do not turn those facts into a synthetic device identity or integrity claim.
- State a tested support matrix. A runtime or operating system is supported only after it is exercised in CI or documented manual verification. Unknown environments should fail clearly or use a portable fallback that is genuinely correct.
- Keep integrations optional so absence of one adapter does not make unrelated core functionality unavailable.

Do not promise every feature on every host. Feature availability may depend on the official client protocol, account entitlement, service rollout, platform provider, permission, or external application. Expose these dependencies instead of hiding them.

## 5. Customization and user control

The intended API should expose meaningful control over client behavior. Design configuration in explicit layers, with precedence documented and validated. A future implementation should consider:

1. safe package defaults;
2. per-client configuration;
3. named consumer profiles where useful;
4. per-operation options for narrowly scoped overrides;
5. optional host adapters for capabilities the consuming host genuinely implements.

Where applicable, configurable controls should include:

- connection and transport options where verified and safe;
- authentication/session sources and explicit persistence strategy;
- request deadlines, connection/read timeouts and cancellation signals;
- concurrency, queueing, backpressure and resource limits;
- retry policy and idempotency behavior within source-verified bounds;
- local workspace roots, file-size/depth limits, write policies and cleanup;
- command approval, executable/argument policy, working directory and output caps;
- optional host-adapter registration and selection;
- explicit logging/diagnostic verbosity with secrets and private content redacted;
- local retention, deletion and persistence choices;
- event handling and progress observation.

Every option needs a clear type, default, allowed range, precedence rule, effect, and error behavior. Reject unknown or invalid values rather than silently ignoring them. Keep configuration snapshots predictable during concurrent operations; live reconfiguration must be deliberate and safe. Avoid global mutable state where it creates cross-client interference.

**Customization never overrides invariants.** Consumers must not be able to configure ChatJS to bypass sign-in, access controls, entitlements, first-party challenge/attestation, rate limits, cooldowns, required approvals, secure origin checks, or data-protection rules. Do not expose a fake "force success", "disable Sentinel", "ignore authorization", or insecure fallback switch.

## 6. Dynamic capability and protocol adaptation

ChatJS should be dynamic in what it can truthfully discover and adapt to, not in silently changing behavior behind the user's back.

- Maintain a capability registry describing the capability, implementation or host adapter, prerequisites, evidence level, and current availability.
- Distinguish supported, partial, experimental, unsupported, unavailable, blocked, and unknown where appropriate. Do not collapse these states into one boolean.
- Discover capabilities from the actual runtime and registered host adapters. A host capability is available only after its adapter exists and validates; an OS name alone is not enough.
- Keep client protocol profiles and compatibility observations traceable to the source package/version or other evidence used to establish them.
- Detect known protocol drift through deliberate source/package comparisons and contract tests. Update profiles only with evidence; unknown fields, signatures, challenges, and algorithms must not be guessed.
- Make compatibility changes deliberate and testable. Do not download or execute remote code, update protocols, probe services, or send telemetry in the background.
- Do not make unsolicited requests on module import, client construction, or capability discovery. Network activity must follow an explicit user-invoked operation and only serve that operation.
- Preserve explicit caller control over opt-in host integrations, storage, logging, and persistence.
- When a required host adapter, platform-integrity facility, or protocol is missing, stale, unsupported or blocked, preserve the status and explain what is needed. Never silently downgrade a security requirement or represent an unverified path as working.

Dynamic adaptation should improve forward compatibility while retaining reproducible behavior. Protocol changes can still make an integration unavailable until the new behavior is understood and implemented.

## 7. Reliability, lifecycle, and resource discipline

Production behavior must be predictable under normal use, failure, cancellation, concurrency, and partial availability.

- Use finite, documented deadlines and bounded resource consumption.
- Propagate cancellation through network requests, streaming, host-adapter operations, child processes and filesystem tasks where the underlying APIs allow it.
- Use bounded retries only where source-verified semantics permit them. Respect server and local rate limits, retry-after signals and cooldowns. Never reset or evade a throttle to force progress.
- Never automatically repeat a non-idempotent operation unless the actual protocol establishes safe idempotency.
- Implement cleanup for streams, sockets, timers, files, child processes, listeners, temporary data, adapters and session resources.
- Define concurrency limits, memory/output/file caps, backpressure, queue semantics and overload errors.
- Distinguish timeout, cancellation, rate-limit, authentication, authorization, entitlement, integrity, host-adapter, parse, transport and service errors.
- Preserve the original cause without exposing credentials or private user content.
- Avoid background daemons, hidden tasks and implicit work after a client closes.

No library can guarantee that a remote service, account, network, entitlement or required platform integration stays available forever. ChatJS should maximize practical reliability, recover within verified limits, and report external blockers accurately—not promise uninterrupted success.

## 8. Security and privacy by design

- Preserve actual authentication, user authorization and first-party security requirements; do not bypass them or impersonate another platform.
- Keep credentials/session material out of source, logs, exceptions, fixtures, public artifacts and repository history.
- Make local persistence explicit, scoped, and documented with retention and deletion semantics.
- Make filesystem and process effects explicit and bounded; validate paths, prevent workspace escapes, use no shell by default, require policy/approval where appropriate, and clean up deterministically.
- Keep diagnostics local and opt-in. No telemetry, analytics, tracking, ads, crash uploads, phone-home, hidden profiling or remote diagnostics.
- Do not issue unsolicited network requests or automatically upload prompts, files, logs or user content.
- Keep official third-party packages and extracted client payloads out of Git; preserve provenance and license/notice requirements.
- Review every dependency for necessity, maintenance, security and licensing. Prefer built-in Node.js functionality when it is sufficient.
- Treat test fixtures and mocks strictly as tests; never ship them as production capabilities.

## 9. User experience and documentation

The product should be approachable for a first-time Node.js user and precise enough for advanced consumers.

- Provide a short start guide, task-oriented examples and a complete API reference.
- Document configuration fields, defaults, precedence, host requirements, capabilities, side effects, limits, errors, security behavior and cleanup.
- Use consistent names, predictable return types, typed errors and accurate declarations.
- Provide actionable errors: state what failed, whether retry is safe, and what user/host action is needed, without disclosing secrets.
- Document the difference between feature presence in official clients, reconstructed protocol knowledge, implemented Node.js behavior, tested support, and entitlement-dependent availability.
- Include examples for ESM, CommonJS, TypeScript, configuration, cancellation, streaming, adapter registration, secure storage and common failure handling as the relevant APIs are implemented.
- Keep setup minimal; optional adapters must not be mandatory dependencies for core use.
- Keep root ChatJS.md synchronized with actual exported APIs only. Planned APIs belong in design docs until implemented.

## 10. Production-readiness gate

A feature may be labelled **supported** only when the evidence and tests for that feature establish all applicable items below:

1. **Source evidence:** actual client behavior and protocol prerequisites are traced and recorded, including unresolved differences.
2. **Implementation:** real Node.js production code exists; no placeholder, fake implementation, canned response or silent no-op.
3. **API contract:** behavior is documented, typed, validated, and consistent across ESM/CommonJS.
4. **Correctness tests:** success, malformed input, failure, cancellation, timeout, concurrency and cleanup paths are tested.
5. **Compatibility tests:** all declared Node.js/OS targets are covered at the appropriate level; adapters are tested on their real supported hosts.
6. **Integration evidence:** protocol contracts are tested with safe fixtures, and authorized end-to-end checks confirm real service behavior where required. Test fixtures never count as proof of real service compatibility.
7. **Security/privacy:** authorization, secret redaction, filesystem/process boundaries, opt-in persistence, network intent and zero-telemetry constraints are checked.
8. **Resilience:** retry/idempotency, rate limits, deadlines, backpressure, resource bounds and host-adapter/platform-integrity unavailability are tested as applicable.
9. **Performance:** meaningful hot paths have measured baselines and defensible resource budgets; avoid unsupported speed claims.
10. **Packaging:** the archive contains the intended files, passes integrity checks, and ESM/CommonJS/TypeScript entry points work from the packaged artifact.
11. **Documentation:** quick start, options, capability states, host prerequisites, errors, side effects and known limitations are current.
12. **Maintenance:** source/version evidence, dependencies, known risks and compatibility follow-ups have an owner and a documented path.

A feature that has some but not all applicable evidence must be labelled accurately as partial, experimental, blocked or unknown. A successful unit test alone does not establish complete feature support.

## 11. Project-wide quality dimensions

Evaluate each meaningful feature and release candidate against:

| Dimension | Target |
| --- | --- |
| Functional completeness | Broad, coherent coverage of in-scope, source-supported workflows |
| Correctness | Exact request/response, serialization and state behavior supported by evidence |
| Compatibility | Declared Node.js and host matrix, with optional adapters |
| Customization | Validated configuration, explicit overrides and host-adapter control within safe boundaries |
| Reliability | Bounded retries, timeouts, cancellation, cleanup and honest failure states |
| Performance | Measured latency, throughput, memory and concurrency behavior |
| Security | Legitimate auth, least privilege, secret protection and safe local execution |
| Privacy | Explicit data retention and zero telemetry/hidden upload |
| Usability | Clear APIs, typed errors, consistent patterns and helpful examples |
| Extensibility | Narrow, documented adapter interfaces and composable modules |
| Maintainability | Low unnecessary dependency/abstraction burden, readable source and reproducible checks |
| Documentation | Current user, API, architecture, compatibility and troubleshooting guidance |

## 12. Non-guarantees and honest boundaries

ChatJS cannot guarantee literal support for every operating system, host, device, service version, account, entitlement, platform integration, network condition, or future change. It cannot guarantee uninterrupted availability forever or override decisions made by the official service. It must not fabricate capabilities when the host lacks them.

The commitment is to pursue maximum practical and verifiable capability, broad portability, strong customization, and high engineering quality; keep the implementation adaptive and well-documented; expand support when source evidence and tests allow; and clearly report limitations instead of hiding them.

## 13. Current implementation status

This standard is a target requirement, not a completion report. At the time this standard was recorded, ChatJS's runtime remained foundation-only: the real ChatGPT connection, authentication/session lifecycle, protocol workflows, capability registry, adapter system, expanded configuration API, and end-to-end mobile/desktop behavior were not implemented. The official Android/Windows source research remains separate from tested Node.js support. See project-state.json, TODO.md, CAPABILITY_MATRIX.md, CHATGPT_CAPABILITY_INVENTORY.md, and the relevant client findings.

## 14. Expanded owner quality requirements — 2026-11-25

This section records the owner's expanded requirement that ChatJS should be dynamic and automatic, comprehensive and all-in-one, highly customizable and controllable, friendly, stable, responsive, smooth, current, fast, lightweight, real-time where the client supports it, asynchronous, concurrent, and suitable for sustained operation. It extends the quality dimensions above; it does not assert that these capabilities are currently implemented.

### 14.1 Dynamic, automatic, and adaptive by default

- Discover local runtime, operating-system, architecture, registered host adapters, and their validated capabilities automatically when safe and local.
- Present a live, queryable capability/readiness view with evidence and explicit states such as available, partial, unsupported, unavailable, blocked, stale, and unknown.
- Select a compatible implementation path only from verified client/protocol behavior and genuinely available host facilities. Keep selection explainable and controllable.
- Adapt to changed official client/protocol behavior only after source comparison, compatibility analysis, and tests. Never guess new fields, challenge algorithms, request routes, entitlements, or security semantics.
- No work on import or construction that causes external traffic, remote updates, hidden polling, or user-data collection. Every network operation remains explicit and attributable to a caller operation.

### 14.2 Full customization and control

- Provide validated, composable configuration with documented precedence across package defaults, client instances, optional named profiles, and per-operation overrides.
- Expose meaningful controls for timeouts, cancellation, concurrency, queueing, backpressure, storage, logging/redaction, transport choices, host-adapter registration, progress/events, and local work policy as each feature is implemented.
- Make configuration immutable for an in-flight operation unless a documented safe live-update contract exists. Avoid cross-client global mutable state.
- Give consumers visibility into capability selection, operation progress, retries, limits, resource use where measurable, and cleanup outcomes.
- No override may turn off account authorization, entitlements, service-required integrity/challenges, rate limits/cooldowns, origin checks, approvals, privacy requirements, or other security invariants.

### 14.3 Asynchronous, concurrent, and real-time behavior

- Make I/O-bound public operations asynchronous and promise-based or async-iterable as appropriate. Streaming APIs should deliver real events incrementally when the official protocol supports streaming.
- Support multiple independent operations concurrently with per-client and per-operation limits, bounded queues, deterministic ordering where required, and clear overload behavior.
- Propagate AbortSignal-style cancellation and finite deadlines through all layers that can honor them. Clean up listeners, streams, sockets, buffers, temporary files, and host-adapter resources on success, failure, cancellation, or close.
- Apply backpressure to streamed data and bounded memory to accumulated results. Do not buffer unbounded streams or create unbounded task fan-out.
- Keep the Node.js event loop responsive. Measure CPU-heavy operations; use worker isolation or other offloading only when justified, optional where host-specific, and tested.
- Make progress, partial results, handoff/resume, and completion observable as real protocol/client events; never synthesize progress to make an operation appear live.

### 14.4 Sustained operation and 24/7 readiness

- Support long-running use when a consumer explicitly starts and owns the ChatJS process/client/session. Define start, stop, close, suspend/resume, graceful shutdown, reconnection, and recovery behavior for each applicable subsystem.
- Add soak, leak, restart, interruption, cancellation, stale-session, reconnect, queue-saturation, and long-stream tests before claiming sustained-operation readiness.
- Use finite deadlines, bounded buffers/queues, rate-limit-aware retry, jittered recovery only where protocol semantics allow it, and idempotency-aware operation replay. Persist state only with explicit consumer configuration and documented retention.
- Expose liveness/readiness and actionable local diagnostics where useful. Do not hide failures or silently restart an operation that may have side effects.
- “24/7” does not authorize a hidden daemon, auto-start, unsolicited polling, network keepalive, remote monitoring, telemetry, or background content upload. Long-running activity must remain consumer-controlled and only perform the explicit work the consumer requested.

### 14.5 Responsiveness, stability, speed, and lightweight footprint

- Define measurable latency, time-to-first-event, throughput, CPU, heap, memory, queue-depth, and cleanup budgets for meaningful hot paths.
- Establish reproducible benchmarks and soak baselines before claiming “fast,” “smooth,” “lightweight,” or “responsive”; investigate regressions with evidence.
- Prefer Node.js built-ins and small maintained dependencies. Keep optional host integrations separately loadable and avoid making unrelated host APIs mandatory.
- Validate malformed, oversized, slow, interrupted, and adversarial input; use bounded parsing, file limits, queue limits, and explicit overload errors.
- Treat reliability as correctness under cancellation, concurrency, shutdown, resource pressure, network changes, and partial service failure—not merely successful happy-path requests.

### 14.6 Newest and broad compatibility

- Maintain a dated compatibility record for supported Node.js releases, OS/architecture combinations, required host adapters, and official ChatGPT mobile/desktop/Codex client source versions.
- When updated official client source packages or verified release evidence are supplied, compare relevant modules and record behavior/schema changes; add regression/contract tests before adapting ChatJS.
- Test the newest supported Node.js LTS and declared platform targets in CI, while documenting tested older ranges. Drop or add versions deliberately with evidence.
- Do not auto-download, execute, or install updated protocol code in the background. “Always current” means a disciplined, evidence-based maintenance process, not silent self-modifying software.

### 14.7 Acceptance interpretation

“Everything/everywhere/maximum/full support/forever” means maximum practical and verified coverage of the in-scope ChatGPT mobile, ChatGPT desktop, and Codex CLI client workflows in this one Node.js module, across host/account combinations that genuinely support them. It requires a complete capability inventory and a clearly tested compatibility matrix. It does not mean unsupported hardware, unavailable entitlements, every third-party host, every future protocol revision, or uninterrupted remote-service availability can be guaranteed. Report gaps and blockers rather than claiming universal support.

A feature may claim these expanded qualities only to the extent its relevant behavior, resource bounds, compatibility, concurrency, cancellation, lifecycle, and sustained-operation tests have actually passed. The existing production-readiness gate in section 10 remains mandatory.

## Owner scope clarification — full feature-domain coverage (2026-11-25)

The owner has superseded the earlier category-based exclusions. The ChatJS product target does not categorically exclude finance/personal workflows, location/maps, shopping/commerce, wallets/payments, contacts, calendars, communications/telephony, health, or comparable feature domains. Include every relevant capability actually present in the supplied ChatGPT mobile/desktop and Codex client sources, and use legitimate service/host integrations where evidenced. This does not authorize invented features, unsupported endpoints, security bypasses, or hidden data collection. Feature evidence and tested support status—not an arbitrary domain blacklist—determine implementation.
