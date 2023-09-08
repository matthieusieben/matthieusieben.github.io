import { Fira_Code, Inter } from 'next/font/google'
import { defaultLocale } from '@/constants'

import './globals.css'
import { assertLocale } from '@/utils/locale'

const sansFont = Inter({ variable: '--sans-font', subsets: ['latin'] })
const monoFont = Fira_Code({ variable: '--mono-font', subsets: ['latin'] })

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: { locale?: string }
}) {
  const locale = assertLocale(params?.locale || defaultLocale)
  return (
    <html lang={locale} className={`${sansFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
