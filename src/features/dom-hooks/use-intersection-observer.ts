import { useCallback, useEffect, useState } from 'react'

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
  ratio = 0,
  handler,
  options,
}: {
  element: HTMLElement | null
  ratio?: number
  handler: (isIntersecting: boolean) => void
  options?: IntersectionObserverInit
}) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useIntersectionObserver({
    element,
    options,
    handler: useCallback(
      ({ intersectionRatio }) => {
        setIsIntersecting(intersectionRatio > ratio)
      },
      [setIsIntersecting, ratio]
    ),
  })

  useEffect(() => {
    handler(isIntersecting)
  }, [handler, isIntersecting])
}
