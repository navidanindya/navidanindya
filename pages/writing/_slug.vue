<template>
  <article>
    <h1>
      {{ writing.title }}
    </h1>
    <div class="text-base italic">
      {{ writing.description }}
    </div>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <p class="text-sm text-yellow-200">
        {{ minuteRead(writing.text) }} min read /
        {{ formatDate(writing.createdAt) }}
      </p>
    </div>
    <nuxt-content :document="writing" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const writing = await $content('writings', params.slug, { text: true }).fetch()
    return { writing }
  },
  data () {
    return {
      currrentUrl: this.$route.fullPath
    }
  },
  head () {
    return {
      title: this.writing.title + ' - Navid Anindya',
      meta: [
        { hid: 'description', name: 'description', content: this.writing.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.writing.title },
        { hid: 'og:description', property: 'og:description', content: this.writing.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:article:published_time', property: 'og:article:published_time', content: this.toISODate(this.writing.createdAt) },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.writing.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.writing.description }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: `https://navidanindya.info/writing/${this.$route.params.slug}` }
      ]
    }
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    toISODate (date) {
      return new Date(date).toISOString().substring(0, 10)
    },
    minuteRead (words) {
      const wordsPerMinute = 190
      const wordCountRegex = /\w+/g
      const filteredWords = words.replace(wordCountRegex, '')
      const wordCount = filteredWords.split(' ').length
      const time = wordCount / wordsPerMinute
      return (time < 0.5) ? 'less than a' : `${Math.ceil(time)}`
    }
  }
}
</script>
