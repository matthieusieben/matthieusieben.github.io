import { MetadataRoute } from 'next'

import { buildUrl } from '@/alternates'
import { availableLocales } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return availableLocales.flatMap((locale) => [
    {
      url: buildUrl(locale, '/'),
      lastModified: now,
    },
    // {
    //   url: buildUrl(locale, '/contact'),
    //   lastModified: now,
    // },
  ])
}
