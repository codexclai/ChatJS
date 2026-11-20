# ChatJS Open Questions

Track unknowns and blockers. Close an item only after its answer and evidence are recorded.

## ChatGPT client implementation

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
