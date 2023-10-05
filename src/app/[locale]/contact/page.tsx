import type { Metadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import pictureImport from '~/picture.jpg'

import { fullName, fullTitle, locales, origin } from '@/constants'
import { getDictionary } from '@/dictionaries'
import { Button } from '@/features/ui/button'
import { Header } from '@/features/ui/header'
import { arrayIncludes } from '@/utils/array'

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

export default async function LocaleHome({
  params: { locale },
}: {
  params: { locale: string }
}) {
  if (!arrayIncludes(locales, locale)) notFound()

  const d = await getDictionary(locale)

  return (
    <>
      <Header
        title={fullName}
        backgroundSrc={pictureImport}
        backgroundPosition="60% 28%"
      ></Header>

      <main className="mx-auto container min-h-screen flex flex-col items-center justify-center">
        <Button as={NextLink} href={`/${locale}`}>
          {d.pages.home.title}
        </Button>
      </main>
    </>
  )
}
