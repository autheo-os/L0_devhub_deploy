# Autheo DevHub landing page

A standalone Vite + React marketing site for Autheo DevHub. It does not import,
modify, or run the existing DevHub application.

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

## Production build

Type-check the project and generate the static site in `dist/`:

```bash
npm run build
```

The output contains `index.html` plus hashed JavaScript, CSS, image, and font
assets. Asset URLs are rooted at `/`, for deployment at the root of a domain.

## Production preview

Build the site, then serve the generated output locally:

```bash
npm run build
npm run preview
```

Vite prints the preview URL, normally `http://localhost:4173`. The preview
serves `dist/`; it is not intended to be a production web server.

## Deployment ZIP

Create a fresh production build and package it:

```bash
npm run package:zip
```

This creates `autheo-devhub-landing.zip` in this directory. The archive
contains the **contents** of `dist/`, so `index.html` is at the ZIP root. It
does not include source files, `node_modules`, local environment files, or
other development files.

## Upload to static hosting

1. Run `npm run package:zip`.
2. Upload `autheo-devhub-landing.zip` to the static hosting service.
3. Configure the service to publish the extracted archive at the domain root.
4. Confirm that `/index.html` is the entry document and that `/assets/*` is
   served as static content.

The site is a single-page landing page with in-page anchor navigation; it does
not require server-side rendering or a custom rewrite rule. The Launch DevHub
links intentionally navigate to the URL configured in `src/config.ts`.

## Product status

- DevHub project creation, supported Git and container deployment, deployment
  management, logs, and workload views are presented as available based on the
  implemented DevHub repository surfaces.
- AI-assisted development is described as a workflow with external AI tools;
  DevHub is not described as providing an AI assistant.
- Expanding ecosystem resources are labeled in development.
- Every Neighborhood Marketplace capability is contained in
  `src/components/MarketplacePreview.tsx` and labeled coming soon.

Marketplace status and the DevHub destination URL are configured in
`src/config.ts`.
