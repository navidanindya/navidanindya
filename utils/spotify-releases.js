let cached
let pending
let expiresAt = 0

// Share the catalog across navigation in this tab and clear it when it expires.
export const readSpotifyReleases = () => {
  if (cached && Date.now() < expiresAt) { return Promise.resolve(cached) }
  cached = undefined
  if (!pending) {
    pending = fetch('/spotify/releases')
      .then((response) => {
        if (!response.ok) { throw new Error(`Spotify releases unavailable (HTTP ${response.status}).`) }
        return response.json()
      })
      .then((releases) => {
        cached = releases
        expiresAt = Date.now() + 5 * 60 * 1000
        return releases
      })
      .finally(() => { pending = undefined })
  }
  return pending
}
