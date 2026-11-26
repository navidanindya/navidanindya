<template>
  <section>
    <h1>Music on Repeat</h1>
    <p>My top 10 Spotify tracks from roughly the last six months.</p>
    <h2>Recently played</h2>
    <recently-played />
    <h2>Top tracks</h2>
    <!-- Keep the footer below the rankings while Spotify responds. -->
    <div class="min-h-[50vh]">
      <p v-if="status" role="status">
        {{ status }}
      </p>
      <ol v-else class="!list-none !p-0">
        <li v-for="(track, index) in tracks" :key="track.id" class="flex items-start gap-3 !p-0">
          <span class="text-gray-700 dark:text-gray-300 w-7 shrink-0 text-sm">{{ index + 1 }}.</span>
          <spotify-track-details
            :name="track.name"
            :artists="track.artists.map(artist => artist.name)"
            :album="track.album"
            :url="track.external_urls.spotify"
          />
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import { pageHead } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'

export default {
  // Keep the build independent of a live Spotify account.
  data () {
    return { tracks: [], status: 'Loading top tracks…' }
  },
  // Describe the ranking and the one recent history item.
  head () {
    return pageHead(staticSocialCard('/fun-stuff/music-on-repeat'))
  },
  // Load the ranking once each time the cached page becomes active.
  async activated () {
    try {
      const response = await fetch('/spotify/top-tracks')
      if (!response.ok) { throw new Error('Spotify request failed') }
      this.tracks = (await response.json()).items
      this.status = this.tracks.length ? '' : 'No top tracks yet.'
    } catch {
      this.status = 'Failed to fetch data. :('
    }
  }
}
</script>
