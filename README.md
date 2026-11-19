# Eisha's Advent Calendar 🎄

A clickable gingerbread-house advent calendar: 24 little doors, each hiding a
hand-painted illustration and something joyful (a treat, a favorite song, a
cozy plan).

- Each door unlocks on its day in December (Dec 1–24). Today's door glows.
- Opened doors stay open (saved in your browser).
- Tap **I did it ♡** on a gift card to keep track of the joys you've done.
- Add `?peek` to the URL to unlock every door for a sneak peek, e.g.
  `index.html?peek`. Use "close all the doors" at the bottom to reset.

## Run it

It's plain HTML/CSS/JS with no build step. Open `index.html` in a browser.

## Put it online (GitHub Pages)

Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick
the branch and `/ (root)`, then save. A minute later it's live at
`https://<your-username>.github.io/adventcalender/`.

## Customize

- **`data.js`**: the 24 surprises (title, text, song, "find nearby" search).
- **`art.js`**: the SVG illustrations.
- **`app.js`**: layout, which drawer face goes on which door, and unlock rules.
