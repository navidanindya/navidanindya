<template>
  <div>
    <h1>Hello, world!</h1>
    <p>Stuff that I wrote:</p>
    <ul>
      <li v-for="writing of writings" :key="writing.slug">
        <NuxtLink :to="{ name: 'writing-slug', params: { slug: writing.slug } }">
          {{ writing.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
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
  async asyncData ({ $content, params }) {
    const writings = await $content('writings')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { writings }
  }
}
</script>
