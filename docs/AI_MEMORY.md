# ChatJS AI Memory

**Read this first in every ChatJS chat.** This document defines how separate conversations maintain one continuous project context.

## Purpose

Chats are temporary work sessions; the live repository and ChatJS Project Sources are the durable shared memory. Every new chat must reconstruct what the project is, what is known, why decisions were made, what has been tried, what remains open, and what to do next. Never treat a new conversation as a new project.

Continuity comes from disciplined reading and writing of project records, not hidden model memory.

## Source-of-truth order

1. Live GitHub repository on **main**: authoritative current code and committed history.
2. docs/project-state.json: structured current state; PROJECT_STATE.md is generated from it.
3. /docs: shared project context, knowledge, tasks, decisions, experiments, history and handoff.
4. ChatJS Project Instructions and ChatJS Project Sources: user requirements and reference materials.
5. Current chat: latest explicit user direction can supersede older decisions; persist durable changes.
6. Model assumptions or recollection: never override repository evidence.

When records conflict, inspect the live repository and latest user direction, resolve the conflict explicitly, and record the correction.

## Non-negotiable project constraints

- **main only:** this repository must have only the main branch. Work directly on main. Never create, delete, rename, switch to or publish another branch; never use branch/ref creation or deletion operations. Check the live branch list at each new chat. If another branch unexpectedly exists, do not alter or delete it; report it and continue only on main.
- Do not configure or propose repository topics, branch protection or rulesets.
- No product telemetry, analytics, tracking, ads, profiling, hidden collection, background reporting, phone-home requests, remote diagnostics or telemetry dependencies. Never transmit usage data. Network calls must be necessary for an explicit operation and go only to a configured, documented, authorized service.
- No fake, canned, predefined, hardcoded, demo-only, placeholder or no-op functionality presented as real. Test-only fixtures are allowed only inside tests and must never ship.
- No bloatware, pointless dependencies, generic filler or unrelated files/features. Every addition must serve ChatJS.

## Required reading in every new chat

1. AI_MEMORY.md and CONTINUATION.md.
2. PROJECT_STATE.md and project-state.json.
3. TODO.md and SESSION_LOG.md.
4. DECISIONS.md and KNOWLEDGE_BASE.md.
5. EXPERIMENTS.md and OPEN_QUESTIONS.md.
6. CAPABILITY_MATRIX.md, ROADMAP.md, ARCHITECTURE.md and WORKFLOW.md.
7. Root ChatJS.md and README.md.
8. Search ChatJS Project → Sources for ChatGPT.zip; read REFERENCE_APK.md.

Then inspect the live main branch, branch list, recent commits, working code, open issues/PRs and CI results. Read enough history to understand unfinished work and prior attempts.

## Canonical document responsibilities

| Information | Canonical location | Purpose |
| --- | --- | --- |
| Shared AI memory rules | AI_MEMORY.md | Reading order, evidence, persistence and project constraints |
| Session start/end and “Continue” | CONTINUATION.md | Work protocol and handoff |
| Current structured state | project-state.json | Machine-readable project snapshot |
| Human-readable current snapshot | PROJECT_STATE.md | Generated summary |
| Open tasks and priority | TODO.md | One authoritative task queue |
| Completed work and chronology | SESSION_LOG.md | Append-only history |
| Decisions and rationale | DECISIONS.md | Accepted decisions and reversals |
| Verified facts and sources | KNOWLEDGE_BASE.md | Durable research and technical knowledge |
| Successful and failed investigations | EXPERIMENTS.md | Reproducible experiment history |
| Unknowns, blockers, risks | OPEN_QUESTIONS.md | Actionable unresolved items |
| Feature status | CAPABILITY_MATRIX.md | Truthful implementation inventory |
| Intended delivery sequence | ROADMAP.md | Future plans, not support claims |
| Technical design | ARCHITECTURE.md | Module design and constraints |
| Development process | WORKFLOW.md | Normal engineering lifecycle |
| Actual module API | Root ChatJS.md | User-facing product documentation |
| APK provenance | REFERENCE_APK.md and Project Sources | Source and observations |

Use familiar document names and clear structure. Avoid duplicating the same fact; link to its canonical record.

## Evidence labels

- **Verified:** established by current code/tests or authoritative documentation.
- **Observed:** seen in the APK or directly reported by the user, not a public API guarantee.
- **Inferred:** plausible interpretation that needs validation.
- **Planned:** intended future behavior, not implemented.
- **Blocked/Unavailable:** prevented by access, legal, technical or missing-evidence constraints.

For researched facts, preserve source URL/path, research date, scope, limitations, confidence and implementation consequence. Revalidate changing facts.

## What must be remembered

Persist durable requirements, corrections, design decisions and rationale, public API behavior, evidence and references, capability feasibility, successful/failed experiments, test results, bugs, open questions, risks, current work and exact next actions.

Do not store secrets, credentials, private user data, unsupported guesses as facts, or copied proprietary app code/assets.

## Task continuity

Keep tasks actionable and prioritized. Preserve unfinished tasks and explain blockers/dependencies. Before repeating an experiment, inspect its history and state what is different. Mark a capability complete only when code, tests and docs substantiate it.

## End-of-session procedure

1. Commit coherent code and related documentation directly to main.
2. Update project-state.json and regenerate PROJECT_STATE.md.
3. Update TODO.md and append a dated SESSION_LOG.md entry with work, files, test outcomes, commit references, blockers and next action.
4. Update DECISIONS.md, KNOWLEDGE_BASE.md, EXPERIMENTS.md, OPEN_QUESTIONS.md, CAPABILITY_MATRIX.md and ChatJS.md when relevant.
5. Run npm run check and verify ChatJS.tar.gz; record actual outcomes only.
6. Inspect the final tree for secrets, binaries, unrelated files and proprietary content.
7. Leave an exact handoff that another chat can follow without asking what happened.

Many chats should behave like successive sessions of one engineering effort through shared repository records and repeated reading—not assumptions about automatic memory sharing.