# ChatJS Decisions

Record durable project and technical decisions with rationale. Update an existing decision when it changes; do not silently reverse decisions in code.

## Node.js-first product

**Status:** accepted  
**Decision:** ChatJS is a reusable Node.js module, not an Android app or browser-only UI.  
**Rationale:** expose ChatGPT-compatible workflows through documented and authorized interfaces.  
**Consequences:** platform-specific behavior must sit behind adapters.

## Evidence-backed compatibility

**Status:** accepted  
**Decision:** compatibility claims require evidence and repeatable tests.  
**Rationale:** private endpoints, account entitlements, platform services and app internals cannot be assumed to be accessible.  
**Consequences:** distinguish verified public behavior, static APK indicators, and planned/unknown features. Never claim 1:1 without conformance tests.

## Responses API as the OpenAI integration foundation

**Status:** accepted for new OpenAI model-backed integrations  
**Decision:** use the documented public Responses API as the default interface for new OpenAI model-backed workflows. Do not build on the retired Assistants API or private ChatGPT consumer-app endpoints.  
**Rationale:** OpenAI recommends Responses for new projects and shut down Assistants API on August 26, 2026.  
**Consequences:** build a narrow provider adapter against public endpoints. Treat model/tool support, permissions, retention, pricing and rate limits as runtime concerns. This does not mean anything is implemented.

## Distinct authentication routes

**Status:** accepted boundary; implementation unresolved  
**Decision:** keep developer API-key auth separate from Sign in with ChatGPT identity and optional plan-usage OAuth. Do not silently fall back between them or treat ChatGPT subscription usage as ordinary API credit.  
**Rationale:** these are different documented authorization flows. Plan usage does not expose consumer ChatGPT conversations or account context.  
**Consequences:** an API-key provider can be designed independently. Do not implement plan-usage OAuth until legal/open-source eligibility and the registration flow are confirmed. ChatJS has an all-rights-reserved notice; public visibility does not make it open source.

## Single-branch repository workflow

**Status:** accepted; permanent user requirement  
**Decision:** repository contains only main. Commit directly to main. Never create, delete, rename, switch to or publish another branch; never invoke branch/ref creation or deletion operations. Do not configure branch protection/rulesets or repository topics.  
**Rationale:** explicit user direction.  
**Consequences:** check live branches each chat. Report unexpected branches; never delete or modify them.

## No product telemetry or hidden collection

**Status:** accepted; permanent user requirement  
**Decision:** no telemetry, analytics, tracking, ads, profiling, hidden collection, phone-home, background reporting, remote diagnostics or telemetry dependencies.  
**Rationale:** explicit zero-telemetry requirement.  
**Consequences:** no usage data transmitted. Network calls only for explicit operations to configured, documented, authorized services.

## No pretend features or unrelated bloat

**Status:** accepted; permanent user requirement  
**Decision:** no fake, canned, predefined, hardcoded, demo-only, placeholder, no-op or test-mock runtime behavior. No bloatware, pointless dependencies, filler or unrelated files/features.  
**Rationale:** require genuine, complete functionality.  
**Consequences:** test fixtures remain tests-only; every feature is implemented, tested, documented and represented honestly.

## Public repository with proprietary rights notice

**Status:** provisional; legal review required  
**Decision:** keep the repository public with an all-rights-reserved notice rather than automatically granting a broad open-source license.  
**Rationale:** owner requested a strong rights reservation.  
**Consequences:** do not accept external code contributions until ownership and contributor terms are settled. Do not assume eligibility for the open-source Sign in with ChatGPT plan-usage route.

## ESM and CommonJS

**Status:** accepted for initial package  
**Decision:** expose ESM and CommonJS entry points backed by one implementation with TypeScript declarations.  
**Rationale:** broad Node.js compatibility without duplicated implementations.  
**Consequences:** test both systems and keep exports aligned.

## Current Node.js LTS

**Status:** accepted; review during maintenance  
**Decision:** CI follows the currently supported Node.js LTS runtime.  
**Rationale:** compatibility follows Node.js support, not a ChatJS product version system.  
**Consequences:** review against the official Node.js release schedule.

## GitHub and Project Sources as cross-chat memory

**Status:** accepted  
**Decision:** repository and ChatJS Project Sources are durable project memory across chats.  
**Rationale:** committed docs and Project Sources persist.  
**Consequences:** every chat follows AI_MEMORY.md and searches Project Sources for ChatGPT.zip.

## APK as a private reference source

**Status:** accepted  
**Decision:** keep ChatGPT.zip in Project Sources, not the public repository.  
**Rationale:** proprietary third-party binary must not be redistributed.  
**Consequences:** never commit the APK or copy proprietary assets/code.

## No ChatJS product versioning

**Status:** accepted  
**Decision:** no ChatJS product versions, release tags, version automation, lockfiles, changelogs, checksums or npm publishing. Module name is exactly ChatJS.  
**Rationale:** explicit user requirement.  
**Consequences:** normal Git history remains; package.json has no product version field; CI follows current Node.js LTS.

## Separate product documentation and project memory

**Status:** accepted  
**Decision:** root ChatJS.md documents the actual Node.js module; /docs is the project memory and handbook.  
**Rationale:** user documentation and engineering continuity have different purposes.  
**Consequences:** keep them separate.
