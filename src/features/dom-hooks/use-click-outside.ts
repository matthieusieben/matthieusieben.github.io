import type { MutableRefObject } from 'react'
import { useAbortEffect as useEffect } from './use-abort-effect'

export function useClickOutside({
  refs,
  handler,
}: {
  refs: MutableRefObject<HTMLElement | null>[]
  handler: (event: MouseEvent | TouchEvent) => void
}) {
  useEffect(
    (signal) => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (!refs.some((ref) => ref.current?.contains(event.target as Node))) {
          handler(event)
        }
      }

      document.addEventListener('mousedown', listener, {
        signal,
        passive: true,
      })
      document.addEventListener('touchstart', listener, {
        signal,
        passive: true,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handler, ...refs]
  )
}
