<template>
  <site-navigation :links="otherSections" class="min-[500px]:!justify-center" aria-label="Continue browsing" />
</template>

<script>
import { canonicalPagePath } from '~/utils/socialCards'
import { primaryLinks } from '~/utils/navigation'

const sections = [...primaryLinks, { to: '/tags/', label: '/tags' }]

export default {
  computed: {
    // Cross-link the main sections and skip the index the visitor is already on.
    otherSections () {
      const currentPath = canonicalPagePath(this.$route.path)
      return sections.filter(link => link.to !== currentPath)
    }
  }
}
</script>
