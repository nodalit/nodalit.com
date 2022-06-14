<template>
  <header class="bg-black">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none" style="height: 70px;">
        <div class="flex items-center overflow-visible">
          <NuxtLink to="/">
            <span class="sr-only">Meetr</span>
            <ClientOnly>
              <Logo />
            </ClientOnly>
          </NuxtLink>
          <div class="hidden space-x-8 lg:block lg:ml-5">
            <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" class="text-base font-bold uppercase text-white hover:text-indigo-50">
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="grid justify-items-end lg:hidden">
          <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" class="text-base font-bold uppercase text-white hover:text-indigo-50">
          {{ link.name }}
          </NuxtLink>
        </div>
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
