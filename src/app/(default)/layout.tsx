import { Fira_Code, Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { AppContent } from '../_components/app-content'
import { AppFooter } from '../_components/app-footer'
import { AppHeader } from '../_components/app-header'
import { AppNavbar } from '../_components/app-navbar'

import './globals.css'
import { Providers } from './providers'
import { asLocale } from '@/dictionaries'

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
export default function RootLayout({ params, children }: Props) {
  const locale = asLocale(params.locale)
  return (
    <html
      lang={locale}
      className={`${sansFont.variable} ${monoFont.variable} light`}
      style={{ colorScheme: 'light' }}
    >
      <body>
        <Providers locale={locale}>
          <AppNavbar locale={locale} />
          <AppHeader locale={locale} />
          <AppContent locale={locale}>{children}</AppContent>
          <AppFooter locale={locale} />
        </Providers>
      </body>
    </html>
  )
}
