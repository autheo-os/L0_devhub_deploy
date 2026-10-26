# Autheo DevHub landing page

A standalone, static Vite + React multi-page marketing site for Autheo DevHub.
It does not import, modify, or run the existing DevHub application and does not
depend on client-side history routing.

## Pages

- `/` - DevHub overview
- `/build-deploy/` - Build & Deploy
- `/manage-monitor/` - Manage & Monitor
- `/cloud-computing/` - Cloud Computing
- `/ai-assisted/` - copyable prompts and an external AI-assistant workflow
- `/getting-started/` - practical six-step first-website guide, reproducible
  Vite example, interface map, and troubleshooting
- `/marketplace/` - Neighborhood Marketplace concept

Each URL has a real HTML entry point. `vite.config.ts` lists each entry
explicitly, and the shared React entry reads the page identifier from the
HTML body.

## Prerequisites

- Node.js 20 or newer
- npm
- On Linux or WSL, the standard `zip` command for creating the deployment
  archive. Native Windows uses PowerShell's built-in ZIP support.

Install the locked dependencies from this directory:

```bash
npm ci
```

## Local development

Start Vite's development server:

```bash
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.
Open any page path above directly to work on that entry.

## Production build

Type-check the project and generate the static site in `dist/`:

```bash
npm run build
```

The output contains `index.html`, one nested `index.html` for every detail
page, and shared hashed JavaScript, CSS, image, and font assets. Asset URLs are
rooted at `/`, so this build must be hosted at the root of a domain.

## Production preview

Build the site, then serve the generated output locally:

```bash
npm run build
npm run preview
```

Vite prints the preview URL, normally `http://localhost:4173`. The preview
serves `dist/`; it is not intended to be a production web server. Directly
open every page path (for example,
`http://localhost:4173/build-deploy/`) rather than testing only navigation
from `/`.

## Deployment ZIP

Create a fresh production build and package it:

```bash
npm run package:zip
```

This creates `autheo-devhub-landing.zip` in this directory. The archive
contains the **contents** of `dist/`, so `index.html` is at the ZIP root and
all nested page entries keep their URL directories. It does not include source
files, `node_modules`, source maps, local environment files, or other
development files.

shadw.cloud accepts files-only ZIP archives. On Unix, the packaging script
uses `zip -D` so no explicit entries ending in `/` are created. On Windows, it
adds regular files directly through the system compression API. Do not replace
this behavior with a command that adds explicit directory entries.

## Upload to static hosting

1. Run `npm run package:zip`.
2. Upload `autheo-devhub-landing.zip` to the static hosting service.
3. Configure the service to publish the extracted archive at the domain root.
4. Confirm that `/index.html` is the root entry, every nested page serves its
   own `index.html`, and `/assets/*` is served as static content.

The site requires no server-side rendering and no SPA rewrite rule. The host
must support ordinary static directory indexes so `/build-deploy/` resolves to
`/build-deploy/index.html`. Launch DevHub links intentionally navigate to the
URL configured in `src/config.ts`.

## Onboarding flow

The home page keeps DevHub first and offers two prominent routes:

1. **I'm new - start here** opens `/getting-started/`.
2. **I already have a project** opens `/build-deploy/`.

The beginner guide follows the current dashboard implementation:

1. Open the verified `/sign-up` or `/sign-in` route.
2. Create a small website locally, optionally with an external AI assistant.
3. Run the production build locally and commit complete source to Git.
4. On the authenticated dashboard, choose `Add New...` then `Project`, paste a
   Git URL or import a connected GitHub repository, and start the build.
5. Use `Build Logs`; wait for `Deployment ready`; then use `Visit` or
   `Continue to Project`.
6. Push a reviewed update or use `Deployments` and `Redeploy`, then inspect
   build output and the project `Logs` view.

The working example uses plain JavaScript with Vite. Its expected production
output is `dist/`, matching the Vite framework option and output-directory
settings implemented by DevHub. The AI page states that ChatGPT, Cursor,
Claude, or another external tool may generate files, but DevHub does not
provide that assistant.

## Link destinations

All external destinations are centralized in `src/config.ts`:

- `https://dev.autheo.com/`
- `https://dev.autheo.com/sign-in`
- `https://dev.autheo.com/sign-up`
- `https://dev.autheo.com/new`
- `https://dev.autheo.com/docs`
- `https://dev.autheo.com/docs/getting-started`
- `https://dev.autheo.com/docs/errors/deployment-not-found`

The public home, sign-in, sign-up, documentation, and getting-started routes
returned HTTP 200 during this review. The protected New Project URL redirected
an unauthenticated request to sign-in as expected.

## Product status

- The verified beginner path uses Git because both the New Project source and
  official DevHub documentation implement and describe it.
- The dashboard source implements project creation, Git URL and connected
  GitHub import, templates, container-image input, build settings, environment
  variables, build logs, deployment URLs, project logs, and redeploy controls.
- ZIP upload is implemented at `/new/upload`, but this review did not complete
  an authenticated live upload. The beginner guide therefore does not present
  ZIP as a proven operational path.
- AI-assisted development is described as a workflow with external AI tools;
  DevHub is not described as providing an AI assistant.
- Expanding ecosystem resources are labeled in development.
- Every Neighborhood Marketplace capability is labeled coming soon or concept
  only; purchasing, provider registration, staking, earnings, and payments are
  explicitly unavailable.

Marketplace status and the DevHub destination URL are configured in
`src/config.ts`; shared rail metadata and navigation live in `src/rails.ts`.

## Manual live-dashboard confirmation

The source, public routes, and unauthenticated redirect were verified. A person
with a test account should still run this exact live check before treating the
complete journey as operational:

1. Complete sign-up, sign out, and sign back in.
2. Confirm the authenticated home page shows `Autheo Development Hub`,
   `Search Projects`, and `Add New...`.
3. Create a public Git repository from the example on `/getting-started/`.
4. Choose `Add New...` then `Project`; paste the repository URL; deploy.
5. Confirm the build page streams `Build Logs` and reaches
   `Deployment ready`.
6. Use `Visit` and confirm the generated deployment URL serves the example.
7. Use `Continue to Project`; confirm `Deployments`, `Logs`, and `Settings`.
8. Change the heading, run the local build, push the commit, and confirm
   whether Git automation starts a deployment. If it does not, inspect
   `Settings` then `Git` for webhook or workflow status.
9. Open a deployment and use `Redeploy`; confirm a new deployment reaches
   Ready and shows the change.
10. Confirm the theme switch, desktop and mobile navigation, every external
    link, and both AI-prompt copy buttons.

Environment-dependent items that this repository review cannot prove include
the configured identity providers, private GitHub authorization, webhook or
workflow installation, compatible builder and runtime capacity, DNS, custom
domains, certificates, and a successful production deployment.
