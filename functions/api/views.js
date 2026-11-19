// Increment only entries registered by the site build and return the committed total.
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
  if ((kind !== 'writing' && kind !== 'note') || typeof slug !== 'string' || !slug || [...slug].length > 200) {
    return Response.json({ error: 'Provide a writing or note kind and a valid slug.' }, { status: 400, headers })
  }

  // Accept only the two counter tables and never default to live counts.
  const table = env.VIEWS_TABLE
  if (table !== 'entry_views' && table !== 'entry_views_preview') {
    throw new Error('Set the Pages VIEWS_TABLE variable to entry_views or entry_views_preview.')
  }

  // Update and read in one statement so simultaneous visits cannot lose increments.
  const result = await env.VIEWS_DB.prepare(
    `UPDATE ${table} SET count = count + 1 WHERE kind = ?1 AND slug = ?2 RETURNING count`
  ).bind(kind, slug).first()
  if (!result) {
    return Response.json({ error: 'Entry is not registered.' }, { status: 404, headers })
  }

  return Response.json(result, { headers })
}
