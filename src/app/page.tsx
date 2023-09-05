import type { Metadata } from 'next'
import Image from 'next/image'

import { fullName } from '../constants'

export const metadata = {} satisfies Metadata

export default function Home() {
  return (
    <main className="w-full h-screen relative">
      <Image
        src="/picture.jpg"
        className="object-cover w-full h-full select-none"
        width={1920}
        height={1080}
        alt={fullName}
      />
      <div className="absolute drop-shadow-md text-slate-100 uppercase top-1/3 left-[10%] max-w-[50%] text-5xl font-medium">
        {fullName}
      </div>
    </main>
  )
}
