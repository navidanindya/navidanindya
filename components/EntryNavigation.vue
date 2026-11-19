<template>
  <nav v-if="neighbors.previous || neighbors.next" aria-label="Previous and next entries" class="mt-10 grid grid-cols-2 gap-4">
    <nuxt-link v-if="neighbors.previous" class="col-start-1 min-w-0 text-left text-base" :to="prefix + '/' + neighbors.previous.slug" rel="prev">
      <site-icon name="back" class="mr-1 inline h-4 w-4" />
      <span v-text="neighbors.previous.title.trim()" />
    </nuxt-link>
    <nuxt-link v-if="neighbors.next" class="col-start-2 min-w-0 text-right text-base" :to="prefix + '/' + neighbors.next.slug" rel="next">
      <span v-text="neighbors.next.title.trim()" />
      <site-icon name="forward" class="ml-1 inline h-4 w-4" />
    </nuxt-link>
  </nav>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon },
  props: {
    neighbors: { type: Object, required: true },
    prefix: { type: String, required: true }
  }
}
</script>
