import type { ReactNode } from 'react'
import { Fira_Code, Inter } from 'next/font/google'

import { defaultLocale } from '@/constants'
import { assertLocale } from '@/utils/locale'

import { Providers } from './providers'

import './globals.css'

const sansFont = Inter({ variable: '--sans-font', subsets: ['latin'] })
const monoFont = Fira_Code({ variable: '--mono-font', subsets: ['latin'] })

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale?: string }
}) {
  const locale = assertLocale(params.locale || defaultLocale)
  return (
    <html
      lang={locale}
      className={`${sansFont.variable} ${monoFont.variable} scroll-smooth antialiased light`}
      style={{ colorScheme: 'light' }}
    >
      <body className="dark:bg-gray-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
