<template>
  <div class="overflow-hidden rounded-xl bg-site-cream dark:bg-gray-900">
    <iframe
      :src="url"
      :title="'Spotify player for ' + title"
      width="100%"
      height="152"
      loading="lazy"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      class="block w-full border-0"
    />
  </div>
</template>

<script>
export default {
  props: {
    url: { type: String, required: true },
    title: { type: String, required: true }
  }
}
</script>
