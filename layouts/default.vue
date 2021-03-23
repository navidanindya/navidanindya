<template>
  <div class="bg default-text box-border min-h-screen overflow-y-auto">
    <div class="max-w-2xl xl:max-w-3xl mx-auto px-2 md:px-4">
      <div class="flex flex-col min-h-screen">
        <header class="flex flex-none justify-between h-16">
          <span class="flex items-center hover:text-yellow-600">
            <NuxtLink to="/"><img src="/icon.png" alt="Navid Anindya Logo" class="w-auto h-14"></NuxtLink>
          </span>
          <div class="flex items-center">
            <span class="px-3 text-xs md:text-base hover:text-yellow-600">
              <NuxtLink to="/about">/about</NuxtLink>
            </span>
            <span class="pl-3 text-xs md:text-base hover:text-yellow-600">
              <NuxtLink to="/writings">/writings</NuxtLink>
            </span>
          </div>
        </header>
        <main class="flex-1 px-1 py-5 prose prose-yellow prose-sm lg:prose-lg">
          <Nuxt />
        </main>
        <!-- TODO: This breaks in smaller screens less than 320px. Has to fix the line break. -->
        <footer class="flex flex-none h-16">
          <span class="flex m-auto items-center text-xs md:text-base">
            <a
              v-for="link in links"
              :key="link.name"
              :href="link.link"
              target="_blank"
              rel="noreferrer noopener"
              class="hover:text-yellow-600 hover:underline"
            >
              {{ link.name }}
            </a>
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {
          link: 'https://www.linkedin.com/in/navidanindya',
          name: 'linkedin.'
        },
        {
          link: 'https://github.com/nealtheguitarist',
          name: 'github.'
        },
        {
          link: 'https://gitlab.com/nealtheguitarist',
          name: 'gitlab.'
        },
        {
          link: 'https://www.instagram.com/navidanindyaneel',
          name: 'instagram.'
        },
        {
          link: 'https://open.spotify.com/user/nealtheguitarist',
          name: 'spotify.'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.bg {
  @apply bg-gradient-to-b from-gray-900 to-gray-800;
}
.default-text {
  @apply antialiased text-gray-300 font-mono;
}
</style>
