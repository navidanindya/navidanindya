<template>
  <div class="bg default-text box-border min-h-screen">
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
        <footer class="flex flex-none h-16">
          <span class="flex m-auto items-center text-xs md:text-base">linkedin. github. gitlab. instagram. spotify.</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.bg {
  @apply bg-gradient-to-b from-gray-900 to-gray-800;
}
.default-text {
  @apply antialiased text-gray-300 font-mono;
}
</style>
