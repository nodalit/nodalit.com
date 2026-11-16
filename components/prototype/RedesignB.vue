<!-- PROTOTYPE variant B — "Node-netværk": mørk, interaktivt canvas af noder der forbinder sig (Nodal-it), glas-kort. -->
<template>
  <div class="bg-[#0a0a0f] text-white min-h-screen antialiased relative">
    <canvas ref="canvasRef" class="fixed inset-0 w-full h-full pointer-events-none" />

    <div class="relative z-10">
      <!-- Top bar -->
      <div class="flex items-center justify-between px-6 md:px-12 py-6">
        <span class="text-xl font-bold">
          <span class="text-logo1">N</span>od<span class="text-logo3">alit</span>
        </span>
        <a
          href="mailto:kontakt@nodalit.com"
          class="text-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
        >
          Kontakt
        </a>
      </div>

      <!-- Hero -->
      <header class="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
          Vi forbinder<br />
          <span class="bg-gradient-to-r from-logo1 via-logo3 to-logo5 bg-clip-text text-transparent">
            idéer og kode
          </span>
        </h1>
        <p class="mt-8 max-w-xl text-lg text-gray-400">
          Nodalit bygger digitale løsninger — web-apps, integrationer og dataplatforme.
          Node for node.
        </p>
        <a
          href="#projekter"
          class="mt-12 text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
          @click.prevent="scrollToProjects"
        >
          Se vores arbejde ↓
        </a>
      </header>

      <!-- Projects -->
      <section id="projekter" ref="projectsRef" class="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <h2 class="text-sm uppercase tracking-widest text-gray-500 mb-12">Udvalgt arbejde</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a
            v-for="project in projects"
            :key="project.name"
            :href="project.url || 'mailto:kontakt@nodalit.com'"
            target="_blank"
            rel="noopener"
            class="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex items-start justify-between">
              <p class="text-xs uppercase tracking-widest text-logo1">{{ project.client }}</p>
              <span class="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
            </div>
            <h3 class="mt-3 text-2xl font-bold">{{ project.name }}</h3>
            <p class="mt-2 text-sm text-gray-400 leading-relaxed">{{ project.tagline }}</p>
          </a>
        </div>
      </section>

      <!-- Contact -->
      <footer class="px-6 md:px-12 py-32 text-center">
        <h2 class="text-4xl md:text-6xl font-extrabold tracking-tight">
          Lad os <span class="bg-gradient-to-r from-logo3 to-logo5 bg-clip-text text-transparent">forbinde</span>
        </h2>
        <a
          href="mailto:kontakt@nodalit.com"
          class="mt-10 inline-block px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
        >
          kontakt@nodalit.com
        </a>
        <p class="mt-16 text-sm text-gray-600">
          Nodalit ApS · CVR 42252301 · Skovbogårds Allé 15, 2500 Valby
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import allProjects from '@/assets/projects'

const projects = allProjects.filter(p => p.featured)

const canvasRef = ref(null)
const projectsRef = ref(null)

const scrollToProjects = () => {
  projectsRef.value?.scrollIntoView({ behavior: 'smooth' })
}

let raf = 0
let nodes = []
const mouse = { x: -9999, y: -9999 }
const ACCENTS = ['#ffbe0b', '#ff006e', '#8338ec', '#3a86ff']

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio
  const count = Math.min(110, Math.floor((window.innerWidth * window.innerHeight) / 14000))
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 1,
    color: Math.random() < 0.18 ? ACCENTS[Math.floor(Math.random() * ACCENTS.length)] : '#ffffff',
  }))
}

const onMouse = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const tick = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (const n of nodes) {
    // gentle pull towards cursor
    const dx = mouse.x - n.x
    const dy = mouse.y - n.y
    const dist = Math.hypot(dx, dy)
    if (dist < 220 && dist > 0.001) {
      n.vx += (dx / dist) * 0.012
      n.vy += (dy / dist) * 0.012
    }
    n.vx *= 0.99
    n.vy *= 0.99
    n.x += n.vx
    n.y += n.vy
    if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1
    if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1
  }

  // edges between nearby nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (d < 130) {
        ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 130) * 0.16})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
    // edge from cursor to nearby nodes, in accent pink
    const n = nodes[i]
    const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y)
    if (dm < 180) {
      ctx.strokeStyle = `rgba(255,0,110,${(1 - dm / 180) * 0.5})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(n.x, n.y)
      ctx.lineTo(mouse.x, mouse.y)
      ctx.stroke()
    }
  }

  for (const n of nodes) {
    ctx.fillStyle = n.color
    ctx.globalAlpha = n.color === '#ffffff' ? 0.55 : 0.95
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  raf = window.requestAnimationFrame(tick)
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouse)
  raf = window.requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouse)
})
</script>
