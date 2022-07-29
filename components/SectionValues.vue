<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <BaseSection id="manifest" class="overflow-hidden" :bg-color="'logo1'">
    <div class="">
      <h3 class="responsive-text-base text-black">MANIFEST</h3>
      <TextFader
        v-for="feature in features"
        :key="feature.name"
        :uid="feature.name"
        :text="feature.description"
        :highlight-first-words="feature.highlightFirstWords"
        :text-color="'black'"
        :highlight-color="'white'"
        class="mb-16"
      />
    </div>
  </BaseSection>
</template>

<script setup>
import texts from '@/assets/texts'
const features = texts.manifest.paragraphs
</script>
