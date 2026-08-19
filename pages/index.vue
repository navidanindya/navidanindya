<template>
  <div class="xs:text-justify">
    <section>
      <h1>Hello, world!</h1>
      <p class="text-base">
        I'm <strong>Navid Anindya</strong>. I make and explore things.
      </p>
      <p class="text-base">
        I code, do music, roam around, and ruminate about philosophical and existentialism of life.
      </p>
      <p class="text-base">
        By trade, I'm a <strong>Technical Project Manager & Solutions Architect</strong> at <a href="https://www.konstruct.agency" target="_blank" rel="noopener noreferrer">Konstruct, Inc.</a>,
        building the infrastructure behind US healthcare platforms — the kind that isn't allowed to have a bad day -
        which is a fun kind of pressure to build under.
      </p>
      <p class="text-base">
        Before that, I was CTO, then CEO of my own company, taking engineering teams from 5 people to 12 and shipping production systems that had to survive real traffic,
        which mostly taught me to handle real-life production level scenarios in SaaS and web applications, and how to manage people and teams in a way that is both productive and humane.
      </p>
      <ul class="text-base">
        <li v-for="link in links" :key="link.name">
          <NuxtLink :to="link.link">
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
      <p class="text-base">
        My socials are down below.
      </p>
    </section>
    <section>
      <h3>My latest writing</h3>
      <list-writings :writings="latest" />
    </section>
    <h4 class="text-base mt-10">
      Have a good day, fellow internet stranger! &#128075;
    </h4>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const latest = await $content('writings')
      .only(['title', 'description', 'slug', 'tags', 'createdAt', 'updated'])
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
          name: 'Learn more details about me'
        },
        {
          link: '/writings',
          name: 'Read some of the writings I wrote'
        }
      ]
    }
  }
}
</script>
