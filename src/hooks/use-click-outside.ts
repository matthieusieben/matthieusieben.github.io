import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

export function useClickOutside({
  refs,
  handler,
}: {
  refs: MutableRefObject<HTMLElement | null>[]
  handler: (event: MouseEvent | TouchEvent) => void
}) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!refs.some((ref) => ref.current?.contains(event.target as Node))) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, ...refs])
}
