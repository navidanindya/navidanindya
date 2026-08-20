<template>
  <div>
    <h1>Stuff that I wrote</h1>
    <list-writings :writings="writings" />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const writings = await $content('writings')
      .only(['title', 'description', 'slug', 'createdAt', 'updated', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch()
    return { writings }
  },
  head () {
    const description = 'All the writings of Navid Anindya — notes and essays on engineering, cloud-native systems, music, and philosophy.'
    return {
      title: 'Writings of Navid Anindya',
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: 'Writings of Navid Anindya' },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:url', property: 'og:url', content: 'https://navidanindya.info/writings' },
        { hid: 'og:image', property: 'og:image', content: 'https://navidanindya.info/og.png' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Writings of Navid Anindya' },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://navidanindya.info/og.png' }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https://navidanindya.info/writings' }
      ]
    }
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
