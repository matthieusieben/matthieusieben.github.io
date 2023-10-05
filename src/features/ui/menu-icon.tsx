'use client'

import type { MouseEvent, PointerEvent } from 'react'

import { PolymorphicComponent } from '@/utils/polymorphic-component'
import { clsx } from '@/utils/clsx'

import classes from './menu-icon.module.sass' assert { type: 'css' }

type Props = {
  active?: boolean
  size?: number | string
  setActive?: (active: boolean) => void
}

export const MenuIcon: PolymorphicComponent<Props> = ({
  as: Component = 'div' as const,
  active = false,
  size,
  setActive,
  className,
  style,
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
        classes.container,
        active ? classes.active : classes.inactive,
        className
      )}
      style={{
        ...style,
        fontSize: size || '1em',
      }}
      onClick={onClick}
      {...props}
    >
      <div aria-hidden="true">
        <span></span>
        <span></span>
      </div>
    </Component>
  )
}
