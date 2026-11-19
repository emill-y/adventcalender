# Eisha's Advent Calendar 🎄

A clickable gingerbread-house advent calendar: 24 little doors, each hiding a
hand-painted illustration and something joyful (a treat, a favorite song, a
cozy plan).

- Each door unlocks on its day in December (Dec 1–24). Today's door glows.
- Opened doors stay open (saved in your browser).
- Tap **I did it ♡** on a gift card to keep track of the joys you've done.
- Add `?peek` to the URL to unlock every door for a sneak peek, e.g.
  `index.html?peek`. Use "close all the doors" at the bottom to reset.

## Gifts from family 🎁

Below the calendar there's an **Add a gift ♡** button. Family and friends can
write a note, treat, song, or plan and tuck it behind any door (or a secret
one). A little red bow appears on that door, and what's inside stays hidden
until the door opens.

How a gift reaches the calendar depends on the setup:

- **With shared storage on Vercel (recommended):** gifts save straight into the
  calendar and show up on every device. To turn it on, open the project on
  vercel.com → **Storage** → **Create / Connect** → **Upstash for Redis**
  (free plan) → connect it to this project, then **redeploy**. That's it: Vercel
  adds the `KV_REST_API_URL` / `KV_REST_API_TOKEN` settings that
  `api/gifts.js` reads.
- **Without storage** (or on GitHub Pages / opened as a file): the form turns
  the gift into a link for the giver to text or email Eisha. Opening that link
  tucks the gift into the calendar on that device.

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
