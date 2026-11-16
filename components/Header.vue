<template>
  <div>
    <header id="header" class="fixed top-0 w-full z-20" :style="{ height: `${headerHeight}px` }">
      <div class="max-w-screen-2xl px-4 md:px-12 pt-3 md:pt-2 lg:px-16 grid grid-cols-16 items-end" aria-label="Top" :class="{ 'max-w-full': isSmall }">
        <a
          class="col-span-2 md:col-span-3 xl:col-span-2 transition-transform origin-bottom-left"
          :class="isSmall ? 'rotate-90 -translate-x-3 md:-translate-x-11 lg:-translate-x-14 -translate-y-8 md:-translate-y-6' : ''"
          href="/"
          @click.prevent="scrollTo('top')"
        >
          <span class="sr-only">Nodalit</span>
          <ClientOnly>
            <span
              class="text-3xl font-bold"
              :class="darkBg ? 'text-white' : 'text-gray-900'"
              style="line-height: 1;"
            >
              <span class="text-logo1">N</span>
              <span>od</span>
              <span>al</span>
              <span class="text-logo3">it</span>
            </span>
          </ClientOnly>
        </a>
        <div v-if="!isSmall" class="col-span-12 hidden md:flex items-center space-x-8">
          <a
            v-for="link in navigation"
            :key="link.name"
            :href="link.href"
            class="cursor-pointer flex-shrink-0 text-base uppercase hover:text-indigo-50"
            :class="darkBg ? 'text-white' : 'text-gray-900'"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </header>
    <div
      class="fixed top-3 right-6 block cursor-pointer z-40"
      :class="isSmall ? 'md:block' : 'md:hidden'"
      @click="showMenu = !showMenu"
    >
      <div class="-mr-2">
        <span class="sr-only">Open menu</span>
        <MenuIcon
          class="h-8 w-8 rouned-md"
          :style="{ color: darkBg ? 'white' : 'black' }"
          aria-hidden="true"
        />
      </div>
    </div>
    <Transition name="scale" @enter="enterMenu">
      <div
        v-if="showMenu"
        class="fixed z-30 right-0 left-0 top-0 bottom-0 p-8 transition transform origin-top-right bg-gray-900 flex"
      >
        <nav class="flex-grow flex flex-col justify-center space-y-6">
          <a
            v-for="link in navigation"
            :key="link.name"
            :href="link.href"
            class="menu-item -m-3 p-3 flex justify-center items-center rounded-lg text-slate-50 hover:text-logo3 hover:cursor-pointer"
            @click.prevent="scrollTo(link.id)"
          >
            <div class="ml-4 text-5xl text-center">
              {{ link.name }}
            </div>
          </a>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'
import { MenuIcon } from '@heroicons/vue/outline/esm/index.js'

const props = defineProps({
  darkBg: {
    type: Boolean,
    default: true,
  },
})

const isSmall = ref(false)
const showMenu = ref(false)
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
  const logo = document.getElementById('headerLogo')
  if (!logo) return

  anime({
    targets: logo,
    translateX: val ? [100, 0] : [-100, 0],
    easing: 'easeOutExpo',
    duration: 750,
  })
})

onMounted(() => {
  initialHeaderHeight = document.getElementsByTagName('header')[0].clientHeight
  window.addEventListener('scroll', scrolling)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrolling)
})

const navigation = [
  { name: 'Arbejde', href: '#arbejde', id: 'arbejde' },
  { name: 'Ekspertise', href: '#ekspertise', id: 'ekspertise' },
  { name: 'Kontakt', href: '#kontakt', id: 'kontakt' },
]

const scrollTo = (id) => {
  showMenu.value = false
  const element = document.getElementById(id)
  element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

const enterMenu = () => {
  anime({
    targets: '.menu-item',
    translateX: [200, 0],
    delay: anime.stagger(50),
    easing: 'easeInOutQuad',
    duration: 250,
  })
}
</script>

<style>
.scale-enter-active {
  animation: scale-in 0.15s;
}
.scale-leave-active {
  animation: scale-in 0.15s reverse;
}
@keyframes scale-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
