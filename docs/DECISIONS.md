# ChatJS Decisions

Record durable project and technical decisions with rationale. Update an existing decision when it changes; do not silently reverse decisions in code.

## Node.js-first product

**Status:** accepted  
**Decision:** ChatJS is a reusable Node.js module, not an Android app or browser-only UI.  
**Rationale:** the product is intended to expose ChatGPT-compatible workflows through a Node.js API.  
**Consequences:** platform-specific behavior must sit behind adapters.

## Evidence-backed compatibility

**Status:** accepted  
**Decision:** compatibility claims require evidence and repeatable tests.  
**Rationale:** private endpoints, account entitlements, platform services and app internals cannot be assumed to be accessible.  
**Consequences:** distinguish verified public behavior, observations, and planned/unknown features. Never claim 1:1 without a conformance suite.

## Single-branch repository workflow

**Status:** accepted; permanent user requirement  
**Decision:** the repository contains only main. All work is committed directly to main. Never create, delete, rename, switch to or publish another branch, and never invoke branch/ref creation or deletion operations. Do not configure branch protection/rulesets or repository topics.  
**Rationale:** explicit user direction to keep the repository on one branch and avoid unnecessary GitHub setup.  
**Consequences:** every chat checks the complete branch listing and works only on main. If an unexpected branch appears, report it; never delete or modify it.

## No product telemetry or hidden collection

**Status:** accepted; permanent user requirement  
**Decision:** do not include product telemetry, analytics, tracking, ads, profiling, hidden data collection, phone-home requests, background reporting, remote diagnostics or telemetry dependencies.  
**Rationale:** the user explicitly requires zero telemetry and no covert data collection.  
**Consequences:** no usage data is transmitted. Network requests exist only when needed for an explicit user-requested operation and only to a documented, configured, authorized service. Local error handling does not transmit data.

## No pretend features or unrelated bloat

**Status:** accepted; permanent user requirement  
**Decision:** no fake, canned, predefined, hardcoded, demo-only, placeholder, no-op or test-mock functionality in the shipped runtime. No bloatware, pointless dependencies, filler or unrelated features/files.  
**Rationale:** the user requires genuine, complete functionality and a focused project.  
**Consequences:** test fixtures remain isolated to tests; every shipped feature must be implemented, tested, documented and honestly represented.

## Public repository with proprietary rights notice

**Status:** provisional; legal review required  
**Decision:** keep the repository public and use an all-rights-reserved notice rather than automatically granting a broad open-source license.  
**Rationale:** the owner asked for the strongest practical rights reservation on a public repository.  
**Consequences:** do not accept external code contributions until ownership and contributor terms are settled. Public visibility and a notice do not prevent copying.

## ESM and CommonJS

**Status:** accepted for the initial package  
**Decision:** expose ESM and CommonJS entry points backed by one implementation, with TypeScript declarations.  
**Rationale:** broad Node.js module compatibility is a product goal and duplicated implementations would drift.  
**Consequences:** test both module systems and keep their exports aligned.

## Current Node.js LTS

**Status:** accepted; review during maintenance  
**Decision:** CI follows the currently supported Node.js LTS runtime.  
**Rationale:** runtime compatibility should follow Node.js support rather than create a ChatJS product runtime version scheme.  
**Consequences:** update CI using the official Node.js release schedule.

## GitHub and Project Sources as cross-chat memory

**Status:** accepted  
**Decision:** the GitHub repository and ChatJS Project Sources are durable project memory across separate ChatGPT chats.  
**Rationale:** chats do not guarantee shared conversational history, while committed docs and Project Sources can persist.  
**Consequences:** every chat follows AI_MEMORY.md and searches ChatJS Project → Sources for ChatGPT.zip.

## APK as a private reference source

**Status:** accepted  
**Decision:** keep ChatGPT.zip in ChatJS Project → Sources, not in the public GitHub repository.  
**Rationale:** the APK is a proprietary third-party app binary and public repository storage would redistribute it.  
**Consequences:** inspect it only when the Project Source is actually available; never commit the APK or copy proprietary assets/code.

## No ChatJS product versioning

**Status:** accepted  
**Decision:** do not introduce ChatJS product versions, release tags, version automation, lockfiles, changelog machinery, checksums or npm registry publishing. The module name is exactly ChatJS.  
**Rationale:** explicit user requirement.  
**Consequences:** normal Git commit history remains; the minimal package.json has no product version field; CI tracks the current Node.js LTS.

## Separate product documentation and project memory

**Status:** accepted  
**Decision:** root ChatJS.md documents the actual Node.js module; /docs is the shared project memory and engineering handbook.  
**Rationale:** users need API documentation while project chats need persistent knowledge and workflow records.  
**Consequences:** keep product-facing content and project-maintenance knowledge separate.
