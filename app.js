;(function () {
  // ---------------- layout (matches the gingerbread house tree) ----------------
  const W = 760, H = 790, CX = 380
  const CELL = 88, ROW = 82, GAP = 6, TOP = 170
  const ROWS = [[4], [18, 7], [24, 2, 23], [5, 16, 12, 21], [14, 10, 9, 22, 3], [1, 19, 6, 20, 15, 11]]
  const TRUNK = [13, 17, 8]
  const BASE_Y = TOP + ROWS.length * ROW // 662
  const TRUNK_Y = BASE_Y + 18

  const DECO = {
    4: 'porthole', 18: 'swirl', 7: 'swirl', 24: 'window', 2: 'candyheart', 23: 'window',
    5: 'candy', 16: 'snow', 12: 'snow', 21: 'candy', 14: 'windowTree', 10: 'heart',
    9: 'wreath', 22: 'heart', 3: 'windowGifts', 1: 'fern', 19: 'candyheart', 6: 'door',
    20: 'door', 15: 'candyheart', 11: 'fern', 13: 'icing', 17: 'icing', 8: 'icing',
  }

  const KIND = { treat: 'a little treat', song: 'a song for you', joy: 'a little joy', cozy: 'cozy plans' }

  // ---------------- state ----------------
  const params = new URLSearchParams(location.search)
  // Sneak peek: /preview (or ?peek) unlocks every door in a sandbox.
  // It keeps its own opened/done/gift state and never touches the real calendar.
  const PEEK = params.has('peek') || /\/preview\/?$/.test(location.pathname)
  const K = PEEK ? 'advent26-peek-' : 'advent26-'
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)) || [] } catch { return [] } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} },
  }
  const opened = new Set(store.get(K + 'opened'))
  const done = new Set(store.get(K + 'done'))

  const now = new Date()
  const month = now.getMonth(), day = now.getDate()
  const isUnlocked = (n) => PEEK || (month === 11 && day >= n) || month === 0
  const todayN = month === 11 && day <= 24 ? day : null

  // ---------------- the gingerbread frame ----------------
  function frameSVG() {
    const ax = CX, ay = 50, baseY = BASE_Y + 14
    const slope = (CX - 44) / (baseY - ay) // half-width per unit y
    const half = (y) => (y - ay) * slope
    const L = [CX - half(baseY), baseY], R = [CX + half(baseY), baseY]

    // stepped shelves under each row
    let shelves = ''
    ROWS.forEach((row, i) => {
      const y = TOP + (i + 1) * ROW - 2
      const hw = (row.length * CELL) / 2 + 8
      shelves += `<rect x="${CX - hw}" y="${y - 2}" width="${hw * 2}" height="6" rx="2" fill="#9a5f35"/>`
    })

    // icing drips + candy hearts along both roof edges
    const sideLen = Math.hypot(L[0] - ax, L[1] - ay)
    let drips = '', candies = ''
    const colors = ['#f2a7b8', '#f6d36b', '#8fb5dc', '#b9a1d9', '#e86a6a', '#9bcf8f']
    let ci = 0
    for (const s of [-1, 1]) {
      const end = s < 0 ? L : R
      const ux = (end[0] - ax) / sideLen, uy = (end[1] - ay) / sideLen
      const nx = -s * uy, ny = s * ux // inward normal
      for (let t = 34; t < sideLen - 6; t += 21) {
        const px = ax + ux * t + nx * 15, py = ay + uy * t + ny * 15
        const len = 8 + ((Math.sin(t * 0.37 + s) + 1) * 7)
        drips += `<path d="M${px - 7} ${py - 4} V${py + len - 6} a7 7 0 0 0 14 0 V${py - 4}Z" fill="#fffdf8"/>`
      }
      for (let t = 56; t < sideLen - 20; t += 50) {
        const px = ax + ux * t, py = ay + uy * t
        const c = colors[ci++ % colors.length]
        candies += `<path d="M${px} ${py + 6} C${px - 10} ${py - 1} ${px - 4} ${py - 8} ${px} ${py - 3} C${px + 4} ${py - 8} ${px + 10} ${py - 1} ${px} ${py + 6}Z" fill="${c}" stroke="rgba(90,50,30,.25)" stroke-width="1"/>`
      }
    }

    // dashed stitch outline just outside the icing
    const off = 19, sinA = Math.sin(Math.atan(slope))
    const stitch = `M${L[0] - off / sinA * 0.88} ${L[1] + 4} L${ax} ${ay - off / sinA} L${R[0] + off / sinA * 0.88} ${R[1] + 4}`

    const pep = (() => {
      let w = ''
      for (let i = 0; i < 8; i++) {
        const a1 = (i * 45 * Math.PI) / 180, a2 = ((i * 45 + 22) * Math.PI) / 180
        if (i % 2) continue
        w += `<path d="M${ax} ${ay - 6} L${ax + 15 * Math.cos(a1)} ${ay - 6 + 15 * Math.sin(a1)} A15 15 0 0 1 ${ax + 15 * Math.cos(a2)} ${ay - 6 + 15 * Math.sin(a2)}Z" fill="#d9534f"/>`
      }
      let puffs = ''
      for (let i = 0; i < 10; i++) {
        const a = (i * 36 * Math.PI) / 180
        puffs += `<circle cx="${ax + 21 * Math.cos(a)}" cy="${ay - 6 + 21 * Math.sin(a)}" r="7" fill="#fffdf8"/>`
      }
      return `${puffs}<circle cx="${ax}" cy="${ay - 6}" r="21" fill="#fffdf8"/><circle cx="${ax}" cy="${ay - 6}" r="15" fill="#fff"/>${w}<circle cx="${ax}" cy="${ay - 6}" r="15" fill="none" stroke="#c9b8a6" stroke-width="1.2"/>`
    })()

    const tw = (TRUNK.length * CELL) / 2 + 10

    return `<svg class="frame" viewBox="0 0 ${W} ${H}" aria-hidden="true">
      <defs>
        <linearGradient id="cane" x1="0" x2="1" y1="0" y2="1" gradientUnits="objectBoundingBox" spreadMethod="repeat">
          <stop offset="0" stop-color="#d9534f"/><stop offset=".25" stop-color="#d9534f"/>
          <stop offset=".25" stop-color="#f6d36b"/><stop offset=".5" stop-color="#f6d36b"/>
          <stop offset=".5" stop-color="#7fb069"/><stop offset=".75" stop-color="#7fb069"/>
          <stop offset=".75" stop-color="#fffdf8"/><stop offset="1" stop-color="#fffdf8"/>
        </linearGradient>
        <pattern id="stripes" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <rect width="14" height="14" fill="#fffdf8"/><rect width="4" height="14" fill="#d9534f"/><rect x="7" width="3" height="14" fill="#7fb069"/><rect x="11" width="2" height="14" fill="#f6d36b"/>
        </pattern>
      </defs>
      <g filter="url(#wc)">
        <rect x="${ax + 30}" y="8" width="20" height="96" rx="9" fill="url(#stripes)" stroke="#8a5a3b" stroke-width="1.5" transform="rotate(10 ${ax + 40} 60)"/>
        <rect x="${CX - tw}" y="${BASE_Y}" width="${tw * 2}" height="${H - BASE_Y - 18}" rx="6" fill="#4a2a18"/>
        <path d="M${ax} ${ay} L${L[0]} ${L[1]} L${R[0]} ${R[1]}Z" fill="#4a2a18"/>
        <path d="M${ax} ${ay + 24} L${L[0] + 24} ${L[1] - 4} L${R[0] - 24} ${R[1] - 4}Z" fill="#3a2013"/>
        ${shelves}
        <rect x="${L[0] + 6}" y="${BASE_Y - 2}" width="${R[0] - L[0] - 12}" height="16" rx="4" fill="#a8693d"/>
        <path d="${stitch}" fill="none" stroke="#b08a6a" stroke-width="1.4" stroke-dasharray="4 5"/>
        <path d="M${L[0]} ${L[1]} L${ax} ${ay} L${R[0]} ${R[1]}" fill="none" stroke="#e7d8c6" stroke-width="38" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="M${L[0]} ${L[1]} L${ax} ${ay} L${R[0]} ${R[1]}" fill="none" stroke="#fffdf8" stroke-width="33" stroke-linejoin="round" stroke-linecap="round"/>
        ${drips}
        ${candies}
        ${pep}
        <path d="M${CX - tw - 10} ${H - 26} q14 -10 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 V${H - 10} H${CX - tw - 10}Z" fill="#fffdf8"/>
      </g>
    </svg>`
  }

  // ---------------- drawer face decorations (white icing) ----------------
  const Wc = '#fffdf8'
  const dots = (pts, r = 1.6) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${Wc}"/>`).join('')
  const snowLedge = `<path d="M10 63 h62 c3 6 -3 9 -8 7 c-4 4 -11 2 -13 -1 c-4 4 -12 4 -15 0 c-4 3 -12 3 -15 -2 c-6 2 -12 -1 -11 -4z" fill="${Wc}"/>`
  const winBase = (inner = '') => `
    <rect x="16" y="20" width="50" height="43" rx="2" fill="#f6c46b" opacity=".32"/>
    ${inner}
    <rect x="16" y="20" width="50" height="43" rx="2" fill="none" stroke="${Wc}" stroke-width="2.6"/>
    <path d="M41 20 v43 M16 42 h50" stroke="${Wc}" stroke-width="2.4"/>
    <path d="M17 25 q12 8 24 0 q12 8 24 0" fill="none" stroke="#3a2416" stroke-width="1"/>
    ${[[22, 28.5, '#f6d36b'], [30, 30.5, '#e86a6a'], [38, 27.5, '#9bcf8f'], [46, 27.5, '#f6d36b'], [54, 30.5, '#8fb5dc'], [61, 28, '#e86a6a']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="2" fill="${c}"/>`).join('')}
    ${snowLedge}`
  const heartPath = 'M41 61 C21 47 21 30 31.5 28 C37 27 40 30 41 34 C42 30 45 27 50.5 28 C61 30 61 47 41 61Z'

  const DECOS = {
    porthole: `<circle cx="41" cy="43" r="14" fill="#f6c46b" opacity=".35"/><circle cx="41" cy="43" r="14" fill="none" stroke="${Wc}" stroke-width="2.6"/>
      <path d="M41 29 v28 M27 43 h28" stroke="${Wc}" stroke-width="2"/><path d="M37 39 l8 8 M45 39 l-8 8" stroke="#f2a7b8" stroke-width="1.4"/>
      ${dots(Array.from({ length: 10 }, (_, i) => [41 + 19 * Math.cos(i * 0.628), 43 + 19 * Math.sin(i * 0.628)]))}`,
    swirl: `<g fill="none" stroke="${Wc}" stroke-width="2" stroke-linecap="round">
      <path d="M41 62 C41 50 41 40 41 26"/><path d="M41 52 C34 46 25 48 25 40 C25 34 32 34 33 39"/><path d="M41 52 C48 46 57 48 57 40 C57 34 50 34 49 39"/>
      <path d="M41 40 C35 36 33 30 37 26"/><path d="M41 40 C47 36 49 30 45 26"/></g>${dots([[29, 54], [53, 54], [33, 28], [49, 28], [41, 20]])}`,
    window: winBase(),
    windowTree: winBase(`<path d="M28 60 l-9 0 l9 -15 l9 15z M28 50 l-7 0 l7 -12 l7 12z" fill="#4f7a55"/><circle cx="28" cy="37" r="2.4" fill="#f6d36b"/>
      <circle cx="55" cy="36" r="3" fill="#e86a6a"/><path d="M55 22 v11" stroke="#3a2416" stroke-width=".8"/><circle cx="60" cy="47" r="2.6" fill="#8fb5dc"/><path d="M60 22 v22" stroke="#3a2416" stroke-width=".8"/>`),
    windowGifts: winBase(`<rect x="46" y="49" width="10" height="11" fill="#e86a6a"/><rect x="50" y="49" width="2" height="11" fill="${Wc}"/><rect x="56" y="45" width="8" height="15" fill="#5f8a63"/><rect x="59" y="45" width="2" height="15" fill="${Wc}"/>`),
    candyheart: `<path d="${heartPath}" fill="none" stroke="${Wc}" stroke-width="5" stroke-linejoin="round"/>
      <path d="${heartPath}" fill="none" stroke="#d9534f" stroke-width="5" stroke-dasharray="3.5 4" stroke-linejoin="round"/>`,
    heart: `<path d="${heartPath}" fill="#e2584f" stroke="${Wc}" stroke-width="2.4" transform="translate(41 44) scale(.82) translate(-41 -44)"/>
      ${dots([[18, 40], [20, 30], [27, 22], [36, 22], [46, 22], [55, 22], [62, 30], [64, 40], [59, 51], [52, 59], [30, 59], [23, 51], [41, 67]], 1.4)}`,
    snow: `<g stroke="${Wc}" stroke-width="2" stroke-linecap="round" fill="none">
      ${[0, 60, 120].map((a) => `<path d="M41 27 v32 M37 30 l4 4 l4 -4 M37 56 l-0 0 l4 -4 l4 4" transform="rotate(${a} 41 43)"/>`).join('')}</g>
      ${dots([[41, 43]], 2.4)}`,
    candy: `${[29, 53].map((x) => `<path d="M${x - 14} ${43} l-6 -6 v12z M${x + 14} 43 l6 -6 v12z" fill="${Wc}"/>
      <circle cx="${x}" cy="43" r="10" fill="${Wc}"/>
      ${[0, 1, 2].map((i) => `<path d="M${x} 43 L${x + 10 * Math.cos(i * 2.09)} ${43 + 10 * Math.sin(i * 2.09)} A10 10 0 0 1 ${x + 10 * Math.cos(i * 2.09 + 0.8)} ${43 + 10 * Math.sin(i * 2.09 + 0.8)}Z" fill="#d9534f"/>`).join('')}`).join('')}`,
    fern: `<g fill="none" stroke="${Wc}" stroke-width="1.9" stroke-linecap="round">
      <path d="M41 64 C40 50 41 36 44 22"/>
      ${[0, 1, 2, 3].map((i) => { const y = 56 - i * 9; return `<path d="M${41 + i * 0.5} ${y} C${33 - i} ${y - 3} ${28 - i} ${y - 9} ${27 + i} ${y - 15}"/><path d="M${41 + i * 0.6} ${y} C${49 + i} ${y - 3} ${54 + i} ${y - 9} ${55 - i} ${y - 15}"/>` }).join('')}
      <path d="M20 64 C24 54 22 44 18 36 M62 64 C58 54 60 44 64 36"/></g>${dots([[44, 20], [25, 34], [57, 34]])}`,
    door: `<rect x="17" y="18" width="48" height="50" rx="2" fill="none" stroke="${Wc}" stroke-width="2"/>
      <rect x="22" y="23" width="38" height="40" rx="1" fill="none" stroke="${Wc}" stroke-width="1.4"/>
      <path d="M41 30 v26 M31 43 h20" stroke="${Wc}" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="41" cy="43" r="3.5" fill="${Wc}"/>${dots([[41, 27], [41, 59], [28, 43], [54, 43]], 2)}`,
    wreath: `<path d="M16 70 V30 a25 22 0 0 1 50 0 V70" fill="#5a3420" opacity=".25"/>
      <path d="M16 70 V30 a25 22 0 0 1 50 0 V70" fill="none" stroke="${Wc}" stroke-width="2.2"/>
      <path d="M21 70 V31 a20 17 0 0 1 40 0 V70" fill="none" stroke="${Wc}" stroke-width="1.2"/>
      <circle cx="41" cy="40" r="10" fill="none" stroke="#4f7a55" stroke-width="5.5"/>
      <circle cx="41" cy="40" r="10" fill="none" stroke="#7fb069" stroke-width="2" stroke-dasharray="2 4"/>
      ${dots([[33, 34], [48, 35], [36, 48], [47, 47]], 1.6).replaceAll(Wc, '#e86a6a')}
      <path d="M41 50 l-6 4 l1 -7z M41 50 l6 4 l-1 -7z" fill="#d9534f"/><circle cx="41" cy="50" r="2.2" fill="#d9534f"/>
      <circle cx="58" cy="58" r="2" fill="#f6d36b"/><rect x="30" y="66" width="22" height="4" rx="2" fill="#f6d36b"/>`,
    icing: `<path d="M0 30 C10 25 20 35 30 30 S50 25 60 30 S76 35 82 30 V39 C72 45 62 36 52 41 S32 47 22 41 S6 37 0 42Z" fill="${Wc}"/>
      ${dots([[12, 52], [28, 54], [44, 52], [60, 54], [74, 52]], 1.4)}`,
  }

  // ---------------- build ----------------
  const cal = document.getElementById('calendar')
  cal.innerHTML = frameSVG()
  const cells = {}
  const pct = (v, total) => `${(v / total) * 100}%`

  function place(n, x, y) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'cell'
    b.dataset.day = n
    Object.assign(b.style, { left: pct(x, W), top: pct(y, H), width: pct(CELL - GAP, W), height: pct(ROW - GAP, H) })
    b.setAttribute('aria-label', `December ${n}`)
    b.innerHTML = `<span class="inside">${window.ART[window.DAYS[n].art]}</span>
      <span class="door"><svg class="deco" viewBox="0 0 82 76" preserveAspectRatio="none" aria-hidden="true">${DECO[n] === 'icing' ? DECOS.icing : `<g transform="translate(9 -3) scale(.87)">${DECOS[DECO[n]]}</g>`}</svg><span class="notch"></span><span class="num">${n}</span></span>`
    b.addEventListener('click', () => onCell(n))
    cal.appendChild(b)
    cells[n] = b
    if (opened.has(n) && isUnlocked(n)) b.classList.add('open')
    if (n === todayN && !opened.has(n)) b.classList.add('today')
  }

  ROWS.forEach((row, ri) => {
    const k = row.length
    row.forEach((n, i) => place(n, CX - (k * CELL) / 2 + i * CELL + GAP / 2, TOP + ri * ROW + GAP / 2))
  })
  TRUNK.forEach((n, i) => place(n, CX - (TRUNK.length * CELL) / 2 + i * CELL + GAP / 2, TRUNK_Y))

  // ---------------- interactions ----------------
  const dlg = document.getElementById('gift')
  const $ = (id) => document.getElementById(id)
  let current = null

  function onCell(n) {
    const cell = cells[n]
    if (!isUnlocked(n)) {
      cell.classList.remove('wiggle'); void cell.offsetWidth; cell.classList.add('wiggle')
      const dec1 = new Date(now.getFullYear(), 11, n)
      const sleeps = Math.ceil((dec1 - new Date(now.getFullYear(), month, day)) / 86400000)
      toast(`Not yet, little elf! Door ${n} opens on December ${n}. ${sleeps === 1 ? 'Just 1 more sleep' : `${sleeps} more sleeps`} ✦`)
      return
    }
    if (cell.classList.contains('open')) return showGift(n)
    cell.classList.add('open')
    cell.classList.remove('today')
    opened.add(n)
    store.set(K + 'opened', [...opened])
    burst(cell)
    updateProgress()
    setTimeout(() => showGift(n), 650)
  }

  function showGift(n) {
    const d = window.DAYS[n]
    current = n
    $('gift-art').innerHTML = window.ART[d.art]
    $('gift-day').textContent = `December ${n}`
    $('gift-kind').textContent = KIND[d.kind] || ''
    $('gift-title').textContent = d.title
    $('gift-artist').textContent = d.artist ? `by ${d.artist}` : ''
    $('gift-text').textContent = d.text
    const a = $('gift-action')
    const act = d.action || {}
    if (act.song) {
      a.href = `https://open.spotify.com/search/${encodeURIComponent(act.song)}`
      a.textContent = '▶  Play on Spotify'
    } else if (act.place) {
      a.href = `https://www.google.com/maps/search/${encodeURIComponent(act.place + ' near me')}`
      a.textContent = 'Find one nearby ↗'
    } else if (act.url) {
      a.href = act.url
      a.textContent = act.label || 'Open ↗'
    }
    a.hidden = !(act.song || act.place || act.url)
    renderFamilyNotes(n)
    syncDid()
    dlg.showModal()
  }

  function syncDid() {
    const b = $('gift-did')
    const isDone = done.has(current)
    b.setAttribute('aria-pressed', String(isDone))
    b.textContent = isDone ? '✓ did it!' : 'I did it ♡'
  }
  $('gift-did').addEventListener('click', () => {
    if (done.has(current)) done.delete(current)
    else { done.add(current); burst($('gift-did'), 14) }
    store.set(K + 'done', [...done])
    syncDid()
    updateProgress()
  })

  dlg.querySelector('.close').addEventListener('click', () => dlg.close())
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close() })

  $('reset').addEventListener('click', () => {
    opened.clear(); done.clear()
    store.set(K + 'opened', []); store.set(K + 'done', [])
    Object.values(cells).forEach((c) => c.classList.remove('open'))
    if (todayN) cells[todayN].classList.add('today')
    updateProgress()
  })

  let toastTimer
  function toast(msg, ms = 2800) {
    const t = $('toast')
    t.textContent = msg
    t.classList.add('show')
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => t.classList.remove('show'), ms)
  }

  function burst(el, count = 26) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    const colors = ['#c94a4a', '#e6b84f', '#5f8a63', '#f2a7b8', '#8fb5dc', '#ffffff']
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span')
      s.className = 'bit'
      const a = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90
      const size = 6 + Math.random() * 8
      const c = colors[i % colors.length]
      const star = i % 3 === 0
      s.innerHTML = star
        ? `<svg width="${size * 1.6}" height="${size * 1.6}" viewBox="-10 -10 20 20"><path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10Z" fill="${c}" stroke="rgba(90,58,40,.3)" stroke-width=".6"/></svg>`
        : `<svg width="${size}" height="${size}" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="${c}" stroke="rgba(90,58,40,.3)" stroke-width=".6"/></svg>`
      s.style.left = cx + 'px'
      s.style.top = cy + 'px'
      s.style.setProperty('--dx', Math.cos(a) * dist + 'px')
      s.style.setProperty('--dy', Math.sin(a) * dist - 30 + 'px')
      s.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg')
      document.body.appendChild(s)
      setTimeout(() => s.remove(), 1200)
    }
  }

  function updateProgress() {
    const nOpen = [...opened].filter(isUnlocked).length
    const msg = nOpen === 0 ? 'No doors opened yet' : nOpen === 24 ? 'Every door is open. Merry Christmas! ♡' : `${nOpen} of 24 doors opened`
    $('progress').textContent = done.size ? `${msg} · ${done.size} joy${done.size === 1 ? '' : 's'} done ♡` : msg
    $('reset').hidden = opened.size === 0
  }

  // ---------------- gifts from family ----------------
  const FKIND = { note: 'a sweet note', treat: 'a little treat', song: 'a song for you', plan: 'a plan together' }
  const localGifts = store.get(K + 'gifts')
  let serverGifts = []
  let serverEnabled = false

  const allGifts = () => {
    const seen = new Set(), out = []
    for (const g of [...serverGifts, ...localGifts]) if (g && !seen.has(g.id)) { seen.add(g.id); out.push(g) }
    return out
  }
  const giftsFor = (n) => allGifts().filter((g) => g.day === n)

  function cleanGift(g) {
    const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
    const day = Number(g && g.day)
    const link = str(g && g.link, 400)
    const out = {
      id: str(g && g.id, 40),
      from: str(g && g.from, 40),
      day: Number.isInteger(day) && day >= 1 && day <= 24 ? day : 0,
      secret: Boolean(g && g.secret),
      kind: FKIND[g && g.kind] ? g.kind : 'note',
      title: str(g && g.title, 80),
      text: str(g && g.text, 600),
      link: /^https?:\/\//i.test(link) ? link : '',
    }
    return out.id && out.from && out.title && out.day ? out : null
  }

  function renderBadges() {
    const days = new Set(allGifts().map((g) => g.day))
    Object.entries(cells).forEach(([n, c]) => {
      const has = days.has(Number(n))
      c.classList.toggle('has-gift', has)
      c.setAttribute('aria-label', `December ${n}${has ? ', with a gift from family' : ''}`)
    })
  }

  function renderFamilyNotes(n) {
    const box = $('family-notes')
    box.replaceChildren()
    for (const g of giftsFor(n)) {
      const el = document.createElement('div')
      el.className = 'fnote'
      const from = document.createElement('p'); from.className = 'fnote-from'; from.textContent = `From ${g.from} ♡`
      const kind = document.createElement('span'); kind.className = 'tag-kind'; kind.textContent = FKIND[g.kind]
      const h = document.createElement('h3'); h.textContent = g.title
      el.append(from, kind, h)
      if (g.text) { const p = document.createElement('p'); p.className = 'fnote-text'; p.textContent = g.text; el.append(p) }
      if (g.link) {
        const a = document.createElement('a')
        a.className = 'btn ghost small'; a.href = g.link; a.target = '_blank'; a.rel = 'noopener'
        a.textContent = /spotify|music\.apple|youtu|soundcloud/i.test(g.link) ? '▶  Play it' : 'Open link ↗'
        el.append(a)
      }
      box.append(el)
    }
  }

  // base64url <-> unicode JSON, for gift links
  const enc = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  const dec = (s) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/')))))
  const realUrl = () => location.href.split('#')[0].split('?')[0].replace(/\/preview\/?$/, '/')
  const pageUrl = realUrl

  // A gift link was opened: tuck it into this calendar
  ;(function receive() {
    const m = location.hash.match(/^#gift=([\w-]+)/)
    if (!m) return
    if (PEEK) { location.replace(realUrl() + location.hash); return }
    history.replaceState(null, '', location.href.split('#')[0])
    let g = null
    try { g = cleanGift(dec(m[1])) } catch {}
    if (!g) return toast('Hmm, that gift link looks broken. Ask them to send it again?')
    if (!localGifts.some((x) => x.id === g.id)) { localGifts.push(g); store.set(K + 'gifts', localGifts) }
    renderBadges()
    setTimeout(() => {
      toast(g.secret ? `🎁 ${g.from} tucked a gift behind a secret door!` : `🎁 ${g.from} tucked a gift behind door ${g.day}!`, 5000)
      burst(cells[g.day])
    }, 700)
  })()

  // Shared storage on Vercel (api/gifts.js), if it's connected
  // (skipped in sneak peek, so a preview never spoils real gifts)
  if (!PEEK) fetch('/api/gifts', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data || !data.enabled) return
      serverEnabled = true
      serverGifts = (data.gifts || []).map(cleanGift).filter(Boolean)
      renderBadges()
    })
    .catch(() => {})

  // The "add a gift" form
  const giver = $('giver')
  const form = $('gift-form')
  const daySel = form.elements.day
  for (let i = 1; i <= 24; i++) daySel.add(new Option(`Door ${i}  (Dec ${i})`, String(i)))
  const showStep = (id) => giver.querySelectorAll('.step').forEach((el) => (el.hidden = el.id !== id))

  $('add-gift').addEventListener('click', () => { showStep('gift-form'); $('form-err').textContent = ''; giver.showModal() })
  giver.querySelector('.close').addEventListener('click', () => giver.close())
  giver.addEventListener('click', (e) => { if (e.target === giver) giver.close() })
  const again = () => { form.reset(); $('form-err').textContent = ''; showStep('gift-form') }
  $('send-another').addEventListener('click', again)
  $('saved-another').addEventListener('click', again)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const f = form.elements
    const err = $('form-err')
    const link = f.link.value.trim()
    if (!f.from.value.trim()) return (err.textContent = 'Add your name so Eisha knows who it’s from ♡')
    if (!f.title.value.trim()) return (err.textContent = 'Give your gift a little title.')
    if (link && !/^https?:\/\//i.test(link)) return (err.textContent = 'Links should start with https://')
    err.textContent = ''
    const secret = f.day.value === 'any'
    const gift = cleanGift({
      id: Math.random().toString(36).slice(2, 12) + Date.now().toString(36),
      from: f.from.value, day: secret ? 1 + Math.floor(Math.random() * 24) : Number(f.day.value),
      secret, kind: f.kind.value, title: f.title.value, text: f.text.value, link,
    })

    if (PEEK) {
      localGifts.push(gift)
      store.set(K + 'gifts', localGifts)
      renderBadges()
      $('saved-text').textContent = `Sneak peek test: it’s behind door ${gift.day} on this device only, and won’t be sent to Eisha. Use the real calendar link to send real gifts!`
      showStep('saved-step')
      burst(giver.querySelector('.tag'))
      return
    }

    if (serverEnabled) {
      const btn = $('wrap-btn'); btn.disabled = true; btn.textContent = 'Wrapping…'
      try {
        const r = await fetch('/api/gifts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gift) })
        if (!r.ok) throw new Error()
        serverGifts.push(gift)
        renderBadges()
        $('saved-text').textContent = gift.secret
          ? 'It’s hiding behind a secret door. Eisha will find it when that door opens!'
          : `It’s waiting behind door ${gift.day}, and stays a surprise until December ${gift.day}.`
        showStep('saved-step')
        burst(giver.querySelector('.tag'))
        return
      } catch {
        // storage hiccup: fall back to a gift link below
      } finally { btn.disabled = false; btn.textContent = 'Wrap it up 🎁' }
    }

    const url = `${pageUrl()}#gift=${enc(gift)}`
    const msg = `🎁 I tucked a surprise into your advent calendar! Tap to add it: ${url}`
    $('send-text').href = `sms:?&body=${encodeURIComponent(msg)}`
    $('send-email').href = `mailto:?subject=${encodeURIComponent('A gift for your advent calendar 🎄')}&body=${encodeURIComponent(msg)}`
    $('send-share').hidden = !navigator.share
    $('send-share').onclick = () => navigator.share({ title: 'A gift for your advent calendar', text: '🎁 I tucked a surprise into your advent calendar!', url }).catch(() => {})
    $('send-copy').onclick = () => {
      navigator.clipboard.writeText(url).then(() => toast('Link copied! Now paste it to Eisha ♡'), () => prompt('Copy this link:', url))
    }
    showStep('send-step')
  })

  renderBadges()

  // ---------------- header status ----------------
  ;(function status() {
    const el = $('status')
    if (PEEK) {
      document.body.classList.add('peek')
      el.innerHTML = 'Sneak peek: every door is unlocked, just for testing ✦'
      const bar = document.createElement('div')
      bar.className = 'peek-bar'
      bar.innerHTML = '<span>👀 Sneak peek mode. Nothing here changes the real calendar.</span>'
      const a = document.createElement('a'); a.href = realUrl(); a.textContent = 'Go to the real calendar →'
      bar.append(a)
      document.body.prepend(bar)
      return
    }
    if (month === 11 && day <= 24) el.textContent = `Day ${day}: today’s door is glowing ✦`
    else if (month === 11) el.textContent = 'Merry Christmas! Every door is open ♡'
    else if (month === 0) el.textContent = 'Happy New Year! Revisit any door you like ♡'
    else {
      const start = new Date(now.getFullYear(), 11, 1)
      const sleeps = Math.ceil((start - new Date(now.getFullYear(), month, day)) / 86400000)
      el.textContent = `${sleeps} sleep${sleeps === 1 ? '' : 's'} until the first door opens ✦`
    }
  })()
  updateProgress()

  // ---------------- garland + snow ----------------
  ;(function garland() {
    const g = document.querySelector('.garland')
    const colors = ['#e86a6a', '#f6d36b', '#9bcf8f', '#8fb5dc', '#f2a7b8']
    const GW = Math.max(360, window.innerWidth)
    g.setAttribute('viewBox', `0 0 ${GW} 70`)
    let wire = 'M0 10', bulbs = ''
    const n = Math.round(GW / 100)
    for (let i = 0; i < n; i++) {
      const x0 = (i * GW) / n, x1 = ((i + 1) * GW) / n
      wire += ` Q${(x0 + x1) / 2} 46 ${x1} 10`
      for (const t of [0.3, 0.7]) {
        const x = x0 + (x1 - x0) * t
        const y = 10 + 72 * t * (1 - t)
        const c = colors[(i * 2 + (t > 0.5 ? 1 : 0)) % colors.length]
        bulbs += `<g class="bulb" style="animation-delay:${((i * 2 + t * 2) % 5) * 0.45}s"><rect x="${x - 3}" y="${y - 2}" width="6" height="5" rx="1" fill="#6b5a4a"/><ellipse cx="${x}" cy="${y + 9}" rx="6" ry="9" fill="${c}"/><ellipse cx="${x - 2}" cy="${y + 6}" rx="1.6" ry="3" fill="#fff" opacity=".6"/></g>`
      }
    }
    g.innerHTML = `<path d="${wire}" fill="none" stroke="#5a4636" stroke-width="2"/>${bulbs}`
  })()

  ;(function snow() {
    const box = document.querySelector('.snow')
    const count = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 38
    for (let i = 0; i < count; i++) {
      const f = document.createElement('span')
      f.className = 'flake'
      const s = 3 + Math.random() * 5
      Object.assign(f.style, {
        left: Math.random() * 100 + '%',
        width: s + 'px',
        height: s + 'px',
        opacity: 0.55 + Math.random() * 0.45,
        animationDuration: 9 + Math.random() * 12 + 's',
        animationDelay: -Math.random() * 20 + 's',
      })
      f.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px')
      box.appendChild(f)
    }
  })()
})()
