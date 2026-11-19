<template>
  <!-- Bind the muted property as well as the attribute so autoplay stays muted. -->
  <video v-bind="$attrs" :muted.prop="true">
    <slot />
  </video>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
