<template>
  <section>
    <h1>#{{ tag }}</h1>
    <p>Writings and notes tagged {{ tag }}.</p>
    <section v-if="writings.length">
      <h2>Writings</h2>
      <list-writings :writings="writings" heading-tag="h3" />
    </section>
    <section v-if="notes.length">
      <h2>Notes &amp; Finds</h2>
      <post-list :entries="notes" prefix="/notes" heading-tag="h3" />
    </section>
  </section>
</template>

<script>
import { contentTags, pageHead, readContentCollections } from '~/utils/content'
import { tagSocialCard } from '~/utils/socialCards'

export default {
  // Match the same tag across both collections and reject unknown archives.
  async asyncData ({ $content, params, error }) {
    const [allWritings, allNotes] = await readContentCollections($content)
    const tag = params.slug
    const writings = allWritings.filter(entry => contentTags(entry.tags).includes(tag))
    const notes = allNotes.filter(entry => contentTags(entry.tags).includes(tag))
    if (!writings.length && !notes.length) {
      return error({ statusCode: 404, message: 'Tag not found' })
    }
    return { tag, writings, notes }
  },
  // Keep the tag archive discoverable under its canonical slug.
  head () {
    return pageHead(tagSocialCard(this.tag))
  }
}
</script>
