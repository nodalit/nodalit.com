<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Meetr – web apps til mennesker',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
  ],
})
</script>
