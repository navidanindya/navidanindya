<template>
  <div class="xs:text-justify">
    <section>
      <h1>Hello, world!</h1>
      <p>I'm <strong>Navid Anindya.</strong> I make and explore things. You can check out some stuff here:</p>
      <ul class="text-base">
        <li v-for="link in links" :key="link.name">
          <NuxtLink :to="link.link">
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
      <p class="text-sm">
        My social links are down below.
      </p>
    </section>
    <section>
      <h3>My latest writing</h3>
      <list-writings :writings="latest" />
    </section>
    <h5>
      Have a good day, fellow internet stranger! &#128075;
    </h5>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const latest = await $content('writings')
      .only(['title', 'description', 'slug', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .limit(1)
      .fetch()
    return { latest }
  },
  data () {
    return {
      links: [
        {
          link: '/about',
          name: 'About myself'
        },
        {
          link: '/writings',
          name: 'Writings'
        }
      ]
    }
  }
}
</script>
