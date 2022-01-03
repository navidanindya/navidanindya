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
    <h6 v-if="writing.updated !== undefined" class="text-sm italic text-yellow-50">
      Updated on: {{ formatDate(writing.updated) }}
    </h6>
    <nuxt-content class="xs:text-justify" :document="writing" />
  </article>
</template>

<script>
import { doc, increment, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'

export default {
  async asyncData ({ $content, params, error }) {
    try {
      const writing = await $content('writings', params.slug, { text: true }).fetch()
      return { writing }
    } catch (err) {
      error({
        statusCode: 404
      })
    }
  },
  data () {
    return {
      writingSlug: this.$route.params.slug,
      viewCount: 0,
      unsub: undefined
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
  mounted () {
    try {
      this.getViews()
    } catch (e) {
      this.viewCount = 0
    }
  },
  beforeDestroyed () {
    this.unsub()
  },
  methods: {
    async getViews () {
      const ref = doc(db, 'views', this.writingSlug)
      await setDoc(ref, { count: increment(1) }, { merge: true })
      this.unsub = onSnapshot(ref, (doc) => {
        this.viewCount = doc.data().count
      })
    },
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    toISODate (date) {
      return new Date(date).toISOString().substring(0, 10)
    },
    minuteRead (words) {
      const wordsPerMinute = 150
      const wordCountRegex = /\w+/g
      const filteredWords = words.replace(wordCountRegex, '')
      const wordCount = filteredWords.split(' ').length
      const time = wordCount / wordsPerMinute
      return (time < 0.9) ? 'less than a' : `${Math.ceil(time)}`
    }
  }
}
</script>
