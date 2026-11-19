<template>
  <div class="flex items-start gap-4 sm:items-center sm:gap-6">
    <!-- Top-align the square portrait on phones so it starts beside the text. -->
    <square-image :src="src" :alt="alt" :size="176" class="rounded-sm max-sm:!h-32 max-sm:!w-32" />
    <div class="min-w-0 text-left [&>:first-child]:mt-0 [&>:last-child]:mb-0">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true }
  }
}
</script>
