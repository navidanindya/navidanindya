<template>
  <!-- Omit the client-side counter placeholder from the static Markdown export. -->
  <p data-markdown-ignore class="text-gray-700 dark:text-gray-300">
    {{ count === null ? '---' : count }} view(s)
  </p>
</template>

<script>
export default {
  props: {
    kind: { type: String, required: true },
    slug: { type: String, required: true }
  },
  // Keep the placeholder until the Pages Function confirms the new total.
  data () {
    return { count: null }
  },
  // Count once per mounted entry, including pages that Nuxt keeps alive.
  async mounted () {
    this.viewRequest = new AbortController()
    const { signal } = this.viewRequest
    try {
      const response = await fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: this.kind, slug: this.slug }),
        signal
      })
      if (!response.ok) {
        throw new Error(`View request failed (HTTP ${response.status}): ${await response.text()}`)
      }
      const { count } = await response.json()
      if (!signal.aborted) { this.count = count }
    } catch (error) {
      if (signal.aborted) { return }
      // eslint-disable-next-line no-console
      console.warn('Could not record entry view', { kind: this.kind, slug: this.slug, message: error.message })
    }
  },
  // Release the request when Nuxt removes the entry.
  beforeDestroy () {
    this.viewRequest?.abort()
  }
}
</script>
