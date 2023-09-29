import type { HTMLAttributes } from 'react'

import Image from 'next/image'
import type { StaticImageData } from 'next/dist/shared/lib/get-img-props'

type Props = {
  id?: string
  title: string
  backgroundSrc: StaticImageData
  backgroundAlt?: string
  backgroundPosition?: string
  mainAnchor?: string
}

export default function Header({
  id = 'header',
  title,
  backgroundSrc,
  backgroundAlt = title,
  backgroundPosition = '50% 50%',
  mainAnchor,
  className,
  children,
  ...attrs
}: HTMLAttributes<HTMLElement> & Props) {
  return (
    <header
      className={`${className || ''} w-full h-screen relative overflow-hidden`}
      {...attrs}
    >
      <Image
        src={backgroundSrc}
        alt={backgroundAlt}
        role="img"
        aria-labelledby={`${id}-title`}
        quality={90}
        placeholder="blur"
        sizes={
          // Full screen, make sure we pick the larger of the two dimensions
          `max(100vw, calc(100vh / ${
            backgroundSrc.width / backgroundSrc.height
          }))`
        }
        style={{
          objectPosition: backgroundPosition,
        }}
        className={`object-cover w-full h-full select-none`}
      />
      <div className="absolute top-1/3 left-0 w-[50%] min-w-min max-w-full flex flex-col items-end">
        <h1
          id={`${id}-title`}
          className="drop-shadow-md text-slate-100 uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium max-md:ml-8"
        >
          {title}
        </h1>
      </div>
      {children}
    </header>
  )
}
