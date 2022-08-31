<template>
  <div ref="movieContainerRef" class="base-section pt-20 pb-4 bg-gray-900 lg:overflow-hidden">
    <div class="relative max-w-screen-2xl mx-auto px-12 sm:px-12 lg:px-16 pb-8">
      <div class="xl:grid xl:grid-cols-16">
        <div
          class="xl:col-start-3 xl:col-end-14 3xl:col-start-1 grid grid-cols-2 gap-6"
          style="grid-column-end: 15;"
        >
          <div class="col-span-2 lg:col-span-1 lg:text-left lg:flex lg:items-center">
            <div class="py-12 lg:py-20">
              <h1 class="text-4xl sm:text-5xl tracking-tight font-extrabold text-white">
                <span class="block pb-1 sm:pb-2">Brug for en</span>
                <Typewriter />
                <span class="block pt-1 sm:pt-2 text-white">digital løsning?</span>
              </h1>
              <p class="mt-3 responsive-text-lg text-gray-300 sm:mt-5">
                Vi laver digitale løsninger for vores kunder – store som små. Vi har fair priser og vi elsker vores arbejde. Se hvad
                <a :href="'#cases'" class="text-logo1" @click.prevent="scrollTo('cases')">
                  kunderne siger
                </a>
              </p>
            </div>
          </div>
          <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative hidden lg:block">
            <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <!-- <img class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none" src="assets/hero.png" alt="" /> -->
              <div class="w-full lg:absolute lg:inset-y-0 lg:top-6 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none lg:flex lg:justify-center">
                <video ref="vidRef" playsinline muted>
                  <source src="/laptop.mp4" type="video/mp4" codec="hvc1" />
                  <source src="/laptop.webm" type="video/webm" />
                </video>
              </div>
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
let currentFrame = 1

const tick = () => {
  if (process.client) {
    requestAnimationFrameId = requestAnimationFrame(tick)
    if (vidRef.value.seeking) {
      return
    }
    const horDist = calcHorizontalDistance(0, movieContainerRef.value)
    const maxScroll = movieContainerRef.value.clientHeight - horDist
    if (horDist > maxScroll) {
      if (currentFrame < 60) {
        currentFrame = 60
        vidRef.value.currentTime = 1
      }
      return
    }
    const scrollProgress = horDist / Math.max(maxScroll, 1)
    const newPos = Math.round(vidRef.value.duration * scrollProgress * 100) / 100
    const newFrame = Math.round(newPos * 60)
    if (newFrame !== currentFrame) {
      if (newFrame > 60) {
        vidRef.value.currentTime = 1
        return
      }
      vidRef.value.currentTime = isNaN(newPos) ? 0 : newPos
      currentFrame = newFrame
      // console.log(currentFrame, newPos)
    }
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

<style scoped>
video {
  max-width: 120% !important;
}
</style>
