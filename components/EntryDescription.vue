<template>
  <p>
    {{ description }}
    <!-- Render the source as a link while keeping descriptions plain for metadata. -->
    <a
      v-if="sourceUrl"
      :href="sourceUrl.trim()"
      target="_blank"
      rel="noopener noreferrer"
      class="[overflow-wrap:anywhere]"
      v-text="sourceUrl.trim()"
    />
  </p>
</template>

<script>
export default {
  props: {
    description: { type: String, required: true },
    // Writings and notes without a source use the same plain description.
    // eslint-disable-next-line vue/require-default-prop
    sourceUrl: { type: String, required: false }
  }
}
</script>
