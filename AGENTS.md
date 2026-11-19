# Navid Anindya’s site

## Work in this repository

- Use Node 22.12 or newer and `npm ci`. This site uses Nuxt 2, Vue 2, Tailwind CSS, and Nuxt Content. `npm run dev` starts Nuxt for UI work. `npm run generate` builds `dist` for Cloudflare Pages. Run `npm run preview:pages` from the repo root to serve that build with the Pages Functions and local D1.
- Run `npm run lint` and `npm run generate` for code changes. Check the generated HTML and affected routes when editing navigation, content, or metadata. Leave changes uncommitted for review until the user asks for a commit.
- For Pages Preview bindings, staging deployments, Spotify credentials, or counter migrations, follow [the Pages handoff](docs/pages-preview.md).

## Layout and interaction

- Start with `layouts/default.vue`. It owns the reading column, non-sticky header, Spotify line below the navbar, end-of-page links, and social footer. `SiteNavigation.vue` uses inline links from 500 px and a horizontal overlay below 500 px. Keep the menu from shifting page content. The footer wraps through 770 px and fits on one row from 771 px.
- Reuse `SiteBreadcrumbs.vue` and `SectionLinks.vue` for navigation. Breadcrumbs start at the home route, use section links for parents, and show the visible title for the current article, note, or project. Keep tag breadcrumbs in tag format and use the recovery navigation in `layouts/error.vue` for errors.
- Keep Space Grotesk, Roboto Mono, and the amber accents. Change palette tokens, prose, motion, and pointer-specific hover rules in `tailwind.config.js`. Light mode uses the dark background color as its text color and behind the header logo. `static/theme.js` sets the saved or system theme before render. `ThemePicker.vue` provides the animated Light, Dark, and System control.
- Reuse `components/icons/` and the local Iconoir SVGs in `static/icons/`. Tailwind adds the external-link indicator. External links open in a new tab with `rel="noopener noreferrer"`. Keep platform colors where the UI uses brand marks and supply meaningful alt text for content images.
- Use Tailwind Typography for reading content. Keep the table and code rules responsive. `ReadingContent.vue` renders Markdown images, code, and video through Vue components before mount. `SiteOverlay.vue` handles centered expansion, zoom, keyboard dismissal, and focus return. `SpotifyTrackPlayer.vue` uses the overlay on mobile and a regular embed on desktop.
- Render UI through Vue templates and state. Use template refs for focus or native control methods. Keep document queries and manual element creation out of Vue code. The theme bootstrap and browser visibility utility own page-level browser APIs.

## Writings, Notes & Finds, and tags

- Write Markdown in `content/writings/` or `content/notes/`. Preserve the published URL of an existing entry. Detail routes are `/writing/:slug` and `/notes/:slug`. Use `title`, `description`, an ISO date in `createdAt`, comma-separated `tags`, and `updatedAt` for an editorial update. Notes can use `sourceUrl` for a clickable source and local media under `static/notes/`. Keep screenshots and recordings at 16:9.
- Use `utils/content.js` for shared dates, slugs, tags, reading time, and previous/next order. `pages/tags/` builds tag pages from both collections and orders the tag index by entry count. Cards use linked tags and published dates. Writings show the author, and both detail routes show reading time, adjacent entries, and a view count.
- Keep the canonical share action in `CopyLinkButton.vue` on lists and details. The feedback sits above the right-aligned icon so copying a link never moves the title or icon. Preserve the archive notice on the original Spotify article.

## Fun Stuff and Spotify

- Use `ProjectCard.vue` for the Fun Stuff directory. Pass a title, description, and internal destination. Put project-specific content such as recent listening or latest-release art and links in its default slot. Music on Repeat, 7 Minutes, and the university Java lexical analyzer have their own internal pages.
- Add new 7 Minutes releases to `utils/band.js` with a date, performers, cover and alt text, Spotify track ID, and YouTube ID. This catalog drives the latest-release card, discography, and feeds. Keep the About and discography timelines on `TimelineList.vue` and reuse `SquareImage.vue` or `SquareMediaCard.vue` for local portraits and artwork.
- Live listening uses `GET /spotify`, `/spotify/recently-played`, and `/spotify/top-tracks` in `functions/spotify/`. Keep OAuth exchanges server-side and credentials in Pages bindings or ignored local secrets. The playback route distinguishes current, retained paused, and idle results. Report provider failures in server logs and keep the fixed public error text.
- Use `SpotifyTrackDetails.vue` for the recent track and ranked rows. Keep the Spotify track link with the artwork and album details, and request the top 10 from Spotify.
- `NowSpotify.vue` uses native fetch through `utils/spotifyPolling.js`. Refresh on route changes and every 60 seconds while visible and online. Keep one request in flight and clear timers and listeners on teardown. Check the three routes through Wrangler for live integration tests. See [the Pages handoff](docs/pages-preview.md#1-authorize-spotify) for consent and renewal.

## View counts and deployment

- `EntryViewCount.vue` sends one `POST /api/views` when a writing or note counter mounts. The Function updates a registered `kind` and `slug` atomically in D1 through `VIEWS_DB`. Keep the migration in `migrations/` and use the generated `.nuxt/entry_views.sql` and `.nuxt/entry_views_preview.sql` to register new entries while preserving current totals.
- Cloudflare Preview and Production share the `VIEWS_DB` binding. Set `VIEWS_TABLE` explicitly to `entry_views_preview` for Preview and `entry_views` for Production. Wrangler uses a separate local database. See [the Pages handoff](docs/pages-preview.md) for seeding, historical import order, and the deployment checks.

## Metadata, feeds, and PWA

- Add public pages to the share-card definitions in `utils/socialCards.js` and use `pageHead` for canonical, Open Graph, and Twitter metadata. `scripts/social-images.js` renders PNGs from the shared SVG template in `assets/og/` at build time. Preserve the site and author JSON-LD, plus article metadata on writings.
- `nuxt.config.js` generates RSS, Atom, JSON Feed, the sitemap, and the branded `404.html`. Feed entries come from writings, notes, and dated band releases. Check links in those outputs and in `static/robots.txt` and `static/llms.txt` when public URLs change. The writings index links to RSS.
- Nuxt PWA registers the Workbox worker. `SiteUpdateToast.vue` and `assets/service-worker/update.js` apply a waiting update when a reader selects Update now. `ConnectionStatus.vue` and the update prompt share `NotificationPill.vue`. Keep the notch clear of the navigation, suppress update prompts offline, and verify article navigation after reconnecting. Preview the generated build when changing worker behavior. Keep the adaptive SVG favicon, ICO fallback, and PWA icon together.
