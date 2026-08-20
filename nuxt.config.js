export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Navid Anindya',
    titleTemplate: '%s | I make and explore things.',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.' },
      { hid: 'robots', name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { hid: 'author', name: 'author', content: 'Navid Anindya' },
      { hid: 'theme-color', name: 'theme-color', content: '#111827' },
      // Open Graph
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Navid Anindya' },
      { hid: 'og:title', property: 'og:title', content: 'Navid Anindya | I make and explore things.' },
      { hid: 'og:description', property: 'og:description', content: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.' },
      { hid: 'og:url', property: 'og:url', content: 'https://navidanindya.info' },
      { hid: 'og:image', property: 'og:image', content: 'https://navidanindya.info/og.png' },
      { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
      { hid: 'og:image:height', property: 'og:image:height', content: '630' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'Navid Anindya — I make and explore things' },
      { hid: 'og:locale', property: 'og:locale', content: 'en_US' },
      // Twitter Card
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Navid Anindya | I make and explore things.' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://navidanindya.info/og.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/icon.png' },
      { hid: 'canonical', rel: 'canonical', href: 'https://navidanindya.info' }
    ],
    script: [
      {
        hid: 'ld-json-website',
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': 'https://navidanindya.info/#website',
          url: 'https://navidanindya.info',
          name: 'Navid Anindya',
          description: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.',
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
          url: 'https://navidanindya.info',
          image: 'https://navidanindya.info/icon.png',
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

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.js',
    '~/plugins/spotify.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
    '@nuxtjs/markdownit',
    // https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/icon.png'
    },
    manifest: {
      name: 'Navid Anindya',
      short_name: 'Navid Anindya',
      description: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.',
      lang: 'en',
      start_url: '/',
      display: 'standalone',
      background_color: '#111827',
      theme_color: '#111827'
    },
    meta: {
      name: 'Navid Anindya',
      description: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.',
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

  env: {
    spotifyURI: process.env.SPOTIFY_URI,
    fbApiKey: process.env.FIREBASE_API_KEY,
    fbAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    fbProjectId: process.env.FIREBASE_PROJECT_ID,
    fbStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    fbmMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    fbAppId: process.env.FIREBASE_APP_ID,
    fbMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
  },

  feed: [
    {
      path: '/feed.xml',
      async create (feed) {
        feed.options = {
          title: 'Navid Anindya',
          description: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.',
          link: 'https://navidanindya.info/feed.xml'
        }
        const { $content } = require('@nuxt/content')
        const writings = await $content('writings').fetch()

        writings.forEach((writing) => {
          const url = `https://navidanindya.info/writing/${writing.slug}`
          feed.addItem({
            title: writing.title,
            id: url,
            link: url,
            description: writing.description,
            content: writing.bodyText,
            date: new Date(writing.createdAt),
            author: [
              {
                name: 'Navid Anindya',
                email: 'me@navidanindya.info',
                link: 'https://navidanindya.info'
              }
            ]
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    },
    {
      path: '/feed.atom.xml',
      async create (feed) {
        feed.options = {
          title: 'Navid Anindya',
          description: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.',
          link: 'https://navidanindya.info/feed.atom.xml'
        }
        const { $content } = require('@nuxt/content')
        const writings = await $content('writings').fetch()

        writings.forEach((writing) => {
          const url = `https://navidanindya.info/writing/${writing.slug}`
          feed.addItem({
            title: writing.title,
            id: url,
            link: url,
            description: writing.description,
            content: writing.bodyText,
            date: new Date(writing.createdAt),
            author: [
              {
                name: 'Navid Anindya',
                email: 'me@navidanindya.info',
                link: 'https://navidanindya.info'
              }
            ]
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'atom1'
    },
    {
      path: '/feed.json',
      async create (feed) {
        feed.options = {
          title: 'Navid Anindya',
          description: 'Navid Anindya — Technical Project Manager & Solutions Architect at Konstruct, Inc. Also a Fractional CTO. I make and explore things: cloud-native systems, music and philosophy.',
          link: 'https://navidanindya.info/feed.json'
        }
        const { $content } = require('@nuxt/content')
        const writings = await $content('writings').fetch()

        writings.forEach((writing) => {
          const url = `https://navidanindya.info/writing/${writing.slug}`
          feed.addItem({
            title: writing.title,
            id: url,
            link: url,
            description: writing.description,
            content: writing.bodyText,
            date: new Date(writing.createdAt),
            author: [
              {
                name: 'Navid Anindya',
                email: 'me@navidanindya.info',
                link: 'https://navidanindya.info'
              }
            ]
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'json1'
    }
  ],

  hooks: {
    'content:file:beforeInsert': (document) => {
      // eslint-disable-next-line
      const md = require('markdown-it')()
      if (document.extension === '.md') {
        const mdToHtml = md.render(document.text)
        document.bodyText = mdToHtml
      }
    },
    generate: {
      async done () {
        const { db } = require('./plugins/firebase')
        const { terminate } = require('firebase/firestore')
        await terminate(db)
      }
    }
  },

  // Google Web fonts
  googleFonts: {
    display: 'swap',
    families: {
      'Space+Grotesk': [600],
      'Roboto+Mono': {
        wght: [400],
        ital: [600]
      }
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
    exclude: [],
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path', 'updatedAt']).fetch()

      return files.map((file) => {
        const route = { route: file.path === '/index' ? '/' : file.path }
        if (file.updatedAt instanceof Date) {
          route.lastmod = file.updatedAt.toISOString()
        }
        return route
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
