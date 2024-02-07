import type { Metadata, ResolvingMetadata } from 'next'
import NextLink from 'next/link'

import { mdiChevronDown } from '@mdi/js'
import Icon from '@mdi/react'

import { buildAtlernates } from '@/alternates'
import { defaultLocale, origin } from '@/constants'
import { getDictionary } from '@/dictionaries'
import { ScrollVisibility } from '@/features/scroll-visibility/scroll-visibility'
import { Header } from '@/features/ui/header'

import pictureImport from '~/picture.jpg'

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
    <>
      <Header
        title={d.name}
        backgroundSrc={pictureImport}
        backgroundPosition="60% 28%"
      >
        <ScrollVisibility
          mode="disappear"
          threshold="10vh"
          className="absolute bottom-0 w-full flex justify-center items-end h-[100px]"
          classNameHidden="transition-[opacity,transform] ease-in-out opacity-0 translate-y-[-1rem]"
          classNameVisible="transition-[opacity,transform] ease-in-out opacity-100 translate-y-0"
          as={NextLink}
          id="main"
          href="#main"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Icon
            className="drop-shadow-xl animate-bounce w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white"
            path={mdiChevronDown}
          ></Icon>
        </ScrollVisibility>
      </Header>

      <main className="mx-auto container min-h-screen flex flex-col items-center justify-center">
        <article className="min-w-[50%] m-5 prose md:prose-lg lg:prose-xl prose-slate dark:prose-invert">
          <h2>{d.pages.about.title}</h2>
          <dl>
            <dt>{d.pages.about.subtitle}</dt>
            <dd>{d.pages.about.description}</dd>
          </dl>
        </article>
      </main>
    </>
  )
}
