/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  FC,
  ForwardedRef,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  WeakValidationMap,
} from 'react'

import { forwardRef as baseForwardRef } from 'react'

export type HtmlComponent<
  T extends keyof JSX.IntrinsicElements,
  P extends object = {},
  ExtraOmit extends keyof any = never,
> = ExtendedComponent<T, P, ExtraOmit>

export type PolymorphicComponent<
  P extends object,
  D extends ElementType = 'div',
> = <T extends ElementType = D>(props: PolymorphicProps<T, P>) => ReactNode

export type ExtendedComponent<
  T extends ElementType,
  P extends object = {},
  ExtraOmit extends keyof any = never,
> = FC<ExtendComponentProps<T, P, ExtraOmit>>

export type PolymorphicProps<
  T extends ElementType = 'div',
  P extends object = {},
  ExtraOmit extends keyof any = never,
> = ExtendComponentProps<T, P, 'as' | ExtraOmit> & { as?: T }

type ExtendComponentProps<
  T extends ElementType = 'div',
  P extends object = {},
  ExtraOmit extends keyof any = never,
> = Omit<ComponentPropsWithoutRef<T>, keyof P | ExtraOmit> & P

export const forwardRef = baseForwardRef as <
  P extends object,
  D extends ElementType = 'div',
>(
  render: <T extends ElementType = D>(
    props: PolymorphicProps<T, P>,
    ref: null | ForwardedRef<ElementRef<T>>
  ) => ReactNode
) => InternalForwardRefRenderFunction<D, P>

// Same as ForwardRefExoticComponent but with "as" and "ref" types bound together
type InternalForwardRefRenderFunction<
  D extends ElementType,
  P extends object,
> = {
  <T extends ElementType = D>(
    props: InternalForwardRefRenderProps<T, P>
  ): ReactNode
  readonly $$typeof: symbol
  displayName?: string
  defaultProps?: Partial<P>
  propTypes?: WeakValidationMap<P>
}

type InternalForwardRefRenderProps<
  T extends ElementType,
  P extends object,
> = Omit<InternalPropsOf<T>, keyof P | 'as'> &
  P &
  RefAttributes<ElementRef<T>> & { as?: T }

type InternalPropsOf<T extends ElementType> =
  T extends InternalForwardRefRenderFunction<infer D, infer Props>
    ? PropsWithoutRef<ExtendComponentProps<D, Props, 'as'>>
    : T extends PolymorphicComponent<infer Props, infer D>
      ? PropsWithoutRef<ExtendComponentProps<D, Props, 'as'>>
      : ComponentPropsWithoutRef<T>
