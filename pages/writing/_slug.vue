<template>
  <article>
    <h1>
      {{ writing.title }}
    </h1>
    <div class="text-base italic xs:text-justify">
      {{ writing.description }}
    </div>
    <section class="flex xs:flex-row flex-col justify-between items-start md:items-center xs:text-justify">
      <p class="text-sm text-yellow-200 flex">
        {{ minuteRead(writing.text) }} min read /
        {{ formatDate(writing.createdAt) }}
      </p>
      <p class="text-sm text-yellow-100 flex">
        {{ viewCount || '---' }} view(s)
      </p>
    </section>
    <nuxt-content class="xs:text-justify" :document="writing" />
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
      writingSlug: this.$route.params.slug,
      currrentUrl: this.$route.fullPath,
      viewCount: 0
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
        { hid: 'canonical', rel: 'canonical', href: `https://navidanindya.info/writing/${this.writingSlug}` }
      ]
    }
  },
  created () {
    this.incrementCounter()
  },
  mounted () {
    this.viewCounter()
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
    },
    viewCounter () {
      const dbCol = this.$fire.firestore.collection('views').doc(this.writingSlug)
      try {
        dbCol.onSnapshot((doc) => {
          this.viewCount = doc.data().count
        })
      } catch (e) {
        this.viewCount = 0
      }
    },
    async incrementCounter () {
      const dbCol = this.$fire.firestore.collection('views').doc(this.writingSlug)
      try {
        const snapshot = await dbCol.get()
        const doc = snapshot.data()
        if (!doc) {
          dbCol.set({ count: 1 })
        }
        dbCol.update({ count: this.$fireModule.firestore.FieldValue.increment(1) })
      } catch (e) {
        this.viewCount = 0
      }
    }
  }
}
</script>
