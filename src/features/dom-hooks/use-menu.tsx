'use client'

import { RefCallback, useCallback, useState } from 'react'

import { useClickOutside } from './use-click-outside'
import { useEscapeKey } from './use-escape-key'
import { useIntersecting } from './use-intersection-observer'
import { useAbortEffect as useEffect } from './use-abort-effect'

export function useMenu({ auto = false }: { auto?: boolean } = {}) {
  const [isOpen, setIsOpen] = useState(false)

  const [button, setButton] = useState<HTMLElement | null>(null)
  const buttonRef: RefCallback<HTMLElement | null> = useCallback(setButton, [
    setButton,
  ])

  const [menu, setMenu] = useState<HTMLElement | null>(null)
  const menuRef: RefCallback<HTMLElement | null> = useCallback(setMenu, [
    setMenu,
  ])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])
  const close = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])
  const toggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [setIsOpen])
  const closeAndFocus = useCallback(() => {
    setIsOpen((isOpen) => {
      if (isOpen) setTimeout(() => button?.focus())
      return false
    })
  }, [setIsOpen, button])

  useEscapeKey({
    handler: closeAndFocus,
  })

  useClickOutside({
    elements: [menu, button],
    handler: close,
  })

  // If the button is not into the viewport, close the menu
  useIntersecting({
    element: button,
    handler: useCallback(
      (isIntersecting) => {
        if (!isIntersecting) close()
      },
      [close]
    ),
  })

  useEffect(() => {
    if (isOpen) {
      const focusable = menu?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      focusable?.[0]?.focus()
    }
  }, [isOpen, menu])

  useEffect(
    (signal) => {
      if (auto) {
        button?.addEventListener('mouseover', open, { signal, passive: true })
        menu?.addEventListener('mouseleave', close, { signal, passive: true })
      }
    },
    [open, close, auto, button, menu]
  )

  return { isOpen, open, close, toggle, menuRef, buttonRef }
}
