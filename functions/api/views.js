import { quoteViewTable } from '../../utils/view-table.js'

// Increment an existing counter or register a real deployed entry on its first view.
export const onRequestPost = async ({ request, env }) => {
  const headers = { 'Cache-Control': 'no-store' }
  // Require JSON so another website cannot submit views with a plain HTML form.
  if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return Response.json({ error: 'Send the entry as application/json.' }, { status: 415, headers })
  }
  let entry
  try {
    entry = await request.json()
  } catch {
    return Response.json({ error: 'Expected a JSON request body.' }, { status: 400, headers })
  }

  const { kind, slug } = entry || {}
  if ((kind !== 'writing' && kind !== 'note') || typeof slug !== 'string' || !slug ||
      !slug.isWellFormed() || [...slug].length > 200 || slug === '.' || slug === '..' ||
      slug.includes('/') || slug.includes('\\') || slug.includes('\0')) {
    return Response.json({ error: 'Provide a writing or note kind and a valid slug.' }, { status: 400, headers })
  }

  const table = quoteViewTable(env.VIEWS_TABLE)
  const current = await env.VIEWS_DB.prepare(
    `UPDATE ${table} SET count = count + 1 WHERE kind = ?1 AND slug = ?2 RETURNING count`
  ).bind(kind, slug).first()
  if (current) { return Response.json(current, { headers }) }

  // Pages serves real generated entries as HTML and missing routes as 404s.
  const section = kind === 'writing' ? 'writing' : 'notes'
  const url = new URL(`/${section}/${encodeURIComponent(slug)}/`, request.url)
  const page = await env.ASSETS.fetch(new Request(url, { method: 'HEAD', redirect: 'manual' }))
  if (page.status >= 500) { throw new Error(`Content lookup failed (HTTP ${page.status}).`) }
  if (page.status !== 200 || !page.headers.get('Content-Type')?.startsWith('text/html')) {
    return Response.json({ error: 'Entry not found.' }, { status: 404, headers })
  }

  // Concurrent first visits each count, even if another request inserts the row first.
  const result = await env.VIEWS_DB.prepare(
    `INSERT INTO ${table} (kind, slug, count) VALUES (?1, ?2, 1)
     ON CONFLICT (kind, slug) DO UPDATE SET count = count + 1 RETURNING count`
  ).bind(kind, slug).first()
  return Response.json(result, { headers })
}
