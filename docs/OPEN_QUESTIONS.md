# ChatJS Open Questions

Track unknowns and blockers that affect implementation or governance. Close an item only after the answer and supporting evidence are recorded.

## Ownership, licensing and eligibility

- [ ] **Legal ownership:** confirm rights holder and obtain legal review of the all-rights-reserved notice before external contributions or distribution.
- [ ] **Contribution model:** decide whether ChatJS remains proprietary or adopts an open-source license before inviting external contributors.
- [ ] **Sign in with ChatGPT eligibility:** OpenAI documents plan-usage OAuth for open-source/locally hosted apps and directs paid or remotely hosted apps to an interest form. Does the owner intend to keep ChatJS proprietary, and should an eligibility question be submitted? Do not change LICENSE or assume eligibility without explicit owner direction.

## Product feasibility

- [ ] **Capability inventory:** validate static APK indicators against observable product behavior where a lawful, non-invasive reference is available. Current static inspection and limitations are in CHATGPT_CAPABILITY_INVENTORY.md.
- [ ] **Integration boundaries:** classify requested features as documented OpenAI API, eligible Sign in with ChatGPT, local implementation, user-authorized external adapter, or unavailable.
- [ ] **Plan-usage route:** after resolving eligibility, decide whether plan-usage OAuth is in scope; keep it separate from API-key auth and honor preview restrictions.
- [ ] **Mobile-only behavior:** document features that cannot be provided directly by Node.js without an external device, app, or separately authorized service.

## Runtime and API

- [ ] **First complete workflow:** design a documented Responses API workflow using caller-provided API credentials; specify transport, streaming, cancellation, errors, limits and cleanup before implementation.
- [ ] **Credential handling:** define how callers provide and rotate credentials without hidden persistence, logging, or transmission outside the configured provider.
- [ ] **Persistence:** decide whether API conversation state belongs in core or optional adapters, with explicit privacy and deletion semantics.
- [ ] **Compatibility contract:** define a consistent way to report available, limited and unsupported capabilities.

## Maintenance

- [ ] **GitHub security settings:** verify the availability and current status of private vulnerability reporting, secret scanning and push protection. Do not configure branch protection, rulesets, or topics.

Every open question should link to an actionable TODO and identify the evidence needed. Never silently turn an unknown into an assumption.
