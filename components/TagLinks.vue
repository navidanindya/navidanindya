<template>
  <ul v-if="tags.length" class="!mb-0 !mt-2 flex !list-none flex-wrap gap-x-3 gap-y-1 !p-0 text-sm" aria-label="Tags">
    <li v-for="tag in tags" :key="tag" class="!m-0 !p-0">
      <nuxt-link :to="'/tags/' + encodeURIComponent(tag)" class="underline" v-text="'#' + tag" />
    </li>
  </ul>
</template>

<script>
import { contentTags } from '~/utils/content'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop -- Some posts have no tags.
    value: { type: String, required: false }
  },
  computed: {
    // Share the same tag normalization with the archive routes.
    tags () {
      return contentTags(this.value)
    }
  }
}
</script>
