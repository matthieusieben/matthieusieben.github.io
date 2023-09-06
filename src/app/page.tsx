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
        placeholder="blur"
        sizes={
          // Full screen, make sure we pick the larger of the two dimensions
          `max(100vw, calc(100vh / ${
            pictureImport.width / pictureImport.height
          }))`
        }
        className="object-cover w-full h-full select-none object-[55%,28%]"
      />
      <div className="absolute top-1/3 left-0 w-[50%] min-w-min max-w-full flex flex-col items-end">
        <h1 className="drop-shadow-md text-slate-100 uppercase text-4xl md:text-5xl font-medium max-md:ml-8">
          {fullName}
        </h1>
      </div>
    </main>
  )
}
