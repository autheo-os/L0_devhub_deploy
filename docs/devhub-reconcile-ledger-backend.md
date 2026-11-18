> **Historical.** This ledger records an earlier merge that ported the DevHub Marketplace, THEO billing, devhub.yml and game-server backend onto shadow. That backend code was later removed: the backend is now a one-to-one mirror of dywongcloud/shadow 661ae7d. Kept for the record only.

# DevHub (9f5162a) onto shadow main: backend / ansible / root ledger

Branch `rec-rust`, base shadow `661ae7d`, merged DevHub `9f5162a`. Scope: every conflicted file outside `ui/`,
`llms.txt`, `robots.txt` (those were resolved `--ours` so the index is clean; the UI agent swaps them later; two
`ui/app/*/page.tsx` files shadow deleted stay deleted). 29 files were hand-resolved. Clean-merged DevHub files were kept.

Policy applied: shadow wins platform code; DevHub-only features are ported onto shadow's current APIs.

## Per conflicted file

| File | DevHub intent | Kept from DevHub | Taken from shadow / why |
|---|---|---|---|
| `.github/workflows/rust-ci.yml` | extra "package disposable local-test node" artifact steps | none | shadow's Rust-runtime witness job; the packaging steps are a manual `workflow_dispatch` convenience, not DevHub functionality |
| `Cargo.lock` | new deps | `sha3`, `keccak`, `ryu-js`, `ed25519-dalek` use, `serde_yaml` for fluid-build (30 added lines) | started from shadow's lock; cargo added only what DevHub crates need; no version bumps |
| `ansible/ansible.cfg` | vault pass path under `~/.config/autheo` | none | shadow `vault_password_file = .vault_pass` (see Not ported) |
| `ansible/inventory/group_vars/all/vars.yml` | DevHub repo URL, marketplace vars | all `hive_marketplace_*` vars | shadow's repo/binary-path vars. `hive_marketplace_project` defaults to `""` (DevHub's default was `neighborhood-marketplace`) so a shadow fleet does not provision the CA/gateway; DevHub inventory must set it |
| `ansible/roles/build_executor/defaults/main.yml` | marketplace migration network settings | all `build_executor_migration_*` | comment text merged |
| `ansible/roles/hive_platform/tasks/main.yml` | root-only `/etc/hive/hive-secrets.env`, marketplace CA tasks | both | shadow's header comment |
| `.../hive-node.service.j2` | secrets via EnvironmentFile, marketplace env, tolerant Tencent condition | DevHub's block (needed by the EnvironmentFile change that merged cleanly) | none |
| `ansible/roles/hive_ui/tasks/main.yml` | `/etc/hive-ui.env` install + restorecon | both tasks (unit already reads that file) | dropped long prose comment |
| `crates/fluid-build/Cargo.toml` | `serde_yaml` for devhub.yml | both deps | |
| `crates/fluid-core/src/lib.rs` | `image_volume_path` request field | field | shadow's `git_token` doc |
| `crates/hive-backend/src/lib.rs` | marketplace credential file mounts in podman run | the two mount hunks | shadow's cpu-sampler docs |
| `crates/hive-cloud/assets/worker-launcher.mjs` | `--experimental-strip-types` | none | shadow uses `transform-types` |
| `acme.rs` | none (old text) | none | shadow (fleet tickets, raw TLS) |
| `admin.rs` | marketplace route, game routes, security posture, wallet-config, THEO billing | see below | shadow billing/Stripe, `/v1/mesh` unauthenticated probe, node views, apikeys proxy |
| `auth.rs` | `/v1/marketplace/` exemption; auth on all reads | marketplace exemption **in `is_open_route`** | shadow's centralised gate, role matrix, anon-read behaviour |
| `billing.rs` | THEO checkout confirmation | `confirm_theo_checkout` | shadow persistence docs, Stripe fns, `mock_checkout_allowed` |
| `compose.rs`, `guardian.rs`, `sandboxes.rs`, `tencent_eip.rs` | doc/format drift | none | shadow |
| `git.rs` | marketplace placement, devhub.yml, game mods, image volume path, builder v2 | see below | shadow flow (deployment ledger, alias promote, SEP key, dispatch fallbacks) |
| `gossip.rs` | `/v1/devhub/runtime-artifacts/v1/.../package` arm | arm, ahead of shadow's runtime-artifact arm | |
| `main.rs` | marketplace/game spawns + routes, panic hook, cpu/gpu inventory | all | shadow host dispatch (api host serves admin router), `install_ring_crypto_provider` |
| `persist.rs` | marketplace snapshot load | load of 3 marketplace stores | shadow writer loop |
| `project_settings.rs` | `GameServerSettings`, `game` row, `set_game(_exact)` | all | shadow docs |
| `relational.rs` | `theo_transaction_hash` column | column in DDL, upsert, ALTER reconcile | shadow's `SCHEMA_TABLES` and multi-row insert |
| `restart_audit.rs` | panic hook and `panic_abort` verdict | all | shadow's history loading |
| `schedule.rs` | marketplace node allowlist | `approved_node_ids` in `place`, `place_for_project`, plus the stickiness filter | shadow capability/disk gates; added to `dispatch_fallbacks` too (see below) |
| `hive-edge/src/region.rs` | `gpu_devices` | field | shadow's `started_ms` doc |

### admin.rs details
- Ported: `/v1/admin/marketplace`, `PUT/DELETE /v1/projects/:project/game`, `GET /v1/security/posture`,
  `GET /v1/billing/wallet-config`, `GET /v1/billing/checkout/:id/payment-intent`, `marketplace_placement: None` on request literals.
- THEO billing is **additive, not a replacement.** DevHub replaced Stripe with an on-chain THEO flow. Here shadow's Stripe
  flow is untouched. THEO is used only when `STRIPE_SECRET_KEY` is unset AND `THEO_CHAIN_ID` is set. `billing_confirm` takes optional
  `wallet` + `transaction_hash`; with them it runs DevHub's on-chain `verify_theo_settlement`, then `confirm_theo_checkout`, then
  shadow's effect dispatch (`apply_plan_everywhere(.., PlanChange::Paid)`). A hash on a Stripe-configured node or a Stripe-session
  checkout is a 400. The payment-intent GET resolves through `billing_checkout_get`, so it proxies to the billing authority like shadow's reads.
  The checkout GET adds `amount_theo_atomic`/`network` only when THEO is configured.
- `billing_charge`, `billing_addons` merged clean from DevHub; shadow already had `/v1/billing/charge`.

### git.rs details
- `marketplace_approved_nodes`, `inject_marketplace_runtime`, `inject_marketplace_workload_credential`, `marketplace_migrations::run`,
  `deploy_full/stage_full_with_runtime_exact_marketplace`, `MARKETPLACE_PLACEMENT_UNAVAILABLE` refusal, devhub.yml
  (`fluid_build::load_devhub_config_checked`; precedence request > devhub.yml > project settings) and the game-mods hook in `image_container_manifest` kept.
- The shadow deployment-ledger / alias-promote block was restored verbatim; only the two gateway calls became the `_marketplace` variants.
  DevHub's `flip_production` was dropped because the gateway already gates `production` on `Ready` state.
- Builder protocol v2 (OCI Dockerfile/Compose build inside runsc, `build_oci_source` etc.) is kept and only used when the node's
  live-probed executor advertises `builder_v2` and the session is not `host_build`; every other node keeps shadow's host-podman path.
  `image_container_manifest` treats a `sha256:` image as already local (no pull).
- Security fix beyond a pure merge: `schedule::dispatch_fallbacks` gained `approved_node_ids`, otherwise a failed dispatch would
  walk to nodes outside the buyer's Marketplace allowlist.

## Not ported / needs a human
1. DevHub's **private-Admin lockdown**: public listener returning 404 for `api.`/`admin.`/`webhook.` hosts and `validate_admin_bind`
   (refuse non-loopback Admin bind). Conflicts with shadow's public `api.<domain>` model; `/v1/marketplace/*` is reachable on the api host (HMAC-protected). Decide per fleet.
2. DevHub's **"every request except /healthz needs auth"** (reads included) and authenticated `/v1/mesh`: shadow's anon-read model
   (`x-hive-anon`) and unauthenticated `/v1/mesh` watchdog probe were kept.
3. THEO is not the sole rail; DevHub's UI must send `wallet` and `transaction_hash` on confirm. DevHub's credit amount had no upper bound; shadow's `MAX_AMOUNT_CENTS` applies.
4. `ansible.cfg` vault path: shadow's `.vault_pass` kept, but `ansible/README.md` and `deploy-autheo-devhub.sh` (clean from DevHub)
   refer to `~/.config/autheo/ansible/vault_pass`. Reconcile.
5. `hive_marketplace_project` default blanked (see above); DevHub inventory must set it.
6. Dropped from DevHub's `rust-ci.yml`: the local-test node packaging steps.
7. DevHub's `#![allow(dead_code)]` headers (git.rs, guardian.rs, sandboxes.rs) were not carried; `cargo check` reports ~100 dead-code warnings in hive-cloud (not compared against shadow's baseline).
8. DevHub's reformatting-only hunks that merged clean were left; no `cargo fmt` pass was run.
9. Marketplace/DevHub routes `POST /v1/devhub/runtime-artifacts/import`, `POST /v1/devhub/releases/:release/artifact-binding`,
   `POST /v1/projects/:project/marketplace-releases` have no `RULES` row, so they are admin-floor by default; handlers enforce operator / project ownership. Not live-tested.
10. Nothing was exercised live (no node, no Marketplace round trip, no Stripe/THEO transaction, no ansible run).

## New routes needing `roles::RULES` / `ui/lib/team-role.ts` rows
Added to `roles.rs` in this merge (mirror in `ui/lib/team-role.ts`):
- `WRITES /v1/projects/:project/game` member
- `GET /v1/admin/marketplace` admin (operator-only in handler)

Reads that default to viewer and need no row: `GET /v1/security/posture`, `GET /v1/billing/wallet-config`,
`GET /v1/billing/checkout/:id/payment-intent`. Open routes (own HMAC): `/v1/marketplace/*` in `auth::is_open_route`.
Admin-by-default writes listed in item 9 need a decision if members should call them.

## Verification
`cargo check --workspace --locked` pass; `cargo test --workspace --no-run --locked` pass;
`cargo test -p hive-cloud --bin hive-cloud --locked`: 271 passed, 0 failed, 5 ignored.
