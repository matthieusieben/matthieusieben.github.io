'use client'

import { mdiChevronDown, mdiChevronUp } from '@mdi/js'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useRef } from 'react'

import { useMenu } from '../dom-hooks/use-menu'
import { ButtonIcon } from './button-icon'

type CountryInfo = {
  code: string
  name: string
  img: string | StaticImport
}

type LangInfo = {
  name: string
  countries: readonly CountryInfo[]
}

type Props = {
  locales: Record<string, LangInfo>
  locale: string
  onChange: (locale: string) => void
}

const LANGUAGE_SELECTOR_ID = 'language-selector'

export function LocaleSelector({ locales, locale, onChange }: Props) {
  const menuRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useMenu({ menuRef, buttonRef })

  const [lang, code] = locale.split('-', 2)

  const currentLang = Object.hasOwn(locales, lang) ? locales[lang] : undefined
  const currentCountry =
    (code && currentLang?.countries.find((c) => c.code === code)) ||
    currentLang?.countries[0]

  return (
    <div className="relative">
      <ButtonIcon
        ref={buttonRef}
        aria-expanded={isOpen}
        id={LANGUAGE_SELECTOR_ID}
        outlined
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        path={isOpen ? mdiChevronDown : mdiChevronUp}
      >
        <span className="ml-2">{currentLang?.name || locale}</span>

        {currentCountry && (
          <Image
            src={currentCountry.img}
            width={16}
            className="ml-2 rounded-full"
            alt={`${currentCountry.name} (${lang})`}
            role="menuitem"
          />
        )}
      </ButtonIcon>

      {isOpen && (
        <ul
          ref={menuRef}
          role="menu"
          className="origin-bottom-right absolute right-0 bottom-12 mt-2 w-64 p-1 rounded-md border border-gray-300 dark:border-gray-700 shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5"
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
                      setIsOpen(false)
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
                    setIsOpen(false)
                  }}
                  role="menuitem"
                  className="m-1"
                >
                  <Image
                    src={img}
                    width={24}
                    className="rounded-full"
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
