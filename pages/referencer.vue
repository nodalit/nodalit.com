<template>
  <div class="relative bg-white py-10">
    <SectionProject
      v-for="project in projects"
      :key="project.title"
      :layout="project.layout"
      :quote="project.quote"
      :title="project.title"
      :manchet="project.manchet"
      :paragraphs="project.paragraphs"
      :cta="project.cta"
    />
  </div>
</template>

<script setup>
import projects from '@/store/projects.json'
</script>
