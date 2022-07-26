<template>
  <div>
    <header id="header" class="fixed top-0 w-full z-20 mix-blend-difference" :style="{ height: `${headerHeight}px` }">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top" :class="{ 'max-w-full': isSmall }">
        <div class="w-full justify-between" style="height: 70px;">
          <div class="flex items-center overflow-visible justify-between lg:justify-start" :style="{ justifyContent: isSmall ? 'space-between' : 'left' }">
            <a href="/">
              <span class="sr-only">Meetr</span>
              <ClientOnly>
                <Logo id="headerLogo" :height="headerHeight" />
              </ClientOnly>
            </a>
            <div v-if="!isSmall" class="hidden space-x-8 lg:block lg:ml-5">
              <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" class="text-base font-bold uppercase text-white hover:text-indigo-50">
                {{ link.name }}
              </NuxtLink>
            </div>
            <div
              class="lg:hidden cursor-pointer"
              :style="{ display: isSmall ? 'block' : null }"
              @click="showMenu = !showMenu"
            >
              <div class="-mr-2">
                <span class="sr-only">Open menu</span>
                <MenuIcon
                  class="h-8 w-8 text-black rouned-md"
                  :style="{ color: textColor }"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <Transition name="scale" @enter="enterMenu">
      <div
        v-if="showMenu && isSmall"
        class="fixed z-30 right-10 p-8 transition transform origin-top-right rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 bg-gray-900 divide-y-2 divide-gray-50"
        :style="{ top: `${headerHeight}px` }"
      >
        <nav class="grid gap-6">
          <div
            v-for="link in navigation"
            :key="link.name"
            :href="link.href"
            class="menu-item -m-3 p-3 flex items-center rounded-lg hover:bg-gray-50 text-slate-50 hover:text-black hover:cursor-pointer"
            :style="{ color: textColor }"
            @click="goto(link.href)"
          >
            <div
              class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full"
              style="background: #ff006e;"
            >
              <!-- <component :is="item.icon" class="h-6 w-6" aria-hidden="true" /> -->
            </div>
            <div class="ml-4 text-xl font-bold">
              {{ link.name }}
            </div>
          </div>
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

const rgbToHsl = (r, g, b) => {
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
}

const elementBackgroundColor = (element) => {
  const bgColor = window.getComputedStyle(element).backgroundColor
  if (bgColor === 'rgba(0, 0, 0, 0)') { // Transparent
    return elementBackgroundColor(element.parentElement)
  } else {
    return bgColor
  }
}

const textColor = computed(() => {
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
  { name: 'Kontakt os', href: '/kontakt' },
]

const goto = (href: string) => {
  navigateTo(href)
  showMenu.value = false
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
