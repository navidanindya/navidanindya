<template>
  <div class="text-base">
    <h1>About Me</h1>
    <p>Name's <strong>Navid Anindya</strong>. Some people call me <strong>Neel</strong>.</p>
    <p>A human who likes to read and learn things continuously and try to look at things with a little more enthusiasm.</p>
    <blockquote>
      I am a <strong>director</strong> and <strong>co-owner</strong> of
      <a href="https://sayburgh.com" target="_blank" rel="noreferrer noopener">Sayburgh Solutions</a>.
      I also work as a <strong>CTO</strong> for our company. I have been doing this since 2018.
    </blockquote>
    <p>
      I currently maintain a team of devs and oversee devops tasks in our company.
    </p>
    <p>I also like to make little fun things, small snippets of code that automate very simple things.</p>
    <p>
      I also make music in this little band called
      <a href="https://www.facebook.com/sevenminutes" target="_blank" rel="noreferrer noopener">Seven Minutes</a>.
    </p>
    <blockquote>
      I write stuff about coding, music, my philosophies and small lyrics and thoughts here; as a journal for myself and
      knowledgebase (!) for people who stumble upon them.
    </blockquote>
    <p>I like to read and explore random things on the internet and love thinking about life, science and philosophy.</p>
    <h3>Philosophies that intrigue me:</h3>
    <ul>
      <li v-for="link in links" :key="link.name">
        <a :href="link.link" target="_blank" rel="noreferrer noopener">{{ link.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
  },
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
  }
}
</script>
