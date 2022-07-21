// Reference: https://leerob.io/snippets/spotify-top-tracks
// This gets the access token from Spotify to connect to the API using provided refresh token.
const getAccessToken = async (basic, refreshToken) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).toString()
  })
  return response.json()
}

// Get the current now playing track of given user access token.
export const getNowPlaying = async (basic, refreshToken) => {
  const { access_token: accessToken } = await getAccessToken(basic, refreshToken)
  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export async function onRequestGet({ env }) {
  const basic = btoa(`${env.scid}:${env.scs}`)

  const res = await getNowPlaying(basic, env.srt)
  let currentTrackStr = ''
  try {
    if (res.status === 200) {
      const { item, is_playing: np } = await res.json()

      currentTrackStr = `${np ? 'Now playing:' : 'Last played:'} ${item.name} by ${item.artists.map(artist => artist.name).join(', ')}.`.trim()
    } else if (res.status === 204) {
      currentTrackStr = 'Nothing playing right now.'
    }
  } catch (e) {
    currentTrackStr = 'Couldn\'t fetch data :('
  }

  return new Response(currentTrackStr)
}
