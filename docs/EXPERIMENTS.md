# ChatJS Experiments

Chronological record of meaningful technical experiments and product research, including successful, failed, inconclusive, and withdrawn directions.

## Record format

For each investigation include the question, reason, setup/method, actual result, conclusion, limitations, and follow-up decision.

Never include secrets, credentials, private user data, or copied proprietary app material.

## Repository foundation

### CommonJS and ESM entry points
- **Question:** can the minimal client load through both Node.js module systems?
- **Method:** built-in Node.js test runner requiring CommonJS and importing ESM.
- **Result:** CI passed ESM/default-export checks and extracted archive smoke-tests for both formats.
- **Conclusion:** verified for the foundation only, not product feature support.
- **Next:** preserve parity tests as exports expand.

### Generated project documentation
- **Method:** generate PROJECT_STATE.md from project-state.json and run Markdown link validation.
- **Result:** previous CI reported synchronized state and all 25 Markdown files passed local target validation.
- **Conclusion:** verified for that committed repository state.
- **Next:** keep checks in CI.

### ChatJS distribution archive
- **Method:** Node.js built-ins generate USTAR+gzip, verify exact members/content, extract and smoke-test.
- **Initial failure:** first test treated the top-level ChatJS/ directory entry as a file.
- **Correction:** test validates/skips directory entries and compares each regular file byte-for-byte.
- **Result:** CI built 7 distributable files; archive integrity, extraction, CJS/ESM smoke tests, and artifact upload passed.
- **Conclusion:** verified for foundation package.
- **Next:** preserve archive allowlist and tests.

## Product research

### Android reference archive and static package inspection
- **Method:** searched Project Sources, materialized the original ZIP, confirmed one base.apk entry, then reviewed binary manifest and high-level packaged resource/module names.
- **Result:** static package indicators for conversations/streaming, voice/audio, attachments/preview, image/text processing, search/data, code/remote-session, memory/settings, and Projects.
- **Limit:** no emulator/UI session or DEX decompilation. Permissions/resources do not prove active UI, account entitlement, or Node.js access.
- **Conclusion:** package indicators are Observed only; full user-visible behavior remains unverified.
- **Next:** use current product documentation and lawful observations for the mobile-first map. Respect owner exclusions for health, finance, maps, shopping, wallet and unrelated permissions.

### OpenAI service/API route withdrawn by owner direction
- **Initial exploration:** a prior research pass reviewed Responses API and Sign in with ChatGPT as possible routes.
- **Owner clarification:** ChatJS must not use OpenAI Platform APIs, OpenAI API keys, Sign in with ChatGPT OAuth/token sharing, or private ChatGPT backend endpoints.
- **Result:** all such routes are out of scope. No runtime integration or credentials were added.
- **Conclusion:** do not revive this route unless the owner explicitly changes the requirement. The proprietary license is not an obstacle to implementing the local ChatJS feature scope.

### ChatGPT desktop Work and Codex product mapping
- **Sources:** official Work/Codex, desktop app, Voice, Projects and release-note pages; URLs are in CHATGPT_CAPABILITY_INVENTORY.md.
- **Verified product facts:** desktop separates ChatGPT Chat/Work from Codex; Work can use permissioned local files/apps; Codex works with local folders, repositories, terminals and developer tools; supported desktop Codex tasks can be reached through mobile Remote.
- **Node.js conclusion:** local workspace/file/process/task/artifact foundations are in scope. ChatGPT cloud Work, private Codex/Remote sessions, and Codex Cloud are not exposed to ChatJS.
- **Next:** define a confined local workspace contract and test it before adding command execution.
