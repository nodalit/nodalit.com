<template>
  <div id="cases">
    <BaseSection
      v-for="project in projects"
      :key="project.name"
      :bg-color="project.bgColor"
    >
      <h3 class="responsive-text-base">{{ project.name }}</h3>
      <TextFader
        :uid="project.name"
        :text="project.example"
        :highlight-first-words="project.highlightFirstWords"
        :highlight-color="project.highlightColor"
        class="mb-4"
      />
      <div class="relative h-96 mb-6">
        <div class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none lg:flex lg:justify-center">
          <video ref="vidRef" playsinline muted>
            <source src="/laptop.mp4" type="video/mp4" codec="hvc1" />
            <source src="/laptop.webm" type="video/webm" />
          </video>
        </div>
      </div>
      <TextFader
        :uid="project.name + '_cta'"
        :text="project.description"
        :highlight-first-words="2"
        :highlight-color="project.highlightColor"
        class="mb-4"
      />
      <!-- <p class="responsive-text-mega py-6">{{ project.description }}</p> -->
      <div class="flex">
        <BaseButtonCTA :highlight-color="project.highlightColor" @click="scrollTo('kontakt')">
          Kontakt os for en uforpligtende snak
        </BaseButtonCTA>
      </div>
    </BaseSection>
  </div>
</template>

<script setup>
// import projects from '@/store/projects.json'
import texts from '@/assets/texts'
const projects = texts.cases

const vidRef = ref(null)

const animateScroll = (duration) => {
  const scrollPosition = window.scrollY
  const goto = (vidRef.value.duration / 100) * (scrollPosition / (duration / 100))
  if (vidRef.value.seeking) {
    return
  }
  if (goto < vidRef.value.duration) {
    vidRef.value.currentTime = goto
  } else {
    vidRef.value.currentTime = vidRef.value.duration
  }
}

const onScroll = () => {
  animateScroll(250)
}
const scrollTo = (id) => {
  const element = document.getElementById(id)
  element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}
onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', onScroll)
    vidRef.value.currentTime = 0.001
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>
