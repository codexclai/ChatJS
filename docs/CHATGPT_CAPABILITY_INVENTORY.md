# ChatGPT Capability and Interface Inventory

**Reviewed:** 2026-11-18. This is research, not an implementation or 1:1 compatibility claim. ChatJS currently has only its initial client foundation.

## Evidence and inspection limits

**APK package observation** means a component, permission, packaged resource, or module name is present in the user-supplied `ChatGPT.zip`. It does not prove that a feature is enabled, available to a user, or accessible through a public API.

The ZIP contains one `base.apk`. Inspection was static and limited to its binary Android manifest and high-level packaged resource/module names. No emulator or interactive app session was used. No DEX decompilation, proprietary source extraction, code copying, or asset redistribution was performed. The APK, package version, checksums, and raw manifest dump are not in this repository. Manifest permissions do not prove that a permission was granted or used; Android app permissions do not transfer to Node.js.

## APK-indicated product areas

| Area | Static package indicators | Safe conclusion |
| --- | --- | --- |
| Conversations and response delivery | Conversation-related resources and conversation streaming service declaration | Conversation/streaming components are packaged; no public third-party consumer conversation API is established. |
| Voice and audio | Voice-service resources, voice-interaction declarations, read-aloud playback service | Voice/audio integration points are present; this does not expose the app's private voice backend. |
| Files and attachments | Attachment resources and file-preview activity declaration | File/attachment surfaces are represented; formats, limits and entitlements remain unknown. |
| Images and text | Image-edit and text-processing activity aliases; drawing-related resources | Image and text-processing entry points are represented. |
| Search and data | Global-search, data-source, web and connector-related module/resource names | Search/data surfaces are represented, not their service contracts or availability. |
| Code and remote sessions | Codex-related resources and remote-session declarations | Code-oriented UI/service components are represented; they do not grant access to private consumer-app implementation. |
| Personalization and organization | Memory-settings, custom-instructions, library and project-related resource/module names | These concepts are represented; no public API for reading consumer ChatGPT memory or chats is established. |
| Health, learning, family, finance | Health Connect components and resource/module names associated with learning, family and finance | These themes are represented; this does not establish general public OpenAI endpoints for those data domains. |
| Maps, shopping, wallet, services | Resource/module names associated with maps, shopping, wallet and services | These themes appear in the package; no corresponding consumer-service API is assumed. |
| Device integration | Optional camera, autofocus, flash, microphone and telephony features; declared location, contacts, calendar, notifications, health, Bluetooth, NFC and other permissions | Native integration points are declared; they do not grant Node.js access to device permissions. |

## Documented Node.js interface map

OpenAI recommends the public **Responses API** for new model-backed integrations. The Assistants API shut down on **August 26, 2026** and must not be selected for new work. See the [Responses migration guide](https://developers.openai.com/api/docs/guides/migrate-to-responses), [Assistants migration notice](https://developers.openai.com/api/docs/assistants/migration), and [Responses reference](https://developers.openai.com/api/reference/responses/overview).

| Capability | Documented interface | Boundary |
| --- | --- | --- |
| Text generation and application-managed chats | Responses API; Conversations API or caller-managed history | API-side state is not a user's existing ChatGPT consumer conversation. |
| Streaming | Responses API typed event stream | ChatJS must define async iteration, backpressure, cancellation, timeouts and cleanup. |
| Model discovery | `GET /v1/models` | Catalog and access are account/project-specific; discover live rather than hard-code. |
| Function calling | Responses API custom/function tools | The application executes functions and owns validation, permissions and side effects. |
| Web search | Responses API `web_search` | Subject to model/account/workspace policy and source handling. |
| File search | Responses API `file_search` and vector stores | Requires separate upload, storage, privacy and deletion lifecycle. |
| Code execution | Responses API Code Interpreter | Hosted execution; not the ChatGPT app's private Codex session. |
| Computer use | Responses API computer-use tool | The application supplies and controls the environment, driver and approvals. |
| MCP/connectors | Responses API remote MCP | Remote servers, OAuth, data access and approvals are separate trust boundaries. |
| Images | Documented image input and image-generation APIs/tools | Not parity with the consumer image editor or account entitlements. |
| Audio and live voice | Audio APIs and Realtime API | Explicit model, format, credential, transport and session constraints. |
| Video / screen / camera | Only specifically documented multimodal routes | Do not assume access to the Android camera or screen-sharing experience. |
| Health, finance, wallet, shopping, family, maps, consumer memory/settings | No general ChatGPT-consumer API for these areas was established here | Independent integrations may be possible through separately authorized providers or local data; they are not access to ChatGPT's own service. |

Official guides: [text](https://developers.openai.com/api/docs/guides/text), [images](https://developers.openai.com/api/docs/guides/images), [audio](https://developers.openai.com/api/docs/guides/audio), [Realtime](https://developers.openai.com/api/docs/guides/realtime), [web search](https://developers.openai.com/api/docs/guides/tools-web-search), [file search](https://developers.openai.com/api/docs/guides/tools-file-search), [Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter), [computer use](https://developers.openai.com/api/docs/guides/tools-computer-use), and [MCP/connectors](https://developers.openai.com/api/docs/guides/tools-connectors-mcp).

## Sign in with ChatGPT and plan usage

OpenAI separately documents **Sign in with ChatGPT**. It offers identity sign-in and optional permission to use a user's ChatGPT plan for eligible Responses API requests. Plan usage is documented for open-source and locally hosted apps; paid or remotely hosted apps are directed to an interest form. It does **not** provide the user's ChatGPT conversations or other account context. See the [overview](https://developers.openai.com/siwc/token-sharing-open-source), [quickstart](https://developers.openai.com/siwc/quickstart), [models and inference](https://developers.openai.com/siwc/token-sharing-open-source/models-and-inference), and [preview limitations](https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations).

Current preview constraints include:
- HTTP Responses requests require `store:false` and `stream:true`; each request must include all required context in `input`.
- The explicit `system` role is rejected; use `instructions` or developer messages.
- HTTP `previous_response_id` and `conversation` are unsupported. WebSocket continuation is limited to the same authenticated connection and is not persistent conversation storage.
- Web search depends on model/account/workspace policy; supported custom/function tools have specific formatting rules.
- Image generation, file search, Code Interpreter, native computer use, hosted MCP/connectors, Responses `tool_search`, Files upload API, audio/video input, and transcription API are unsupported in the current plan-usage preview.
- Text, image and file inputs work only where accepted by the selected model.

ChatJS currently carries an **all-rights-reserved** notice. Public GitHub visibility does not make it open source; therefore ChatJS must not assume it qualifies for this plan-usage route. Eligibility and any approval path remain unresolved. Do not change the license or claim eligibility without the owner's explicit decision and applicable OpenAI approval/terms. If this path is later approved, use only the documented public `https://api.openai.com/v1` endpoints and OAuth flow. Do not use the consumer app's private `backend-api` endpoints.

## ChatJS integration classification

1. **Documented OpenAI API:** implement only documented public endpoints and schemas.
2. **Eligible Sign in with ChatGPT:** implement only after licensing/eligibility is confirmed and the documented OAuth flow/preview restrictions are accepted.
3. **Local Node.js capability:** implement locally where useful without claiming access to ChatGPT-owned data.
4. **User-authorized external adapter:** separate provider, explicit configuration, scoped consent and documented API.
5. **Unavailable / not established:** do not promise it or substitute private endpoints, scraping or fabricated results.

Any provider slice must define credential handling, explicit network boundaries, stream/event semantics, cancellation/backpressure, timeouts/retries, concurrency isolation, typed errors, redaction and deterministic cleanup before code is complete.

## Sources reviewed on 2026-11-18

- [Responses migration](https://developers.openai.com/api/docs/guides/migrate-to-responses)
- [Assistants shutdown and migration](https://developers.openai.com/api/docs/assistants/migration)
- [Responses reference](https://developers.openai.com/api/reference/responses/overview)
- [Sign in with ChatGPT overview](https://developers.openai.com/siwc/token-sharing-open-source)
- [Sign in with ChatGPT quickstart](https://developers.openai.com/siwc/quickstart)
- [Plan-usage inference](https://developers.openai.com/siwc/token-sharing-open-source/models-and-inference)
- [Plan-usage preview limits](https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations)
- [ChatGPT plan usage Help Center](https://help.openai.com/en/articles/12584461-using-your-chatgpt-plan-in-other-apps-and-sites)
