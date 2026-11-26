import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { webpPath } from '../utils/images'

// Resolve media sizes once in the content data used by prerendering and hydration.
export const sizeContentImages = async (node, staticDir) => {
  if (node.tag === 'img') {
    const { src, width, height } = node.props
    if (width && height) { return { ...node, tag: 'site-image' } }
    const url = new URL(decodeURI(src), 'https://local.invalid')
    if (url.origin !== 'https://local.invalid' || !src.startsWith('/')) {
      throw new Error(`Specify width and height for the content image ${src}.`)
    }
    const image = await sharp(join(staticDir, decodeURI(url.pathname))).metadata()
    return { ...node, tag: 'site-image', props: { ...node.props, ...image.autoOrient } }
  }
  if (!node.children) { return node }
  return { ...node, children: await Promise.all(node.children.map(child => sizeContentImages(child, staticDir))) }
}

// Publish a WebP for each PNG, preserving PNGs and any existing WebP versions.
export const generateWebpImages = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const paths = new Set(entries.map(entry => entry.name))
  for (const entry of entries) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) { await generateWebpImages(file) }
    const webp = webpPath('/' + entry.name)
    if (entry.isFile() && webp && !paths.has(webp.slice(1))) {
      await sharp(file).webp({ quality: 90 }).toFile(join(directory, webp.slice(1)))
    }
  }
}
