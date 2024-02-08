import { useCallback, useEffect } from 'react'

export function useIntersectionObserver({
  element,
  handler,
  options,
}: {
  element: HTMLElement | null
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
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(localHandler, options)
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [element, localHandler, options])
}

export function useIntersecting({
  element,
  ratio = 0.5,
  handler,
  options,
}: {
  element: HTMLElement | null
  ratio?: number
  handler: (isIntersecting: boolean) => void
  options?: IntersectionObserverInit
}) {
  useIntersectionObserver({
    element,
    options,
    handler: useCallback(
      ({ intersectionRatio }) => {
        const isIntersecting =
          ratio >= 1.0 && intersectionRatio === 1.0
            ? true
            : ratio <= 0.0 && intersectionRatio === 0.0
              ? false
              : intersectionRatio > ratio

        handler(isIntersecting)
      },
      [ratio, handler]
    ),
  })
}
