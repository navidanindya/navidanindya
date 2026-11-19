<template>
  <ul class="site-divided-list">
    <li v-for="entry in entries" :key="entry.slug" class="!my-0 !px-0 py-4">
      <content-card
        :to="prefix + '/' + entry.slug"
        :title="entry.title"
        :heading-tag="headingTag"
        :description="entry.description"
        :source-url="entry.sourceUrl"
        :created-at="entry.createdAt"
        :updated="entry.updated"
        :tags="entry.tags"
      >
        <template #action>
          <copy-link-button :path="prefix + '/' + entry.slug" :title="entry.title" />
        </template>
      </content-card>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    entries: { type: [Array, Object], required: true },
    prefix: { type: String, required: true },
    headingTag: { type: String, required: true }
  }
}
</script>
