<template>
  <div id="cases">
    <BaseSection
      v-for="project in projects"
      :key="project.name"
      :bg-color="project.bgColor"
    >
      <h3 class="responsive-text-base">{{ project.name }}</h3>
      <TextFader
        v-for="(paragraph, index) in project.example"
        :key="project.name + index"
        :uid="project.name + index"
        :text="paragraph"
        :highlight-first-words="project.highlightFirstWords"
        :highlight-color="project.highlightColor"
        class="mb-4"
      />
      <div class="mb-6">
        <img v-if="project.image" :src="project.image" class="lg:w-1/2 sm:w-full" />
      </div>
      <TextFader
        :uid="project.name + '_cta_text' + index"
        :text="project.description"
        :highlight-first-words="2"
        :highlight-color="project.highlightColor"
        class="mb-4"
      />
      <!-- <p class="responsive-text-mega py-6">{{ project.description }}</p> -->
      <BaseFadeIn :uid="project.name + '_cta_button'">
        <BaseButtonCTA :highlight-color="project.highlightColor" @click="scrollTo('kontakt')">
          Kontakt os for en uforpligtende snak
        </BaseButtonCTA>
      </BaseFadeIn>
    </BaseSection>
  </div>
</template>

<script setup>
import texts from '@/assets/texts'
const projects = texts.cases
const scrollTo = (id) => {
  const element = document.getElementById(id)
  element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}
</script>
