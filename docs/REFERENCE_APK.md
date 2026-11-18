# Supplied ChatGPT Android Reference

## Provenance

The user keeps an archive named **ChatGPT.zip** in the **ChatJS Project's Sources in ChatGPT**. The user confirms that it was exported immediately after updating ChatGPT through Google Play and identifies it as the latest build available to them at the time it was supplied.

Treat it as the user's current Google Play reference build. This acquisition provenance is user-confirmed; it is not an independently verified claim about the latest global release.

## Where the artifact lives

The archive is retained in the ChatJS Project's Sources in ChatGPT, not in the public GitHub repository.

At the beginning of each new ChatJS chat, search the Project Sources for ChatGPT.zip before asking the user to attach it again. Use the available Project file/source retrieval tools to locate and inspect it when relevant. A source may be visible to the Project without being mounted as a local file; only materialize or download it when direct binary inspection is necessary.

Do not copy the APK into the public repository:
- it is a proprietary third-party application binary;
- placing it in a public repository would redistribute the application;
- a large APK adds noise and weight to the source repository;
- the ChatJS Project Sources provide the reference archive independently of the code repository.

## Intended use

Use the APK as a high-level product reference for identifying areas to investigate, navigation concepts, visible interactions, resource coverage, and user-observable behavior. Keep notes separate from implementation.

Any feature discovered from the APK must be labelled as observed behavior until supported independently by public documentation, an authorized interface, or reproducible tests. An application resource or UI label is not evidence that the feature is accessible to a Node.js module.

## Boundaries

- Do not publish, redistribute, or commit the APK.
- Do not copy proprietary source, compiled application implementation, icons, fonts, strings, or other assets into ChatJS.
- Do not bypass authentication, entitlement checks, certificate validation, or service access controls.
- Prefer official documentation, authorized interfaces, and independent implementations.
- Record observations in neutral terms without claiming that private implementation details are stable APIs.

## Future sessions

The ChatJS Project Sources are the durable home for the reference APK. Every new chat must search there first. Ask the user to reattach the archive only when it is genuinely missing or inaccessible and a task requires direct APK inspection.
