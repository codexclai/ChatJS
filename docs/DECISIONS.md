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
**Consequences:** the project is not described as open source; external contributions are on hold pending ownership and legal review.

## ADR-0004 — ESM and CommonJS support

**Status:** accepted for bootstrap  
**Decision:** expose both ESM and CommonJS entry points backed by one implementation module, plus TypeScript declarations.  
**Reason:** broad Node.js module compatibility is a project goal and duplicated implementations would drift.  
**Consequences:** tests must cover both entry points and their exported API must remain aligned.

## ADR-0005 — Current Node.js LTS compatibility

**Status:** accepted; review continuously  
**Decision:** CI follows the current supported Node.js LTS runtime dynamically. Do not pin the project to a ChatJS product release or runtime patch number.  
**Reason:** runtime compatibility should follow Node.js support, not introduce a ChatJS versioning system.  
**Consequences:** recheck the official Node.js release schedule as part of maintenance.

## ADR-0006 — Repository and Project Sources as cross-chat memory

**Status:** accepted  
**Decision:** GitHub documents and ChatGPT Project Sources are the durable memory across chats.  
**Reason:** separate chats do not guarantee shared conversational history.  
**Consequences:** every session reads the continuation protocol and searches the ChatJS Project's Sources in ChatGPT for ChatGPT.zip before requesting another upload.

## ADR-0007 — APK as high-level reference only

**Status:** accepted  
**Decision:** keep the APK in ChatGPT Project Sources, not in the public GitHub repository.  
**Reason:** the supplied app artifact is proprietary; committing it publicly would redistribute the app.  
**Consequences:** future sessions search Project Sources before requesting a new upload; no APK binary, proprietary source, compiled implementation, or copied assets are committed.

## ADR-0008 — No ChatJS product versioning system

**Status:** accepted  
**Decision:** do not create ChatJS product versions, release tags, version automation, lockfiles, changelog/version machinery, checksums, or npm registry publishing. The exact module name is ChatJS.  
**Reason:** the user explicitly requires the product and Node module to remain simply ChatJS without a separate versioning system.  
**Consequences:** Git commits remain normal source-control history; CI follows the supported Node.js LTS line without creating ChatJS releases.
