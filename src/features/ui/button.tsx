import { clsx } from '@/utils/clsx'
import { forwardRef } from '@/utils/polymorphic-component'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  title?: string
  outlined?: boolean
}

export const classes = clsx(
  'inline-flex items-center justify-items-center justify-center',
  'rounded-md leading-none p-2.5',
  'font-sans font-semibold font-medium text-sm text-center',
  'text-gray-500',
  'focus:outline-none focus:ring-4 focus:ring-gray-200',
  'disabled:opacity-50 disabled:pointer-events-none',
  'dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
)

export const classesOutlined = clsx(
  'border border-gray-300',
  'shadow-sm',
  'bg-white',
  'dark:bg-gray-800 dark:border-gray-700'
)

export const Button = forwardRef<Props, 'button'>(
  (
    {
      as: Component = 'button',
      className,
      children,
      type = 'button',
      outlined = false,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={clsx(classes, className, outlined && classesOutlined)}
        type={type}
        {...props}
      >
        {children == null ? props.title : children}
      </Component>
    )
  }
)
Button.displayName = 'Button'
