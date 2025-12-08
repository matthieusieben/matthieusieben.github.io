'use client'

import { mdiChevronUp, mdiWeb } from '@mdi/js'
import Icon from '@mdi/react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import { useMenu } from '@/features/dom-hooks/use-menu'
import { clsx } from '@/utils/clsx'

import { Button } from './button'

export type CountryInfo = {
  code: string
  name: string
  img: string | StaticImport
}

export type LangInfo = {
  name: string
  countries: readonly CountryInfo[]
}

export type LangDefs = Record<string, LangInfo>

type Props = {
  locales: LangDefs
  locale: string
  onChange?: (locale: string) => void
  outlined?: boolean
  position?: `${'top' | 'bottom'} ${'left' | 'right'}`
}

const LANGUAGE_SELECTOR_ID = 'language-selector'

export function LocaleSelector({
  locales,
  locale,
  onChange,
  outlined = false,
  position = 'bottom right',
}: Props) {
  const { isOpen, close, menuRef, buttonRef } = useMenu({
    auto: false,
  })

  const [lang] = locale.split('-', 2)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const currentLang = Object.hasOwn(locales, lang) ? locales[lang] : undefined

  const currentLocale = Object.entries(locales).find(
    ([lang]) =>
      locale === lang ||
      (locale.charCodeAt(lang.length) === 45 && locale.startsWith(lang))
  )

  const currentCountry = currentLocale
    ? currentLocale[1].countries.find(
        (country, i) =>
          locale === `${currentLocale[0]}-${country.code}` ||
          (i === 0 && locale === currentLocale[0])
      )
    : undefined

  return (
    <div className="relative">
      <Button ref={buttonRef} aria-expanded={isOpen} outlined={outlined}>
        {currentCountry ? (
          <Image
            src={currentCountry.img}
            width={16}
            height={16}
            className="rounded-full border border-slate-100 dark:border-slate-500 ring-1 ring-slate-600 ring-opacity-50"
            alt={`${currentCountry.name} (${lang})`}
          />
        ) : (
          <Icon
            path={mdiWeb}
            size="1.2em"
            className="rounded-full border border-slate-100 dark:border-slate-500"
          />
        )}
        <span className="mx-2" id={LANGUAGE_SELECTOR_ID}>
          {currentLang?.name || locale}
        </span>
        <Icon
          path={mdiChevronUp}
          size="1.2em"
          className={clsx(
            'transition-transform duration-300',
            isOpen == position.startsWith('top') ? 'rotate-180' : 'rotate-0'
          )}
        ></Icon>
      </Button>

      {
        <ul
          ref={menuRef}
          role="menu"
          className={clsx(
            'absolute mt-2 w-64 p-1 rounded-md border border-gray-300 dark:border-gray-700 shadow-lg bg-white dark:bg-slate-800',
            'transition-all duration-300 ease-in-out origin-top',
            isOpen
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none',
            position === 'top left' && 'origin-bottom-right right-0 bottom-12',
            position === 'top right' && 'origin-bottom-left left-0 bottom-12',
            position === 'bottom left' && 'origin-top-right right-0 top-12',
            position === 'bottom right' && 'origin-top-left left-0 top-12'
          )}
          aria-orientation="vertical"
          aria-labelledby={LANGUAGE_SELECTOR_ID}
        >
          {Object.entries(locales).map(([lang, { name, countries }]) => {
            const isActiveLang =
              locale === lang ||
              (locale.charCodeAt(lang.length) === 45 && locale.startsWith(lang))
            return (
              <li
                key={lang}
                className={clsx(
                  'flex px-2 py-1 items-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer',
                  isActiveLang ? 'font-bold' : ''
                )}
                onClick={
                  onChange && countries.length
                    ? (event) => {
                        event.stopPropagation()
                        event.preventDefault()

                        onChange(`${lang}-${countries[0].code}`)
                        close()
                      }
                    : undefined
                }
              >
                <span className="mr-2 flex-1">{name}</span>

                {countries.map(({ code, name, img }, i) => {
                  const isActiveCountry =
                    (locale === lang && i === 0) || locale === `${lang}-${code}`

                  return (
                    <button
                      key={code}
                      onClick={
                        onChange
                          ? (event) => {
                              event.stopPropagation()
                              event.preventDefault()

                              onChange(`${lang}-${code}`)
                              close()
                            }
                          : undefined
                      }
                      role="menuitem"
                      className={clsx('m-1 rounded-full', '')}
                    >
                      <Image
                        src={img}
                        width={24}
                        height={24}
                        className={clsx(
                          'rounded-full border border-slate-100 dark:border-slate-500',
                          isActiveCountry
                            ? 'ring-2 ring-slate-700'
                            : 'ring-1 ring-slate-600 ring-opacity-50'
                        )}
                        alt={`${name} (${lang})`}
                        role="menuitem"
                      />
                    </button>
                  )
                })}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}
