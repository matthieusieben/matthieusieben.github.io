import { useAbortEffect as useEffect } from './use-abort-effect'

export function useClickOutside({
  elements,
  handler,
}: {
  elements: readonly (HTMLElement | null)[]
  handler: (event: MouseEvent | TouchEvent) => void
}) {
  useEffect(
    (signal) => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (!elements.some((el) => el?.contains(event.target as Node))) {
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
    [handler, ...elements]
  )
}
