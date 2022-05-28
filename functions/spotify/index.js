// Reference: https://leerob.io/snippets/spotify-top-tracks
export async function onRequestGet({ env }) {
  const basic = Buffer.from(`${env.spotifyClientID}:${env.spotifyClientSecret}`).toString('base64')
  const res = await getNowPlaying(basic, env.spotifyRefreshToken)

  return new Response(res)
}

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

// Gets the top playing tracks of given user access token.
export const getTopTracks = async (basic, refreshToken) => {
  const { access_token: accessToken } = await getAccessToken(basic, refreshToken)
  return fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
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
