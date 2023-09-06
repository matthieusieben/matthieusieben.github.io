import type { Metadata } from 'next'
import Image from 'next/image'

import pictureImport from '~/picture.jpg'
import { fullName, fullTitle, origin } from '@/constants'

export const metadata: Metadata = {
  title: `${fullName} | ${fullTitle}`,
  description: fullTitle,
  metadataBase: new URL(origin),
  openGraph: {
    type: 'website',
    siteName: `${fullName} | ${fullTitle}`,
    title: fullName,
    description: fullTitle,
    url: origin,
  },
  twitter: {
    creator: fullName,
    site: origin,
    title: fullName,
    description: fullTitle,
  },
  robots: {
    index: true,
    indexifembedded: false,
  },
}

export default function Home() {
  return (
    <main className="w-full h-screen relative overflow-hidden">
      <Image
        src={pictureImport}
        alt={fullName}
        quality={90}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        sizes={
          // Full screen, make sure we pick the larger of the two dimensions
          `max(100vw, calc(100vh / ${
            pictureImport.width / pictureImport.height
          }))`
        }
        className="w-full h-full select-none max-md:object-[55%] [@media(max-height:639px)]:object-[55%,25%]"
      />
      <div className="absolute top-1/3 left-0 w-[50%] min-w-min max-w-fit flex flex-col items-end pl-8">
        <span className="drop-shadow-md text-slate-100 uppercase text-4xl md:text-5xl font-medium">
          {fullName}
        </span>
      </div>
    </main>
  )
}
