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
      <div class="mb-6">
        <img v-if="project.image" :src="project.image" class="w-1/2" />
      </div>
      <TextFader
        :uid="project.name + '_cta_text'"
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
</script>
