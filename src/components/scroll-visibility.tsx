'use client'

import { useScrollVisibility } from '@/hooks/use-scoll-visibility'
import { clsx } from '@/utils/clsx'
import { forwardRef } from '@/utils/with-as'

type Props = {
  mode?: 'appear' | 'disappear'
  threshold?: number | `${number}vh`
  classNameHidden?: string
  classNameVisible?: string
}

export const ScrollVisibility = forwardRef<Props>(
  (
    {
      threshold = 100,
      mode = 'appear',
      classNameHidden = 'transition-[opacity] ease-in-out opacity-0',
      classNameVisible = 'transition-[opacity] ease-in-out opacity-100',
      as: Component = 'div',
      className,
      ...props
    },
    ref
  ) => {
    const visible = useScrollVisibility(mode, threshold)
    return (
      <Component
        className={clsx(
          className,
          visible ? classNameVisible : classNameHidden
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ScrollVisibility.displayName = 'ScrollVisibility'
