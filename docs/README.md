# ChatJS Project Documentation

This directory contains persistent project knowledge and the engineering handbook. The user-facing module manual is root-level [ChatJS.md](../ChatJS.md).

## Start
1. [AI Memory](AI_MEMORY.md) — continuity and permanent constraints.
2. [Continuation](CONTINUATION.md) — session protocol and “Continue”.
3. [Project State](PROJECT_STATE.md) — generated snapshot from project-state.json.
4. [Tasks](TODO.md) — priority queue.
5. [Session History](SESSION_LOG.md) — chronological record.

## Product and engineering knowledge
- [Capability Inventory](CHATGPT_CAPABILITY_INVENTORY.md) — mobile-first references and desktop Work/Codex mapping.
- [Capability Matrix](CAPABILITY_MATRIX.md) — actual implementation status.
- [Knowledge Base](KNOWLEDGE_BASE.md) — facts, sources and technical notes.
- [Decisions](DECISIONS.md) — owner requirements and design rationale.
- [Experiments](EXPERIMENTS.md) — successful, failed and withdrawn investigations.
- [Open Questions](OPEN_QUESTIONS.md) — unresolved issues.
- [Roadmap](ROADMAP.md) — intended sequence.

## Reference evidence
- [Android package record](REFERENCE_APK.md) — static mobile manifest/resource observations and limits.
- [Windows desktop MSIX record](REFERENCE_DESKTOP.md) — package identity, Electron/Node/Codex/sandbox/browser/shell observations and implementation implications.

## Engineering handbook
- [Architecture](ARCHITECTURE.md), [Workflow](WORKFLOW.md), [Repository Settings](REPOSITORY_SETTINGS.md), [Governance](GOVERNANCE.md), [Project Instructions](CHATGPT_PROJECT_INSTRUCTIONS.md).

The owner intends to clear ChatGPT Project → Sources after this review. Committed records are the durable permitted references; official APK/MSIX binaries are not stored here. Do not claim Source deletion until confirmed.

Update canonical records when knowledge changes; update project-state.json and regenerate PROJECT_STATE.md; append SESSION_LOG.md for each meaningful session.
