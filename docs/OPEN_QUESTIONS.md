# ChatJS Open Questions

Track unknowns and blockers. Close an item only after its answer and evidence are recorded.

## Ownership and governance
- [ ] Confirm the rights holder and obtain legal review of the all-rights-reserved notice.
- [ ] Decide whether ChatJS remains proprietary or adopts a recognized license before inviting contributors.
- [ ] Verify private vulnerability reporting, secret scanning and push-protection availability.

## Inference boundary
- [ ] **Non-OpenAI inference:** owner excluded OpenAI Platform APIs, keys, Sign in with ChatGPT OAuth and private endpoints. What non-OpenAI engine, if any, is acceptable for generated chat, voice, image and agent behavior? Until selected, do not simulate generated output.
- [ ] **Local models:** assess a genuine local inference option only after confirming local models are in scope. Do not add an inference dependency pre-emptively.

## Node.js and platform scope
- [ ] Define priority host platforms (Windows, macOS, Linux).
- [ ] Define approvals before desktop-app control, browser automation, microphone, camera or screen adapters.
- [ ] Decide whether a ChatJS-owned remote desktop host is worthwhile; use its own protocol and authentication, never ChatGPT Remote/Codex sessions.
- [ ] Decide whether user-configured third-party connectors are in scope and define least-privilege consent.

## Product evidence and source retention
- [ ] Validate specific mobile/desktop UI interactions only if the owner asks for a concrete behavior comparison and an authorized reference session is available.
- [ ] The owner intends to clear ChatGPT Project → Sources after this inspection. Do not claim deletion is complete until confirmed. Future work should use committed reference records and must not request old binaries merely to repeat the inventory.
- [ ] Request a different desktop installer only if the owner explicitly asks for a build comparison or a specific OS behavior test.

Every open question must link to an actionable TODO and identify the evidence needed. Never silently turn an unknown into an assumption.
