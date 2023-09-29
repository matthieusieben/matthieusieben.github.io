'use client'

import type { ReactNode } from 'react'

import { mdiClose, mdiMenu } from '@mdi/js'
import { useState } from 'react'

import { clsx } from '@/utils/clsx'
import { As, HtmlProps, forwardRef } from '@/utils/with-as'
import Button from './button'
import IconButton from './icon-button'

type Props = {
  id?: string
  title?: ReactNode
  links?: { id?: string; content: ReactNode }[]
}

const Navbar = forwardRef<Props, 'nav'>(function Navbar(
  { as: Component = 'nav', title, links, className, children, ...props },
  ref
) {
  const [visible, setVisible] = useState(false)
  const id = props.id || 'navbar'

  return (
    <Component
      className={clsx(
        'bg-white dark:bg-gray-800 border-solid border-1 border-gray-200 p-2 md:p-4',
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="mx-auto container px-3 md:px-6 flex flex-wrap items-center justify-stretch">
        {title && (
          <div className="shrink grow w-px flex align-center content-start">
            {title}
          </div>
        )}

        <div className="grow-0 md:order-last">{children}</div>

        {links?.length && (
          <>
            <IconButton
              onClick={() => {
                setVisible((v) => !v)
              }}
              type="button"
              id={`${id}-menubutton`}
              className="md:hidden"
              aria-label="Main menu"
              aria-controls={`${id}-menu`}
              aria-haspopup={true}
              aria-expanded={visible}
              path={visible ? mdiClose : mdiMenu}
            />
            <div
              className={clsx(
                'md:visible! md:flex justify-end items-center w-full md:w-auto md:order-6',
                visible || 'hidden'
              )}
            >
              <ul
                role="menu"
                id={`${id}-menu`}
                aria-labelledby={`${id}-menubutton`}
                className="flex flex-col md:flex-row mt-4 md:mt-0"
              >
                {links.map((link, index) => (
                  <li
                    role="presentation"
                    key={link.id || index}
                    className="flex"
                  >
                    {link.content}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </Component>
  )
})
Navbar.displayName = 'Navbar'

export default Navbar

type NavbarTitleProps = {
  subtitle?: ReactNode
}

export const NavbarTitle = forwardRef<NavbarTitleProps, 'a'>(
  ({ as: Component = 'a', children, subtitle, className, ...props }, ref) => (
    <Component
      className={clsx(
        'flex flex-col items-start md:items-center justify-center max-w-full',
        className
      )}
      ref={ref}
      {...props}
    >
      <h1 className="max-w-full text-sm md:text-base text-center font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 truncate">
        {children}
      </h1>

      {subtitle && (
        <span className="max-w-full text-xs md:text-base font-light md:mt-1 text-center truncate">
          {subtitle}
        </span>
      )}
    </Component>
  )
)

NavbarTitle.displayName = 'NavbarTitle'

type NavbarLinkProps = {
  /* */
  as: As
}

export const NavbarLink = ({
  as: Component = 'a',
  children,
  className,
  ...props
}: HtmlProps<NavbarLinkProps, 'a'>) => (
  <Button
    as={Component}
    className={`px-4 py-2 w-full text-center md:text-left ${className || ''}`}
    role="menuitem"
    {...props}
  >
    {children}
  </Button>
)
NavbarLink.displayName = 'NavbarLink'
