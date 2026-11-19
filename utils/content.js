import { canonicalUrl, socialImageMeta } from './socialCards'

// Parse the site's comma-separated tags for links, archives, and generation.
export const contentTags = value => [...new Set((value || '').split(',').map(tag => tag.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean))]

// Query the two collections with the metadata their indexes display.
export const readEntries = async ($content, collection) => {
  const entries = await $content(collection)
    .only(['title', 'description', 'sourceUrl', 'slug', 'createdAt', 'updated', 'tags'])
    .fetch()
  return entries.sort((first, second) =>
    calendarDate(second.createdAt) - calendarDate(first.createdAt) || first.slug.localeCompare(second.slug)
  )
}

// Match the index order and keep the older entry on the left.
export const readEntryNeighbors = async ($content, collection, slug) => {
  const entries = await readEntries($content, collection)
  const index = entries.findIndex(entry => entry.slug === slug)
  return { previous: entries[index + 1], next: entries[index - 1] }
}

// Count rendered words so Markdown links and images add no markup to the estimate.
const entryText = node => node.type === 'text' ? node.value : node.children.map(entryText).join(' ')

// Estimate reading time at 150 words per minute, with a one-minute minimum.
export const readingMinutes = (body) => {
  const words = entryText(body).match(/[\p{L}\p{N}][\p{L}\p{M}\p{N}’'-]*/gu)
  return Math.max(1, Math.ceil((words ? words.length : 0) / 150))
}

// Read the collections shared by tag archives and the sitemap.
export const readContentCollections = $content => Promise.all([
  readEntries($content, 'writings'),
  readEntries($content, 'notes')
])

// Generate canonical paths from the same content used by the indexes.
export const contentRoutes = async ($content) => {
  const [writings, notes] = await readContentCollections($content)
  const tags = [...new Set([...writings, ...notes].flatMap(entry => contentTags(entry.tags)))]
  return [
    ...writings.map(entry => `/writing/${entry.slug}`),
    ...notes.map(entry => `/notes/${entry.slug}`),
    ...tags.map(tag => `/tags/${encodeURIComponent(tag)}`)
  ]
}

// Interpret date-only front matter without shifting the publication day by timezone.
export const calendarDate = value => new Date(value instanceof Date || /^\d{4}-/.test(value) ? value : `${value} UTC`)

// Normalize authored dates before Nuxt Content supplies filesystem timestamps.
export const normalizeContentDates = source => source.replace(
  /^---\r?\n[\s\S]*?^---(?=\r?$)/m,
  (frontMatter) => {
    const normalized = frontMatter.replace(
      /^(createdAt|updatedAt|updated): ([A-Za-z]+ \d{1,2}, \d{4})(?=\r?$)/gm,
      (_, key, date) => `${key}: "${calendarDate(date).toISOString().slice(0, 10)}"`
    )
    // Expose an explicit updatedAt to the UI's existing editorial date field.
    if (/^updated:/m.test(normalized)) { return normalized }
    return normalized.replace(/^updatedAt: ([^\r\n]+)(\r?)$/m, 'updatedAt: $1$2\nupdated: $1$2')
  }
)

// Format publication dates consistently on cards and detail pages.
export const publishedDate = value => calendarDate(value).toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
})

// Give each new page a descriptive canonical and sharing metadata.
export const pageHead = card => ({
  title: card.title,
  meta: [
    { hid: 'description', name: 'description', content: card.description },
    { hid: 'og:title', property: 'og:title', content: card.shareTitle || card.title },
    { hid: 'og:description', property: 'og:description', content: card.description },
    { hid: 'og:url', property: 'og:url', content: canonicalUrl(card.path) },
    { hid: 'twitter:title', name: 'twitter:title', content: card.shareTitle || card.title },
    { hid: 'twitter:description', name: 'twitter:description', content: card.description },
    ...socialImageMeta(card)
  ],
  link: [{ hid: 'canonical', rel: 'canonical', href: canonicalUrl(card.path) }]
})
