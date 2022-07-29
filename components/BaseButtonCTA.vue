<template>
  <button
    class="responsive-text-mega rounded-lg p-3 bg-transparent"
    :class="dark ? 'text-white' : 'text-black'"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="flex space-x-2 items-center">
      <ChevronRightIcon
        :class="'text-' + highlightColor"
        class="flex-shrink-0 w-6 h-6 sm:w-16 sm:h-16 transition-transform"
        aria-hidden="true"
        :style="hover ? 'transform: rotate(90deg);' : ''"
      />
      <span ref="labelContainer">
        <slot />
      </span>
    </div>
  </button>
</template>
<script>
import { ChevronRightIcon } from '@heroicons/vue/outline/esm/index.js'
export default {
  name: 'BaseButtonCTA',
  components: {
    ChevronRightIcon,
  },
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    highlightColor: {
      type: String,
      default: 'logo1',
    },
  },
  data () {
    return {
      hover: false,
    }
  },
}
</script>
