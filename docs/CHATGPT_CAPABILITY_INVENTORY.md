# ChatGPT App Capability Inventory — Mobile First, Desktop Included

**Reviewed:** 2026-11-18. ChatJS is an independent Node.js feature implementation inspired by ChatGPT mobile first, plus applicable desktop Work and Codex experiences. This is a product-reference map, not a connection to ChatGPT's backend.

## Permanent integration boundaries

- No OpenAI Platform APIs, OpenAI API keys, Sign in with ChatGPT OAuth/token sharing, private ChatGPT backend endpoints, or extraction/reuse of ChatGPT app credentials, cookies, tokens, or session state.
- Official product documentation is used only to understand reference features. It is not a ChatJS integration contract.
- ChatJS does not access the user's ChatGPT account chats, memory, Projects, custom GPTs, connected apps, Work tasks, Codex sessions, or Codex Cloud.
- Node.js does not inherit Android app permissions. Native phone/desktop features require optional, explicit platform adapters; a native Android companion app is not currently in scope.
- No non-OpenAI inference engine has been selected. Do not fake generated answers, reasoning, voice conversation, image generation, code authoring, or autonomous agents. Implement real local functions that do not require a model.

## Evidence

The Project Source ChatGPT.zip contains one base.apk. Prior inspection was static and limited to the binary manifest and high-level packaged resource/module names. No emulator, interactive session, or DEX decompilation was used. Package names/permissions are **Observed package indicators** only; they do not prove a feature is enabled, entitled, or accessible to Node.js.

Current product references:
- [ChatGPT Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex)
- [Moving to the new ChatGPT desktop app](https://help.openai.com/en/articles/20001276-moving-to-the-new-chatgpt-desktop-app)
- [ChatGPT Voice](https://help.openai.com/en/articles/20001274-chatgpt-voice)
- [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
- [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)

These describe current product behavior, not supported ChatJS interfaces. Availability varies by plan, account, workspace, region, app build, and permissions.

## Mobile-first features and Node.js suitability

| Product area | App reference | ChatJS suitability |
| --- | --- | --- |
| Chat/conversations | Compose messages, threads, history, continue conversations | Local conversation containers are possible. Generated replies require an inference engine. ChatGPT account history is unavailable to ChatJS. |
| Instructions and memory | Custom instructions, saved memory, project context | Local profiles and opt-in local memory are possible; they are not ChatGPT account settings or memory. |
| Projects | Group chats, files, instructions, and context | Local project/workspace objects are a strong Node.js fit; no ChatGPT project sync. |
| Attachments | Files, images, supported video uploads | Local ingestion, metadata, conversion, and file operations are possible. Model-based understanding needs an inference engine. |
| Images | Image input and image tools | Local image plumbing is possible; understanding/generation needs an inference engine. |
| Voice | Live voice; eligible mobile Advanced mode supports camera/video and screen sharing | Requires a real speech engine and host permissions; not portable Node.js core. |
| Search/research | Search and long research workflows | Explicit retrieval/browser adapters are possible; not ChatGPT Search or Deep Research. |
| Work on mobile | Longer tasks, connected apps/files, artifacts, continued text task | Local task orchestration/artifact generation is possible. ChatGPT cloud Work and its credentials are not accessible. |
| Remote desktop coding | Mobile Remote tab reaches supported Codex sessions on a connected desktop | ChatJS could build its own remote-host protocol; it cannot join ChatGPT Remote or read private sessions. |

### Voice detail

The current Voice help page distinguishes Live, Advanced, and Standard. Live does not support live video or screen sharing; eligible mobile Advanced sessions do. The page states Advanced and Standard are scheduled to retire on **December 11, 2026**. See [ChatGPT Voice](https://help.openai.com/en/articles/20001274-chatgpt-voice). This is changing product behavior, not a reason to copy a legacy protocol.

## Desktop Work

The new desktop app separates ChatGPT (Chat or Work) from Codex. Work supports research, analysis, documents, spreadsheets, presentations, reports, and Sites. When permitted, desktop Work can use local files and desktop apps with permission. Cloud Work chats sync across devices; local work runs on the desktop, but task context may still be stored in the cloud.

Work has scheduling concepts: run once, repeat, trigger on supported events, or monitor for changes. App permissions and approval requirements still apply.

| Work capability | Node.js implementation path |
| --- | --- |
| Long-running tasks | Local task lifecycle, progress, pause/resume/cancel, explicit approval gates |
| Local files | Caller-selected workspace roots, bounded operations, safe paths |
| Desktop apps | Optional OS adapter with explicit user permission |
| Browser/research | Explicit browser/retrieval adapter; no hidden browsing or network |
| Connected apps | User-configured scoped adapters; never reuse ChatGPT credentials |
| Deliverables | Local artifact generation with tested format support |
| Scheduling | Explicit caller-managed scheduler; stopped Node process cannot continue work |
| Voice coordination | Only after a real speech engine and host permission contract exist |

## Desktop Codex

Codex is a separate desktop view for local folders, repositories, terminals, and developer tools. Desktop also documents voice, remote control, review/approval flows, and cloud coding environments.

| Codex capability | Node.js implementation path |
| --- | --- |
| Local projects | Explicit confined workspaces |
| File read/search/edit | Validated paths, size limits, safe writes and tests |
| Commands and tests | Process runner with executable/argv separation, timeouts, cancellation, output limits and approval; no shell by default |
| Git inspection | Read-only status/diff/log operations initially |
| Review/apply changes | Diff model, explicit human approval, atomic writes |
| Multiple agents | Only after selecting a real inference engine; never simulate |
| Computer use | Optional OS adapter with narrow permissions and approvals |
| Remote host | A ChatJS-owned protocol; not ChatGPT Remote/Codex protocol |
| Codex Cloud | Out of scope; ChatGPT-hosted environment |
| Git worktrees/branch parallelism | Excluded because it conflicts with main-only policy |

## Explicit exclusions

Health/Health Connect, finance/banking, maps/navigation, shopping, wallet, contacts, calendar, telephony, and unrelated Android permissions are **not ChatJS features**, even if the APK declares related modules or permissions. Camera, microphone, and screen capture may only be considered as narrowly scoped, explicitly approved host adapters.

## Feasibility classes

1. **Local Node.js:** workspaces, bounded file operations, local project context/instructions, opt-in memory, task lifecycle, process execution, local search, diffs, artifact generation.
2. **Requires inference:** generation, reasoning, summarization, code authoring/review, voice conversation, image understanding/generation, agent decisions. No engine selected; OpenAI APIs/keys excluded.
3. **Requires platform adapter:** microphone/camera/screen, desktop-app control, notifications, browser automation.
4. **Requires separate authorized integration:** third-party apps or ChatJS-owned remote-host access with explicit configuration and scopes.
5. **Unavailable through ChatJS:** ChatGPT account chats/memory/Projects/GPTs, cloud Work, private Codex/Remote sessions, Codex Cloud.

## First implementation slice

Start with local Work/Codex foundations: a confined local workspace, bounded file operations, explicit task lifecycle, and safe command execution. These do not require a model. A desktop installer is not needed for this scope research; an installed app or screenshot may help later to test a specific OS interaction.
