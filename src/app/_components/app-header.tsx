import { ComponentProps, ReactNode } from 'react'
import NextLink from 'next/link'

import { mdiChevronDown } from '@mdi/js'
import Icon from '@mdi/react'

import { getDictionary } from '@/dictionaries'
import { ScrollVisibility } from '@/features/scroll-visibility/scroll-visibility'
import { Header } from '@/features/ui/header'

import pictureImport from '~/picture.jpg'

export async function AppHeader({
  locale,
  children,
  ...props
}: {
  locale: string
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
      backgroundPosition="60% 28%"
      {...props}
    >
      {children}
      <ScrollVisibility
        mode="disappear"
        threshold="10vh"
        className="absolute bottom-0 w-full flex justify-center items-end h-[100px]"
        classNameHidden="transition-[opacity,transform] ease-in-out opacity-0 translate-y-[-1rem]"
        classNameVisible="transition-[opacity,transform] ease-in-out opacity-100 translate-y-0"
        as={NextLink}
        id="main"
        href="#main"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Icon
          className="drop-shadow-xl animate-bounce w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white"
          path={mdiChevronDown}
        ></Icon>
      </ScrollVisibility>
    </Header>
  )
}
