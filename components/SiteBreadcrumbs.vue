<template>
  <nav v-if="crumbs.length" class="not-prose mb-5 text-xs font-semibold italic leading-5" aria-label="Breadcrumb">
    <nuxt-link class="desktop-hover:text-site-accent dark:desktop-hover:text-site-accent-dark" to="/" v-text="'/home'" />
    <!-- Keep parent links together and let the final title flow like normal text. -->
    <span v-for="(crumb, index) in crumbs" :key="crumb.to" :class="{ 'whitespace-nowrap': index < crumbs.length - 1 }">
      <site-icon name="forward" class="ml-1 inline-block h-3 w-3 align-text-bottom" />&#160;
      <span v-if="index === crumbs.length - 1" :class="crumb.currentClass" aria-current="page">{{ crumb.label }}</span>
      <nuxt-link v-else :to="canonicalPagePath(crumb.to)" class="desktop-hover:text-site-accent dark:desktop-hover:text-site-accent-dark">{{ crumb.label }}</nuxt-link>
    </span>
  </nav>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'
import { canonicalPagePath, staticSocialCard } from '~/utils/socialCards'

export default {
  components: { SiteIcon },
  props: {
    // eslint-disable-next-line vue/require-default-prop -- Index routes use their navigation label.
    currentLabel: { type: String, required: false }
  },
  computed: {
    // Map article detail routes to their public collection index.
    crumbs () {
      const parts = this.$route.path.split('/').filter(Boolean)
      return parts.map((part, index) => {
        const section = part === 'writing' ? 'writings' : part
        const to = part === 'writing' ? '/writings' : '/' + parts.slice(0, index + 1).join('/')
        if (index === parts.length - 1 && this.currentLabel) {
          return { to, label: this.currentLabel, currentClass: 'font-normal not-italic' }
        }
        if (parts[0] === 'fun-stuff' && index > 0 && index === parts.length - 1) {
          // Keep the section link slashed and use the visible title for the project.
          const { title, cardTitle } = staticSocialCard(to)
          if (title) { return { to, label: cardTitle || title, currentClass: 'font-normal not-italic' } }
        }
        if (parts[0] === 'tags' && index === 1) {
          // Display the public tag spelling, including hyphens and the hash.
          return { to, label: '#' + decodeURIComponent(part), currentClass: 'font-normal not-italic text-site-accent dark:text-site-accent-dark' }
        }
        return { to, label: '/' + section, currentClass: 'text-site-accent dark:text-site-accent-dark' }
      })
    }
  },
  methods: { canonicalPagePath }
}
</script>
