# DevHub (9f5162a) onto shadow main: ui ledger

Branch `rec-ui`, base shadow main 661ae7d. Scope: every conflicted file under `ui/`, plus `llms.txt` and `robots.txt`. Nothing was built or
type-checked (no node_modules; no `next build`, no `tsc` with real types). Verification was: no conflict markers, every `@/` import and named
import in the 105 changed ts/tsx/mjs files resolves to an existing file/export, and a syntax-only `tsc --noResolve` pass (TS1xxx errors) is clean.

Conflicted non-ui paths (crates/, ansible/, Cargo.lock, .github/) were taken from shadow (`--ours`) as instructed.

## Method

* Marketing/brand text: shadow's version of the file, then DevHub's brand mapping applied mechanically (`shadw.cloud` -> `autheo.dev`,
  `shadw.app` -> `autheo.app`, `OpenEdge` -> `DevHub`, prose `shadw` -> `autheo`). CLI command lines (`shadw deploy`, `shadw auth ...`), identifiers,
  storage keys and `shadw-*` names were NOT renamed.
* Functional files: shadow's version, DevHub's specific additions re-applied by hand or by `patch` and then re-read.

## Per conflicted file

| File | DevHub intent | Kept | From shadow | Why |
|---|---|---|---|---|
| `app/api/gitops/project-ci/route.ts` | OpenEdge -> DevHub wording | DevHub wording in the doc comment and the "no DevHub webhook URL" reason | everything else | functional file |
| `app/api/preview-unlock/route.ts` | rewrote the zk URL to `/_autheo/zk` | nothing | whole file (`/_shadw/zk`, `isLocalhostHost`) | the backend (`edge.rs`, `zkauth.rs`, both sides) only serves `/_shadw/zk`; DevHub's UI path was a bug |
| `app/api/tv/hls/route.ts` | UA string | UA `autheo-tv/1.0` | whole bounded/safeGet relay | security-hardened in shadow |
| `app/oauth/github/callback/route.ts` | comment domain | comment domain `autheo.dev` | whole file | functional |
| `app/api/token/route.ts` | dev mint only against a loopback admin (`localAdminUpstream`) | `localAdminUpstream()` + extra `devMint` condition (strictly tighter) | everything else, incl. verified-Clerk identity | security: shadow wins, DevHub's addition only narrows |
| `app/billing/checkout/page.tsx` | THEO wallet settlement replaces the card form | dual mode: if the checkout carries `amount_theo_atomic` + `network` render the wallet flow (payment-intent, chain switch, `sendTheoTransfer`, confirm with tx hash), else shadow's card/Stripe form | `RoleGate action="billing.pay"`, error handling, card flow | a USD/Stripe node and a THEO node both work |
| `app/billing/page.tsx` | all amounts in THEO, `TheoMarketReference`, wallet badge | `theoMode` (node reports no `stripe` boolean) switches money formatting, badges, rate card, header and market reference | RoleGate, plan-change helpers, poll constants, `?success` confirm effect | same dual-mode reasoning |
| `lib/api.ts` | `GameServerSettings` + `ProjectSettings.game`; `stripe`/`stripe_customer` removed from billing types; `typeof process` guards | `game` field and `GameServerSettings`; `stripe`/`stripe_customer` made optional | all of shadow's client (session clock, cache, role refusal, ...) | the `typeof process` guards were NOT ported (shadow's env reads are proven; see below) |
| `app/blog/page.tsx`, `app/case-studies/page.tsx` | rebrand of the page | NOT kept (deleted) | shadow deleted them (commit e194d54 "fabricated pages removed"); `next.config.mjs` redirects `/blog` -> `/docs`, `/case-studies` -> `/solutions` | brand-only change to content shadow removed on purpose |
| `app/contact`, `features`, `privacy`, `product`, `solutions`, `status`, `docs/*` (5 files + generated method page) | rename to autheo | brand mapping on shadow's text | shadow's `pageMeta`/`darkViewport`, a11y `tap-44`, rewritten copy | non-brand shadow changes kept |
| `app/pricing/page.tsx` | prices in THEO, `TheoMarketReference` | every `$N` -> `N THEO`, market reference above the grid | shadow's five tiers, FAQ, layout | pricing text is marketing |
| `app/network/page.tsx` | security-posture transport stat + `SecurityProfile` | both, using shadow's existing `Stat.hint` prop | role gating, browser presence | DevHub feature |
| `app/layout.tsx` | Autheo title/metadata, `WalletProvider`, Clerk Suspense restructure | brand metadata (title "Autheo DevHub - Electric Cloud Platform", template, JSON-LD, theme colors, `autheo.dev` redirect origins), `WalletProvider` | `instant = false`, `GithubConnectError`, `LoginOtpChallenge`, ClerkProvider structure | DevHub's Clerk restructure not ported (cannot be build-tested) |
| `app/manifest.ts` | Autheo name, colors, New project shortcut | name, colors `#050b07`/`#0f8a3b`, description, "New project" shortcut | "Run a node" shortcut | both shortcuts present |
| `app/opengraph-image.tsx` | Autheo card | DevHub's file verbatim | none | brand. Its subline says "peer-to-peer", which `components/landing/AGENTS.md` forbids on a social card: needs a human |
| `app/robots.ts`, `robots.txt`, `llms.txt` | Autheo | DevHub's versions (robots.txt without its stray first line "FIX THE PATHS WHATNOT ON THIS") | none | brand. Shadow's 2052-line `llms.txt` and fuller `robots.txt` crawl lists are replaced, not merged |
| `app/globals.css` | green theme, hero stencil, globe CSS, 240 ms transitions | DevHub's three hunks | rest (reduced motion, forced-colors, shadow additions merged cleanly) | brand/theme |
| `app/home-client.tsx` | dashboard heading, `OpeningSplash`, `SecurityProfileBanner` | shadow's file (dashboard moved to `home-dashboard.tsx`) | all | the additions were re-applied in `app/home-dashboard.tsx`; `OpeningSplash` lives in new `components/opening-splash.tsx` so the landing chunk stays split |
| `app/new/page.tsx` | game menu + guided setup, 3 Smart Contract templates, marketplace deploy modal, `DeploymentModelHelp`, `volumeMountPath`, generic env validation, `?game=`/`?category=games` deep links | all of it, via patch + manual repair of 3 misplaced hunks; the generic "Minecraft Server" template dropped (it is a game preset) | shadow's template union, image-ref handling | DevHub-unique features |
| `app/projects/[project]/project-detail-client.tsx` | Marketplace button/modal and project resources | all, patched then repaired | role gates (`useCan`) | |
| `app/projects/[project]/settings/network/network-settings-client.tsx` | comment only | comment | rest | |
| `app/usage/usage-view.tsx`, `domains/[domain]/domain-detail-page-client.tsx`, `components/gitops.tsx`, `components/api-sidebar.tsx`, `components/region-map.tsx`, `components/wf-console-frame.tsx`, `components/team-picker.tsx`, `lib/deploy-url.ts`, `app/deploy/[id]/deploy-page-client.tsx` | OpenEdge -> DevHub wording; `typeof process` guards | DevHub wording | everything else | deploy page: DevHub's side was the old status wording |
| `components/logo.tsx`, `theme-toggle.tsx`, `globe.tsx` | text logo + `LightningMark`, labelled toggle, `AnimatedGlobe` | DevHub's files (`tap-44` re-added to the toggle) | | brand |
| `components/footer.tsx` | year via effect, "Autheo DevHub" | both | shadow's slim footer (no fake "All systems normal"), real `/status` and `/privacy` links | |
| `components/marketing-shell.tsx` | text logo, green palette | text logo, green watermark gradient, copyright, "autheo vs" labels | shadow's `lp-*` shell, black surface | |
| `components/topnav.tsx` | Marketplace link (`marketplaceUrl()`), `WalletConnectionButton`, `LightningMark` | Marketplace link + wallet button | shadow's breadcrumbs, Analytics tab, `Logo` | `WalletConnectionButton` now renders nothing when `/v1/billing/wallet-config` fails |
| `components/app-chrome.tsx`, `auth-shell.tsx`, `pwa-register.tsx` | `typeof process` guard; footer text; sw reload key | footer text, `autheo-sw-reloads` key | the rest | |
| `components/landing.tsx` | Autheo hero, marketplace band, device image, `OpeningSplash` | `MarketplaceBand` (new `components/landing/marketplace.tsx`, links to `marketplaceUrl()`) inserted after the ticker | shadow's whole modular landing | see "Needs a human" |
| `next.config.mjs` | `allowedDevOrigins`, `turbopack.root`, `/` moved to no-store | `allowedDevOrigins: ["127.0.0.1"]` | CSP, `LANDING_CACHE` for `/` (root `AGENTS.md`: byte-identical with `proxy.ts`), existing `shadw.cloud` entries untouched | CSP not widened |
| `proxy.ts` | run without Clerk keys (`clerkConfigured`): admin/ops fail closed, rest passes | the no-Clerk branch, with shadow's `isClerkFree` check kept | everything else | needs a human, see below |
| `package.json`, `package-lock.json` | ports 3001, `jose`, `dev:marketplace` | `dev:marketplace` script | shadow's lock and port 3000 | `jose` is unused in `ui/`; lock/port changes left out |

Also changed outside the conflict list: `lib/page-meta.ts`, `status`/`sign-in`/`sign-up` layouts, compare pages and nav, `components/landing/*` copy,
`lib/api-catalog.ts` (brand mapping, `autheo` in prose and `api.autheo.dev` examples); `components/landing/intro-loader.tsx` now uses
`/autheo-devhub-logo.png`; the webhook settings text now says `X-Hive-Signature` / `X-Hive-Event` (the backend sends those; both shadow's `X-OpenEdge-*`
and DevHub's `X-DevHub-*` were wrong).

## Needs a human / not ported

1. Game presets: `lib/game-server-presets.ts` at 9f5162a has 11 presets (the 8 listed plus Palworld, Valheim, Arma 3), and `scripts/check-game-presets.mjs` asserts 11.
   Nothing was removed.
2. Billing model: THEO wallet settlement vs USD/Stripe is a product decision. The UI supports both; the backend endpoints below exist only in DevHub's Rust.
3. Landing look: shadow's landing is a black, rose/blue design system with its own invariants. Only copy, names, logo (intro) and a marketplace band were
   rebranded; the green Autheo look is not applied to `landing.css` (needs design work and a visual check). Dashboard screenshots in
   `public/product/dashboard-*.png` still show the old brand and need a recapture. DevHub's "Autheo Development Hub" hero and device mock were not used.
4. `opengraph-image.tsx` text vs the "no peer-to-peer in a social card" rule in `components/landing/AGENTS.md`.
5. `proxy.ts` no-Clerk mode and DevHub's Clerk-in-Suspense layout restructure (`instant = false` removal) were decided without a build.
6. `typeof process !== "undefined"` guards (api.ts, deploy-url.ts, team-picker.tsx, app-chrome.tsx, home-client) were not ported; if DevHub needs them in its
   embedded browser, re-add.
7. DevHub marketplace API routes (`app/api/marketplace/*`) read the Clerk session with bare `auth()`; `ui/AGENTS.md` says `verifiedUserId()` is the one
   resolver (bare `auth()` reads signed-out on iOS Safari). They are DevHub-only, merged cleanly and untouched.
8. `lib/origin.ts`, `lib/owner.tsx`, `proxy.ts` still carry shadw.cloud / shadw.com entries (out of scope; parameterization task). `AGENTS.md` / `landing/AGENTS.md` still describe shadw.
9. `lib/compare-data.ts` (79 shadw mentions, data keys included) was not rebranded.
10. Deleted blog and case-studies pages: restore DevHub's rebranded versions only if the owner wants them back.

## Backend endpoints the UI depends on (backend agent)

* `GET /v1/billing/wallet-config`, `POST /v1/billing/checkout/:id/payment-intent`, `POST /v1/billing/confirm` with `{session, wallet, transaction_hash}`;
  checkout JSON with `amount_theo_atomic` + `network`; `GET /v1/billing` without a `stripe` boolean in THEO mode.
* `GET /v1/security/posture` (network page, dashboard banner).
* `ProjectSettings.game` / `GameServerSettings` fields and the Drive-mods/game settings routes used by `settings/game`.
* Marketplace: `/v1/marketplace/*` (payment-intents etc.), placement policy and project resource attach used by `app/api/marketplace/*`;
  env `NEXT_PUBLIC_MARKETPLACE_URL` (existing DevHub variable).
* `GET /api/market-reference/theo` is a UI route (public price feed), no backend.
