<template>
  <div class="flex min-w-0 items-center justify-end max-[500px]:contents" @keydown.esc="closeFromKeyboard" @focusout="scheduleClose" @focusin="cancelClose">
    <button
      ref="toggle"
      type="button"
      class="col-start-2 row-start-1 inline-flex min-h-10 items-center gap-2 justify-self-end rounded px-2 text-xs font-semibold text-site-accent motion-safe:transition-transform motion-safe:duration-200 motion-safe:active:scale-95 min-[500px]:hidden dark:text-site-accent-dark"
      :aria-expanded="expanded"
      aria-controls="primary-navigation"
      @click="expanded = !expanded"
    >
      <span>Menu</span>
      <site-icon name="down" class="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200" :class="{ 'rotate-180': expanded }" />
    </button>
    <!-- Overlay the phone links without moving the Spotify line or page. -->
    <nav
      id="primary-navigation"
      aria-label="Main navigation"
      class="absolute inset-x-0 top-full z-20 mt-1 items-center justify-between gap-x-1 rounded border border-site-rule bg-site-paper px-2 py-1 text-[clamp(.65rem,3.5vw,.75rem)] font-semibold italic shadow-lg min-[500px]:static min-[500px]:mt-0 min-[500px]:flex min-[500px]:gap-x-[clamp(.4rem,1.5vw,1rem)] min-[500px]:border-0 min-[500px]:bg-transparent min-[500px]:p-0 min-[500px]:text-[.85rem] min-[500px]:shadow-none dark:border-site-accent-dark dark:bg-gray-900 dark:min-[500px]:bg-transparent"
      :class="expanded ? 'flex motion-safe:max-[500px]:animate-menu-drop' : 'hidden'"
    >
      <nuxt-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="inline-flex min-h-11 items-center whitespace-nowrap rounded px-0.5 min-[500px]:min-h-0 desktop-hover:text-site-accent aria-[current=page]:text-site-accent min-[500px]:p-0 dark:desktop-hover:text-site-accent-dark dark:aria-[current=page]:text-site-accent-dark"
        @click.native="expanded = false"
        v-text="link.label"
      />
    </nav>
  </div>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

const links = [
  { to: '/', label: '/home' },
  { to: '/about', label: '/about' },
  { to: '/writings', label: '/writings' },
  { to: '/notes', label: '/notes' },
  { to: '/fun-stuff', label: '/fun-stuff' }
]

export default {
  components: { SiteIcon },
  // Use the same links in the phone menu and the desktop row.
  data () {
    return { expanded: false, links }
  },
  // Clear pending focus work when the navigation is removed.
  beforeDestroy () {
    this.cancelClose()
  },
  methods: {
    // Give the Menu button focus when Escape closes the phone links.
    closeFromKeyboard () {
      if (!this.expanded) { return }
      this.expanded = false
      this.$refs.toggle.focus()
    },
    // Focus entering another menu control cancels the deferred dismissal.
    scheduleClose () {
      this.cancelClose()
      this.blurTimer = setTimeout(() => { this.expanded = false }, 0)
    },
    // Keep the menu open while focus moves between its own controls.
    cancelClose () {
      clearTimeout(this.blurTimer)
    }
  }
}
</script>
