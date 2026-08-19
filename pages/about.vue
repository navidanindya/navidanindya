<template>
  <div class="text-base xs:text-justify">
    <h1>About Navid Anindya</h1>
    <p>Some people call me <strong>Neel</strong>.</p>
    <p>A human who likes to read and learn things continuously and try to look at things with a little more enthusiasm.</p>
    <blockquote class="italic">
      Professionally, I've spent 8+ years building and scaling cloud-native systems —
      and about as long leading the teams that ship them, from 5-person crews to full engineering departments.
    </blockquote>
    <h2>What I've Done</h2>

    <ul>
      <li>
        <p class="italic">
          Current
        </p><strong> Technical Project Manager &amp; Solutions Architect, <a href="https://www.konstruct.agency/" target="_blank" rel="noreferrer noopener">Konstruct</a></strong>
        — Architecting the technical foundations for their US healthcare platforms: HIPAA-compliant systems, pull-based GitOps and CI/CD automation, desisgning systems and solutions, building SaaS
        and leading the engineering hub here in Dhaka.
      </li>
      <li>
        <p class="italic">
          2025 - 2026
        </p><strong>Technical Lead, <a href="https://antimattrlabs.com" target="_blank" rel="noreferrer noopener">Antimattr Labs</a></strong>
        — Joined the founding team to lay the engineering foundations from scratch. Directed an agile dev team shipping multi-platform products — a low-latency quiz platform (QuizBoxBD) and a habit-tracking app (AmarDeen) live on both app stores — and stayed the technical bridge between stakeholders and the build.
      </li>
      <li>
        <p class="italic">
          2024 - 2025
        </p><strong>CEO, Sayburgh Solutions</strong>
        — Took the company from "built by engineers" to "run like a company" — owning product lifecycle and budgets, and leading a 12-person engineering and design team, while keeping the culture the same one I'd want to work in.
      </li>
      <li>
        <p class="italic">
          2019 - 2024
        </p><strong> CTO, Sayburgh Solutions</strong>
        — Architected the infrastructure from prototype to scale: high-traffic delivery for SomoyNews.tv (holding steady through 4,000 - 8,000 concurrent users during breaking news spikes) and FoodQo, a multi-tenant SaaS serving 200+ B2B restaurant clients.
        Led the GitOps transition to FluxCD and Kubernetes, and grew the engineering team from 5 to 12.
      </li>
    </ul>
    <p>
      I usually focus on softwares and tools like Git, GitOps, Kubernetes, and CI/CD pipelines that keep production deployments boring (boring is good, in this line of work).
      I also like to make little fun things, small snippets of code that automate very simple things.
    </p>
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
    <h4>Work with me</h4>
    <p>
      If you need someone to architect systems, untangle infrastructure, or tell you honestly why your deployment pipeline hates you
      — reach out at <a href="mailto:me@navidanindya.info">me@navidanindya.info</a>.
    </p>
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
