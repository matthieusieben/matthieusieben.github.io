/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */

import { ClsxArg, clsx } from './clsx'

type Props = Record<string, unknown> & {
  className?: ClsxArg
  style?: React.CSSProperties
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export function mergeProps<T extends Props[]>(
  ...propsArray: T
): {
  [K in keyof UnionToIntersection<T[number]>]: K extends 'className'
    ? string
    : K extends 'style'
    ? React.CSSProperties
    : Exclude<Extract<T[number], { [Q in K]: unknown }>[K], undefined>
} {
  if (propsArray.length === 0) return {} as any
  if (propsArray.length === 1) return propsArray[0] as any

  const target: Record<string, unknown> = {}
  for (let i = 0; i < propsArray.length; i++) {
    const props = propsArray[i] as Record<string, unknown>
    for (const key in props) {
      if (key === '__proto__') continue // Is this necessary?

      const value = props[key]
      if (value === undefined) continue

      const targetValue = target[key]
      if (targetValue === undefined) {
        target[key] = value
      } else if (key === 'className') {
        target[key] = targetValue
          ? value
            ? clsx(targetValue as string, value as Props['className'])
            : targetValue
          : value
      } else if (key === 'style') {
        target[key] =
          targetValue && Object.keys(targetValue).length
            ? { ...targetValue, ...value }
            : value
      } else if (
        typeof value === 'function' &&
        typeof targetValue === 'function'
      ) {
        target[key] = (...args: unknown[]) => {
          targetValue(...args)
          value(...args)
        }
      } else {
        throw new Error(
          `Didn’t know how to merge prop '${key}'. ` +
            `Only 'className' and 'style' keys or function values are supported.`
        )
      }
    }
  }

  return target as any
}
