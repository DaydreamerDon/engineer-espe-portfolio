import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: '/',
      disallow: ['/admin/', '/api/'],
      userAgent: '*',
    },
    sitemap: `${getServerSideURL()}/sitemap.xml`,
  }
}
