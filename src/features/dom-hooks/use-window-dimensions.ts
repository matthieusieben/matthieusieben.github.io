'use client'

import { throttle } from '@/utils/throttle'
import { useState } from 'react'
import { useAbortEffect as useEffect } from './use-abort-effect'

export type Dimensions = ReturnType<typeof getDimensions>

export function useWindowDimensions(throttleDelay = 500) {
  const [value, setValue] = useState(getDimensions())

  useEffect(
    (signal) => {
      const onUpdate = throttle(() => {
        setValue(getDimensions())
      }, throttleDelay)

      window.addEventListener('scroll', onUpdate, { signal, passive: true })
      window.addEventListener('resize', onUpdate, { signal, passive: true })
    },
    [throttleDelay]
  )

  return value
}

function getDimensions() {
  const {
    scrollX = NaN,
    scrollY = NaN,
    innerWidth = NaN,
    innerHeight = NaN,
  } = globalThis
  return { scrollX, scrollY, innerWidth, innerHeight }
}
