/* global caches */

// The Pages endpoints read Spotify credentials only from Cloudflare bindings.
export const getAccessToken = async (env) => {
  if (!env.scid || !env.scs || !env.srt) {
    throw new Error('Missing Pages settings: scid, scs, or srt.')
  }
  // Exchange the refresh token for an access token without exposing Pages secrets.
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${env.scid}:${env.scs}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: env.srt }).toString()
  })
  const token = await response.json()
  if (!response.ok) {
    // eslint-disable-next-line no-console -- Keep provider errors in Cloudflare logs, without credentials.
    console.log('spotify_token_failed', { status: response.status, error: token.error, description: token.error_description })
    throw new Error('Spotify token request failed.')
  }
  if (!token.access_token) { throw new Error('Spotify access token missing.') }
  // A replacement token needs a manual Pages update; the access token is still usable.
  if (token.refresh_token && token.refresh_token !== env.srt) {
    // eslint-disable-next-line no-console -- Log the required action without logging the new token.
    console.log('spotify_refresh_token_changed', { message: 'Reauthorize the app and update srt in Pages.' })
  }
  return token.access_token
}

// Apply the server-only access token to each Spotify Web API request.
export const fetchSpotify = async (env, path) => fetch('https://api.spotify.com/v1' + path, {
  headers: { Authorization: `Bearer ${await getAccessToken(env)}` }
})

// Serve live playback text with a short edge cache shared by visitors.
export const onRequestGet = async ({ env, request, waitUntil }) => {
  const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' }
  try {
    // Normalize the key so query parameters do not bypass the edge cache.
    const key = new URL('/spotify', request.url).href
    const cached = await caches.default.match(key)
    if (cached) { return new Response(cached.body, { headers }) }
    const response = await fetchSpotify(env, '/me/player/currently-playing')
    // Tell the browser when Spotify allows another request.
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After')
      // eslint-disable-next-line no-console
      console.log('spotify_now_playing_limited', { status: response.status, retryAfter })
      if (retryAfter) { headers['Retry-After'] = retryAfter }
      return new Response('Failed to fetch data. :(', { status: 429, headers })
    }
    if (!response.ok) { throw new Error(`Spotify playback request failed (HTTP ${response.status}): ${await response.text()}`) }
    // A successful empty response is idle. A retained paused track is Last played.
    let message = 'Nothing playing right now.'
    if (response.status !== 204) {
      const { item, is_playing: isPlaying } = await response.json()
      if (item) {
        const artists = item.artists.map(artist => artist.name).join(', ')
        message = `${isPlaying ? 'Now playing:' : 'Last played:'} ${item.name} by ${artists}.`
      }
    }
    // Share successful results for 15 seconds while keeping browser requests fresh.
    waitUntil(caches.default.put(key, new Response(message, { headers: { 'Cache-Control': 'public, max-age=15' } })))
    return new Response(message, { headers })
  } catch (error) {
    // Keep detailed diagnostics in logs and one fixed message in the public response.
    // eslint-disable-next-line no-console -- Do not log malformed token payloads.
    console.log('spotify_now_playing_failed', { message: error instanceof SyntaxError ? 'Invalid Spotify JSON.' : error.message })
    return new Response('Failed to fetch data. :(', { status: 500, headers })
  }
}
