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
      .only(['title', 'description', 'slug', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()
    return { writings }
  },
  head () {
    return {
      title: 'Writings of Navid Anindya',
      meta: [
        { hid: 'description', name: 'description', content: 'Writings of Navid Anindya' },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'Writings of Navid Anindya' },
        { hid: 'og:description', property: 'og:description', content: 'Writings of Navid Anindya' },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: 'Writings of Navid Anindya' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Writings of Navid Anindya' }
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
