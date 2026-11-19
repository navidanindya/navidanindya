// A dated release appears in the discography, on Fun Stuff, and in the site feeds.
export const bandReleases = [
  { title: 'Ocean Song', releaseDate: '2026-05-25', performers: '7 Minutes', id: '2o6KDmnKlbwAcURkIAFAQG', cover: '/7-minutes/ocean-song.webp', coverAlt: 'Ocean Song cover with pale lettering over rippling blue water', youtubeId: 'FKxeHPgTDTY' },
  { title: 'Shobai Chole Geche', releaseDate: '2025-12-30', performers: '7 Minutes', id: '1Dq1dU9f6WkTSrzOZ7KERc', cover: '/7-minutes/shobai-chole-geche.webp', coverAlt: 'Shobai Chole Geche cover with a lone figure on an amber-lit city street at night', youtubeId: 'utyy9UZ6Syc' },
  { title: 'Kalo Megh', releaseDate: '2025-04-10', performers: '7 Minutes, Nahar, Nagib Hawk', id: '6re6zl6ePdnL9zcacGV5NU', cover: '/7-minutes/kalo-megh.webp', coverAlt: 'Kalo Megh cover with a boat in the surf under a grey sky', youtubeId: 'WQYojzpXoz0' }
]
// Keep the card and discography ordered by date regardless of entry order.
  .sort((first, second) => second.releaseDate.localeCompare(first.releaseDate))
  .map(release => ({
    ...release,
    year: release.releaseDate.slice(0, 4),
    anchor: `release-${release.id}`,
    trackUrl: `https://open.spotify.com/track/${release.id}`,
    embedUrl: `https://open.spotify.com/embed/track/${release.id}`,
    youtubeUrl: `https://www.youtube.com/watch?v=${release.youtubeId}`
  }))
