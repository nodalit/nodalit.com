<template>
  <button class="responsive-text-2xl rounded-lg text-white p-6" :class="dark ? 'bg-logo1' : 'bg-gray-900'">
    <div class="p-2">
      <slot />
    </div>
  </button>
</template>
<script>
export default {
  name: 'BaseButtonCTA',
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
