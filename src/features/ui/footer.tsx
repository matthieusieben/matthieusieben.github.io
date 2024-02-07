import { clsx } from '@/utils/clsx'
import type { PolymorphicComponent } from '@/utils/polymorphic-component'

type Props = {
  id?: string
}

export const Footer: PolymorphicComponent<Props, 'footer'> = ({
  as: Component = 'footer' as const,
  id = 'footer',
  className,
  children,
  ...attrs
}) => {
  return (
    <Component
      className={clsx(
        'w-full h-32 flex flex-col items-center justify-center text-gray-600 dark:text-gray-400',
        className
      )}
      {...attrs}
    >
      <div className="p-4 w-full mx-auto container md:flex md:items-center md:justify-between">
        {children}
      </div>
    </Component>
  )
}
