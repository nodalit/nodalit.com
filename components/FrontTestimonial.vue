<template>
  <div>
    <div class="pb-16 bg-gradient-to-r from-gray-100 to-gray-300 lg:pb-0 lg:z-10 lg:relative">
      <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
        <div class="relative lg:-my-8">
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
          <div class="rounded-2xl relative">
            <!-- <div class="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
              <img class="object-cover lg:h-full lg:w-full" src="/assets/link_rose_1.png" alt="LINK Kompass" />
            </div> -->
            <div id="lottieContainerMobile" ref="lottieRef" class="absolute" style="width: 1000px; left: -300px; top: -50px"></div>
          </div>
        </div>
        <div class="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
            <blockquote>
              <div>
                <img src="/assets/link_arkitektur_logo.svg" class="w-1/3" />
                <p class="mt-6 text-2xl font-medium text-black">{{ testimonial.quote }}</p>
              </div>
              <footer class="mt-6">
                <p class="text-base font-medium text-black">{{ testimonial.name }}</p>
                <p class="text-base font-medium text-black">{{ testimonial.title }} @ {{ testimonial.company }}</p>
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
