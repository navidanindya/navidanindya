import { fetchSpotify } from './index.js'

// Request 10 tracks from Spotify's default period of approximately six months.
export const onRequestGet = async ({ env }) => {
  const headers = { 'Cache-Control': 'no-store' }
  try {
    const response = await fetchSpotify(env, '/me/top/tracks?limit=10')
    // Include Spotify's error body in server logs through the catch block below.
    if (!response.ok) { throw new Error(`Spotify top tracks request failed (HTTP ${response.status}): ${await response.text()}`) }
    // Return Spotify track data to the browser; keep the access token on Cloudflare.
    return Response.json(await response.json(), { headers })
  } catch (error) {
    // eslint-disable-next-line no-console -- Use Cloudflare logs for diagnostics, not public error messages.
    console.log('spotify_top_tracks_failed', { message: error instanceof SyntaxError ? 'Invalid Spotify JSON.' : error.message })
    return new Response('Failed to fetch data. :(', { status: 500, headers })
  }
}
