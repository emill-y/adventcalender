// Hand-drawn style SVG illustrations, one per surprise.
// Each is drawn on a 200×200 canvas; the #wc filter (in index.html) gives
// lines a slightly wobbly, painted look.
;(function () {
  const INK = '#6b4430'
  const RED = '#c94a4a'
  const PINK = '#f2b5b5'
  const CREAM = '#fffaf1'
  const GREEN = '#5f8a63'
  const SAGE = '#a8c49a'
  const GOLD = '#e6b84f'
  const SKY = '#bcd3e0'

  const ln = (w = 2.5) => `stroke="${INK}" stroke-width="${w}"`

  const heart = (cx, cy, s, fill, extra = '') =>
    `<path d="M${cx} ${cy + s * 0.9} C${cx - s * 1.5} ${cy - s * 0.1} ${cx - s * 0.6} ${cy - s * 1.15} ${cx} ${cy - s * 0.35} C${cx + s * 0.6} ${cy - s * 1.15} ${cx + s * 1.5} ${cy - s * 0.1} ${cx} ${cy + s * 0.9}Z" fill="${fill}" ${extra}/>`

  const star4 = (x, y, r, fill) =>
    `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z" fill="${fill}"/>`

  const note = (x, y, c) =>
    `<g fill="${c}" stroke="${c}"><ellipse cx="${x}" cy="${y}" rx="5.5" ry="4.2" transform="rotate(-20 ${x} ${y})"/><path d="M${x + 4.5} ${y - 1} V${y - 22} q8 4 10 10" fill="none" stroke-width="2.4"/></g>`

  const holly = (x, y, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 C-6 -10 -18 -10 -22 -4 C-16 -2 -10 4 0 0Z" fill="${GREEN}" ${ln(1.6)}/>
      <path d="M0 0 C6 -10 18 -10 22 -4 C16 -2 10 4 0 0Z" fill="#6f9a6f" ${ln(1.6)}/>
      <circle cx="-3" cy="-1" r="4" fill="${RED}" ${ln(1.4)}/><circle cx="4" cy="1" r="4" fill="#d9534f" ${ln(1.4)}/>
    </g>`

  const peppermint = (x, y, r) => {
    let wedges = ''
    for (let i = 0; i < 6; i++) {
      const a1 = (i * 60 * Math.PI) / 180
      const a2 = ((i * 60 + 30) * Math.PI) / 180
      wedges += `<path d="M${x} ${y} L${x + r * Math.cos(a1)} ${y + r * Math.sin(a1)} A${r} ${r} 0 0 1 ${x + r * Math.cos(a2)} ${y + r * Math.sin(a2)}Z" fill="${RED}"/>`
    }
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${CREAM}"/>${wedges}<circle cx="${x}" cy="${y}" r="${r}" fill="none" ${ln(2)}/>`
  }

  const flakes = (pts, c = '#ffffff') =>
    pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".9"/>`).join('')

  const sparkles = `
    ${star4(30, 40, 7, GOLD)}${star4(172, 58, 5, GOLD)}${star4(168, 170, 6, '#ffffff')}${star4(26, 150, 4.5, '#ffffff')}
    <circle cx="48" cy="22" r="2.5" fill="${GOLD}"/><circle cx="180" cy="110" r="2.5" fill="#ffffff"/>`

  const S = (bg, inner) => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="100" cy="106" r="82" fill="${bg}" opacity=".75" filter="url(#wc-soft)"/>
    <g filter="url(#wc)" stroke-linejoin="round" stroke-linecap="round">${inner}</g>
    ${sparkles}</svg>`

  // ---- shared: a record half out of its sleeve ----
  const vinyl = (bg, label, sleeve, sleeveArt) =>
    S(bg, `
      <circle cx="128" cy="104" r="50" fill="#2d2522" ${ln(2)}/>
      <circle cx="128" cy="104" r="42" fill="none" stroke="#4d403a" stroke-width="1.3"/>
      <circle cx="128" cy="104" r="34" fill="none" stroke="#4d403a" stroke-width="1.3"/>
      <circle cx="128" cy="104" r="26" fill="none" stroke="#4d403a" stroke-width="1.3"/>
      <path d="M150 72 A40 40 0 0 1 160 92" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width="3"/>
      <circle cx="128" cy="104" r="15" fill="${label}" ${ln(1.5)}/>
      <circle cx="128" cy="104" r="2.6" fill="${CREAM}"/>
      <rect x="36" y="56" width="100" height="100" rx="5" fill="${sleeve}" ${ln()}/>
      <g>${sleeveArt}</g>
      <rect x="36" y="56" width="100" height="100" rx="5" fill="none" ${ln()}/>
      ${note(160, 50, INK)}${note(176, 34, RED)}`)

  const ART = {
    matcha: S('#e3edd3', `
      <path d="M84 74 c-8 -10 8 -16 0 -28 M100 70 c-8 -10 8 -16 0 -28 M116 74 c-8 -10 8 -16 0 -28" fill="none" stroke="#cdb9a4" stroke-width="3"/>
      <ellipse cx="100" cy="158" rx="66" ry="14" fill="#efe2cf" ${ln()}/>
      <path d="M146 100 c28 -6 30 36 0 34" fill="none" ${ln(10)}/>
      <path d="M146 100 c28 -6 30 36 0 34" fill="none" stroke="${CREAM}" stroke-width="5"/>
      <path d="M50 92 h100 c0 44 -20 64 -50 64 s-50 -20 -50 -64z" fill="${CREAM}" ${ln()}/>
      <ellipse cx="100" cy="92" rx="50" ry="11" fill="#a9c46c" ${ln()}/>
      <g transform="translate(100 92) scale(1 .5)">${heart(0, 0, 9, '#f4f1dc')}</g>
      ${holly(100, 128, 0.9)}`),

    vinylSnow: vinyl('#dbe7ee', '#f2b5b5', '#c9dce6', `
      <path d="M36 128 C60 116 96 120 136 112 V151 a5 5 0 0 1 -5 5 H41 a5 5 0 0 1 -5 -5Z" fill="#ffffff"/>
      <path d="M62 128 l-14 0 l14 -24 l14 24z M62 112 l-10 0 l10 -18 l10 18z" fill="${GREEN}"/>
      <path d="M96 124 l-12 0 l12 -20 l12 20z M96 110 l-8 0 l8 -14 l8 14z" fill="#4f7a55"/>
      <path d="M118 120 l-9 0 l9 -16 l9 16z" fill="${GREEN}"/>
      ${flakes([[50, 70, 2.5], [80, 66, 2], [110, 74, 2.5], [124, 64, 2], [70, 88, 2], [104, 92, 2]])}`),

    vinylPines: vinyl('#f1e2d0', '#a8c49a', '#ecd2b4', `
      <path d="M36 120 L64 84 L84 108 L104 80 L136 118 V151 a5 5 0 0 1 -5 5 H41 a5 5 0 0 1 -5 -5Z" fill="#8fa8b8"/>
      <path d="M56 94 L64 84 L72 94 L68 96 L64 92 L60 96Z M96 90 L104 80 L112 90 L108 92 L104 88 L100 92Z" fill="#ffffff"/>
      <path d="M36 134 C70 126 100 130 136 124 V151 a5 5 0 0 1 -5 5 H41 a5 5 0 0 1 -5 -5Z" fill="#ffffff"/>
      <path d="M66 140 l-12 0 l12 -26 l12 26z M118 136 l-10 0 l10 -22 l10 22z" fill="${GREEN}"/>
      <circle cx="116" cy="72" r="7" fill="#fff4d6"/>`),

    vinylSunset: vinyl('#f8e0cc', '#f58a4b', '#f6c79a', `
      <circle cx="86" cy="124" r="30" fill="#f58a4b"/>
      <rect x="54" y="112" width="64" height="4" fill="#f6c79a"/>
      <rect x="54" y="122" width="64" height="5" fill="#f6c79a"/>
      <path d="M36 130 H136 V151 a5 5 0 0 1 -5 5 H41 a5 5 0 0 1 -5 -5Z" fill="#c9774a"/>
      <path d="M36 140 C70 134 100 144 136 136 V151 a5 5 0 0 1 -5 5 H41 a5 5 0 0 1 -5 -5Z" fill="#9a5a3a"/>
      <path d="M58 72 q6 -6 12 0 q6 -6 12 0 M98 80 q5 -5 10 0 q5 -5 10 0" fill="none" stroke="#9a5a3a" stroke-width="2"/>`),

    vinylTree: vinyl('#f6dcdc', '#e6b84f', '#f4d0cf', `
      <path d="M86 70 L60 112 H74 L54 142 H118 L98 112 H112Z" fill="${GREEN}" ${ln(1.6)}/>
      <rect x="80" y="142" width="12" height="9" fill="#8a5a3b"/>
      ${star4(86, 68, 9, GOLD)}
      <circle cx="78" cy="104" r="3.5" fill="${RED}"/><circle cx="94" cy="96" r="3" fill="${GOLD}"/>
      <circle cx="72" cy="128" r="3.5" fill="${GOLD}"/><circle cx="98" cy="124" r="3.5" fill="${RED}"/><circle cx="86" cy="116" r="3" fill="#ffffff"/>
      <path d="M66 108 q20 10 38 -2 M60 134 q26 10 50 -2" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="2 4"/>`),

    vinylGifts: vinyl('#dcebdf', '#c94a4a', '#c8ddcb', `
      <rect x="50" y="110" width="40" height="36" fill="${RED}" ${ln(1.6)}/>
      <rect x="66" y="110" width="8" height="36" fill="#ffffff"/>
      <rect x="92" y="122" width="32" height="24" fill="${GOLD}" ${ln(1.6)}/>
      <rect x="104" y="122" width="8" height="24" fill="${RED}"/>
      <rect x="64" y="86" width="30" height="24" fill="#ffffff" ${ln(1.6)}/>
      <rect x="75" y="86" width="8" height="24" fill="${GREEN}"/>
      <path d="M79 86 c-12 -12 -16 0 0 0 c12 -12 16 0 0 0" fill="none" stroke="${GREEN}" stroke-width="3"/>
      <path d="M70 110 c-10 -10 -14 0 0 0 c10 -10 14 0 0 0" fill="none" stroke="#ffffff" stroke-width="3"/>`),

    cassette: S('#f6dcdc', `
      <rect x="34" y="66" width="132" height="86" rx="9" fill="${PINK}" ${ln()}/>
      <rect x="46" y="76" width="108" height="34" rx="4" fill="${CREAM}" ${ln(1.8)}/>
      <text x="100" y="99" text-anchor="middle" font-family="Caveat, cursive" font-size="20" fill="${RED}" stroke="none">slow burn ♡</text>
      <rect x="66" y="114" width="68" height="24" rx="12" fill="#3a2d28" ${ln(1.8)}/>
      <circle cx="82" cy="126" r="8" fill="${CREAM}"/><circle cx="118" cy="126" r="8" fill="${CREAM}"/>
      <circle cx="82" cy="126" r="3" fill="#3a2d28"/><circle cx="118" cy="126" r="3" fill="#3a2d28"/>
      <path d="M58 152 l8 -10 h68 l8 10" fill="#e9a0a0" ${ln(1.8)}/>
      <circle cx="44" cy="76" r="2.5" fill="${INK}"/><circle cx="156" cy="76" r="2.5" fill="${INK}"/>
      ${heart(156, 50, 8, RED, ln(1.5))}${heart(40, 172, 6, PINK, ln(1.3))}`),

    headphones: S('#e4ecf2', `
      <path d="M50 116 C46 50 154 50 150 116" fill="none" ${ln(14)}/>
      <path d="M50 116 C46 50 154 50 150 116" fill="none" stroke="#e8a3a3" stroke-width="9"/>
      <rect x="34" y="102" width="30" height="50" rx="14" fill="${PINK}" ${ln()}/>
      <rect x="136" y="102" width="30" height="50" rx="14" fill="${PINK}" ${ln()}/>
      <rect x="56" y="108" width="12" height="38" rx="6" fill="${CREAM}" ${ln(1.8)}/>
      <rect x="132" y="108" width="12" height="38" rx="6" fill="${CREAM}" ${ln(1.8)}/>
      ${heart(100, 118, 10, RED, ln(1.6))}${heart(84, 146, 6, PINK, ln(1.3))}${heart(118, 152, 7, '#e8a3a3', ln(1.3))}
      ${note(160, 50, INK)}`),

    cookies: S('#f7e2d6', `
      <rect x="44" y="52" width="34" height="62" rx="6" fill="#ffffff" ${ln()}/>
      <rect x="44" y="72" width="34" height="42" rx="4" fill="#f6efe2"/>
      <rect x="44" y="52" width="34" height="62" rx="6" fill="none" ${ln()}/>
      <ellipse cx="100" cy="142" rx="72" ry="24" fill="${CREAM}" ${ln()}/>
      <ellipse cx="100" cy="140" rx="56" ry="16" fill="none" stroke="#e6d6c2" stroke-width="2"/>
      <path d="M78 98 l8 16 l18 2 l-13 12 l4 18 l-17 -9 l-16 9 l3 -18 l-13 -12 l18 -2z" fill="#d9a066" ${ln(2)}/>
      <path d="M78 104 l6 12 l13 2 l-9 9 l2 13 l-12 -7 l-12 7 l2 -13 l-9 -9 l13 -2z" fill="none" stroke="#ffffff" stroke-width="2"/>
      <circle cx="126" cy="128" r="23" fill="#e8b77c" ${ln(2)}/>
      <circle cx="126" cy="128" r="16" fill="#f6c9cf"/>
      <rect x="118" y="121" width="5" height="2" rx="1" fill="${GREEN}" transform="rotate(30 120 122)"/>
      <rect x="128" y="132" width="5" height="2" rx="1" fill="${RED}" transform="rotate(-20 130 133)"/>
      <rect x="130" y="120" width="5" height="2" rx="1" fill="#6fa8c9"/>
      <rect x="118" y="134" width="5" height="2" rx="1" fill="${GOLD}" transform="rotate(60 120 135)"/>`),

    yoga: S('#e5eedd', `
      <circle cx="54" cy="72" r="22" fill="#ffe3a3" opacity=".7"/>
      <path d="M54 58 c-8 8 -6 16 0 18 c6 -2 8 -10 0 -18z" fill="#f6a945" ${ln(1.6)}/>
      <rect x="43" y="78" width="22" height="42" rx="3" fill="${CREAM}" ${ln()}/>
      <path d="M54 78 v-4" ${ln(2)}/>
      <path d="M30 150 L110 120 L176 138 L96 172 Z" fill="${SAGE}" ${ln()}/>
      <line x1="110" y1="116" x2="174" y2="134" ${ln(25)}/>
      <line x1="110" y1="116" x2="174" y2="134" stroke="#93b483" stroke-width="19"/>
      <circle cx="174" cy="134" r="11" fill="${SAGE}" ${ln(2)}/>
      <circle cx="174" cy="134" r="5" fill="none" ${ln(1.6)}/>
      <path d="M150 74 h20 l-3 18 h-14z" fill="#d98e6b" ${ln(2)}/>
      <path d="M160 74 c-2 -10 -12 -14 -16 -10 c6 0 10 4 16 10 c0 -10 6 -16 12 -14 c-6 2 -10 8 -12 14" fill="${GREEN}" ${ln(1.6)}/>
      ${heart(86, 146, 6, '#ffffff')}`),

    ramen: S('#f6e3cf', `
      <path d="M80 72 c-8 -10 8 -16 0 -28 M100 68 c-8 -10 8 -16 0 -28 M120 72 c-8 -10 8 -16 0 -28" fill="none" stroke="#cdb9a4" stroke-width="3"/>
      <path d="M34 108 h132 c0 40 -28 58 -66 58 s-66 -18 -66 -58z" fill="${RED}" ${ln()}/>
      <path d="M48 132 q8 -8 16 0 q8 -8 16 0 q8 -8 16 0 q8 -8 16 0 q8 -8 16 0 q8 -8 16 0" fill="none" stroke="#ffffff" stroke-width="2.4"/>
      <ellipse cx="100" cy="108" rx="66" ry="14" fill="#f1c27d" ${ln()}/>
      <path d="M52 108 q6 -6 12 0 t12 0 t12 0 M92 112 q6 -6 12 0 t12 0" fill="none" stroke="#fbe7ae" stroke-width="3"/>
      <rect x="62" y="88" width="18" height="22" fill="#2f4a3a" ${ln(1.5)} transform="rotate(-12 71 99)"/>
      <ellipse cx="126" cy="104" rx="14" ry="9" fill="#ffffff" ${ln(1.6)}/>
      <circle cx="126" cy="104" r="5.5" fill="#f5a623"/>
      <circle cx="98" cy="104" r="3" fill="#7fb069"/><circle cx="106" cy="100" r="2.5" fill="#7fb069"/><circle cx="92" cy="98" r="2.5" fill="#7fb069"/>
      <circle cx="146" cy="108" r="6" fill="#ffffff" ${ln(1.4)}/><path d="M142 108 a4 4 0 0 0 8 0" fill="none" stroke="#e98fa0" stroke-width="2"/>
      <line x1="160" y1="44" x2="108" y2="104" stroke="#c99a6b" stroke-width="5"/>
      <line x1="170" y1="52" x2="114" y2="108" stroke="#b9875a" stroke-width="5"/>`),

    cocoa: S('#f4dede', `
      <path d="M142 92 c26 -2 26 40 -4 38" fill="none" ${ln(10)}/>
      <path d="M142 92 c26 -2 26 40 -4 38" fill="none" stroke="${RED}" stroke-width="5"/>
      <path d="M56 82 h88 v56 c0 16 -12 24 -26 24 h-36 c-14 0 -26 -8 -26 -24z" fill="${RED}" ${ln()}/>
      <ellipse cx="100" cy="82" rx="44" ry="10" fill="#6b3f2a" ${ln()}/>
      <rect x="72" y="70" width="16" height="14" rx="4" fill="#ffffff" ${ln(1.6)} transform="rotate(-14 80 77)"/>
      <rect x="92" y="68" width="16" height="14" rx="4" fill="#fff4f4" ${ln(1.6)} transform="rotate(10 100 75)"/>
      <rect x="110" y="72" width="15" height="13" rx="4" fill="#ffffff" ${ln(1.6)} transform="rotate(-6 117 78)"/>
      <g stroke="#ffffff" stroke-width="2.4" fill="none"><path d="M100 104 v30 M87 111 l26 16 M113 111 l-26 16"/></g>
      <path d="M62 100 V62 c0 -12 18 -12 18 0" fill="none" stroke="#ffffff" stroke-width="7"/>
      <path d="M62 100 V62 c0 -12 18 -12 18 0" fill="none" stroke="${RED}" stroke-width="7" stroke-dasharray="5 6"/>
      <path d="M44 172 q56 -10 112 0" fill="none" stroke="#e8cfc0" stroke-width="4"/>`),

    popcorn: S('#f6e0d6', `
      ${[[60, 82], [76, 70], [94, 64], [112, 68], [130, 76], [144, 88], [68, 96], [86, 84], [104, 80], [122, 86], [54, 96], [138, 96], [96, 52], [116, 56], [78, 58]]
        .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${11 - (i % 3)}" fill="${i % 4 === 0 ? '#f6dc8a' : '#fff7e0'}" ${ln(1.8)}/>`).join('')}
      ${[0, 1, 2, 3, 4].map((i) => {
        const t0 = 54 + i * 18.4, t1 = t0 + 18.4, b0 = 68 + i * 12.8, b1 = b0 + 12.8
        return `<path d="M${t0} 100 L${t1} 100 L${b1} 170 L${b0} 170Z" fill="${i % 2 ? CREAM : RED}"/>`
      }).join('')}
      <path d="M54 100 L146 100 L132 170 L68 170 Z" fill="none" ${ln()}/>
      <rect x="50" y="96" width="100" height="10" rx="4" fill="${CREAM}" ${ln(2)}/>
      ${star4(100, 136, 12, GOLD)}`),

    ornament: S('#f6dede', `
      <path d="M100 18 V48" ${ln(2)}/>
      <path d="M100 40 c-16 -14 -22 4 0 2 c22 2 16 -16 0 -2" fill="none" stroke="${GREEN}" stroke-width="4"/>
      <rect x="88" y="48" width="24" height="14" rx="3" fill="${GOLD}" ${ln(2)}/>
      <circle cx="100" cy="114" r="52" fill="${RED}" ${ln()}/>
      <path d="M50 104 q12 -10 25 0 t25 0 t25 0 t25 0" fill="none" stroke="#ffffff" stroke-width="3"/>
      <path d="M50 126 q12 10 25 0 t25 0 t25 0 t25 0" fill="none" stroke="#ffffff" stroke-width="3"/>
      ${[62, 81, 100, 119, 138].map((x) => `<circle cx="${x}" cy="115" r="3.4" fill="${GOLD}"/>`).join('')}
      ${star4(100, 150, 8, '#ffffff')}${star4(100, 82, 7, '#ffffff')}
      <path d="M72 82 a40 40 0 0 1 22 -16" fill="none" stroke="#ffffff" stroke-opacity=".6" stroke-width="5"/>`),

    books: S('#e2ebe0', `
      <rect x="40" y="132" width="120" height="24" rx="3" fill="${SAGE}" ${ln()}/>
      <path d="M150 136 v16" stroke="#fffaf1" stroke-width="5"/>
      <rect x="50" y="108" width="104" height="24" rx="3" fill="${PINK}" ${ln()}/>
      <path d="M144 112 v16" stroke="#fffaf1" stroke-width="5"/>
      <rect x="44" y="84" width="112" height="24" rx="3" fill="${SKY}" ${ln()}/>
      <path d="M146 88 v16" stroke="#fffaf1" stroke-width="5"/>
      <rect x="94" y="84" width="10" height="72" fill="${RED}"/>
      <path d="M99 84 c-20 -22 -34 -2 0 0 c34 -2 20 -22 0 0" fill="${RED}" ${ln(2)}/>
      <path d="M99 84 l-10 18 M99 84 l10 18" ${ln(4)}/><path d="M99 84 l-10 18 M99 84 l10 18" stroke="${RED}" stroke-width="2"/>
      <path d="M58 96 h24 M60 120 h22 M54 144 h28" stroke="${INK}" stroke-width="1.6" opacity=".6"/>
      ${holly(150, 80, 0.8)}`),

    letter: S('#f6e2de', `
      <rect x="34" y="64" width="132" height="92" rx="6" fill="${CREAM}" ${ln()}/>
      <path d="M34 152 L88 112 M166 152 L112 112" fill="none" ${ln(2)}/>
      <path d="M36 68 L100 118 L164 68" fill="#f4e7d6" ${ln()}/>
      <circle cx="100" cy="116" r="15" fill="${RED}" ${ln(2)}/>
      ${heart(100, 116, 6, '#ffffff')}
      <rect x="138" y="72" width="20" height="24" fill="${PINK}" stroke="${INK}" stroke-width="1.6" stroke-dasharray="2 2"/>
      <path d="M148 78 l-6 12 h12z" fill="${GREEN}"/>
      ${heart(60, 46, 7, RED, ln(1.3))}${heart(80, 30, 5, PINK, ln(1.2))}${heart(44, 26, 4, '#e8a3a3')}`),

    bouquet: S('#e5eedd', `
      <ellipse cx="66" cy="96" rx="9" ry="20" fill="${SAGE}" ${ln(1.6)} transform="rotate(-36 66 96)"/>
      <ellipse cx="136" cy="94" rx="9" ry="20" fill="#8fb07f" ${ln(1.6)} transform="rotate(36 136 94)"/>
      ${[[58, 70], [64, 58], [144, 66], [138, 54], [150, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#b9cfae" ${ln(1.2)}/>`).join('')}
      <path d="M100 76 c-12 -2 -14 -22 -8 -28 c4 4 6 4 8 0 c2 4 4 4 8 0 c6 6 4 26 -8 28z" fill="#ffffff" ${ln(1.8)}/>
      <circle cx="78" cy="92" r="17" fill="${RED}" ${ln(1.8)}/><circle cx="78" cy="92" r="11" fill="#e06b6b"/><circle cx="78" cy="92" r="5" fill="#8a2f2f"/>
      <circle cx="122" cy="88" r="17" fill="${RED}" ${ln(1.8)}/><circle cx="122" cy="88" r="11" fill="#e06b6b"/><circle cx="122" cy="88" r="5" fill="#8a2f2f"/>
      <circle cx="100" cy="104" r="13" fill="#fff4f4" ${ln(1.6)}/><circle cx="100" cy="104" r="5" fill="${GOLD}"/>
      <path d="M66 112 L134 112 L106 180 L94 180 Z" fill="#e2c39e" ${ln()}/>
      <path d="M80 112 L98 178 M120 112 L102 178" stroke="#cfa77c" stroke-width="2"/>
      <path d="M100 140 c-18 -14 -24 6 0 2 c24 4 18 -16 0 -2 l-8 16 M100 142 l8 16" fill="${RED}" ${ln(2)}/>`),

    chai: S('#f4e3cf', `
      <ellipse cx="100" cy="164" rx="62" ry="12" fill="#efe2cf" ${ln()}/>
      <rect x="112" y="34" width="9" height="56" rx="3" fill="#8a5a3b" ${ln(1.8)} transform="rotate(16 116 62)"/>
      <rect x="124" y="40" width="9" height="52" rx="3" fill="#a06a45" ${ln(1.8)} transform="rotate(24 128 66)"/>
      <path d="M62 70 L138 70 L128 160 L72 160 Z" fill="#d9a877" ${ln()}/>
      <path d="M62 70 L138 70 L136 90 L64 90 Z" fill="#f6e6cf" ${ln(2)}/>
      ${[[80, 78], [92, 82], [104, 77], [116, 83], [124, 78], [88, 76], [110, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#a06a45"/>`).join('')}
      <path d="M70 100 L74 150" stroke="#ffffff" stroke-opacity=".5" stroke-width="5"/>
      <g transform="translate(156 150)">${[0, 45, 90, 135].map((a) => `<ellipse rx="13" ry="4" fill="#8a5a3b" ${ln(1.3)} transform="rotate(${a})"/>`).join('')}<circle r="3" fill="#5a3a26"/></g>
      ${heart(100, 124, 9, '#f6e6cf')}`),

    bath: S('#e2ecf2', `
      <path d="M44 104 V52 c0 -12 20 -12 20 0 v6" fill="none" stroke="${GOLD}" stroke-width="6"/>
      <path d="M58 58 h12" stroke="${GOLD}" stroke-width="6"/>
      ${[[64, 98, 10], [80, 92, 12], [98, 90, 13], [116, 94, 11], [134, 98, 10], [72, 82, 7], [108, 78, 8], [126, 84, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${SKY}" stroke-width="2"/>`).join('')}
      <path d="M126 92 c0 -10 14 -10 14 0 c4 0 8 2 6 6 h-24 c-2 -4 0 -6 4 -6z" fill="#f6d35b" ${ln(1.6)}/>
      <circle cx="136" cy="88" r="7" fill="#f6d35b" ${ln(1.6)}/><path d="M142 88 l6 1 l-6 2z" fill="#f5a623"/>
      <rect x="32" y="102" width="136" height="12" rx="6" fill="${CREAM}" ${ln()}/>
      <path d="M38 114 h124 c0 30 -22 44 -62 44 s-62 -14 -62 -44z" fill="${CREAM}" ${ln()}/>
      <path d="M60 156 l-6 14 M140 156 l6 14" stroke="${GOLD}" stroke-width="7"/>
      <circle cx="160" cy="54" r="8" fill="#ffffff" stroke="${SKY}" stroke-width="2"/><circle cx="148" cy="38" r="5" fill="#ffffff" stroke="${SKY}" stroke-width="2"/>`),

    gingerbread: S('#f6e3d4', `
      <circle cx="100" cy="54" r="24" fill="#c07a45" ${ln()}/>
      <path d="M100 76 C80 76 78 84 62 86 C46 88 46 108 62 108 C72 108 76 104 78 106 C78 118 74 130 66 146 C60 160 76 170 84 158 L100 134 L116 158 C124 170 140 160 134 146 C126 130 122 118 122 106 C124 104 128 108 138 108 C154 108 154 88 138 86 C122 84 120 76 100 76Z" fill="#c07a45" ${ln()}/>
      <circle cx="92" cy="50" r="3" fill="${INK}"/><circle cx="108" cy="50" r="3" fill="${INK}"/>
      <path d="M90 60 q10 9 20 0" fill="none" stroke="#ffffff" stroke-width="2.6"/>
      <circle cx="84" cy="58" r="4" fill="#ec9b9b" opacity=".8"/><circle cx="116" cy="58" r="4" fill="#ec9b9b" opacity=".8"/>
      <path d="M56 92 q4 6 0 12 M144 92 q-4 6 0 12 M70 146 q8 4 14 -2 M130 146 q-8 4 -14 -2" fill="none" stroke="#ffffff" stroke-width="2.6"/>
      <circle cx="100" cy="96" r="4.5" fill="${RED}" ${ln(1.3)}/><circle cx="100" cy="112" r="4.5" fill="${GREEN}" ${ln(1.3)}/>
      <path d="M90 80 l10 6 l10 -6 v10 l-10 -6 l-10 6z" fill="${RED}" ${ln(1.3)}/>`),

    camera: S('#f6e0e0', `
      <rect x="62" y="150" width="76" height="40" fill="#ffffff" ${ln(2)}/>
      <rect x="68" y="154" width="64" height="26" fill="${SKY}"/>
      <path d="M100 158 l-8 16 h16z" fill="${GREEN}"/>
      <rect x="62" y="54" width="40" height="18" rx="4" fill="#f4e7d6" ${ln()}/>
      <rect x="38" y="66" width="124" height="88" rx="14" fill="#fbf3e6" ${ln()}/>
      <rect x="38" y="122" width="124" height="32" rx="0" fill="#f4e7d6"/>
      <rect x="38" y="66" width="124" height="88" rx="14" fill="none" ${ln()}/>
      <rect x="86" y="66" width="8" height="88" fill="${PINK}"/><rect x="94" y="66" width="8" height="88" fill="${GOLD}" opacity=".7"/><rect x="102" y="66" width="8" height="88" fill="${SAGE}"/>
      <circle cx="104" cy="108" r="28" fill="#3a2d28" ${ln()}/>
      <circle cx="104" cy="108" r="19" fill="#5a4a44"/>
      <circle cx="104" cy="108" r="9" fill="#8fb7cc"/>
      <circle cx="98" cy="102" r="3.5" fill="#ffffff" opacity=".8"/>
      <rect x="128" y="76" width="24" height="14" rx="3" fill="#e9eef0" ${ln(1.8)}/>
      <rect x="48" y="78" width="16" height="12" rx="3" fill="#3a2d28"/>
      ${heart(56, 136, 6, RED)}`),

    mocha: S('#f4dede', `
      <path d="M86 46 c-8 -8 6 -14 0 -24 M108 46 c-8 -8 6 -14 0 -24" fill="none" stroke="#cdb9a4" stroke-width="3"/>
      <rect x="66" y="50" width="68" height="12" rx="5" fill="${CREAM}" ${ln()}/>
      <path d="M58 62 h84 l-4 14 h-76z" fill="${CREAM}" ${ln()}/>
      <path d="M62 76 L138 76 L128 168 L72 168 Z" fill="${RED}" ${ln()}/>
      <path d="M66 104 L134 104 L131 134 L69 134 Z" fill="#d9a877" ${ln(2)}/>
      ${heart(100, 119, 8, '#ffffff')}
      <g stroke="#ffffff" stroke-width="2" fill="none"><path d="M84 148 v12 M78 154 h12 M80 150 l8 8 M88 150 l-8 8"/><path d="M114 86 v10 M109 91 h10"/></g>
      ${peppermint(154, 154, 17)}${peppermint(42, 168, 11)}`),

    polish: S('#f6dede', `
      <rect x="82" y="30" width="36" height="58" rx="7" fill="#3a2d28" ${ln()}/>
      <path d="M90 36 v42" stroke="#ffffff" stroke-opacity=".35" stroke-width="4"/>
      <rect x="86" y="86" width="28" height="12" fill="${CREAM}" ${ln(2)}/>
      <rect x="60" y="96" width="80" height="78" rx="20" fill="${RED}" ${ln()}/>
      <path d="M72 112 c0 -6 4 -8 8 -8" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="5"/>
      ${[[76, 140], [90, 156], [118, 150], [124, 124], [104, 164], [80, 124]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${GOLD}"/>`).join('')}
      ${star4(104, 134, 10, GOLD)}
      ${heart(156, 84, 8, RED, ln(1.4))}${heart(44, 94, 6, PINK, ln(1.3))}${heart(160, 130, 5, '#e8a3a3')}`),

    stocking: S('#e2ebe0', `
      <path d="M98 42 V20 c0 -10 16 -10 16 0" fill="none" stroke="#ffffff" stroke-width="7"/>
      <path d="M98 42 V20 c0 -10 16 -10 16 0" fill="none" stroke="${RED}" stroke-width="7" stroke-dasharray="5 6"/>
      <rect x="112" y="22" width="20" height="20" fill="${GREEN}" ${ln(1.8)}/><rect x="119" y="22" width="6" height="20" fill="${RED}"/>
      ${star4(84, 28, 10, GOLD)}
      <path d="M86 56 L134 56 L134 116 C134 150 116 166 90 166 L72 166 C56 166 46 156 46 146 C46 132 58 124 74 124 L86 122 Z" fill="${RED}" ${ln()}/>
      <path d="M46 146 C46 132 58 124 74 124 L78 124 C82 140 78 158 74 166 L72 166 C56 166 46 156 46 146Z" fill="${GREEN}" ${ln(2)}/>
      <path d="M134 104 C134 120 132 130 128 136 C118 130 116 118 118 104 Z" fill="${GREEN}" ${ln(2)}/>
      <path d="M88 76 h44 M88 92 h44" stroke="#ffffff" stroke-width="4" stroke-dasharray="7 5"/>
      <rect x="78" y="38" width="64" height="24" rx="11" fill="#ffffff" ${ln()}/>
      <path d="M142 46 c12 -2 14 -14 6 -18" fill="none" ${ln(2.4)}/>
      ${star4(104, 140, 9, GOLD)}`),
  }

  window.ART = ART
})()
