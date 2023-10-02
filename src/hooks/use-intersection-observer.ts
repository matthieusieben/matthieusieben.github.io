import type { MutableRefObject } from 'react'
import { useCallback, useEffect } from 'react'

export function useIntersectionObserver({
  ref,
  handler,
  options,
}: {
  ref: MutableRefObject<HTMLElement | null>
  handler: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void
  options?: IntersectionObserverInit
}) {
  const localHandler = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries.length === 1) handler(entries[0], observer)
    },
    [handler]
  )

  useEffect(() => {
    if (!ref.current) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(localHandler, options)
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref, localHandler, options])
}

export function useIntersectionRatio({
  ref,
  handler,
  options,
}: {
  ref: MutableRefObject<HTMLElement | null>
  handler: (intersectionRatio: number) => void
  options?: IntersectionObserverInit
}) {
  const observerHandler = useCallback(
    (entry: IntersectionObserverEntry) => {
      handler(entry.intersectionRatio)
    },
    [handler]
  )

  useIntersectionObserver({ ref, handler: observerHandler, options })
}

export function useIntersecting({
  ref,
  ratio = 0.5,
  handler,
  options,
}: {
  ref: MutableRefObject<HTMLElement | null>
  ratio?: number
  handler: (isIntersecting: boolean) => void
  options?: IntersectionObserverInit
}) {
  const observerHandler = useCallback(
    (intersectionRatio: number) => {
      const isIntersecting =
        ratio >= 1.0 && intersectionRatio === 1.0
          ? true
          : ratio <= 0.0 && intersectionRatio === 0.0
          ? false
          : intersectionRatio > ratio

      handler(isIntersecting)
    },
    [ratio, handler]
  )

  useIntersectionRatio({ ref, handler: observerHandler, options })
}
