import type { Metadata } from 'next'

import { PortfolioPage } from '@esperidion/payload-plugin-portfolio/rsc'
import type { PortfolioData } from '@esperidion/payload-plugin-portfolio/types'
import configPromise from '@payload-config'
import { getPayload, type GlobalSlug } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'

const queryPortfolio = cache(async (): Promise<PortfolioData> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return (await payload.findGlobal({
    slug: 'portfolio' as GlobalSlug,
    depth: 1,
    draft,
    overrideAccess: draft,
  })) as PortfolioData
})

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const portfolio = await queryPortfolio()

  return (
    <>
      {draft ? <LivePreviewListener /> : null}
      <PortfolioPage data={portfolio} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await queryPortfolio()
  const image =
    portfolio.seo?.image && typeof portfolio.seo.image === 'object' ? portfolio.seo.image.url : null

  return {
    description: portfolio.seo?.description,
    openGraph: {
      description: portfolio.seo?.description || undefined,
      images: image
        ? [{ alt: portfolio.seo?.title || 'Esperidion Saquin', url: image }]
        : undefined,
      title: portfolio.seo?.title || undefined,
      type: 'website',
    },
    title: portfolio.seo?.title,
    twitter: {
      card: 'summary_large_image',
      description: portfolio.seo?.description || undefined,
      images: image ? [image] : undefined,
      title: portfolio.seo?.title || undefined,
    },
  }
}
