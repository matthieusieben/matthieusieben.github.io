'use client'

import { mdiThemeLightDark, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import Icon from '@mdi/react'
import { useTheme } from 'next-themes'
import { ComponentProps, useEffect, useState } from 'react'

import { nextArrayItem } from '@/utils/array'

import { Button } from './button'

type Props = Omit<ComponentProps<typeof Button<'button'>>, 'onClick'> & {
  onChange?: (theme: string) => void
}

export function ThemeSwitch({
  title = 'Toggle dark mode',
  onChange,
  ...props
}: Props) {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme = systemTheme, themes, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Make sure the initial render in the browser matches the SSR rendered output
  const ssrSafeTheme = mounted ? theme : 'light'

  return (
    <Button
      onClick={(e) => {
        if (!e.defaultPrevented) {
          const nextTheme = nextArrayItem(themes, theme || 'system')
          setTheme(nextTheme)
          onChange?.(nextTheme)
        }
      }}
      title={title}
      aria-label={`Current theme is ${ssrSafeTheme}`}
      {...props}
    >
      <Icon path={themeToIcon(ssrSafeTheme)} size="1em" />
    </Button>
  )
}

export function themeToIcon(theme?: string) {
  switch (theme) {
    case 'light':
      return mdiWeatherSunny
    case 'dark':
      return mdiWeatherNight
    default:
      return mdiThemeLightDark
  }
}
