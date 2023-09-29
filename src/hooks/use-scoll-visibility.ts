import { useEffect, useState } from 'react'

export function useScrollVisibility(
  mode: 'appear' | 'disappear',
  threshold: number | `${number}vh`
) {
  const [visible, setVisible] = useState(mode === 'disappear')

  useEffect(() => {
    setVisible(computeVisibility(mode, threshold))

    const updateVisibility = () => {
      setVisible(computeVisibility(mode, threshold))
    }

    window.addEventListener('scroll', updateVisibility)
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [mode, threshold])

  return visible
}

function computeVisibility(
  mode: 'appear' | 'disappear',
  threshold: number | `${number}vh`
) {
  const thresholdPx = parseThreshold(threshold)
  if (mode === 'disappear') return !isThresholdPassed(thresholdPx)
  return isThresholdPassed(thresholdPx)
}

function parseThreshold(threshold: number | `${number}vh`): number {
  if (typeof threshold === 'number') return threshold
  const vh = window.innerHeight * 0.01
  const thresholdVh = Number(threshold.slice(0, -2))
  return thresholdVh * vh
}

function isThresholdPassed(threshold: number) {
  return window.scrollY > threshold
}
