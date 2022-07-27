<template>
  <div>
    <div class="pb-16 bg-gradient-to-r from-gray-100 to-gray-300 lg:pb-0 lg:z-10 lg:relative">
      <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
        <div class="relative hidden lg:block">
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
          <div class="rounded-2xl relative">
            <div class="" style="width: 1000px; margin: -50px -300px">
              <video ref="vidRef" playsinline muted>
                <source src="/assets/mobile.mp4" type="video/mp4" codec="hvc1" />
                <source src="/assets/mobile.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
        <div class="py-12 lg:m-0 lg:col-span-2 lg:pl-8">
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
const vidRef = ref(null)

const animateScroll = (duration: number) => {
  const scrollPosition = window.scrollY
  const goto = (vidRef.value.duration / 100) * (scrollPosition / (duration / 100))
  if (vidRef.value.seeking) {
    return
  }
  if (goto < vidRef.value.duration) {
    vidRef.value.currentTime = goto
  } else {
    vidRef.value.currentTime = vidRef.value.duration
  }
}

const onScroll = () => {
  animateScroll(500)
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('scroll', onScroll)
    vidRef.value.currentTime = 0.001
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('scroll', onScroll)
  }
})

const testimonial = {
  name: 'Grethe Hauglang',
  title: 'CEO',
  company: 'LINK Arkitektur',
  quote: 'Vi har haft en tæt og supergodt samarbejde med Meetr. De leverer til tiden og de forstår at oversætte vores forretningskrav til kode med konstant fokus på at gøre processen så let og gnidningsfri som mulig.',
}
</script>
