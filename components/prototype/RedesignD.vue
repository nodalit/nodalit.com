<!--
  PROTOTYPE variant D — "Fysik-legeplads":
  Projekterne er fysiske bolde. Mobil: tilt = tyngdekraft, ryst = shuffle, frit fald = easter egg.
  Desktop: træk og kast med musen. Tap/klik på en bold åbner projektet.
-->
<template>
  <div class="fixed inset-0 overflow-hidden bg-[#0d0d12] text-white antialiased select-none touch-none">
    <!-- Hero copy (behind the balls) -->
    <div class="absolute inset-x-0 top-0 z-0 pt-16 px-6 text-center pointer-events-none">
      <p class="text-xl font-bold">
        <span class="text-logo1">N</span>od<span class="text-logo3">alit</span>
      </p>
      <h1 class="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
        Vi bygger <span class="text-logo1">{{ adjective }}</span><br />digitale løsninger
      </h1>
      <p class="mt-4 text-gray-500 text-sm md:text-base">
        {{ hint }}
      </p>
    </div>

    <!-- Balls -->
    <button
      v-for="ball in balls"
      :key="ball.id"
      class="absolute z-10 rounded-full flex items-center justify-center text-center font-bold leading-tight shadow-xl cursor-grab active:cursor-grabbing will-change-transform"
      :style="{
        width: `${ball.r * 2}px`,
        height: `${ball.r * 2}px`,
        transform: `translate3d(${ball.x - ball.r}px, ${ball.y - ball.r}px, 0) rotate(${ball.spin}deg)`,
        backgroundColor: ball.bg,
        color: ball.fg,
        fontSize: `${Math.max(10, ball.r / 4.2)}px`,
        padding: `${ball.r / 4}px`,
      }"
      @pointerdown.prevent="grab(ball, $event)"
    >
      {{ ball.label }}
    </button>

    <!-- iOS motion permission -->
    <button
      v-if="needsPermission"
      class="absolute z-20 bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-logo1 text-black font-semibold shadow-2xl animate-pulse"
      @click="enableMotion"
    >
      Aktivér tyngdekraft 📱
    </button>

    <!-- Freefall easter egg -->
    <Transition name="drop">
      <div
        v-if="freefallMsg"
        class="absolute z-30 inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none"
      >
        <p class="text-3xl md:text-5xl font-extrabold bg-black/80 rounded-2xl py-8 px-4 backdrop-blur">
          Rolig nu! 😅<br />
          <span class="text-logo1 text-xl md:text-3xl">Vi bygger også robuste ting.</span>
        </p>
      </div>
    </Transition>

    <!-- Footer line -->
    <p class="absolute z-0 bottom-4 inset-x-0 text-center text-xs text-gray-600 pointer-events-none">
      Nodalit ApS · CVR 42252301 · kontakt@nodalit.com
    </p>
  </div>
</template>

<script setup>
import allProjects from '@/assets/projects'

const ADJECTIVES = ['gode', 'brugervenlige', 'sikre', 'nyskabende', 'sjove', 'lækre', 'hurtige', 'billige', 'bæredygtige']
const PALETTE = [
  { bg: '#ffbe0b', fg: '#000000' },
  { bg: '#ff006e', fg: '#ffffff' },
  { bg: '#8338ec', fg: '#ffffff' },
  { bg: '#3a86ff', fg: '#ffffff' },
  { bg: '#f3f4f6', fg: '#000000' },
]

const adjective = ref('gode')
const freefallMsg = ref(false)
const needsPermission = ref(false)
const isTouch = ref(false)
const hint = computed(() =>
  isTouch.value
    ? 'Tilt telefonen. Ryst den. Kast rundt med projekterne — tap for at åbne.'
    : 'Grib et projekt og kast det. Klik for at åbne. (Prøv på din telefon: tilt & ryst!)'
)

// --- physics state (plain objects mutated in rAF; positions synced to a shallow ref) ---
const featured = allProjects.filter(p => p.featured)
let bodies = []
const balls = shallowRef([])

const gravity = { x: 0, y: 0.35 }
const G = 0.55
let raf = 0
let W = 0
let H = 0

const makeBodies = () => {
  W = window.innerWidth
  H = window.innerHeight
  const base = Math.min(W, H) / 10
  const items = [
    ...featured.map(p => ({ label: p.name, url: p.url })),
    { label: 'Kontakt 👋', url: 'mailto:kontakt@nodalit.com', big: true },
  ]
  bodies = items.map((item, i) => {
    const r = Math.max(34, Math.min(72, base * (item.big ? 1.25 : 0.85 + (item.label.length % 4) * 0.1)))
    const color = PALETTE[i % PALETTE.length]
    return {
      id: i,
      label: item.label,
      url: item.url,
      r,
      x: Math.random() * (W - 2 * r) + r,
      y: H * 0.45 + Math.random() * (H * 0.4 - r),
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      spin: (Math.random() - 0.5) * 20,
      vspin: 0,
      bg: color.bg,
      fg: color.fg,
      held: false,
    }
  })
}

const step = () => {
  for (const b of bodies) {
    if (b.held) continue
    b.vx += gravity.x
    b.vy += gravity.y
    b.vx *= 0.995
    b.vy *= 0.995
    b.x += b.vx
    b.y += b.vy
    b.spin += b.vspin
    b.vspin *= 0.98

    if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.65; b.vspin = -b.vx }
    if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.65; b.vspin = b.vx }
    if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.65 }
    if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.65; b.vspin += b.vx * 0.5 }
  }

  // circle-circle collisions (equal mass, positional correction + normal impulse)
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i]
      const b = bodies[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.hypot(dx, dy) || 0.001
      const overlap = a.r + b.r - dist
      if (overlap > 0) {
        const nx = dx / dist
        const ny = dy / dist
        if (!a.held) { a.x -= nx * overlap / 2; a.y -= ny * overlap / 2 }
        if (!b.held) { b.x += nx * overlap / 2; b.y += ny * overlap / 2 }
        const rvx = b.vx - a.vx
        const rvy = b.vy - a.vy
        const velAlongNormal = rvx * nx + rvy * ny
        if (velAlongNormal < 0) {
          const imp = -0.75 * velAlongNormal
          if (!a.held) { a.vx -= imp * nx; a.vy -= imp * ny }
          if (!b.held) { b.vx += imp * nx; b.vy += imp * ny }
        }
      }
    }
  }

  balls.value = [...bodies]
  raf = window.requestAnimationFrame(step)
}

// --- drag / flick / tap ---
let held = null
let lastPointer = { x: 0, y: 0, t: 0 }
let downInfo = { x: 0, y: 0, t: 0 }

const grab = (ball, e) => {
  const body = bodies.find(b => b.id === ball.id)
  if (!body) return
  held = body
  body.held = true
  body.vx = 0
  body.vy = 0
  lastPointer = { x: e.clientX, y: e.clientY, t: performance.now() }
  downInfo = { x: e.clientX, y: e.clientY, t: performance.now() }
}

const onPointerMove = (e) => {
  if (!held) return
  const now = performance.now()
  const dt = Math.max(1, now - lastPointer.t)
  held.vx = ((e.clientX - lastPointer.x) / dt) * 16
  held.vy = ((e.clientY - lastPointer.y) / dt) * 16
  held.x = e.clientX
  held.y = e.clientY
  lastPointer = { x: e.clientX, y: e.clientY, t: now }
}

const onPointerUp = (e) => {
  if (!held) return
  const moved = Math.hypot(e.clientX - downInfo.x, e.clientY - downInfo.y)
  const elapsed = performance.now() - downInfo.t
  const body = held
  body.held = false
  held = null
  if (moved < 10 && elapsed < 350 && body.url) {
    window.open(body.url, body.url.startsWith('mailto:') ? '_self' : '_blank')
  }
}

// --- sensors ---
const onOrientation = (e) => {
  if (e.gamma === null || e.beta === null) return
  gravity.x = Math.sin((e.gamma * Math.PI) / 180) * G
  gravity.y = Math.sin((Math.min(Math.max(e.beta, -90), 90) * Math.PI) / 180) * G
}

let lastShake = 0
let freefallStart = 0

const onMotion = (e) => {
  const acc = e.accelerationIncludingGravity
  if (!acc || acc.x === null) return
  const mag = Math.hypot(acc.x, acc.y, acc.z)

  // shake: strong deviation from 1g
  if (Math.abs(mag - 9.82) > 14 && performance.now() - lastShake > 1200) {
    lastShake = performance.now()
    shuffle()
  }

  // freefall: everything reads ~0 while falling
  if (mag < 2.5) {
    if (!freefallStart) freefallStart = performance.now()
    else if (performance.now() - freefallStart > 220 && !freefallMsg.value) {
      freefallMsg.value = true
      setTimeout(() => { freefallMsg.value = false }, 3500)
    }
  } else {
    freefallStart = 0
  }
}

const shuffle = () => {
  adjective.value = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  bodies.forEach((b, i) => {
    const color = PALETTE[(i + Math.floor(Math.random() * PALETTE.length)) % PALETTE.length]
    b.bg = color.bg
    b.fg = color.fg
    b.vx += (Math.random() - 0.5) * 30
    b.vy -= Math.random() * 22
    b.vspin += (Math.random() - 0.5) * 30
  })
}

const enableMotion = async () => {
  try {
    const results = await Promise.all([
      DeviceOrientationEvent.requestPermission?.() ?? 'granted',
      DeviceMotionEvent.requestPermission?.() ?? 'granted',
    ])
    if (results.every(r => r === 'granted')) {
      needsPermission.value = false
      window.addEventListener('deviceorientation', onOrientation)
      window.addEventListener('devicemotion', onMotion)
    }
  } catch {
    needsPermission.value = false
  }
}

const onResize = () => {
  W = window.innerWidth
  H = window.innerHeight
}

onMounted(() => {
  isTouch.value = window.matchMedia('(pointer: coarse)').matches
  makeBodies()
  raf = window.requestAnimationFrame(step)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('resize', onResize)

  const iosGate = typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  if (iosGate) {
    needsPermission.value = true
  } else if (typeof DeviceOrientationEvent !== 'undefined') {
    window.addEventListener('deviceorientation', onOrientation)
    window.addEventListener('devicemotion', onMotion)
  }
})

onUnmounted(() => {
  window.cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('deviceorientation', onOrientation)
  window.removeEventListener('devicemotion', onMotion)
})
</script>

<style scoped>
.drop-enter-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.drop-leave-active {
  transition: all 0.3s ease;
}
.drop-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.drop-leave-to {
  opacity: 0;
}
</style>
