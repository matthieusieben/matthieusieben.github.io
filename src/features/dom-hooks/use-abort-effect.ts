import { DependencyList, useEffect } from 'react'

/**
 * @note Import this as `useEffect` to benefit from the eslint exhaustive-deps rule.
 */
export function useAbortEffect(
  effect: (signal: AbortSignal) => void,
  deps?: DependencyList
) {
  useEffect(() => {
    const controller = new AbortController()
    effect(controller.signal)
    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
