# ChatJS

**ChatJS** is an independent Node.js project to build a comprehensive, modular, and carefully documented compatibility layer for observable ChatGPT experiences and workflows.

> **Project status:** foundation and repository bootstrap. No ChatGPT feature set is claimed to be implemented yet.
>
> **Independence notice:** ChatJS is an independent project and is not affiliated with, endorsed by, or sponsored by OpenAI. ChatGPT and OpenAI are trademarks of their respective owners.

## Goals

- Build a Node.js module with a stable, ergonomic, typed public API.
- Reproduce documented and observable ChatGPT product capabilities where technically and legally appropriate.
- Keep provider, transport, capability, storage, and runtime concerns modular.
- Support streaming, cancellation, events, concurrency, and predictable lifecycle behavior.
- Keep the package lean, well tested, secure by default, and friendly to developers.
- Maintain detailed documentation and durable cross-session project state in this repository.

Compatibility depends on available supported interfaces. Private services, account entitlements, application internals, and server-only behavior cannot be assumed to be accessible. ChatJS will not bypass access controls or claim equivalence where it has not been verified.

## Repository status

The repository is being bootstrapped. Read [docs/CONTINUATION.md](docs/CONTINUATION.md) first when resuming work, then consult:

- [docs/PROJECT_STATE.md](docs/PROJECT_STATE.md) — generated current snapshot.
- [docs/TODO.md](docs/TODO.md) — prioritized work queue.
- [docs/ROADMAP.md](docs/ROADMAP.md) — delivery phases and milestones.
- [docs/CAPABILITY_MATRIX.md](docs/CAPABILITY_MATRIX.md) — capability inventory and implementation status.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — architecture principles and boundaries.
- [docs/REFERENCE_APK.md](docs/REFERENCE_APK.md) — provenance and safe use of the supplied Android reference.
- [docs/CHATGPT_PROJECT_INSTRUCTIONS.md](docs/CHATGPT_PROJECT_INSTRUCTIONS.md) — compact instructions for future ChatGPT Project chats.

## Development

**Requirements:** Node.js 22.14.0 or newer (tested in CI on supported Node.js 22, 24, and 26 lines).

```bash
git clone https://github.com/codexclai/ChatJS.git
cd ChatJS
npm run check
```

The package is currently a foundation scaffold, not a functional ChatGPT client. The initial public API and scripts exist to support incremental implementation.

## Project principles

Human-readable code and documentation; correctness over feature-count claims; explicit implementation status; stable interfaces; minimal dependencies; secure secret handling; accessibility; graceful errors; current compatibility research; reproducible builds; and documentation updated alongside every meaningful code change.

## License and usage

This public repository currently uses an **all-rights-reserved, proprietary notice**. Public visibility does not grant permission to use, modify, redistribute, or publish the code. See [LICENSE](LICENSE). This is intentionally not an OSI open-source license. The repository owner should obtain legal advice before commercial distribution or accepting external contributions under a different rights model.

## Security

Do not commit secrets, credentials, personal data, APKs, proprietary app assets, private service captures, or sensitive account information. See [SECURITY.md](SECURITY.md).

## Links

- Repository: https://github.com/codexclai/ChatJS
- Documentation index: [docs/README.md](docs/README.md)
- Support and project status: [SUPPORT.md](SUPPORT.md)
