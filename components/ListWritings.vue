<template>
  <ul class="text-base text-justify">
    <li v-for="writing of writings" :key="writing.slug">
      <NuxtLink :to="{ name: 'writing-slug', params: { slug: writing.slug } }">
        {{ writing.title }}
      </NuxtLink>
      <p class="text-sm text-gray-200 italic">
        {{ writing.description }}
      </p>
      <p class="text-sm text-yellow-200">
        Written on {{ formatDate(writing.createdAt) }}
        <span v-if="writing.updated !== undefined" class="text-xs italic text-yellow-100 mt-0">
          (Updated on: {{ formatDate(writing.updated) }})
        </span>
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
