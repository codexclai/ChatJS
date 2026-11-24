[object Object]

## 2026-11-24 — Project source policy and persistent browser profile

- Owner clarified that ChatJS Project → Sources is the primary and normal location for supplied ChatGPT packages. The personal Library must not be a dependency or default; it may be used only when genuinely useful, needed, accessible, and Sources cannot supply the required material. Any such Library content belongs under a folder named `ChatJS Project` and must be authentic, necessary source material or documented original findings only.
- Confirmed current Sources: Android `ChatGPT-Android.xapk`; Windows `ChatGPT-Windows.msix.part001` and `ChatGPT-Windows.msix.part002`. The Android file is an app bundle with required splits. The Windows pieces are sequential chunks of one installer, not independent packages; exact reassembly was verified.
- Owner designated the persistent browser profile `ChatJS` as the sole reusable default for ChatJS browser work. It already has Google and ChatGPT sessions authenticated. Temporary/disposable sessions are allowed only when genuinely required and must not be saved as another reusable profile.
- Permanent profile-preservation rule: never sign out, clear cookies/site data/storage, reset, delete, replace, or recreate the ChatJS profile. Preserve authenticated sessions and save profile changes.
- Temporary remote download workspace was removed after verifying the three installer sources in Project Sources. Remote `/workspace` was verified empty; the browser session and persistent profile were left open.
- No ChatJS runtime implementation, tests, dependencies, or user-facing package behavior were changed in this documentation-only work.
