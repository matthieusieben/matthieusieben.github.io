import type { Metadata, ResolvingMetadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import { buildAtlernates, buildUrl } from '@/alternates'
import { defaultLocale, locales, origin } from '@/constants'
import { getDictionary } from '@/dictionaries'
import { Button } from '@/features/ui/button'
import { arrayIncludes } from '@/utils/array'

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
  if (!arrayIncludes(locales, locale)) notFound()

  const d = await getDictionary(locale)

  return (
    <Button as={NextLink} href={buildUrl(locale, '/')}>
      {d.pages.home.title}
    </Button>
  )
}
