import type { Metadata } from 'next'
import NextLink from 'next/link'

import { mdiChevronDown } from '@mdi/js'
import Icon from '@mdi/react'

import pictureImport from '~/picture.jpg'

import { Header } from '@/features/ui/header'
import { fullName, fullTitle, origin } from '@/constants'
import { ScrollVisibility } from '@/features/scroll-visibility/scroll-visibility'

export const metadata: Metadata = {
  title: `${fullName} | ${fullTitle}`,
  description: fullTitle,
  metadataBase: new URL(origin),
  openGraph: {
    type: 'website',
    siteName: `${fullName} | ${fullTitle}`,
    title: fullName,
    description: fullTitle,
    url: origin,
  },
  twitter: {
    creator: fullName,
    site: origin,
    title: fullName,
    description: fullTitle,
  },
  robots: {
    index: true,
    indexifembedded: false,
  },
}

export default function LocaleHome({ params }: { params: { locale: string } }) {
  return (
    <>
      <Header
        title={fullName}
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
          <h2>About</h2>
          <dl>
            <dt>\ma.tjø\</dt>
            <dd>
              I am a web developer specialized in full stack development of SaaS
              platforms.
            </dd>
          </dl>
        </article>
      </main>
    </>
  )
}
