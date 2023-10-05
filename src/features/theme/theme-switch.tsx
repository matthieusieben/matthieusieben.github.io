'use client'

import { mdiThemeLightDark, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import { useTheme } from 'next-themes'
import { MouseEvent, useEffect, useState } from 'react'

import { ButtonIcon } from '@/features/ui/button-icon'
import { nextArrayItem } from '@/utils/array'
import { clsx } from '@/utils/clsx'
import { ExtendedComponent } from '@/utils/polymorphic-component'

type Props = {
  onChange?: (theme: string, event: MouseEvent<HTMLButtonElement>) => void
  title?: string
  colors?: Record<string, string | undefined>
  classes?: Record<string, string | undefined>
}

export const ThemeSwitch: ExtendedComponent<
  typeof ButtonIcon<'button'>,
  Props,
  'path'
> = ({
  title = 'Toggle dark mode',
  onChange,
  colors,
  classes,
  className,
  ...props
}) => {
  const [mounted, setMounted] = useState(false)
  const { systemTheme = 'light', theme, themes, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Make sure the initial render in the browser matches the SSR rendered output
  const ssrSafeTheme = (mounted && theme) || 'light'
  const colorTheme = ssrSafeTheme === 'system' ? systemTheme : ssrSafeTheme

  return (
    <ButtonIcon
      onClick={(e) => {
        const nextTheme = nextArrayItem(themes, theme) || systemTheme

        if (!e.defaultPrevented && onChange) {
          onChange(nextTheme, e)
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
      {...props}
      path={themeToIcon(ssrSafeTheme)}
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
