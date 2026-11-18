# ChatJS Documentation

This documentation is the durable operating manual for the ChatJS project, including when work moves between separate ChatGPT chats.

## Start here

1. [Continuation guide](CONTINUATION.md) — mandatory reading at the beginning and end of every work session.
2. [Project state](PROJECT_STATE.md) — generated snapshot of what exists, what does not, and what happens next.
3. [Task queue](TODO.md) — prioritized, actionable work.
4. [Roadmap](ROADMAP.md) — phased delivery plan.
5. [Capability matrix](CAPABILITY_MATRIX.md) — broad ChatGPT feature inventory and explicit implementation status.

## Engineering references

- [Architecture](ARCHITECTURE.md) — design principles, components, boundaries, and proposed interfaces.
- [Workflow](WORKFLOW.md) — normal engineering lifecycle, testing, documentation, and cross-chat handoff.
- [Decisions](DECISIONS.md) — architectural and project decisions with rationale.
- [Reference APK](REFERENCE_APK.md) — provenance and safe use of ChatGPT.zip stored in the ChatJS Project's Sources in ChatGPT.

## Repository operations

- [Repository settings checklist](REPOSITORY_SETTINGS.md) — security, branch protection, metadata, and manual settings that could not be applied through the connector.
- [Governance and rights](GOVERNANCE.md) — project ownership model, public visibility, contribution restrictions, and limitations of repository protection.
- [Session log](SESSION_LOG.md) — chronological summary of completed work and discoveries.
- [ChatGPT Project Instructions](CHATGPT_PROJECT_INSTRUCTIONS.md) — instructions for the ChatJS Project's Instructions field.

## Maintenance rule

Documentation is part of the product. Every feature, behavior, compatibility claim, breaking change, security decision, unresolved limitation, and important experiment must be recorded where future maintainers can find it. The machine-readable project snapshot lives in .project/state.json; docs/PROJECT_STATE.md is generated from it and checked by CI.
