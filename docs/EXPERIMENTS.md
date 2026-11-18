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
- **Method:** use the built-in Node test runner to require the CommonJS entry and dynamically import the ESM entry.
- **Result:** both tests passed in the recorded initial CI run.
- **Conclusion:** verified for the minimal foundation, not for ChatGPT service compatibility.
- **Next:** preserve parity tests as public exports expand.

### Generated project documentation

- **Question:** can project state generate and validate the human-readable snapshot?
- **Method:** render docs/PROJECT_STATE.md from docs/project-state.json and run the local Markdown link checker.
- **Result:** the current CI run reported synchronized project state and all 25 Markdown files contained valid local targets.
- **Conclusion:** verified for the committed repository state.
- **Next:** keep both checks in CI.

### ChatJS distribution archive

- **Question:** can a module-only ChatJS.tar.gz be built without a third-party archive dependency?
- **Method:** create a USTAR archive using Node built-ins, gzip it, verify exact member names and file contents, then extract and smoke-test it in CI.
- **Initial CI result:** the archive was created, but the test initially counted the valid top-level `ChatJS/` directory header as an unwanted file.
- **Correction:** the test now validates and skips directory entries, then compares every regular file in the archive byte-for-byte against its repository source.
- **Current status:** awaiting the next CI run after the test correction.
- **Next:** confirm the archive test, extraction, CommonJS load, ESM load, and artifact upload all succeed.
