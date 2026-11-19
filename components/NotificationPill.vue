<template>
  <!-- Slide into view while respecting reduced-motion preferences. -->
  <transition
    enter-active-class="motion-safe:transition motion-safe:duration-200 motion-safe:ease-out"
    enter-class="motion-safe:-translate-y-3 motion-safe:opacity-0"
    leave-active-class="motion-safe:transition motion-safe:duration-150 motion-safe:ease-in"
    leave-to-class="motion-safe:-translate-y-3 motion-safe:opacity-0"
  >
    <!-- Keep the notch to one compact line, including on phones. -->
    <div
      v-if="visible"
      class="notification-notch relative flex min-h-6 w-max max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-b-xl px-2.5 text-center text-[0.6875rem] leading-4 text-site-ink shadow-sm sm:text-xs dark:text-gray-200"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, required: true }
  }
}
</script>
