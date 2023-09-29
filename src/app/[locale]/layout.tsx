import type { ReactNode } from 'react'
import NextLink from 'next/link'

import Navbar, { NavbarLink, NavbarTitle } from '@/components/navbar'
import ScrollVisibility from '@/components/scroll-visibility'
import { defaultLocale, fullName } from '@/constants'
import ThemeSwitch from '@/components/theme-switch'

export type A = typeof Navbar<'div'>

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  return (
    <>
      <ScrollVisibility
        threshold="25vh"
        classNameHidden="transition-[transform,opacity] ease-in-out transform -translate-y-full opacity-0 duration-300"
        classNameVisible="transition-[transform,opacity] ease-in-out transform translate-y-0 opacity-100 duration-300"
        as={Navbar as typeof Navbar<'div'>}
        ref={null}
        className="fixed top-0 w-full z-10 drop-shadow-md"
        title={
          <NavbarTitle
            subtitle="Web developer"
            as={NextLink}
            href={locale === defaultLocale ? '/' : `/${locale}`}
            aria-label="Home page"
          >
            {fullName}
          </NavbarTitle>
        }
        links={[
          {
            id: 'home',
            content: (
              <NavbarLink
                as={NextLink}
                href={locale === defaultLocale ? '/' : `/${locale}`}
              >
                Home
              </NavbarLink>
            ),
          },
          {
            id: 'contact',
            content: (
              <NavbarLink as={NextLink} href={`/${locale}/contact`}>
                Contact
              </NavbarLink>
            ),
          },
        ]}
      >
        <ThemeSwitch />
      </ScrollVisibility>

      {children}
    </>
  )
}
