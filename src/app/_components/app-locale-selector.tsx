'use client'

import beFlag from 'flag-icons/flags/1x1/be.svg'
import frFlag from 'flag-icons/flags/1x1/fr.svg'
import usFlag from 'flag-icons/flags/1x1/us.svg'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import { buildUrl } from '@/alternates'
import { LangDefs, LocaleSelector } from '@/features/ui/locale-selector'

type Props = {
  locale: string
  position?: `${'top' | 'bottom'} ${'left' | 'right'}`
  outlined?: boolean
}

export const localesNames: LangDefs = {
  en: {
    name: 'English',
    countries: [
      //
      {
        code: 'US',
        name: 'United States of America',
        img: usFlag as StaticImport,
      },
    ],
  },
  fr: {
    name: 'Français',
    countries: [
      { code: 'FR', name: 'France', img: frFlag as StaticImport },
      { code: 'BE', name: 'Belgique', img: beFlag as StaticImport },
    ],
  },
} as const

export function AppLocaleSelector(props: Props) {
  return (
    <LocaleSelector
      locale={props.locale}
      locales={localesNames}
      position={props.position}
      outlined={props.outlined}
      onChange={(locale) => {
        window.location.href = buildUrl(locale, '/')
      }}
    />
  )
}
