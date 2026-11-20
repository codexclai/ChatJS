# ChatJS Project Documentation

This directory contains persistent project memory and the engineering handbook. The user-facing module manual is root-level [ChatJS.md](../ChatJS.md). The concise assistant operating instructions for the ChatGPT Project Instructions field are in [CHATGPT_PROJECT_INSTRUCTIONS.md](CHATGPT_PROJECT_INSTRUCTIONS.md); that file is not a duplicate of this handbook.

## Start

1. [AI Memory](AI_MEMORY.md) — current product direction, durable requirements, required reading.
2. [Continuation](CONTINUATION.md) — session protocol and resume behavior.
3. [Project State](PROJECT_STATE.md) — generated snapshot from project-state.json.
4. [Tasks](TODO.md) — priority queue.
5. [Session History](SESSION_LOG.md) — chronological record.

## Product and engineering knowledge

- [Client Capability Inventory](CHATGPT_CAPABILITY_INVENTORY.md) — actual mobile/desktop client systems to investigate and adapt.
- [Capability Matrix](CAPABILITY_MATRIX.md) — actual implementation status.
- [Knowledge Base](KNOWLEDGE_BASE.md) — facts, sources, and technical notes.
- [Decisions](DECISIONS.md) — owner requirements and design rationale.
- [Experiments](EXPERIMENTS.md) — successful, failed, and superseded investigations.
- [Open Questions](OPEN_QUESTIONS.md) — unresolved implementation questions.
- [Roadmap](ROADMAP.md) — intended sequence.

## Reference evidence

- [Android extracted payload](REFERENCE_APK.md) — full extracted APK payload, compiled modules, verification, and analysis status.
- [Android client protocol findings](ANDROID_CLIENT_PROTOCOL_FINDINGS.md) — first-pass authentication/session, transport, conversation/streaming, upload, history, image-gallery, and Library evidence.
- [Windows desktop package](REFERENCE_DESKTOP.md) — MSIX observations and full-payload archive handoff/deferred status.

## Engineering handbook

[Architecture](ARCHITECTURE.md), [Workflow](WORKFLOW.md), [Repository Settings](REPOSITORY_SETTINGS.md), [Governance](GOVERNANCE.md), and [ChatGPT Project Instructions](CHATGPT_PROJECT_INSTRUCTIONS.md).

Private reference archives are held in personal Library under `/ChatJS-Archives`. Project Sources are intentionally empty. The Android extracted payload ZIP is verified; Windows archive work is deferred.

Record meaningful requirements, decisions, research, actions, changed files, tests, failures, limits, blockers, and handoffs in canonical docs. Keep state JSON and generated Markdown synchronized; append SESSION_LOG.
