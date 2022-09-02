<template>
  <div>
    <Header :dark-bg="darkBg" />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import isElementBgDark from '@/composables/isElementBgDark'
import isBehindElement from '@/composables/isBehindElement'
useHead({
  title: 'Nodalit – web-apps til mennesker',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Vi laver digitale løsninger for vores kunder – store som små. Vi har fair priser og vi elsker vores arbejde.',
    },
    {
      hid: 'sharetitle',
      name: 'og:title',
      content: 'Nodalit – web-apps til mennesker',
    },
    {
      hid: 'sharedescription',
      name: 'og:description',
      content: 'Vi laver digitale løsninger for vores kunder – store som små. Vi har fair priser og vi elsker vores arbejde.',
    },
    {
      hid: 'sharetype',
      name: 'og:type',
      content: 'website',
    },
    {
      hid: 'shareurl',
      name: 'og:url',
      content: 'https://www.nodalit.com',
    },
    {
      hid: 'shareimage',
      property: 'og:image',
      content: 'https://www.nodalit.com/shareimage_logo.png',
    },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
  ],
})

const darkBg = ref(true)

const scrolling = () => {
  const htmlCollection = document.getElementsByClassName('base-section')
  const baseSectionEls = Array.from(htmlCollection)
  const headerEl = document.getElementById('header')
  if (headerEl && Array.isArray(baseSectionEls)) {
    baseSectionEls.forEach((element) => {
      if (isBehindElement(headerEl, element)) {
        const isDark = isElementBgDark(element)
        if (isDark !== darkBg.value) {
          darkBg.value = isDark
        }
      }
    })
  }
}
onMounted(() => {
  scrolling()
  window.addEventListener('scroll', scrolling)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrolling)
})
</script>
