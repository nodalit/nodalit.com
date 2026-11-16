<!--
  PROTOTYPE variant E — "Scroll-morf":
  Fastlåst hero-tekst hvor kun ordet skifter (typewriter), mens hele sitets design
  morfer pr. scroll-sektion: brugervenlig, sikker, billig, sjov, hurtig, bæredygtig.
-->
<template>
  <div
    ref="containerRef"
    class="fixed inset-0 overflow-y-auto snap-y snap-mandatory antialiased"
    :style="{ backgroundColor: theme.bg, transition: 'background-color 0.7s ease' }"
  >
    <!-- Pinned hero — stays while everything morphs -->
    <div
      class="fixed inset-x-0 top-0 z-20 pt-14 md:pt-20 pb-6 text-center pointer-events-none px-4"
      :style="{ color: theme.heroText, transition: 'color 0.7s ease' }"
    >
      <p class="text-[23vw] md:text-8xl font-bold tracking-tighter leading-none mb-5">
        Nodalit
      </p>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" :class="theme.heroFont">
        Vi bygger<br class="sm:hidden" />{{ ' ' }}<span :style="{ color: theme.accent, transition: 'color 0.7s ease' }">{{ displayWord }}</span><span class="cursor-blink" :style="{ color: theme.accent }">|</span><br />
        digitale løsninger
      </h1>
    </div>

    <!-- ===== 1. BRUGERVENLIG ===== -->
    <section class="h-screen snap-start snap-always overflow-hidden relative flex flex-col justify-end pb-24 px-6">
      <div class="max-w-2xl mx-auto w-full text-center text-slate-800">
        <p class="text-2xl md:text-3xl font-medium mb-6">
          Simpelt, tilgængeligt<br class="md:hidden" /> og til at forstå.
        </p>
        <p class="max-w-lg mx-auto text-base md:text-lg text-slate-500 mb-10">
          Gennemarbejdede løsninger sparer både jer og jeres brugere for tid og frustration.
          Vi omsætter komplekse forretningskrav til brugerflader, der ikke kræver en manual.
        </p>
        <button
          class="text-xl md:text-2xl font-bold bg-blue-600 text-white rounded-full py-5 px-12 shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
          @click="contactOpen = true"
        >
          Kontakt os 💬
        </button>
        <div class="mt-12 flex flex-col items-center" aria-hidden="true">
          <span class="scroll-chevron" />
          <span class="scroll-chevron" style="animation-delay: 0.2s" />
        </div>
      </div>

      <!-- en ballon fra næste sektion titter op -->
      <button
        class="absolute left-1/2 -translate-x-1/2 -bottom-12 w-20 h-24 z-10"
        aria-label="Scroll ned til ballonerne"
        @click="goTo(1)"
      >
        <span class="peek-bob block relative w-full h-full">
          <span class="balloon-body block" style="background-color: #ff006e" />
          <span class="balloon-knot" style="background-color: #ff006e" />
        </span>
      </button>
    </section>

    <!-- ===== 2. SJOV ===== -->
    <section class="h-screen snap-start snap-always overflow-hidden relative">
      <div class="absolute inset-x-0 top-1/2 -translate-y-1/4 text-center pointer-events-none px-6 z-0">
        <p class="max-w-2xl mx-auto text-xl md:text-2xl text-white leading-relaxed">
          Digitale værktøjer må gerne være en fornøjelse. Vi bygger løsninger,
          som brugerne faktisk har lyst til at åbne — det gør arbejdet lettere og resultaterne bedre.
        </p>
      </div>
      <p class="absolute bottom-10 inset-x-0 text-center text-white/75 text-base md:text-lg pointer-events-none px-6 z-0">
        Tryk på en ballon for at læse om et af vores mange projekter 🎈
      </p>

      <button
        v-for="b in balloonList"
        v-show="!b.popped"
        :key="'balloon' + b.id"
        class="balloon absolute"
        :style="{
          left: `${b.x}px`,
          top: `${b.y}px`,
          width: `${b.r * 2}px`,
          height: `${b.r * 2.3}px`,
          transform: `translate(-50%, -50%) scale(${b.scale}) rotate(${b.tilt}deg)`,
          zIndex: heldId === b.id || b.frozen ? 40 : 10,
        }"
        @pointerdown.prevent="grabBalloon(b)"
        @contextmenu.prevent
      >
        <span class="balloon-body" :style="{ backgroundColor: b.bg, color: b.fg }">
          <span class="balloon-label" :class="heldId === b.id ? 'opacity-0' : 'opacity-100'">
            {{ b.project ? b.project.client : '' }}
          </span>
        </span>
        <span class="balloon-knot" :style="{ backgroundColor: b.bg }" />
      </button>

      <!-- iOS tilt permission -->
      <button
        v-if="needsTilt"
        class="absolute z-30 bottom-28 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-white text-pink-600 font-semibold shadow-xl"
        @click="enableTilt"
      >
        Aktivér tilt 📱
      </button>

    </section>

    <!-- ===== 3. SIKKER ===== -->
    <section class="h-screen snap-start snap-always overflow-hidden flex flex-col justify-end pb-24 px-6 font-mono">
      <div class="max-w-2xl mx-auto w-full text-cyan-100">
        <p class="text-sm uppercase tracking-widest text-cyan-400 mb-6">🔒 Krypteret indhold — hover for at dekryptere</p>
        <p class="text-xl md:text-2xl leading-relaxed">
          Vi bygger løsninger til
          <span class="redacted">Klimadatastyrelsen</span>,
          <span class="redacted">Velliv</span> og
          <span class="redacted">LINK Arkitektur</span>
          med fokus på
          <span class="redacted">it-sikkerhed</span> og
          <span class="redacted">GDPR</span>.
        </p>
        <p class="mt-10 text-sm text-cyan-600">
          &gt; audit.log: 0 breaches · 2FA everywhere · data i EU_
        </p>
      </div>
    </section>

    <!-- ===== 4. HURTIG ===== -->
    <section class="h-screen snap-start snap-always overflow-hidden flex flex-col justify-end pb-24 px-6 relative">
      <div v-if="activeIdx === 3" class="speedlines" aria-hidden="true">
        <span v-for="n in 8" :key="n" class="speedline" :style="{ top: `${8 + n * 11}%`, animationDelay: `${n * 0.18}s` }" />
      </div>
      <div class="max-w-2xl mx-auto w-full text-center text-gray-900 relative">
        <p class="font-black italic text-6xl md:text-8xl tracking-tighter tabular-nums">
          {{ shownLoadMs.toLocaleString('da-DK') }} <span class="text-2xl md:text-4xl">ms</span>
        </p>
        <p class="mt-2 text-lg md:text-xl font-bold italic">
          — så hurtigt loadede denne side. Målt lige nu, i din browser. ⚡
        </p>

        <div class="mt-10 max-w-md mx-auto space-y-4 text-left">
          <div>
            <div class="flex justify-between text-sm font-bold mb-1">
              <span>Denne side</span>
              <span class="tabular-nums">{{ shownWeightKB.toLocaleString('da-DK') }} KB</span>
            </div>
            <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-gray-900 rounded-full" :style="{ width: ourBarWidth }" />
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm text-gray-400 mb-1">
              <span>Et gennemsnitligt website</span>
              <span>~2.400 KB</span>
            </div>
            <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-gray-300 rounded-full w-full" />
            </div>
          </div>
        </div>

        <button
          type="button"
          class="tap-race mt-8 mx-auto w-full max-w-sm select-none flex flex-col justify-center items-center"
          :class="{
            'tap-race--armed': tapState === 'armed',
            'tap-race--win': tapState === 'result' && tapResult === 'win',
            'tap-race--lose': tapState === 'result' && tapResult === 'lose',
          }"
          @pointerdown.prevent="onTapRace"
        >
          <div class="tap-race-panel" :class="{ 'tap-race-panel--result': tapState === 'result' }">
            <template v-if="tapState === 'idle'">
              <span class="block font-black italic text-xl md:text-2xl">Dobbeltklik så hurtigt du kan</span>
              <span class="block mt-2 text-sm text-gray-500 font-normal not-italic">
                Kan du slå sidens load-tid på {{ loadMs.toLocaleString('da-DK') }} ms?
              </span>
            </template>
            <template v-else-if="tapState === 'armed'">
              <span class="block font-black italic text-xl md:text-2xl tap-race-pulse">Igen!</span>
            </template>
            <template v-else>
              <span class="block font-black italic text-4xl md:text-5xl tabular-nums">
                {{ tapMs.toLocaleString('da-DK') }} <span class="text-xl md:text-2xl">ms</span>
              </span>
              <span class="block mt-2 text-sm font-bold not-italic">
                <template v-if="tapResult === 'win'">Du var hurtigere end siden! 🏆</template>
                <template v-else>Siden loadede på {{ loadMs.toLocaleString('da-DK') }} ms ⚡</template>
              </span>
              <span class="block mt-1 text-xs text-gray-500 font-normal not-italic">Tryk for at prøve igen</span>
            </template>
          </div>
        </button>

        <p class="mt-8 max-w-lg mx-auto text-sm md:text-base text-gray-500">
          Hastighed er respekt for brugernes tid. Vi bygger uden unødige lag og tunge frameworks,
          så løsningen svarer med det samme — også på en gammel telefon med dårligt netværk.
        </p>
      </div>
    </section>

    <!-- ===== 5. LÆKKER (hidden for now) ===== -->
    <section v-if="false" class="h-screen snap-start snap-always overflow-hidden relative flex flex-col justify-end pb-28 px-6">
      <img
        src="https://images.unsplash.com/photo-1756981168649-0e3c3c8a32f3?w=1600&q=75"
        alt=""
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to bottom, rgba(23, 17, 13, 0.55) 0%, rgba(23, 17, 13, 0.15) 40%, rgba(23, 17, 13, 0.85) 100%);"
        aria-hidden="true"
      />
      <div class="relative max-w-2xl mx-auto w-full text-center" style="color: #f3e9d7;">
        <p class="font-serif italic text-3xl md:text-5xl leading-snug">
          Detaljen, man ikke kan<br class="md:hidden" /> sætte ord på —<br />
          men kan mærke med det samme.
        </p>
        <div class="mx-auto mt-10 h-px w-24" style="background: #c9a24b;" />
        <p class="mt-10 max-w-lg mx-auto text-base md:text-lg leading-relaxed" style="opacity: 0.85;">
          Typografi, rytme og micro-animationer, der sidder lige i skabet.
          Vi pudser detaljerne, til løsningen ikke bare virker —
          men føles <span class="shimmer font-serif italic text-xl md:text-2xl">lækker</span>.
        </p>
      </div>
    </section>

    <!-- ===== 6. BÆREDYGTIG ===== -->
    <section class="h-screen snap-start snap-always overflow-hidden flex flex-col justify-end pb-20 px-6">
      <div class="max-w-2xl mx-auto w-full text-center text-green-100">
        <p class="text-4xl md:text-6xl mb-6 select-none" aria-hidden="true">
          <span v-for="(plant, i) in plants" :key="i" class="plant inline-block" :style="{ animationDelay: `${i * 0.25}s` }">{{ plant }}</span>
        </p>
        <p class="text-2xl md:text-3xl font-medium">
          Lavenergi-tilstand aktiveret. 🌙
        </p>
        <p class="mt-4 max-w-lg mx-auto text-green-400/80">
          Letvægtskode på grønne servere belaster klimaet mindre. Vi vælger vores projekter med omhu
          og har bæredygtighed med som parameter i alle valg — fra teknologi til hosting.
          Denne side udledte ca. <strong>0,14 g CO₂</strong>.
        </p>
        <p class="mt-10 text-green-600 text-sm">Scroll videre — vi har et GODT TILBUD til dig ↓</p>
      </div>
    </section>

    <!-- ===== 7. BILLIG / KONTAKT ===== -->
    <section class="h-screen snap-start snap-always overflow-hidden flex flex-col justify-end pb-14 px-6 font-comic text-red-700">
      <div class="max-w-md mx-auto w-full text-center">
        <p class="text-xl md:text-2xl font-bold mb-4">
          {{ isCut ? 'Kupon klippet — indløs her:' : 'Klip kuponen ud med saksen 👇' }}
        </p>

        <!-- cut line -->
        <div ref="cutLineRef" class="relative h-12 touch-none select-none" aria-hidden="true">
          <div class="absolute inset-x-0 top-1/2 border-t-4 border-dashed border-red-600" />
          <!-- "cut" overlay hides the dashes behind the scissors -->
          <div
            class="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-[#fde047]"
            :style="{ width: `${cutProgress * 100}%` }"
          />
          <button
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-4xl cursor-grab active:cursor-grabbing"
            :style="{ left: `${cutProgress * 100}%`, visibility: isCut ? 'hidden' : 'visible' }"
            aria-label="Klip kuponen"
            @pointerdown.prevent="startCut"
          >
            ✂️
          </button>
        </div>

        <!-- the coupon -->
        <div
          class="coupon bg-yellow-300 border-4 border-red-600 border-t-0 rounded-b-2xl px-6 py-6 shadow-xl"
          :class="{ 'coupon-cut': isCut }"
        >
          <p class="text-lg font-bold uppercase tracking-widest">Værdikupon</p>
          <p class="text-3xl md:text-4xl font-bold mt-1">1 stk. uforpligtende snak</p>
          <p class="mt-2 text-lg">
            <span class="line-through opacity-60">Værdi: 1.400 kr</span>
            <span class="font-bold text-2xl ml-2">GRATIS</span>
          </p>
          <template v-if="isCut">
            <a
              href="mailto:kontakt@nodalit.com?subject=Jeg%20har%20klippet%20kuponen!%20%E2%9C%82%EF%B8%8F"
              class="mt-4 block w-full bg-red-600 text-yellow-300 text-xl font-bold rounded-xl py-4 hover:bg-red-700 transition-colors"
            >
              Indløs: kontakt@nodalit.com
            </a>
            <a href="tel:+4520317127" class="mt-3 block text-lg font-bold underline">
              …eller ring: +45 20 31 71 27
            </a>
          </template>
          <p v-else class="mt-4 text-sm opacity-70">— klip kuponen fri for at indløse —</p>
          <p class="mt-4 text-[11px] leading-snug opacity-60">
            *Det med småt: Ingen dyre mellemled, intet projektlag oveni. I betaler kun for det,
            der faktisk bliver bygget — fair timepris, korte leverancer, ingen overraskelser.
          </p>
        </div>

        <p class="mt-6 text-xs text-red-900/70">Nodalit ApS · CVR 42252301 · Skovbogårds Allé 15, 2500 Valby</p>
      </div>
    </section>

    <!-- confetti (viewport layer, used by balloons and the coupon) -->
    <span
      v-for="c in confetti"
      :key="c.id"
      class="confetti-piece"
      :style="{ left: `${c.x}px`, top: `${c.y}px`, backgroundColor: c.color, '--dx': `${c.dx}px`, '--dy': `${c.dy}px`, '--rot': `${c.rot}deg` }"
    />

    <!-- Contact modal -->
    <Transition name="modal-fade">
      <div
        v-if="contactOpen"
        class="fixed inset-0 z-50 flex flex-col bg-blue-600 text-white"
      >
        <button
          class="absolute top-5 right-5 w-12 h-12 rounded-full border-2 border-white text-xl font-bold hover:opacity-70 transition-opacity"
          aria-label="Luk"
          @click="contactOpen = false"
        >
          ✕
        </button>
        <div class="flex-1 flex flex-col items-center justify-center text-center px-8">
          <h2 class="text-4xl md:text-6xl font-extrabold tracking-tight">Lad os tage en snak</h2>
          <p class="mt-6 max-w-md text-lg md:text-xl opacity-90">
            Skriv eller ring — vi svarer hurtigt, og det er helt uforpligtende.
          </p>
          <a
            href="mailto:kontakt@nodalit.com"
            class="mt-10 px-8 py-4 rounded-full font-semibold bg-white text-blue-700 hover:opacity-90 transition-opacity"
          >
            kontakt@nodalit.com
          </a>
          <a
            href="tel:+4520317127"
            class="mt-4 px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-700 transition-colors"
          >
            +45 20 31 71 27
          </a>
          <p class="mt-12 text-sm opacity-70">Nodalit ApS · CVR 42252301 · Skovbogårds Allé 15, 2500 Valby</p>
        </div>
      </div>
    </Transition>

    <!-- Fullscreen project modal (a fully inflated balloon) -->
    <Transition name="modal-fade">
      <div
        v-if="modal"
        class="fixed inset-0 z-50 flex flex-col"
        :style="{ backgroundColor: modal.bg, color: modal.fg }"
      >
        <button
          class="absolute top-5 right-5 w-12 h-12 rounded-full border-2 text-xl font-bold hover:opacity-70 transition-opacity"
          :style="{ borderColor: modal.fg }"
          aria-label="Luk"
          @click="modal = null"
        >
          ✕
        </button>
        <div class="flex-1 flex flex-col items-center justify-center text-center px-8">
          <p class="text-sm uppercase tracking-widest opacity-70">{{ modal.project.client }}</p>
          <h2 class="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">{{ modal.project.name }}</h2>
          <p class="mt-6 max-w-md text-lg md:text-xl opacity-90">{{ modal.project.tagline }}</p>
          <a
            v-if="modal.project.url"
            :href="modal.project.url"
            target="_blank"
            rel="noopener"
            class="mt-10 px-8 py-4 rounded-full font-semibold border-2 hover:opacity-70 transition-opacity"
            :style="{ borderColor: modal.fg }"
          >
            Besøg projektet →
          </a>
          <button class="mt-12 text-sm opacity-60 hover:opacity-100 transition-opacity" @click="modal = null">
            🎈 pfffft… (luk)
          </button>
        </div>
      </div>
    </Transition>

    <!-- Word progress rail -->
    <nav class="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 items-end">
      <button
        v-for="(t, i) in themes"
        :key="t.word"
        class="group flex items-center gap-2"
        :aria-label="t.word"
        @click="goTo(i)"
      >
        <span
          class="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline"
          :style="{ color: theme.heroText }"
        >
          {{ t.word }}
        </span>
        <span
          class="rounded-full transition-all duration-300"
          :class="activeIdx === i ? 'w-3 h-3' : 'w-2 h-2 opacity-40'"
          :style="{ backgroundColor: theme.heroText }"
        />
      </button>
    </nav>
  </div>
</template>

<script setup>
import allProjects from '@/assets/projects'

const themes = [
  { word: 'brugervenlige', bg: '#f1f5f9', heroText: '#0f172a', accent: '#2563eb', heroFont: '' },
  { word: 'sjove', bg: '#ff006e', heroText: '#ffffff', accent: '#ffbe0b', heroFont: '' },
  { word: 'sikre', bg: '#081222', heroText: '#e0f7fa', accent: '#22d3ee', heroFont: 'font-mono' },
  { word: 'hurtige', bg: '#ffffff', heroText: '#111111', accent: '#111111', heroFont: 'italic' },
  // Hidden for now — re-enable together with the lækker section below.
  // { word: 'lækre', bg: '#17110d', heroText: '#f3e9d7', accent: '#c9a24b', heroFont: 'font-serif' },
  { word: 'bæredygtige', bg: '#0c1f12', heroText: '#dcfce7', accent: '#4ade80', heroFont: '' },
  { word: 'billige', bg: '#fde047', heroText: '#b91c1c', accent: '#dc2626', heroFont: 'font-comic' },
]

const containerRef = ref(null)
const activeIdx = ref(0)
const theme = computed(() => themes[activeIdx.value])

// --- typewriter on word change ---
const displayWord = ref(themes[0].word)
let typeTimer = null

const animateWord = (target) => {
  if (typeTimer) clearInterval(typeTimer)
  let phase = 'erase'
  typeTimer = setInterval(() => {
    if (phase === 'erase') {
      if (displayWord.value.length > 0) {
        displayWord.value = displayWord.value.slice(0, -1)
      } else {
        phase = 'type'
      }
    } else if (displayWord.value.length < target.length) {
      displayWord.value = target.slice(0, displayWord.value.length + 1)
    } else {
      clearInterval(typeTimer)
      typeTimer = null
    }
  }, 38)
}

watch(activeIdx, (idx) => animateWord(themes[idx].word))

// --- scroll tracking ---
// Runs unconditionally every frame instead of reacting to scroll events.
// Scroll events proved unreliable around snap animations (they can stop
// firing while the container is still moving), which left the background
// stuck on the wrong section. A permanent rAF loop over 6 sections is
// cheap and always converges on the section actually in view.
let sectionEls = []
const updateActiveSection = () => {
  const el = containerRef.value
  if (!el) return
  // pick the section whose top is closest to the scroll position —
  // robust against 100vh sections not matching the container height on mobile
  let best = 0
  let bestDist = Infinity
  sectionEls.forEach((s, i) => {
    const d = Math.abs(s.offsetTop - el.scrollTop)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  })
  if (best !== activeIdx.value) activeIdx.value = best
}

let scrollRaf = null
const scrollLoop = () => {
  updateActiveSection()
  scrollRaf = window.requestAnimationFrame(scrollLoop)
}

const goTo = (i) => {
  const el = containerRef.value
  if (!el) return
  const section = el.querySelectorAll(':scope > section')[i]
  if (section) el.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
}

// --- sjov: balloons ---
const featured = allProjects.filter(p => p.featured)

const BALLOON_COLORS = [
  { bg: '#ffbe0b', fg: '#1f1300' },
  { bg: '#8338ec', fg: '#ffffff' },
  { bg: '#3a86ff', fg: '#ffffff' },
  { bg: '#4ade80', fg: '#052e16' },
  { bg: '#ffffff', fg: '#9d174d' },
]

const balloonList = shallowRef([])
const heldId = ref(null)
const modal = ref(null)
const contactOpen = ref(false)
const needsTilt = ref(false)
const confetti = ref([])
let confettiId = 0
let bodiesB = []
let balloonRaf = 0
let heldBalloon = null
// screen-space "up"; updated from device orientation on mobile
const up = { x: 0, y: -1 }

const makeBalloons = () => {
  const W = window.innerWidth
  const H = window.innerHeight
  const projR = Math.max(44, Math.min(62, W / 8))
  const items = [
    ...featured.map(p => ({ project: p, r: projR })),
    ...Array.from({ length: 5 }, () => ({ project: null, r: projR * 0.6 })),
  ]
  bodiesB = items.map((item, i) => {
    const color = BALLOON_COLORS[i % BALLOON_COLORS.length]
    return {
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
      bg: color.bg,
      fg: color.fg,
    }
  })
}

const balloonTick = () => {
  const W = window.innerWidth
  const H = window.innerHeight
  const t = performance.now() / 1000
  const perp = { x: -up.y, y: up.x }

  for (const b of bodiesB) {
    // frozen: fully inflated balloon kept covering the screen while the modal fades in
    if (b.popped || b.frozen) continue

    if (heldBalloon === b) {
      // inflate with ease-in until the balloon covers the whole viewport
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
        modal.value = { project: b.project, bg: b.bg, fg: b.fg }
        heldBalloon = null
        heldId.value = null
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

    // wrap around: leave at the "up" edge, respawn at the "down" edge
    const m = b.r * 2.6
    if (b.y < -m) { b.y = H + m; b.x = Math.random() * W }
    if (b.y > H + m) { b.y = -m; b.x = Math.random() * W }
    if (b.x < -m) { b.x = W + m; b.y = Math.random() * H }
    if (b.x > W + m) { b.x = -m; b.y = Math.random() * H }
  }

  // soft repulsion so balloons drift apart instead of overlapping
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

  balloonList.value = [...bodiesB]
  balloonRaf = window.requestAnimationFrame(balloonTick)
}

const grabBalloon = (b) => {
  const body = bodiesB.find(x => x.id === b.id)
  if (!body || body.popped) return
  if (body.project) {
    body.holdStart = performance.now()
    heldBalloon = body
    heldId.value = body.id
  } else {
    // empty balloon: pop!
    body.popped = true
    burst(body.x, body.y)
    try { navigator.vibrate?.(60) } catch { /* not supported */ }
    setTimeout(() => {
      body.x = Math.random() * window.innerWidth
      body.y = up.y <= 0 ? window.innerHeight + body.r * 2 : -body.r * 2
      body.popped = false
    }, 2500)
  }
}

const releaseBalloon = () => {
  heldBalloon = null
  heldId.value = null
}

const onOrientation = (e) => {
  if (e.gamma === null || e.beta === null) return
  // direction of gravity on screen → up is the opposite
  const gx = Math.sin((e.gamma * Math.PI) / 180)
  const gy = Math.sin((Math.min(Math.max(e.beta, -90), 90) * Math.PI) / 180)
  const len = Math.hypot(gx, gy)
  if (len < 0.15) return // phone lying flat — keep last direction
  up.x = -gx / len
  up.y = -gy / len
}

const enableTilt = async () => {
  try {
    const res = await DeviceOrientationEvent.requestPermission()
    if (res === 'granted') {
      needsTilt.value = false
      window.addEventListener('deviceorientation', onOrientation)
    }
  } catch {
    needsTilt.value = false
  }
}

// --- billig: klip kuponen ---
const cutLineRef = ref(null)
const cutProgress = ref(0)
const isCut = computed(() => cutProgress.value >= 1)
let cutting = false

const startCut = () => {
  if (!isCut.value) cutting = true
}

const onCutMove = (e) => {
  if (!cutting) return
  const el = cutLineRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const p = (e.clientX - rect.left) / rect.width
  // scissors only move forward — you can't "un-cut" paper
  cutProgress.value = Math.min(1, Math.max(cutProgress.value, p))
  if (isCut.value) {
    cutting = false
    burst(rect.right - 10, rect.top + rect.height / 2)
    try { navigator.vibrate?.(80) } catch { /* not supported */ }
  }
}

const stopCut = () => {
  cutting = false
}

const CONFETTI_COLORS = ['#ffbe0b', '#ffffff', '#8338ec', '#3a86ff', '#4ade80']

const burst = (x, y) => {
  const pieces = Array.from({ length: 26 }, () => ({
    id: confettiId++,
    x,
    y,
    dx: (Math.random() - 0.5) * 360,
    dy: (Math.random() - 0.9) * 360,
    rot: (Math.random() - 0.5) * 720,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }))
  confetti.value = [...confetti.value, ...pieces]
  const ids = new Set(pieces.map(p => p.id))
  setTimeout(() => {
    confetti.value = confetti.value.filter(c => !ids.has(c.id))
  }, 1300)
}

// --- hurtig: performance receipts, measured live in the visitor's browser ---
const loadMs = ref(0)
const weightKB = ref(0)
const shownLoadMs = ref(0)
const shownWeightKB = ref(0)
let perfAnimated = false

const ourBarWidth = computed(() => {
  const pct = (shownWeightKB.value / 2400) * 100
  return `${Math.max(2, Math.min(100, pct))}%`
})

const measurePerf = () => {
  const nav = performance.getEntriesByType('navigation')[0]
  if (!nav) return
  const t = nav.loadEventEnd > 0 ? nav.loadEventEnd : nav.domContentLoadedEventEnd
  loadMs.value = Math.max(1, Math.round(t))
  let total = nav.transferSize || 0
  for (const r of performance.getEntriesByType('resource')) {
    total += r.transferSize || 0
  }
  weightKB.value = Math.max(1, Math.round(total / 1024))
}

const animatePerf = () => {
  if (perfAnimated) return
  perfAnimated = true
  measurePerf()
  const start = performance.now()
  const dur = 900
  const step = () => {
    const p = Math.min(1, (performance.now() - start) / dur)
    const ease = 1 - (1 - p) ** 3
    shownLoadMs.value = Math.round(loadMs.value * ease)
    shownWeightKB.value = Math.round(weightKB.value * ease)
    if (p < 1) window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

watch(activeIdx, (idx) => {
  if (idx === 3) animatePerf()
  else resetTapRace()
})

// --- hurtig: double-tap race ---
const tapState = ref('idle') // idle | armed | result
const tapMs = ref(0)
const tapResult = ref(null) // 'win' | 'lose'
let firstTapTime = 0
let tapResetTimer = null

const resetTapRace = () => {
  tapState.value = 'idle'
  tapResult.value = null
  firstTapTime = 0
  if (tapResetTimer) {
    clearTimeout(tapResetTimer)
    tapResetTimer = null
  }
}

const onTapRace = () => {
  const now = performance.now()

  if (tapState.value === 'result') {
    resetTapRace()
    return
  }

  if (tapState.value === 'idle') {
    firstTapTime = now
    tapState.value = 'armed'
    if (tapResetTimer) clearTimeout(tapResetTimer)
    tapResetTimer = setTimeout(resetTapRace, 700)
    return
  }

  if (tapResetTimer) {
    clearTimeout(tapResetTimer)
    tapResetTimer = null
  }
  tapMs.value = Math.max(1, Math.round(now - firstTapTime))
  tapResult.value = tapMs.value < loadMs.value ? 'win' : 'lose'
  tapState.value = 'result'
}

// --- bæredygtig ---
const plants = ['🌱', '🌿', '🌱', '🪴', '🌱', '🌿', '🌳']

onMounted(() => {
  sectionEls = Array.from(containerRef.value?.querySelectorAll(':scope > section') ?? [])
  scrollRaf = window.requestAnimationFrame(scrollLoop)
  makeBalloons()
  balloonRaf = window.requestAnimationFrame(balloonTick)
  window.addEventListener('pointerup', releaseBalloon)
  window.addEventListener('pointercancel', releaseBalloon)
  window.addEventListener('pointermove', onCutMove)
  window.addEventListener('pointerup', stopCut)

  const iosGate = typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  if (iosGate) {
    needsTilt.value = true
  } else if (typeof DeviceOrientationEvent !== 'undefined') {
    window.addEventListener('deviceorientation', onOrientation)
  }
})

onUnmounted(() => {
  window.cancelAnimationFrame(balloonRaf)
  window.removeEventListener('pointerup', releaseBalloon)
  window.removeEventListener('pointercancel', releaseBalloon)
  window.removeEventListener('pointermove', onCutMove)
  window.removeEventListener('pointerup', stopCut)
  window.removeEventListener('deviceorientation', onOrientation)
  if (typeTimer) clearInterval(typeTimer)
  if (scrollRaf) window.cancelAnimationFrame(scrollRaf)
  if (tapResetTimer) clearTimeout(tapResetTimer)
})
</script>

<style scoped>
.cursor-blink {
  animation: blink-cursor 1s step-end infinite;
}
@keyframes blink-cursor {
  50% { opacity: 0; }
}

.font-comic {
  font-family: 'Comic Sans MS', 'Comic Sans', 'Chalkboard SE', cursive;
}

/* brugervenlig: scroll hint */
.scroll-chevron {
  width: 14px;
  height: 14px;
  border-right: 2.5px solid #94a3b8;
  border-bottom: 2.5px solid #94a3b8;
  transform: rotate(45deg);
  margin-top: -7px;
  animation: chevron-fade 1.8s ease-in-out infinite;
}
@keyframes chevron-fade {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-4px, -4px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}
.peek-bob {
  animation: peek-bob 3.2s ease-in-out infinite;
}
@keyframes peek-bob {
  0%, 100% {
    transform: translateY(7px) rotate(-2.5deg);
  }
  50% {
    transform: translateY(-7px) rotate(2.5deg);
  }
}

/* sikker */
.redacted {
  background: currentColor;
  color: #67e8f9;
  border-radius: 3px;
  padding: 0 4px;
  transition: background 0.4s ease;
  cursor: help;
}
.redacted:hover {
  background: transparent;
}

/* sjov: balloons */
.balloon {
  transform-origin: center;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: grab;
}
.balloon:active {
  cursor: grabbing;
}
.balloon-body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 50% 50% / 42% 42% 58% 58%;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.15;
  padding: 10px;
}
.balloon-label {
  transition: opacity 0.2s ease;
}
.balloon-knot {
  position: absolute;
  top: calc(100% - 2px);
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 10px;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}

.confetti-piece {
  position: fixed;
  z-index: 60;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  pointer-events: none;
  animation: confetti-fly 1.2s ease-out forwards;
}
@keyframes confetti-fly {
  to {
    transform: translate(var(--dx), calc(var(--dy) + 300px)) rotate(var(--rot));
    opacity: 0;
  }
}

/* billig: kupon */
.coupon {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.coupon-cut {
  transform: rotate(2.5deg) translateY(14px);
}

/* modal */
.modal-fade-enter-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.modal-fade-enter-from {
  opacity: 0;
  transform: scale(0.92);
}
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* hurtig */
.tap-race {
  touch-action: manipulation;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  background: #fff;
  transition: transform 0.08s ease, background-color 0.2s ease, border-color 0.2s ease;
}
.tap-race-panel {
  width: 100%;
  height: 3.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@media (min-width: 768px) {
  .tap-race-panel {
    height: 4rem;
  }
}
.tap-race-panel--result {
  height: auto;
  min-height: 3.75rem;
}
@media (min-width: 768px) {
  .tap-race-panel--result {
    min-height: 4rem;
  }
}
.tap-race:active {
  transform: scale(0.97);
}
.tap-race--armed {
  background: #f3f4f6;
  border-color: #111;
}
.tap-race--lose {
  background: #f9fafb;
}
.tap-race--win {
  background: #ecfdf5;
  border-color: #059669;
}
.tap-race-pulse {
  animation: tap-pulse 0.45s ease-in-out infinite;
}
@keyframes tap-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.65; transform: scale(1.06); }
}

.speedlines {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.speedline {
  position: absolute;
  left: -40%;
  width: 40%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.35), transparent);
  animation: speed-dash 1.1s linear infinite;
}
@keyframes speed-dash {
  to { transform: translateX(350%); }
}

/* lækker */
.shimmer {
  background: linear-gradient(100deg, #c9a24b 20%, #f4dfa4 40%, #c9a24b 60%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 2.8s linear infinite;
}
@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}

/* bæredygtig */
.plant {
  animation: grow-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes grow-in {
  from {
    transform: scale(0) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
