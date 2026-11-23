/* global caches */
import { fetchBandReleases } from '../../utils/band.js'

// Cache only successful public catalog responses at the edge.
export const onRequestGet = async ({ env, request, waitUntil }) => {
  const key = new URL('/spotify/releases', request.url).href
  const headers = { 'Cache-Control': 'no-store' }
  try {
    const cached = await caches.default.match(key)
    if (cached) { return Response.json(await cached.json(), { headers }) }

    const releases = await fetchBandReleases(env)
    waitUntil(caches.default.put(key, Response.json(releases, {
      headers: { 'Cache-Control': 'public, max-age=900' }
    })))
    return Response.json(releases, { headers })
  } catch (error) {
    // eslint-disable-next-line no-console -- Keep credentials and provider details out of responses.
    console.error('Spotify release catalog failed.', { message: error.message })
    return Response.json({ error: 'Could not load Spotify releases.' }, { status: 502, headers })
  }
}
