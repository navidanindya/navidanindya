<template>
  <!-- Reserve a track row while the history request is in flight. -->
  <div class="min-h-[5.5rem]">
    <spotify-track-details v-if="track" v-bind="track" />
    <p v-else class="!my-0 text-gray-700 dark:text-gray-300" role="status">
      {{ status }}
    </p>
  </div>
</template>

<script>
import { pollSpotify } from '~/utils/spotifyPolling'

export default {
  // Track the latest history entry independently of live playback.
  data () {
    return { track: null, status: 'Loading recent track…', stopPolling: null }
  },
  // Start on first render.
  mounted () {
    this.start()
  },
  // Resume when Nuxt reactivates this view.
  activated () {
    this.start()
  },
  // Release resources when a cached page is hidden by navigation.
  deactivated () {
    this.stop()
  },
  // Release resources when the component is removed.
  beforeDestroy () {
    this.stop()
  },
  methods: {
    // Use one history poll per visible component.
    start () {
      if (this.stopPolling) { return }
      const { stop } = pollSpotify('/spotify/recently-played', 60000, (text) => {
        this.track = JSON.parse(text)
        this.status = 'No recent tracks yet.'
      }, () => {
        this.track = null
        this.status = 'Failed to fetch data. :('
      })
      this.stopPolling = stop
    },
    // Stop polling and allow a future activation to start again.
    stop () {
      this.stopPolling?.()
      this.stopPolling = null
    }
  }
}
</script>
