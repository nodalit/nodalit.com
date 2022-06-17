<template>
  <div>
    <canvas id="logo" style="width: 75px; display: inline-block" :style="{ height: `${height}px` }" />
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['height'])

const colors = [
  '#ffbe0b',
  '#fb5607',
  '#ff006e',
  '#8338ec',
  '#3a86ff',
]
const squares = []
colors.forEach((color, i) => {
  console.log(color)
  let x = 10
  if (i > 0) {
    x += squares[i - 1].x + squares[i - 1].width - 30
  }
  const y = Math.random() * props.height / 1.5
  let width = Math.random() * 50 + 50
  if (i !== 0 && i % 2) {
    width = squares[i - 1].width / 1.5
  } else if (i !== 0 && !(i % 2)) {
    width = squares[i - 1].width * 2
  }
  const height = Math.random() * 50 + props.height
  squares.push({
    x,
    y,
    width,
    height,
    color: colors[i],
    movingUp: Math.random() > 0.5,
  })
})
const draw = () => {
  const element = document.getElementById('logo') as HTMLCanvasElement | null
  const ctx = element.getContext('2d')
  ctx.globalAlpha = 0.8
  ctx.globalCompositeOperation = 'destination-over'
  ctx.clearRect(0, 0, 300, 200)
  squares.forEach((square) => {
    if (square.movingUp) {
      square.y -= 0.05
    } else {
      square.y += 0.9
    }
    if (square.y + square.height > 140) {
      square.movingUp = true
    } else if (square.y < 10) {
      square.movingUp = false
    }
    ctx.beginPath()
    ctx.rect(square.x, square.y, square.width, square.height)
    ctx.lineWidth = 6
    ctx.strokeStyle = '#000000'
    ctx.stroke()
    ctx.fillStyle = square.color
    ctx.fill()
  })
  window.requestAnimationFrame(draw)
}
onMounted(() => {
  window.requestAnimationFrame(draw)
  // draw()
})

</script>

<style>

</style>
