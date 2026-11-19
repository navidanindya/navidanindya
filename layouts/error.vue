<template>
  <div class="flex px-3 pt-10 sm:pt-16">
    <div class="mx-auto max-w-md text-center">
      <!-- Use the same icon treatment for missing pages and failed requests. -->
      <site-icon :name="isNotFound ? 'missing' : 'error'" class="mx-auto h-12 w-12 text-site-accent dark:text-site-accent-dark" />
      <h1 class="!mb-0 !mt-4 tracking-widest">
        {{ statusCode }}
      </h1>
      <h2 class="!mt-8">
        {{ heading }}
      </h2>
      <p>
        {{ description }}
      </p>
      <nav class="not-prose flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold italic" aria-label="Recover from error">
        <nuxt-link to="/" class="inline-flex items-center gap-1.5 desktop-hover:text-site-accent dark:desktop-hover:text-site-accent-dark">
          <site-icon name="home" class="h-4 w-4" />
          <span v-text="'/home'" />
        </nuxt-link>
        <nuxt-link to="/writings" class="inline-flex items-center gap-1.5 desktop-hover:text-site-accent dark:desktop-hover:text-site-accent-dark">
          <site-icon name="writing" class="h-4 w-4" />
          <span v-text="'/writings'" />
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon },
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
