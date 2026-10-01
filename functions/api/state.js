// Shared checklist state for the FHX Restore Runbook, stored in Cloudflare
// Workers KV (bound as STATE). GET returns the state, POST replaces it,
// DELETE clears it (fresh restore).
export async function onRequest({ request, env }) {
  const kv = env.STATE;
  let state = (await kv.get("state", { type: "json" })) || {};

  if (request.method === "POST") {
    let body;
    try { body = await request.json(); } catch { body = null; }
    if (!body || typeof body !== "object" || Array.isArray(body)) return new Response("Bad state", { status: 400 });
    const raw = JSON.stringify(body);
    if (raw.length > 200000) return new Response("State too large", { status: 400 });
    state = body;
    await kv.put("state", raw);
  } else if (request.method === "DELETE") {
    state = {};
    await kv.put("state", "{}");
  }

  return Response.json(state);
}
