import { MetadataRoute } from 'next'

import { locales, origin } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap((locale) => [
    {
      url: `${origin}/${locale}`,
      lastModified: now,
    },
    {
      url: `${origin}/${locale}/contact`,
      lastModified: now,
    },
  ])
}
