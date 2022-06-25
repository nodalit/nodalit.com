<template>
  <span id="typewriter" class="text-logo1">god</span>
</template>

<script>
import Typed from 'typed.js'

export default {
  props: {
    words: {
      type: Array,
      default: () => [
        'god',
        'brugervenlig',
        'sikker',
        'nyskabende',
        'sjov',
        'lækker',
        'hurtig',
        'billig',
        'bæredygtig',
        'kompleks',
      ],
    },
  },
  mounted () {
    this.initTypewriter()
  },
  methods: {
    initTypewriter () {
      if (document.querySelector('#typewriter')) {
        const options = {
          strings: this.words,
          loop: true,
          typeSpeed: 40,
        }
        new Typed('#typewriter', options)
      } else {
        setTimeout(this.initTypewriter, 100)
      }
    },
  },
}
</script>

<style scoped>
.typewriter-text,
.typewriter-cursor {
  font-family: 'Montserrat', sans-serif;
  font-size: 60px;
  font-weight: 300;
  color: white;
  margin: 0;
  padding: 0;
}
.typewriter-cursor {
  display: inline-block;
}
</style>
