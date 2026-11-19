<template>
  <component :is="wrapper" class="relative" :class="kind === 'image' ? 'inline-block max-w-full align-top' : '[&>pre]:!pr-14'">
    <slot />
    <button
      ref="expand"
      type="button"
      :aria-label="label"
      aria-haspopup="dialog"
      class="not-prose absolute right-1 top-1 z-10 grid h-11 w-11 place-items-center rounded bg-gray-900/90 text-white desktop-hover:bg-gray-900"
      @click="expandReadingMedia(preview, label, $refs.expand)"
    >
      <site-icon name="expand" class="h-5 w-5" />
    </button>
  </component>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon },
  inject: ['expandReadingMedia'],
  props: {
    kind: { type: String, required: true },
    preview: { type: Object, required: true }
  },
  computed: {
    // Match the original node's position in the text flow.
    wrapper () {
      return this.kind === 'image' ? 'span' : 'div'
    },
    // Describe the action for the reader and the expanded view.
    label () {
      return this.kind === 'image' ? 'Enlarge image' : 'Expand code'
    }
  }
}
</script>
