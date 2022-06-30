<template>
  <div>
    <div class="pb-16 bg-gradient-to-r from-gray-100 to-gray-300 lg:pb-0 lg:z-10 lg:relative">
      <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
        <div class="relative lg:-my-8 hidden lg:block">
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
          <div class="rounded-2xl relative">
            <div id="lottieContainerMobile" ref="lottieRef" class="absolute" style="width: 1000px; left: -300px; top: -50px"></div>
          </div>
        </div>
        <div class="lg:m-0 lg:col-span-2 lg:pl-8 md:pt-5">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
            <blockquote>
              <div>
                <img src="/assets/link_arkitektur_logo.svg" class="h-24 lg:h-12" />
                <p class="mt-6 text-2xl font-medium text-black">{{ testimonial.quote }}</p>
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
import lottie from 'lottie-web'
import animationData from '../assets/anim3.json'

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
  animateScroll(700)
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

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('scroll', onScroll)
    anim.destroy()
    anim = undefined
  }
})

const testimonial = {
  name: 'Grethe Hauglang',
  title: 'CEO',
  company: 'LINK Arkitektur',
  quote: 'Vi har haft en tæt og supergodt samarbejde med Meetr. De leverer til tiden og de forstår at oversætte vores forretningskrav til kode med konstant fokus på at gøre processen så let og gnidningsfri som mulig.',
}
</script>
