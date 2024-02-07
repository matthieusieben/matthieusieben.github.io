import { throttle } from '@/utils/throttle'
import { useState } from 'react'
import { useAbortEffect as useEffect } from './use-abort-effect'

export function useMousePosition(throttleDelay = 500) {
  const [value, setValue] = useState(
    undefined as undefined | { clientX: number; clientY: number }
  )

  useEffect(
    (signal) => {
      const onMove = throttle(({ clientX, clientY }: MouseEvent) => {
        setValue({ clientX, clientY })
      }, throttleDelay)

      window.addEventListener('mousemove', onMove, { passive: true, signal })

      const onOut = (event: MouseEvent) => {
        if (event.relatedTarget == null) {
          onMove.cancel()
          setValue(undefined)
        }
      }

      window.addEventListener('mouseout', onOut, { passive: true, signal })
    },
    [throttleDelay]
  )

  return value
}
