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
          <!--
          <video ref="vidRef" playsinline muted>
            <source src="/laptop.mp4" type="video/mp4" codec="hvc1" />
            <source src="/laptop.webm" type="video/webm" />
          </video>
          -->
          <img v-if="project.image" :src="project.image" />
        </div>
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
