<template>
  <div class="bg default-text box-border min-h-screen">
    <div class="max-w-2xl xl:max-w-3xl mx-auto px-3 md:px-5">
      <div class="flex flex-col min-h-screen">
        <header class="flex flex-none justify-between h-16">
          <span class="flex items-center hover:text-yellow-600">
            <NuxtLink to="/"><img src="/icon.png" alt="Navid Anindya Logo" class="w-auto h-14"></NuxtLink>
          </span>
          <div class="flex items-center italic">
            <span class="px-3 text-xs md:text-base hover:text-yellow-600">
              <NuxtLink to="/about">/about</NuxtLink>
            </span>
            <span class="pl-3 text-xs md:text-base hover:text-yellow-600">
              <NuxtLink to="/writings">/writings</NuxtLink>
            </span>
          </div>
        </header>
        <main class="flex-1 px-1 pt-10 pb-5 prose prose-yellow prose-sm lg:prose-lg xl:prose-xl">
          <Nuxt />
        </main>
        <div class="flexed-line justify-center">
          <div class="flex">
            <svg class="h-4 w-4 mx-auto mt-1" viewBox="0 0 168 168">
              <path
                fill="#1ED760"
                d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741
                  83.743 83.741 46.254 0 83.744-37.49 83.744-83.741
                  0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404
                  120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222
                  5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337
                  9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98
                  2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538
                  6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04
                  5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138
                  1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245
                  109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
              ></path>
            </svg>
          </div>
          <div class="flex items-center text-yellow-600 text-xs ml-2 truncate">
            <span>Not playing anything right now.</span>
          </div>
        </div>
        <footer class="flexed-line justify-around mb-5 mt-3">
          <ul class="flex text-xs md:text-base list-none text-center">
            <li v-for="link in links" :key="link.name">
              <a
                :href="link.link"
                target="_blank"
                rel="noreferrer noopener"
                class="hover:text-yellow-600"
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
export default {
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
</style>
