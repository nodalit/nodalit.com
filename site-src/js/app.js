import allProjects from './projects.js'

const themes = [
  { word: 'brugervenlige', bg: '#f1f5f9', heroText: '#0f172a', accent: '#2563eb', heroFont: '' },
  { word: 'sjove', bg: '#ff006e', heroText: '#ffffff', accent: '#ffbe0b', heroFont: '' },
  { word: 'sikre', bg: '#081222', heroText: '#e0f7fa', accent: '#22d3ee', heroFont: 'font-mono' },
  { word: 'hurtige', bg: '#ffffff', heroText: '#111111', accent: '#111111', heroFont: 'font-italic' },
  { word: 'bæredygtige', bg: '#0c1f12', heroText: '#dcfce7', accent: '#4ade80', heroFont: '' },
  { word: 'billige', bg: '#fde047', heroText: '#b91c1c', accent: '#dc2626', heroFont: 'font-comic' },
]

const BALLOON_COLORS = [
  { bg: '#ffbe0b', fg: '#1f1300' },
  { bg: '#8338ec', fg: '#ffffff' },
  { bg: '#3a86ff', fg: '#ffffff' },
  { bg: '#4ade80', fg: '#052e16' },
  { bg: '#ffffff', fg: '#9d174d' },
]

const CONFETTI_COLORS = ['#ffbe0b', '#ffffff', '#8338ec', '#3a86ff', '#4ade80']

const fmt = (n) => n.toLocaleString('da-DK')

// --- DOM refs ---
const app = document.getElementById('app')
const hero = document.getElementById('hero')
const heroHeadline = document.getElementById('hero-headline')
const heroWord = document.getElementById('hero-word')
const heroCursor = document.getElementById('hero-cursor')
const navRail = document.getElementById('nav-rail')
const balloonField = document.getElementById('balloon-field')
const btnTilt = document.getElementById('btn-tilt')
const btnContact = document.getElementById('btn-contact')
const peekBalloon = document.getElementById('peek-balloon')
const speedlines = document.getElementById('speedlines')
const shownLoadMsEl = document.getElementById('shown-load-ms')
const tapRace = document.getElementById('tap-race')
const tapRacePanel = document.getElementById('tap-race-panel')
const cutLine = document.getElementById('cut-line')
const cutOverlay = document.getElementById('cut-overlay')
const cutScissors = document.getElementById('cut-scissors')
const cutLead = document.getElementById('cut-lead')
const coupon = document.getElementById('coupon')
const couponRedeem = document.getElementById('coupon-redeem')
const couponHint = document.getElementById('coupon-hint')
const confettiRoot = document.getElementById('confetti-root')
const modalContact = document.getElementById('modal-contact')
const modalContactClose = document.getElementById('modal-contact-close')
const modalProject = document.getElementById('modal-project')
const modalProjectClose = document.getElementById('modal-project-close')
const modalProjectDismiss = document.getElementById('modal-project-dismiss')
const modalProjectClient = document.getElementById('modal-project-client')
const modalProjectName = document.getElementById('modal-project-name')
const modalProjectTagline = document.getElementById('modal-project-tagline')
const modalProjectLink = document.getElementById('modal-project-link')

const sectionEls = Array.from(app.querySelectorAll('section'))

// --- state ---
let activeIdx = 0
let displayWord = themes[0].word
let typeTimer = null
let scrollRaf = null
let balloonRaf = 0
let bodiesB = []
let balloonEls = new Map()
let heldBalloon = null
let heldId = null
let confettiId = 0
const up = { x: 0, y: -1 }

let loadMs = 0
let shownLoadMs = 0
let perfAnimated = false

let tapState = 'idle' // idle | running | result
let tapMs = 0
let tapResult = null
let tapNext = 1
let tapStart = 0
let tapResetTimer = null

let cutProgress = 0
let cutting = false

// --- debug logging ---
function debugMsg(msg) {
  console.log(`[bg-debug] ${(performance.now() / 1000).toFixed(2)}s ${msg}`)
}

// call bgDebug() in the console when the background looks wrong
window.bgDebug = () => {
  console.table({
    scrollTop: Math.round(app.scrollTop),
    clientHeight: app.clientHeight,
    activeIdx,
    word: themes[activeIdx].word,
    expectedBg: themes[activeIdx].bg,
    inlineBg: document.body.style.backgroundColor,
    computedBg: getComputedStyle(document.body).backgroundColor,
    offsetTops: sectionEls.map(s => s.offsetTop).join(', '),
  })
}

// --- theme + typewriter ---
function applyTheme(idx) {
  const t = themes[idx]
  // painted on body, NOT the scroll container: scroll layers cache their
  // background in tiles, which can show a stale color after a fast fling
  document.body.style.backgroundColor = t.bg
  hero.style.color = t.heroText
  heroWord.style.color = t.accent
  heroCursor.style.color = t.accent

  heroHeadline.classList.remove('font-mono', 'font-comic', 'font-serif', 'font-italic')
  if (t.heroFont) heroHeadline.classList.add(t.heroFont)

  navRail.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx)
    dot.style.backgroundColor = t.heroText
  })
  navRail.querySelectorAll('.nav-label').forEach((label) => {
    label.style.color = t.heroText
  })

  speedlines.classList.toggle('hidden', idx !== 3)
}

function animateWord(target) {
  if (typeTimer) clearInterval(typeTimer)
  let phase = 'erase'
  typeTimer = setInterval(() => {
    if (phase === 'erase') {
      if (displayWord.length > 0) {
        displayWord = displayWord.slice(0, -1)
        heroWord.textContent = displayWord
      } else {
        phase = 'type'
      }
    } else if (displayWord.length < target.length) {
      displayWord = target.slice(0, displayWord.length + 1)
      heroWord.textContent = displayWord
    } else {
      clearInterval(typeTimer)
      typeTimer = null
    }
  }, 38)
}

function setActiveIdx(idx) {
  if (idx === activeIdx) return
  debugMsg(`idx ${activeIdx}→${idx} (${themes[idx].word}) scrollTop=${Math.round(app.scrollTop)}`)
  activeIdx = idx
  applyTheme(idx)
  animateWord(themes[idx].word)
  if (idx === 3) animatePerf()
  else resetTapRace()
}

// Nearest section by offsetTop, sampled every frame — robust against mobile
// viewport-height changes and never fights the native snap animation.
function updateActiveSection() {
  const scrollTop = app.scrollTop
  let best = 0
  let bestDist = Infinity
  sectionEls.forEach((s, i) => {
    const d = Math.abs(s.offsetTop - scrollTop)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  })
  setActiveIdx(best)
}

function scrollLoop() {
  updateActiveSection()
  scrollRaf = requestAnimationFrame(scrollLoop)
}

function goTo(i) {
  const section = sectionEls[i]
  if (section) app.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
}

// --- nav ---
function buildNav() {
  themes.forEach((t, i) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'nav-item'
    btn.setAttribute('aria-label', t.word)
    btn.innerHTML = `
      <span class="nav-label">${t.word}</span>
      <span class="nav-dot${i === 0 ? ' active' : ''}"></span>
    `
    btn.addEventListener('click', () => goTo(i))
    navRail.appendChild(btn)
  })
}

// --- speedlines ---
function buildSpeedlines() {
  for (let n = 1; n <= 8; n++) {
    const line = document.createElement('span')
    line.className = 'speedline'
    line.style.top = `${8 + n * 11}%`
    line.style.animationDelay = `${n * 0.18}s`
    speedlines.appendChild(line)
  }
}

// --- balloons ---
const featured = allProjects.filter((p) => p.featured)

function makeBalloons() {
  balloonField.innerHTML = ''
  balloonEls.clear()
  const W = window.innerWidth
  const H = window.innerHeight
  const projR = Math.max(44, Math.min(62, W / 8))
  const items = [
    ...featured.map((p) => ({ project: p, r: projR })),
    ...Array.from({ length: 5 }, () => ({ project: null, r: projR * 0.6 })),
  ]

  bodiesB = items.map((item, i) => {
    const color = BALLOON_COLORS[i % BALLOON_COLORS.length]
    const body = {
      id: i,
      project: item.project,
      r: item.r,
      x: Math.random() * W,
      y: Math.random() * H,
      speed: 0.35 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      wf: 0.8 + Math.random() * 1.2,
      scale: 1,
      tilt: 0,
      popped: false,
      frozen: false,
      bg: color.bg,
      fg: color.fg,
    }

    const el = document.createElement('button')
    el.type = 'button'
    el.className = 'balloon'
    el.innerHTML = `
      <span class="balloon-body">
        <span class="balloon-label">${body.project ? body.project.client : ''}</span>
      </span>
      <span class="balloon-knot"></span>
    `
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      grabBalloon(body)
    })
    el.addEventListener('contextmenu', (e) => e.preventDefault())
    balloonField.appendChild(el)
    balloonEls.set(body.id, el)
    return body
  })
}

function updateBalloonEl(b) {
  const el = balloonEls.get(b.id)
  if (!el) return
  el.hidden = b.popped
  const w = b.r * 2
  const h = b.r * 2.3
  el.style.left = `${b.x}px`
  el.style.top = `${b.y}px`
  el.style.width = `${w}px`
  el.style.height = `${h}px`
  el.style.transform = `translate(-50%, -50%) scale(${b.scale}) rotate(${b.tilt}deg)`
  el.style.zIndex = heldId === b.id || b.frozen ? 40 : 10

  const balloonBody = el.querySelector('.balloon-body')
  const knot = el.querySelector('.balloon-knot')
  const label = el.querySelector('.balloon-label')
  balloonBody.style.backgroundColor = b.bg
  balloonBody.style.color = b.fg
  knot.style.backgroundColor = b.bg
  label.style.opacity = heldId === b.id ? '0' : '1'
}

function balloonTick() {
  const W = window.innerWidth
  const H = window.innerHeight
  const t = performance.now() / 1000
  const perp = { x: -up.y, y: up.x }

  for (const b of bodiesB) {
    if (b.popped || b.frozen) continue

    if (heldBalloon === b) {
      const farthest = Math.max(
        Math.hypot(b.x, b.y),
        Math.hypot(W - b.x, b.y),
        Math.hypot(b.x, H - b.y),
        Math.hypot(W - b.x, H - b.y)
      )
      const needed = (farthest * 1.2) / b.r
      const progress = Math.min(1, (performance.now() - b.holdStart) / 700)
      const eased = progress * progress * progress
      b.scale = 1 + (needed - 1) * eased
      if (progress >= 1) {
        openProjectModal(b)
        heldBalloon = null
        heldId = null
        b.frozen = true
        setTimeout(() => {
          b.frozen = false
          b.scale = 1
        }, 500)
      }
      continue
    }

    if (b.scale > 1) b.scale = Math.max(1, b.scale * 0.86)

    const wobble = Math.sin(t * b.wf + b.phase)
    b.x += up.x * b.speed + perp.x * wobble * 0.45
    b.y += up.y * b.speed + perp.y * wobble * 0.45
    b.tilt = wobble * 7

    const m = b.r * 2.6
    if (b.y < -m) { b.y = H + m; b.x = Math.random() * W }
    if (b.y > H + m) { b.y = -m; b.x = Math.random() * W }
    if (b.x < -m) { b.x = W + m; b.y = Math.random() * H }
    if (b.x > W + m) { b.x = -m; b.y = Math.random() * H }
  }

  for (let i = 0; i < bodiesB.length; i++) {
    const a = bodiesB[i]
    if (a.popped || a.frozen || heldBalloon === a) continue
    for (let j = i + 1; j < bodiesB.length; j++) {
      const c = bodiesB[j]
      if (c.popped || c.frozen || heldBalloon === c) continue
      const dx = c.x - a.x
      const dy = c.y - a.y
      const dist = Math.hypot(dx, dy) || 0.001
      const minDist = (a.r + c.r) * 1.15
      if (dist < minDist) {
        const push = ((minDist - dist) / dist) * 0.5
        a.x -= dx * push * 0.5
        a.y -= dy * push * 0.5
        c.x += dx * push * 0.5
        c.y += dy * push * 0.5
      }
    }
  }

  for (const b of bodiesB) updateBalloonEl(b)
  balloonRaf = requestAnimationFrame(balloonTick)
}

function grabBalloon(b) {
  if (!b || b.popped || heldBalloon) return
  if (b.project) {
    b.holdStart = performance.now()
    heldBalloon = b
    heldId = b.id
  } else {
    b.popped = true
    burst(b.x, b.y)
    try { navigator.vibrate?.(60) } catch { /* unsupported */ }
    setTimeout(() => {
      b.x = Math.random() * window.innerWidth
      b.y = up.y <= 0 ? window.innerHeight + b.r * 2 : -b.r * 2
      b.popped = false
    }, 2500)
  }
}

function onOrientation(e) {
  if (e.gamma === null || e.beta === null) return
  const gx = Math.sin((e.gamma * Math.PI) / 180)
  const gy = Math.sin((Math.min(Math.max(e.beta, -90), 90) * Math.PI) / 180)
  const len = Math.hypot(gx, gy)
  if (len < 0.15) return
  up.x = -gx / len
  up.y = -gy / len
}

async function enableTilt() {
  try {
    const res = await DeviceOrientationEvent.requestPermission()
    if (res === 'granted') {
      btnTilt.classList.add('hidden')
      window.addEventListener('deviceorientation', onOrientation)
    }
  } catch {
    btnTilt.classList.add('hidden')
  }
}

// --- confetti ---
function burst(x, y) {
  const pieces = Array.from({ length: 26 }, () => {
    const el = document.createElement('span')
    el.className = 'confetti-piece'
    const dx = (Math.random() - 0.5) * 360
    const dy = (Math.random() - 0.9) * 360
    const rot = (Math.random() - 0.5) * 720
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.backgroundColor = color
    el.style.setProperty('--dx', `${dx}px`)
    el.style.setProperty('--dy', `${dy}px`)
    el.style.setProperty('--rot', `${rot}deg`)
    confettiRoot.appendChild(el)
    return el
  })
  setTimeout(() => pieces.forEach((el) => el.remove()), 1300)
}

// --- perf ---
function measurePerf() {
  const nav = performance.getEntriesByType('navigation')[0]
  if (!nav) return
  const t = nav.loadEventEnd > 0 ? nav.loadEventEnd : nav.domContentLoadedEventEnd
  loadMs = Math.max(1, Math.round(t))
}

function animatePerf() {
  if (perfAnimated) return
  perfAnimated = true
  measurePerf()
  renderTapRace()
  const start = performance.now()
  const dur = 900
  const step = () => {
    const p = Math.min(1, (performance.now() - start) / dur)
    const ease = 1 - (1 - p) ** 3
    shownLoadMs = Math.round(loadMs * ease)
    shownLoadMsEl.textContent = fmt(shownLoadMs)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// --- tap race: click 1-2-3 in order, timed from first to last click ---
function renderTapRace() {
  tapRace.classList.remove('tap-race--win', 'tap-race--lose')
  tapRacePanel.classList.toggle('tap-race-panel--result', tapState === 'result')

  if (tapState !== 'result') {
    const buttons = [1, 2, 3].map((n) => {
      const cls = n < tapNext ? ' tap-btn--done' : n === tapNext ? ' tap-btn--next' : ''
      return `<button type="button" class="tap-btn${cls}" data-n="${n}">${n}</button>`
    }).join('')
    tapRacePanel.innerHTML = `
      <span class="tap-race-title">Klik 1-2-3 så hurtigt du kan</span>
      <span class="tap-race-sub">Kan du slå sidens load-tid på ${fmt(loadMs || 1)} ms?</span>
      <span class="tap-btns">${buttons}</span>
    `
  } else {
    tapRace.classList.add(tapResult === 'win' ? 'tap-race--win' : 'tap-race--lose')
    const loads = Math.max(1, Math.floor(tapMs / Math.max(1, loadMs)))
    const loseText = loads >= 2
      ? `Imens kunne siden have loadet ${fmt(loads)} gange ⚡`
      : `Siden loadede på ${fmt(loadMs)} ms ⚡`
    tapRacePanel.innerHTML = `
      <span class="tap-race-result">${fmt(tapMs)} <span class="load-ms-unit">ms</span></span>
      <span class="tap-race-sub" style="font-weight:700;color:inherit;">
        ${tapResult === 'win' ? 'Du var hurtigere end siden! 🏆' : loseText}
      </span>
      <span class="tap-race-sub">Tryk for at prøve igen</span>
    `
  }
}

function resetTapRace() {
  tapState = 'idle'
  tapResult = null
  tapNext = 1
  tapStart = 0
  if (tapResetTimer) {
    clearTimeout(tapResetTimer)
    tapResetTimer = null
  }
  renderTapRace()
}

function onTapRace(e) {
  if (tapState === 'result') {
    resetTapRace()
    return
  }

  const btn = e.target.closest('.tap-btn')
  if (!btn || Number(btn.dataset.n) !== tapNext) return

  if (tapNext === 1) {
    tapStart = performance.now()
    tapState = 'running'
  }

  if (tapNext === 3) {
    tapMs = Math.max(1, Math.round(performance.now() - tapStart))
    tapResult = tapMs < loadMs ? 'win' : 'lose'
    tapState = 'result'
    if (tapResetTimer) {
      clearTimeout(tapResetTimer)
      tapResetTimer = null
    }
    renderTapRace()
    return
  }

  tapNext += 1
  renderTapRace()
  // abandoned mid-game: back to start after a pause
  if (tapResetTimer) clearTimeout(tapResetTimer)
  tapResetTimer = setTimeout(resetTapRace, 3000)
}

// --- coupon ---
function updateCutUI() {
  cutOverlay.style.width = `${cutProgress * 100}%`
  cutScissors.style.left = `${cutProgress * 100}%`
  cutScissors.style.visibility = cutProgress >= 1 ? 'hidden' : 'visible'

  const isCut = cutProgress >= 1
  coupon.classList.toggle('coupon-cut', isCut)
  couponRedeem.classList.toggle('hidden', !isCut)
  couponHint.classList.toggle('hidden', isCut)
  cutLead.textContent = isCut ? 'Kupon klippet — indløs her:' : 'Klip kuponen ud med saksen 👇'
}

function startCut() {
  if (cutProgress < 1) cutting = true
}

function onCutMove(e) {
  if (!cutting) return
  const rect = cutLine.getBoundingClientRect()
  const p = (e.clientX - rect.left) / rect.width
  cutProgress = Math.min(1, Math.max(cutProgress, p))
  updateCutUI()
  if (cutProgress >= 1) {
    cutting = false
    burst(rect.right - 10, rect.top + rect.height / 2)
    try { navigator.vibrate?.(80) } catch { /* unsupported */ }
  }
}

function stopCut() {
  cutting = false
}

// --- modals ---
function openModal(el) {
  el.classList.remove('hidden', 'closing')
}

function closeModal(el) {
  if (el.classList.contains('hidden')) return
  el.classList.add('closing')
  el.addEventListener('animationend', () => {
    el.classList.add('hidden')
    el.classList.remove('closing')
  }, { once: true })
}

function openContactModal() {
  openModal(modalContact)
}

function openProjectModal(b) {
  modalProject.style.backgroundColor = b.bg
  modalProject.style.color = b.fg
  modalProjectClose.style.borderColor = b.fg
  modalProjectClient.textContent = b.project.client
  modalProjectName.textContent = b.project.name
  modalProjectTagline.textContent = b.project.tagline

  if (b.project.url) {
    modalProjectLink.href = b.project.url
    modalProjectLink.style.borderColor = b.fg
    modalProjectLink.classList.remove('hidden')
  } else {
    modalProjectLink.classList.add('hidden')
  }

  openModal(modalProject)
}

// --- init ---
function init() {
  buildNav()
  buildSpeedlines()
  measurePerf()
  applyTheme(0)
  renderTapRace()
  updateCutUI()

  scrollRaf = requestAnimationFrame(scrollLoop)
  makeBalloons()
  balloonRaf = requestAnimationFrame(balloonTick)

  btnContact.addEventListener('click', openContactModal)
  modalContactClose.addEventListener('click', () => closeModal(modalContact))
  modalProjectClose.addEventListener('click', () => closeModal(modalProject))
  modalProjectDismiss.addEventListener('click', () => closeModal(modalProject))
  peekBalloon.addEventListener('click', () => goTo(1))
  btnTilt.addEventListener('click', enableTilt)
  tapRace.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    onTapRace(e)
  })
  cutScissors.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    startCut()
  })

  window.addEventListener('pointermove', onCutMove)
  window.addEventListener('pointerup', stopCut)

  const iosGate = typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  if (iosGate) {
    btnTilt.classList.remove('hidden')
  } else if (typeof DeviceOrientationEvent !== 'undefined') {
    window.addEventListener('deviceorientation', onOrientation)
  }
}

// The static HTML is the page; everything here is enhancement. Start it one
// task after the load event so script work never delays the page load.
if (document.readyState === 'complete') init()
else window.addEventListener('load', () => setTimeout(init, 0), { once: true })
