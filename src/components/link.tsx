'use client'

import NextLink, { type LinkProps } from 'next/link'
import { useParams } from 'next/navigation'

import { defaultLocale } from '@/constants'
import { Locale, isLocale } from '@/utils/locale'
import { Override } from '@/utils/types'

// Prevent prefixing with the locale
type Suffix = __next_route_internal_types__.Suffix
type SearchOrHash = __next_route_internal_types__.SearchOrHash
type StaticRoutes = __next_route_internal_types__.StaticRoutes
type WithProtocol = __next_route_internal_types__.WithProtocol
type SafeSlug<T extends string = string> =
  __next_route_internal_types__.SafeSlug<T>
type DynamicRoutes<T extends string = string> =
  __next_route_internal_types__.DynamicRoutes<T>

type DynamicRoutesWithoutLocale<T extends string = string> =
  T extends StripFirstSegment<DynamicRoutes<infer _>> ? T : never

type StripFirstSegment<T> = T extends `/${SafeSlug}/${infer U}`
  ? `/${U}`
  : never

type RouteImpl<T> =
  | WithProtocol
  | StaticRoutes
  | SearchOrHash
  | `${StaticRoutes}${SearchOrHash}`
  | (T extends `${DynamicRoutesWithoutLocale<infer _>}${Suffix}` ? T : never)

type InternalProps<RouteInferType> = Override<
  LinkProps<RouteInferType>,
  {
    href: RouteImpl<RouteInferType>
    locale?: Locale
  }
>

function LocalizedLink<RouteType>(props: InternalProps<RouteType>) {
  const paramLocale = useParamLocale()

  const { href, locale = paramLocale, ...rest } = props

  const localeFinal = isLocale(locale) ? locale : defaultLocale

  const hrefFinal =
    localeFinal === defaultLocale && href === '/'
      ? '/'
      : (`/${localeFinal}${href}` as __next_route_internal_types__.RouteImpl<RouteType>)

  return (
    <NextLink
      href={hrefFinal}
      hrefLang={localeFinal}
      locale={false}
      {...rest}
    />
  )
}

function useParamLocale(): string | undefined {
  const params = useParams()
  return Array.isArray(params.locale) ? params.locale[0] : params.locale
}

type Props<RouteInferType> =
  | Override<InternalProps<RouteInferType>, { locale?: Locale }>
  | Override<LinkProps<RouteInferType>, { locale: false }>

export default function Link<RouteType>(props: Props<RouteType>) {
  if (isInternalProps(props)) {
    return <LocalizedLink {...props} />
  } else {
    return <NextLink {...props} />
  }
}

function isInternalProps<RouteType>(
  props: InternalProps<RouteType> | LinkProps<RouteType>
): props is InternalProps<RouteType> {
  if (props.locale === false) return false

  if (typeof props.href !== 'string') return false

  const colonIndex = props.href.indexOf(':')
  if (colonIndex !== -1) {
    const hashIndex = props.href.indexOf('#')
    if (hashIndex !== -1 && hashIndex < colonIndex) return false

    const searchIndex = props.href.indexOf('?')
    if (searchIndex !== -1 && searchIndex < colonIndex) return false
  }

  return true
}
