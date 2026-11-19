<template>
  <ol class="!list-none !p-0 min-[360px]:ml-1 min-[360px]:border-l min-[360px]:border-site-rule min-[360px]:!pl-4 dark:min-[360px]:border-site-rule-dark" role="list">
    <li
      v-for="item in items"
      :key="item.id"
      class="relative !my-0 !px-0 py-4 min-[360px]:before:absolute min-[360px]:before:-left-[21px] min-[360px]:before:top-6 min-[360px]:before:h-2 min-[360px]:before:w-2 min-[360px]:before:rounded-full min-[360px]:before:bg-site-accent dark:min-[360px]:before:bg-amber-200"
    >
      <slot :item="item" />
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true }
  }
}
</script>
