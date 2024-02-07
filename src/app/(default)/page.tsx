import type { Metadata, ResolvingMetadata } from 'next'

import { buildAtlernates } from '@/alternates'
import { defaultLocale, origin } from '@/constants'
import { getDictionary } from '@/dictionaries'

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
    title: `${d.name} | ${d.title}`,
    description: d.title,
    metadataBase: new URL(origin),
    openGraph: {
      type: 'website',
      siteName: `${d.name} | ${d.title}`,
      title: d.name,
      description: d.title,
      url: origin,
      images: openGraph?.images,
    },
    twitter: {
      creator: d.name,
      site: origin,
      title: d.name,
      description: d.title,
    },
    robots: {
      index: true,
      indexifembedded: false,
    },
    alternates: buildAtlernates(locale, '/'),
  }
}

export default async function HomePage({
  params: { locale = defaultLocale },
}: Props) {
  const d = await getDictionary(locale)

  return (
    <article className="min-w-[50%] m-5 prose md:prose-lg lg:prose-xl prose-slate dark:prose-invert">
      <h2>{d.pages.about.title}</h2>
      <dl>
        <dt>{d.pages.about.subtitle}</dt>
        <dd>{d.pages.about.description}</dd>
      </dl>
    </article>
  )
}
