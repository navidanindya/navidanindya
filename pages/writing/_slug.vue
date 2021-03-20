<template>
  <article>
    <h1>
      {{ writing.title }}
    </h1>
    <p class="lead">
      {{ writing.description }}
    </p>
    <p class="text-sm">
      First wrote: <strong>{{ formatDate(writing.createdAt) }}</strong> |
      Last updated: <strong>{{ formatDate(writing.updatedAt) }}</strong>
    </p>
    <nuxt-content :document="writing" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const writing = await $content('writings', params.slug).fetch()
    return { writing }
  },
  head () {
    return {
      title: this.writing.title,
      meta: [
        { hid: 'description', name: 'description', content: this.writing.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.writing.title },
        { hid: 'og:description', property: 'og:description', content: this.writing.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.writing.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.writing.description }
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
