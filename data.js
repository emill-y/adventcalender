// The 24 surprises behind the doors.
// Edit freely! `kind` is one of: treat, song, joy, cozy.
// `action` is optional:
//   { song: 'Artist — Title' }        -> "Play on Spotify" button
//   { place: 'search words' }         -> "Find one nearby" (Google Maps)
//   { url: 'https://…', label: '…' }  -> any link you like
window.DAYS = {
  1: {
    kind: 'treat', art: 'matcha',
    title: 'Go get a matcha',
    text: 'Day one calls for your favorite: a matcha made exactly how you like it. Grab a window seat, wrap both hands around the cup, and call it the official start of the season.',
    action: { place: 'matcha' },
  },
  2: {
    kind: 'song', art: 'vinylSnow',
    title: 'Stick Season',
    artist: 'Noah Kahan',
    text: 'Headphones in, and go for a walk while this one plays. Bonus points if it’s cold enough to see your breath.',
    action: { song: 'Noah Kahan Stick Season' },
  },
  3: {
    kind: 'treat', art: 'cookies',
    title: 'Get the dessert',
    text: 'You’ll say you’re “not really hungry.” Get the dessert anyway: a cookie, a pastry, a slice of something with frosting. No sharing required.',
    action: { place: 'bakery' },
  },
  4: {
    kind: 'cozy', art: 'yoga',
    title: 'Roll out your mat',
    text: 'You spend so much time helping other people slow down. Today it’s your turn: twenty minutes of your softest, slowest flow, one candle lit, and nobody to cue but yourself.',
  },
  5: {
    kind: 'song', art: 'vinylPines',
    title: 'Northern Attitude',
    artist: 'Noah Kahan',
    text: 'Turn it all the way up and sing the bridge like nobody’s listening. (They might be. That’s fine.)',
    action: { song: 'Noah Kahan Northern Attitude' },
  },
  6: {
    kind: 'treat', art: 'ramen',
    title: 'Cross town for something good',
    text: 'Open Beli, find the place you’ve been saving “for a special occasion,” and make today the occasion.',
    action: { place: 'best restaurants' },
  },
  7: {
    kind: 'joy', art: 'cocoa',
    title: 'Hot cocoa & twinkle lights',
    text: 'Make a hot cocoa (extra marshmallows, obviously), bundle up, and go find the best-decorated street near you.',
    action: { place: 'christmas lights display' },
  },
  8: {
    kind: 'cozy', art: 'popcorn',
    title: 'Holiday movie night',
    text: 'Blankets, popcorn, your comfiest socks. Tonight’s picks: The Holiday, Elf, or Home Alone. Or the one you rewatch every single year.',
  },
  9: {
    kind: 'joy', art: 'ornament',
    title: 'Make an ornament',
    text: 'Get out the Cricut and the sewing machine and make one ornament for your tree (or someone else’s). It’s allowed to be unnecessarily elaborate. That’s the point.',
  },
  10: {
    kind: 'song', art: 'vinylSunset',
    title: 'Something in the Orange',
    artist: 'Zach Bryan',
    text: 'Save this one for a drive at sunset: windows cracked, heat on, nowhere in particular to be.',
    action: { song: 'Zach Bryan Something in the Orange' },
  },
  11: {
    kind: 'treat', art: 'books',
    title: 'Buy yourself a book',
    text: 'Wander a bookstore with no list. Pick the one with the prettiest cover or the best first line and gift it to yourself.',
    action: { place: 'independent bookstore' },
  },
  12: {
    kind: 'joy', art: 'letter',
    title: 'Write someone a little note',
    text: 'A text, a card, or a real envelope. Tell someone you love exactly why you love them. It’ll make their whole week (and yours).',
  },
  13: {
    kind: 'treat', art: 'bouquet',
    title: 'Fresh flowers, just for you',
    text: 'Pick up a little winter bouquet (red ranunculus, white tulips, a sprig of eucalyptus) and put it somewhere you’ll see it every morning.',
    action: { place: 'florist' },
  },
  14: {
    kind: 'song', art: 'cassette',
    title: 'Slow Burn',
    artist: 'Kacey Musgraves',
    text: 'Make something warm to drink and let this play while you do absolutely nothing for four whole minutes.',
    action: { song: 'Kacey Musgraves Slow Burn' },
  },
  15: {
    kind: 'treat', art: 'chai',
    title: 'A really good chai',
    text: 'Not just any chai. A really good one: cinnamon-y, spiced, a little too sweet. Sip it slowly.',
    action: { place: 'chai latte' },
  },
  16: {
    kind: 'cozy', art: 'bath',
    title: 'Spa night',
    text: 'Face mask, long bath or shower, fresh pajamas, and clean sheets if you’re feeling ambitious. Phone on Do Not Disturb.',
  },
  17: {
    kind: 'song', art: 'vinylTree',
    title: 'Christmas Tree Farm',
    artist: 'Taylor Swift',
    text: 'Holiday mode: activated. Play it while you decorate, wrap gifts, or dance around the kitchen in socks.',
    action: { song: 'Taylor Swift Christmas Tree Farm' },
  },
  18: {
    kind: 'joy', art: 'gingerbread',
    title: 'Bake gingerbread cookies',
    text: 'Bake a batch, decorate them with way too much icing, and give a few away. Keep the cutest ones.',
  },
  19: {
    kind: 'joy', art: 'camera',
    title: 'Take 47 pictures',
    text: 'Go on a little photo walk: lights, shop windows, frosty leaves, your coffee. Take 47 photos of everything and keep your favorite one.',
  },
  20: {
    kind: 'song', art: 'headphones',
    title: 'Homesick',
    artist: 'Noah Kahan',
    text: 'For that almost-home feeling. Listen on your way to see someone you’ve missed.',
    action: { song: 'Noah Kahan Homesick' },
  },
  21: {
    kind: 'treat', art: 'mocha',
    title: 'Peppermint mocha (or an espresso)',
    text: 'It’s the most festive thing on the menu, and today it’s yours. Or go classic with a perfect little espresso.',
    action: { place: 'cafe' },
  },
  22: {
    kind: 'treat', art: 'polish',
    title: 'Holiday manicure',
    text: 'Book a manicure: deep red, a little sparkle, maybe one tiny snowflake accent nail. Your hands deserve to be festive too.',
    action: { place: 'nail salon' },
  },
  23: {
    kind: 'song', art: 'vinylGifts',
    title: 'Underneath the Tree',
    artist: 'Kelly Clarkson',
    text: 'The most joyful song ever made. At least one spin around the room is required.',
    action: { song: 'Kelly Clarkson Underneath the Tree' },
  },
  24: {
    kind: 'cozy', art: 'stocking',
    title: 'It’s Christmas Eve',
    text: 'Cozy pajamas, something sweet, and your favorite people (or your favorite blanket). Before bed, write down three moments from this month that made you happy. You did it. Merry Christmas!',
  },
}
