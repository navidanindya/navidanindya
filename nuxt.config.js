import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { canonicalUrl, homeDescription } from './utils/socialCards'
import { generateSocialImages } from './scripts/social-images'
import { generateWebpImages, sizeContentImages } from './scripts/site-images'
import { calendarDate, contentRoutes, normalizeContentDates } from './utils/content'
import { bandFeedHistory, fetchBandReleases } from './utils/band'

const staticDir = join(__dirname, 'static')

// The static feeds share one release snapshot per build.
const siteConfig = (bandReleases, themeScript) => ({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Give module-capable browsers a smaller client bundle and retain the legacy fallback.
  modern: 'client',

  // The generate hook writes a rendered 404 in place of Nuxt's empty fallback.
  generate: { fallback: false },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Navid Anindya',
    titleTemplate: '%s | I make and explore things.',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'color-scheme', content: 'light dark' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: homeDescription },
      { hid: 'robots', name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { hid: 'author', name: 'author', content: 'Navid Anindya' },
      { hid: 'theme-color', name: 'theme-color', content: '#111827' },
      // Open Graph
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Navid Anindya' },
      { hid: 'og:title', property: 'og:title', content: 'Navid Anindya | I make and explore things.' },
      { hid: 'og:description', property: 'og:description', content: homeDescription },
      { hid: 'og:locale', property: 'og:locale', content: 'en_US' },
      // Twitter Card
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Navid Anindya | I make and explore things.' },
      { hid: 'twitter:description', name: 'twitter:description', content: homeDescription }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '200x200', href: '/icon.png' },
      // Prefer an adaptive SVG in browsers that support it.
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/pwa-icon.png' },
      // Fetch the critical body and display faces in parallel with the page stylesheet.
      { rel: 'preload', as: 'font', href: '/fonts/roboto-mono-v31-400.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/space-grotesk-v22-600.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      { rel: 'alternate', type: 'application/rss+xml', title: 'Navid Anindya — Writings and Notes', href: '/feed.xml' }
    ],
    // This trusted local script applies the saved theme before the first paint.
    __dangerouslyDisableSanitizersByTagID: { 'theme-preference': ['innerHTML'] },
    script: [
      { hid: 'theme-preference', innerHTML: themeScript },
      {
        hid: 'ld-json-website',
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': 'https://navidanindya.info/#website',
          url: canonicalUrl('/'),
          name: 'Navid Anindya',
          description: homeDescription,
          inLanguage: 'en',
          publisher: { '@id': 'https://navidanindya.info/#person' }
        }
      },
      {
        hid: 'ld-json-person',
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': 'https://navidanindya.info/#person',
          name: 'Navid Anindya',
          alternateName: 'Neel',
          url: canonicalUrl('/'),
          image: 'https://navidanindya.info/navid-anindya.jpg',
          email: 'me@navidanindya.info',
          jobTitle: 'Technical Project Manager & Solutions Architect',
          worksFor: {
            '@type': 'Organization',
            name: 'Konstruct, Inc.',
            url: 'https://www.konstruct.agency/'
          },
          knowsAbout: [
            'Leadership',
            'Project Management',
            'Software Architecture',
            'System Design',
            'Kubernetes',
            'GitOps',
            'FluxCD',
            'CI/CD pipelines',
            'HIPAA-compliant systems',
            'Cloud-native architecture',
            'SaaS',
            'Fractional CTO'
          ],
          sameAs: [
            'https://www.linkedin.com/in/navidanindya',
            'https://github.com/navidanindya',
            'https://gitlab.com/navidanindya',
            'https://www.instagram.com/navidanindyaneel',
            'https://open.spotify.com/user/nealtheguitarist'
          ]
        }
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
    '@nuxtjs/markdownit',
    // https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    workbox: {
      // Let the update toast activate an installed worker when the visitor is ready.
      skipWaiting: false,
      workboxExtensions: ['~/assets/service-worker/update.js']
    },
    icon: {
      source: './static/pwa-icon.png'
    },
    manifest: {
      name: 'Navid Anindya',
      short_name: 'Navid Anindya',
      description: homeDescription,
      lang: 'en',
      start_url: '/',
      display: 'standalone',
      background_color: '#111827',
      theme_color: '#111827'
    },
    meta: {
      charset: false,
      name: 'Navid Anindya',
      description: homeDescription,
      lang: 'en',
      theme_color: '#111827',
      ogImage: false,
      ogUrl: false
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-nord.css'
      }
    }
  },

  // Generate the site feeds and the writings-only feed used by the README.
  feed: [
    { path: '/feed.xml', type: 'rss2' },
    { path: '/feed.atom.xml', type: 'atom1' },
    { path: '/feed.json', type: 'json1' },
    { path: '/writings/feed.xml', type: 'rss2' }
  ].map(({ path, type }) => ({
    path,
    type,
    cacheTime: 1000 * 60 * 15,
    // Keep full article content and sort all entries by their publication date.
    async create (feed) {
      const site = 'https://navidanindya.info'
      const writingsOnly = path === '/writings/feed.xml'
      const author = { name: 'Navid Anindya', email: 'me@navidanindya.info', link: site }
      feed.options = {
        title: 'Navid Anindya',
        description: writingsOnly ? 'Writings from Navid Anindya.' : 'Writings, notes, and music releases from Navid Anindya.',
        id: site,
        link: canonicalUrl(writingsOnly ? '/writings' : '/'),
        language: 'en',
        feedLinks: writingsOnly
          ? { rss: site + path }
          : { rss: site + '/feed.xml', atom: site + '/feed.atom.xml', json: site + '/feed.json' }
      }

      const { $content } = require('@nuxt/content')
      const [writings, notes] = await Promise.all([
        $content('writings').fetch(),
        writingsOnly ? [] : $content('notes').fetch()
      ])
      const entries = [
        ...writings.map(entry => ({ ...entry, url: site + '/writing/' + entry.slug })),
        ...notes.map(entry => ({ ...entry, url: site + '/notes/' + entry.slug })),
        // Release dates and stable song links keep playback changes out of the feeds.
        ...(writingsOnly ? [] : bandReleases).map(song => ({
          title: `${song.title} by ${song.performers}`,
          description: `Listen to ${song.title} by ${song.performers}.`,
          url: `${site}/fun-stuff/7-minutes#${song.anchor}`,
          createdAt: song.releaseDate
        }))
      ].map(entry => ({ ...entry, published: calendarDate(entry.createdAt) }))
      entries.sort((first, second) => second.published - first.published)

      entries.forEach(({ title, url, description, bodyText, published, updated }) => {
        feed.addItem({
          title,
          // Keep feed item IDs stable while linking to their canonical URLs.
          id: url,
          link: canonicalUrl(url),
          description,
          // Feed readers need absolute URLs for images embedded in notes and writings.
          content: bodyText?.replace(/\bsrc="\/(?!\/)/g, 'src="' + site + '/'),
          published,
          date: updated ? calendarDate(updated) : published,
          author: [author]
        })
      })
    }
  })),

  hooks: {
    // Give date-only posts the same dates in every build timezone.
    'content:file:beforeParse' (file) {
      if (file.extension === '.md') { file.data = normalizeContentDates(file.data) }
    },
    // Keep feed HTML and prerendered content in sync with the source entry.
    async 'content:file:beforeInsert' (document) {
      if (document.extension !== '.md') { return }
      // eslint-disable-next-line
      const md = require('markdown-it')({ html: true })
      document.bodyText = md.render(document.text)
      document.body = await sizeContentImages(document.body, staticDir)
    },
    generate: {
      // Generate share cards for the published collections.
      async done (generator, errors) {
        if (errors.length) { return }
        const { $content } = require('@nuxt/content')
        await generateSocialImages(generator, $content)
        // Publish the branded error HTML so missing URLs work before JavaScript.
        const renderContext = {
          renderNotFound: true,
          staticAssetsBase: generator.staticAssetsBase
        }
        const { html, error } = await generator.nuxt.server.renderRoute('/404', renderContext)
        if (error?.statusCode !== 404) { throw new Error('Nuxt did not render the 404 fallback.') }
        // Save the serialized state when Nuxt emits it separately from the HTML.
        for (const asset of renderContext.staticAssets) {
          const path = join(generator.staticAssetsDir, asset.path)
          await mkdir(dirname(path), { recursive: true })
          await writeFile(path, asset.src)
        }
        await writeFile(join(generator.distPath, '404.html'), html)
        await generateWebpImages(generator.distPath)
      }
    },
    'vue-renderer:context' (context) {
      // Nuxt 2 skips error markup in static mode. Render only the fallback as SSR.
      if (context.renderNotFound) { context.target = 'server' }
    }
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true
  },

  sitemap: {
    hostname: 'https://navidanindya.info',
    gzip: true,
    trailingSlash: true,
    exclude: [],
    routes: () => {
      const { $content } = require('@nuxt/content')
      // Content paths use the public URL of each writing, note, and tag.
      return contentRoutes($content)
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Share one minified stylesheet between generated pages.
    extractCSS: true,
    html: {
      minify: {
        // Keep the space in Tailwind dark descendant selectors when minifying inline CSS.
        minifyCSS: { level: { 1: { tidySelectors: false } } }
      }
    }
  }
})

// Keep the existing feed history available to builds without Spotify credentials.
export default async () => siteConfig(
  process.env.CF_PAGES === '1' && process.env.scid && process.env.scs
    ? await fetchBandReleases(process.env)
    : bandFeedHistory,
  await readFile(join(staticDir, 'theme.js'), 'utf8')
)
