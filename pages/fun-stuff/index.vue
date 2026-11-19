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
          <div class="flex items-start gap-3">
            <square-image :src="latestRelease.cover" :alt="latestRelease.coverAlt" :size="96" class="rounded-lg" />
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
import { bandReleases } from '~/utils/band'
import { pageHead } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'

export default {
  // Read the latest release from the same list as the portfolio.
  data () {
    return { latestRelease: bandReleases[0] }
  },
  // Give the project directory its own search title and canonical URL.
  head () {
    return pageHead(staticSocialCard('/fun-stuff'))
  }
}
</script>
