import NextLink from 'next/link'
import { ComponentProps, ReactNode } from 'react'

import { mdiChevronDown } from '@mdi/js'
import Icon from '@mdi/react'

import { getDictionary } from '@/dictionaries'
import { Header } from '@/features/ui/header'

import pictureImport from '~/picture.jpg'

export async function AppHeader({
  locale,
  children,
  href,
  ...props
}: {
  locale: string
  href?: string
  children?: ReactNode
} & Omit<
  ComponentProps<typeof Header>,
  'title' | 'backgroundSrc' | 'backgroundPosition' | 'children'
>) {
  const d = await getDictionary(locale)

  return (
    <Header
      title={d.name}
      backgroundSrc={pictureImport}
      backgroundPosition="60% 0%"
      {...props}
    >
      {children}
      {href ? (
        <div
          className="absolute bottom-0 w-full flex justify-center items-end h-[100px]"
          aria-hidden="true"
        >
          <NextLink href={href} tabIndex={-1}>
            <Icon
              className="drop-shadow-xl animate-bounce w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white"
              path={mdiChevronDown}
            ></Icon>
          </NextLink>
        </div>
      ) : null}
    </Header>
  )
}
