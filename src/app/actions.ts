'use server'

import { join, normalize } from 'node:path'
import { readFile } from 'node:fs/promises'
import { getType } from 'mime'

const assetsRoot = join(process.cwd(), '.next')

export async function assetDataUri(path: string) {
  const contentType = getType(path)
  if (!contentType) throw new Error(`Unknown content type for ${path}`)

  const assetPath = normalize(path.replace(/^\/_next\//, '')).replace(
    /^(\.\.(\/|\\|$))+/,
    ''
  )

  const filePath = join(assetsRoot, assetPath)
  const content = await readFile(filePath)
  return `data:${contentType};base64,${content.toString('base64')}`
}
