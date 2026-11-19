import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { contentTags, readContentCollections } from '../utils/content'
import { articleSizes, postSocialCard, socialImagePath, socialSize, staticCards, staticSocialCard, tagSocialCard } from '../utils/socialCards'

const arts = {
  audio: [34, 61, 104, 155, 83, 187, 226, 122, 70, 32, 51, 74, 36].map((height, index) =>
    `<rect x="${867 + index * 18}" y="${318 - height / 2}" width="8" height="${height}" rx="4" fill="${index >= 4 && index <= 7 ? '#b48549' : '#606b76'}"/>`
  ).join(''),
  orbit: '<g fill="none" stroke="#526070" stroke-width="2"><circle cx="994" cy="315" r="39"/><circle cx="994" cy="315" r="72"/><circle cx="994" cy="315" r="105"/></g><circle cx="1086" cy="265" r="7" fill="#f5b85a"/><circle cx="1006" cy="386" r="5" fill="#7d8995"/>',
  network: '<g fill="none" stroke="#79838d" stroke-width="3"><path d="m882 268 99-72 93 65-36 119-107 32-49-144 156 112-57-184"/><circle cx="882" cy="268" r="9"/><circle cx="981" cy="196" r="9"/><circle cx="1074" cy="261" r="9"/><circle cx="931" cy="412" r="9"/></g><circle cx="1038" cy="380" r="10" fill="#f5b85a"/>',
  tag: '<g transform="translate(994 318)" fill="none" stroke="#b48549" stroke-width="4" stroke-linejoin="round"><path d="M-57-59h58l62 59-59 60-61-60z"/><circle cx="-29" cy="-31" r="10"/></g>',
  code: '<path d="m962 279-48 39 48 39m65-78 48 39-48 39m-21-99-24 120" fill="none" stroke="#b48549" stroke-width="5" stroke-linecap="round"/>'
}

// Escape editorial text before placing it in SVG markup.
const escapeXml = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]))

// Measure each candidate using the same fonts and weight as the renderer.
const measure = (text, family, size, weight, options) => new Resvg(
  `<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="160"><text x="0" y="110" font-family="${family}" font-size="${size}" font-weight="${weight}">${escapeXml(text)}</text></svg>`,
  options
).getBBox().width

// Wrap words to the visible text column.
const wrap = (text, width, measureLine) => text.trim().split(/\s+/).reduce((lines, word) => {
  const previous = lines[lines.length - 1]
  if (!previous) { return [word] }
  const line = `${previous} ${word}`
  return measureLine(line) > width ? [...lines, word] : [...lines.slice(0, -1), line]
}, [])

// Fit the full title in up to three lines, reducing the font for longer titles.
const fitTitle = (title, options) => {
  for (let size = 68; size >= 28; size -= 4) {
    const widthOf = line => measure(line, 'Space Grotesk', size, 600, options)
    const lines = wrap(title, 755, widthOf)
    if (lines.length <= 3 && lines.every(line => widthOf(line) <= 755)) { return { size, lines } }
  }
  throw new Error(`Share card title does not fit: ${title}`)
}

// Position lines explicitly and accent the final line of a wrapped title.
const textLines = (lines, x, y, leading, accent) => lines.map((line, index) =>
  `<tspan x="${x}" y="${y + index * leading}"${accent && lines.length > 1 && index === lines.length - 1 ? ' fill="#f5b85a"' : ''}>${escapeXml(line)}</tspan>`
).join('')

// Fill the approved design and render a PNG with the packaged fonts.
const render = (card, height, template, logo, options) => {
  const title = card.cardTitle || card.title
  const { size, lines } = fitTitle(title, options)
  const descriptionWidth = line => measure(line, 'Roboto Mono', 23, 400, options)
  const descriptionLines = card.description ? wrap(card.description, 744, descriptionWidth).slice(0, 3) : []
  if (descriptionLines.length === 3 && descriptionLines.join(' ') !== card.description.trim()) {
    let lastLine = descriptionLines[2]
    while (descriptionWidth(lastLine + '…') > 744) { lastLine = lastLine.slice(0, -1) }
    descriptionLines[2] = lastLine.trimEnd() + '…'
  }
  const titleY = 295 - (lines.length - 1) * (size + 10) / 2
  const fields = {
    height,
    frameHeight: height - 68,
    title: escapeXml(title),
    label: escapeXml(card.label.replace(' / ', '  /  ')),
    middleOffset: (height - 630) / 2,
    footerOffset: height - 630,
    titleSize: size,
    art: arts[card.art] || arts.orbit,
    logo,
    footer: escapeXml(card.date || card.path),
    titleLines: textLines(lines, 70, titleY, size + 10, true),
    descriptionLines: textLines(descriptionLines, 72, 425, 34, false)
  }
  const svg = template.replace(/{{(\w+)}}/g, (_, key) => fields[key])
  return new Resvg(svg, options).render().asPng()
}

// Render every public route after Nuxt finishes generating the site HTML.
export const generateSocialImages = async (generator, $content) => {
  const root = generator.options.srcDir
  const asset = path => join(root, 'assets/og', path)
  const options = { font: { fontFiles: [asset('fonts/space-grotesk.ttf'), asset('fonts/roboto-mono.ttf'), asset('fonts/roboto-mono-semibold.ttf')], loadSystemFonts: false } }
  const [template, icon, [writings, notes]] = await Promise.all([
    readFile(asset('site-card.svg'), 'utf8'),
    readFile(join(root, 'static/icon.png')),
    readContentCollections($content)
  ])
  const tags = new Set([...writings, ...notes].flatMap(entry => contentTags(entry.tags)))
  const cards = [
    ...Object.keys(staticCards).map(staticSocialCard),
    ...writings.map(entry => postSocialCard('writing', entry)),
    ...notes.map(entry => postSocialCard('notes', entry)),
    ...Array.from(tags, tagSocialCard)
  ]
  const covered = new Set(cards.map(card => decodeURI(card.path)))
  const missing = [...generator.generatedRoutes].filter(route => !covered.has(route))
  if (missing.length) { throw new Error(`Missing share cards for: ${missing.join(', ')}`) }
  const logo = `data:image/png;base64,${icon.toString('base64')}`
  for (const card of cards) {
    const sizes = card.article ? [socialSize, ...articleSizes] : [socialSize]
    for (const [width, height] of sizes) {
      const path = join(generator.distPath, socialImagePath(card, width, height))
      await mkdir(dirname(path), { recursive: true })
      await writeFile(path, render(card, height, template, logo, options))
    }
  }
}
