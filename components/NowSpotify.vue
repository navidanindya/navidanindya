<template>
  <!-- Align the icon with the first line and let long track credits wrap. -->
  <section aria-label="Spotify playback" class="mt-1.5 flex items-start justify-end gap-2 text-right text-xs leading-5 text-site-ink dark:text-gray-200">
    <nuxt-link to="/fun-stuff/music-on-repeat/" class="min-w-0 underline decoration-dotted underline-offset-2 [overflow-wrap:anywhere]">
      <template v-if="playback">
        <span class="text-site-accent dark:text-site-accent-dark">{{ playback[1] }}</span>
        {{ playback[2] }}
      </template>
      <template v-else>
        {{ currentTrackStr }}
      </template>
      <span class="sr-only"> — Music on Repeat</span>
    </nuxt-link>
    <spotify-icon class="mt-0.5 h-4 w-4 shrink-0" />
  </section>
</template>

<script>
import SpotifyIcon from '~/components/icons/SpotifyIcon.vue'
import { pollSpotify } from '~/utils/spotifyPolling'

export default {
  components: { SpotifyIcon },
  // Render the idle state while the client starts polling.
  data () {
    return { currentTrackStr: 'Nothing playing right now.', polling: null }
  },
  computed: {
    // Separate the status label from the track text for their two colors.
    playback () {
      return /^(Now playing:|Last played:) (.+)$/.exec(this.currentTrackStr)
    }
  },
  watch: {
    // Refresh on navigation through the same timer and in-flight request.
    $route () {
      this.polling?.refresh()
    }
  },
  // Keep playback current while the visitor stays on the same page.
  mounted () {
    this.polling = pollSpotify('/spotify', 60000, (text) => {
      this.currentTrackStr = text
    }, () => {
      this.currentTrackStr = 'Failed to fetch data. :('
    })
  },
  // Release the timer and any in-flight request with the layout.
  beforeDestroy () {
    this.polling?.stop()
  }
}
</script>
