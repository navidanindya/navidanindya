<template>
  <article>
    <div class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3">
      <component :is="headingTag" class="!my-0 text-[1.33rem]">
        <nuxt-link :to="to" v-text="title.trim()" />
      </component>
      <slot name="action" />
    </div>
    <entry-description v-if="description" :description="description" :source-url="sourceUrl" class="!mb-0 !mt-1.5" />
    <slot />
    <tag-links :value="tags" />
    <p v-if="createdAt" class="!mb-0 !mt-1 text-xs italic text-gray-700 dark:text-gray-300">
      Published on {{ publishedDate(createdAt) }}
      <span v-if="updated"> · Updated on {{ publishedDate(updated) }}</span>
    </p>
  </article>
</template>

<script>
import { publishedDate } from '~/utils/content'

export default {
  // Optional card metadata is supplied only by the collections that have it.
  /* eslint-disable vue/require-default-prop */
  props: {
    to: { type: String, required: true },
    title: { type: String, required: true },
    headingTag: { type: String, required: true },
    description: { type: String, required: false },
    sourceUrl: { type: String, required: false },
    tags: { type: String, required: false },
    createdAt: { type: [String, Date], required: false },
    updated: { type: [String, Date], required: false }
  },
  /* eslint-enable vue/require-default-prop */
  methods: { publishedDate }
}
</script>
