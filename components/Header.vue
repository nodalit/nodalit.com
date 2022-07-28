<template>
  <div>
    <header id="header" class="fixed top-0 w-full z-20" :style="{ height: `${headerHeight}px` }">
      <div class="max-w-screen-2xl mx-auto px-12 lg:px-16 grid grid-cols-16 items-end" aria-label="Top" :class="{ 'max-w-full': isSmall }">
        <a class="col-span-2" href="/" @click.prevent="scrollTo('top')">
          <span class="sr-only">Meetr</span>
          <ClientOnly>
            <span class="text-3xl font-bold text-white">
              <span class="text-logo1">N</span>odal<span class="text-logo3">it</span>
            </span>
            <!-- <Logo id="headerLogo" :height="headerHeight" /> -->
          </ClientOnly>
        </a>
        <div v-if="!isSmall" class="col-span-12 hidden lg:flex items-center space-x-8">
          <a
            v-for="link in navigation"
            :key="link.name"
            :href="link.href"
            class="cursor-pointer text-base uppercase text-white hover:text-indigo-50"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </header>
    <div
      class="fixed top-3 right-6 block cursor-pointer z-40"
      :class="isSmall ? 'lg:block' : 'lg:hidden'"
      @click="showMenu = !showMenu"
    >
      <div class="-mr-2">
        <span class="sr-only">Open menu</span>
        <MenuIcon
          class="h-8 w-8 text-white rouned-md"
          :style="{ color: props.darkBg ? 'white' : 'black' }"
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
            <!-- <div
              class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full"
              style="background: #ff006e;"
            >
              <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
            </div> -->
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
import {
  MenuIcon,
} from '@heroicons/vue/outline'

const props = defineProps({
  darkBg: {
    type: Boolean,
    default: true,
  },
})

/* const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = (max + min) / 2
  let s = (max + min) / 2
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [h, s, l]
} */

/* const elementBackgroundColor = (element) => {
  const bgColor = window.getComputedStyle(element).backgroundColor
  if (bgColor === 'rgba(0, 0, 0, 0)') { // Transparent
    return elementBackgroundColor(element.parentElement)
  } else {
    return bgColor
  }
} */

/* const textColor = computed(() => {
  if (process.client) {
    const bgColor = elementBackgroundColor(document.getElementById('header'))
    console.log(bgColor)
    const regex = /\((.*)\)/gm
    const ex = regex.exec(bgColor)
    const rgb = ex[1].split(',').map(x => parseInt(x))
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2])
    console.log(hsl)
  }
  return '#fff'
}) */

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
  { name: 'Vores ekspertise', href: '#ekspertise', id: 'ekspertise' },
  { name: 'Kundecases', href: '#cases', id: 'cases' },
  { name: 'Team', href: '#team', id: 'team' },
  { name: 'Manifest', href: '#manifest', id: 'manifest' },
  { name: 'Kontakt', href: '#kontakt', id: 'kontakt' },
]

const scrollTo = (id) => {
  showMenu.value = false
  const element = document.getElementById(id)
  element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

/* const goto = (href: string) => {
  navigateTo(href)
  showMenu.value = false
} */

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
