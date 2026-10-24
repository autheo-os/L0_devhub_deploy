# Autheo DevHub landing page

A standalone Vite + React marketing site for Autheo DevHub. It does not import,
modify, or run the existing DevHub application.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

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
