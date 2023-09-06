import { ImageResponse } from 'next/server'

import { fullName, fullTitle } from '@/constants'
import portraitUrl from '~/portrait.jpg'

import { assetDataUri } from './actions'

export const runtime = 'nodejs'

export const alt = fullName
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OpengraphImage() {
  const src = await assetDataUri(portraitUrl.src)

  return new ImageResponse(
    (
      <main tw="flex flex-col bg-neutral-900 text-neutral-100 w-full h-full justify-center items-center">
        <img
          alt={fullName}
          width="256"
          height="256"
          tw="rounded-full border-4 border-neutral-100"
          src={src}
        />
        <p tw="text-4xl">{fullName}</p>
        <p tw="text-xl">{fullTitle}</p>
      </main>
    ),
    {
      width: size.width,
      height: size.height,
    }
  )
}
