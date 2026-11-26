<template>
  <article>
    <header class="flex items-center gap-4">
      <square-image src="/7-minutes-band.jpg" alt="Portrait of Navid Anindya and Shezan Anik, the 7 Minutes duo" :size="96" class="rounded-lg" />
      <div>
        <h1 class="!mb-0">
          7 Minutes
        </h1>
        <p class="!mb-0 !mt-2">
          A two-piece indie band I make music with.
        </p>
      </div>
    </header>
    <p>
      I'm one half of 7 Minutes, an indie duo from Dhaka. Shezan Anik and I both sing and play guitar.
      We write melancholy songs about the feelings that linger after things go quiet.
    </p>

    <section aria-labelledby="listen-and-follow">
      <h2 id="listen-and-follow" class="flex items-center gap-2">
        <site-icon name="headphones" class="h-5 w-5 shrink-0" />
        Listen and follow
      </h2>
      <div v-for="group in linkGroups" :key="group.label">
        <h3 class="flex items-center gap-2">
          <site-icon :name="group.icon" class="h-4 w-4 shrink-0 text-site-accent dark:text-site-accent-dark" />
          {{ group.label }}
        </h3>
        <ul class="!flex !list-none flex-wrap gap-x-4 gap-y-2 !p-0">
          <li v-for="link in group.links" :key="link.url" class="!m-0 !p-0">
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5">
              <social-icon :name="link.icon" :class="link.color" class="h-4 w-4 shrink-0" />
              <span v-text="link.label" />
            </a>
          </li>
        </ul>
      </div>
      <p>
        <a href="https://ffm.bio/7minutesband" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5" v-text="'All 7 Minutes links'" />
      </p>
    </section>
    <!-- Append the live catalog below the stable links to keep them in place. -->
    <section aria-labelledby="discography">
      <h2 id="discography">
        Discography
      </h2>
      <p v-if="$fetchState.error" role="status">
        Could not load Spotify releases.
      </p>
      <p v-else-if="$fetchState.pending && !songs.length" role="status">
        Loading Spotify releases…
      </p>
      <timeline-list :items="songs">
        <template #default="{ item: song }">
          <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,8rem)] items-center gap-3 max-[359px]:grid-cols-[minmax(0,1fr)_minmax(0,6.5rem)] sm:grid-cols-[minmax(280px,19rem)_minmax(0,1fr)] sm:gap-5">
            <div class="min-w-0 sm:col-start-2 sm:row-start-1">
              <h3 :id="song.anchor" :ref="song.anchor" class="!m-0">
                {{ song.title }}
              </h3>
              <p class="!mb-0 !mt-2 text-sm">
                {{ song.performers }}
              </p>
              <p class="!mb-0 !mt-1 text-xs text-gray-700 dark:text-gray-300">
                {{ song.type }} · <time :datetime="song.releaseDate">{{ song.year }}</time>
              </p>
              <release-links :release="song" />
            </div>
            <!-- Use a square release cover when the inline player would be too narrow. -->
            <button
              type="button"
              aria-haspopup="dialog"
              :aria-label="'Play ' + song.title"
              class="relative grid aspect-square w-full place-items-center overflow-hidden rounded-xl bg-gray-900 sm:hidden"
              @click="playSong(song, $event.currentTarget)"
            >
              <site-image
                v-if="song.cover"
                :src="song.cover"
                :alt="song.coverAlt"
                width="304"
                height="304"
                loading="lazy"
                class="!m-0 h-full w-full object-cover"
              />
              <span class="absolute grid h-10 w-10 place-items-center rounded-full bg-gray-900/90 text-white">
                <site-icon name="play" class="h-5 w-5" />
              </span>
            </button>
            <spotify-track-player
              :url="song.embedUrl"
              :title="song.title"
              class="hidden sm:col-start-1 sm:row-start-1 sm:block"
            />
          </div>
        </template>
      </timeline-list>
      <site-overlay ref="player" :aria-label="activeSong ? 'Spotify player for ' + activeSong.title : 'Spotify player'" @close="clearSong">
        <spotify-track-player v-if="activeSong" :url="activeSong.embedUrl" :title="activeSong.title" class="mx-auto max-w-xl" />
      </site-overlay>
    </section>
  </article>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'
import SocialIcon from '~/components/icons/SocialIcon.vue'
import { pageHead } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'
import { readSpotifyReleases } from '~/utils/spotify-releases'

export default {
  components: { SiteIcon, SocialIcon },
  // Use the public 7 Minutes releases and the links from the band's Feature.fm page.
  data () {
    return {
      songs: [],
      activeSong: null,
      linkGroups: [
        {
          label: 'Streaming',
          icon: 'headphones',
          links: [
            { label: 'Spotify', icon: 'spotify', color: 'text-[#1ED760]', url: 'https://open.spotify.com/artist/0m782AcyIPYEovTy9uTxR9' },
            { label: 'Apple Music', icon: 'apple-music', color: 'text-[#FA243C]', url: 'https://music.apple.com/us/artist/7-minutes/1807868298' },
            { label: 'YouTube', icon: 'youtube', color: 'text-[#FF0000]', url: 'https://www.youtube.com/@7Minutesband' }
          ]
        },
        {
          label: 'Social media',
          icon: 'people',
          links: [
            { label: 'Instagram', icon: 'instagram', color: 'text-[#E4405F]', url: 'https://www.instagram.com/7minutesband' },
            { label: 'Facebook', icon: 'facebook', color: 'text-[#0866FF]', url: 'https://www.facebook.com/7minutesband' }
          ]
        }
      ]
    }
  },
  // Fetch the current discography in the browser.
  fetchOnServer: false,
  async fetch () {
    this.songs = await readSpotifyReleases()
    const anchor = this.$route.hash.slice(1)
    if (this.songs.some(song => song.anchor === anchor)) {
      // Feed links can arrive before the release headings exist.
      await this.$nextTick()
      this.$refs[anchor]?.scrollIntoView()
    }
  },
  // Give the band portfolio its own canonical and sharing metadata.
  head () {
    return pageHead(staticSocialCard('/fun-stuff/7-minutes'))
  },
  // Check expiry when revisiting this kept-alive page.
  activated () {
    if (!this.$fetchState.pending) { this.$fetch() }
  },
  methods: {
    // Mount the selected player after its cover is pressed.
    playSong (song, trigger) {
      this.activeSong = song
      this.$refs.player.open(trigger)
    },
    // Remove the iframe on close so playback stops with the overlay.
    clearSong () {
      this.activeSong = null
    }
  }
}
</script>
