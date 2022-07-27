<template>
  <div
    :id="uid"
    class="transition-opacity"
    :style="'opacity: ' + opacity + ';'"
  >
    <slot />
  </div>
</template>
<script>
import calcHorizontalDistance from '@/composables/calcHorizontalDistance'
// import calcElementOpacity from '@/composables/calcElementOpacity'
export default {
  name: 'BadeFadeIn',
  props: {
    uid: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      opacity: 0,
    }
  },
  mounted () {
    const containerEl = document.getElementById(this.uid)
    // const containerHeight = containerEl.scrollHeight
    addEventListener('scroll', () => {
      const horDist = calcHorizontalDistance(70, containerEl)
      if (horDist > 0) {
        this.opacity = 1
      } else {
        this.opacity = 0
      }
      /* const unit = containerHeight
      const fadePoints = { start: 0, end: containerHeight - 200 }
      this.opacity = calcElementOpacity(horDist, fadePoints, unit) */
    })
  },
}
</script>
<style scoped>

</style>
