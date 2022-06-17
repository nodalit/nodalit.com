<template>
  <header class="bg-black" :class="{ 'fixed top-0 w-full z-50': isSmall }" :style="{ height: `${headerHeight}px` }">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top" :class="{ 'max-w-full': isSmall }">
      <div class="w-full justify-between border-b border-indigo-500 lg:border-none" style="height: 70px;">
        <div class="flex items-center overflow-visible justify-between lg:justify-start" :style="{ justifyContent: isSmall ? 'space-between' : 'left' }">
          <NuxtLink to="/">
            <span class="sr-only">Meetr</span>
            <ClientOnly>
              <Logo id="headerLogo" :height="headerHeight" />
            </ClientOnly>
          </NuxtLink>
          <div v-if="!isSmall" class="hidden space-x-8 lg:block lg:ml-5">
            <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" class="text-base font-bold uppercase text-white hover:text-indigo-50">
              {{ link.name }}
            </NuxtLink>
          </div>
          <div class="lg:hidden" :style="{ display: isSmall ? 'block' : null }">
            <div class="-mr-2">
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-8 w-8 text-white rouned-md" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import {
  MenuIcon,
} from '@heroicons/vue/outline'

const isSmall = ref(false)
const headerHeight = ref(70)
let initialHeaderHeight = 70

const scrolling = () => {
  if (window.scrollY > initialHeaderHeight / 2) {
    isSmall.value = true
    headerHeight.value = initialHeaderHeight / 2
  } else {
    isSmall.value = false
    headerHeight.value = initialHeaderHeight
  }
}

watch(isSmall, (val) => {
  if (val) {
    anime({
      targets: document.getElementById('headerLogo'),
      translateX: [100, 0],
      easing: 'easeOutExpo',
      duration: 750,
    })
  } else {
    anime({
      targets: document.getElementById('headerLogo'),
      translateX: [-100, 0],
      easing: 'easeOutExpo',
      duration: 750,
    })
  }
})

onMounted(() => {
  initialHeaderHeight = document.getElementsByTagName('header')[0].clientHeight
  window.addEventListener('scroll', scrolling)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrolling)
})

const navigation = [
  { name: 'Hvad kan vi?', href: '/loesninger' },
  { name: 'Hvad har vi lavet?', href: '/referencer' },
  { name: 'Hvem er vi?', href: '/team' },
]
</script>
