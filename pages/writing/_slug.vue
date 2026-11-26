<template>
  <article>
    <site-breadcrumbs :current-label="writing.title" />
    <div class="entry-title-row">
      <!-- Keep longer headlines readable within the title row. -->
      <h1 class="!mb-0" :class="{ 'text-[clamp(1.625rem,5vw,2.5rem)]': writing.title.length > 48 }">
        {{ writing.title }}
      </h1>
      <copy-link-button :path="'/writing/' + writing.slug" :title="writing.title" />
    </div>
    <div class="text-base italic xs:text-justify">
      {{ writing.description }}
    </div>
    <section class="flex xs:flex-row flex-col justify-between items-start md:items-center xs:text-justify">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        By <nuxt-link to="/about/" rel="author" v-text="'Navid Anindya'" /> · {{ readingMinutes(writing.body) }} min read ·
        <span class="italic">Published on {{ formatDate(writing.createdAt) }}</span>
      </p>
      <entry-view-count :key="writing.slug" kind="writing" :slug="writing.slug" class="text-sm" />
    </section>
    <p v-if="writing.updated !== undefined" class="text-sm italic text-gray-700 dark:text-gray-300">
      Updated on: {{ formatDate(writing.updated) }}
    </p>
    <tag-links :value="writing.tags" />
    <reading-content :entry="writing" />
    <entry-navigation :neighbors="neighbors" prefix="/writing" />
  </article>
</template>

<script>
import { calendarDate, pageHead, publishedDate, readEntryNeighbors, readingMinutes } from '~/utils/content'
import { articleSizes, canonicalUrl, postSocialCard, siteOrigin, socialImagePath } from '~/utils/socialCards'

export default {
  async asyncData ({ $content, params, error }) {
    try {
      const [writing, neighbors] = await Promise.all([
        $content('writings', params.slug).fetch(),
        readEntryNeighbors($content, 'writings', params.slug)
      ])
      return { writing, neighbors }
    } catch (err) {
      error({
        statusCode: 404
      })
    }
  },
  head () {
    const published = this.toISODate(this.writing.createdAt)
    const modified = this.writing.updated ? this.toISODate(this.writing.updated) : published
    const card = postSocialCard('writing', this.writing)
    const head = pageHead(card)
    return {
      ...head,
      meta: [
        ...head.meta,
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'article:published_time', property: 'article:published_time', content: published },
        { hid: 'article:modified_time', property: 'article:modified_time', content: modified },
        { hid: 'article:author', property: 'article:author', content: canonicalUrl('/about') }
      ],
      script: [
        {
          hid: 'ld-json-article',
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: this.writing.title,
            description: this.writing.description,
            image: articleSizes.map(([width, height]) => siteOrigin + socialImagePath(card, width, height)),
            datePublished: published,
            dateModified: modified,
            author: { '@id': 'https://navidanindya.info/#person' },
            publisher: { '@id': 'https://navidanindya.info/#person' },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl(card.path)
            }
          }
        }
      ]
    }
  },
  methods: {
    formatDate: publishedDate,
    readingMinutes,
    // Preserve the publication day in the article metadata.
    toISODate (date) {
      return calendarDate(date).toISOString().substring(0, 10)
    }
  }
}
</script>
