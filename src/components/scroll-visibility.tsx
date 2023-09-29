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

const ScrollVisibility = forwardRef<Props>(
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
  ) => (
    <Component
      className={clsx(
        className,
        useScrollVisibility(mode, threshold)
          ? classNameVisible
          : classNameHidden
      )}
      ref={ref}
      {...props}
    />
  )
)
ScrollVisibility.displayName = 'ScrollVisibility'

export default ScrollVisibility
