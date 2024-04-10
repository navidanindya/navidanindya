<template>
  <div class="bg default-text box-border min-h-screen">
    <div class="max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto px-3 md:px-5">
      <div class="flex flex-col min-h-screen">
        <header class="flex flex-none justify-between h-16">
          <span class="flex items-center hover:text-amber-600">
            <NuxtLink to="/"><img src="/icon.webp" alt="Navid Anindya Logo" class="w-auto h-14"></NuxtLink>
          </span>
          <div class="flex items-center italic">
            <span class="px-3 text-xs md:text-base hover:text-amber-600">
              <NuxtLink to="/">/home</NuxtLink>
            </span>
            <span class="px-3 text-xs md:text-base hover:text-amber-600">
              <NuxtLink to="/about">/about</NuxtLink>
            </span>
            <span class="pl-3 text-xs md:text-base hover:text-amber-600">
              <NuxtLink to="/writings">/writings</NuxtLink>
            </span>
          </div>
        </header>
        <main class="flex-1 px-1 pt-10 pb-5 prose prose-amber lg:prose-lg xl:prose-xl">
          <Nuxt keep-alive />
        </main>
        <now-spotify />
        <footer class="flexed-line justify-around mb-5 mt-3">
          <ul class="flex text-xs md:text-base list-none text-center">
            <li v-for="link in links" :key="link.name">
              <a
                :href="link.link"
                target="_blank"
                rel="noreferrer noopener"
                class="hover:text-amber-600"
              >
                {{ link.name }}
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
export default {
  components: { NowSpotify },
  data () {
    return {
      links: [
        {
          link: 'https://www.linkedin.com/in/navidanindya',
          name: 'linkedin.'
        },
        {
          link: 'https://github.com/navidanindya',
          name: 'github.'
        },
        {
          link: 'https://gitlab.com/navidanindya',
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
.flexed-line {
  @apply flex flex-row w-full;
}
.nuxt-link-exact-active {
  @apply text-amber-600;
}
</style>
