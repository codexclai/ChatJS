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

ChatJS is one comprehensive, general-purpose Node.js module that brings together the actual client-side systems, workflows, and capabilities of official ChatGPT mobile and ChatGPT desktop (including Work and Codex) in one reusable package.

The goal is to adapt the real client-side implementation to Node.js—not merely imitate visible feature names, not build a superficial clone, and not recreate ChatGPT's server. Use the actual supplied application package contents as the technical basis: client code, compiled modules, request/response construction, payload schemas, serialization, transport, connection handling, authentication/session flows, local persistence, tools, and other shipped client components. A detail absent from public developer documentation must not be rejected or dismissed when it is evidenced by the supplied official client code. The client code is the implementation reference.

The target is the real consumer ChatGPT product and its legitimate account/service behavior, not OpenAI Platform APIs, API keys, or a substitute model provider. Do not represent any feature as implemented until its Node.js behavior is actually built and verified. Never fake generated output.

ChatJS must remain general-purpose: usable by different Node.js applications, operating systems, hosts, devices, and deployment environments. Do not assume it is itself a phone/desktop app or that any particular camera, microphone, screen, browser, or OS facility is present. Expose host-dependent capabilities through optional integrations/adapters so consumers can use the module without those facilities.

## Product execution and session modes — owner direction, 2026-11-24

- ChatJS independently implements first-party ChatGPT client communication in Node.js. Do not require or wrap Codex CLI, a standalone Codex app-server, or an embedded Codex app-server runtime. The pinned Codex repository is a source reference only. See CODEX_SOURCE_FINDINGS.md.
- Windows ChatGPT desktop Work is the local execution surface; Android ChatGPT Work is the cloud execution surface. Keep their engines and protocol flows separate. Neither Work surface depends on Codex CLI.
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
- Exclude health/Health Connect, finance, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions/features.
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


- Android guest-welcome evidence (2026-11-24): Lnlh1/Lylh1 carries guestCtaCopy/CTA flags; WelcomeLanguageEnrollment reads it through local PreferenceStore Lzlh1 (global_ namespace); Lvlh1 records anonymous_welcome; Lxr10 maps the copy/flags into welcome/composer UI state under Statsig gates, including skip. The welcome CTA action-29 path is now traced through Lgs10/Ltu10/Lqik0 to Lnik0 login-child coordination. That flow reads the current Lks31 wrapper via Llzx.t and processes Lir31 login-flow events through Lau31.i/Lxs31 under the Lmgo0 mutex, using local state reconciliation. This does not prove it invokes the separate Lgs31.b → Lau31.G initial guest fallback or creates a guest session. Preference population and guest HTTP create/refresh/composer routes remain unknown. Do not port Android instrumentation as ChatJS telemetry.


- Additional Android guest-start path (2026-11-24): Lej6.invoke creates La991; the La991.G(Louf0) event handler checks Lw891.a and Lcq41.e, then runs Lmuz0 branch 9 → Lgs31.b → Lau31.G. This is a second event-gated caller of local SessionManager startup, not yet tied to welcome CTA action-29. Its ChatgptClientMarkerUserSessionBootstrapRequestType marker is instrumentation and must not be ported as telemetry. No guest HTTP create/refresh or composer protocol is established.


- Correction to the 2026-11-24 guest-start event trace: La991.G handles W891.a by forwarding current Lw4h0 state through Lcq41.e and returning; it is **Lt891** that dispatches Lmuz0 label 9 → Lgs31.b → Lau31.G. Candidate Lt891 producers are Lq20.invoke (payload 5) and Ldo1.invoke selector case 18 (payload 6, null-Lh70 branch) through generic Function1 callbacks. The latter is hosted by Lp1w/Le2w.e ConversationSidebar UI; the former is in Lq20 WebView callbacks. Callback targets into the La991 instance are not proven. Do not conflate W891 with guest startup or either candidate UI with an established runtime trigger. This remains local state transition evidence, not HTTP guest creation.


- Android guest-start callback research (2026-11-25): `Lq20.invoke` forwards `Lt891(5)` through a generic `Function1` supplied by `Llal1.h` callers or the WebView-host `Lej10.c`/`Ljpc.invoke` path. `Ldo1.invoke` selector case 18 forwards `Lt891(6)` through `Lp1w` → `Le2w.e` → `Le2w.j` and parent `Le2w.c` ConversationSidebar inputs. Their callback implementations and payload meanings remain unknown. No direct method-id or method-handle reference to `La991.G` exists outside its definition in the ten DEX files; this does not exclude dynamic behavior. Keep the event paths unconnected to the coordinator and welcome CTA until proven.


- Android callback evidence correction (2026-11-25): `La991` extends `Lv6a`; `Lv6a.H(Louf0)` dispatches virtually to `G(Louf0)`, so a generic callback can reach `La991.G` if it captures that receiver. `Le6` implements this bridge but is observed under Composer / FreeThinkingGaugeNuxHost, not statically connected to the WebView or ConversationSidebar event callbacks. Their actual receiver bindings remain unknown. No guest HTTP create/refresh or composer send protocol is identified.

- Android welcome preference writer (2026-11-25): `Le7f1` defines local `welcome_language_opportunity` key (Lap6/Lxlh1 serializer), default `Lylh1(null,false,null)`. `Lvlh1.c` → `Ltl30` reads the key, evaluates Statsig-derived `Lplh1`, collects local locale/app/user-install context, builds `Lcmh1`, and updates `Lylh1` through `Lzyv0.m` / `Lhi41` branch19 / `Lylh1.a`. The `Lnlh1` presentation model and `guestCtaCopy` source are not proven to flow through this path. Later account/profile repository operations in the coroutine are not identified as welcome fetches. No guest session or composer endpoint is established; `anonymous_welcome` remains excluded instrumentation.
