<template>
  <section
    class="base-section relative py-12 md:py-20 lg:py-24"
    :class="'bg-' + bgColor"
  >
    <!-- <svg
      class="absolute top-0 right-full"
      width="404"
      height="404"
      fill="none"
      viewBox="0 0 404 404"
      role="img"
      aria-labelledby="svg-workcation"
    >
      <title id="svg-workcation"></title>
      <defs>
        <pattern
          id="ad119f34-7694-4c31-947f-5c9d249b21f3"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            class="text-gray-200"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
    </svg> -->
    <div class="relative max-w-7xl mx-auto px-12 sm:px-12 lg:px-16">
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  name: 'BaseSection',
  props: {
    bgColor: {
      type: String,
      default: 'gray-50',
    },
  },
}
</script>
