<template>
  <div class="flex">
    <div class="m-auto text-center">
      <template v-if="error.statusCode === 404">
        <h1 class="tracking-widest">
          404
        </h1>
        <h2>That's a dead-end.</h2>
        <p>
          While you find your way, maybe
          <nuxt-link to="/writings">
            read some writings I wrote?
          </nuxt-link>
        </p>
      </template>
      <template v-else>
        <h1 class="tracking-widest">
          500
        </h1>
        <h2>Something bad happened.</h2>
        <p>
          While I fix things, maybe
          <nuxt-link to="/writings">
            read some writings I wrote?
          </nuxt-link>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
