<template>
  <nav
    class="flex min-w-0 items-center justify-between gap-x-1 text-[clamp(.65rem,3.2vw,.75rem)] font-semibold italic min-[500px]:justify-end min-[500px]:gap-x-[clamp(.4rem,1.5vw,1rem)] min-[500px]:text-[.85rem]"
  >
    <!-- Save horizontal space on small screens while retaining the touch height. -->
    <nuxt-link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="inline-flex min-h-11 items-center whitespace-nowrap rounded px-0.5 desktop-hover:text-site-accent aria-[current=page]:text-site-accent max-[399px]:px-0 min-[500px]:min-h-0 min-[500px]:p-0 dark:desktop-hover:text-site-accent-dark dark:aria-[current=page]:text-site-accent-dark"
      v-text="link.label"
    />
  </nav>
</template>

<script>
export default {
  props: {
    links: { type: Array, required: true }
  }
}
</script>
