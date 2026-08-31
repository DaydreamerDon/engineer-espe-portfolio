import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import type { CollectionSlug, File, GlobalSlug, Payload } from 'payload'

import { PORTFOLIO_SEED_VERSION, portfolioDefaults } from './defaults'
import type { PortfolioData } from './types'

const assetDefinitions = {
  featured: {
    alt: 'Construction professional in high-visibility safety gear holding project plans',
    filename: 'esperidion-featured-project.webp',
  },
  hero: {
    alt: 'High-rise residential building under construction',
    filename: 'esperidion-hero-construction.webp',
  },
} as const

const getAssetFile = async (filename: string): Promise<File> => {
  const candidates = [
    resolve(process.cwd(), 'plugins/portfolio/assets', filename),
    resolve(process.cwd(), 'node_modules/@esperidion/payload-plugin-portfolio/assets', filename),
  ]
  let data: Buffer | undefined

  for (const candidate of candidates) {
    try {
      data = await readFile(candidate)
      break
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
  }

  if (!data) throw new Error(`Bundled portfolio asset not found: ${filename}`)

  return {
    data,
    mimetype: 'image/webp',
    name: filename,
    size: data.byteLength,
  }
}

const getOrCreateMedia = async ({
  alt,
  filename,
  mediaCollection,
  payload,
}: {
  alt: string
  filename: string
  mediaCollection: string
  payload: Payload
}): Promise<number | string> => {
  const existing = await payload.find({
    collection: mediaCollection as CollectionSlug,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      filename: {
        equals: filename,
      },
    },
  })

  if (existing.docs[0]) return existing.docs[0].id

  const doc = await payload.create({
    collection: mediaCollection as CollectionSlug,
    data: { alt } as never,
    file: await getAssetFile(filename),
    overrideAccess: true,
  })

  return doc.id
}

export const seedPortfolio = async ({
  mediaCollection,
  payload,
}: {
  mediaCollection: string
  payload: Payload
}): Promise<void> => {
  const current = (await payload.findGlobal({
    slug: 'portfolio' as GlobalSlug,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })) as PortfolioData

  if ((current.seedVersion ?? 0) >= PORTFOLIO_SEED_VERSION) return

  if (current.identity?.fullName || current.hero?.headline) {
    payload.logger.info('Portfolio content already exists; automatic seed skipped.')
    return
  }

  const [heroImage, featuredImage] = await Promise.all([
    getOrCreateMedia({
      ...assetDefinitions.hero,
      mediaCollection,
      payload,
    }),
    getOrCreateMedia({
      ...assetDefinitions.featured,
      mediaCollection,
      payload,
    }),
  ])

  await payload.updateGlobal({
    slug: 'portfolio' as GlobalSlug,
    data: {
      ...portfolioDefaults,
      hero: {
        ...portfolioDefaults.hero,
        image: heroImage,
      },
      projects: {
        ...portfolioDefaults.projects,
        featured: {
          ...portfolioDefaults.projects?.featured,
          image: featuredImage,
        },
      },
      seedVersion: PORTFOLIO_SEED_VERSION,
      seo: {
        ...portfolioDefaults.seo,
        image: featuredImage,
      },
    } as never,
    depth: 0,
    draft: false,
    overrideAccess: true,
  })

  payload.logger.info('Seeded Esperidion portfolio content.')
}
