import { fetchSpotify } from './index.js'

// Return the latest Spotify history item for the project card and music page.
export const onRequestGet = async ({ env }) => {
  const headers = { 'Cache-Control': 'no-store' }
  try {
    const response = await fetchSpotify(env, '/me/player/recently-played?limit=1')
    if (!response.ok) {
      const retryAfter = response.headers.get('Retry-After')
      // eslint-disable-next-line no-console
      console.log('spotify_history_failed', { status: response.status, body: await response.text() })
      if (response.status === 429) {
        if (retryAfter) { headers['Retry-After'] = retryAfter }
        return new Response('Failed to fetch data. :(', { status: 429, headers })
      }
      throw new Error('Spotify history request failed')
    }
    const { items } = await response.json()
    if (!items.length) { return Response.json(null, { headers }) }
    const { track } = items[0]
    return Response.json({
      name: track.name,
      artists: track.artists.map(artist => artist.name),
      // Send the album name and just the thumbnail used by the track row.
      album: { name: track.album.name, images: track.album.images.slice(-1) },
      url: track.external_urls.spotify
    }, { headers })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('spotify_history_unavailable', { message: error.message })
    return new Response('Failed to fetch data. :(', { status: 500, headers })
  }
}
