import NextLink from 'next/link'
import type { ReactNode } from 'react'

import { mdiGithub, mdiLinkedin } from '@mdi/js'

import { defaultLocale, fullName } from '@/constants'
import { ScrollVisibility } from '@/features/scroll-visibility/scroll-visibility'
import { ThemeSwitch } from '@/features/theme/theme-switch'
import { Button } from '@/features/ui/button'
import { ButtonIcon } from '@/features/ui/button-icon'
import { Navbar } from '@/features/ui/navbar'
import { NavbarLinkItem, NavbarLinks } from '@/features/ui/navbar-links'
import { NavbarTitle } from '@/features/ui/navbar-title'

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
          href="/"
          title="Home page"
        >
          {fullName}
        </NavbarTitle>
        <NavbarLinks>
          <ButtonIcon
            as={NextLink}
            href={'https://github.com/matthieusieben'}
            target="_blank"
            rel="noopener noreferrer"
            title="Github page"
            path={mdiGithub}
          >
            <span className="md:hidden">Github page</span>
          </ButtonIcon>
          <ButtonIcon
            as={NextLink}
            href={'https://www.linkedin.com/in/matthieusieben/'}
            target="_blank"
            rel="noopener noreferrer"
            title="Linkedin profile"
            path={mdiLinkedin}
          >
            <span className="md:hidden">Linkedin profile</span>
          </ButtonIcon>
          <NavbarLinkItem key="home">
            <Button
              className="grow"
              as={NextLink}
              prefetch={false}
              href={locale === defaultLocale ? '/' : `/${locale}`}
              title="Home"
            />
          </NavbarLinkItem>
          <NavbarLinkItem key="contact">
            <Button
              className="grow"
              as={NextLink}
              prefetch={false}
              href={`/${locale}/contact`}
              title="Contact"
            />
          </NavbarLinkItem>
        </NavbarLinks>
        <ThemeSwitch
          classes={{
            light: 'text-sky-700 dark:text-sky-700',
            dark: 'text-amber-400 dark:text-amber-400',
          }}
        />
      </ScrollVisibility>

      {children}
    </>
  )
}
