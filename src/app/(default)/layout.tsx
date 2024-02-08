import { Fira_Code, Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { asLocale } from '@/locales'

import { AppContent } from '../_components/app-content'
import { AppFooter } from '../_components/app-footer'
import { AppHeader } from '../_components/app-header'
import { AppNavbar } from '../_components/app-navbar'

import './globals.css'
import { Providers } from './providers'

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
      className={`${sansFont.variable} ${monoFont.variable} light snap-y snap-mandatory`}
      style={{ colorScheme: 'light' }}
    >
      <body>
        <Providers locale={locale}>
          <AppNavbar locale={locale} />
          <AppHeader locale={locale} className="snap-center" />
          <div className="min-h-screen flex flex-col snap-center">
            <AppContent locale={locale}>{children}</AppContent>
            <AppFooter locale={locale} />
          </div>
        </Providers>
      </body>
    </html>
  )
}
