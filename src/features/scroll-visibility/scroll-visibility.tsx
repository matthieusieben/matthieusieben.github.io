'use client'

import { useOnceActivated } from '@/features/dom-hooks/use-once-activated'
import {
  Threshold,
  useScrollVisibility,
} from '@/features/dom-hooks/use-scoll-visibility'
import { createRef, HTMLAttributes, ReactNode } from 'react'

type Props = {
  threshold?: Threshold
  classNameHidden?: string
  classNameVisible?: string
  children?: ReactNode
}

export function ScrollVisibility({
  threshold = 100,
  classNameHidden = 'transition-[opacity] ease-in-out opacity-0',
  classNameVisible = 'transition-[opacity] ease-in-out opacity-100',
  children,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const visible = useScrollVisibility(threshold)
  const activated = useOnceActivated(visible)

  if (!visible && !activated) return null

  const className = visible && activated ? classNameVisible : classNameHidden

  const ref = createRef<HTMLDivElement | null>()

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}
