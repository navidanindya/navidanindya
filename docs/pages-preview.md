# Cloudflare Pages and Spotify handoff

Set up the **Preview** environment, publish the reviewed changes to `staging`, then test the four API routes on that deployment. The production Pages settings and legacy counters can stay as they are through preview review.

## 1. Authorize Spotify

1. In the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/), open the app and register `http://127.0.0.1:8080/callback`. Use the app's Client ID and Client Secret. A [Development Mode app](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide) needs an owner with Spotify Premium; authorize with the account whose listening activity should appear on the site.
2. Use the [Spotify Authorization Code flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) to request and exchange a code. Check the returned `state` before exchanging the authorization code. Request all three scopes: `user-read-currently-playing`, `user-read-recently-played`, and `user-top-read`.
3. Save the returned `refresh_token` privately. Use it in the next step. The Function exchanges it for short-lived access tokens.

Spotify's [six-month renewal window](https://developer.spotify.com/blog/2026-06-18-refresh-token-expiration) starts on the consent date. Schedule a reminder one month before expiry using the date of your latest consent. After renewal, reschedule from the new consent date. To renew, repeat consent, replace `srt` in each Pages environment using that token, redeploy, and retest the three Spotify routes. If Spotify logs `invalid_grant`, reauthorize rather than retrying the same token.

## 2. Configure Cloudflare Preview

1. Under **Workers & Pages → your Pages project → Settings → Builds & deployments**, confirm the production branch and enable `staging` under [Preview branch control](https://developers.cloudflare.com/pages/configuration/branch-build-controls/#preview-branch-control). `staging` must be a preview branch. Keep the repository root, build command `npm run generate`, and output directory `dist`. The project requires Node 22.12 or newer; set [`NODE_VERSION`](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions) in Preview if its build image defaults to an older Node.
2. In **Pages project → Settings → Preview → Bindings**, bind the D1 database `navidanindya-sites-view` under the name `VIEWS_DB`. Under **Preview → Variables and Secrets**, set the text variable `VIEWS_TABLE` to `entry_views_preview`. At Production cutover, point the same binding name at the same database and set the Production text variable to `entry_views`. A missing or invalid table variable stops writes. [Cloudflare D1 bindings](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases)
3. In **Pages project → Settings → Preview → Variables and Secrets**, add these [encrypted secrets](https://developers.cloudflare.com/pages/functions/bindings/#secrets):

   | Name | Value |
   | --- | --- |
   | `scid` | Spotify app Client ID |
   | `scs` | Spotify app Client Secret |
   | `srt` | Refresh token from the consent flow |

Apply these settings before the next preview deployment. The dashboard setup uses your Cloudflare login.

## 3. Create and seed the Preview table in the Cloudflare dashboard

Open **Cloudflare Dashboard → D1 → navidanindya-sites-view → Console**. Run each block separately. The first block comes from `migrations/0002_entry_views_preview.sql`. The second registers the four released writings. [D1 Console](https://developers.cloudflare.com/d1/get-started/)

```sql
CREATE TABLE IF NOT EXISTS entry_views_preview (
  kind TEXT NOT NULL CHECK (kind IN ('writing', 'note')),
  slug TEXT NOT NULL CHECK (length(slug) BETWEEN 1 AND 200),
  count INTEGER NOT NULL CHECK (count >= 0),
  PRIMARY KEY (kind, slug)
) WITHOUT ROWID;
```

```sql
INSERT INTO entry_views_preview (kind, slug, count) VALUES
  ('writing', 'first-writing', 0),
  ('writing', 'lyric-attempts', 0),
  ('writing', 'on-optimistic-nihilism', 0),
  ('writing', 'spotify-now-playing-nuxt', 0)
ON CONFLICT (kind, slug) DO NOTHING;
```

Check the result with:

```sql
SELECT kind, slug, count FROM entry_views_preview ORDER BY kind, slug;
```

A fresh table should show four writing rows with zero counts. Rerunning the seed preserves existing counts. Use the Preview table for test visits and later draft content.

For later PRs, `npm run generate` writes `.nuxt/entry_views_preview.sql` and `.nuxt/entry_views.sql`. Open the file for the intended environment and paste its SQL into the same Console. Merging into `staging` generates the files as part of the build. Applying them is a separate step. The migration files use `CREATE TABLE IF NOT EXISTS`, so Wrangler can record them later even if the dashboard created the tables first.

## 4. Publish and check staging

1. After reviewing and committing the feature groups on `feat/personal-site-refresh`, fetch the current `staging` and check the comparison. Push the feature branch and merge its PR into `staging`. That update should trigger the Cloudflare Git build. Leave the production PR for after the preview review.
2. Open the successful **Preview** deployment in Cloudflare. Check its branch and commit SHA. Use its immutable [deployment URL](https://developers.cloudflare.com/pages/configuration/preview-deployments/#preview-aliases) for API checks; the staging alias points to the newest build. If the preview is protected by Cloudflare Access, sign in and run the checks in the browser's Network panel or use your approved Access credentials with curl.
3. Play a song before checking the Spotify routes. Each of these requests should return HTTP 200. The last call counts as a real view on the preview database.

```bash
PREVIEW_URL=https://REPLACE_WITH_DEPLOYMENT_HOST

curl -fsS "$PREVIEW_URL/spotify"
curl -fsS "$PREVIEW_URL/spotify/recently-played"
curl -fsS "$PREVIEW_URL/spotify/top-tracks"

curl -fsS "$PREVIEW_URL/api/views" -H 'Content-Type: application/json' \
  --data '{"kind":"writing","slug":"spotify-now-playing-nuxt"}'
```

| Route | What to verify |
| --- | --- |
| `GET /spotify` | Plain text with the current song and artist. After pausing or stopping, allow the 15-second edge cache to expire. Spotify may retain a paused song (`Last played`) or return an idle result. |
| `GET /spotify/recently-played` | JSON with `name`, `artists`, `album` (name and thumbnail), and `url` for the latest listening-history entry. An empty history returns JSON `null`. |
| `GET /spotify/top-tracks` | JSON with an `items` array of up to 10 tracks. Confirm Music on Repeat shows the same tracks with artist, album, and artwork. |
| `POST /api/views` | JSON `{"count":n}`. Repeat a request and confirm the count rises by one when you're the only visitor. Send a valid kind with an unknown slug and expect HTTP 404. |

In the browser, check that playback refreshes on route change and after 60 seconds in a visible tab. Confirm recent history on Fun Stuff and the view counter on a writing. After the first notes are published, repeat the counter check with a published note. If an API fails, check the deployment's [Function logs](https://developers.cloudflare.com/pages/functions/debugging-and-logging/). A Spotify HTTP 403 calls for checking account access and scopes; a view HTTP 404 calls for checking that the slug was seeded. A view HTTP 500 calls for checking the Preview binding and schema.

## Local rehearsal and production cutover

Use the same local Node requirement. For live Spotify locally, copy `.env.example` to ignored `.dev.vars`, fill in the same three values, and restart Wrangler. Local D1 needs no cloud credentials.

```bash
npm run generate
npx wrangler d1 migrations apply VIEWS_DB --local --config wrangler.local.toml
npx wrangler d1 execute VIEWS_DB --local --config wrangler.local.toml --file .nuxt/entry_views.sql
npm run preview:pages
```

Run the same checks against `http://127.0.0.1:8788`. At Production cutover, create `entry_views` in the shared database using `migrations/0001_entry_views.sql`. Pause legacy counter writes, take a fresh Firestore export, and import and verify its totals in `entry_views` before applying the Production seed or switching traffic. Configure the Production binding and table selection, then verify the four endpoints after deployment. Keep Firebase until the totals and live increments are confirmed.
