<!-- PROTOTYPE — floating variant switcher. Delete together with the redesign prototype. -->
<template>
  <div
    v-if="isDev"
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 rounded-full bg-black/85 text-white shadow-2xl backdrop-blur px-2 py-1.5 border border-white/20"
  >
    <button
      class="h-8 w-8 rounded-full hover:bg-white/20 transition-colors text-lg leading-none"
      aria-label="Forrige variant"
      @click="cycle(-1)"
    >
      ←
    </button>
    <span class="px-3 text-sm font-medium whitespace-nowrap select-none">
      {{ current }} — {{ labels[current] }}
    </span>
    <button
      class="h-8 w-8 rounded-full hover:bg-white/20 transition-colors text-lg leading-none"
      aria-label="Næste variant"
      @click="cycle(1)"
    >
      →
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  variants: { type: Array, required: true },
  current: { type: String, required: true },
  labels: { type: Object, default: () => ({}) },
})

const isDev = process.dev

const router = useRouter()
const route = useRoute()

const cycle = (dir) => {
  const idx = props.variants.indexOf(props.current)
  const next = props.variants[(idx + dir + props.variants.length) % props.variants.length]
  router.replace({ query: { ...route.query, variant: next } })
}

const onKey = (e) => {
  const el = e.target
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
  if (e.key === 'ArrowLeft') cycle(-1)
  if (e.key === 'ArrowRight') cycle(1)
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>
