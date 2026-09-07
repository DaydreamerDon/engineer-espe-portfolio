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

## Supabase storage and remote seeding

Set `DATABASE_URL` to the remote PostgreSQL connection and configure all five storage settings from `.env.example`: `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY`. Keep storage credentials server-only. Set the same settings in Vercel, along with `PAYLOAD_SECRET` and the deployed `NEXT_PUBLIC_SERVER_URL`.

```bash
pnpm db:migrate
pnpm db:seed
```

The seed publishes the portfolio copy and uploads bundled images and generated sizes to Supabase Storage. It skips already seeded or editor-authored content. Files are served through Payload's `/api/media/file/` route; the bucket does not need public access. Deploy the updated code for the hosted site to use the storage adapter. With no S3 settings, local development continues to use local media storage.

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
