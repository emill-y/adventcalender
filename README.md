# Eisha's Advent Calendar 🎄

A clickable gingerbread-house advent calendar: 24 little doors, each hiding a
hand-painted illustration and something joyful (a treat, a favorite song, a
cozy plan).

- Each door unlocks on its day in December (Dec 1–24). Today's door glows.
- Opened doors stay open (saved in your browser).
- Tap **I did it ♡** on a gift card to keep track of the joys you've done.
- **Sneak peek link:** `your-site.vercel.app/preview` (or `?peek` on any host)
  unlocks every door so people can try it out before December. It's a
  sandbox: doors opened and test gifts added there stay in the preview and
  never show up in the real calendar, and real family gifts are never shown
  in the preview, so nothing gets spoiled.

## Gifts from family 🎁

Below the calendar there's an **Add a gift ♡** button. Family and friends can
write a note, treat, song, or plan and tuck it behind any door (or a secret
one). A little red bow appears on that door, and what's inside stays hidden
until the door opens.

Gifts save straight into the calendar (shared across every device) through
`api/gifts.js`, a tiny Vercel function. It needs free storage connected once:
open the project on vercel.com → **Storage** → **Create / Connect** →
**Upstash for Redis** (free plan) → connect it to this project, then
**redeploy**. Vercel adds the `KV_REST_API_URL` / `KV_REST_API_TOKEN` settings
the function reads. Until that's done, the form says the gift couldn't be saved.

## Run it

It's plain HTML/CSS/JS with no build step. Open `index.html` in a browser.

## Put it online

**Vercel:** import the repo at vercel.com/new. There's no framework and no
build command; the defaults work. Then connect storage (see above) so family
gifts are shared.

**GitHub Pages:**

repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick
the branch and `/ (root)`, then save. A minute later it's live at
`https://<your-username>.github.io/adventcalender/`.

## Customize

- **`data.js`**: the 24 surprises (title, text, song, "find nearby" search).
- **`art.js`**: the SVG illustrations.
- **`app.js`**: layout, which drawer face goes on which door, unlock rules, family gifts.
- **`api/gifts.js`**: the tiny Vercel function that stores family gifts.
