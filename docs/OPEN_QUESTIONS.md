# ChatJS Open Questions

Track unknowns and blockers. Close an item only after its answer and evidence are recorded.

## ChatGPT client implementation

A first-pass static Valdi module scan is documented in [ANDROID_CLIENT_PROTOCOL_FINDINGS.md](ANDROID_CLIENT_PROTOCOL_FINDINGS.md). It identifies the client account/session services, bearer transport, model/chat-requirements APIs, conversation/SSE pipeline, upload clients, history, image-gallery, and Library modules. Exact method-level behavior remains to be traced.

- [ ] Which DEX/Valdi modules implement request construction, endpoint selection, transport, streaming, and response parsing?
- [ ] What is the exact client authentication/sign-in/session/refresh lifecycle, and how can it be implemented for a Node.js consumer while preserving account authorization and credential security?
- [ ] Which message/conversation/project/file/voice/image/search/tool payload schemas and state machines are present in the shipped clients?
- [ ] Which client components depend on Android/Windows APIs and which can be ported directly or shared in Node.js?
- [ ] What repeatable tests can verify request/response compatibility and behavior without embedding personal account/session material in fixtures or logs?

## General-purpose Node.js API

- [ ] Define the client configuration, connection lifecycle, session persistence, and event model for different consuming applications.
- [ ] Define streaming/backpressure, retries, timeouts, cancellation, concurrency, typed errors, and cleanup based on observed client behavior.
- [ ] Define portable conversation/thread/context/project APIs and explicit local persistence.
- [ ] Define how optional host adapters advertise capability availability and handle unsupported host facilities without making the core device-specific.

## Ownership and governance

- [ ] Confirm rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting contributors.
- [ ] Verify private vulnerability reporting, secret scanning, and push-protection availability.

## Reference retention

- [ ] Android archive is retained in personal Library and Project Sources are intentionally empty; no re-upload is required.
- [ ] Windows extracted-payload archive work is deferred by owner instruction. Current Library item is metadata-only; the remote archive reported in the prior chat is not currently reverified. Resume only if asked.

Every open question should map to an actionable TODO and identify the evidence needed. Never silently turn an unknown into an assumption.

## Current Android Sentinel and device-integrity questions

The 2026-11-24 scan of ChatGPT Android 1.2026.321 found distinct requirements-integrity and device-integrity provider interfaces, plus a native Google Play Integrity implementation. The following are still open; do not replace them with assumptions.

- [ ] What is the exact request/response JSON schema for /backend-api/sentinel/chat-requirements, including the token, Turnstile, proof-of-work and app_attest_challenge fields?
- [ ] What does app_attest_challenge mean in this Android build, and is it consumed by a provider other than the native Play Integrity path?
- [ ] How is the server challenge/nonce transformed and bound to the Play Integrity token and account/conversation request?
- [ ] What exact input tuple does the helper transform for the second Play Integrity token? The invoke references accountId, conversationId and parentMessageId plus another unresolved string argument; how is that token bound server-side?
- [ ] Why does the inspected native implementation require package ID com.openai.chatgpt.internal while the supplied XAPK manifest is com.openai.chatgpt, and is the provider selected or callable in the public app build?
- [ ] Why does the internal native helper's User-Agent identify ChatGPT 1.2026.209 (build 2620909) while this XAPK is 1.2026.321 (version code 2632129)?
- [ ] What are the exact JSON body fields/values and status/error behavior for /backend-api/playintegrity, including the bot_token, play_integrity_token and chat_requirement_token values seen in the worker?
- [ ] What cookie name/scope/lifetime is required, how is it retained or reused by the native flow, and what later request(s) depend on it? The inspected response bridge returns bodyPatchJson: null.
- [ ] What are the precise validation and merge rules for bodyPatchJson and returned openai-sentinel-* headers before the conversation request?
- [ ] The native Android helper uses UUID.randomUUID() for device_id and persists it in SharedPreferences; what is its lifetime, rotation/reset/deletion policy, scope, and which requests require it?
- [ ] Which Windows/desktop host provider, if any, supplies equivalent genuine integrity behavior? Do not infer equivalence from the Android path.
- [ ] How should ChatJS expose unsupported platform, missing Play Services, rate limiting, retry/cooldown, expiration, cancellation and integrity failure without bypassing a required account check?
