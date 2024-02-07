import { MetadataRoute } from 'next'

import { locales } from '@/constants'
import { buildUrl } from '@/alternates'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap((locale) => [
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
