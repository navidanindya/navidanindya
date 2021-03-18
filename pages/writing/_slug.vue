<template>
  <article>
    <h1>
      {{ writing.title }}
    </h1>
    <p class="lead">
      {{ writing.description }}
    </p>
    <p class="text-sm">
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
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
