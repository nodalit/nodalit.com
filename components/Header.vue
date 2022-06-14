<template>
  <header class="bg-primary">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none" style="height: 70px;">
        <div class="flex items-center overflow-visible">
          <NuxtLink to="/">
            <span class="sr-only">Meetr</span>
            <ClientOnly>
              <Logo />
            </ClientOnly>
          </NuxtLink>
          <div class="hidden space-x-8 lg:block">
            <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" class="text-base font-bold uppercase text-black hover:text-indigo-50">
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
        <!--
        <div class="ml-10 space-x-4">
          <a href="#" class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Sign in</a>
          <a href="#" class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Sign up</a>
        </div>
        -->
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" class="text-base font-bold uppercase text-black hover:text-indigo-50">
          {{ link.name }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navigation = [
  { name: 'Hvad kan vi?', href: '/loesninger' },
  { name: 'Hvad har vi lavet?', href: '/referencer' },
  { name: 'Hvem er vi?', href: '/team' },
]
</script>
