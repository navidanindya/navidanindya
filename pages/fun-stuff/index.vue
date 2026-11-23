<template>
  <section>
    <h1>Fun Stuff</h1>
    <p>Small experiments, music, and things made for the fun of it.</p>
    <ul class="site-divided-list">
      <li class="!my-0 !px-0 py-4">
        <project-card
          to="/fun-stuff/music-on-repeat"
          title="Music on repeat"
          description="My top tracks on Spotify."
          link-label="See what’s on repeat"
        >
          <p class="!my-0 font-medium">
            Recently played
          </p>
          <recently-played />
        </project-card>
      </li>
      <li class="!my-0 !px-0 py-4">
        <project-card
          to="/fun-stuff/7-minutes"
          title="7 Minutes"
          description="A two-piece indie band I make music with."
          link-label="Check out our stuff"
        >
          <p v-if="$fetchState.error" role="status" class="!my-0">
            Could not load Spotify releases.
          </p>
          <p v-else-if="$fetchState.pending && !latestRelease" role="status" class="!my-0">
            Loading Spotify releases…
          </p>
          <div v-if="latestRelease" class="flex items-start gap-3">
            <square-image v-if="latestRelease.cover" :src="latestRelease.cover" :alt="latestRelease.coverAlt" :size="96" class="rounded-lg" />
            <div class="min-w-0">
              <p class="!my-0 font-medium">
                Latest release
              </p>
              <p class="!my-0">
                {{ latestRelease.title }} · {{ latestRelease.year }}
              </p>
              <release-links :release="latestRelease" />
            </div>
          </div>
        </project-card>
      </li>
      <li class="!my-0 !px-0 py-4">
        <project-card
          to="/fun-stuff/lexical-analyzer"
          title="Lexical Analyzer"
          description="A Java lexer I wrote for a compiler course at university."
          link-label="Read about the project"
        >
          <p class="!my-0 font-medium">
            Language
          </p>
          <p class="!my-0">
            Java
          </p>
        </project-card>
      </li>
    </ul>
  </section>
</template>

<script>
import { pageHead } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'
import { readSpotifyReleases } from '~/utils/spotify-releases'

export default {
  data () {
    return { latestRelease: null }
  },
  // The portfolio and its card share the same browser-side catalog.
  fetchOnServer: false,
  async fetch () {
    const [latestRelease] = await readSpotifyReleases()
    this.latestRelease = latestRelease
  },
  // Give the project directory its own search title and canonical URL.
  head () {
    return pageHead(staticSocialCard('/fun-stuff'))
  },
  // Check expiry when revisiting this kept-alive page.
  activated () {
    if (!this.$fetchState.pending) { this.$fetch() }
  }
}
</script>
