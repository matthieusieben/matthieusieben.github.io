'use client'

import type { ReactElement, ReactNode } from 'react'

import { clsx } from '@/utils/clsx'
import type {
  HtmlComponent,
  PolymorphicComponent,
} from '@/utils/polymorphic-component'

import { useMenu } from '../dom-hooks/use-menu'
import { Button } from './button'
import { MenuIcon } from './menu-icon'

type Props = {
  id?: string
  children:
    | ReactElement<NavbarLinkItemProps, typeof NavbarLinkItem>
    | Iterable<ReactElement<NavbarLinkItemProps, typeof NavbarLinkItem>>
}

export const NavbarLinks: PolymorphicComponent<Props, 'ul'> = ({
  as: Component = 'ul' as const,
  id = 'navbar',
  className,
  ...props
}) => {
  const { isOpen, toggle, menuRef, buttonRef } = useMenu()

  return (
    <>
      <Button
        onClick={(event) => {
          if (!event.defaultPrevented) {
            toggle()
            event.preventDefault()
          }
        }}
        type="button"
        id={`${id}-menubutton`}
        ref={buttonRef}
        className="md:hidden order-last md:order-[initial]"
        aria-label="Main menu"
        aria-controls={`${id}-menu`}
        aria-haspopup={true}
        aria-expanded={isOpen}
      >
        <MenuIcon
          aria-hidden="true"
          active={isOpen}
          size="1.2em"
          style={{ margin: '-0.1em' }}
        />
      </Button>

      <Component
        role="menu"
        ref={menuRef}
        id={`${id}-menu`}
        aria-labelledby={`${id}-menubutton`}
        className={clsx(
          isOpen || 'hidden',
          'md:!flex flex flex-col w-full md:w-auto order-last md:order-[initial] md:flex-row mt-4 md:mt-0',
          className
        )}
        {...props}
      />
    </>
  )
}

type NavbarLinkItemProps = {
  children: ReactNode
}

export const NavbarLinkItem: HtmlComponent<'li', NavbarLinkItemProps> = ({
  className,
  ...props
}) => {
  return (
    <li
      role="menuitem"
      className={clsx('flex justify-stretch md:mx-1', className)}
      {...props}
    />
  )
}
