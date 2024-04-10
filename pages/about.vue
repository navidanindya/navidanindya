<template>
  <div class="text-base xs:text-justify">
    <h1>About me</h1>
    <p>Name's <strong>Navid Anindya</strong>. Some people call me <strong>Neel</strong>.</p>
    <p>A human who likes to read and learn things continuously and try to look at things with a little more enthusiasm.</p>
    <blockquote>
      I am the <strong>CEO</strong> and <strong>co-founder</strong> of
      <a href="https://sayburgh.com" target="_blank" rel="noreferrer noopener">Sayburgh Solutions</a>. I have been doing this since 2018.
    </blockquote>
    <p>
      I directly manage the Tech and Product teams and personally oversee DevOps in our company.
      I also have the responsibility to overlook all other departments of our company as well.
    </p>
    <p>
      I usually focus on softwares and tools like Git, FluxCD and Kubernetes.
    </p>
    <p>I also like to make little fun things, small snippets of code that automate very simple things.</p>
    <p>
      I also make music in this little band called
      <a href="https://www.facebook.com/7minutesband" target="_blank" rel="noreferrer noopener">7 Minutes</a>.
    </p>
    <blockquote>
      I write stuff about coding, music, my philosophies and small lyrics and thoughts here; as a journal for myself and
      knowledge-base (!) for people who stumble upon them.
    </blockquote>
    <p>I like to read and explore random things on the internet and love thinking about life, science and philosophy.</p>
    <h3>Philosophies that intrigue me</h3>
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
