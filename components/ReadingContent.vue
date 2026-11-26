<template>
  <div class="site-reading min-w-0">
    <nuxt-content :document="enhancedContent" />
    <site-overlay ref="overlay" :aria-label="previewLabel" @close="clearPreview">
      <nuxt-content v-if="previewDocument" :document="previewDocument" class="site-reader-panel mx-auto w-full" />
    </site-overlay>
  </div>
</template>

<script>
// Point Nuxt Content's Vue bindings at the original tree for each preview.
const enhanceMedia = (node, path) => {
  const imageIndex = ['a', 'nuxt-link'].includes(node.tag)
    ? node.children.findIndex(child => child.tag === 'site-image')
    : -1
  const isImage = node.tag === 'site-image' || imageIndex !== -1
  if (isImage || node.tag === 'pre') {
    return {
      tag: 'reading-media',
      props: { kind: isImage ? 'image' : 'code', ':preview': imageIndex === -1 ? path : `${path}.children[${imageIndex}]` },
      children: [node]
    }
  }
  if (node.children) {
    return {
      ...node,
      tag: node.tag === 'video' && node.props.autoPlay && node.props.muted ? 'reading-video' : node.tag,
      children: node.children.map((child, index) => enhanceMedia(child, `${path}.children[${index}]`))
    }
  }
  return node
}

export default {
  // Give Markdown media buttons access to this entry's single viewer.
  provide () {
    return { expandReadingMedia: this.expandPreview }
  },
  props: {
    entry: { type: Object, required: true }
  },
  // Store preview data separately from the published entry.
  data () {
    return { previewDocument: null, previewLabel: '' }
  },
  computed: {
    // Keep the published entry and its original Markdown tree intact.
    enhancedContent () {
      return { ...this.entry, body: enhanceMedia(this.entry.body, 'readingSource'), readingSource: this.entry.body }
    }
  },
  methods: {
    // Render the selected content through Nuxt Content inside the viewer.
    expandPreview (node, label, trigger) {
      this.previewDocument = { ...this.entry, body: { children: [node] } }
      this.previewLabel = label
      this.$refs.overlay.open(trigger)
    },
    // Release the preview when the viewer closes.
    clearPreview () {
      this.previewDocument = null
    }
  }
}
</script>
