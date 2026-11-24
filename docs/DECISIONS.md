# ChatJS Decisions

Record durable project and technical decisions with rationale. Preserve superseded decisions as history and identify the current direction.

## One general-purpose Node.js module combining mobile and desktop client behavior
**Status:** accepted  
**Decision:** ChatJS is one comprehensive, reusable Node.js module intended to bring together the actual client-side systems and workflows of official ChatGPT mobile and ChatGPT desktop (including Work and Codex).  
**Rationale:** repeated explicit owner clarification in the recovered `Chat.json` and `Chat-1.json` conversations.  
**Consequences:** this is not a device-specific app, visible-feature imitation, replacement inference engine, or recreation of ChatGPT's server. The portable module must support different host applications and deployment environments.

## Actual client package contents are the primary implementation reference
**Status:** accepted  
**Decision:** use the supplied APK/MSIX package contents as substantive technical source material, including client code, compiled modules, request/response construction, schemas, transport, connection/authentication/session flows, persistence, tools, dependencies, and resources.  
**Rationale:** explicit owner direction: the code that implements the client-side behavior is present in the packages and is not merely a list of feature names.  
**Consequences:** do not reduce archives to metadata reports. Do not reject a client-side interface solely because public developer documentation does not describe it. Keep observed package behavior, source-level analysis, and verified Node.js implementation distinct. Server-side code not shipped in the client packages is not required to reproduce client behavior.

## Integrate with the real consumer ChatGPT client/service behavior
**Status:** accepted product goal; not yet implemented  
**Decision:** ChatJS targets the real official ChatGPT client/service experience and its legitimate account behavior, using the client-side implementation evidence in the supplied packages. It does not substitute OpenAI Platform APIs, API keys, or a different model provider for the target ChatGPT integration.  
**Rationale:** owner explicitly clarified that ChatJS should use ChatGPT itself, not OpenAI Platform APIs or a fake/model substitute.  
**Consequences:** study and reproduce the actual client request/response, transport, connection, and authentication/session flows where technically and legitimately usable. No compatibility or account-access claim until implemented and tested.

## Legitimate authentication and user data handling
**Status:** accepted  
**Decision:** preserve the real user-authorized authentication/account flow needed by the client integration. Do not bypass account login, authorization, access controls, entitlements, or security mechanisms. Never hardcode, log, publish, or commit user credentials or session material.  
**Rationale:** exact client behavior must be implemented without compromising user account security.  
**Consequences:** secret handling and lifecycle must be designed as real Node.js behavior and tested. This is not a prohibition on studying or reproducing the client authentication flow.

## No Platform API substitution
**Status:** accepted  
**Decision:** do not replace the target ChatGPT consumer-client integration with OpenAI Platform API/key integration or a different inference engine.  
**Rationale:** explicit owner direction.  
**Consequences:** model-powered workflows must use the real ChatGPT client integration once implemented. Never fake answers, reasoning, code authoring, voice, image generation, or agents.

## App/account behavior must be verified, not assumed
**Status:** accepted  
**Decision:** do not claim a feature or account data is available just because a package contains related code.  
**Rationale:** package code is direct implementation evidence, but still needs analysis and repeatable tests.  
**Consequences:** distinguish observed package content, reconstructed client behavior, actual Node.js implementation, account entitlement, and successful end-to-end verification.

## General-purpose host model
**Status:** accepted  
**Decision:** ChatJS must be usable from different Node.js applications and host environments, not bound to one phone, desktop OS, hardware device, or deployment model.  
**Consequences:** camera, microphone, screen, browser, and desktop functions are optional host integrations. The portable core must work without them.

## Explicit product scope exclusions
**Status:** accepted; permanent owner direction  
**Decision:** health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features are out of scope.  
**Consequences:** do not add these domains merely because they occur in reference package metadata.

## Main-only repository workflow
**Status:** accepted; permanent owner requirement  
**Decision:** only the existing `main` branch is allowed. Never create, delete, rename, switch, or publish another branch/worktree; never force-push. Do not configure branch protection, rulesets, or repository topics.

## Zero telemetry and no hidden collection
**Status:** accepted; permanent owner requirement  
**Decision:** no telemetry, analytics, tracking, ads, profiling, hidden collection, phone-home, background reporting, remote diagnostics, or telemetry dependencies. No unsolicited requests or automatic content upload.

## No fake features or unrelated bloat
**Status:** accepted; permanent owner requirement  
**Decision:** no fake, canned, predefined, hardcoded, demo-only, placeholder, no-op, or test-mock production behavior. No filler, bloat, unrelated features, pointless abstractions, or unjustified dependencies.

## ESM/CommonJS and TypeScript
**Status:** accepted  
**Decision:** maintain ESM and CommonJS entry points with accurate TypeScript declarations; verify parity.

## Public repository and third-party reference material
**Status:** accepted  
**Decision:** keep the public repository independent and do not commit official APK/MSIX binaries, extracted third-party application payloads, or credentials. Use ChatJS Project → Sources as the primary source location and commit independently authored findings and ChatJS code.  
**Consequences:** public availability of a package does not make it a ChatJS-owned artifact; preserve provenance and relevant third-party notices.

## Project source and optional Library policy
**Status:** accepted; current owner direction  
**Decision:** ChatJS Project → Sources is the primary and normal location for supplied ChatGPT packages. Do not depend on the personal Library or use it by default. Use the Library only when genuinely useful, needed, accessible, and Project Sources cannot provide the material. Any such material belongs under a folder named `ChatJS Project` and must contain only authentic, necessary source material or documented original findings.

## Canonical documentation completeness
**Status:** accepted; permanent workflow requirement  
**Decision:** record meaningful requirements, decisions, research, actions, changed files, verification, failures, limits, blockers, and handoffs in canonical docs during the same session. Update affected references and generated state while preserving chronology.

## Separate host environment context from first-party attestation
**Status:** accepted architecture requirement; protocol reconstruction in progress  
**Decision:** ChatJS must distinguish truthful host/runtime context, protocol-specific client-install identity, and first-party device-integrity/attestation. Host context may report genuine Node.js runtime facts and optional host-provided details. A client-install identifier may be created and persisted only where the observed client protocol requires it, with explicit lifecycle semantics. An integrity result must come from the genuine platform/provider mechanism and be bound to the applicable challenge and request context.  
**Rationale:** the supplied Android 1.2026.321 client has separate requirements-integrity and device-integrity provider interfaces. Its native DeviceIntegrity request carries account and conversation context; the Android implementation obtains a genuine Google Play Integrity token and uses an app-private device_id. This is materially different from generic host metadata.  
**Consequences:** never substitute a synthetic machine/device profile or ordinary OS/architecture values for first-party attestation; never claim a fabricated token or simulated proof is genuine. Platform-specific providers are optional adapters. On unsupported hosts, expose unsupported/unavailable/failure/cancellation distinctly and preserve the first-party check rather than silently downgrading. Fixtures may simulate results only in tests. Exact protocol semantics remain research until reconstructed and tested.
