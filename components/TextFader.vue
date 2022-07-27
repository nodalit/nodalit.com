<template>
  <div :id="'fadingTextContainer' + uid" :class="'responsive-text-' + textSize + ' text-' + textColor">
    <span
      v-for="(word, index) in words"
      :key="index"
      :class="word.highlight ? 'text-' + highlightColor : '' "
      :style="`opacity: ${word.opacity}; line-height: 1.4;`"
    >
      {{ word.text + ' ' }}
    </span>
  </div>
</template>

<script>
/**
 * Should fade in text when word by word
 * as the user is scrolling
 * starting when the first word is approx
 * two thirds down
 * should take into account the screen size
 * and match the fade tempo so it follows the scroll
 *
 * container element height divided by number of words
 * set the tempo
 */
import calcHorizontalDistance from '@/composables/calcHorizontalDistance'
import calcElementOpacity from '@/composables/calcElementOpacity'
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    textSize: {
      type: String,
      default: 'mega',
    },
    textColor: {
      type: String,
      default: 'black',
    },
    highlightColor: {
      type: String,
      default: 'white',
    },
    highlightFirstWords: {
      type: Number,
      default: 3,
    },
    fadeInStart: {
      type: Number,
      default: 75,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      ticking: false,
      containerEl: null,
      containerHeight: 0,
      fadeSpeed: 0,
      words: [],
      highlightedWords: ['agilt'],
    }
  },
  methods: {
    calcWordFadePoints (wordIndex, unit) {
      const i = wordIndex
      const start = i * unit
      const end = start + unit
      return { start, end }
    },
    setContainerMeasurements () {
      if (!this.containerEl) {
        this.containerEl = document.getElementById('fadingTextContainer' + this.uid)
      }
      if (this.containerEl) {
        this.containerHeight = this.containerEl.scrollHeight
      }
    },
    setWordOpacities (relativeScroll, unit) {
      this.words.forEach((word, i) => {
        const fadePoints = this.calcWordFadePoints(i, unit)
        const newWordOpacity = calcElementOpacity(relativeScroll, fadePoints, unit)
        if (word.opacity !== newWordOpacity) {
          word.opacity = newWordOpacity
        }
      })
    },
    calcUnit () {
      const h = this.containerHeight
      const n = this.words.length
      return h / n
    },
    scrollCallback () {
      if (!this.ticking) {
        if (this.containerHeight) {
          // relativeScroll is the distance between fadeInStart and the containerEls top
          const relativeScroll = calcHorizontalDistance(this.fadeInStart, this.containerEl)
          const unit = this.calcUnit()
          window.requestAnimationFrame(() => {
            this.setWordOpacities(relativeScroll, unit)
            this.ticking = false
          })
          this.ticking = true
        } else {
          this.setContainerMeasurements()
        }
      }
    },
  },
  created () {
    const text = this.text
    const arr = text.split(' ')
    arr.forEach((word, index) => {
      this.words.push({
        text: word,
        opacity: 0,
        highlight: this.highlightedWords.includes(word) || index < this.highlightFirstWords,
      })
    })
  },
  mounted () {
    this.scrollCallback()
    document.addEventListener('scroll', () => {
      this.scrollCallback()
    })
  },
}
</script>

<style>

</style>
