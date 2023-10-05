'use client'

import { useEffect, useState } from 'react'

export const useOnceActivated = (currentlyActive: boolean, debounce = 10) => {
  const [activated, setActivated] = useState(currentlyActive)

  useEffect(() => {
    if (currentlyActive && !activated) {
      const timeout = setTimeout(() => {
        setActivated(true)
      }, debounce)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [currentlyActive, activated, debounce])

  return activated
}
