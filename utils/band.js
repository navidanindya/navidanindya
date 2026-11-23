// Preserve links already published in feed entries for these three releases.
const publishedReleases = {
  '7Mnp2KlVf0KNFMztQh6bie': { title: 'Ocean Song', date: '2026-05-25', artists: '7 Minutes', track: '2o6KDmnKlbwAcURkIAFAQG', youtube: 'FKxeHPgTDTY' },
  '4SCiJJVl02GVWQcC1cmiYH': { title: 'Shobai Chole Geche', date: '2025-12-30', artists: '7 Minutes', track: '1Dq1dU9f6WkTSrzOZ7KERc', youtube: 'utyy9UZ6Syc' },
  '512QhW7T6LnSL8IW0ha3TK': { title: 'Kalo Megh', date: '2025-04-10', artists: '7 Minutes, Nahar, Nagib Hawk', track: '6re6zl6ePdnL9zcacGV5NU', youtube: 'WQYojzpXoz0' }
}

// Retain the published feed items when running a build without Spotify access.
export const bandFeedHistory = Object.values(publishedReleases).map(({ title, date, artists, track }) => ({
  title, releaseDate: date, performers: artists, anchor: `release-${track}`
}))

// Retry a transient Spotify failure once and respect rate limiting.
const spotifyJson = async (url, options) => {
  for (let attempt = 0; attempt < 2; attempt++) {
    let response
    try {
      response = await fetch(url, { ...options, redirect: 'manual', signal: AbortSignal.timeout(8000) })
      if (response.status >= 500) {
        await response.body?.cancel()
        throw new Error(`Spotify catalog request returned HTTP ${response.status}.`)
      }
    } catch (error) {
      if (attempt) { throw error }
      // eslint-disable-next-line no-console -- Log provider failures without credentials.
      console.warn('Retrying Spotify catalog request.', { message: error.message })
      await new Promise(resolve => setTimeout(resolve, 500))
      continue
    }
    if (!response.ok) {
      await response.body?.cancel()
      throw new Error(`Spotify catalog request returned HTTP ${response.status}.`)
    }
    return response.json()
  }
}

// Read all artist releases with an application token. This is called only on the server.
export const fetchBandReleases = async ({ scid, scs }) => {
  if (!scid || !scs) { throw new Error('Missing Spotify application credentials.') }
  const { access_token: token } = await spotifyJson('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${scid}:${scs}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }).toString()
  })
  if (!token) { throw new Error('Spotify did not return an application token.') }

  const catalog = new URL('https://api.spotify.com/v1/artists/0m782AcyIPYEovTy9uTxR9/albums?include_groups=album,single&market=BD&limit=10')
  const albums = new Map()
  const visited = new Set()
  for (let page = catalog; page;) {
    if (page.origin !== catalog.origin || page.pathname !== catalog.pathname || visited.has(page.href)) {
      throw new Error('Spotify returned an invalid next catalog page.')
    }
    visited.add(page.href)
    const { items, next } = await spotifyJson(page, { headers: { Authorization: `Bearer ${token}` } })
    for (const item of items) { albums.set(item.id, item) }
    page = next ? new URL(next) : null
  }

  return [...albums.values()]
    .sort((a, b) => b.release_date.localeCompare(a.release_date) || a.id.localeCompare(b.id))
    .map((album) => {
      const previous = publishedReleases[album.id]
      const id = previous?.track || album.id
      const resource = previous ? `track/${id}` : `album/${id}`
      return {
        id,
        title: album.name,
        releaseDate: album.release_date,
        year: album.release_date.slice(0, 4),
        type: album.album_type === 'album' ? 'Album' : 'Single',
        performers: album.artists.map(artist => artist.name).join(', '),
        cover: album.images[0]?.url,
        coverAlt: `Cover art for ${album.name}`,
        anchor: `release-${id}`,
        spotifyUrl: `https://open.spotify.com/${resource}`,
        embedUrl: `https://open.spotify.com/embed/${resource}`,
        youtubeUrl: previous ? `https://www.youtube.com/watch?v=${previous.youtube}` : null
      }
    })
}
