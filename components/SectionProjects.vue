<!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div class="relative bg-gray-50">
    <main class="lg:relative">
      <div class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span class="block xl:inline">Brugervenlige og intuitive</span>
            {{ ' ' }}
            <span class="block text-secondary xl:inline">applikationer</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Vi designer, udvikler og drifter bæredygtige web-applikationer
          </p>
          <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-secondary hover:bg-gray-700 md:py-4 md:text-lg md:px-10 text-white">Projekter</a>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:secondary md:py-4 md:text-lg md:px-10"> Kontakt </a>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <!--<img class="absolute inset-0 w-full h-full object-cover" src="assets/hero.png" alt="" /> -->
        <TransitionRoot
          v-for="(project, key) in projects"
          :key="key"
          as="div"
          :show="showImage[key]"
          appear
          enter="transform transition duration-[200ms]"
          enter-from="opacity-0 rotate-[-120deg] scale-50"
          enter-to="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leave-from="opacity-100 rotate-0 scale-100 "
          leave-to="opacity-0 scale-95 "
        >
          <img :src="project.image" :alt="project.name" class="absolute project shadow-2xl border-4 border-gray-900" :style="{ top: `${key * 150}px` }">
        </TransitionRoot>
      </div>
    </main>
  </div>
</template>

<script setup>

const projects = [
  {
    name: 'bygningshub.dk',
    image: 'assets/bygningshub.jpg',
  },
  {
    name: 'LINK Kompass',
    image: 'assets/kompass.jpg',
  },
  {
    name: 'Kvalitetsrosen',
    image: 'assets/kvalitetsrosen.jpg',
  },
]

const showImage = reactive([false, false, false])
let idx = 0

const interval = setInterval(() => {
  showImage[idx] = true
  idx++
  if (idx === 4) {
    clearInterval(interval)
  }
}, 200)

/*
const clickProject = (idx: number) => {
  showImage[idx] = true
}
*/

</script>

<style>
.project:hover {
  z-index: 999 !important;
  left: -200px;
  cursor: pointer;
}
</style>
