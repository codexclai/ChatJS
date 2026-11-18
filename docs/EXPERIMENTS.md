# ChatJS Experiments

Chronological record of meaningful technical experiments, including successful, failed, and inconclusive attempts. Preserve results so later chats do not repeat work blindly.

## Record format

For each experiment include:
- Question and reason.
- Setup, code, runtime, inputs, and assumptions.
- Method and commands.
- Expected and actual results.
- Conclusion: verified, observed, inferred, inconclusive, or failed.
- Follow-up task or decision.

Never include secrets, credentials, private user data, or copied proprietary app material.

## Repository foundation

### CommonJS and ESM entry points

- **Question:** can the minimal ChatJS client load through both Node.js module systems?
- **Method:** use the built-in Node.js test runner to require the CommonJS entry and dynamically import the ESM entry.
- **Result:** the current GitHub CI run passed the named ESM/default-export test, and the archive smoke-test loaded the extracted module in both CommonJS and ESM contexts.
- **Conclusion:** verified for the minimal foundation, not for ChatGPT service compatibility.
- **Next:** preserve parity tests as public exports expand.

### Generated project documentation

- **Question:** can project state generate and validate the human-readable snapshot?
- **Method:** render docs/PROJECT_STATE.md from docs/project-state.json and run the local Markdown link checker.
- **Result:** the current CI run reported synchronized generated state and all 25 Markdown files passed local target validation.
- **Conclusion:** verified for the committed repository state.
- **Next:** keep both checks in CI.

### ChatJS distribution archive

- **Question:** can a clean module-only ChatJS.tar.gz be built without a third-party archive dependency?
- **Method:** create a USTAR archive using Node.js built-ins, gzip it, verify exact member names and file contents, extract it, and smoke-test module loading.
- **Initial failure:** the first archive test treated the valid top-level ChatJS/ directory entry as a file and failed the exact member comparison.
- **Correction:** the test now validates and skips directory entries, then compares every regular archive member byte-for-byte with its source file.
- **Verified result:** the current CI run built the archive with 7 distribution files; the archive integrity test passed; CI extracted it under node_modules/ChatJS; both CommonJS and ESM smoke tests passed; the ChatJS workflow artifact upload succeeded.
- **Conclusion:** verified for the current foundation package.
- **Next:** preserve the member allowlist and smoke tests whenever the package distribution changes.

### Android reference archive availability

- **Question:** is ChatGPT.zip actually present in the ChatJS Project's persistent Sources?
- **Method:** searched/listed the current Project files, identified the Project-backed ChatGPT.zip entry, and materialized the authorized original bytes.
- **Result:** the Project Source was available; the ZIP inventory contained one entry named base.apk. No APK internals or app feature inventory have been analyzed yet.
- **Conclusion:** verified source availability and ZIP layout; app behavior remains uninspected.
- **Next:** inspect the APK only as a high-level product reference and record observations separately from supported programmatic interfaces.
