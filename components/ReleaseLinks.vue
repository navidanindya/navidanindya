<template>
  <div class="mt-3 flex flex-col items-start gap-2 text-sm">
    <a :href="release.spotifyUrl" target="_blank" rel="noopener noreferrer" :aria-label="'Open ' + release.title + ' in Spotify'" class="flex items-center gap-1.5">
      <social-icon name="spotify" class="h-4 w-4 shrink-0 text-[#1ED760]" />
      <span v-text="'Open in Spotify'" />
    </a>
    <a
      v-if="release.youtubeUrl"
      :href="release.youtubeUrl"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="'Open ' + release.title + ' in YouTube'"
      class="flex items-center gap-1.5"
    >
      <social-icon name="youtube" class="h-4 w-4 shrink-0 text-[#FF0000]" />
      <span v-text="'Open in YouTube'" />
    </a>
  </div>
</template>

<script>
import SocialIcon from '~/components/icons/SocialIcon.vue'

export default {
  components: { SocialIcon },
  props: {
    release: { type: Object, required: true }
  }
}
</script>
