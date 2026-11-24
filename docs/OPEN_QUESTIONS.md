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
- [ ] How does the server validate the second Standard Integrity token's request hash (SHA-256 over canonical account_id/conversation_id/device_id/parent_message_id JSON), and what is its binding/lifetime relative to the conversation request?
- [ ] Why does the inspected native implementation require package ID com.openai.chatgpt.internal while the supplied XAPK manifest is com.openai.chatgpt, and is the provider selected or callable in the public app build?
- [ ] Why does the internal native helper's User-Agent identify ChatGPT 1.2026.209 (build 2620909) while this XAPK is 1.2026.321 (version code 2632129)?
- [ ] What are the exact JSON body fields/values and status/error behavior for /backend-api/playintegrity, including the bot_token, play_integrity_token and chat_requirement_token values seen in the worker?
- [ ] The cookie name must end in _playintegrity and it must be Secure, unexpired, first-party-domain scoped, and have a backend API path accepted by the native helper. What exact cookie name, expiry policy, rotation and deletion behavior are used? The inspected native response bridge returns bodyPatchJson: null.
- [ ] What are the precise validation and merge rules for bodyPatchJson and returned openai-sentinel-* headers before the conversation request?
- [ ] The native Android helper uses UUID.randomUUID() for device_id and persists it in SharedPreferences; what is its lifetime, rotation/reset/deletion policy, scope, and which requests require it?
- [ ] Which Windows/desktop host provider, if any, supplies equivalent genuine integrity behavior? Do not infer equivalence from the Android path.
- [ ] How should ChatJS expose unsupported platform, missing Play Services, rate limiting, retry/cooldown, expiration, cancellation and integrity failure without bypassing a required account check?

## Standard Integrity provider details now observed

The internal Android helper calls Google Play Standard Integrity provider preparation (prepareIntegrityToken / warm-up) and requestExpressIntegrityToken, each with a 30-second wait. It retries once after its provider-invalid error path by preparing a new provider. The following remain open:

- [ ] What is the complete OpenAI PlayIntegrityTokenGenerator retry/cooldown policy, beyond the observed provider refresh on one invalid-provider status?
- [ ] Which error codes trigger token retry, initialization retry, cooldown, or terminal failure in the OpenAI wrapper, and what are the exact backoff ceilings?
- [ ] What public Android build/provider selection path, if any, supplies the same first-party provider without the internal package guard?

## Integrity SDK retry and local cooldown questions

The current DEX trace observes a 300-second default local cooldown for the TOO_MANY_REQUESTS path, a static retryable-status candidate list, and a DeviceRateLimits data store. It does not reconstruct the whole retry machine.

- [ ] What is the exact symbolic meaning of each candidate status (-19, -18, -12, 0, -100, -8, -9) in the OpenAI wrapper, and which additional conditions/feature gates change retry eligibility?
- [ ] What do the additional branches (-15 and -14, among others) in the token coroutine mean? Which errors reprepare the provider, retry the token, enter cooldown, or terminate?
- [ ] What are the exact maximum attempts, delays, jitter, backoff ceilings and reset conditions? The current scan does not prove these.
- [ ] Is the 300-second local cooldown based on a monotonic or wall clock, and when/how is its marker cleared?
- [ ] Does the local cooldown marker persist across process restart? The separate DeviceRateLimits data store exists, but its relation to the in-memory/local cooldown helper is not yet clear.
- [ ] What fields, scope (device/account/provider), expiry and retention rules are represented in DeviceRateLimits? Which code paths record and discard its entries?
- [ ] Which retry counters and provider/version fields are instrumentation only? Do not port SDK metrics or export diagnostic metadata under ChatJS's zero-telemetry rule.


## Anonymous guest session and Work execution surfaces — 2026-11-24

- [ ] Reconstruct the exact Android anonymous-session create/refresh request and response (route, body, headers/cookies/tokens), including its mapping to the Unauthenticated/AnonymousSession/LoggedInSession state machine. The RootViewModel first tries the separate install-referrer AccountSelector login Los8.f → LoginGraphManager, then calls the initial anonymous fallback Lgs31.b → Lau31.G. G acquires the Lmgo0 coroutine mutex, runs Llzx.n/Lwk8 local eligibility logic and enters Lau31.E. Correction: Lau31.h/Lof70 is Statsig/experimentation (Lmx71/Lbu70), and Lau31.F invokes its G method for feature evaluation, not auth/session state. The Lis31 refresh-unauthenticated-session path reads Llzx.u local state and calls Lau31.u/E/R local transition logic; no HTTP request is visible. The separate Lau31.n → Ldt31 → Lsk8/Ld7x path is credential-backed AuthSession/DPoP token work, not established guest creation. The concrete guest HTTP create/refresh request remains unknown; global /backend-anon configuration is not the endpoint.
- [ ] Determine guest session ID generation, persistence/expiry, replacement/retirement and cleanup triggers. Lxzp0 builds sessions/guest-* using two opaque session-related strings and a hyphen; the strings sources, semantics and entropy are unknown. DEX evidence also shows retired-session cleanup but not the full retention policy.
- [ ] Trace the actual composition/caller of the AnonymousSessionLoading Compose method Losk1.a and determine whether it is reached from the root unauthenticated-session flow. A direct DEX invocation/callback to SessionManager was not found. The "Continue as Guest" string is Shop plugin UI (Li230), not a ChatGPT guest CTA, and must not be used as a trace target.
- [x] Attribute the observed /backend-anon/f/conversation* endpoint constants to their traced caller: they are consumed by LocationCookieInitializer during locationPermissionCookieSettings processing, not proven guest composer message routes.
- [ ] Trace the actual Android anonymous conversation composer/send client independently; identify its prepare/send route, exact request/response bodies, guest headers/cookies, ordering, SSE behavior and whether it uses a distinct guest endpoint family.
- [ ] Identify guest-session entitlement/usage restrictions, one-active-conversation policy, persistence boundaries and sign-in conversion prompts from actual client/service behavior.
- [ ] Determine whether Windows desktop Work has a supported signed-out/guest mode. Do not infer one from generic browser transport markers.
- [ ] Reconstruct Windows desktop Work Local's app/native-host request lifecycle and its local filesystem/process/approval boundaries without Codex CLI/app-server dependency.
- [ ] Reconstruct Android Work Cloud's task/session/progress/artifact/control protocol and its account/guest eligibility rules.
- [ ] Determine which Codex CLI workflows are materially distinct from desktop Work and therefore merit a separately exposed ChatJS capability.


- [ ] Trace who populates Lzlh1 / the Lylh1 welcome-presentation preference (including the source of Lnlh1.guestCtaCopy), whether it is remotely delivered or locally seeded, and the exact eligibility/cache/update conditions. The currently inspected manager path is PreferenceStore-backed and has no visible HTTP request.
- [ ] Trace which branch after the now-observed welcome CTA action-29 → Ltu10 → Lqik0 → Lnik0 login-child coordinator leads to anonymous-session startup, if any. The current branch reads local Lks31 state through Llzx.t and processes Lir31 login-flow events through Lau31.i/Lxs31 under the Lmgo0 mutex; it does not prove a call to the separate Lgs31.b → Lau31.G initial guest fallback or a guest-create request.

- [ ] Trace the actual Lt891 event producer(s) and callback wiring into the La991.G instance: Lq20.invoke constructs Lt891(5); Ldo1.invoke selector case 18 can construct Lt891(6) via a ConversationSidebar-hosted Lp1w callback. The La991.G branch for Lt891 launches Lmuz0 label 9 → Lgs31.b → Lau31.G. The W891.a equality branch instead forwards Lw4h0.getValue() to Lcq41.e and returns. Determine event/payload semantics and whether either callback actually reaches this coordinator; the welcome CTA action-29 path remains unconnected.

- [ ] Trace the implementation of the parent callbacks located above the two `Lt891` emitters: `Llal1.h` callers (`Lj20`, `Lss`, `Lt07`, `Ly641`) and the WebView `Ljpc.invoke` callback supplied to `Lej10.c`; and the ConversationSidebar `Le2w.c` → `Lx0w`/`Lm1w` → `Le2w.j` callback passed into `Le2w.e`. Establish the meaning of payloads 5 and 6 and whether either handler can reach `La991.G`. Static scans found no direct method-id or method-handle reference to `La991.G` outside its definition, but do not rule out dynamically supplied behavior.

- [ ] Determine whether the `Lej10.c` WebView callback, the `Llal1.h`/SettingsWorkspaceListItem callback, or the `Le2w.c` ConversationSidebar callback captures a `La991` receiver through the generic `Lv6a.H(Louf0)` virtual-dispatch bridge. The known `Le6` bridge is created in Composer / FreeThinkingGaugeNuxHost, not at the observed WebView or ConversationSidebar callback sites; no same-instance receiver binding is established.

- [ ] Trace the Statsig SDK refresh/acquisition path behind Lmx71 / Lix71 / Lzw71. Lfs10 declares the typed welcome_* keys and Lxr10.h evaluates them to build Lplh1 (serializer Lnlh1), which Ltl30 persists inside Lcmh1 / Lylh1. Remote config fetch route/payload, cache expiry/persistence, refresh schedule and offline/default precedence remain unknown.
- [ ] Reconstruct the upstream lifecycle trigger for `Lvlh1.c` (`Ltp3.P` / `Lslh1`) and its feature/eligibility conditions. Keep later `Lz840.d` / `Ljb40` account/profile service calls separate from welcome configuration until their result is shown to feed `Lnlh1`.
- [ ] Trace the Statsig SDK refresh/acquisition path behind Lmx71 / Lix71 / Lzw71: identify the actual config download route/payload, when welcome_* parameters are refreshed, cache expiry/persistence and offline/default precedence. Android declares the named welcome_* keys in Lfs10 and evaluates them through Lxr10.h; current DEX findings expose app-facing cached parameter evaluation but not the remote refresh contract. Do not port Statsig telemetry/exposure logging into ChatJS.
- [ ] Identify the upstream producer and meaning of the conversation coordinator's `Lkmk0` event and its `a`/`b` payload; `Ljqk0.G` launches `Lps30` label 16 for a guarded `MessageNotFoundException` / no-messages-all-unsupported path and calls `Lgs31.b`. Resolve the numeric `Llnp0` reason mapping and whether this local session restart is followed by a separate network guest-create request.
