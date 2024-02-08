import type { Metadata, ResolvingMetadata } from 'next'
import NextLink from 'next/link'

import { buildAtlernates, buildUrl } from '@/alternates'
import { defaultLocale, origin } from '@/constants'
import { getDictionary } from '@/dictionaries'
import { Button } from '@/features/ui/button'

type Props = {
  params: { locale?: string }
}

export async function generateMetadata(
  { params: { locale = defaultLocale } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { openGraph } = await parent
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

export default async function ContactPage({
  params: { locale = defaultLocale },
}: Props) {
  const d = await getDictionary(locale)

  return (
    <Button as={NextLink} href={buildUrl(locale, '/')} outlined>
      {d.pages.home.title}
    </Button>
  )
}
