<template>
  <site-icon :name="name" />
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon },
  props: {
    name: { type: String, required: true }
  }
}
</script>
