import { Fira_Code, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { locales } from '@/constants'
import { arrayIncludes } from '@/utils/array'

import { AppLayout } from './_components/app-layout'
import './globals.css'
import { Providers } from './providers'

const sansFont = Inter({ variable: '--sans-font', subsets: ['latin'] })
const monoFont = Fira_Code({ variable: '--mono-font', subsets: ['latin'] })

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!arrayIncludes(locales, locale)) notFound()

  return (
    <html
      lang={locale}
      className={`${sansFont.variable} ${monoFont.variable} light`}
      style={{ colorScheme: 'light' }}
    >
      <body>
        <Providers locale={locale}>
          <AppLayout locale={locale}>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  )
}
