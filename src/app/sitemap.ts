import { MetadataRoute } from 'next'
import { origin } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: origin,
      lastModified: new Date(),
    },
  ]
}
