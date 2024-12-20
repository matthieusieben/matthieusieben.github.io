'use client'

import { mdiChevronUp, mdiWeb } from '@mdi/js'
import Icon from '@mdi/react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import { clsx } from '@/utils/clsx'
import { useMenu } from '@/features/dom-hooks/use-menu'
import { useOnceActivated } from '@/features/dom-hooks/use-once-activated'

import { ButtonIcon } from './button-icon'

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
  onChange: (locale: string) => void
}

const LANGUAGE_SELECTOR_ID = 'language-selector'

export function LocaleSelector({ locales, locale, onChange }: Props) {
  const { isOpen, close, menuRef, buttonRef } = useMenu({
    auto: false,
  })

  const [lang] = locale.split('-', 2)

  const currentLang = Object.hasOwn(locales, lang) ? locales[lang] : undefined

  return (
    <div className="relative">
      <ButtonIcon ref={buttonRef} aria-expanded={isOpen} outlined path={mdiWeb}>
        <span className="mx-2" id={LANGUAGE_SELECTOR_ID}>
          {currentLang?.name || locale}
        </span>
        <Icon
          path={mdiChevronUp}
          size="1.2em"
          className={clsx(
            'transition-transform duration-300',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        ></Icon>
      </ButtonIcon>

      {useOnceActivated(isOpen) && (
        <ul
          ref={menuRef}
          role="menu"
          className="origin-bottom-right absolute right-0 bottom-12 mt-2 w-64 p-1 rounded-md border border-gray-300 dark:border-gray-700 shadow-lg bg-white dark:bg-slate-800"
          style={{ display: isOpen ? 'block' : 'none' }}
          aria-orientation="vertical"
          aria-labelledby={LANGUAGE_SELECTOR_ID}
        >
          {Object.entries(locales).map(([lang, { name, countries }]) => (
            <li
              key={lang}
              className="flex px-2 py-1 items-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              onClick={
                countries.length
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

              {countries.map(({ code, name, img }) => (
                // image in a round bubble
                <button
                  key={code}
                  onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()

                    onChange(`${lang}-${code}`)
                    close()
                  }}
                  role="menuitem"
                  className="m-1"
                >
                  <Image
                    src={img}
                    width={24}
                    height={24}
                    className="rounded-full border border-slate-100 dark:border-slate-500 ring-1 ring-slate-600 ring-opacity-50"
                    alt={`${name} (${lang})`}
                    role="menuitem"
                  />
                </button>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
