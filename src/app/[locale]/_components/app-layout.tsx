import NextLink from 'next/link'
import { ReactNode } from 'react'
import { mdiEmailOutline, mdiGithub, mdiLinkedin, mdiTwitter } from '@mdi/js'

import { fullName } from '@/constants'
import { getDictionary } from '@/dictionaries'
import { blueskySvgPath24 } from '@/features/icons/bluesky'
import { ScrollVisibility } from '@/features/scroll-visibility/scroll-visibility'
import { ThemeSwitch } from '@/features/theme/theme-switch'
import { ButtonIcon } from '@/features/ui/button-icon'
import { Navbar } from '@/features/ui/navbar'
import { NavbarLinks } from '@/features/ui/navbar-links'
import { NavbarTitle } from '@/features/ui/navbar-title'

type Props = {
  locale: string
  children: ReactNode
}

export async function AppLayout({ locale, children }: Props) {
  const d = await getDictionary(locale)
  return (
    <>
      <ScrollVisibility
        threshold="25vh"
        classNameHidden="transition-[transform,opacity] ease-in-out transform -translate-y-full opacity-0 duration-300"
        classNameVisible="transition-[transform,opacity] ease-in-out transform translate-y-0 opacity-100 duration-300"
        className="fixed top-0 w-full z-10 drop-shadow-md"
        as={Navbar}
        role="presentation"
      >
        <NavbarTitle
          subtitle="Web developer"
          as={NextLink}
          href={`/${locale}`}
          title={d.pages.home.title}
        >
          {fullName}
        </NavbarTitle>
        <NavbarLinks>
          <ButtonIcon
            as={NextLink}
            href={'https://github.com/matthieusieben'}
            target="_blank"
            rel="me"
            title={d.links.github.title}
            path={mdiGithub}
          >
            <span className="md:hidden ml-2">{d.links.github.title}</span>
          </ButtonIcon>
          <ButtonIcon
            as={NextLink}
            href={'https://bsky.app/profile/matthieusieben.com'}
            target="_blank"
            rel="me"
            title={d.links.bluesky.title}
            path={blueskySvgPath24}
          >
            <span className="md:hidden ml-2">{d.links.bluesky.title}</span>
          </ButtonIcon>
          <ButtonIcon
            as={NextLink}
            href={'https://twitter.com/matthieusieben'}
            target="_blank"
            rel="me"
            title={d.links.twitter.title}
            path={mdiTwitter}
          >
            <span className="md:hidden ml-2">{d.links.twitter.title}</span>
          </ButtonIcon>
          <ButtonIcon
            as={NextLink}
            href={'https://www.linkedin.com/in/matthieusieben/'}
            target="_blank"
            rel="me"
            title={d.links.linkedin.title}
            path={mdiLinkedin}
          >
            <span className="md:hidden ml-2">{d.links.linkedin.title}</span>
          </ButtonIcon>
          <ButtonIcon
            as={NextLink}
            href={'mailto:matthieu.sieben+ws@gmail.com'}
            target="_blank"
            rel="me"
            title={d.links.email.title}
            path={mdiEmailOutline}
          >
            <span className="md:hidden ml-2">{d.links.email.title}</span>
          </ButtonIcon>

          {/* <NavbarLinkItem key="home">
            <Button
              className="grow"
              as={NextLink}
              prefetch={false}
              href={`/${locale}`}
              title={d.pages.home.title}
            />
          </NavbarLinkItem>
          <NavbarLinkItem key="contact">
            <Button
              className="grow"
              as={NextLink}
              prefetch={false}
              href={`/${locale}/contact`}
              title={d.pages.contact.title}
            />
          </NavbarLinkItem> */}
        </NavbarLinks>
        <ThemeSwitch
          classes={{
            light: '!text-sky-700 dark:!text-sky-700',
            dark: '!text-amber-400 dark:!text-amber-400',
          }}
        />
      </ScrollVisibility>

      {children}
    </>
  )
}
