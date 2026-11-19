<template>
  <span class="relative col-start-2 row-start-1 inline-flex w-9 justify-end">
    <button
      type="button"
      class="inline-flex h-9 w-9 items-start justify-end rounded pt-0.5 text-site-accent dark:text-site-accent-dark"
      :aria-label="'Copy link to ' + title"
      @click="copyLink"
    >
      <site-icon name="copy" />
    </button>
    <!-- Keep the live region above the button without adding a row to the title. -->
    <span role="status" class="pointer-events-none absolute bottom-full right-0 z-10 mb-1 whitespace-nowrap">
      <span v-if="status" class="block rounded border border-site-rule bg-site-paper px-2 py-1 text-xs leading-4 text-site-ink shadow-sm dark:border-site-rule-dark dark:bg-gray-800 dark:text-gray-200" v-text="status" />
    </span>
  </span>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'
import { canonicalUrl } from '~/utils/socialCards'

export default {
  components: { SiteIcon },
  props: {
    path: { type: String, required: true },
    title: { type: String, required: true }
  },
  // Start with an empty live region for copy feedback.
  data () {
    return { status: '' }
  },
  // Clear the feedback timer when the control is removed.
  beforeDestroy () {
    clearTimeout(this.feedbackTimer)
  },
  methods: {
    // Copy the same canonical entry URL from its list or detail page.
    async copyLink () {
      clearTimeout(this.feedbackTimer)
      try {
        await navigator.clipboard.writeText(canonicalUrl(this.path))
        this.status = 'Link copied'
      } catch (error) {
        this.status = 'Could not copy link'
        // eslint-disable-next-line no-console
        console.warn('Clipboard write failed', { message: error.message })
      }
      this.feedbackTimer = setTimeout(() => { this.status = '' }, 2500)
    }
  }
}
</script>
