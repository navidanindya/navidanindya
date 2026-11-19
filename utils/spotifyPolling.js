import { isPageVisible, onPageVisibility } from './pageVisibility'

// Poll one Spotify URL while visible, waiting for each request before scheduling another.
export const pollSpotify = (path, delay, update, fail) => {
  let timer
  let controller
  let stopped = false
  let retryAt = 0
  let backoff = delay

  // Only visible, connected pages may start a request.
  const isActive = () => !stopped && isPageVisible() && navigator.onLine

  // Cancel any scheduled tick before replacing it.
  const schedule = (wait) => {
    clearTimeout(timer)
    timer = setTimeout(read, wait)
  }

  // Read once, update the widget, then schedule its next read.
  const read = async () => {
    if (!isActive() || controller) { return }
    controller = new AbortController()
    const { signal } = controller
    try {
      const response = await fetch(path, { signal })
      if (response.status === 429) {
        const seconds = Number(response.headers.get('Retry-After'))
        if (seconds > 0) { retryAt = Date.now() + seconds * 1000 }
      }
      if (!response.ok) { throw new Error('Spotify request failed') }
      const text = await response.text()
      if (!signal.aborted) {
        update(text)
        backoff = delay
        retryAt = 0
      }
    } catch {
      if (!signal.aborted) {
        backoff = Math.min(backoff * 2, 300000)
        // Keep the retry delay when navigation or visibility requests a refresh.
        retryAt = Math.max(retryAt, Date.now() + backoff)
        fail()
      }
    } finally {
      controller = undefined
      if (isActive()) {
        schedule(Math.max(signal.aborted ? 0 : backoff, retryAt - Date.now()))
      }
    }
  }

  // Refresh on demand or pause when the page is hidden or offline.
  const refresh = () => {
    clearTimeout(timer)
    if (!isActive()) {
      controller?.abort()
    } else if (!controller) {
      schedule(Math.max(0, retryAt - Date.now()))
    }
  }

  const stopWatchingVisibility = onPageVisibility(refresh)
  window.addEventListener('online', refresh)
  window.addEventListener('offline', refresh)
  refresh()

  // Release the timer, request, and listeners when the widget leaves the page.
  const stop = () => {
    stopped = true
    clearTimeout(timer)
    controller?.abort()
    stopWatchingVisibility()
    window.removeEventListener('online', refresh)
    window.removeEventListener('offline', refresh)
  }

  return { refresh, stop }
}
