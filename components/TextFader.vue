<template>
  <div :id="'fadingTextContainer' + uid" :class="'responsive-text-' + textSize">
    <span
      v-for="(word, index) in words"
      :key="index"
      :class="word.highlight ? 'text-white' : ''"
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
    highlightFirstWords: {
      type: Number,
      default: 3,
    },
    scrollStart: {
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
      lastKnownScrollPosition: 0,
      ticking: false,
      containerEl: null,
      containerTop: null,
      containerHeight: 0,
      fadeSpeed: 0,
      words: [],
      highlightedWords: ['agilt'],
    }
  },
  methods: {
    calcWordOpacity (relativeScroll, wordIndex, unit) {
      const y = relativeScroll
      const i = wordIndex
      const startScroll = i * unit
      const endScroll = startScroll + unit
      if (y <= startScroll) {
        return 0
      }
      if (y >= endScroll) {
        return 1
      }
      const relY = y - startScroll
      return (relY / unit)
    },
    scrollCalback () {
      if (!this.containerEl) {
        this.containerEl = document.getElementById('fadingTextContainer' + this.uid)
      }
      if (this.containerEl && !this.containerTop) {
        this.containerTop = this.containerEl.getBoundingClientRect().top
        this.containerHeight = this.containerEl.scrollHeight
      }
      if (this.containerTop && !this.ticking) {
        this.lastKnownScrollPosition = window.scrollY
        const scrollStartPosition = (window.innerHeight * this.scrollStart / 100)
        // hvor langt er punktet scrollStartPosition ift. this.containerTop
        // scroll 300
        // this.containerTop 600
        // scrollStartPos 700
        const relativeScroll = this.lastKnownScrollPosition - this.containerTop + scrollStartPosition
        console.log(relativeScroll)
        const h = this.containerHeight
        const n = this.numOfWords
        const unit = h / n
        window.requestAnimationFrame(() => {
          // eslint-disable-next-line
          this.words.forEach((word, i) => {
            const newOpacity = this.calcWordOpacity(relativeScroll, i, unit)
            if (word.opacity !== newOpacity) {
              word.opacity = newOpacity
            }
          })
          this.ticking = false
        })
        this.ticking = true
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
    this.numOfWords = this.words.length
    this.scrollCalback()
    document.addEventListener('scroll', () => {
      this.scrollCalback()
    })
  },
}
</script>

<style>

</style>
