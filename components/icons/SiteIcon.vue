<template>
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <use :href="'/icons/iconoir.svg#' + name" />
  </svg>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true }
  }
}
</script>
