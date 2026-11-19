// Vercel serverless function: shared storage for gifts from family.
// Uses Upstash Redis over its REST API (no npm packages needed).
// Turn it on in Vercel: Project → Storage → connect "Upstash for Redis"
// (free tier). Vercel then sets the env vars below automatically.
// Without them, gifts can't be saved and the form shows an error.

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const KEY = 'advent26:gifts'
const MAX_GIFTS = 300

async function redis(...cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  })
  if (!r.ok) throw new Error(`redis ${r.status}`)
  return (await r.json()).result
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function clean(g) {
  const day = Number(g && g.day)
  const kind = ['note', 'treat', 'song', 'plan'].includes(g && g.kind) ? g.kind : 'note'
  const link = str(g && g.link, 400)
  const out = {
    id: str(g && g.id, 40) || Math.random().toString(36).slice(2, 12),
    from: str(g && g.from, 40),
    day: Number.isInteger(day) && day >= 1 && day <= 24 ? day : 0,
    secret: Boolean(g && g.secret),
    kind,
    title: str(g && g.title, 80),
    text: str(g && g.text, 600),
    link: /^https?:\/\//i.test(link) ? link : '',
    at: Date.now(),
  }
  if (!out.from || !out.title || !out.day) return null
  return out
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  if (!URL_ || !TOKEN) {
    if (req.method === 'GET') return res.status(200).json({ enabled: false, gifts: [] })
    return res.status(503).json({ error: 'The calendar’s gift storage isn’t switched on yet. Ask Eisha to connect it!' })
  }

  try {
    if (req.method === 'GET') {
      const raw = (await redis('LRANGE', KEY, '0', '-1')) || []
      const gifts = raw.map((s) => { try { return JSON.parse(s) } catch { return null } }).filter(Boolean)
      return res.status(200).json({ enabled: true, gifts })
    }
    if (req.method === 'POST') {
      let body = req.body
      if (typeof body === 'string') { try { body = JSON.parse(body) } catch { body = null } }
      const gift = clean(body)
      if (!gift) return res.status(400).json({ error: 'Please add your name and a title.' })
      const len = await redis('LLEN', KEY)
      if (len >= MAX_GIFTS) return res.status(429).json({ error: 'The calendar is full of gifts already!' })
      await redis('RPUSH', KEY, JSON.stringify(gift))
      return res.status(201).json({ ok: true, gift })
    }
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    return res.status(500).json({ error: 'Could not reach gift storage.' })
  }
}
