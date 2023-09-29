'use client'

import { useState, useEffect, ComponentProps } from 'react'
import { useTheme } from 'next-themes'
import { mdiThemeLightDark, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'

import { nextArrayItem } from '@/utils/array'

import Button from './button'
import IconButton from './icon-button'

type Props = Omit<ComponentProps<typeof Button<'button'>>, 'onClick'> & {
  onChange?: (theme: string) => void
}

export default function ThemeSwitch({
  title = 'Toggle dark mode',
  onChange,
  ...props
}: Props) {
  const [mounted, setMounted] = useState(false)
  const { theme, themes, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <IconButton
      onClick={(e) => {
        if (!e.defaultPrevented) {
          const nextTheme = nextArrayItem(themes, theme || 'system')
          setTheme(nextTheme)
          onChange?.(nextTheme)
        }
      }}
      title={title}
      aria-label={`Current theme is ${theme}`}
      path={themeToIcon(theme)}
      {...props}
    />
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
