<template>
  <div class="flex min-w-0 items-start gap-3">
    <square-image
      v-if="cover"
      :src="cover.url"
      :alt="'Cover art for ' + album.name"
      :size="64"
      loading="lazy"
      class="rounded !object-contain"
    />
    <div class="min-w-0 break-words">
      <p class="!my-0 text-site-accent dark:text-site-accent-dark">
        {{ name }}
      </p>
      <p class="!my-0 text-sm">
        {{ artists.join(', ') }}
      </p>
      <p class="!my-0 text-sm text-gray-700 dark:text-gray-300">
        {{ album.name }}
      </p>
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="'Open ' + name + ' in Spotify'"
        class="inline-flex items-center gap-1.5 text-sm !no-underline desktop-hover:!text-site-ink dark:desktop-hover:!text-gray-200"
      ><spotify-icon class="h-4 w-4 shrink-0" />Open in Spotify</a>
    </div>
  </div>
</template>

<script>
import SpotifyIcon from '~/components/icons/SpotifyIcon.vue'

export default {
  components: { SpotifyIcon },
  props: {
    name: { type: String, required: true },
    artists: { type: Array, required: true },
    album: { type: Object, required: true },
    url: { type: String, required: true }
  },
  computed: {
    // Spotify orders album images from largest to smallest. Use its thumbnail in this row.
    cover () {
      return this.album.images[this.album.images.length - 1]
    }
  }
}
</script>
