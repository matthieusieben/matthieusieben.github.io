import { ImageResponse } from 'next/server'
import { metadata } from './layout'

export const runtime = 'nodejs'

export const alt = metadata.title
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <main tw="flex flex-col bg-neutral-900 text-neutral-100 w-full h-full justify-center items-center">
        <img
          alt={metadata.title}
          width="256"
          height="256"
          tw="rounded-full border-4 border-neutral-100"
          src={`https://github.com/matthieusieben.png?${Date.now()}`}
        />
        <p tw="text-4xl">{metadata.title}</p>
        <p tw="text-xl">{metadata.description}</p>
      </main>
    ),
    {
      width: size.width,
      height: size.height,
    }
  )
}
