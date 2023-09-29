/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  Component,
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardRefExoticComponent,
  ForwardedRef,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  WeakValidationMap,
} from 'react'

import { forwardRef as baseForwardRef } from 'react'

export type As =
  | ForwardRefExoticComponent<any>
  | { new (props: any): Component<any> }
  | ((props: any, context?: any) => ReactNode)
  | keyof JSX.IntrinsicElements

export type HtmlProps<
  P,
  T extends As = 'div',
  ExtraOmit extends keyof any = never,
> = Omit<ComponentPropsWithoutRef<T>, keyof P | ExtraOmit> & P

export const forwardRef = baseForwardRef as <P, D extends As = 'div'>(
  render: <T extends As = D>(
    props: HtmlProps<P, T, 'as'> & { as?: T },
    ref: null | ForwardedRef<ElementRef<T>>
  ) => ReactNode
) => InternalForwardRefRenderFunction<D, P>

// Same as ForwardRefExoticComponent but with "as" and "ref" types bound together
type InternalForwardRefRenderFunction<D extends As, P> = {
  <T extends As = D>(props: InternalForwardRefRenderProps<T, P>): ReactNode
  readonly $$typeof: symbol
  displayName?: string
  defaultProps?: Partial<P>
  propTypes?: WeakValidationMap<P>
}

type InternalForwardRefRenderProps<T extends As, P> =
  // We are using InternalHtmlProps instead of HtmlProps because it better infers
  // the "as" type when an InternalForwardRefRenderFunction is used as "as".
  InternalHtmlProps<T, P, 'as'> & RefAttributes<ElementRef<T>> & { as?: T }

type InternalHtmlProps<
  T extends As,
  P,
  ExtraOmit extends keyof any = never,
> = Omit<InternalComponentPropsWithoutRef<T>, keyof P | ExtraOmit> & P

type InternalComponentPropsWithoutRef<T extends As> =
  T extends InternalForwardRefRenderFunction<infer D, infer Props>
    ? PropsWithoutRef<HtmlProps<Props, D, 'as'>>
    : ComponentPropsWithoutRef<T>
