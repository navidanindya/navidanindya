<template>
  <img
    :src="src"
    :alt="alt"
    :width="size"
    :height="size"
    :style="{ width: size + 'px', height: size + 'px' }"
    decoding="async"
    class="!m-0 aspect-square shrink-0 object-cover"
  >
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    size: { type: Number, required: true }
  }
}
</script>
