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
  { bg: '#3a86ff', fg: '#00143c' },
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
const heroWordSr = document.getElementById('hero-word-sr')
const heroCursor = document.getElementById('hero-cursor')
const navRail = document.getElementById('nav-rail')
const btnMotion = document.getElementById('btn-motion')
const balloonField = document.getElementById('balloon-field')
const btnTilt = document.getElementById('btn-tilt')
const btnContact = document.getElementById('btn-contact')
const peekBalloon = document.getElementById('peek-balloon')
const speedlines = document.getElementById('speedlines')
const shownLoadMsEl = document.getElementById('shown-load-ms')
const co2Note = document.getElementById('co2-note')
const tapRace = document.getElementById('tap-race')
const tapRacePanel = document.getElementById('tap-race-panel')
const tapRacePlay = document.getElementById('tap-race-play')
const tapRaceLoad = document.getElementById('tap-race-load')
const tapRaceResult = document.getElementById('tap-race-result')
const tapRaceMs = document.getElementById('tap-race-ms')
const tapRaceVerdict = document.getElementById('tap-race-verdict')
const tapRaceVerdictText = document.getElementById('tap-race-verdict-text')
const tapRaceVerdictEmoji = document.getElementById('tap-race-verdict-emoji')
const tapRaceRetry = document.getElementById('tap-race-retry')
const tapBtns = Array.from(tapRace.querySelectorAll('.tap-btn'))
const btnDecrypt = document.getElementById('btn-decrypt')
const secureCopy = document.getElementById('secure-copy')
const cutLine = document.getElementById('cut-line')
const cutOverlay = document.getElementById('cut-overlay')
const cutScissors = document.getElementById('cut-scissors')
const cutLeadText = document.getElementById('cut-lead-text')
const cutLeadEmoji = document.getElementById('cut-lead-emoji')
const coupon = document.getElementById('coupon')
const couponRedeem = document.getElementById('coupon-redeem')
const couponRedeemLink = couponRedeem.querySelector('.coupon-redeem')
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
const modalProjectRole = document.getElementById('modal-project-role')
const modalProjectLink =document.getElementById('modal-project-link')
const bgBase = document.getElementById('bg-base')
const bgFade = document.getElementById('bg-fade')

const sectionEls = Array.from(app.querySelectorAll('section'))
const balloonIdx = sectionEls.indexOf(balloonField.closest('section'))
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
// OS setting or the pause toggle
const still = () => reduceMotion.matches || document.documentElement.classList.contains('still')

// --- state ---
let activeIdx = 0
let settledIdx = -1
let displayWord = themes[0].word
let typeTimer = null
let navDots = []
let navItems = []
let bgAnim = null
let bgBaseColor = themes[0].bg
let bgTarget = themes[0].bg

let sectionTops = []
let viewH = 0
// section height (svh); balloon bounds, since sections no longer track .app
let secH = 0
let scrollTick = 0
let stepping = false
let stepTarget = 0
let stepTimer = null

const BG_FADE_MS = 350

// Sustainable Web Design Model v4: 0.300 kWh/GB (operational + embodied,
// all three segments) × 494 g CO₂e/kWh. One measured page view, no
// green-hosting discount.
const MG_CO2_PER_BYTE = 0.3 * 494 * 1000 / 1e9

const GAP_MS = 140
const ACC_MIN = 4
const MIN_HOLD = 350
// reduced motion ends a step instantly, so the hold is the only guard
// against one long drag double-stepping
const MIN_HOLD_REDUCED = 700
const SPIKE_MIN = 12
const STEP_START_MS = 500
const STEP_IDLE_MS = 300
let lastWheelT = 0
let acc = 0
let consumed = false
let tailLow = Infinity
let holdUntil = 0

let balloonRaf = 0
let bodiesB = []
let heldBalloon = null
let heldId = null
const up = { x: 0, y: -1 }

let loadMs = 0
let shownLoadMs = 0
let perfAnimated = false

let tapState = 'idle' // idle | running | result
let tapMs = 0
let tapResult = null
let tapNext = 1
let tapStart = 0

let cutProgress = 0
let cutting = false
let cutMoved = false
let cutDownX = 0
let cutRaf = 0

const closeTimers = new Map()

// call bgDebug() in the console when the background looks wrong
window.bgDebug = () => {
  console.table({
    scrollTop: Math.round(app.scrollTop),
    clientHeight: app.clientHeight,
    activeIdx,
    stepping,
    word: themes[activeIdx].word,
    expectedBg: themes[activeIdx].bg,
    bgBase: getComputedStyle(bgBase).backgroundColor,
    bgTarget,
    bgFadeColor: getComputedStyle(bgFade).backgroundColor,
    bgFadeOpacity: getComputedStyle(bgFade).opacity,
    bgFadeProgress: bgAnim?.effect.getComputedTiming().progress ?? null,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    sectionTops: sectionTops.join(', '),
  })
}

// --- background layers ---
function parseColor(c) {
  if (c.startsWith('#')) return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
  return c.match(/[\d.]+/g).slice(0, 3).map(Number)
}

// per-channel sRGB lerp; takes #rrggbb or a previous result, returns rgb()
function mixHex(a, b, p) {
  const ca = parseColor(a)
  const cb = parseColor(b)
  const [r, g, bl] = ca.map((v, i) => Math.round(v + (cb[i] - v) * p))
  return `rgb(${r}, ${g}, ${bl})`
}

function setBg(c) {
  if (c === bgTarget) return
  // fold the in-flight fade into the base so A→B→A reverses from where it is
  const p = bgAnim ? (bgAnim.effect.getComputedTiming().progress ?? 1) : 1
  bgBaseColor = mixHex(bgBaseColor, bgTarget, p)
  bgBase.style.backgroundColor = bgBaseColor
  bgTarget = c
  bgFade.style.backgroundColor = c
  bgAnim?.cancel()
  // first application (e.g. a restored scroll position) lands without a fade
  const instant = still() || settledIdx === -1
  bgAnim = bgFade.animate({ opacity: [0, 1] }, { duration: instant ? 0 : BG_FADE_MS, easing: 'ease', fill: 'forwards' })
  // commit the finished fade to the base so it doesn't keep the old colour
  const anim = bgAnim
  anim.onfinish = () => {
    if (anim !== bgAnim) return
    bgBaseColor = bgTarget
    bgBase.style.backgroundColor = bgTarget
  }
}

// --- theme + typewriter ---
function applyTheme(idx) {
  const t = themes[idx]
  // fixed opacity-faded layers, NOT the scroll container: scroll layers cache
  // their background in tiles, which can show a stale color after a fast fling
  setBg(t.bg)
  // instant; body sits under the bg layers and drives toolbar tint / safe areas
  document.body.style.backgroundColor = t.bg
  hero.style.color = t.heroText
  heroWord.style.color = t.accent
  heroCursor.style.color = t.accent
  heroHeadline.classList.remove('font-mono', 'font-comic', 'font-serif', 'font-italic')
  if (t.heroFont) heroHeadline.classList.add(t.heroFont)
  // hiding happens in settleSection so they don't pop out mid-step
  if (idx === 3) speedlines.classList.remove('hidden')

  // dots, labels and the pause toggle all paint with currentColor
  navRail.style.color = t.heroText
  navDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx)
  })
  navItems.forEach((item, i) => {
    if (i === idx) item.setAttribute('aria-current', 'true')
    else item.removeAttribute('aria-current')
  })
}

function animateWord(target) {
  if (typeTimer) clearInterval(typeTimer)
  typeTimer = null
  if (still()) {
    displayWord = target
    heroWord.textContent = target
    return
  }
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
  activeIdx = idx
  applyTheme(idx)
  animateWord(themes[idx].word)
  // screen readers get the whole word once; the typed one is aria-hidden
  heroWordSr.textContent = themes[idx].word
}

// Arrival/leave side effects. Can run repeatedly, so the heavy part bails
// unless the section changed. Speedline visibility is synced first so an
// aborted step can't leave them running.
function settleSection() {
  speedlines.classList.toggle('hidden', activeIdx !== 3)
  if (settledIdx === activeIdx) return
  settledIdx = activeIdx
  if (activeIdx === 3) {
    animatePerf()
  } else if (tapState !== 'idle') {
    resetTapRace()
  }
  if (activeIdx === 4) renderCo2()
}

// --- scroll ---
const clampIdx = (i) => Math.max(0, Math.min(sectionEls.length - 1, i))

function nearestIdx(scrollTop) {
  let best = 0
  let bestDist = Infinity
  sectionTops.forEach((top, i) => {
    const d = Math.abs(top - scrollTop)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  })
  return best
}

// Cached on resize so scroll frames never read layout beyond scrollTop
function measure() {
  // defensive clamp: keeps every top reachable if .app outgrows the spacer
  const maxTop = app.scrollHeight - app.clientHeight
  sectionTops = sectionEls.map((s) => Math.min(s.offsetTop, maxTop))
  secH = sectionEls[0].offsetHeight
  viewH = app.clientHeight
  onScrollFrame()
}

function onScroll() {
  if (scrollTick) return
  scrollTick = requestAnimationFrame(() => {
    scrollTick = 0
    onScrollFrame()
  })
}

function onScrollFrame() {
  const scrollTop = app.scrollTop
  updateBalloonRun(scrollTop)
  if (stepping) {
    if (Math.abs(scrollTop - sectionTops[stepTarget]) <= 1) endStep()
    else armStepTimer(STEP_IDLE_MS)
    return
  }
  setActiveIdx(nearestIdx(scrollTop))
  settleSection()
}

// JS-driven step: theme switches at the start, side effects on arrival
function goTo(i) {
  i = clampIdx(i)
  if (Math.abs(app.scrollTop - sectionTops[i]) <= 1) {
    // cancel an in-flight smooth scroll heading elsewhere
    if (stepping) app.scrollTo({ top: sectionTops[i] })
    endStep()
    return
  }
  stepping = true
  stepTarget = i
  setActiveIdx(i)
  app.scrollTo({ top: sectionTops[i], behavior: still() ? 'auto' : 'smooth' })
  armStepTimer(STEP_START_MS)
}

// Fallback for a step that never lands exactly (interrupted, resized): end it
// once the scroll goes idle. Long jumps take longer than any fixed timeout.
function armStepTimer(ms) {
  clearTimeout(stepTimer)
  stepTimer = setTimeout(endStep, ms)
}

function endStep() {
  clearTimeout(stepTimer)
  stepTimer = null
  stepping = false
  setActiveIdx(nearestIdx(app.scrollTop))
  settleSection()
}

// --- wheel + keys ---
// One gesture = one section. Trackpad momentum tails are swallowed; a new
// gesture starts after a pause or when deltas spike above the decaying tail.
// Detection keeps running while a step animates, so a new gesture mid-step
// retargets from the step's destination.
function onWheel(e) {
  // non-cancelable: the browser already owns this gesture natively
  if (e.ctrlKey || !e.cancelable) return
  const now = performance.now()
  const gap = now - lastWheelT
  // horizontal swipes (history nav) stay native unless we're mid-gesture
  const owned = stepping || now < holdUntil || (consumed && gap <= GAP_MS)
  if (!owned && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
  e.preventDefault()
  lastWheelT = now

  const dy = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * viewH : e.deltaY
  const abs = Math.abs(dy)

  // still inside the swipe that triggered the step: ignore its ramp-up
  if (now < holdUntil) {
    tailLow = Infinity
    return
  }

  const spike = Math.max(SPIKE_MIN, 3 * tailLow)
  if (gap > GAP_MS || abs >= spike) {
    consumed = false
    acc = 0
    tailLow = abs
  } else {
    tailLow = Math.min(tailLow, abs)
  }

  if (consumed) return
  acc += dy
  if (Math.abs(acc) < ACC_MIN) return
  consumed = true
  // a new gesture during a step retargets from where the step is heading
  const from = stepping ? stepTarget : activeIdx
  const target = clampIdx(from + Math.sign(acc))
  if (target !== from) {
    holdUntil = now + (still() ? MIN_HOLD_REDUCED : MIN_HOLD)
    goTo(target)
  }
}

function modalOpen() {
  return modalContact.open || modalProject.open
}

function isEditable(el) {
  return el instanceof Element && (el.matches('input, textarea, select') || el.isContentEditable)
}

function onKey(e) {
  if (modalOpen() || e.ctrlKey || e.metaKey || e.altKey || isEditable(e.target)) return
  let target
  switch (e.key) {
    case 'ArrowDown':
    case 'PageDown':
      target = activeIdx + 1
      break
    case 'ArrowUp':
    case 'PageUp':
      target = activeIdx - 1
      break
    case ' ':
      if (e.target instanceof Element && e.target.closest('button, a')) return
      target = activeIdx + (e.shiftKey ? -1 : 1)
      break
    case 'Home':
      target = 0
      break
    case 'End':
      target = sectionEls.length - 1
      break
    default:
      return
  }
  e.preventDefault()
  if (!stepping) goTo(target)
}

// --- nav ---
function buildNav() {
  themes.forEach((t, i) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'nav-item'
    btn.setAttribute('aria-label', `${t.word} – sektion ${i + 1} af ${themes.length}`)
    btn.innerHTML = `
      <span class="nav-label">${t.word}</span>
      <span class="nav-dot${i === 0 ? ' active' : ''}"></span>
    `
    btn.addEventListener('click', () => goTo(i))
    // the pause toggle stays last
    navRail.insertBefore(btn, btnMotion)
  })
  navDots = Array.from(navRail.querySelectorAll('.nav-dot'))
  navItems = Array.from(navRail.querySelectorAll('.nav-item'))
  navRail.classList.add('ready')
}

function toggleMotion() {
  const on = document.documentElement.classList.toggle('still')
  btnMotion.setAttribute('aria-pressed', String(on))
  // finish a word that is mid-type
  if (on) {
    animateWord(themes[activeIdx].word)
    bgAnim?.finish()
  }
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
  const W = window.innerWidth
  const H = secH
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

    // project balloons are buttons; decorative ones are pointer-only eye candy
    const el = document.createElement(body.project ? 'button' : 'span')
    if (body.project) {
      el.type = 'button'
      const { client, name } = body.project
      el.setAttribute('aria-label', client === name ? name : `${client} – ${name}`)
    } else {
      el.setAttribute('aria-hidden', 'true')
    }
    el.className = 'balloon'
    el.innerHTML = `
      <span class="balloon-body">
        <span class="balloon-label">${body.project ? body.project.client : ''}</span>
      </span>
      <span class="balloon-knot"></span>
    `
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      // reduced motion: no hold-to-inflate, the click opens the modal
      if (body.project && still()) return
      grabBalloon(body)
    })
    el.addEventListener('contextmenu', (e) => e.preventDefault())
    if (body.project) {
      // keyboard/AT (and reduced-motion taps); a normal tap is already held by pointerdown
      el.addEventListener('click', () => {
        if (heldBalloon || body.frozen || modalOpen()) return
        openProjectModal(body)
      })
      // a focused balloon parks inside the viewport (tick skips its drift)
      el.addEventListener('focus', () => {
        clampBalloon(body)
        updateBalloonEl(body)
      })
    }

    // size + colours never change after creation: set once
    el.style.width = `${body.r * 2}px`
    el.style.height = `${body.r * 2.3}px`
    const balloonBody = el.querySelector('.balloon-body')
    balloonBody.style.backgroundColor = body.bg
    balloonBody.style.color = body.fg
    el.querySelector('.balloon-knot').style.backgroundColor = body.bg
    body.el = el
    body.labelEl = el.querySelector('.balloon-label')

    balloonField.appendChild(el)
    syncBalloonState(body)
    updateBalloonEl(body)
    return body
  })
}

// per-frame: transform only (no layout)
function updateBalloonEl(b) {
  if (b.popped) return
  b.el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r * 1.15}px, 0) scale(${b.scale}) rotate(${b.tilt}deg)`
}

function clampBalloon(b, W = window.innerWidth, H = secH) {
  b.x = Math.min(Math.max(b.x, b.r), W - b.r)
  b.y = Math.min(Math.max(b.y, b.r * 1.15), H - b.r * 1.15)
}

// call whenever popped / held / frozen changes
function syncBalloonState(b) {
  const held = heldId === b.id
  b.el.hidden = b.popped
  b.el.style.zIndex = held || b.frozen ? 40 : 10
  b.labelEl.style.opacity = held ? '0' : '1'
}

// only animate while the balloon section is at least partly on screen
function updateBalloonRun(scrollTop) {
  // asymmetric: the viewport (viewH) can be taller than a section (secH)
  const d = scrollTop - sectionTops[balloonIdx]
  const visible = d > 1 - viewH && d < secH - 1
  if (visible && !balloonRaf) balloonRaf = requestAnimationFrame(balloonTick)
  else if (!visible && balloonRaf) stopBalloons()
}

function stopBalloons() {
  cancelAnimationFrame(balloonRaf)
  balloonRaf = 0
  // cancel a hold in progress, else holdStart ages and the modal opens on return
  const b = heldBalloon
  if (!b) return
  b.scale = 1
  heldBalloon = null
  heldId = null
  syncBalloonState(b)
  updateBalloonEl(b)
}

function balloonTick() {
  const W = window.innerWidth
  // the section, not the window: it stays svh-tall and clips when the toolbar hides
  const H = secH
  const t = performance.now() / 1000
  const perp = { x: -up.y, y: up.x }
  const calm = still()
  const focused = document.activeElement

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
        syncBalloonState(b)
        setTimeout(() => {
          b.frozen = false
          b.scale = 1
          syncBalloonState(b)
          updateBalloonEl(b)
        }, 500)
      }
      continue
    }

    if (b.scale > 1) b.scale = Math.max(1, b.scale * 0.86)

    // reduced motion or keyboard focus: no drift, stay on screen
    if (calm || b.el === focused) {
      b.tilt = 0
      clampBalloon(b, W, H)
      continue
    }

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
        // a focused balloon doesn't get shoved; the other one takes the whole push
        const wa = a.el === focused ? 0 : c.el === focused ? 1 : 0.5
        a.x -= dx * push * wa
        a.y -= dy * push * wa
        c.x += dx * push * (1 - wa)
        c.y += dy * push * (1 - wa)
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
    syncBalloonState(b)
  } else {
    b.popped = true
    syncBalloonState(b)
    burst(b.x, b.y)
    try { navigator.vibrate?.(60) } catch { /* unsupported */ }
    setTimeout(() => {
      b.x = Math.random() * window.innerWidth
      b.y = up.y <= 0 ? secH + b.r * 2 : -b.r * 2
      b.popped = false
      updateBalloonEl(b)
      syncBalloonState(b)
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
  if (still()) return
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

// Swaps the static estimate for this view's own transfer. Leaves the static
// sentence when the browser reports no sizes (older engines) rather than
// show a wrong number. Everything is same-origin; a cross-origin resource
// would report 0 here and go uncounted.
function renderCo2() {
  const nav = performance.getEntriesByType('navigation')[0]
  if (!nav) return
  const entries = [nav, ...performance.getEntriesByType('resource')]
  if (entries.some((e) => typeof e.transferSize !== 'number')) return
  const bytes = entries.reduce((sum, e) => sum + e.transferSize, 0)
  const mg = bytes * MG_CO2_PER_BYTE
  // a visit served from cache transfers next to nothing, but the model scales
  // device energy by bytes too, so "almost zero" would understate it: keep
  // the static first-visit figure instead
  if (mg < 0.1) return
  const strong = document.createElement('strong')
  const n = mg.toLocaleString('da-DK', { maximumSignificantDigits: 2 })
  strong.textContent = `${n}\u00a0mg CO₂`
  // kept this short on purpose: one more line pushes the section into the hero on small phones
  co2Note.replaceChildren('Dit besøg: ca. ', strong)
}

function animatePerf() {
  if (perfAnimated) return
  perfAnimated = true
  measurePerf()
  renderTapRace()
  if (still()) {
    shownLoadMs = loadMs
    shownLoadMsEl.textContent = fmt(shownLoadMs)
    return
  }
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
// markup is static; this only flips classes, text and `hidden` so focus survives
function renderTapRace() {
  const result = tapState === 'result'

  // fill text before un-hiding so the live region never shows last round's values
  if (result) {
    const loads = Math.max(1, Math.floor(tapMs / Math.max(1, loadMs)))
    const loseText = loads >= 2
      ? `Imens kunne siden have loadet ${fmt(loads)} gange`
      : `Siden loadede på ${fmt(loadMs)} ms`
    tapRaceMs.textContent = fmt(tapMs)
    tapRaceVerdictText.textContent = tapResult === 'win' ? 'Du var hurtigere end siden!' : loseText
    tapRaceVerdictEmoji.textContent = tapResult === 'win' ? '🏆' : '⚡'
  } else {
    tapRaceVerdictText.textContent = ''
    tapRaceVerdictEmoji.textContent = ''
  }

  tapRace.classList.toggle('tap-race--win', result && tapResult === 'win')
  tapRace.classList.toggle('tap-race--lose', result && tapResult === 'lose')
  tapRacePanel.classList.toggle('tap-race-panel--result', result)
  tapRacePlay.hidden = result
  tapRaceResult.hidden = !result
  tapRaceVerdict.hidden = !result
  tapRaceRetry.hidden = !result
  tapRaceLoad.textContent = fmt(loadMs || 1)

  tapBtns.forEach((btn, i) => {
    btn.classList.toggle('tap-btn--done', i + 1 < tapNext)
    btn.classList.toggle('tap-btn--next', i + 1 === tapNext)
  })
}

// also runs when leaving the section; focus only moves if it was in the card
function resetTapRace() {
  const hadFocus = tapRace.contains(document.activeElement)
  tapState = 'idle'
  tapResult = null
  tapNext = 1
  tapStart = 0
  renderTapRace()
  if (hadFocus) tapBtns[0].focus({ preventScroll: true })
}

function onTapRace(e) {
  if (tapState === 'result') {
    resetTapRace()
    return
  }

  const btn = e.target.closest('.tap-btn')
  if (!btn) return
  const n = Number(btn.dataset.n)
  // pressing 1 mid-round restarts the round from this press
  if (n === 1 && tapState === 'running') tapNext = 1
  if (n !== tapNext) return

  if (tapNext === 1) {
    tapStart = performance.now()
    tapState = 'running'
  }

  if (tapNext === 3) {
    const hadFocus = tapRace.contains(document.activeElement)
    tapMs = Math.max(1, Math.round(performance.now() - tapStart))
    tapResult = tapMs < loadMs ? 'win' : 'lose'
    tapState = 'result'
    renderTapRace()
    if (hadFocus) tapRaceRetry.focus({ preventScroll: true })
    return
  }

  tapNext += 1
  renderTapRace()
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
  // #cut-lead is a live region: only touch it when the text actually changes
  const lead = isCut ? 'Kupon klippet — indløs her:' : 'Træk eller tryk på saksen'
  if (cutLeadText.textContent !== lead) {
    cutLeadText.textContent = lead
    cutLeadEmoji.hidden = isCut
  }
}

function startCut(e) {
  cutDownX = e.clientX
  cutMoved = false
  if (cutProgress < 1 && !cutRaf) cutting = true
}

function onCutMove(e) {
  if (!cutting) return
  // small jitter is a tap, not a drag
  if (!cutMoved) {
    if (Math.abs(e.clientX - cutDownX) <= 8) return
    cutMoved = true
  }
  const rect = cutLine.getBoundingClientRect()
  const p = (e.clientX - rect.left) / rect.width
  cutProgress = Math.min(1, Math.max(cutProgress, p))
  updateCutUI()
  if (cutProgress >= 1) {
    cutting = false
    finishCut()
  }
}

function stopCut() {
  cutting = false
}

// non-drag alternative: click/tap/Enter on the scissors cuts by itself
function onScissorsClick(e) {
  // read-and-clear: a finished drag swallows only its own click, not a later one
  const dragged = cutMoved
  cutMoved = false
  if (cutProgress >= 1 || cutRaf || (dragged && e.detail !== 0)) return
  cutting = false
  if (still()) {
    cutProgress = 1
    updateCutUI()
    finishCut()
    return
  }
  const from = cutProgress
  const start = performance.now()
  const step = () => {
    const p = Math.min(1, (performance.now() - start) / 450)
    cutProgress = from + (1 - from) * (1 - (1 - p) ** 2)
    updateCutUI()
    if (p < 1) {
      cutRaf = requestAnimationFrame(step)
    } else {
      cutRaf = 0
      finishCut()
    }
  }
  cutRaf = requestAnimationFrame(step)
}

function finishCut() {
  const rect = cutLine.getBoundingClientRect()
  burst(rect.right - 10, rect.top + rect.height / 2)
  try { navigator.vibrate?.(80) } catch { /* unsupported */ }
  // the scissors just went visibility:hidden; don't strand keyboard focus
  if (document.activeElement === cutScissors) couponRedeemLink.focus({ preventScroll: true })
}

// --- modals (native <dialog>: focus trap, inert page, Esc, focus restore) ---
function openModal(el) {
  clearTimeout(closeTimers.get(el))
  el.classList.remove('closing')
  if (!el.open) el.showModal()
}

function closeModal(el) {
  if (!el.open || el.classList.contains('closing')) return
  el.classList.add('closing')
  // timer, not animationend: survives reduced motion and stale listeners
  closeTimers.set(el, setTimeout(() => el.close(), still() ? 0 : 250))
}

function toggleDecrypt() {
  const on = secureCopy.classList.toggle('revealed')
  btnDecrypt.setAttribute('aria-pressed', String(on))
}

function openContactModal() {
  openModal(modalContact)
}

function openProjectModal(b) {
  modalProject.style.backgroundColor = b.bg
  modalProject.style.color = b.fg
  modalProjectClose.style.borderColor = b.fg
  modalProjectClient.textContent = b.project.own ? 'Eget produkt' : b.project.client
  modalProjectName.textContent = b.project.name
  modalProjectTagline.textContent = b.project.tagline
  modalProjectRole.textContent = b.project.role ? `Vores rolle: ${b.project.role}` : ''

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
  renderCo2()
  applyTheme(0)
  renderTapRace()
  updateCutUI()

  // measure() starts the balloon loop if their section is in view;
  // balloons need the section height before that
  secH = sectionEls[0].offsetHeight
  makeBalloons()
  measure()
  new ResizeObserver(measure).observe(app)

  app.addEventListener('scroll', onScroll, { passive: true })
  app.addEventListener('wheel', onWheel, { passive: false })
  // a finger interrupting a step hands control back to nearest-section detection
  app.addEventListener('touchstart', () => {
    if (stepping) endStep()
  }, { passive: true })
  window.addEventListener('keydown', onKey)

  btnContact.addEventListener('click', openContactModal)
  modalContactClose.addEventListener('click', () => closeModal(modalContact))
  modalProjectClose.addEventListener('click', () => closeModal(modalProject))
  modalProjectDismiss.addEventListener('click', () => closeModal(modalProject))
  for (const m of [modalContact, modalProject]) {
    // Esc: play the close animation instead of vanishing
    m.addEventListener('cancel', (e) => {
      e.preventDefault()
      closeModal(m)
    })
    m.addEventListener('close', () => {
      m.classList.remove('closing')
      clearTimeout(closeTimers.get(m))
    })
  }
  peekBalloon.addEventListener('click', () => goTo(1))
  btnTilt.addEventListener('click', enableTilt)
  btnMotion.addEventListener('click', toggleMotion)
  btnDecrypt.addEventListener('click', toggleDecrypt)
  secureCopy.addEventListener('click', toggleDecrypt)
  // pointerdown for speed; click only for keyboard/AT (detail 0), else the
  // click after the 3rd pointerdown would instantly reset the result
  tapRace.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    onTapRace(e)
  })
  tapRace.addEventListener('click', (e) => {
    if (e.detail === 0) onTapRace(e)
  })
  cutScissors.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    startCut(e)
  })
  cutScissors.addEventListener('click', onScissorsClick)

  window.addEventListener('pointermove', onCutMove)
  window.addEventListener('pointerup', stopCut)

  const iosGate = typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  if (iosGate) {
    btnTilt.classList.remove('hidden')
  } else if (typeof DeviceOrientationEvent !== 'undefined') {
    window.addEventListener('deviceorientation', onOrientation)
  }

  if (new URLSearchParams(location.search).has('debug')) initDebug()
}

// TEMP: on-device scroll diagnostics (?debug) — remove once the mobile jank is diagnosed
function initDebug() {
  const el = document.createElement('pre')
  el.setAttribute('aria-hidden', 'true')
  // fixed size + strict containment: text updates can't touch scroller layout
  el.style.cssText = 'position:fixed;left:0;top:0;z-index:99;width:13rem;height:9.5rem;contain:strict;pointer-events:none;margin:0;padding:4px;font:10px/1.25 ui-monospace,monospace;background:rgba(0,0,0,.75);color:#0f0;white-space:pre;overflow:hidden'
  document.body.appendChild(el)

  const ua = navigator.userAgent
  const ver = ua.match(/(SamsungBrowser|CriOS|FxiOS|EdgA|Chrome|Version)\/[\d.]+/)
  const os = /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : 'other'
  const browser = `${ver ? ver[0] : '?'} ${os}`

  const app0 = app.clientHeight
  const sec0 = sectionEls[0].offsetHeight
  let appH = app0
  let secHNow = sec0
  let appMin = app0
  let appMax = app0
  let nResize = 0
  let nResizeInScroll = 0
  let lsSupported = true
  let lsN = 0
  let lsSum = 0
  let gaps = 0
  let worst = 0
  let lastScrollT = -Infinity
  let dirty = true

  let first = true
  new ResizeObserver(() => {
    const a = app.clientHeight
    const s = sectionEls[0].offsetHeight
    if (first) {
      first = false
      return
    }
    if (a === appH && s === secHNow) return
    appH = a
    secHNow = s
    appMin = Math.min(appMin, a)
    appMax = Math.max(appMax, a)
    nResize++
    if (performance.now() - lastScrollT < 300) nResizeInScroll++
    dirty = true
  }).observe(app)

  window.visualViewport?.addEventListener('resize', () => { dirty = true })

  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        lsN++
        lsSum += e.value
      }
      dirty = true
    }).observe({ type: 'layout-shift', buffered: true })
  } catch {
    lsSupported = false
  }
  // Safari ignores unknown entry types instead of throwing
  if (typeof PerformanceObserver === 'undefined' || !PerformanceObserver.supportedEntryTypes?.includes('layout-shift')) lsSupported = false

  // frame-gap watch while scrolling; no layout reads in here
  let raf = 0
  let prev = 0
  const frame = (t) => {
    if (prev) {
      const dt = t - prev
      if (dt > 50) {
        gaps++
        worst = Math.max(worst, dt)
        dirty = true
      }
    }
    prev = t
    if (performance.now() - lastScrollT < 300) raf = requestAnimationFrame(frame)
    else raf = 0
  }
  app.addEventListener('scroll', () => {
    lastScrollT = performance.now()
    if (raf) return
    prev = 0
    raf = requestAnimationFrame(frame)
  }, { passive: true })

  setInterval(() => {
    if (!dirty) return
    dirty = false
    const vv = window.visualViewport
    el.textContent = [
      browser,
      `app  ${appH} / ${app0} / ${appMin}-${appMax}`,
      `sec  ${secHNow} / ${sec0}`,
      `inner / vv ${window.innerHeight} / ${vv ? Math.round(vv.height) : '-'}`,
      `resizes ${nResize} (in-scroll ${nResizeInScroll})`,
      `LS ${lsSupported ? `${lsN} / ${lsSum.toFixed(3)}` : 'n/a'}`,
      `gaps>50 ${gaps}, worst ${Math.round(worst)} ms`,
    ].join('\n')
  }, 250)
}

// The static HTML is the page; everything here is enhancement. Start it one
// task after the load event so script work never delays the page load.
if (document.readyState === 'complete') init()
else window.addEventListener('load', () => setTimeout(init, 0), { once: true })
