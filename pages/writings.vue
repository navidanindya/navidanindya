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
  async asyncData ({ $content, params }) {
    const writings = await $content('writings')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { writings }
  }
}
</script>
