# Third-Party Notices

DevHub / OpenEdge includes or depends on the third-party software listed below. Each component
is licensed under its own terms, as stated here and in the license files shipped next to it. The
proprietary terms in `LICENSE.md` cover only the Licensor's original work (see `LICENSE.md` §7).

This inventory was produced with ScanCode Toolkit 33.0.0rc1 (`scancode -clpi`) over the tracked
files at commit `baf9ce7`, plus `cargo metadata --locked` and the npm lockfiles. Re-run both
before each release.

## Source code copied into this repository

| Path | Upstream | Version / commit | License | Modified? | License file in tree |
|---|---|---|---|---|---|
| `ui/vendor/workflow-web/` | [vercel/workflow](https://github.com/vercel/workflow) (`@workflow/web`, `@workflow/web-shared`, `@workflow/world`) | commit `1225258b5da66be40749c17d12c4e24d32197aa2` (web 5.0.0-beta.36, world 5.0.0-beta.22) | Apache-2.0, Copyright Vercel Inc. | No. Byte-identical to upstream at that commit (verified 2026-11-12). Provenance is in `VENDOR-INFO.json`. | `ui/vendor/workflow-web/LICENSE.md` |
| `vendor/iroh/` | [n0-computer/iroh](https://github.com/n0-computer/iroh) | 1.0.2 (crates.io checksum in `CHANGES.md`) | MIT OR Apache-2.0, Copyright N0, INC.; parts BSD-3-Clause (Tailscale) | **Yes.** 7 files under `src/` are patched. Each carries a modification notice, and the patches are described in `vendor/iroh/CHANGES.md`. | `LICENSE-MIT`, `LICENSE-APACHE`, `LICENSE-BSD3` |
| `vendor/guardian-db/` | [wmaslonek/guardian-db](https://github.com/wmaslonek/guardian-db) | 0.18.0 | MIT OR Apache-2.0 | See upstream history | `LICENSE-MIT`, `LICENSE-APACHE` |
| `vendor/cr-sqlite/` | [vlcn-io/cr-sqlite](https://github.com/vlcn-io/cr-sqlite) | vendored tree | MIT, Copyright One Law LLC; bundled SQLite is public domain ("blessing") | — | `vendor/cr-sqlite/LICENSE` |
| `vendor/ws_stream_wasm/` | [najamelan/ws_stream_wasm](https://github.com/najamelan/ws_stream_wasm) | vendored tree | Unlicense | — | `vendor/ws_stream_wasm/LICENSE` |
| `crates/hive-browser/www/sqlite/wa-sqlite/`, `ui/public/browser-node/sqlite/wa-sqlite/` | [rhashimoto/wa-sqlite](https://github.com/rhashimoto/wa-sqlite) | `VFS.js` = upstream `a110948`, `sqlite-constants.js` = `c8d0b3d`, `examples/AccessHandlePoolVFS.js` = `cf05819`; `sqlite-api.js` differs from every upstream revision checked (derived) | MIT, Copyright Roy T. Hashimoto | `sqlite-api.js` only | `LICENSE` in each copy |
| `crsqlite-sync.wasm` (same two directories) | Built from `vendor/cr-sqlite` + SQLite + wa-sqlite | — | MIT + public domain | Build output | see the rows above |

## Packages that are not affiliated with Vercel

`packages/vercel-sdk` (`@openedge/vercel-sdk`) is an **independent implementation** of the
`@vercel/sdk` constructor shape. It contains no upstream source. Compared with
`@vercel/sdk@1.28.62` (Apache-2.0), only two trivial lines coincide. The package is MIT. "Vercel"
is a trademark of Vercel Inc. and is used only to describe interface compatibility.

`ARCHITECTURE.md` describes an independent Rust implementation of the architecture Vercel
published in a public blog post. ScanCode found no Vercel copyright statements outside
`ui/vendor/workflow-web/`.

## Rust dependencies (`Cargo.lock`, 801 crates)

| License | Count |
|---|---|
| MIT OR Apache-2.0 (in its various spellings) | ~480 |
| MIT | 169 |
| Unicode-3.0 | 18 |
| Apache-2.0 (incl. WITH LLVM-exception options) | ~30 |
| BSD-2/3-Clause, ISC, Zlib, Unlicense, CC0, BSL-1.0 | remainder |

Copyleft notes, all of which are acceptable for proprietary distribution:

- `attohttpc` 0.30.1 is MPL-2.0. MPL is file-level copyleft: unmodified use is fine, and its
  source files must stay MPL if they are ever changed.
- `self_cell` (Apache-2.0 OR GPL-2.0-only), `r-efi` (MIT OR Apache-2.0 OR LGPL-2.1+) and
  `htmlescape` (Apache-2.0 / MIT / MPL-2.0) are used under their permissive option.
- No crate is GPL-, AGPL-, SSPL- or BUSL-only.

## Dashboard npm dependencies (`ui/package-lock.json`, 609 packages)

| License | Count |
|---|---|
| MIT | 483 |
| Apache-2.0 | 46 |
| ISC | 44 |
| LGPL-3.0-or-later | 10 |
| BSD-2/3-Clause | 13 |
| Apache-2.0 AND LGPL-3.0-or-later | 4 |
| MPL-2.0, CC-BY-4.0, BlueOak-1.0.0, Unlicense, OFL, CC0, 0BSD, Python-2.0 | 1 each |

The LGPL entries are all `@img/sharp-libvips-*` / `@img/sharp-*` (the prebuilt libvips used by
`sharp`, which Next.js uses for image optimisation). libvips is dynamically loaded and unmodified,
which LGPL-3.0 allows in proprietary software. Keep its license text with any redistribution of
`node_modules`, and do not statically link or modify it.

## Docs that mention GPL / AGPL

ScanCode reports GPL/AGPL text in `docs/game-server-presets.md`,
`docs/game-server-mod-version-plan.md`, `docs/browser-node-proposal.md` and
`ui/lib/game-server-presets.ts`. These are **descriptions** of third-party game-server container
images that tenants run from upstream registries. They are not code included in DevHub.
Redistributing those images is subject to their own licenses and to the game publishers' terms.
