<template>
  <nuxt-link to="/tags/" class="inline-flex items-center gap-2">
    <site-icon name="tag" class="h-4 w-4 shrink-0" />
    <span>Browse tags</span>
  </nuxt-link>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon }
}
</script>
