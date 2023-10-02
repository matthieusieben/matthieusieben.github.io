import { forwardRef } from '@/utils/with-as'
import { clsx } from '@/utils/clsx'

type Props = {
  className?: string
}

export const Button = forwardRef<Props, 'button'>(
  ({ as: Component = 'button', className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          `text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm leading-none font-medium text-center inline-block p-2.5`,
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
