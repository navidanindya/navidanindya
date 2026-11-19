<template>
  <button
    type="button"
    class="rounded py-2 pl-2 min-[500px]:pl-4 text-site-accent dark:text-site-accent-dark motion-safe:transition-transform motion-safe:duration-200 motion-safe:active:scale-95"
    :aria-label="themeLabel"
    :title="themeLabel"
    @click="cycleTheme"
  >
    <!-- Keep each icon in place so the outgoing and incoming shapes can crossfade. -->
    <span class="relative block h-5 w-5">
      <site-icon
        v-for="icon in themes"
        :key="icon"
        :name="icon"
        class="absolute inset-0 motion-safe:transition-[opacity,transform] motion-safe:duration-200"
        :class="icon === theme ? 'opacity-100 motion-safe:rotate-0' : 'opacity-0 motion-safe:-rotate-12'"
      />
    </span>
  </button>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

const themes = ['system', 'light', 'dark']

export default {
  components: { SiteIcon },
  // Start with the browser's color preference.
  data () {
    return { theme: 'system', themes }
  },
  computed: {
    // Follow the same three-choice order from any saved preference.
    nextTheme () {
      return themes[(themes.indexOf(this.theme) + 1) % themes.length]
    },
    // Expose both the current theme and what the button will select.
    themeLabel () {
      return `Theme: ${this.theme}. Switch to ${this.nextTheme}.`
    }
  },
  // Sync the control with the preference applied before paint.
  mounted () {
    this.theme = window.siteTheme.current()
  },
  methods: {
    // Change the palette immediately and save the choice for the next visit.
    cycleTheme () {
      const choice = this.nextTheme
      this.theme = choice
      window.siteTheme.apply(choice)
    }
  }
}
</script>
