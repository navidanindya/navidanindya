---
title: Using the Spotify API to show Now Playing in Nuxt.js
description: A simple guide on how to use the Spotify API to show off one's music taste using Nuxt.js.
createdAt: December 01, 2021
---

I am an avid music listener. I love finding out and listening to new music almost everyday. I use Spotify as my music subscription service and I personally love it. As someone who is into music so much, I wanted to show what song I'm currently listening to.

In order to do this, I needed to use the [Spotify API](https://developer.spotify.com/documentation/web-api/) and add them to Nuxt.js using the [plugins module](https://nuxtjs.org/docs/directory-structure/plugins). The Spotify API is a bit painful to setup, but let's see how it can be done.

### Create an application in Spotify Developer Dashboard

* First go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
* Log in with your Spotify account.
* Click `Create an App`.
* Add a name (eg. My Website Now Playing Viewer) and a description.
* Click on `Show Client Secret`.
* Save both `Client ID` and `Client Secret`.
* Add `http://localhost:8080` as redirect URI. It can also be the one where your local version of your site is running (eg. `http://localhost:5000`).

The reason we're doing this is to get a refresh token from the Spotify Web API so we can authenticate with it to get our information.

We'll be using the [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/) process of the Spotify API to get the refresh token and then use it to get our track information.

### Get the refresh token and authenticate

We need to go to an URL first to authorize your account by logging in using you spotify account and giving permission of [scopes](https://developer.spotify.com/documentation/general/guides/authorization/scopes/) that we will be using. These scopes let you have control on what you can share after authorizing your account. These are basically [OAuth 2.0 scopes](https://oauth.net/2/scope/).

Here's the URL:

```http
https://accounts.spotify.com/authorize?client_id=8e94bde7dd
b84a1f7a0e51bf3bc95be8&response_type=code&redirect_uri=http
%3A%2F%2Flocalhost:8080&scope=user-read-currently-playing,
user-read-playback-state,
user-read-recently-played
```

We need to replace the `client_id` with the `Client ID` we saved from before. The `redirect_uri` is the same as your local application redirect URI. It can be anything you set it.

The `scope` is what you give permission to access from the Spotify API. In this case, I used the `user-read-currently-playing`, `user-read-playback-state` and `user-read-recently-played` scopes. You can find a list of Spotify authorization scopes right [here](https://developer.spotify.com/documentation/general/guides/authorization/scopes/).

After authorization, it will redirect you to the `redirect_uri` given to the URL. That URL will have a `code` query parameter. We need this value.

```http
http://localhost:8080/callback?code=AQC7P..gBoDU
```

We will use this returned code and a Base64 encoded string using the Client ID and Client Secret to retrieve the refresh token we need to access Spotify API.

The format of the Base64 string is `client_id:client_secret`.

```js
/*
 * This will generate a Base64 string from the given format.
 * You can write this in any developer console on any browser.
 */

btoa('client_id:client_secret')

// Outputs a Base64 string.
```

Next, let's go to a terminal and make a `curl` request.

```bash
curl -H "Authorization: Basic
[Base64 client_id:client_secret string without brackets]"
-d grant_type=authorization_code -d
code=[code from the redirect URI after authorization
without brackets]
-d redirect_uri=http://localhost:8080
https://accounts.spotify.com/api/token
```

This `curl` request will return a JSON response with our much needed `refresh_token` to access Spotify API. This token does not expire unless the user revokes access, so we can use this to access the API.

Let's save this.

Whew! That was a lot of work to get a refresh token. Now let's move on to preparing our Nuxt.js application to fetch data using this refresh token.

### Use the Spotify API in Nuxt.js

Assuming you have already created a Nuxt.js application, let's save the Client ID, Client Secret and the Refresh Token in environment variables. We can use our trusty `.env` file for this.

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_RT=
```

In order to access these from the `.env` file, we need to configure the `nuxt.config.js` file a bit.

We will use the [env property](https://nuxtjs.org/docs/configuration-glossary/configuration-env) to define the variables.

`nuxt.config.js`

```js
env: {
  spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  spotifyRefreshToken: process.env.SPOTIFY_RT
}
```

Now let's write the plugin to include to our application. We will write functions to use the Client ID, Client Secret and the Refresh Token to retrieve an access token that will get us our data.

`plugins/spotify.js`

```js
const clientID = process.env.spotifyClientID
const clientSecret = process.env.spotifyClientSecret
const refreshToken = process.env.spotifyRefreshToken

const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

// This gets the access token from Spotify to connect to the API using provided refresh token.
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
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
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
export const getNowPlaying = async () => {
  const { access_token: accessToken } = await getAccessToken()
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

```

Now let's write a Vue component to call these functions to get our currently playing track.

In my website, I used Tailwind CSS to style the component. But you can use whatever you prefer to style it.

`components/NowSpotify.vue`

```html
<template>
  <section class="flexed-line justify-center mt-5">
    <!-- Spotify Icon Component here -->
    <SpotifyIcon />
    <!-- This uses Nuxt.js component auto discovery -->
    <div class="flex items-center text-yellow-600 text-xs ml-2">
      <span>{{ currentTrackStr }}</span>
    </div>
  </section>
</template>

<script>
import { getNowPlaying } from '../plugins/spotify'
export default {
  data () {
    return {
      currentTrackStr: 'Nothing playing right now.'
    }
  },
  watch: {
    '$route.path' () {
      this.currentTrack()
    }
  },
  beforeMount () {
    this.currentTrack()
  },
  methods: {
    async currentTrack () {
      try {
        const response = await getNowPlaying()
        if (response.status === 200) {
          const { item, is_playing: np } = await response.json()
          this.currentTrackStr = `${np ? 'Now playing:' : 'Last played:'} ${item.name}
                                  by ${item.artists.map(artist => artist.name).join(', ')}.`
        }
      } catch (e) {
        this.currentTrackStr = 'Couldn\'t fetch data :('
      }
    }
  }
}
</script>

```

This component can then be used anywhere in any `pages` or `layouts` in the entire Nuxt.js application to fetch data and show your currently playing track from Spotify!

*Note*: This code is executed in the client side as it is being used as a Nuxt.js plugin and being called from the `beforeMount()` lifecycle hook of Vue.js.

*Note 2:* The `watch` property used in the component listens for the Nuxt/Vue router path to change and calls the `currentTrack()` function everytime the route changes to update the track information. I used this trick without using a `setTimeout()` or a `setInterval()` approach to not cause any memory leak issues.

*Note 3:* This writing is heavily inspired from [Lee Robinson's article](https://leerob.io/blog/spotify-api-nextjs) on this very same topic. Check it out if you want to implement this on a React/Next.js project.

You can see this code in action in this site down below.
