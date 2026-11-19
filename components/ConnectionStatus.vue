<template>
  <div id="connection-status" role="status">
    <notification-pill :visible="Boolean(status)">
      <p class="flex items-center gap-2 font-semibold">
        <site-icon
          :name="status"
          class="h-4 w-4"
          :class="status === 'offline' ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'"
        />
        {{ status === 'offline' ? 'You’re offline' : 'Back online' }}
      </p>
    </notification-pill>
  </div>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'

export default {
  components: { SiteIcon },
  // Start with an empty live region so a connection change can be announced.
  data () {
    return { status: '' }
  },
  // Read the browser signal and subscribe to changes.
  mounted () {
    if (!navigator.onLine) { this.status = 'offline' }
    window.addEventListener('offline', this.updateConnection)
    window.addEventListener('online', this.updateConnection)
  },
  // Clear the reconnect timer and listeners when the layout is removed.
  beforeDestroy () {
    clearTimeout(this.reconnectTimer)
    window.removeEventListener('offline', this.updateConnection)
    window.removeEventListener('online', this.updateConnection)
  },
  methods: {
    // Keep offline visible and dismiss the reconnect message after four seconds.
    updateConnection () {
      clearTimeout(this.reconnectTimer)
      this.status = navigator.onLine ? 'online' : 'offline'
      if (this.status === 'online') {
        this.reconnectTimer = setTimeout(() => { this.status = '' }, 4000)
      }
    }
  }
}
</script>
