<template>
  <ul class="text-base text-justify">
    <li v-for="writing of writings" :key="writing.slug">
      <NuxtLink :to="{ name: 'writing-slug', params: { slug: writing.slug } }">
        {{ writing.title }}
      </NuxtLink>
      <p class="text-sm text-gray-200 italic">
        {{ writing.description }}
      </p>
      <p class="text-sm text-yellow-200 italic">
        Written on {{ formatDate(writing.createdAt) }}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    writings: {
      type: [Array, Object],
      required: true
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
