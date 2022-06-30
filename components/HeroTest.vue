<template>
  <div class="pt-8 bg-gray-900 lg:pb-14 lg:overflow-hidden">
    <div class="mx-auto max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
          <div class="lg:py-24">
            <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
              <span class="block">Brug for en</span>
              <Typewriter />
              <span class="block text-white">digital løsning?</span>
            </h1>
            <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Vi laver små og store digitale løsninger for vores kunder, store som små.
              Vi er uhørt billige og vi elsker vores arbejde – spørg bare nogle af vores
              <NuxtLink :href="'/referencer'" class="text-logo1">
                kunder
              </NuxtLink>!
            </p>
          </div>
        </div>
        <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
            <!-- <img class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none" src="assets/hero.png" alt="" /> -->
            <div ref="lottieRef" class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import lottie from 'lottie-web'
import animationData from '../assets/anim2.json'
const lottieRef = ref(null)

let anim

const animateScroll = (duration: number) => {
  const scrollPosition = window.scrollY
  const maxFrames = anim.totalFrames
  const frame = (maxFrames / 100) * (scrollPosition / (duration / 100))
  if (frame <= maxFrames) {
    anim.goToAndStop(frame, true)
  }
}

const onScroll = () => {
  animateScroll(400)
}

onMounted(() => {
  if (process.client) {
    anim = lottie.loadAnimation({
      container: lottieRef.value,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData,
    })
    document.addEventListener('scroll', onScroll)
  }
})
</script>
