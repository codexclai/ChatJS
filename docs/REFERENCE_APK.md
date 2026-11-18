# Supplied ChatGPT Android Reference

## Provenance

The user attached an archive named ChatGPT.zip to this ChatJS project conversation. The archive was inspected locally for its container and APK inventory. The repository stores this note and checksum only; the APK itself is deliberately not committed to this public repository.

| Item | Observed value |
| --- | --- |
| Uploaded archive name | ChatGPT.zip |
| Archive contents | One entry: base.apk |
| APK uncompressed size | 101,864,095 bytes |
| ZIP compressed size of APK entry | 54,869,072 bytes |
| APK SHA-256 | 42291c2010897f940e1691f357bfffcb8d35ba7c329104240d4b26412d3eae15 |
| ZIP entry timestamp | 2026-11-18 05:04 |
| APK container entries | 4,987 |
| Android manifest | Present; binary XML |
| Manifest size | 118,712 bytes |

The archive date and user description identify the file the user supplied, but do not independently establish that it is the latest publicly released ChatGPT mobile version. The manifest's version metadata was not fully decoded in this environment. Do not state a version name, version code, package identifier, signing identity, or release channel until those facts are obtained from a suitable tool and recorded with evidence.

## Inventory observations

- The archive contains Android application package content, not Node.js source code.
- It contains Android resource directories and Compose Multiplatform resource paths.
- A path inventory found 1,434 entries under assets/composeResources/com.openai, 1,609 entries under assets/, and 2,337 entries under res/.
- No entries were listed under lib/ in the ZIP inventory.
- The APK contains META-INF third-party notices and license files. Their presence indicates bundled third-party components; it does not grant ChatJS rights to copy those components.
- The manifest is a binary Android XML document. Raw strings from it are not sufficient to decode the full manifest accurately.

These are inventory facts, not a complete feature audit. Resource names and strings, even if extracted later, should not be treated as proof that a feature is enabled, available to every user, or supported through a public API.

## Intended use

Use the APK as a high-level reference for:
- identifying product areas to investigate;
- comparing visible navigation and interaction patterns when the user provides observations or screenshots;
- identifying localization coverage and resource organization;
- creating a dated checklist of user-visible behavior to test independently.

## Restrictions and safety

- Do not copy app source, compiled code, images, icons, fonts, proprietary strings, or other assets into ChatJS.
- Do not commit, host, or redistribute the APK.
- Do not attempt to bypass authentication, entitlement checks, certificate validation, or service access controls.
- Do not represent private application internals as stable public API.
- Avoid decompilation or extraction of proprietary implementation code. Prefer official documentation, user-observable behavior, and independent implementation.
- Record any future observation with date, platform, app version if verified, account/plan context if relevant, steps, expected result, actual result, evidence type, and confidence.

## Future reinspection

If a future session needs the APK, first check whether the attachment is still available and verify the SHA-256 against the value above. If it is unavailable, report that limitation rather than reconstructing or guessing its contents. If the file changes, update this document and project state with a new checksum and provenance record.
