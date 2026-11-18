# Architecture and Project Decisions

This file records durable decisions. Amend an entry when evidence changes; do not silently reverse a decision in code.

## ADR-0001 — Node.js-first package

**Status:** accepted for project direction  
**Decision:** ChatJS is a Node.js module. It is not an Android app, mobile UI clone, or browser-only widget.  
**Reason:** the requested product is a reusable Node.js module that can expose modular client capabilities and workflows.  
**Consequences:** platform-specific behavior must sit behind adapters; mobile observations inform behavior but are not copied as Android implementation.

## ADR-0002 — Evidence-backed compatibility

**Status:** accepted  
**Decision:** compatibility claims require verifiable evidence and tests. Product aspirations remain planned until implemented.  
**Reason:** private endpoints, account entitlements, server-only features, and app internals cannot be assumed to be public or accessible.  
**Consequences:** use the capability matrix and label evidence type; never claim 1:1 compatibility without an explicit conformance suite.

## ADR-0003 — Public repository, proprietary rights notice

**Status:** provisional; legal review required  
**Decision:** keep GitHub visibility public and use an all-rights-reserved notice rather than granting a broad open-source license at bootstrap.  
**Reason:** the owner requested a public repository with the most restrictive practical rights reservation.  
**Consequences:** the project is not described as open source; external contributions and package publication are held pending ownership and legal review. Repository visibility and the notice do not prevent copying.

## ADR-0004 — ESM and CommonJS support

**Status:** accepted for bootstrap  
**Decision:** expose both ESM and CommonJS entry points backed by one CommonJS implementation module, plus TypeScript declarations.  
**Reason:** broad Node.js module compatibility is a project goal and duplicated implementations would drift.  
**Consequences:** tests must cover both entry points and their exported API must remain aligned.

## ADR-0005 — Supported Node.js baseline

**Status:** accepted for bootstrap; review each release cycle  
**Decision:** require Node.js 22.14.0 or newer and test 22, 24, and 26 in CI.  
**Reason:** these are the supported LTS lines relevant to the project review date; Node.js 26 is Active LTS as of 2026-11-18.  
**Consequences:** update the matrix from the official Node.js release schedule, not from assumptions.

## ADR-0006 — Repository as cross-chat memory

**Status:** accepted  
**Decision:** the GitHub repository and its state / task / session / decision documents are the durable source of truth across ChatGPT chats.  
**Reason:** separate chats do not guarantee shared conversational history.  
**Consequences:** every session reads the continuation protocol and persists meaningful discoveries, decisions, work, and next actions.

## ADR-0007 — APK as high-level reference only

**Status:** accepted  
**Decision:** retain a checksum and high-level inventory note, not the APK or its assets, in the public repository.  
**Reason:** the supplied app artifact is proprietary and its timestamp alone does not prove latest-release status.  
**Consequences:** no APK binary, proprietary source, compiled implementation, or copied assets are committed.
