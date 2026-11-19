<template>
  <div class="xs:text-justify">
    <section>
      <h1>
        <!-- Match the greeting to the site's existing terminal-inspired styles. -->
        Hello, world! <site-icon name="system" class="inline-block h-[.65em] w-[.65em] align-baseline" />
      </h1>
      <p class="text-base">
        I'm <nuxt-link to="/about" class="font-semibold" v-text="'Navid Anindya'" />. I make and explore things.
      </p>
      <p class="text-base">
        I code, do music, roam around, and ruminate about philosophical and existentialism of life.
      </p>
      <p class="text-base">
        By trade, I'm a <strong>Technical Project Manager & Solutions Architect</strong> at <a href="https://www.konstruct.agency" target="_blank" rel="noopener noreferrer">Konstruct, Inc.</a>,
        building the infrastructure behind US healthcare platforms — the kind that isn't allowed to have a bad day -
        which is a fun kind of pressure to build under.
      </p>
      <p class="text-base">
        Before that, I was CTO, then CEO of my own company, taking engineering teams from 5 people to 12 and shipping production systems that had to survive real traffic,
        which mostly taught me to handle real-life production level scenarios in SaaS and web applications, and how to manage people and teams in a way that is both productive and humane.
      </p>
      <nav aria-label="More about this site" class="flex flex-wrap gap-x-5 gap-y-2">
        <nuxt-link to="/about" v-text="'Learn more details about me'" />
        <nuxt-link to="/writings" v-text="'Read some of the writings I wrote'" />
      </nav>
      <p class="text-base">
        My socials are down below.
      </p>
    </section>
    <section>
      <h2 class="flex items-center gap-2">
        <site-icon name="writing" class="h-5 w-5 shrink-0" />
        My latest writing
      </h2>
      <list-writings :writings="latest" heading-tag="h3" />
    </section>
    <p class="!mt-10 font-semibold text-site-accent dark:text-site-accent-dark">
      Have a good day, fellow internet stranger! &#128075;
    </p>
  </div>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'
import { pageHead, readEntries } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'

export default {
  components: { SiteIcon },
  // Use the same publication order on the homepage and writing index.
  async asyncData ({ $content }) {
    return { latest: (await readEntries($content, 'writings')).slice(0, 1) }
  },
  // Share the same page metadata with the build-time image generator.
  head () {
    return pageHead(staticSocialCard('/'))
  }
}
</script>
