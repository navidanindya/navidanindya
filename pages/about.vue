<template>
  <div class="text-base xs:text-justify">
    <h1>About Me</h1>
    <square-media-card src="/navid-anindya.jpg" alt="Navid Anindya with an acoustic guitar">
      <p>Some people call me <strong>Neel</strong>.</p>
      <p>A human who likes to read and learn things continuously and try to look at things with a little more enthusiasm.</p>
    </square-media-card>
    <blockquote class="italic">
      Professionally, I've spent 8+ years building and scaling cloud-native systems —
      and about as long leading the teams that ship them, from 5-person crews to full engineering departments.
    </blockquote>
    <h2>What I've Done</h2>

    <timeline-list :items="experience">
      <template #default="{ item }">
        <p class="!mb-1 !mt-0 text-left text-sm italic text-site-accent dark:text-amber-200">
          {{ item.period }}
        </p>
        <strong>{{ item.title }},
          <a v-if="item.url" :href="item.url" target="_blank" rel="noreferrer noopener">{{ item.employer }}</a>
          <template v-else>{{ item.employer }}</template>
        </strong>
        — {{ item.description }}
      </template>
    </timeline-list>
    <p>
      I usually focus on softwares and tools like Git, GitOps, Kubernetes, and CI/CD pipelines that keep production deployments boring (boring is good, in this line of work).
      I also like to make little fun things, small snippets of code that automate very simple things.
    </p>
    <p>
      For more about my career, you can find me on <a href="https://www.linkedin.com/in/navidanindya" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
    </p>
    <p>
      I also make music in this little band called <nuxt-link to="/fun-stuff/7-minutes/" v-text="'7 Minutes'" />.
    </p>
    <blockquote>
      I write stuff about coding, music, my philosophies and small lyrics and thoughts here; as a journal for myself and
      knowledge-base (!) for people who stumble upon them.
    </blockquote>
    <p>I like to read and explore random things on the internet and love thinking about life, science and philosophy.</p>
    <h2>Philosophies that intrigue me</h2>
    <ul>
      <li v-for="link in links" :key="link.name">
        <a :href="link.link" target="_blank" rel="noreferrer noopener">{{ link.name }}</a>
      </li>
    </ul>
    <h2 class="!mt-10">
      Work with me
    </h2>
    <p>
      If you need someone to architect systems, untangle infrastructure, or tell you honestly why your deployment pipeline hates you
      — reach out at <a href="mailto:me@navidanindya.info">me@navidanindya.info</a>.
    </p>
  </div>
</template>

<script>
import { pageHead } from '~/utils/content'
import { canonicalUrl, staticSocialCard } from '~/utils/socialCards'
export default {
  data () {
    return {
      experience: [
        {
          id: 'konstruct',
          period: 'Current',
          title: 'Technical Project Manager & Solutions Architect',
          employer: 'Konstruct, Inc.',
          url: 'https://www.konstruct.agency/',
          description: 'Architecting the technical foundations for their US healthcare platforms: HIPAA-compliant systems, pull-based GitOps and CI/CD automation, desisgning systems and solutions, building SaaS and leading the engineering hub here in Dhaka.'
        },
        {
          id: 'antimattr',
          period: '2025 - 2026',
          title: 'Technical Lead',
          employer: 'Antimattr Labs',
          url: 'https://antimattrlabs.com',
          description: 'Joined the founding team to lay the engineering foundations from scratch. Directed an agile dev team shipping multi-platform products — a low-latency quiz platform (QuizBoxBD) and a habit-tracking app (AmarDeen) live on both app stores — and stayed the technical bridge between stakeholders and the build.'
        },
        {
          id: 'sayburgh-ceo',
          period: '2024 - 2025',
          title: 'CEO',
          employer: 'Sayburgh Solutions',
          description: 'Took the company from "built by engineers" to "run like a company" — owning product lifecycle and budgets, and leading a 12-person engineering and design team, while keeping the culture the same one I\'d want to work in.'
        },
        {
          id: 'sayburgh-cto',
          period: '2019 - 2024',
          title: 'CTO',
          employer: 'Sayburgh Solutions',
          description: 'Architected the infrastructure from prototype to scale: high-traffic delivery for SomoyNews.tv (holding steady through 4,000 - 8,000 concurrent users during breaking news spikes) and FoodQo, a multi-tenant SaaS serving 200+ B2B restaurant clients. Led the GitOps transition to FluxCD and Kubernetes, and grew the engineering team from 5 to 12.'
        }
      ],
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
    const head = pageHead(staticSocialCard('/about'))
    return {
      ...head,
      meta: [...head.meta, { hid: 'og:type', property: 'og:type', content: 'profile' }],
      script: [
        {
          hid: 'ld-json-profile',
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': canonicalUrl('/about#profile'),
            url: canonicalUrl('/about'),
            mainEntity: {
              '@id': 'https://navidanindya.info/#person'
            }
          }
        }
      ]
    }
  }
}
</script>
