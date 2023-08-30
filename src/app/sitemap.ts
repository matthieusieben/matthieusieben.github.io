import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://matthieusieben.com',
      lastModified: new Date(),
    },
  ]
}
