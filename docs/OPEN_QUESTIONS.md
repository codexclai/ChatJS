# ChatJS Open Questions

Track unknowns and blockers that affect implementation or project governance. Close an item only after the answer and supporting evidence are recorded in the canonical document.

## Repository and governance

- [ ] **GitHub settings:** set repository description/topics and verify branch protection and available security features. The content connector cannot mutate these settings; see REPOSITORY_SETTINGS.md.
- [ ] **Legal ownership:** confirm the rights holder and obtain legal review of the all-rights-reserved notice before accepting external contributions or distributing the module.
- [ ] **Contribution model:** decide whether ChatJS remains proprietary or adopts a recognized license and contributor terms.

## Product feasibility

- [ ] **Capability inventory:** document observable ChatGPT mobile features, then identify which have authorized programmatic interfaces.
- [ ] **Integration boundaries:** classify features as local implementation, public-interface adapter, user-provided backend, external delegation, or unavailable.
- [ ] **Authentication:** define a safe authorized strategy; do not reproduce private mobile login flows or bypass controls.
- [ ] **Mobile-only behavior:** document features that cannot be provided directly by a Node.js module without an external device, app, or service.

## Runtime and API

- [ ] **First complete workflow:** choose an authorized workflow to shape the client, provider, transport, events, streaming, cancellation, and errors.
- [ ] **Persistence:** decide whether storage belongs in core or optional adapters, with explicit privacy and deletion semantics.
- [ ] **Compatibility contract:** define a consistent way to report available, limited, and unsupported capabilities.

## Maintenance

Every open question should link to an actionable TODO and identify the evidence needed to resolve it. Never silently turn an unknown into an assumption.
