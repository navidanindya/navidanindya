<template>
  <div>
    <h1>Hello, world!</h1>
    <h2>About</h2>
    <p>Name's <strong>Navid Anindya</strong>.</p>
    <p>A human who likes to read and learn things continuously and try to look at things with a little more enthusiasm.</p>
    <h4>Philosophy:</h4>
    <ul>
      <li v-for="link in links" :key="link.name">
        <a :href="link.link" target="_blank" rel="noreferrer noopener">{{ link.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'About Navid Anindya',
      meta: [
        { hid: 'description', name: 'description', content: 'About Navid Anindya' },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'About Navid Anindya' },
        { hid: 'og:description', property: 'og:description', content: 'About Navid Anindya' },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: 'About Navid Anindya' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'About Navid Anindya' }
      ]
    }
  },
  data () {
    return {
      links: [
        {
          link: 'https://en.wikipedia.org/wiki/Mono_no_aware',
          name: 'Mono no aware.'
        },
        {
          link: 'https://www.youtube.com/watch?v=MBRqu0YOH14',
          name: 'Optimistic nihilism.'
        }
      ]
    }
  }
}
</script>
