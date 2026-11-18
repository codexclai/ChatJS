# ChatJS Documentation

This documentation is designed to be the durable operating manual for the project, including when work moves between separate ChatGPT conversations.

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
- [Reference APK](REFERENCE_APK.md) — provenance, inventory, evidence limits, and permitted use of the user-supplied Android artifact.

## Repository operations

- [Repository settings checklist](REPOSITORY_SETTINGS.md) — security, branch protection, metadata, and manual settings that could not be applied through the connector.
- [Governance and rights](GOVERNANCE.md) — project ownership model, public visibility, contribution restrictions, and limitations of repository protection.
- [Session log](SESSION_LOG.md) — append-only summary of completed work and important discoveries.
- [ChatGPT Project Instructions](CHATGPT_PROJECT_INSTRUCTIONS.md) — compact prompt to paste into the ChatGPT Project settings.

## Maintenance rule

Documentation is part of the product. Every feature, behavior, compatibility claim, breaking change, security decision, unresolved limitation, and important experiment must be recorded where future maintainers can find it. The machine-readable project snapshot lives in .project/state.json; docs/PROJECT_STATE.md is generated from it and checked by CI.
