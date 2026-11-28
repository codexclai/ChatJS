# Android ChatGPT Valdi Module Inventory

> Initial package census for the supplied Android ChatGPT client. This is a source-discovery index, not a statement that every module is enabled, entitled, reachable, or implemented in ChatJS.

## Source and method

- Supplied artifact: `ChatGPT-Android.xapk` (SHA-256 `22923301cf5fdd01adb0334fcb98c1af9b6395cb1177926ee7b4c28295fb973d`).
- Extracted Android package: `com.openai.chatgpt`, version `1.2026.321` (version code `2632129`).
- Enumerated and Zstandard-decompressed all `assets/*.valdimodule` entries from the base APK without executing the application or its JavaScript.
- Result: **111 / 111** module payloads decompressed; **9,355,429** compressed bytes and **77,451,888** decompressed bytes.
- SHA-256 values below are for each decompressed serialized Valdi packet, not for the APK or a decoded JavaScript source file.

## Evidence levels

1. **Packaged module** — the APK includes a compiled module asset. This alone does not prove the corresponding UI is visible, activated, supported by the account, or reachable in this build.
2. **String candidate** — a static string scan found a route-looking value. This is not proof of an HTTP request; some matches are concatenated with adjacent symbols, generated module import paths, fixture values, telemetry, or other non-production strings.
3. **Traced workflow** — method-level bytecode reconstruction establishes the callsite, request/response or local state behavior.
4. **ChatJS implementation** — a Node.js implementation exists and its relevant tests pass. A source marker or trace never upgrades itself to this level.

## Complete module census

| Module asset (basename) | Compressed bytes | Decompressed bytes | Decompressed SHA-256 |
|---|---:|---:|---|
| `address_autocomplete` | 250 | 344 | `6ca5219e5ba4b82c76a7e14d526b3888cc476cfc71804758a45a563298567790` |
| `audio_player` | 1,116 | 3,064 | `c9b80b1b7eb97f80d4191c7381b6cf171a19cf4920fef30612f0885d045f4ae6` |
| `bridge_observables` | 2,068 | 8,440 | `8af849e813cf0fe66b9b9af535fb90263633092c39e8eb9d8e569f3d8ed8837e` |
| `cel` | 15,134 | 59,788 | `739160a50d9a4c14cbb25fc7e745085a67804092ee06afa8cccbd4e1af49fc51` |
| `chatgpt_ads` | 14,090 | 62,736 | `6c9dccaab664375e9592ef99a25a63fa8f0d4bc3a9109af037e4f8272a8089b0` |
| `chatgpt_application` | 1,261 | 3,160 | `838390212802ee6880a20821c1b9a085e90bffc17741925d8ed85326bde64bec` |
| `chatgpt_beacon_artwork` | 26,030 | 139,608 | `8e2f7a1614ad07b30652bba2f183dce39c9824f1e2e66b676898bedb1c60b444` |
| `chatgpt_commerce_reporting` | 80,162 | 616,264 | `02ee981dfd9500e7d9412fe87cca509ad89a8f897df3de08c4eb1aaa85abb6ed` |
| `chatgpt_explore_feed` | 122,687 | 953,948 | `311feeedbca92ebb40d5fea54700b88fe11c1fc0795f76779ebdd2f05fdce2bc` |
| `chatgpt_family` | 408,586 | 5,113,260 | `678badc09d4c5496b1bd2d7b2687689f067ec7d88617aa0ca869bd87b6699b41` |
| `chatgpt_finance` | 130,492 | 1,085,112 | `ead59da07b525b1fe746f84056effa5f93bdf8b4159cb04ab1d66717946fedd6` |
| `chatgpt_finance_accounts` | 145,396 | 1,566,852 | `01c05ffd1fd36e704857502ed740423800d9d4216d45d92eec28748a999a32d6` |
| `chatgpt_finance_connections` | 280,727 | 3,328,056 | `dc5be387d36c99b02130a98a779298a054d90476a70298a174d988d8874cd3a6` |
| `chatgpt_finance_transactions` | 67,807 | 946,720 | `ceb229d9dde9a4725a60500d27e1f79fb80bf151c22735f948f4588b0487e07b` |
| `chatgpt_global_search` | 12,777 | 52,916 | `677c8319d194a34c1989d2c3df12d344b9df354ee61ba22d3406f1482936ae5b` |
| `chatgpt_health` | 178,980 | 1,477,976 | `33ff9136887d09862405aaf01eb8c99aee0fd438ac6071492c6a8ca24ddcbd2c` |
| `chatgpt_health_connect_permissions` | 581,272 | 6,036,676 | `5a29441a72a804f66e5090d531a427a7f766e328b21637da98ac454407f3c3fd` |
| `chatgpt_health_preview` | 5,447 | 20,884 | `de6541fad0dacd68383036e4729e4660cc0f624516272350104598997cbea153` |
| `chatgpt_learning` | 52,666 | 352,500 | `eb2465fca7063a4cae163524b53100d8ac03099c9cfc692fa9fe0b7285605ab7` |
| `chatgpt_library` | 23,457 | 115,092 | `99ba18e06052bd1a98d2ce8ebc984ee9e1fd5f910b2dbefceb0bdfb5713eca46` |
| `chatgpt_maltese` | 529 | 1,292 | `e0365430278f666457f2dc68f682bdc4c004167722df744efcb0b5aee3da7ebb` |
| `chatgpt_maps` | 44,270 | 377,340 | `8987bb79924eecf4ba80b4d96245aceaafb7b4272de09e3f9bb690e44231c8f4` |
| `chatgpt_multiplayer` | 57,050 | 257,916 | `204d80a4107f5d5c711bf55ee3e7089657ca361ec82ce37687e07cfc6e2697df` |
| `chatgpt_services` | 52,783 | 196,804 | `f35889b1dcb63568449f6b9be0a122edbcf3ab50269763aa500f3b3dd2b43376` |
| `chatgpt_shopping` | 242,524 | 588,840 | `8b90aadee22b454c54b072009b70e1787ace0ef0a1344f7ebfa1165ceb92ee2a` |
| `chatgpt_subscription_pricing` | 518,232 | 11,432,780 | `f52175653018aff020a0f78fdadd3931ba65657f31dd9fba7710d646223d5842` |
| `chatgpt_subscription_pricing_artwork` | 104,524 | 106,368 | `ae0a873d8b92ba04964e17ec30e5edec09ef936792c1ac3370a9e5ee1739f72e` |
| `chatgpt_wallet` | 107,066 | 534,140 | `0267ce79b8b85cfed00fa951b0f096007183ddcc67681f618630d03b9d140638` |
| `chatgpt_wallet_approval` | 77,272 | 644,660 | `0e8e3f90dcc6b636195fa4e87dd9d12891e90fea010280581c637c2ceddff19c` |
| `chatgpt_wallet_core` | 222,202 | 2,858,052 | `2076f6da5a6b57f60e1bdadd7847a6cd620fc87fb98c0f5a57fe262cf2ef5eb7` |
| `chatgpt_wallet_strings` | 204,024 | 2,518,344 | `6ee7edfac2f55f5a24f1b9bd8b8450b4e7dfb8b4e26b3bb3792f657f76b21832` |
| `client_sql` | 3,684 | 9,348 | `0a33f42564174d11c0f98faccc34ae71fdd47888806123b29fbc9786d6f22326` |
| `collaborative_editor` | 306,506 | 1,433,180 | `faebab72a15ca7ce5d4a8f278025dce0b4547c65d412d853311842d0a4052599` |
| `coreutils` | 9,858 | 28,944 | `302355b5bb704e7bb87370fe54e15b0981b019aed663378459b3230a74f72936` |
| `custom_instructions_ui` | 41,251 | 287,692 | `8937ad9ccf43197dd23b3384fbb4cae836f6781a0f0c15f133ec109f99a0ec48` |
| `dil_cel` | 16,916 | 56,868 | `4bed872e23484db63aa9eaed1d1100f1cc10be1a200057cf27077c4a6a8316f5` |
| `dil_charts` | 50,935 | 223,552 | `746b16601e0b6ed3f42ef9b0f7f69e871c8e25852132513cfdee0cfed8ace3f9` |
| `dil_compiler` | 27,919 | 104,352 | `874974f2209c873bc7305e996f31e32d311034e0b2e8a170f9d774efb96e8f93` |
| `dil_core` | 63,151 | 302,956 | `4f37d42b25127a7d690b4e7aaf0d6ffc74624aa772c2989103428fb8d7af03e9` |
| `dil_generated_components` | 439,828 | 8,723,332 | `48a583cec1cfbc11e90b309bd3b80234b3b136cd5c950c5f6158cf1c892eaf1f` |
| `dil_icon_assets` | 445,877 | 515,604 | `1e8d1d5f953134f8c9698da402cae89c4d55e5550b6a69a896ebf2c72e68205f` |
| `dil_math` | 2,062 | 4,432 | `3ed99316f9c66584099c382d032170da1cb95a2cd617ae507c875629dfdc3c33` |
| `dil_renderer` | 50,331 | 188,764 | `fd8f1f8b2f95ced8869d38075eb225a3c7c911dd3d47b727634c3d0e28a0e0e8` |
| `dil_sandbox` | 58,798 | 243,568 | `26a193ae0c7c1bb347847f82099819fb1c5403ece0afc6da780400f70848d0cb` |
| `dil_text` | 56,045 | 301,904 | `d5f795b4670c675eeb86e3d347b48d78bde21050e42c62422e5347c077d4994c` |
| `dil_widgets` | 504,312 | 2,348,188 | `ef4cdbce72ecbd3a2df14ccbff94c37b5bd7d27312bd5212778cd2ed5f24a0b8` |
| `drawing` | 3,443 | 10,680 | `1660719f17867840b7b7c2be9aeb4d9d5317636ef12b1d140f86f132a178bc07` |
| `ecosystem_instrumentation` | 419 | 656 | `3565cc59c879ef321a3318296d35800057e55c8e88847f25d18ea3dbfc60e138` |
| `foundation` | 18,739 | 76,272 | `da58b928dc7c072f680f5fc27ca0bf2b1bb819a2d6159aac1464e19aff5c99af` |
| `json_patch` | 5,056 | 16,036 | `6556831686c83f307a647a21028531faff422fdc7c3d864514a4701f88be72ca` |
| `latex` | 9,859 | 33,760 | `b96603f758af2119ca8719b80d95460927d6d00869a2243a7bbf9334af6e1927` |
| `lottie` | 2,175 | 6,452 | `7d6576581019296585b5331a336b5e83227e17f53a4d9adf04a464e4a07ae982` |
| `markdown` | 40,555 | 117,976 | `a5505fa7092ebf5ad9076222fd6c2b0749be5068d25699a1eb66d720d4bded3f` |
| `markdown_diff` | 123,897 | 525,544 | `75839c1783ca8592855bc44deb1a8f0c1946a772ed44d04e5a5baaa3dc775b21` |
| `math_jax` | 581,951 | 2,353,232 | `923f200461513a7706ac014bbc1e41b9a5d3a6e8300c9bf96238d9983b4d027a` |
| `math_renderer` | 3,893 | 12,152 | `cf91a0867c2b707fc216d4e315c87193c38049296829827032434224af546597` |
| `memory_settings_ui` | 83,598 | 665,464 | `13b3ccdbba020d26e75876d8c1267bdaaf1072bd1032342cf6d5bd58b4800d1c` |
| `mobile_file_saver` | 1,227 | 2,736 | `26b45e4cf4d950b0c1a3f9531cf4a0cb38b254d4aac6858780c08c20817a9bc5` |
| `native_menu` | 8,536 | 40,836 | `2009a91fb619e387ddef9963580cf4f828fb0d5bdd3df10fc201c3215376a360` |
| `oai_attachments` | 3,724 | 12,456 | `21e71e3dfdf6aabbf3ecdc310c706a5f6b80e07f9b4890cd401d58cb9166c099` |
| `oai_authentication` | 580 | 1,264 | `f7da08fe27a201d831562c4e1e50ca368860b5b01e4e1490615ee0ef40ab0f4c` |
| `oai_authentication_session` | 19,789 | 70,816 | `5211ced4520704e13e14ebb1f2faf51a91de091877f596a5a0516bd8bebd8917` |
| `oai_background_execution` | 805 | 1,528 | `3eac45fc3640b23f163a519fd57b58e477d9f6992bd46d5c9f6f50c3d129014a` |
| `oai_celsius` | 534 | 812 | `cc2e81a5113c6dbeb3b848c7408920324f5ebf9b4cc712ae3bdcff5abb359d0b` |
| `oai_conversation` | 119,263 | 608,680 | `24f6a6e7293dd09d8d72f0c2d5c5ab8b5b546b34c2e0f260c9f93e08374a99f8` |
| `oai_core` | 11,705 | 44,164 | `c10f2dbc9c89f2d4d23b77f4477865a37f20f1b93183cc59d2326caaee592eea` |
| `oai_crypto` | 538 | 784 | `fec013853fa1cfe0ad8723a3e32d84b7b47e2c7a0130c131254cf99f4e7a5fc6` |
| `oai_data_sources` | 252 | 340 | `d4d0a196db5e45319d223a5b08c8570af73e36ab0d18452d9378b6cd88d0d6da` |
| `oai_device_integrity` | 252 | 336 | `d087b397d9138492dc3476c65f1390dab6fa0a760f4847d32a1c503ab29713b5` |
| `oai_file_picker` | 2,660 | 8,596 | `d2101ab8cdc520cccf02d2669d3cf6424624d04adcf10ae1213dbc037a9ba5ac` |
| `oai_integration_fixtures` | 20,209 | 97,108 | `328ef96fa215231463571829299bd05ddb21d4b51e3b8c3f31a99d7018482fe9` |
| `oai_location_service` | 245 | 324 | `e2ecc4b1b61c225ac68331466c7d0050867bce86110c588ef5c041eaf620de6d` |
| `oai_logging` | 1,616 | 3,380 | `3db35bfdb72ea94be6a0f88e428a5b208e9fe02da710d158d92b4b9369fdbb55` |
| `oai_metrics_service` | 1,434 | 3,340 | `84c8e5a43d1fc80e2c0dd101d8b97ab28164004db978637756b14ad4ee0da767` |
| `oai_notifications` | 563 | 904 | `98344e0764df1352bf29994934809aa40a5131f3352ee890dade26b87aa6dc44` |
| `oai_platform_services` | 15,917 | 59,012 | `c4ee8a32796663a307d638c811d6867e4a3c8cb73832fba5def78b5ba317547e` |
| `oai_qr_scanner` | 1,078 | 2,176 | `3899b6b49f6e69015d85fea57fdd2096c81d09fa2fb3fbdcfc3b4029510cbc42` |
| `oai_reasoning` | 11,722 | 49,920 | `943a7a6059500cbafad7f369d62e924f0f24c4e58990119f83e3cda18ad319b2` |
| `oai_reasoning_api` | 555 | 928 | `e3fb7c8b6a1378e88a0152cb4e359f886277ff329285e28974b8b9da137f940f` |
| `oai_ui` | 130,274 | 582,740 | `fda7d5f46af9ee427e6d2cdab1b1548415bac6f9df0805406d208753f889126f` |
| `oai_voice_service` | 752 | 1,556 | `d474e2d4a9b0931cacd30215d116ded3cf2adb46e7382b326254ad834ca366c0` |
| `oai_web_launcher` | 4,088 | 13,272 | `b4efec33e90a709bf93ba8935a860791308a10826efaa3cc94b65cd076aa704b` |
| `oai_websocket` | 3,879 | 12,344 | `396e29775c05a2ba7fe4eac7588ae346b0c78865490ea634a78a4860e873d9fd` |
| `olympic_analytics` | 639 | 1,088 | `f829139d15c938b3d74f48cb008bfa18d858254a5b823a54a72f882e08632407` |
| `olympic_connections` | 10,522 | 39,624 | `8dc26b5c1040351600aceaf79176aa918b4360840c885476c4330c2579d93c98` |
| `olympic_health_home` | 814 | 1,444 | `05d110e8245c92e9aa588fc859624c6e7387e55b40b63aeff834c462d5dea306` |
| `olympic_records` | 17,036 | 70,096 | `e69466b906eac79384020eae159cf0bb09b612b683394613fe569062c856412c` |
| `persistence` | 2,141 | 5,684 | `16d08e6c5c6da9e6378fbda28841fca250ff955f23e05ef1b792d61476db1dbe` |
| `personalization_settings_ui` | 93,546 | 816,368 | `3aa01a594e45d66fcc3f4abe538ab6764d8276dad30447fcf0b310af6852cecb` |
| `settings_text_editor` | 4,705 | 19,168 | `f9209d4dce6aacd28862857847ff17c8bd6a90fd714bbd389b09163406b5a32b` |
| `source_map` | 4,016 | 10,152 | `db7232abcee1e2d3d8e643c556013dfbd3508edf101fc96b53ed7ee3d426817d` |
| `svg` | 4,519 | 14,828 | `1bc7d06d3758ab5fb8d302d77a4a43baad083f025c05064b6126e669f56e5279` |
| `valdi_core` | 148,676 | 620,408 | `4c9fcb29f4b9becb0532334816197767fedc7f060fc17770e29ccc28220c5c68` |
| `valdi_http` | 8,941 | 27,524 | `e122aaf007792de0e4d842ef21d57ecdd66155686cfd1e79b7a69f78700bda0f` |
| `valdi_module_updates` | 241 | 324 | `8483c290a63c316530cdb4da3e10fd2a855f5b7556536703ba8952dcf6918f73` |
| `valdi_navigation` | 12,184 | 45,224 | `61e143870d2d02e6e6bda8dbf4ed7366210b777de000a97ab430581a144c22ce` |
| `valdi_octane` | 13,514 | 48,056 | `be99430d31bb0b474f6ee921ffd137fc517f7ba367a2c42943687b1a157f9096` |
| `valdi_platform_alert` | 1,594 | 3,908 | `e6194cd1b4ef0316bc624ae3cb51cbb41499e816333ed31925412eebb2139cd5` |
| `valdi_platform_browser` | 961 | 1,772 | `44ef1c1a79835d77fc88949014c81f21ca08e2ce3a4d98acf58a59e366c01132` |
| `valdi_root_safe_area` | 253 | 332 | `fa422151bc4ff6ef0328dd955ed4df90f914be36e2635af89c457932c54ddc2e` |
| `valdi_runtime_bindings` | 756 | 5,224 | `fcab2f50399fefa4e18186816367f2d76ed74b8183be5bab3323d86c99ec35cb` |
| `valdi_rxjs` | 52,252 | 253,184 | `d597310f0992eaaf907223a6522c440dad0035f5878a075b847a56200f0629bf` |
| `valdi_test_utils` | 3,932 | 12,088 | `504e4b1fc138127a15c1dcb505066b0585efd31b6082d96b91862e4eb3ff5b4a` |
| `valdi_tsx` | 747 | 1,384 | `12276d5bf770317788383413abf7476f157db6aba31bfa55eb5ea2cdc7612ace` |
| `valdi_ui` | 57,628 | 327,776 | `9861c0c7cf0f2be1fae81a34b940f6d4a0f5688484a1cc6507be6338bc73473c` |
| `valdi_ui_theme` | 1,015 | 1,900 | `d0b0bccf3e09c9095a2bac26010d86f0462f0b576c3821d6ffff9a7344896e55` |
| `valdi_webview` | 420 | 580 | `bed5eca0621dd708d6383fbe59062d0b83d94fecb4c6654877b3c755803f7cbd` |
| `visualization_renderer` | 1,547,490 | 12,183,776 | `2e6ae6f3a3cfe6dc7538ed33f0e46237e7b5ed2faaffe2cf7d5f9df2a5ac4990` |
| `web_platform` | 154,281 | 631,116 | `df8007899c443cbcf5850776b3ad2cd429577db3577d89b2afc6222ab5c12f82` |
| `widgets` | 109,268 | 610,416 | `c3edcd0d663dacf29cf2bb01154e6ac85597aa2a0c3e246e2126951dd8604f6a` |
| `worker` | 9,202 | 27,252 | `cb3fa59c7d3047de531a174fe6b2827f46f0c3507084d0746f14562964ab7f45` |

## Modules with route-like string matches

**19 modules** contained one or more values surfaced by the static route-string scanner. These are retained as leads only. The scanner did not parse JavaScript ASTs or establish callsites; values may contain neighboring symbol text. The route-like values surfaced by the static scanner are listed in the table below; several are visibly concatenated with adjacent symbol text.

| Module asset | Candidate strings surfaced |
|---|---|
| `chatgpt_commerce_reporting` | `/backend-api/report_flow/reasons/commerce_product`<br>`/backend-api/report_flow/report` |
| `chatgpt_explore_feed` | `/backend-api/explore/feed/dil`<br>`/backend-api/explore/interactions`<br>`/backend-api/explore/interactions/batch`<br>`/backend-api/explore_experimental/generate` |
| `chatgpt_family` | `/backend-api/67/messaging` |
| `chatgpt_finance` | `/backend-api/aip/ledger/credit/connectionDdecodeFinanceAccountLinkingSession`<br>`/backend-api/aip/ledger/credit/verification/complete`<br>`/backend-api/aip/ledger/funnel-events`<br>`/backend-api/aip/ledger/institutions`<br>`/backend-api/aip/ledger/links6startAccountLinking.request`<br>`/backend-api/aip/ledger/linksH/backend-api/aip/ledger/credit/score`<br>`/backend-api/aip/ledger/oauth/start`<br>`/backend-api/aip/ledger/oauth/state/$encodeURIComponentTdecodeFinanceCreditVerificationEligibilityb/backend-api/aip/ledger/credit/verification/startLdecodeFinanceCreditVerificationSessionHnormalizeFinanceCreditVerificationId`<br>`/backend-api/aip/ledger/oauth/submit-public-token`<br>`/backend-api/aip/ledger/oauth/submit-public-token6accountLinkingState.requestH/backend-api/aip/ledger/oauth/state/`<br>`/backend-api/aip/ledger/profile`<br>`/backend-api/aip/ledger/tax_checkup`<br>`/backend-api/aip/ledger/widgets`<br>`/backend-api/aip/ledger/widgets0dashboardWidgets.request`<br>`/backend-api/ecosystem/call_mcp` |
| `chatgpt_global_search` | `/backend-api/global/search` |
| `chatgpt_health` | `/backend-api/aip/olympic/chats`<br>`/backend-api/composer/items/interactions`<br>`/backend-api/prompt_library6/backend-api/composer/items` |
| `chatgpt_health_connect_permissions` | `/backend-api/aip/olympic/account-connections` |
| `chatgpt_learning` | `/backend-api/learning/courses`<br>`/backend-api/learning/courses/$encodeURIComponent` |
| `chatgpt_multiplayer` | `/backend-api/files/library/files/$encodeURIComponent`<br>`/backend-api/multiplayer/documents/`<br>`/backend-api/multiplayer/documents/$encodeURIComponent` |
| `chatgpt_services` | `/api/estuary/upload_content_and_finalizeB/api/estuary/upload_content_bytes`<br>`/backend-api/conversations2/backend-api/conversation`<br>`/backend-api/f/conversation2/backend-api/conversationNoai-android-play-integrity-token-failed`<br>`/backend-api/files/library`<br>`/backend-api/files/library/nodesH/backend-api/files/library/bookmarksL/backend-api/files/library/directories`<br>`/backend-api/filesP/backend-api/files/process_upload_stream`<br>`/backend-api/images/bootstrap`<br>`/backend-api/models`<br>`/backend-api/my/recent/image_gen`<br>`/backend-api/pins6/backend-api/files/download`<br>`/backend-api/sentinel/chat-requirements`<br>`/backend-api/settings/account_user_setting`<br>`/backend-api/settings/user`<br>`/backend-api/user_system_message_enabled`<br>`/backend-api/user_system_messagesJCould` |
| `chatgpt_shopping` | `/backend-api/shopping/for-you`<br>`/backend-api/sidebar/shop_image` |
| `chatgpt_wallet_core` | `/backend-api/aip/connectors/links/list_accessible`<br>`/backend-api/apps/availability`<br>`/backend-api/ps/mcp`<br>`/backend-api/ps/plugins/$encodeURIComponent`<br>`/backend-api/ps/plugins/canonical-app/` |
| `dil_widgets` | `/backend-api/conversation/$encodeURIComponent`<br>`/backend-api/telemetry/sentry`<br>`/backend-api/widget_server_actionP/backend-api/widget_server_action/public` |
| `memory_settings_ui` | `/backend-api/memories` |
| `oai_authentication_session` | `/backend-api/accounts/check/v4-2023-04-27` |
| `oai_conversation` | `/api/ConversationContent`<br>`/api/ConversationContent&./ConversationStyle4ConversationActivityStatus`<br>`/api/ConversationContent.js`<br>`/api/ConversationContent2../api/ConversationPlugin&../api/MessageTypes`<br>`/api/ConversationPlugin`<br>`/api/ConversationPlugin.js`<br>`/api/ConversationPlugin6../../api/ConversationTypes`<br>`/api/ConversationTypes`<br>`/api/ConversationTypes.jsj`<br>`/api/MessageTypes`<br>`/api/MessageTypes.js`<br>`/api/MessageTypes4oai_core/src/OAIAttributes`<br>`/api/MessageTypesT../internal/conversation/ConversationStyleL../internal/message/MessageRenderModelH../internal/message/MessagePresenter`<br>`/api/composer/ComposerAttachmentPlugin`<br>`/api/composer/ComposerAttachmentPlugin.js7`<br>`/api/composer/ComposerAutocompletePlugin`<br>`/api/composer/ComposerAutocompletePlugin.js`<br>`/api/composer/ComposerDictationPlugin`<br>`/api/composer/ComposerDictationPlugin.js`<br>`/api/composer/ComposerModelPlugin`<br>`/api/composer/ComposerModelPlugin.js`<br>`/api/composer/ComposerModelPlugintoai_conversation/src/composer/model/ComposerModelPresenter`<br>`/api/composer/ComposerModelPluginxoai_conversation/src/composer/model/ComposerModelRenderModel`<br>`/api/composer/ComposerPermissionPlugin`<br>`/api/composer/ComposerPermissionPlugin.js`<br>`/api/composer/ComposerPlugin`<br>`/api/composer/ComposerPlugin$../ComposerHaptics`<br>`/api/composer/ComposerPlugin$../ComposerHapticsH../presentation/ComposerPresentation2./ComposerMenuContentView`<br>`/api/composer/ComposerPlugin.js`<br>`/api/composer/ComposerPluginJ../api/composer/ComposerTextInsertion&./ComposerInputViewF./prediction/ComposerPredictionViewP../api/composer/ComposerPredictionPlugin`<br>`/api/composer/ComposerPredictionPlugin`<br>`/api/composer/ComposerPredictionPlugin.js`<br>`/api/composer/ComposerTextInsertion`<br>`/api/composer/ComposerTextInsertion.js`<br>`/api/composer/MessageComposer`<br>`/api/composer/MessageComposer.js` |
| `oai_integration_fixtures` | `/backend-api/settings/user` |
| `oai_reasoning` | `/api/ReasoningRenderModel`<br>`/api/ReasoningRenderModel.js` |
| `personalization_settings_ui` | `/backend-api/personality_settings_impression` |

## Important classification notes

- `oai_authentication_session` contains the first-party Android authentication controller, native credential bridge, credential store, request-recovery component, validation helper, and generated account-check client. These methods are now separately indexed in `ANDROID_CLIENT_PROTOCOL_FINDINGS.md`.
- `chatgpt_services` includes strings associated with already-traced conversation, model, chat-requirements and upload workflows. Concatenated scanner matches are not complete endpoint names.
- `oai_integration_fixtures` is a test/fixture module; `/backend-api/settings/user` occurring there is not proof of a production request.
- `oai_conversation` and `oai_reasoning` contain `/api/...` module-like values. Do not treat internal module specifiers as backend HTTP routes.
- `dil_widgets` includes a `/backend-api/telemetry/sentry` string. ChatJS must not add telemetry, tracking, analytics, or crash uploads; this string is explicitly excluded from implementation scope.
- `chatgpt_ads` is a packaged module marker only. Ads are not a ChatJS feature under the project privacy/product requirements.
- `oai_background_execution` is a package marker; it is not evidence that Android Work semantics, entrypoints, eligibility or cloud operations have been traced. Android Work remains a separately sequenced client surface.
- Finance, Health, Maps, Wallet, Learning, Explore, Global Search, Shopping, Library, Family, multiplayer, personalization, memory and other named modules require per-feature method-level investigation. Their presence does not prove current account entitlement or availability.

## What this census does not establish

- Which modules are loaded in a particular account/session or feature-flag configuration.
- Whether a feature is available by region, plan, rollout, Android version, host capability or user permission.
- Complete endpoint methods, request schemas, response schemas, streaming, cancellation or persistence contracts for modules not yet disassembled.
- Actual end-to-end behavior in an authorized ChatGPT account.
- A working ChatJS implementation of any feature solely because its module appears in this table.

## Next investigation

Prioritize remaining Android non-Work modules by product surface, then disassemble method callsites and generated schemas. Only promote route strings after confirming the request construction path; only promote workflows to implemented after adding portable Node.js code and relevant tests. Android Work, Windows/Desktop and Codex CLI remain in the overall project target but are not the active execution priority.

## Android manifest cross-reference — 2026-11-28

A separate static parse of the supplied base APK's compiled AndroidManifest.xml verified package/version/SDK metadata, 87 distinct permission declarations (43 Health Connect permissions), nine declared hardware/graphics features, and 44 first-party application components (12 marked exported). These are package declarations, not proof of runtime grants, active feature availability, or a complete workflow. See [ANDROID_MANIFEST_FINDINGS.md](ANDROID_MANIFEST_FINDINGS.md) for source hashes, grouped permissions, selected components, evidence limits, and follow-up work.
