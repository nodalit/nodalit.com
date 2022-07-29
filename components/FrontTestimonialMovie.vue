<template>
  <div ref="movieContainerRef">
    <div class="base-section pb-16 bg-gray-200 lg:pb-0 lg:z-10 lg:relative">
      <div class="lg:mx-auto lg:max-w-screen-2xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="relative hidden lg:block lg:col-span-4 xl:col-span-3">
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
          <div class="rounded-2xl relative">
            <div class="" style="width: 1000px; margin: -50px -300px">
              <video ref="vidRef" playsinline muted>
                <source src="/mobile.mp4" type="video/mp4" codec="hvc1" />
                <source src="/mobile.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
        <div class="py-12 lg:m-0 lg:col-span-8 xl:col-span-8 lg:pl-9">
          <div class="sm:max-w-2xl lg:max-w-none px-12 lg:px-0 lg:py-12">
            <blockquote>
              <h3 class="responsive-text-base uppercase">Reference</h3>
              <div>
                <h3 class="text-5xl lg:text-6xl">LINK Arkitektur</h3>
                <!-- <img src="/assets/link_arkitektur_logo.svg" class="h-24 lg:h-12" /> -->
                <p class="mt-6 responsive-text-lg text-black">{{ testimonial.quote }}</p>
              </div>
              <footer class="mt-6 md:flex">
                <div class="md:flex md:items-center md:justify-center">
                  <div class="md:flex-shrink-0">
                    <img class="mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </div>
                  <div class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div class="text-base font-medium text-gray-900">{{ testimonial.name }}</div>

                    <svg class="hidden md:block mx-1 h-5 w-5 text-logo3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>

                    <div class="text-base font-medium text-gray-500">{{ testimonial.title }}, {{ testimonial.company }}</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import texts from '@/assets/texts'
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
    const horDist = calcHorizontalDistance(65, movieContainerRef.value)
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

const testimonial = texts.testemonials[0]
</script>
