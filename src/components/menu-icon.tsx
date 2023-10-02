'use client'

import type { MouseEvent, PointerEvent } from 'react'

import cssModule from './menu-icon.module.sass'
import { HtmlComponent } from '@/utils/with-as'
import { clsx } from '@/utils/clsx'

type Props = {
  active?: boolean
  setActive?: (active: boolean) => void
}

export const MenuIcon: HtmlComponent<Props> = ({
  as: Component = 'div' as const,
  active = false,
  setActive,
  className,
  ...props
}) => {
  const onClick = setActive
    ? (event: MouseEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) => {
        if (!event.defaultPrevented) {
          setActive(!active)
          event.preventDefault()
        }
      }
    : undefined

  return (
    <Component
      className={clsx(
        cssModule.container,
        active ? cssModule.active : cssModule.inactive,
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div>
        <span></span>
        <span></span>
      </div>
    </Component>
  )
}
