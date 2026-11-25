<template>
  <div>
    <h1>Stuff that I wrote</h1>
    <p>Notes and essays on engineering, music, philosophy, and things I’m figuring out.</p>
    <p class="text-sm">
      By <nuxt-link to="/about/" rel="author" v-text="'Navid Anindya'" />
    </p>
    <p class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <browse-tags-link />
      <a href="/feed.xml" type="application/rss+xml" class="inline-flex items-center gap-2">
        <site-icon name="rss" class="h-4 w-4 shrink-0" />
        <span v-text="'Subscribe via RSS'" />
      </a>
    </p>
    <list-writings :writings="writings" heading-tag="h2" />
  </div>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'
import { pageHead, readEntries } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'

export default {
  components: { SiteIcon },
  // Read writings in publication order, including older date formats.
  async asyncData ({ $content }) {
    return { writings: await readEntries($content, 'writings') }
  },
  // Share the same page metadata with the build-time image generator.
  head () {
    return pageHead(staticSocialCard('/writings'))
  }
}
</script>
