'use client'

import { useOnceActivated } from '@/features/dom-hooks/use-once-activated'
import {
  Mode,
  Threshold,
  useScrollVisibility,
} from '@/features/dom-hooks/use-scoll-visibility'
import { mergeProps } from '@/utils/merge-props'
import { forwardRef } from '@/utils/polymorphic-component'

type Props = {
  mode?: Mode
  threshold?: Threshold
  classNameHidden?: string
  classNameVisible?: string
}

export const ScrollVisibility = forwardRef<Props>(
  (
    {
      as: Component = 'div',
      threshold = 100,
      mode = 'appear',
      classNameHidden = 'transition-[opacity] ease-in-out opacity-0',
      classNameVisible = 'transition-[opacity] ease-in-out opacity-100',
      ...props
    },
    ref
  ) => {
    const visible = useScrollVisibility(mode, threshold)
    const activated = useOnceActivated(visible)

    if (!visible && !activated) return null

    const className = visible && activated ? classNameVisible : classNameHidden
    return <Component ref={ref} {...mergeProps(props, { className })} />
  }
)
ScrollVisibility.displayName = 'ScrollVisibility'
