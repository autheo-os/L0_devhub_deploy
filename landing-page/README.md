# Autheo DevHub landing page

A standalone, static Vite + React multi-page marketing site for Autheo DevHub.
It does not import, modify, or run the existing DevHub application and does not
depend on client-side history routing.

## Pages

- `/` - DevHub overview
- `/build-deploy/` - Build & Deploy
- `/manage-monitor/` - Manage & Monitor
- `/cloud-computing/` - Cloud Computing
- `/ai-assisted/` - AI-Assisted Development Workflow
- `/getting-started/` - beginner-focused guide
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

## Product status

- DevHub project creation, supported Git and container deployment, deployment
  management, logs, and workload views are presented as available based on the
  implemented DevHub repository surfaces.
- AI-assisted development is described as a workflow with external AI tools;
  DevHub is not described as providing an AI assistant.
- Expanding ecosystem resources are labeled in development.
- Every Neighborhood Marketplace capability is labeled coming soon or concept
  only; purchasing, provider registration, staking, earnings, and payments are
  explicitly unavailable.

Marketplace status and the DevHub destination URL are configured in
`src/config.ts`; shared rail metadata and navigation live in `src/rails.ts`.
