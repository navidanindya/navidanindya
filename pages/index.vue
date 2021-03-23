<template>
  <div>
    <h1>Hello, world!</h1>
    <p>I'm <strong>Navid Anindya.</strong> I make and explore things. You can check out some stuff here:</p>
    <ul class="text-base">
      <li v-for="link in links" :key="link.name">
        <NuxtLink :to="link.link">
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
    <p class="text-sm">My social links are down below.</p>
    <p>Have a good day, fellow internet stranger!</p>
  </div>
</template>

<script>
export default {
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
