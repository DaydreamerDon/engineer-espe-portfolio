import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 1,
      url: getServerSideURL(),
    },
  ]
}
