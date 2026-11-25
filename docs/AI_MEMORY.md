# ChatJS AI Memory

**Read first in every ChatJS chat.** Live GitHub `main` and committed `/docs` records are the durable project memory.

## Source of truth

1. Live GitHub `main`: authoritative code and history.
2. `docs/project-state.json`: structured state; `PROJECT_STATE.md` is generated.
3. `/docs`: project direction, requirements, technical references, decisions, tasks, experiments, risks, and handoffs.
4. The owner's latest explicit direction and current conversation.
5. **ChatJS Project → Sources is the normal and primary location** for supplied client packages. The personal Library is outside the normal workflow: do not depend on it or treat it as a primary or routine source. Access it only for a concrete task when particular material is genuinely useful, necessary, and actually accessible. Any material used there for ChatJS must be inside a folder named `ChatJS Project`, containing only authentic, necessary source material or useful original findings.
6. Verified package content and source code take precedence over assumptions in old assistant messages.

## Product identity and goal

ChatJS is one conventional, general-purpose Node.js client module that brings together the actual client-side capabilities and workflows of **ChatGPT mobile, ChatGPT desktop, and Codex CLI** under the single package name and API, **ChatJS**. These are three source/client families consolidated into one Node.js module—not three separate packages and not three runtime products that consumers must install or launch independently.

The aim is to adapt their real client-side behavior into Node.js: ChatGPT mobile and desktop sessions/conversations and their Work surfaces, plus the Codex CLI's ChatGPT-backed coding-client workflows and local coding-agent capabilities. ChatJS itself implements those workflows in Node.js using verified first-party behavior. It must not require users to install or spawn the separate Codex CLI executable, run a Codex app-server, or embed the app-server as a dependency. The Codex source archive is essential reference material for implementing its in-scope client behavior, not a substitute runtime.

Keep the actual product boundaries accurate: Android ChatGPT Work is the cloud execution surface; Windows ChatGPT desktop Work is the local execution surface; Codex CLI is a distinct terminal-oriented coding client/capability family. Consolidating them in ChatJS does not mean treating these three experiences as identical or merging their different protocols into one guessed transport. Expose them through one coherent Node.js API while retaining the source-specific session, protocol, security, and execution semantics.

ChatJS is a normal reusable Node.js library—not a replacement ChatGPT app, server, framework, daemon, generalized multi-AI-provider SDK, or unrelated automation platform. ChatGPT remains the only AI service/product target. Optional host adapters are only for genuine host facilities that are not universal (such as filesystem/process/browser/desktop integration), not alternative AI providers.

The goal is to adapt the real client-side implementation to Node.js—not merely imitate visible feature names, not build a superficial clone, and not recreate ChatGPT's server. Use the actual supplied application package contents as the technical basis: client code, compiled modules, request/response construction, payload schemas, serialization, transport, connection handling, authentication/session flows, local persistence, tools, and other shipped client components. A detail absent from public developer documentation must not be rejected or dismissed when it is evidenced by the supplied official client code. The client code is the implementation reference.

The target is the real consumer ChatGPT product and its legitimate account/service behavior, not OpenAI Platform APIs, API keys, or a substitute model provider. Do not represent any feature as implemented until its Node.js behavior is actually built and verified. Never fake generated output.

ChatJS must remain general-purpose: usable by different Node.js applications, operating systems, hosts, devices, and deployment environments. Do not assume it is itself a phone/desktop app or that any particular camera, microphone, screen, browser, or OS facility is present. Expose host-dependent capabilities through optional integrations/adapters so consumers can use the module without those facilities.

## Product execution and session modes — owner direction, 2026-11-24

- ChatJS independently implements the actual ChatGPT mobile/desktop client communication and the Codex CLI client capability family in one Node.js module. Do not spawn or require the separate Codex CLI executable, a standalone Codex app-server, or an embedded app-server runtime. The pinned Codex source snapshot is an implementation reference for native Node.js behavior, not a runtime dependency. See CODEX_SOURCE_FINDINGS.md.
- Windows ChatGPT desktop Work is the local execution surface; Android ChatGPT Work is the cloud execution surface; Codex CLI is a distinct terminal-oriented coding-client capability family. Keep all three client flows and their protocols distinct while consolidating their usable APIs in ChatJS. Do not mistake the packaged Windows coding-agent app-server path for all Windows Work behavior.
- Accountless ChatGPT means the genuine logged-out guest session, separate from an authenticated account and from Temporary Chat while signed in. Android 1.2026.321 now has method-level evidence for its Unauthenticated/AnonymousSession/LoggedInSession state enum, serialized session metadata, SessionManager startup/logout/refresh paths, and sessions/guest-* storage/retirement cleanup. The observed /backend-anon/f/conversation* constants are consumed by LocationCookieInitializer during locationPermissionCookieSettings processing; they are not proven guest composer routes. The post-logout Lau31.F → Lau31.E method trace currently reconciles local auth/session state through Lv2f0/Lvv31 and shows no HTTP create request in those coroutine bodies. Lxzp0 builds local sessions/guest-* paths from two opaque strings and a hyphen, without proving UUID generation or server origin. AnonymousSessionLoading is a Compose method whose caller/callback has not been linked to SessionManager. The "Continue as Guest" phrase belongs to the Shop plugin UI model Li230, not ChatGPT. The client does configure backend-api and backend-anon global roots (Lvwo0/Lp6t) and an Lr10 local descriptor labelled anonymous-session, but this is not proof of a server-issued guest token or create request. The Lr10 descriptor is consumed by QrLoginApi; its observed /backend-api/qr-code/details and /backend-api/qr-code/action routes are QR sign-in/review operations, not guest conversation routes. The initial RootViewModel sequence first tries install-referrer AccountSelector login (Los8.f → LoginGraphManager) and then calls the distinct Lgs31.b → Lau31.G anonymous fallback; Los8.f is not guest creation. Lau31.G acquires Lmgo0 coroutine mutex, runs Llzx.n/Lwk8 local session/model/feature evaluation, then enters Lau31.E. Lpb11/Lq5d1/Ldrk0 and Lau31/Lsk8/Lcn8/Lvv31 identify coordinator, user-scope, logout cleanup, AuthRepository/AuthStorage and local DataStore dependencies; inspected methods are local state/credential/cleanup logic, not HTTP. Important correction: Lau31.h/Lof70 is Statsig/experimentation (Lmx71/Lbu70), not auth/session; Lau31.F's Lof70.G is a feature evaluation. Lis31's unauthenticated refresh calls Lau31.u on a local snapshot and performs state transition, not HTTP. Separate Lau31.n/Ldt31/Lsk8/Ld7x AuthSession/SessionLogin path is credential-backed DPoP/token refresh, not established guest creation. The guest network request remains untraced. The actual guest create/refresh request and composer send schemas remain open; see ANDROID_CLIENT_PROTOCOL_FINDINGS.md.
- Windows desktop guest Work is unverified. Do not infer it from a generic anonymous browser-transport marker.
- The current runtime now includes a generic bounded/cancellable SSE parser with CommonJS/ESM/TypeScript coverage. It does not perform network requests, authenticate, or decode product-specific ChatGPT events. No ChatGPT session, conversation, or Work connection is implemented.

## Accepted product-quality target

The owner requires ChatJS to pursue comprehensive all-in-one functionality, maximum practical production quality, broad portability, dynamic capability/protocol adaptation, extensive safe customization and control, and a user-friendly API. docs/PRODUCT_STANDARD.md is the normative, detailed requirement and acceptance gate. This target does not claim present implementation or guarantee every feature on every host forever. Maintain a capability registry and compatibility evidence as implementation develops; never bypass account authorization, entitlements, first-party security, rate limits or cooldowns; preserve zero telemetry and no unsolicited network activity. The current runtime remains foundation-only.

## Current Project Sources — verified 2026-11-24

- Android: `ChatGPT-Android.xapk`, 123,574,190 bytes. This is an app bundle containing the base APK and required splits, not one standalone APK. ZIP integrity passed; SHA-256 matched the download provider's published hash `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`. The provider hash match is not an independent malware scan or signing-certificate verification.
- Windows: `ChatGPT-Windows.msix.part001` (400,000,000 bytes) and `ChatGPT-Windows.msix.part002` (396,523,063 bytes). These sequential chunks reconstruct one official x64 installer; neither chunk is independently installable. Reassembly was verified byte-for-byte against the original: 796,523,063 bytes, SHA-256 `561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`.
- Codex: CodexCLI.zip, an official openai/codex source snapshot pinned to commit 50aeac27d825007a0ac6bd846087ed4e7095bdb3, 28,071,441 bytes, SHA-256 1ff13fc6e312171f487b0e0f88de302c27c72c9ac20f6bd54325fdee343d66eb. Uploaded to Project Sources. It is protocol/behavior evidence only, not a ChatJS CLI or app-server dependency; see CODEX_SOURCE_FINDINGS.md.
- The temporary remote download workspace for the Android and Windows pieces was deleted after verifying their three Project Sources files. CodexCLI.zip was added subsequently as a separate official source snapshot. Retrieve source packages from Project Sources when needed; do not expect remote working copies.
- Current package inspection (2026-11-24): ChatGPT-Android.xapk is version 1.2026.321 (version code 2632129); its base APK has 5,080 entries, ten DEX files and 111 Valdi modules. The source SHA-256 and ZIP CRC are verified. A partial DEX method scan observed a native internal-package-only Google Play Integrity exchange, a 256-byte random nonce, an app-private UUID.randomUUID device_id, a device-verification cookie and an X-Sentinel-Payload bot_token header. Public-build availability remains unresolved; see ANDROID_CLIENT_PROTOCOL_FINDINGS.md. This is not complete decompilation or a working ChatJS integration.

## Persistent ChatJS browser profile

The persistent browser profile named **ChatJS** is the sole default reusable profile for all ChatJS browser work. It already has the owner's Google and ChatGPT sessions authenticated. Always use it for browser-based ChatJS tasks.

Use a separate browser session only when genuinely required for temporary or disposable work. Keep it temporary; never save it as another reusable profile or replace ChatJS with it.

Never sign out of Google or ChatGPT in the ChatJS profile. Never clear its cookies, site data, local storage, or saved sessions; never reset, delete, replace, or recreate it. Avoid actions that could invalidate either login. Preserve the authenticated session and save profile changes. Do not expose credentials, cookies, tokens, or private account/session data. Normal permissions, entitlements, and first-party security checks still apply.

## Historical extracted-payload research — verified 2026-11-20

### Android

Historical extraction archive: `/ChatJS-Archives/ChatJS-Android.zip` (59,454,036 bytes at the 2026-11-20 verification). This is retained as historical research context, not a normal source dependency. Do not access it unless a specific task genuinely needs that material and it is available.

The archive contains 4,989 ZIP entries: all 4,987 extracted APK payload entries plus a README and structured JSON inventory. The APK payload entries total 106,501,945 uncompressed bytes. The inventory includes ten compiled DEX files and 121 compiled Valdi modules. ZIP CRC testing found no corrupt member. The original APK container is not nested in this archive.

This is the full extracted APK payload tree, not the earlier metadata-only dossier. It contains compiled client implementation material and resources. A first-pass Zstandard-decompressed Valdi module scan is recorded in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`; it identifies real account/session, bearer transport, chat-requirements, conversation/streaming, upload, history, image-gallery, and Library components/request paths. Full method-level reconstruction and behavior tracing remain incomplete.

### Windows

Historical note from 2026-11-20: `/ChatJS-Archives/ChatJS-Windows.zip` was a 418,238-byte metadata/reference ZIP with seven entries, not the full extracted desktop application payload. This is not a current source dependency.

A preceding conversation recorded a larger remote Windows extraction, but its transfer was incomplete and it was not independently reverified. Do not rely on or claim access to that remote archive.

### Sources and repository retention

The current installer files are held in ChatJS Project → Sources, not public Git. Do not commit official APK/MSIX files, extracted third-party application payloads, credentials, or account/session material to the repository. Keep independently authored findings, code, tests, and technical decisions in Git.

## Product and engineering constraints

- Node.js only; maintain ESM, CommonJS, and accurate TypeScript.
- Implement the actual ChatGPT client-side behavior evidenced by the supplied application packages. Do not substitute OpenAI Platform APIs, API keys, a different inference provider, or invented responses for the target ChatGPT experience.
- Reproduce the relevant legitimate client request/response, connection, authentication/session, serialization, and transport behavior from the package evidence. Do not call an interface nonexistent or out of scope solely because public API docs do not describe it.
- Do not bypass user authentication, account authorization, entitlements, access controls, or security mechanisms. Runtime authentication must be user-authorized and credentials/session material protected; never hardcode, log, or commit secrets.
- Do not assume access to account data or an app feature merely because code exists; implement and test the actual flow before making claims.
- No telemetry, analytics, tracking, ads, profiling, hidden collection, crash uploads, phone-home, background reporting, remote diagnostics, or telemetry dependencies.
- No unsolicited network requests or automatic content uploads. Network activity must be part of an explicit ChatJS operation and limited to its intended function.
- No fake/canned/predefined/hardcoded/demo/placeholder/no-op production behavior. Test fixtures/mocks are tests-only.
- No filler, bloat, unrelated features, pointless abstractions, or unjustified dependencies.
- Every capability evidenced by the supplied first-party clients remains eligible for coverage. Feature-domain labels do not restrict scope; actual client/source support, legitimate service behavior, host capabilities, authorization, entitlements, privacy, and security determine implementation.
- Host/device features are optional; do not make the core assume camera, microphone, screen, or a specific permission model.
- Main only. Never create, delete, rename, switch, or publish another branch or worktree. Never force-push. Do not configure branch protection, rulesets, or repository topics.

## Required reading every chat

1. `AI_MEMORY.md`, `CONTINUATION.md`.
2. `PROJECT_STATE.md`, `project-state.json`, `TODO.md`, `SESSION_LOG.md`.
3. `DECISIONS.md`, `KNOWLEDGE_BASE.md`, `EXPERIMENTS.md`, `OPEN_QUESTIONS.md`.
4. `CAPABILITY_MATRIX.md`, `CHATGPT_CAPABILITY_INVENTORY.md`, `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`, `REFERENCE_APK.md`, `REFERENCE_DESKTOP.md`, CODEX_SOURCE_FINDINGS.md`.
5. `ROADMAP.md`, `ARCHITECTURE.md`, `PRODUCT_STANDARD.md`, `WORKFLOW.md`, root `ChatJS.md`.
6. Inspect live `main`, complete branch list, recent commits/tree, issues/PRs, and CI.

## Canonical records

| Information | File |
| --- | --- |
| Memory/continuity | `AI_MEMORY.md` / `CONTINUATION.md` |
| State/tasks/history | `project-state.json` / `PROJECT_STATE.md` / `TODO.md` / `SESSION_LOG.md` |
| Decisions/research | `DECISIONS.md` / `KNOWLEDGE_BASE.md` |
| Experiments/unknowns | `EXPERIMENTS.md` / `OPEN_QUESTIONS.md` |
| Capabilities | `CAPABILITY_MATRIX.md` / `CHATGPT_CAPABILITY_INVENTORY.md` |
| Package/protocol findings | `REFERENCE_APK.md` / `ANDROID_CLIENT_PROTOCOL_FINDINGS.md` / `REFERENCE_DESKTOP.md` |
| Architecture/workflow | `ARCHITECTURE.md` / `PRODUCT_STANDARD.md` / `WORKFLOW.md` / `ROADMAP.md` |
| Public API | Root `ChatJS.md` |
| Project operating instructions | `CHATGPT_PROJECT_INSTRUCTIONS.md` |

## Evidence and documentation

Use Verified, Observed, Inferred, Planned, Blocked, or Out of scope. Preserve archive paths/names/sizes, verification, sources/dates, and actual limitations. Distinguish extracted code from completed analysis, and intended compatibility from tested Node.js behavior.

Record meaningful requirements, decisions, research, actions/files, tests/CI, failures, limits, risks, blockers, and handoffs during the same session. Correct affected references, preserve chronology, and leave no durable knowledge only in chat. Never imply invisible monitoring.

## End of session

Complete a coherent work unit. Update `project-state.json` and regenerate `PROJECT_STATE.md`; update `TODO`, `SESSION_LOG`, and affected docs. Run `npm run check`, build/inspect `ChatJS.tar.gz`, verify CI where possible, inspect the final tree and branch list, and commit on `main`. Record actual results, blockers, and next actions. Never claim unverified behavior.

### Further Android integrity trace — 2026-11-24

The internal native Android path's second Standard Integrity request hash is canonical JSON in account_id/conversation_id/device_id/parent_message_id order, with string escaping, UTF-8, SHA-256 and lowercase hexadecimal. It uses Google Play Standard Integrity prepare/warm-up and request-express-token operations with 30-second waits and one observed provider-invalid refresh/retry path. The first token is bound to a 256-byte SecureRandom URL-safe/no-wrap Base64 nonce; the cookie exchange validates _playintegrity, Secure, expiry, trusted domain and backend endpoint path. Origin restrictions, no-redirect HTTP, 30-second network timeouts, 256 KiB body cap and task cancellation are documented. Public app availability remains unproven due the internal package guard. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

### Integrity SDK cooldown and retry evidence — 2026-11-24

The Android integrity SDK uses a 300-second local TOO_MANY_REQUESTS cooldown and exposes remaining milliseconds when active. Its candidate retry status list is -19, -18, -12, 0, -100, -8 and -9, but the helper also checks a feature/configuration gate and other branches are not fully reconstructed. A named DeviceRateLimits store reads, expires, filters and records rate-limit entries; exact scope/schema and relation to the cooldown marker remain open. SDK retry counters and Play Services/Store metadata are instrumentation: never port/export them as telemetry. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


- Android guest-welcome evidence (2026-11-24): Lnlh1 is the serializer for Lplh1, which carries guestCtaCopy/CTA flags; WelcomeLanguageEnrollment reads it through local PreferenceStore Lzlh1 (global_ namespace); Lvlh1 records anonymous_welcome; Lxr10 maps the copy/flags into welcome/composer UI state under Statsig gates, including skip. The welcome CTA action-29 path is now traced through Lgs10/Ltu10/Lqik0 to Lnik0 login-child coordination. That flow reads the current Lks31 wrapper via Llzx.t and processes Lir31 login-flow events through Lau31.i/Lxs31 under the Lmgo0 mutex, using local state reconciliation. This does not prove it invokes the separate Lgs31.b → Lau31.G initial guest fallback or creates a guest session. Preference population and guest HTTP create/refresh/composer routes remain unknown. Do not port Android instrumentation as ChatJS telemetry.


- Additional Android guest-start path (2026-11-24): Lej6.invoke creates La991; the La991.G(Louf0) event handler checks Lw891.a and Lcq41.e, then runs Lmuz0 branch 9 → Lgs31.b → Lau31.G. This is a second event-gated caller of local SessionManager startup, not yet tied to welcome CTA action-29. Its ChatgptClientMarkerUserSessionBootstrapRequestType marker is instrumentation and must not be ported as telemetry. No guest HTTP create/refresh or composer protocol is established.


- Correction to the 2026-11-24 guest-start event trace: La991.G handles W891.a by forwarding current Lw4h0 state through Lcq41.e and returning; it is **Lt891** that dispatches Lmuz0 label 9 → Lgs31.b → Lau31.G. Candidate Lt891 producers are Lq20.invoke (payload 5) and Ldo1.invoke selector case 18 (payload 6, null-Lh70 branch) through generic Function1 callbacks. The latter is hosted by Lp1w/Le2w.e ConversationSidebar UI; the former is in Lq20 WebView callbacks. Callback targets into the La991 instance are not proven. Do not conflate W891 with guest startup or either candidate UI with an established runtime trigger. This remains local state transition evidence, not HTTP guest creation.


- Android guest-start callback research (2026-11-25): `Lq20.invoke` forwards `Lt891(5)` through a generic `Function1` supplied by `Llal1.h` callers or the WebView-host `Lej10.c`/`Ljpc.invoke` path. `Ldo1.invoke` selector case 18 forwards `Lt891(6)` through `Lp1w` → `Le2w.e` → `Le2w.j` and parent `Le2w.c` ConversationSidebar inputs. Their callback implementations and payload meanings remain unknown. No direct method-id or method-handle reference to `La991.G` exists outside its definition in the ten DEX files; this does not exclude dynamic behavior. Keep the event paths unconnected to the coordinator and welcome CTA until proven.


- Android callback evidence correction (2026-11-25): `La991` extends `Lv6a`; `Lv6a.H(Louf0)` dispatches virtually to `G(Louf0)`, so a generic callback can reach `La991.G` if it captures that receiver. `Le6` implements this bridge but is observed under Composer / FreeThinkingGaugeNuxHost, not statically connected to the WebView or ConversationSidebar event callbacks. Their actual receiver bindings remain unknown. No guest HTTP create/refresh or composer send protocol is identified.

- Android welcome preference writer (2026-11-25): `Le7f1` defines local `welcome_language_opportunity` key (Lap6/Lxlh1 serializer), default `Lylh1(null,false,null)`. `Lvlh1.c` → `Ltl30` reads the key, evaluates Statsig-derived `Lplh1`, collects local locale/app/user-install context, builds `Lcmh1`, and updates `Lylh1` through `Lzyv0.m` / `Lhi41` branch19 / `Lylh1.a`. The `Lnlh1` presentation model and `guestCtaCopy` source are not proven to flow through this path. Later account/profile repository operations in the coroutine are not identified as welcome fetches. No guest session or composer endpoint is established; `anonymous_welcome` remains excluded instrumentation.

- Android welcome Statsig keys (2026-11-25): Lfs10 declares welcome, welcome_skip_available, welcome_button_copy, welcome_language_presentation, welcome_language_suggested_tags, welcome_language_configuration_version, welcome_disclosure_use_combined_disclosures, welcome_disclosure_use_alternative_subtitle, welcome_disclosure_hide_subtitle, welcome_disclosure_shorten_accuracy_disclosure, and welcome_disclosure_guest_cta_copy. Lxr10.h(Lof70) builds Lplh1; Lnlh1 is its serializer. Ltl30 embeds Lplh1 in Lcmh1 and writes it inside Lylh1. Lmx71 is the app-facing StatsigManager and wraps Lix71/Lzw71 SDK cache/evaluation state; Llmt0 is a separate SharedPreferences override/default store. Remote Statsig fetch/cache expiry/offline precedence remain unknown. Statsig telemetry/exposures must not be ported.

- Android conversation guest-start path (2026-11-25): `Ljqk0` conversation coordinator receives `Lks31` AuthSession and `Lgs31` guest SessionManager (`Q1`/`R1`). In `G(Louf0)`, a guarded `Lkmk0` event launches `Lps30` coroutine label 16. Packed-switch key 16 is confirmed to target the branch logging MessageStreamingService's no-messages/all-unsupported condition, constructing/emitting `MessageNotFoundException` on `Ljl90`, then invoking `Lgs31.b` with `Lkmk0`-derived `Llnp0` reason and `Lhr31` details. This is local conversation-level session startup/recovery; guest HTTP create/refresh and successful remote session creation are not proven. Keep separate from welcome CTA and La991/Lt891 event paths.

- Android Statsig initialize trace (2026-11-25): `Lyx71` maps Initialize to `https://featureassets.org/v1/i`; `log_event` maps to `https://prodregistryv2.org/v1/e`. `Lzy71.g` POSTs `user`, `statsigMetadata`, `sinceTime`, `hash`, `previousDerivedFields`, `full_checksum`; response `PersistedInitializeResponse` becomes evaluated gate/config/layer maps. `Lz381` restores `ondiskvaluecache`, optional per-user `Statsig.CACHE_BY_USER`, `LOCAL_OVERRIDES`, and `STICKY_DEVICE_EXPERIMENTS`. `statsig.network_fallback` is separate, with seven-day expiry/max ten previous fallback URLs (not response cache TTL). Effective response-cache age/offline precedence remain unknown. `log_event`, exposures and offline event queue are telemetry; do not port. RevenueCat remote-config models are unrelated.
- Android conversation callback binding (2026-11-25): `Ljqk0` extends `Lgqk0` (`Lv6a` base). `Lxjk1.f` captures the supplied `Lgqk0` receiver in `Llu2`; `Llu2.invoke` maps via `Lhkk1.t` then invokes virtual `Lv6a.G` on the same receiver. If the receiver is a `Ljqk0`, this reaches that instance's `G`. Its guarded `Lkmk0` branch calls local `Lgs31.b` after a MessageNotFoundException for no messages/all unsupported. This is local recovery only; Lkmk0 semantics and HTTP guest creation remain unknown.

- Android authenticated conversation protocol findings (2026-11-25): the supplied 1.2026.321 XAPK's 111 Valdi modules include `chatgpt_services/src/generated/ChatGPTConversationApiClient.js`, `ChatGPTDirectResponseClient.js`, direct streaming worker/client/processor/protocol/contracts/event decoder, `ChatGPTFileUploadService.js`, and `ChatGPTConversationHistoryClient.js`. Observed routes include `/backend-api/models`, `/backend-api/sentinel/chat-requirements`, `/backend-api/f/conversation`, `/backend-api/conversation`, file/process/Estuary upload paths, conversations, pins and download. Direct client context includes active account/access token/account ID; headers include bearer Authorization and ChatGPT-Account-Id. Requirements-integrity and device-integrity are separate provider roles; a missing required device provider causes an explicit failure. Never fake or bypass either first-party integrity result. The stream pipeline uses packaged SSE/StreamingHTTP clients and includes `resume_conversation_token`, `x-conduit-token`, `/resume`, offset and handoff contracts. This is static symbol/string evidence, not complete request body/event schema or live behavior. `oai-telemetry` is present in strings but excluded from ChatJS.
- Android guest boundary correction (2026-11-25): all 111 decompressed Valdi modules were searched for `/backend-anon`; none contained that route string. The concrete direct sender found is explicitly authenticated/account-oriented. This does not prove guest service absence elsewhere; guest create/refresh and guest composer prepare/send remain unknown. Keep DEX LocationCookieInitializer paths separate from the direct sender.
- Windows MSIX/ASAR first-pass source trace (2026-11-25): the two supplied Windows pieces reconstruct to 796,523,063 bytes, SHA-256 `561f0b0c6edc4dbf5f00f33b86e0786ea59a0ff926759813b26770a0e8c4d963`, ZIP CRC clean. Appx identity `OpenAI.Codex` v`26.1117.4957.0` displays as ChatGPT; ASAR internal package is `openai-codex-electron` v`26.1117.41037`. Static code shows a local stdio host spawning bundled `codex.exe` for a thread/turn app-server RPC engine, plus a separate restricted ChatGPT/OpenAI auth-fetch bridge with `wham` and Estuary path families. Do not add this subprocess/app-server as a ChatJS dependency. The source path is not yet proven to cover every user-visible Windows Work feature; Windows local and Android cloud Work remain separate.

- Android authenticated conversation deeper static pass (2026-11-25): extracted `assets/chatgpt_services.valdimodule` from the supplied XAPK base APK and decompressed its Zstandard frame. DirectResponseClient string region contains conversation/message/context keys (`conversation_id`, `parent_message_id`, `conversation_mode`, `primary_assistant`, history/training mode, author/user/text/content_type/parts/multimodal_text, metadata, model-written DIL, skills overrides, stream, timezone offset, file/image asset references). Both `/backend-api/f/conversation` and `/backend-api/conversation` constants and POST/JSON serialization are present, but exact route selection, nesting, requiredness and serializer order remain unknown. Generated decoder names cover ModelCatalog and ChatRequirements, with primitive validation strings and known keys; the event decoder identifies delta operations, entity references, reasoning/DIL state, `resume_conversation_token`, `stream_handoff`, `resume_sse_endpoint`, `x-conduit-token`, and offsets. Upload strings include reservation/process metadata, Azure block-blob PUT headers, trusted destination suffixes (.blob.core.windows.net, .blob.storage.azure.net, .amazonaws.com, .oaiusercontent.com), Estuary routes, and named max-count/file/total-size constants whose numeric values remain unknown. This is compiled string/symbol evidence, not bytecode decompilation or a complete schema; no runtime feature changed.

## Owner clarification — unified package identity (2026-11-25)

Permanent clarification: ChatJS is one standard Node.js client module bringing together the actual client-side capabilities of ChatGPT mobile, ChatGPT desktop and Codex CLI into a single package/API. Codex CLI is not merely out of scope or just a reference: its client workflows are part of the target to implement inside ChatJS. However, the separate codex executable and app-server must not be runtime prerequisites. The Codex source archive is the implementation reference for reproducing those behaviors natively in Node.js. ChatGPT is the only AI service target; do not build a generalized multi-provider AI framework. Preserve distinct Android cloud Work, Windows local Work and Codex CLI paths under one cohesive package. Host adapters are only for real host-specific facilities. See PRODUCT_STANDARD.md, ARCHITECTURE.md, CODEX_SOURCE_FINDINGS.md, and CAPABILITY_MATRIX.md.

## AI-service and host-adapter boundary — permanent clarification

ChatGPT is the one and only AI service target. Do not design a generalized provider/plugin architecture for alternate AI models or services, and do not expose AI-provider selection. ChatGPT mobile, ChatGPT desktop and Codex CLI are client/source capability families, not separate AI providers. Optional adapters exist only to supply real host facilities (filesystem, process, browser, secure storage, platform integrity, and comparable OS-specific mechanisms) where the consuming Node.js host supports them. Preserve actual first-party integrity interface terminology when documenting source code, but do not turn it into an alternate AI-service abstraction.

## Codex CLI source findings — 2026-11-25

The pinned official Codex snapshot `50aeac27d825007a0ac6bd846087ed4e7095bdb3` now has a deeper source map in `CODEX_SOURCE_FINDINGS.md`. It establishes a ChatGPT Codex Responses client at `https://chatgpt.com/backend-api/codex/responses`, POST JSON/SSE and a distinct WebSocket path; typed request fields and conditional session/thread/request/subagent headers; managed ChatGPT OAuth bearer/account handling with guarded refresh; typed Responses stream lifecycle/error events; and the CLI `--json` thread/turn/item event contract. The CLI's local `exec` path starts an in-process app-server and is not to be copied as ChatJS runtime architecture. Codex capabilities are in scope, but the CLI/app-server binaries are not runtime dependencies. This is source research only: no ChatJS Codex transport/auth/task engine or real account test exists. Upstream analytics/telemetry is excluded. Keep Codex auth distinct from ChatGPT accountless guest mode.

## Codex local tool/runtime source map — 2026-11-25

The pinned Codex source also reveals the local coding tool system: interactive `exec_command` + `write_stdin` terminal sessions, separate one-shot execution (observed 10-second default timeout and no resume), path-URI workdir and executor selection, feature-gated TTY, command policy states (skip/needs approval/fresh human approval/forbidden), sandbox and session-scoped approval keys, a verified `apply_patch` interception path, and separate MCP server/tool dispatch. See the 2026-11-25 local execution section of `CODEX_SOURCE_FINDINGS.md`. This is static source research only. ChatJS has none of these Codex local engines implemented; they must be native Node.js components with optional real host adapters, explicit approvals and sandbox enforcement. Keep Codex's local coding engine separate from Windows ChatGPT Work Local and Android Work Cloud.

## Codex network/permission/tool-search/multi-agent source map — 2026-11-25

The pinned Codex source additionally maps:
- command-scoped outbound network approvals attributed to the active execution/environment; once/session/deny outcomes; per-host serialized prompts and fail-closed ambiguous attribution; executor-local proxy capability checks and gated credential masking;
- `request_permissions` for normalized, selected-executor-aware filesystem grants submitted for user approval;
- lazy local BM25 discovery over deferred tool definitions, with per-step Code Mode/router filtering;
- configuration/feature-gated MultiAgentV2 child-thread collaboration: spawn, queue-only send, trigger-turn followup, mailbox/steering wait, list and interrupt.

See the latest dated additions to `CODEX_SOURCE_FINDINGS.md`, `CHATGPT_CAPABILITY_INVENTORY.md` and `OPEN_QUESTIONS.md`. These are source observations only; no ChatJS implementation exists. Command egress approval is not the ChatGPT backend transport; a permission request is not an automatic grant; tool search is local over registered source definitions (not a plugin marketplace); multi-agent V2 requires actual source feature/config support. All upstream telemetry/analytics is excluded.

## Codex turn controls, user interaction and extension surface — 2026-11-25

Further pinned source observations in `CODEX_SOURCE_FINDINGS.md`: `update_plan`/Plan-mode rules, `clock.curr_time` from a local injected time provider, context budget reporting, `wait_for_environment` for a real selected starting environment, blocking and async user-input/status-message tools, separate MCP resource list/templates/read, current-thread dynamic tool callbacks, and catalog-validated plugin/connector installation via explicit MCP elicitation consent plus install verification. These are planned native ChatJS capabilities only. A Node.js module without a host UI cannot claim it displayed/collected user input; a missing interaction adapter must be reported. Catalog items are not automatically supported or approved; determine implementation from the full source-backed capability scope, actual host support and explicit user consent. No analytics/telemetry is ported.

## Android QuickJS bytecode disassembly path — 2026-11-25

The public pinned Valdi QuickJS source contains `js_dump_function_bytecode`, which decodes opcodes using function metadata and its constant pool. `DUMP_BYTECODE` is called in the compilation path; `DUMP_READ_OBJECT` traces serialized bytes while reading. A temporary analysis-only patch to `JS_ReadFunctionTag` can call the disassembler after the constant pool has been loaded, allowing serialized Android module functions to be decoded without executing them. The Android arm64 split contains stripped `libopenai_xplat_export.so` (8,817,776 bytes) with QuickJS/Valdi runtime class strings, but no useful exported reader/dump symbol. No tool was built or run: full pinned source tree and matching build options are still missing. See the latest section of `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`. Do not add third-party QuickJS to ChatJS production runtime for convenience.

## Codex Responses WebSocket v2 source map — 2026-11-25

The pinned Codex source now provides a deeper WebSocket trace in CODEX_SOURCE_FINDINGS.md: eligibility requires provider capability and session state; handshake uses OpenAI-Beta: responses_websockets=2026-02-06 plus session/thread/request IDs, optional routing and integrity headers; connection and routing affinity are turn-scoped; the wire request is tagged response.create; previous_response_id and input delta are used only after strict property/history checks; optional generate:false prewarm can be reused by the first generation; flow uses 1 MiB fragmentation/read-ahead and bounded event channel; interrupts require response-specific acknowledgements; HTTP 426 and selected retry errors switch a session to HTTPS. Special unbounded connection retries are feature-gated and tightly scoped. All this remains source research only; no ChatJS WebSocket client is implemented. Consumer-controlled prewarm must remain explicit and network-free by default.

## Owner scope and priority clarification — 2026-11-25

**Long-term product target is unchanged:** one ChatJS Node.js module consolidates the actual ChatGPT mobile, ChatGPT desktop and Codex CLI client capabilities. No one of those source/client families has been removed from the goal. Android Work, Windows/Desktop, and Codex CLI remain part of the overall target.

**Feature coverage is source-driven:** the complete capability surface evidenced by the supplied first-party clients remains in scope. Feature-domain labels do not restrict coverage. Preserve evidence, authorization, entitlements, privacy, host requirements, and service security.

**Temporary execution priority, not a scope change:** complete the ChatGPT Android client comprehensively first, covering the non-Work Android experience. During this phase, set aside Android Work, ChatGPT Desktop/Windows, and Codex CLI. This is sequencing only; preserve those capabilities and source findings in the long-term product backlog. Once Android non-Work coverage is genuinely complete and tested, resume the other source families. See CONTINUATION.md, TODO.md, and project-state.json.


## Owner scope confirmation and Android package inventory — 2026-11-25

The final ChatJS target remains ChatGPT Android/mobile + ChatGPT Windows/desktop + Codex CLI in one Node.js module. The current phase is Android non-Work only; Android Work, Windows/Desktop, and Codex CLI remain parked until Android non-Work is fully reconstructed, implemented and tested. This does not remove or reduce any long-term target.

The supplied Android XAPK was reverified in this session: SHA-256 `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`, successful ZIP test, six outer entries, base APK 5,080 entries, ten DEX files and 111 Valdi modules. Static module assets include finance/account, maps/location, wallet, health, commerce/shopping, global search, Library, custom instructions, memory settings, conversation and voice areas. Exact asset names and evidence limitations are recorded in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`.

Feature-domain labels do not restrict Android non-Work coverage. Module presence is package evidence only—not entitlement, active route, reconstructed schema, or ChatJS implementation.


## Android source bytecode reconstruction — 2026-11-25

A temporary read-only QuickJS disassembler based on pinned `Snapchat/Valdi` commit `f5bc2dcfcb880109c908e0675968cb532231ca71` / QuickJS `2021-03-27` was built with a dump hook after `JS_ReadFunctionTag` restores the constant pool. Its harness uses `JS_ReadObject(...JS_READ_OBJ_BYTECODE)` only and never evaluates or invokes Android app functions. It successfully decoded three entries: `ChatGPTDirectResponseClient.js` (24,963 bytes, SHA-256 `e3ff57394f265f47c9a6a651e97d1f7fc752183ed06482c1de0bf8e0d2caa4ef`, 66 methods), `ChatGPTConversationApiClient.js` (9,050 bytes, SHA-256 `cee4c14430b8527d1b3572dcd44d1e3317ca32f0647c415e833ee4d138c77f74`, 56 methods), and `ChatGPTConversationEventDecoder.js` (14,503 bytes, SHA-256 `77964ad085e01f1366658a40c60f063933dec6c429baad1c475241a59ee80e48`, 22 methods). The analysis tooling and bytecode stayed outside Git and production dependencies.

Key source findings: authenticated direct send POST `/backend-api/f/conversation`; separate parent lookup GET `/backend-api/conversation/{encodedConversationId}`; requirements POST `/backend-api/sentinel/chat-requirements` with `{}`; default requirements provider emits `OpenAI-Sentinel-Chat-Requirements-Token` only when no challenge requires a separate device-integrity provider, otherwise fails closed. A separate native provider can be injected only behind Valdi >= 11 and a resolved device-integrity service. The send body uses the last user-authored message, conditional conversation ID, model, resolved parent ID, optional uploaded file parts, `stream:false` and timezone offset; route and field details are in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`.

The event decoder recognizes [DONE], message stream completion, resume-token and handoff events; builds continuation `{conversationId,eventOffset,token}`; supports Add/Append/Patch/Remove/Replace/Truncate delta operations; rejects unsafe path keys; limits delta paths to 2,048 characters and 64 segments; and the direct sender caps handoffs at three. Exact resume wire mapping, complete nested model/requirements schemas, public native integrity availability, guest routes and full upload protocol remain open. ChatJS runtime remains foundation-only.

## Android generated catalog and requirements schema — 2026-11-25

The decoded Android generated ConversationApiClient has method-level required/optional fields: ModelCatalogRequest requires boolean iim and supports_model_picker_upgrade_presets; ModelCatalogResponse requires string default_model_slug, optional models[] and versions[]; ModelCatalogModel.slug and ModelCatalogPreset.model_slug are optional strings; ModelCatalogVersion.intelligence_presets is an optional ModelCatalogPreset[] array; ChatRequirementChallenge.required is optional boolean; ChatRequirementsResponse.token is required string and turnstile/proofofwork/so are optional ChatRequirementChallenge[] arrays. Optional checks allow undefined but reject null; unmodeled additional properties are preserved. See ANDROID_CLIENT_PROTOCOL_FINDINGS.md. Remaining work is consumers/semantics for pass-through fields and each challenge descriptor, not these generated named-field decoders.


## Android stream and attachment method-level trace — 2026-11-25

A second static bytecode pass with the temporary, pinned Valdi QuickJS reader decoded the six Android stream worker/client/processor/protocol/contracts/assistant-response entries, ChatGPTFileUploadService, and the separate oai_file_picker policy entry. The reader uses JS_ReadObject deserialization and a dump hook after function bytecode and constants are reconstructed. It never executes app code; all app-derived payloads and third-party analysis tooling stayed outside Git and production packaging.

The stream host/worker enum and request-ID correlation, direct SSE versus injected polling mode, content-prefix delta handling, separate state/DIL/reasoning/entity-reference callbacks, and terminal errors are method-level traced. Direct resume creates a separate POST request at the initial path plus /resume with conversation_id, optional model, offset, stream:false, and x-conduit-token. Resume is direct-mode-only and capped at three handoffs.

The upload trace reconstructs POST /backend-api/files reservation, first-party Estuary multipart finalize/content-bytes branches, signed external PUT, POST /backend-api/files/process_upload_stream, trusted HTTPS origin/host constraints, Azure versus S3 headers, and file-picker policy. Limits: 10 files, 20 MiB per file, 25 MiB aggregate, 32,768-pixel maximum image dimension, 512-character file-name and 128-character MIME limits. Supported document extensions and exact MIME values are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.

An internal src/chatgpt/file-upload-policy.cjs helper was added with deterministic tests. It validates selection metadata/limits, padded Base64 data URL byte length, destination origin/host restrictions, and route/headers distinction. It does not send HTTP, authenticate, reserve/upload/process files, or expose a public API. The complete Node package check passed in the disposable current-main snapshot with 35 tests; the archive was built and inspected with nine module files. ChatJS remains foundation-only and all real ChatGPT workflows remain unimplemented.


## Android event dispatcher and response processor — 2026-11-25

Read the retained Android ChatGPTConversationEventDecoder and ChatGPTStreamingResponseProcessor disassemblies through the complete top-level dispatch and listener lifecycle. The decoder handles [DONE] before eventOffset increment; all other events increment the offset before decode. resume_conversation_token saves conversation/token state, stream_handoff returns a nonterminal conversation-bound continuation with the current offset, and message_stream_complete is terminal. Ordinary message updates separately track assistant text suffixes by message ID, reasoning, conversation-state transitions, model-written DIL payloads, and entity-reference snapshots.

The separate response processor batches Markdown parsing/rendering at 16 ms, carries independent text/state/DIL/entity/reasoning callbacks, flushes pending text before completion or failure, defers completion when output was rendered, and stops/clears timers on completion/failure/cancel. Cancellation does not fabricate a completion callback. The full source findings and caveats are in ANDROID_CLIENT_PROTOCOL_FINDINGS.md. This remains static source reconstruction; no production event decoder or ChatGPT streaming operation is implemented.


## Android requirements-integrity routing — 2026-11-25

The Android direct client normalizes chat-requirements: token must be non-empty, and any required challenge in turnstile/proofofwork/so sets requiresDeviceIntegrity. The default provider returns the requirements-token Sentinel header only when no such challenge is required, and otherwise fails closed. The alternate native adapter is selected only for Valdi >= 11 when a device-integrity service exists. It receives access token/account/backend/conversation/parent context, has explicit success/failure/cancel callbacks, validates paired header arrays and safe names/values, and accepts only a one-property app_attest_challenge JSON patch with a non-empty string. The internal native implementation and public APK availability remain unresolved; no token or challenge is synthesized. Full evidence is in ANDROID_CLIENT_PROTOCOL_FINDINGS.md.


## Android native integrity availability clarified — 2026-11-25

The supplied public XAPK contains the native DeviceIntegrityNativeModuleFactoryImpl registration marker and DEX implementation. Its Valdi factory creates a wrapper whose createDeviceIntegrityService constructs the class implementing DeviceIntegrityService. The request/response bridge shapes are confirmed (five string request fields; response bodyPatchJson plus headerNames/headerValues; success/failure callbacks and cancellation task).

However, the worker explicitly compares Context.getPackageName() to com.openai.chatgpt.internal and throws "Install the official-debug-signed internal Android application to verify this device." before HTTP when it differs. The supplied manifest package is com.openai.chatgpt. Therefore the factory code is bundled in the public APK but its native operation is unavailable to this public package. The outgoing internal package fields are behind the guard. Never spoof or bypass this check. A separate public-build provider is not found in this XAPK and remains open only as a cross-version source question.


## Android native integrity response bridge confirmed — 2026-11-25

The native DEX callback method is now traced: DeviceIntegrityResponse.bodyPatchJson is null, and the token bundle JSON (bot_token/play_integrity_token/chat_requirement_token) is carried by X-Sentinel-Payload. The other returned headers are OpenAI-Sentinel-Chat-Requirements-Token, OAI-Client-Type, OAI-Device-Id, OAI-Package-Name and User-Agent. This is not the optional Valdi app_attest_challenge body patch.

The HTTP helper path is also method-level reconstructed: bearer/account/device headers, POST JSON, redirects disabled, 30-second connect/read timeouts, Set-Cookie stored through CookieManager, secure first-party cookie validation, bounded response reading and cancellable disconnect. It uses a 256-byte random nonce for the first Standard Integrity token and a separate SHA-256 request hash over account/conversation/device/parent identity for the later token. It creates and persists a random install UUID in oai_device_integrity/device_id.

The helper hardcodes User-Agent ChatGPT/1.2026.209 (build 2620909), while the enclosing public XAPK is 1.2026.321 (2632129). The mismatch is observed and unexplained. The service worker still rejects public com.openai.chatgpt before HTTP because it requires com.openai.chatgpt.internal. No native operation was executed and no token/cookie/network request was generated.

Remaining source questions are retry attempt/backoff ceilings, DeviceRateLimits persistence/scope, cookie and UUID lifecycle, the UA mismatch, and any separate public-build implementation in another authentic source.
