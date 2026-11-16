<!-- PROTOTYPE variant C — "Fuldskærms-scroll": ét projekt pr. skærm, scroll-snap, farveblokke i logopaletten. -->
<template>
  <div ref="containerRef" class="fixed inset-0 overflow-y-auto snap-y snap-mandatory antialiased" @scroll.passive="onScroll">
    <!-- Intro slide -->
    <section class="h-full min-h-screen snap-start flex flex-col justify-between bg-black text-white px-6 md:px-16 py-10">
      <span class="text-xl font-bold">
        <span class="text-logo1">N</span>od<span class="text-logo3">alit</span>
      </span>
      <div>
        <h1 class="text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.95]">
          10 løsninger.<br />
          Én tilgang:<br />
          <span class="text-logo1">byg det ordentligt.</span>
        </h1>
      </div>
      <p class="text-gray-500 animate-bounce select-none">Scroll ↓</p>
    </section>

    <!-- One slide per project -->
    <section
      v-for="(project, i) in projects"
      :key="project.name"
      class="h-full min-h-screen snap-start flex items-center px-6 md:px-16"
      :style="{ backgroundColor: palette[i % palette.length].bg, color: palette[i % palette.length].text }"
    >
      <div class="w-full max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-center">
        <span class="md:col-span-3 font-black leading-none text-[25vw] md:text-[12vw] opacity-25 select-none">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
        <div class="md:col-span-9">
          <p class="text-sm uppercase tracking-widest opacity-70">{{ project.client }}</p>
          <h2 class="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight">{{ project.name }}</h2>
          <p class="mt-6 max-w-lg text-lg md:text-xl opacity-80">{{ project.tagline }}</p>
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener"
            class="mt-8 inline-block border-2 rounded-full px-6 py-3 font-semibold hover:opacity-70 transition-opacity"
            :style="{ borderColor: palette[i % palette.length].text }"
          >
            Besøg projektet →
          </a>
        </div>
      </div>
    </section>

    <!-- Contact slide -->
    <section class="h-full min-h-screen snap-start flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h2 class="text-4xl md:text-7xl font-extrabold tracking-tight">Skal vi bygge jeres næste?</h2>
      <a
        href="mailto:kontakt@nodalit.com"
        class="mt-10 text-xl md:text-3xl text-logo1 hover:underline"
      >
        kontakt@nodalit.com
      </a>
      <p class="mt-16 text-sm text-gray-600">
        Nodalit ApS · CVR 42252301 · Skovbogårds Allé 15, 2500 Valby
      </p>
    </section>

    <!-- Progress dots -->
    <div class="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      <span
        v-for="n in slideCount"
        :key="n"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="activeSlide === n - 1 ? 'bg-white scale-150 shadow' : 'bg-white/40'"
      />
    </div>
  </div>
</template>

<script setup>
import allProjects from '@/assets/projects'

const projects = allProjects.filter(p => p.featured)

const palette = [
  { bg: '#ffbe0b', text: '#000000' },
  { bg: '#ff006e', text: '#ffffff' },
  { bg: '#8338ec', text: '#ffffff' },
  { bg: '#3a86ff', text: '#ffffff' },
]

const containerRef = ref(null)
const activeSlide = ref(0)
const slideCount = computed(() => projects.length + 2)

const onScroll = () => {
  const el = containerRef.value
  if (!el) return
  activeSlide.value = Math.round(el.scrollTop / el.clientHeight)
}
</script>
