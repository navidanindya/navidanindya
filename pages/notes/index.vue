<template>
  <section>
    <h1>Notes &amp; Finds</h1>
    <p>Short notes, useful tips, and interesting finds for code, music, and design.</p>
    <p>
      <browse-tags-link />
    </p>
    <post-list v-if="notes.length" :entries="notes" prefix="/notes" heading-tag="h2" />
    <p v-else>
      Nothing here yet. Check back from time to time for new notes and finds.
    </p>
  </section>
</template>

<script>
import { pageHead, readEntries } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'

export default {
  // Load the separate notes collection for static rendering.
  async asyncData ({ $content }) {
    return { notes: await readEntries($content, 'notes') }
  },
  // Describe the short-post collection in search and share previews.
  head () {
    return pageHead(staticSocialCard('/notes'))
  }
}
</script>
