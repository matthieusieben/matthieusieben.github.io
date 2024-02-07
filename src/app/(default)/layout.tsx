import { Fira_Code, Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { defaultLocale, locales } from '@/constants'
import { arrayIncludes } from '@/utils/array'

import { AppLayout } from '../_components/app-layout'

import { Providers } from './providers'
import './globals.css'

const sansFont = Inter({ variable: '--sans-font', subsets: ['latin'] })
const monoFont = Fira_Code({ variable: '--mono-font', subsets: ['latin'] })

type Props = {
  params: { locale?: string }
  children: ReactNode
}

// This file is not at the root because we want the locale param to dynamically
// change with the locale in the URL. To achieve this, localized pages need
// their own "layout.tsx" file. The only way of havin multiple root layout files
// is to have none at the root, and use layout files namespaced folders
// ("(default)", "[locale]").
export default function RootLayout({
  params: { locale = defaultLocale },
  children,
}: Props) {
  const lang = arrayIncludes(locales, locale) ? locale : defaultLocale
  return (
    <html
      lang={lang}
      className={`${sansFont.variable} ${monoFont.variable} light`}
      style={{ colorScheme: 'light' }}
    >
      <body>
        <Providers locale={lang}>
          <AppLayout locale={lang}>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  )
}
