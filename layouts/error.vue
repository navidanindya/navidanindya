<template>
  <div class="flex">
    <div class="m-auto text-center max-w-md">
      <h1 class="tracking-widest">
        {{ statusCode }}
      </h1>
      <h2>
        {{ heading }}
      </h2>
      <p v-if="!isNotFound && error.message" class="text-sm italic">
        {{ error.message }}
      </p>
      <p>
        {{ description }}
      </p>
      <nav class="flex flex-col gap-1">
        <nuxt-link to="/">Go back home</nuxt-link>
        <nuxt-link to="/writings">
          Read some writings I wrote
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({ statusCode: 500 })
    }
  },
  head () {
    return {
      title: `${this.statusCode} | Navid Anindya`,
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  },
  computed: {
    statusCode () {
      return this.isServerError ? 500 : this.error.statusCode
    },
    isServerError () {
      return this.error.statusCode >= 500
    },
    isNotFound () {
      return this.error.statusCode === 404
    },
    heading () {
      if (this.isNotFound) { return "That's a dead-end." }
      if (this.isServerError) { return 'Something bad happened.' }
      return 'That request didn\'t work out.'
    },
    description () {
      if (this.isNotFound) { return 'While you find your way, maybe read some writings I wrote?' }
      if (this.isServerError) { return 'This one\'s on me — try again in a bit.' }
      return 'This issue is on me — let me know if it keeps happening.'
    }
  }
}
</script>
