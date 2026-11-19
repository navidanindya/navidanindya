<template>
  <nav class="flex flex-wrap justify-center gap-x-5 gap-y-2 text-center text-sm font-semibold italic" aria-label="Continue browsing">
    <nuxt-link
      v-for="link in otherSections"
      :key="link"
      :to="link"
      class="whitespace-nowrap desktop-hover:text-site-accent dark:desktop-hover:text-site-accent-dark aria-[current=page]:text-site-accent dark:aria-[current=page]:text-site-accent-dark"
      v-text="link === '/' ? '/home' : link"
    />
  </nav>
</template>

<script>
export default {
  computed: {
    // Cross-link the main sections and skip the index the visitor is already on.
    otherSections () {
      const currentPath = this.$route.path.replace(/\/$/, '') || '/'
      return ['/', '/about', '/writings', '/notes', '/fun-stuff', '/tags'].filter(path => path !== currentPath)
    }
  }
}
</script>
