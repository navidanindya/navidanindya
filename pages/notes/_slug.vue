<template>
  <article>
    <site-breadcrumbs :current-label="note.title" />
    <div class="entry-title-row">
      <h1 class="!mb-0">
        {{ note.title }}
      </h1>
      <copy-link-button :path="'/notes/' + note.slug" :title="note.title" />
    </div>
    <section class="flex flex-wrap justify-between gap-x-4 text-xs">
      <p class="italic text-gray-700 dark:text-gray-300">
        {{ readingMinutes(note.body) }} min read · Published on {{ publishedDate(note.createdAt) }}
      </p>
      <entry-view-count :key="note.slug" kind="note" :slug="note.slug" />
    </section>
    <tag-links :value="note.tags" />
    <entry-description :description="note.description" :source-url="note.sourceUrl" />
    <reading-content :entry="note" />
    <entry-navigation :neighbors="neighbors" prefix="/notes" />
  </article>
</template>

<script>
import { pageHead, publishedDate, readEntryNeighbors, readingMinutes } from '~/utils/content'
import { postSocialCard } from '~/utils/socialCards'

export default {
  // Resolve a single short post by its public slug.
  async asyncData ({ $content, params, error }) {
    try {
      const [note, neighbors] = await Promise.all([
        $content('notes', params.slug).fetch(),
        readEntryNeighbors($content, 'notes', params.slug)
      ])
      return { note, neighbors }
    } catch (failure) {
      return error({ statusCode: failure.statusCode || 500, message: failure.message })
    }
  },
  // Set the canonical URL used by the copy control.
  head () {
    return pageHead(postSocialCard('notes', this.note))
  },
  methods: { publishedDate, readingMinutes }
}
</script>
