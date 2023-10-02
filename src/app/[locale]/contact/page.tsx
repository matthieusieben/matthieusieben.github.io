import type { Metadata } from 'next'
import NextLink from 'next/link'

import pictureImport from '~/picture.jpg'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { fullName, fullTitle, origin } from '@/constants'
import { assertLocale } from '@/utils/locale'

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
  assertLocale(locale)

  return (
    <>
      <Header
        title={fullName}
        backgroundSrc={pictureImport}
        backgroundPosition="58% 28%"
      ></Header>

      <main className="mx-auto container min-h-screen flex flex-col items-center justify-center">
        <Button as={NextLink} href={`/${locale}`}>
          Home
        </Button>
      </main>
    </>
  )
}
