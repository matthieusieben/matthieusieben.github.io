'use client'

import type { HTMLAttributes, MouseEvent, PointerEvent } from 'react'

import { clsx } from '@/utils/clsx'

import classes from './menu-icon.module.sass' with { type: 'css' }

type Props = {
  active?: boolean
  size?: number | string
  setActive?: (active: boolean) => void
}

export function MenuIcon({
  active = false,
  size,
  setActive,
  className,
  style,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const onClick = setActive
    ? (event: MouseEvent<HTMLDivElement> | PointerEvent<HTMLDivElement>) => {
        if (!event.defaultPrevented) {
          setActive(!active)
          event.preventDefault()
        }
      }
    : undefined

  return (
    <div
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
    </div>
  )
}
