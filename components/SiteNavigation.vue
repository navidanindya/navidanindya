<template>
  <nav
    id="primary-navigation"
    aria-label="Main navigation"
    class="flex min-w-0 items-center justify-between gap-x-1 text-[clamp(.65rem,3.5vw,.75rem)] font-semibold italic min-[500px]:justify-end min-[500px]:gap-x-[clamp(.4rem,1.5vw,1rem)] min-[500px]:text-[.85rem]"
  >
    <nuxt-link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="inline-flex min-h-11 items-center whitespace-nowrap rounded px-0.5 desktop-hover:text-site-accent aria-[current=page]:text-site-accent min-[500px]:min-h-0 min-[500px]:p-0 dark:desktop-hover:text-site-accent-dark dark:aria-[current=page]:text-site-accent-dark"
      v-text="link.label"
    />
  </nav>
</template>

<script>
const links = [
  { to: '/', label: '/home' },
  { to: '/about', label: '/about' },
  { to: '/writings', label: '/writings' },
  { to: '/notes', label: '/notes' },
  { to: '/fun-stuff', label: '/fun-stuff' }
]

export default {
  // Keep one set of links across both header layouts.
  data () {
    return { links }
  }
}
</script>
