import { readFile } from 'node:fs/promises'
import { join, normalize } from 'node:path'

import { getType } from 'mime'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/server'

import { fullName, fullTitle, locales } from '@/constants'
import { arrayIncludes } from '@/utils/array'

import portraitUrl from '~/portrait.jpg'

export const alt = fullName
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// https://github.com/vercel/next.js/issues/51147
// export async function generateStaticParams() {
//   return locales.map((locale) => ({ locale }))
// }

export default async function LocaleOpengraphImage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  if (!arrayIncludes(locales, locale)) notFound()

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

export async function assetDataUri(path: string) {
  const contentType = getType(path)
  if (!contentType) throw new Error(`Unknown content type for ${path}`)

  const assetPath = normalize(path.replace(/^\/_next\//, '')).replace(
    /^(\.\.(\/|\\|$))+/,
    ''
  )

  const filePath = join(process.cwd(), '.next', assetPath)
  const content = await readFile(filePath)
  return `data:${contentType};base64,${content.toString('base64')}`
}
