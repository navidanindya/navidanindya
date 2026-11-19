<template>
  <notification-pill id="site-update-toast" :visible="available" class="max-sm:gap-1 max-sm:px-1">
    <p role="status" class="flex items-center gap-1">
      <site-icon name="refresh" class="h-3 w-3 shrink-0 text-site-accent dark:text-site-accent-dark" />
      Site update available:
    </p>
    <!-- Match the prose link weight and underline on both actions. -->
    <div class="flex shrink-0 items-center gap-1 [&>button]:min-h-6 [&>button]:font-medium [&>button]:underline [&>button]:underline-offset-[.16em]">
      <button
        id="apply-site-update"
        type="button"
        class="text-site-accent dark:text-site-accent-dark"
        :disabled="applying"
        @click="applyUpdate"
      >
        {{ applying ? 'Updating…' : 'Update now' }}
      </button>
      <span aria-hidden="true" class="text-site-accent dark:text-site-accent-dark">·</span>
      <button id="dismiss-site-update" type="button" :disabled="applying" @click="dismiss">
        Hide
      </button>
    </div>
  </notification-pill>
</template>

<script>
import SiteIcon from '~/components/icons/SiteIcon.vue'
import { isPageVisible, onPageVisibility } from '~/utils/pageVisibility'

export default {
  components: { SiteIcon },
  // Keep the toast hidden until an update is waiting.
  data () {
    return { available: false, applying: false }
  },
  // Reuse the worker registered by Nuxt PWA.
  async mounted () {
    if (!('serviceWorker' in navigator)) { return }
    this.workerContainer = navigator.serviceWorker
    await window.$workbox
    const registration = await navigator.serviceWorker.getRegistration()
    if (!this.workerContainer || !registration) { return }

    this.registration = registration
    registration.addEventListener('updatefound', this.watchInstallation)
    this.workerContainer.addEventListener('controllerchange', this.onControllerChange)
    this.stopWatchingVisibility = onPageVisibility(this.checkForUpdate)
    window.addEventListener('offline', this.showWaitingUpdate)
    window.addEventListener('online', this.onReconnect)
    this.watchInstallation()
    this.checkForUpdate()
  },
  // Remove worker and browser listeners when the layout is destroyed.
  beforeDestroy () {
    this.registration?.removeEventListener('updatefound', this.watchInstallation)
    this.installingWorker?.removeEventListener('statechange', this.showWaitingUpdate)
    this.workerContainer?.removeEventListener('controllerchange', this.onControllerChange)
    this.stopWatchingVisibility?.()
    window.removeEventListener('offline', this.showWaitingUpdate)
    window.removeEventListener('online', this.onReconnect)
    this.workerContainer = null
  },
  methods: {
    // Observe the current installation and any update that finished before mounting.
    watchInstallation () {
      this.installingWorker?.removeEventListener('statechange', this.showWaitingUpdate)
      this.installingWorker = this.registration.installing
      this.installingWorker?.addEventListener('statechange', this.showWaitingUpdate)
      this.showWaitingUpdate()
    },
    // Offer updates only online and after the first worker is active.
    showWaitingUpdate () {
      const { active, waiting } = this.registration
      this.available = Boolean(navigator.onLine && active && waiting && waiting !== this.dismissedWorker)
    },
    // Restore any pending prompt and check for newer versions after reconnecting.
    onReconnect () {
      this.showWaitingUpdate()
      this.checkForUpdate()
    },
    // Check on load or when the visitor returns to the tab or reconnects.
    async checkForUpdate () {
      if (!isPageVisible() || !navigator.onLine) { return }
      try {
        await this.registration.update()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Could not check for a site update', { message: error.message })
      }
    },
    // Hide this version’s prompt for the rest of the page visit.
    dismiss () {
      this.dismissedWorker = this.registration.waiting
      this.available = false
    },
    // Ask the installed worker to take control before reloading this tab.
    applyUpdate () {
      const worker = this.registration.waiting
      if (!navigator.onLine || !worker) {
        this.available = false
        return
      }
      this.applying = true
      worker.postMessage({ type: 'SKIP_WAITING' })
    },
    // Only reload the tab where the visitor accepted the update.
    onControllerChange () {
      if (this.applying) {
        window.location.reload()
        return
      }
      this.available = false
    }
  }
}
</script>
