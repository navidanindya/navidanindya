<template>
  <article>
    <h2 class="!my-0 text-[1.33rem]">
      {{ title }}
    </h2>
    <p class="!mb-0 !mt-1.5">
      {{ description }}
    </p>
    <!-- The caller owns everything in the area below the description. -->
    <div v-if="$slots.default" class="my-3 text-sm">
      <slot />
    </div>
    <component :is="linkTag" v-bind="linkAttributes" class="inline-flex items-center gap-1.5 text-sm">
      <span v-text="linkLabel.trim()" />
      <site-icon v-if="!isExternal" name="forward" class="h-3 w-3" />
    </component>
  </article>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon },
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    to: { type: String, required: true },
    linkLabel: { type: String, required: true }
  },
  computed: {
    // Choose the link type from the destination while sharing the card markup.
    isExternal () {
      return /^https?:\/\//.test(this.to)
    },
    // Keep internal project links within Nuxt's router.
    linkTag () {
      return this.isExternal ? 'a' : 'nuxt-link'
    },
    // Open external project pages in a new tab.
    linkAttributes () {
      return this.isExternal
        ? { href: this.to, target: '_blank', rel: 'noopener noreferrer' }
        : { to: this.to }
    }
  }
}
</script>
