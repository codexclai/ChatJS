# ChatJS Open Questions

Track unknowns and blockers that affect implementation or governance. Close an item only after the answer and supporting evidence are recorded.

## Ownership and governance
- [ ] **Legal ownership:** confirm the rights holder and obtain legal review of the all-rights-reserved notice before external contributions or distribution.
- [ ] **Contribution model:** decide whether ChatJS remains proprietary or adopts a recognized license before inviting external contributors.
- [ ] **GitHub security settings:** verify private vulnerability reporting, secret scanning, and push-protection availability. Do not configure branch protection, rulesets, or topics.

## Inference boundary
- [ ] **Non-OpenAI inference strategy:** the owner has excluded OpenAI Platform APIs, API keys, Sign in with ChatGPT OAuth, and private ChatGPT endpoints. What non-OpenAI inference engine, if any, is acceptable for model-powered chat, voice, image, and agent behavior? Until selected, do not implement or simulate generated responses.
- [ ] **Local-model runtime:** assess a genuine local inference option only after the owner confirms that local models are in scope. Do not add an inference dependency pre-emptively.

## Node.js and platform scope
- [ ] **Host platforms:** define which Node.js hosts must be supported first (Windows, macOS, Linux). Do not imply Node.js has direct Android camera/microphone/screen permissions.
- [ ] **Desktop permissions:** define permission and approval policy before adding desktop-app control, browser automation, microphone, camera, or screen adapters.
- [ ] **Remote host:** decide whether a ChatJS-owned remote desktop agent is worth building. It must use its own secure protocol and must not imitate ChatGPT Remote/Codex private sessions.
- [ ] **External connectors:** determine whether user-configured third-party adapters are in scope, with least-privilege scopes and explicit approval.

## Product evidence
- [ ] **Mobile UI validation:** validate selected APK indicators against observable behavior if a lawful reference session becomes available. Static manifest/resource evidence does not prove current UI availability.
- [ ] **Desktop UI validation:** official documentation identifies Chat, Work, and Codex. A desktop installer is not required for scope research; request screenshots or a specific build only to validate a concrete OS interaction.

Every open question should link to an actionable TODO and identify the evidence needed. Never silently turn an unknown into an assumption.
