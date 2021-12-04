<template>
  <div class="flex">
    <div class="m-auto">
      <h2 v-if="error.statusCode === 404">
        404. That's a deadend.
      </h2>
      <h2 v-else>
        Something bad happened. :/
      </h2>
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
