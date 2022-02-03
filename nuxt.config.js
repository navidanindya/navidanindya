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
      { hid: 'description', name: 'description', content: 'Personal site for Navid Anindya. I make and explore things. I also write about things sometimes.' },
      { hid: 'og:image', property: 'og:image', content: '/og.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'canonical', rel: 'canonical', href: 'https://navidanindya.info' }
    ],
    script: [
      {
        src: process.env.umamiScriptPath || '',
        'data-website-id': process.env.umamiWebsiteId || '',
        async: true,
        defer: true
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
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
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
      background_color: '#111827',
      description: 'Personal site for Navid Anindya. I make and explore things. I also write about things sometimes.',
      lang: 'en'
    },
    meta: {
      description: 'Personal site for Navid Anindya. I make and explore things. I also write about things sometimes.'
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
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRefreshToken: process.env.SPOTIFY_RT,
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
          description: 'Personal site for Navid Anindya. I make and explore things. I also write about things sometimes.',
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
            description: writing.blurb,
            content: writing.bodyText,
            date: new Date(writing.createdAt),
            author: [
              {
                name: 'Navid Anindya',
                email: 'navidanindya@gmail.com',
                link: 'https://navidanindya.info'
              }
            ]
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
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
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.map(file => (file.path === '/index' ? '/' : file.path))
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
