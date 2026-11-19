<template>
  <dialog
    ref="overlay"
    aria-modal="true"
    class="site-overlay not-prose fixed inset-0 m-0 h-full max-h-none w-full max-w-none grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center bg-transparent px-3 py-14 text-inherit backdrop:bg-black/70 open:grid"
    @click.self="close"
    @cancel.prevent="close"
    @close="handleClose"
  >
    <button
      ref="close"
      type="button"
      aria-label="Close full-screen view"
      class="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded text-white"
      @click="close"
    >
      <site-icon name="close" class="h-6 w-6" />
    </button>
    <!-- Animate the content alone so the backdrop and close button stay in place. -->
    <div v-if="visible" class="min-h-0 max-h-full w-full max-w-5xl overflow-auto overscroll-contain motion-safe:animate-viewer-zoom" @click.self="close">
      <slot />
    </div>
  </dialog>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon },
  // Mount the viewer content only while the overlay is open.
  data () {
    return { visible: false }
  },
  // Close the dialog before Nuxt caches this view.
  deactivated () {
    if (this.visible) { this.close() }
  },
  methods: {
    // The dialog keeps keyboard focus inside the viewer and makes the background inert.
    open (trigger) {
      this.trigger = trigger
      this.visible = true
      this.$refs.overlay.showModal()
      this.$refs.close.focus({ preventScroll: true })
    },
    // Use the dialog close event for Escape, backdrop clicks, and explicit dismissal.
    close () {
      this.$refs.overlay.close()
    },
    // Remove the contents after the viewer closes so a Spotify iframe stops playing.
    handleClose () {
      this.visible = false
      this.$emit('close')
      this.trigger.focus({ preventScroll: true })
    }
  }
}
</script>
