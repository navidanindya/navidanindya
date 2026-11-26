<template>
  <!-- Reserve the same space above the header and below the footer. -->
  <div class="site-backdrop relative isolate flex min-h-screen flex-col py-7 font-mono text-site-ink antialiased dark:text-gray-300 [&_:focus-visible]:outline [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-site-accent dark:[&_:focus-visible]:outline-site-accent-dark">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-8 focus:z-50 focus:rounded focus:bg-site-paper focus:px-3 focus:py-2 focus:text-site-ink dark:focus:bg-gray-800 dark:focus:text-gray-100" v-text="'Skip to content'" />
    <!-- Keep notices in the reserved top space so they never move the page. -->
    <div class="absolute inset-x-0 top-0 flex flex-col items-center px-3">
      <connection-status />
      <site-update-toast />
    </div>
    <div class="mx-auto flex w-[calc(100%-1.5rem)] max-w-reading flex-1 flex-col min-[561px]:w-[calc(100%-2.5rem)]">
      <div class="flex flex-1 flex-col">
        <!-- Reserve a full navigation row below the logo on narrow screens. -->
        <header class="relative grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-1.5 py-2 min-[500px]:gap-x-3.5">
          <nuxt-link class="shrink-0 rounded-sm bg-site-ink dark:bg-transparent" to="/" aria-label="Navid Anindya, home">
            <square-image src="/icon.png" alt="Navid Anindya site logo" :size="56" class="max-[499px]:!h-10 max-[499px]:!w-10" />
          </nuxt-link>
          <site-navigation class="col-span-3 row-start-2 min-[500px]:col-span-1 min-[500px]:col-start-2 min-[500px]:row-start-1" />
          <theme-picker class="col-start-3 row-start-1 justify-self-end" />
        </header>
        <now-spotify class="pb-2" />
        <main id="main-content" tabindex="-1" class="prose min-w-0 max-w-none flex-1 py-[2.3rem] dark:prose-invert prose-img:w-full">
          <!-- Entry pages render their breadcrumb with the loaded title. -->
          <site-breadcrumbs v-if="!hasEntryBreadcrumb && !$nuxt.nuxt.err" />
          <Nuxt keep-alive />
        </main>
        <!-- Keep section navigation available at the end of every page. -->
        <section-links />
        <footer class="mt-4 flex flex-col items-center gap-3 text-center text-xs min-[771px]:flex-row min-[771px]:justify-between min-[771px]:gap-2">
          <!-- Use a footer-specific ID because social filters hide the generic one. -->
          <p id="footer-elsewhere-label" class="inline-flex shrink-0 items-center gap-1.5 font-medium text-site-accent dark:text-site-accent-dark">
            <site-icon name="pin" class="h-4 w-4" />
            Find me elsewhere
          </p>
          <ul aria-labelledby="footer-elsewhere-label" class="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-medium min-[771px]:flex-nowrap min-[771px]:justify-end min-[771px]:gap-x-1.5">
            <li v-for="(link, index) in links" :key="link.name" class="inline-flex items-center gap-2 min-[771px]:gap-1.5">
              <span v-if="index" aria-hidden="true" class="hidden text-site-accent dark:text-site-accent-dark min-[771px]:inline">·</span>
              <a
                :href="link.link"
                target="_blank"
                rel="noreferrer noopener"
                class="inline-flex items-center gap-1.5 whitespace-nowrap desktop-hover:text-site-accent dark:desktop-hover:text-site-accent-dark"
              >
                <social-icon :name="link.name" class="h-4 w-4 shrink-0 text-site-accent dark:text-site-accent-dark" />
                <span v-text="link.name" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import NowSpotify from '~/components/NowSpotify.vue'
import SiteIcon from '~/components/icons/SiteIcon.vue'
import SocialIcon from '~/components/icons/SocialIcon.vue'
export default {
  components: { NowSpotify, SiteIcon, SocialIcon },
  data () {
    return {
      links: [
        {
          link: 'https://www.linkedin.com/in/navidanindya',
          name: 'linkedin'
        },
        {
          link: 'https://github.com/navidanindya',
          name: 'github'
        },
        {
          link: 'https://gitlab.com/navidanindya',
          name: 'gitlab'
        },
        {
          link: 'https://www.instagram.com/navidanindyaneel',
          name: 'instagram'
        },
        {
          link: 'https://open.spotify.com/user/nealtheguitarist',
          name: 'spotify'
        }
      ]
    }
  },
  computed: {
    // Let entry pages supply their own title during static rendering.
    hasEntryBreadcrumb () {
      return ['writing-slug', 'notes-slug'].includes(this.$route.name)
    }
  }
}
</script>
