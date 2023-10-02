import { useEffect } from 'react'

export function useEscapeKey({
  handler,
}: {
  handler: (event: KeyboardEvent) => void
}) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (!event.defaultPrevented && event.key === 'Escape') {
        handler(event)
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [handler])
}
