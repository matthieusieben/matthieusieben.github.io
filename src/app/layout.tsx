import { Fira_Code, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { defaultLocale, locales } from '@/constants'
import { arrayIncludes } from '@/utils/array'

import { Providers } from './providers'
import './globals.css'

const sansFont = Inter({ variable: '--sans-font', subsets: ['latin'] })
const monoFont = Fira_Code({ variable: '--mono-font', subsets: ['latin'] })

export default function RootLayout({
  children,
  params: { locale = defaultLocale } = {},
}: {
  children: ReactNode
  params: { locale?: string }
}) {
  if (!arrayIncludes(locales, locale)) notFound()

  return (
    <html
      lang={locale}
      className={`${sansFont.variable} ${monoFont.variable} light`}
      style={{ colorScheme: 'light' }}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
