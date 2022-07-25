<template>
  <div :id="'fadingTextContainer' + uid" class="text-5xl lg:text-6xl">
    <span
      v-for="(word, index) in words"
      :key="index"
      :class="word.highlight ? 'text-logo1' : ''"
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
    uid: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      lastKnownScrollPosition: 0,
      ticking: 0,
      containerHeight: 0,
      fadeSpeed: 0,
      words: [],
      highlightedWords: ['agilt'],
      unit: 20,
    }
  },
  created () {
    const text = this.text
    const arr = text.split(' ')
    arr.forEach((word, index) => {
      this.words.push({
        text: word,
        opacity: 0,
        highlight: this.highlightedWords.includes(word) || index < 3,
      })
    })
  },
  mounted () {
    const calcWordOpacity = (relativeScroll, wordIndex, unit) => {
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
    }
    let ticking = false
    let containerEl = null
    let containerTop = null
    console.log('this far')
    this.numOfWords = this.words.length
    document.addEventListener('scroll', () => {
      if (!containerEl) {
        containerEl = document.getElementById('fadingTextContainer' + this.uid)
      }
      if (containerEl && !containerTop) {
        containerTop = containerEl.getBoundingClientRect().top
        this.containerHeight = containerEl.scrollHeight
      }
      if (containerTop && !ticking) {
        this.lastKnownScrollPosition = window.scrollY
        const scrollStartPosition = (window.innerHeight * 0.8)
        const relativeScroll = this.lastKnownScrollPosition - containerTop + scrollStartPosition
        const h = this.containerHeight
        const n = this.numOfWords
        const unit = h / n
        window.requestAnimationFrame(() => {
          // eslint-disable-next-line
          this.words.forEach((word, i) => {
            const newOpacity = calcWordOpacity(relativeScroll, i, unit)
            if (word.opacity !== newOpacity) {
              word.opacity = newOpacity
            }
          })
          ticking = false
        })

        ticking = true
      }
    })
  },
}
</script>

<style>

</style>
