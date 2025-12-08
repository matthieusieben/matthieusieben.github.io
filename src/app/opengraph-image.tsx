import { ImageResponse } from 'next/og'

import { defaultLocale, fullName } from '@/constants'
import { getDictionary } from '@/dictionaries'

import portraitUrl from '~/portrait.jpg'

export const alt = fullName
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

type Props = {
  params?: Promise<{ locale?: string }>
}

// We want this image to be part of the "parent" ResolvedMetadata in
// generateMetadata of all pages. In order to achieve this, the
// opengraph-image.tsx file must be in a parent directory of the pages where we
// want this behavior. this is achieved thanks to the "(default)" folder.
export default async function OpengraphImage({ params }: Props) {
  const d = await getDictionary((await params)?.locale || defaultLocale)

  return new ImageResponse(
    (
      <main tw="flex flex-col bg-neutral-900 text-neutral-100 w-full h-full justify-center items-center">
        <img
          alt={d.name}
          width="256"
          height="256"
          tw="rounded-full border-4 border-neutral-100"
          src={portraitUrl.blurDataURL}
        />
        <p tw="text-4xl">{d.name}</p>
        <p tw="text-xl">{d.title}</p>
      </main>
    ),
    {
      width: size.width,
      height: size.height,
    }
  )
}
