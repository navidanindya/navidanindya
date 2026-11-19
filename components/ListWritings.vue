<template>
  <post-list :entries="writings" :heading-tag="headingTag" prefix="/writing" />
</template>

<script>
export default {
  props: {
    writings: { type: [Array, Object], required: true },
    headingTag: { type: String, required: true }
  }
}
</script>
