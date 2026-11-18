# ChatJS Capability Matrix

**Current implementation status: foundation only.** Research does not mean implemented behavior. See [ChatGPT Capability and Interface Inventory](CHATGPT_CAPABILITY_INVENTORY.md) for APK evidence, public interface mapping and sources.

## Status definitions

- **Implemented:** working code, user documentation, repeatable tests.
- **Partial:** a defined subset exists; gaps are explicit.
- **Research:** official interface or product behavior is being assessed.
- **Planned:** desired scope known; implementation not started.
- **Blocked:** legal, access, technical or evidence constraint prevents implementation.
- **Not applicable:** outside the Node.js module's scope.

## Core runtime

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Client construction and lifecycle | Partial | Foundation tests cover construction, status and close only |
| Configuration and validation | Planned | No complete provider configuration |
| API-key authentication | Planned | Public API documented; no ChatJS provider |
| Sign in with ChatGPT plan usage | Research / eligibility unresolved | Open-source/local app path; ChatJS currently has an all-rights-reserved notice |
| HTTP transport | Planned | Public documented endpoints only |
| Streaming | Planned | Responses event stream documented; ChatJS stream contract absent |
| Cancellation, timeout, retry | Planned | Must be specified and tested at transport boundary |
| Concurrency and request isolation | Planned | Race, isolation and cleanup tests required |
| Typed errors | Partial | Foundation error exists; provider taxonomy undefined |
| Diagnostics | Planned | Local redacted diagnostics only; no telemetry or reporting |

## Model and conversation workflows

| Capability | Status | Public interface / evidence |
| --- | --- | --- |
| Text generation | Research | Responses API; no ChatJS implementation |
| Multi-turn application conversation | Research | Responses API / Conversations API or caller-managed history |
| Access to ChatGPT consumer conversations or memory | Blocked / not exposed by documented plan-usage OAuth | No account-context grant |
| Streaming output | Research | Responses API typed event stream |
| Model discovery | Research | `GET /v1/models`; account-specific catalog |
| Structured output | Research | Documented Responses feature |
| Function calling / custom tools | Research | Public API; application executes and secures functions |
| Web search | Research | Responses `web_search` |
| File search | Research | Public API; unavailable in plan-usage preview |
| Code Interpreter | Research | Public API; unavailable in plan-usage preview |
| Computer use | Research | Public API; app supplies environment; unavailable in plan-usage preview |
| Remote MCP / hosted connectors | Research | Public API; unavailable in plan-usage preview |

## Multimodal and APK-indicated surfaces

| Capability | Status | Evidence / boundary |
| --- | --- | --- |
| Image input / generation | Research | API input/generation documented; generation unavailable in plan-usage preview |
| Audio / transcription / text-to-speech | Research | Audio APIs documented; transcription unavailable in plan-usage preview |
| Real-time voice | Research | Realtime API; distinct from consumer app's private voice service |
| Video / screen / camera | Research | Only specific documented API routes; Android declarations do not create Node permissions |
| Files, attachments and preview | Research | Static APK indicators; public file API is a separate developer capability |
| Image editing and text processing | Research | Static APK indicators; no parity guarantee |
| Memory, custom instructions, library, projects | Research | Static APK indicators; no consumer memory/history access via plan-use OAuth |
| Search, external data, Codex, remote sessions | Research | Static APK indicators; public API tools are separate |
| Health, learning, family, finance, maps, shopping, wallet | Research | Static APK indicators; separate authorization needed for independent integrations |
| Contacts, calendar, location, camera, microphone, phone, notifications | Research | Android OS permissions do not transfer to Node.js |

## Platform and distribution

| Capability | Status | Evidence |
| --- | --- | --- |
| Node.js ESM and CommonJS | Partial | Foundation entry-point tests pass |
| TypeScript declarations | Partial | Foundation declarations; full API types pending |
| Windows, macOS, Linux | Planned | Full support matrix not defined |
| Module archive | Partial | Exact archive allowlist and CI extraction tests |
| API documentation | Partial | Root ChatJS.md describes current foundation only |

## Promotion rules

An APK resource or documented upstream API does not make a capability Implemented. Promote only after ChatJS has real code, success/failure tests, cancellation/concurrency/security coverage where relevant, matching ESM/CommonJS exports and declarations, user documentation, and an evidence-backed limitations statement. Keep standard API-key access separate from Sign in with ChatGPT plan usage.
