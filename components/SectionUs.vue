<template>
  <BaseSection
    id="team"
    class="overflow-hidden"
    :bg-color="'logo1'"
  >
    <h3 class="responsive-text-base pb-6">TEAM</h3>
    <TextFader
      :uid="'about-intro'"
      :highlight-first-words="2"
      :text="texts.team.intro"
      class="mb-16"
    />
    <ul class="space-y-12">
      <li
        v-for="employee in employees"
        :key="employee.name"
      >
        <BaseFadeIn :uid="employee.name + 'fader'">
          <div
            class="text-center md:text-left md:flex items-center justify-start gap-6"
          >
            <div
              class="flex-shrink-0 flex justify-center md:justify-start mb-6 md:mb-0 saturate-0"
            >
              <img class="object-cover shadow-lg rounded-full w-56 h-56" :src="employee.imageUrl" alt="">
            </div>
            <div>
              <h3 class="responsive-text-xl pb-3">{{ employee.name }}</h3>
              <p class="responsive-text-base pb-1">
                {{ employee.role }}
              </p>
              <p class="responsive-text-lg">{{ employee.bio }}</p>
              <p class="responsive-text-base mt-2">
                <span>TIDLIGERE PROJEKTER: </span>
                <a
                  :href="employee.otherProjects[0].href"
                  class="hover:underline"
                  target="_blank"
                >
                  {{ employee.otherProjects[0].name }}
                </a>
                <span
                  v-for="project in employee.otherProjects.slice(1)"
                  :key="project.href"
                >
                  <span>, </span>
                  <a
                    :href="project.href"
                    class="hover:underline"
                    target="_blank"
                  >
                    {{ project.name }}
                  </a>
                </span>
              </p>
              <p class="responsive-text-base mt-2 pb-1 flex justify-center md:justify-start items-center">
                <MailIcon class="flex-shrink-0 w-6 h-6 text-white" aria-hidden="true" />
                <span class="ml-3">
                  <a :href="'mailto:' + employee.mail">
                    {{ employee.mail }}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </BaseFadeIn>
      </li>
    </ul>
  </BaseSection>
</template>

<script setup>
import { MailIcon } from '@heroicons/vue/outline/esm/index.js'
import texts from '@/assets/texts'
// import projects from '@/store/projects.json'
const employees = texts.team.employees
</script>
