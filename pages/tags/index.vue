<template>
  <section>
    <h1>Browse tags</h1>
    <p>Find writings and notes by topic.</p>
    <ul class="site-divided-list">
      <li v-for="entry in tags" :key="entry.tag" class="!my-0 flex items-baseline justify-between gap-3 !px-0 py-2">
        <nuxt-link :to="canonicalPagePath('/tags/' + encodeURIComponent(entry.tag))" class="min-w-0 text-base underline" v-text="'#' + entry.tag" />
        <span class="shrink-0 text-xs text-gray-700 dark:text-gray-300">
          {{ entry.count }} {{ entry.count === 1 ? 'entry' : 'entries' }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import { contentTags, pageHead, readContentCollections } from '~/utils/content'
import { canonicalPagePath, staticSocialCard } from '~/utils/socialCards'

export default {
  // Count both collections so each topic has a meaningful list row.
  async asyncData ({ $content }) {
    const [writings, notes] = await readContentCollections($content)
    const counts = new Map()
    for (const entry of [...writings, ...notes]) {
      for (const tag of contentTags(entry.tags)) {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }
    // Put the busiest topics first and keep ties alphabetical.
    const tags = [...counts].map(([tag, count]) => ({ tag, count }))
      .sort((first, second) => second.count - first.count || first.tag.localeCompare(second.tag))
    return { tags }
  },
  // Identify the shared tag directory.
  head () {
    return pageHead(staticSocialCard('/tags'))
  },
  methods: { canonicalPagePath }
}
</script>
