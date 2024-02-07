import { useState } from 'react'
import { useAbortEffect as useEffect } from './use-abort-effect'
import { useMousePosition } from './use-mouse-position'
import { useWindowDimensions, Dimensions } from './use-window-dimensions'

export type Mode = 'appear' | 'disappear'
export type Threshold = number | `${number}vh`

export function useScrollVisibility(
  mode: Mode,
  threshold: Threshold,
  throttleDelay = 200
) {
  const [visible, setVisible] = useState(mode === 'disappear')

  const dimensions = useWindowDimensions(throttleDelay)
  const position = useMousePosition(throttleDelay)

  useEffect(() => {
    const thresholdPx = parseThreshold(threshold, dimensions)
    const shouldBeVisible =
      dimensions.scrollY > thresholdPx ||
      (position?.clientY || NaN) < thresholdPx
    setVisible(mode === 'disappear' ? !shouldBeVisible : shouldBeVisible)
  }, [mode, threshold, dimensions, position])

  return visible
}

function parseThreshold(
  threshold: number | `${number}vh`,
  dimensions: Dimensions
): number {
  if (typeof threshold === 'number') return threshold
  const vh = dimensions.innerHeight * 0.01
  const thresholdVh = Number(threshold.slice(0, -2))
  return thresholdVh * vh
}
