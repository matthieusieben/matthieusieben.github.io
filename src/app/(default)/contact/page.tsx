import type { Metadata, ResolvingMetadata } from 'next'

import { buildAtlernates, buildUrl } from '@/alternates'
import { defaultLocale, origin } from '@/constants'
import { getDictionary } from '@/dictionaries'
import { Link } from '@/features/ui/link'

type Props = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { openGraph } = await parent
  const locale = (await params).locale || defaultLocale
  const d = await getDictionary(locale)
  return {
    title: d.pages.contact.title,
    alternates: buildAtlernates(locale, '/contact'),
    metadataBase: new URL(origin),
    openGraph: {
      type: 'website',
      siteName: d.name,
      title: d.pages.contact.title,
      url: buildUrl(locale, '/contact'),
      images: openGraph?.images,
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const locale = (await params).locale || defaultLocale
  const d = await getDictionary(locale)

  return (
    <Link href={buildUrl(locale, '/')} outlined>
      {d.pages.home.title}
    </Link>
  )
}
