<template>
  <section id="arbejde" class="base-section py-16 md:py-24 bg-gray-50">
    <div class="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-16">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">
        Udvalgt arbejde
      </h2>
      <p class="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
        Projekter vi har bygget
      </p>

      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="project in featuredProjects"
          :key="project.client + project.name"
          class="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              :src="project.image"
              :alt="project.name"
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-6">
            <p class="text-sm font-medium text-logo3">
              {{ project.client }}
            </p>
            <h3 class="mt-1 text-xl font-bold text-gray-900">
              {{ project.name }}
            </h3>
            <p class="mt-2 text-gray-600">
              {{ project.tagline }}
            </p>
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center text-sm font-semibold text-gray-900 hover:text-logo3 transition-colors"
            >
              Besøg projekt
              <ExternalLinkIcon class="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ExternalLinkIcon } from '@heroicons/vue/outline/esm/index.js'
import projects from '@/assets/projects'

const featuredProjects = projects.filter(p => p.featured)
</script>
