import { mdiEmailOutline, mdiGithub, mdiLinkedin } from '@mdi/js'
import { ReactNode } from 'react'

import { getDictionary } from '@/dictionaries'
import { blueskySvgPath24 } from '@/features/icons/bluesky'
import { ThemeSwitch } from '@/features/theme/theme-switch'
import { Button } from '@/features/ui/button'
import { Navbar } from '@/features/ui/navbar'
import { NavbarLinks } from '@/features/ui/navbar-links'
import { NavbarTitle } from '@/features/ui/navbar-title'

export async function AppNavbar({
  locale,
  children,
}: {
  locale: string
  children?: ReactNode
}) {
  const d = await getDictionary(locale)
  return (
    <>
      <Navbar
        role="presentation"
        className="drop-shadow-md fixed top-0 w-full z-10"
      >
        <NavbarTitle
          subtitle={d.title}
          href={`/${locale}`}
          title={d.pages.home.title}
        >
          {d.name}
        </NavbarTitle>
        {children}
        <NavbarLinks>
          <Button
            href={'https://github.com/matthieusieben'}
            target="_blank"
            rel="me"
            title={d.links.github.title}
            icon={mdiGithub}
          >
            <span className="md:hidden ml-2">{d.links.github.title}</span>
          </Button>
          <Button
            href={'https://bsky.app/profile/did:plc:linrigsaay5zenhg756ca6tg'}
            target="_blank"
            rel="me"
            title={d.links.bluesky.title}
            icon={blueskySvgPath24}
          >
            <span className="md:hidden ml-2">{d.links.bluesky.title}</span>
          </Button>
          <Button
            href={'https://www.linkedin.com/in/matthieusieben/'}
            target="_blank"
            rel="me"
            title={d.links.linkedin.title}
            icon={mdiLinkedin}
          >
            <span className="md:hidden ml-2">{d.links.linkedin.title}</span>
          </Button>
          <Button
            href={'mailto:matthieu.sieben+ws@gmail.com'}
            target="_blank"
            rel="me"
            title={d.links.email.title}
            icon={mdiEmailOutline}
          >
            <span className="md:hidden ml-2">{d.links.email.title}</span>
          </Button>
        </NavbarLinks>
        <ThemeSwitch
          classes={{
            dark: '!text-sky-700 dark:!text-sky-700',
            light: '!text-amber-400 dark:!text-amber-400',
          }}
        />
      </Navbar>
    </>
  )
}
