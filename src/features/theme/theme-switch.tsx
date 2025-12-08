'use client'

import { mdiThemeLightDark, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import { useTheme } from 'next-themes'
import { ComponentProps, MouseEvent, useEffect, useState } from 'react'

import { Button } from '@/features/ui/button'
import { nextArrayItem } from '@/utils/array'
import { clsx } from '@/utils/clsx'

type Props = {
  onChange?: (theme: string) => void
  title?: string
  colors?: Record<string, string | undefined>
  classes?: Record<string, string | undefined>
}

export function ThemeSwitch({
  title = 'Toggle dark mode',
  onChange,
  onClick,
  colors,
  classes,
  className,
  ...props
}: Props & ComponentProps<typeof Button>) {
  const [mounted, setMounted] = useState(false)
  const { systemTheme = 'light', theme, themes, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Make sure the initial render in the browser matches the SSR rendered output
  const ssrSafeTheme = (mounted && theme) || 'light'
  const colorTheme = ssrSafeTheme === 'system' ? systemTheme : ssrSafeTheme

  return (
    <Button
      onClick={(e: MouseEvent<HTMLElement>) => {
        // @ts-expect-error The "Omit<>" makes props incompatible here, though they are
        onClick?.(e)

        const nextTheme = nextArrayItem(themes, theme) || systemTheme

        if (!e.defaultPrevented && onChange) {
          onChange(nextTheme)
        }
        // Call onChange first to allow calling prevent default from there
        if (!e.defaultPrevented) {
          setTheme(nextTheme)
          e.preventDefault()
        }
      }}
      title={title}
      aria-hidden="true"
      color={colors?.[colorTheme] || 'currentColor'}
      className={clsx(className, classes?.[colorTheme])}
      {...(props as ComponentProps<typeof Button>)}
      icon={themeToIcon(ssrSafeTheme)}
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
