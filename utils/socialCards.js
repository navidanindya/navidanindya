export const siteOrigin = 'https://navidanindya.info'

// Match the directory URLs that Cloudflare Pages serves without a redirect.
export const canonicalUrl = (path) => {
  const url = new URL(path, siteOrigin)
  url.pathname = url.pathname.replace(/\/+$/, '') + '/'
  return url.href
}

// Keep static page metadata and share card copy in one place.
export const staticCards = {
  '/': { title: 'Navid Anindya', shareTitle: 'Navid Anindya | I make and explore things.', cardTitle: 'I make and explore things.', description: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.', label: 'HOME' },
  '/about': { title: 'About Me', description: 'About Navid Anindya (Neel) — Technical Project Manager & Solutions Architect at Konstruct, Inc., formerly CTO & CEO of Sayburgh Solutions. Also a Fractional CTO.', label: 'ABOUT' },
  '/writings': { title: 'Writings of Navid Anindya', cardTitle: 'Writings', description: 'All the writings of Navid Anindya — notes and essays on engineering, cloud-native systems, music, and philosophy.', label: 'WRITINGS' },
  '/notes': { title: 'Notes & Finds', description: 'Short notes, useful tips, and interesting links for developers, musicians, and designers.', label: 'NOTES & FINDS' },
  '/tags': { title: 'Browse tags', description: 'Browse Navid Anindya’s writings and notes by topic.', label: 'TAGS' },
  '/fun-stuff': { title: 'Fun Stuff', description: 'Small experiments, music, and things made for the fun of it.', label: 'FUN STUFF' },
  '/fun-stuff/7-minutes': { title: '7 Minutes', description: 'A band I make music with. Listen to Ocean Song, Shobai Chole Geche, and Kalo Megh.', label: 'FUN STUFF / MUSIC', art: 'audio' },
  '/fun-stuff/music-on-repeat': { title: 'Music on Repeat — My Top Spotify Tracks', cardTitle: 'Music on Repeat', description: 'My top tracks on Spotify and the latest track in my listening history.', label: 'FUN STUFF / MUSIC', art: 'audio' },
  '/fun-stuff/lexical-analyzer': { title: 'Lexical Analyzer', description: 'A Java lexical analyzer I wrote for a compiler course at university, with an example of how it splits source text into tokens.', label: 'FUN STUFF / CODE', art: 'code' }
}

// Resolve a static page with the same canonical path used at build time.
export const staticSocialCard = path => ({ ...staticCards[path], path })

// Use the public archive path for a tag card.
export const tagSocialCard = tag => ({
  path: '/tags/' + encodeURIComponent(tag),
  title: '#' + tag,
  description: 'Writings and notes tagged ' + tag + '.',
  label: 'TAGS',
  art: 'tag'
})

// Build a writing or note card directly from its front matter.
export const postSocialCard = (section, entry) => {
  const tag = (entry.tags || '').split(',')[0].trim()
  return {
    path: `/${section}/${entry.slug}`,
    title: entry.title,
    description: entry.description,
    label: `${section === 'writing' ? 'WRITINGS' : 'NOTES & FINDS'}${tag ? ' / ' + tag.replace(/-/g, ' ').toUpperCase() : ''}`,
    date: new Date(entry.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase(),
    art: tag === 'spotify-api' ? 'audio' : tag === 'debugging' ? 'network' : 'orbit',
    article: true
  }
}

export const socialSize = [1200, 630]
export const articleSizes = [[1200, 675], [1200, 900], [1200, 1200]]

// Invalidate cached cards when the visible copy or SVG template changes.
export const socialImagePath = (card, width, height) => {
  const input = JSON.stringify([card.cardTitle || card.title, card.description, card.label, card.date, card.art])
  const hash = Array.from(input).reduce((state, char) => Math.imul(state ^ char.codePointAt(0), 16777619), 2166136261)
  const route = card.path === '/' ? '/home' : card.path
  return `/og${route}/v1-${(hash >>> 0).toString(36)}-${width}x${height}.png`
}

// Expose the same generated URLs to Open Graph, Twitter, and article schema.
export const socialImageMeta = (card) => {
  const url = siteOrigin + socialImagePath(card, ...socialSize)
  return [
    { hid: 'og:image', property: 'og:image', content: url },
    { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
    { hid: 'og:image:alt', property: 'og:image:alt', content: `Share card for ${card.cardTitle || card.title}` },
    { hid: 'twitter:image', name: 'twitter:image', content: url },
    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: `Share card for ${card.cardTitle || card.title}` }
  ]
}
