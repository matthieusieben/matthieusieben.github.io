import type { ReactNode } from 'react'

import { mdiGithub, mdiLinkedin } from '@mdi/js'
import Icon from '@mdi/react'
import NextLink from 'next/link'

import { Button } from '@/components/button'
import { Navbar } from '@/components/navbar'
import { NavbarLinkItem, NavbarLinks } from '@/components/navbar-links'
import { NavbarTitle } from '@/components/navbar-title'
import { ScrollVisibility } from '@/components/scroll-visibility'
import { ThemeSwitch } from '@/components/theme-switch'
import { defaultLocale, fullName } from '@/constants'

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
        as={Navbar}
        className="fixed top-0 w-full z-10 drop-shadow-md"
      >
        <NavbarTitle
          subtitle="Web developer"
          as={NextLink}
          href={locale === defaultLocale ? '/' : `/${locale}`}
          aria-label="Home page"
        >
          {fullName}
        </NavbarTitle>
        <Button
          as={NextLink}
          href={'https://github.com/matthieusieben'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github page"
        >
          <Icon path={mdiGithub} size="1em" />
        </Button>
        <Button
          as={NextLink}
          href={'https://www.linkedin.com/in/matthieusieben/'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linkedin profile"
        >
          <Icon path={mdiLinkedin} size="1em" />
        </Button>
        <NavbarLinks>
          <NavbarLinkItem key="home">
            <Button
              className="grow"
              as={NextLink}
              prefetch={false}
              href={locale === defaultLocale ? '/' : `/${locale}`}
            >
              Home
            </Button>
          </NavbarLinkItem>
          <NavbarLinkItem key="contact">
            <Button
              className="grow"
              as={NextLink}
              prefetch={false}
              href={`/${locale}/contact`}
            >
              Contact
            </Button>
          </NavbarLinkItem>
        </NavbarLinks>
        <ThemeSwitch />
      </ScrollVisibility>

      {children}
    </>
  )
}
