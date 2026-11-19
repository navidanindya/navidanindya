import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { readContentCollections } from '../utils/content'

// Escape the canonical slug for the generated SQL file.
const seedRow = (kind, slug) => {
  if (typeof slug !== 'string' || !slug || [...slug].length > 200 || slug.includes('\0')) {
    throw new Error(`Invalid view counter slug for ${kind}: ${slug}`)
  }
  return `('${kind}', '${slug.replace(/'/g, "''")}', 0)`
}

// Register new routes from the same collections that feed the sitemap.
export const writeEntryViewSeed = async (rootDir, $content) => {
  const [writings, notes] = await readContentCollections($content)
  const rows = [
    ...writings.map(({ slug }) => seedRow('writing', slug)),
    ...notes.map(({ slug }) => seedRow('note', slug))
  ]
  const seedDir = join(rootDir, '.nuxt')
  await mkdir(seedDir, { recursive: true })
  // Generate one seed for each table, outside the public build. Existing counts stay intact.
  await Promise.all(['entry_views', 'entry_views_preview'].map(table => writeFile(
    join(seedDir, `${table}.sql`),
    rows.length
      ? `INSERT INTO ${table} (kind, slug, count) VALUES\n${rows.join(',\n')}\nON CONFLICT (kind, slug) DO NOTHING;\n`
      : 'SELECT 1;\n'
  )))
}
