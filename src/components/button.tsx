import { ComponentProps } from 'react'
import { forwardRef } from '@/utils/with-as'

type Props = {
  /*  */
}

const Button = forwardRef<Props, 'button'>(
  ({ as: Component = 'button', className, children, ...props }, ref) => {
    if (Component === 'button' && !props.type) {
      ;(props as ComponentProps<'button'>).type = 'button'
    }

    return (
      <Component
        ref={ref}
        className={`text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm font-medium p-2.5 m-1 ${className}`}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Button.displayName = 'Button'

export default Button
