<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <BaseSection
    id="ekspertise"
    :bg-color="'black'"
  >
    <h3 class="responsive-text-base text-white">VORES EKSPERTISE</h3>
    <TextFader
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      :uid="'expertise' + index"
      :text="paragraph"
      :highlight-first-words="3"
      :text-color="'white'"
      :highlight-color="'logo3'"
      class="mb-16"
    />
    <!-- <BaseFadeIn :uid="'expertise_cta'">
      <BaseButtonCTA :highlight-color="'logo3'" dark @click="scrollTo('kontakt')">
        Kontakt os og hør mere
      </BaseButtonCTA>
    </BaseFadeIn> -->
  </BaseSection>
</template>

<script setup>
import texts from '@/assets/texts'
const paragraphs = texts.expertise.paragraphs
/* const scrollTo = (id) => {
  const element = document.getElementById(id)
  element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
} */
</script>
