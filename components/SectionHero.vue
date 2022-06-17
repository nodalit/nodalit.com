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
  <div class="pt-40 bg-gray-900 sm:pt-40 lg:pt-8 lg:pb-14 lg:overflow-hidden">
    <div class="mx-auto max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
          <div class="lg:py-24">
            <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
              <span class="block">Brug for en </span>
              <Typewriter />
              <span class="block text-indigo-400">digital løsning?</span>
            </h1>
            <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Vi udvikler digitale løsninger for store og små kunder i danmark og norden.
              Vi er billigere end de fleste, til gengæld er vi også bedre :) 
              Spørg bare nogle af vores <NuxtLink :href="'/referencer'" class="text-indigo-400">kunder</NuxtLink>!
            </p>
          </div>
        </div>
        <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
            <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
            <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Typewriter from '@/components/home/Typewriter.vue'
const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
</script>