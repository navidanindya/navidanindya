<template>
  <div>
    <HomeComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/Home.vue'

export default {
  metaInfo() {
    return {
      title: 'NavidAnindya.',
    };
  },
  name: 'Home',
  components: {
    HomeComponent
  }
}
</script>
