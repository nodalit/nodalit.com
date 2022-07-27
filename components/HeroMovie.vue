<template>
  <div ref="movieContainerRef" class="base-section pt-20 pb-4 bg-gray-900 lg:overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-12 sm:px-12 lg:px-16">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="lg:text-left lg:flex lg:items-center">
          <div class="py-12 lg:py-20">
            <h1 class="text-5xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
              <span class="block">Brug for en</span>
              <Typewriter />
              <span class="block text-white">digital løsning?</span>
            </h1>
            <p class="mt-3 responsive-text-lg text-gray-300 sm:mt-5">
              Vi laver små og store digitale løsninger for vores kunder, store som små.
              Vi er uhørt billige og vi elsker vores arbejde – spørg bare nogle af vores
              <a :href="'#cases'" @click.prevent="scrollTo('cases')" class="text-logo1">
                kunder
              </a>!
            </p>
          </div>
        </div>
        <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative hidden lg:block">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
            <!-- <img class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none" src="assets/hero.png" alt="" /> -->
            <div class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none lg:flex lg:justify-center">
              <video ref="vidRef" playsinline muted>
                <source src="/assets/laptop.mp4" type="video/mp4" codec="hvc1" />
                <source src="/assets/laptop.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import calcHorizontalDistance from '@/composables/calcHorizontalDistance'

const vidRef = ref(null)
const movieContainerRef = ref(null)
let requestAnimationFrameId: number

const tick = () => {
  if (process.client) {
    requestAnimationFrameId = requestAnimationFrame(tick)
    if (vidRef.value.seeking) {
      return
    }
    const horDist = calcHorizontalDistance(0, movieContainerRef.value)
    const maxScroll = movieContainerRef.value.clientHeight - horDist
    const scrollProgress = horDist / Math.max(maxScroll, 1)
    vidRef.value.currentTime = vidRef.value.duration * scrollProgress
  }
}

onMounted(() => {
  if (process.client) {
    vidRef.value.currentTime = 0.001
    tick()
  }
})

onUnmounted(() => {
  if (process.client) {
    cancelAnimationFrame(requestAnimationFrameId)
  }
})
const scrollTo = (id) => {
  const element = document.getElementById(id)
  element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}
</script>
