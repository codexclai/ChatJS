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
- **Result:** the initial CI run reported synchronized state and all local links present across the documentation then committed.
- **Conclusion:** verified for that repository state.
- **Next:** keep the checks in CI and update links as docs change.

### ChatJS distribution archive

- **Question:** can a module-only ChatJS.tar.gz be built without a third-party archive dependency?
- **Method:** create a USTAR archive using Node built-ins, gzip it, verify exact member names and file contents, then extract and smoke-test it in CI.
- **Result:** the builder and test are prepared; the first CI execution after the archive work is pending.
- **Conclusion:** pending CI verification.
- **Next:** inspect the next CI run and fix archive or module-loading failures before marking complete.
