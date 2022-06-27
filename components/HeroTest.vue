<template>
  <div class="pt-8 bg-gray-900 lg:pb-14 lg:overflow-hidden">
    <div class="mx-auto max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
          <div class="lg:py-24">
            <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
              <span class="block">Brug for en </span>
              <Typewriter />
              <span class="block text-white">digital løsning?</span>
            </h1>
            <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Vi udvikler digitale løsninger for store og små kunder i danmark og norden.
              Vi er billigere end de fleste, til gengæld er vi også bedre :)
              Spørg bare nogle af vores
              <NuxtLink :href="'/referencer'" class="text-logo1">
                kunder
              </NuxtLink>!
            </p>
          </div>
        </div>
        <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
            <!-- <img class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none" src="assets/hero.png" alt="" /> -->
            <lottie-player
              v-if="lottieReady"
              autoplay="true"
              src="/assets/anim.json"
              class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none"
            >
            </lottie-player>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lottieReady = ref(false)

onMounted(() => {
  if (process.client) {
    import('@lottiefiles/lottie-player')
    lottieReady.value = true
  }
})
</script>
