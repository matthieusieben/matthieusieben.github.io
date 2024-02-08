'use client'

import type { MutableRefObject } from 'react'
import { useCallback, useState } from 'react'

import { useClickOutside } from './use-click-outside'
import { useEscapeKey } from './use-escape-key'
import { useIntersecting } from './use-intersection-observer'

export function useMenu({
  buttonRef,
  menuRef,
}: {
  buttonRef: MutableRefObject<null | HTMLButtonElement>
  menuRef: MutableRefObject<null | HTMLElement>
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEscapeKey({
    handler: useCallback(
      (event) => {
        setIsOpen((visibleCurrent) => {
          if (visibleCurrent) buttonRef.current?.focus()
          return false
        })
      },
      [setIsOpen, buttonRef]
    ),
  })

  useClickOutside({
    refs: [menuRef, buttonRef],
    handler: useCallback(
      (event) => {
        setIsOpen(false)
      },
      [setIsOpen]
    ),
  })

  // If the button is not into the viewport, close the menu
  useIntersecting({
    ref: buttonRef,
    handler: useCallback(
      (isIntersecting) => {
        if (!isIntersecting) setIsOpen(false)
      },
      [setIsOpen]
    ),
  })

  return [isOpen, setIsOpen] as const
}
