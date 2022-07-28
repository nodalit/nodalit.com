<template>
  <div
    :id="props.uid"
    class="transition-opacity"
    :style="'opacity: ' + opacity + ';'"
  >
    <slot />
  </div>
</template>
<script setup>
import calcHorizontalDistance from '@/composables/calcHorizontalDistance'
// import calcElementOpacity from '@/composables/calcElementOpacity'
const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
})
const opacity = ref(0)
let containerEl = null
const scrollCallback = () => {
  const horDist = calcHorizontalDistance(70, containerEl)
  if (horDist > 0) {
    opacity.value = 1
  } else {
    opacity.value = 0
  }
}
onMounted(() => {
  containerEl = document.getElementById(props.uid)
  window.addEventListener('scroll', scrollCallback)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollCallback)
})
</script>
<style scoped>

</style>
