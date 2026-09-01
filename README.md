# Esperidion Portfolio

A responsive, one-page civil engineering and QAQC portfolio built with Next.js 16 and Payload 3. The site content is managed through a reusable workspace plugin at `plugins/portfolio`.

## Requirements

- Node.js 20.9 or newer
- pnpm 9 or newer
- PostgreSQL

Copy `.env.example` to `.env`, provide secure secrets and a PostgreSQL connection string, then install and migrate:

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

Payload Admin is available at `/admin`. The first application initialization publishes the approved launch copy and bundled project images. Seeding is versioned and idempotent: it reuses media by filename and never overwrites editor-authored content. The optional résumé action stays hidden until a PDF is uploaded.

## Portfolio plugin

The host app registers the plugin in `src/payload.config.ts`:

```ts
portfolioPlugin({
  mediaCollection: 'media',
  previewURL: 'http://localhost:3000/next/preview?path=%2F&previewSecret=...',
  seed: { enabled: true },
})
```

Package exports:

- `@esperidion/payload-plugin-portfolio` — `portfolioPlugin`
- `@esperidion/payload-plugin-portfolio/rsc` — `PortfolioPage`
- `@esperidion/payload-plugin-portfolio/client` — `PortfolioNavigation`
- `@esperidion/payload-plugin-portfolio/types` — public data and option types

## Commands

```bash
pnpm generate:types
pnpm generate:importmap
pnpm lint
pnpm test:int
pnpm test:e2e
pnpm build
```

The checked-in PostgreSQL migration creates the active Users, Media, and Portfolio schema conditionally. Existing retired starter tables and columns are preserved for recovery.
