<!-- PROTOTYPE variant A — "Kinetisk typografi": brutalist, type-driven, cursor-følgende projektbilleder. -->
<template>
  <div class="bg-white text-black min-h-screen font-sans antialiased">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-6 md:px-12 py-6">
      <span class="text-xl font-black tracking-tighter">NODALIT</span>
      <a
        href="mailto:kontakt@nodalit.com"
        class="text-sm uppercase tracking-widest border-b-2 border-black hover:bg-black hover:text-white transition-colors px-1"
      >
        Kontakt
      </a>
    </div>

    <!-- Hero -->
    <header class="px-6 md:px-12 pt-16 pb-24">
      <h1 class="font-black tracking-tighter leading-[0.85] text-[16vw] md:text-[13vw] select-none">
        DIGITALE<br />
        <span class="text-transparent" style="-webkit-text-stroke: 2px black;">VÆRKTØJER</span><br />
        DER VIRKER
      </h1>
      <p class="mt-10 max-w-md text-lg text-gray-600">
        Vi er Nodalit. Vi designer og udvikler web-apps, integrationer og dataplatforme
        for kunder i Danmark og Norden — og et par af vores egne.
      </p>
    </header>

    <!-- Marquee -->
    <div class="border-y-2 border-black py-4 overflow-hidden whitespace-nowrap select-none" aria-hidden="true">
      <div class="marquee inline-block">
        <span v-for="n in 2" :key="n" class="text-2xl md:text-4xl font-black tracking-tight uppercase">
          Web-apps · Integrationer · Datavisualisering · iOS &amp; Android · Læringsplatforme · AI ·&nbsp;
        </span>
      </div>
    </div>

    <!-- Project list -->
    <section class="relative" @mousemove="onMove" @mouseleave="hovered = null">
      <a
        v-for="(project, i) in projects"
        :key="project.name"
        :href="project.url || 'mailto:kontakt@nodalit.com'"
        target="_blank"
        rel="noopener"
        class="group grid grid-cols-12 items-baseline gap-4 px-6 md:px-12 py-8 border-b-2 border-black hover:bg-black hover:text-white transition-colors"
        @mouseenter="hovered = project"
      >
        <span class="col-span-1 text-sm font-mono">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="col-span-7 md:col-span-6 text-2xl md:text-5xl font-black tracking-tight uppercase">
          {{ project.name }}
        </span>
        <span class="col-span-4 md:col-span-3 text-sm md:text-base text-gray-500 group-hover:text-gray-300">
          {{ project.client }}
        </span>
        <span class="hidden md:block col-span-2 text-right text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </a>

      <!-- Cursor-following preview -->
      <Transition name="pop">
        <img
          v-if="hovered"
          :src="hovered.image"
          :alt="hovered.name"
          class="hidden md:block fixed z-50 w-80 aspect-[4/3] object-cover object-top pointer-events-none shadow-2xl rotate-3 border-4 border-black"
          :style="{ left: `${pos.x + 24}px`, top: `${pos.y - 100}px` }"
        />
      </Transition>
    </section>

    <!-- Contact -->
    <footer class="px-6 md:px-12 py-24 md:py-40">
      <p class="text-sm uppercase tracking-widest text-gray-500 mb-6">Har du et projekt?</p>
      <a
        href="mailto:kontakt@nodalit.com"
        class="block font-black tracking-tighter leading-none text-[8vw] hover:text-transparent transition-all"
        style="-webkit-text-stroke: 2px black;"
      >
        KONTAKT@NODALIT.COM
      </a>
      <div class="mt-16 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500">
        <span>Nodalit ApS</span>
        <span>CVR 42252301</span>
        <span>Skovbogårds Allé 15, 2500 Valby</span>
        <span>+45 20 31 71 27</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import allProjects from '@/assets/projects'

const projects = allProjects.filter(p => p.featured)

const hovered = ref(null)
const pos = ref({ x: 0, y: 0 })

const onMove = (e) => {
  pos.value = { x: e.clientX, y: e.clientY }
}
</script>

<style scoped>
.marquee {
  animation: marquee 25s linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9) rotate(3deg);
}
</style>
