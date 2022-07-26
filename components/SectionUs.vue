<template>
  <BaseSection
    class="overflow-hidden"
    :bgColor="'logo1'"
  >
    <h3 class="responsive-text-base pb-6">HVEM ER VI?</h3>
    <TextFader
      :uid="'about-intro'"
      :highlightFirstWords="2"
      :text="'Vi er et lille men dedikeret team, med mange års erfaring indenfor design og udvikling af digitale løsninger.'"
      class="mb-16"
    />
    <ul class="space-y-12">
      <li
        v-for="employee in employees"
        :key="employee.name"
      >
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
            <p class="responsive-text-base pb-1">{{ employee.role }}</p>
            <p class="responsive-text-base">{{ employee.mail }}</p>
            <p class="responsive-text-lg">{{ employee.bio }}</p>
          </div>
        </div>
      </li>
    </ul>
  </BaseSection>
</template>

<script setup>
// import projects from '@/store/projects.json'
const employees = [
  {
    name: 'Mads Ringblom',
    role: 'UX/UI & Frontend Dev',
    imageUrl: 'assets/mads_ringblom.jpg',
    bio: 'Mads Ringblom er UX/UI designer og frontend-udvikler med en passion for at lave brugervenlige og intuitive applikationer. Mads forstår at designe og facilitere effektive processer, der fører til de bedst mulige løsninger. I sin fritid spiller Mads en masse instrumenter i bandet TERESE.',
    mail: 'mads@meetr.dk',
    twitterUrl: null,
    linkedinUrl: 'https://www.linkedin.com/in/madsringblom/',
    githubUrl: 'https://github.com/madsringblom',
    sideProjects: [
    ],
    freelanceProjects: [
      {
        name: 'Testfacilitet for Bygningshub',
        href: 'https://bygningshub.dk/',
      },
    ],
  },
  {
    name: 'Thomas Titanium',
    role: 'Full Stack Dev',
    imageUrl: 'assets/thomas_titanium.jpg',
    bio: 'Thomas Titanium er full stack-udvikler, som elsker at lave robuste applikationer med de nyeste teknologier. Han har en stærk baggrund i it-sikkerhed og API-udvikling – men holder sig også skarp i frontend. Thomas løber og spiller tennis.',
    mail: 'thomas@meetr.dk',
    twitterUrl: 'https://twitter.com/huulbaek',
    linkedinUrl: 'https://www.linkedin.com/in/thomas-huulb%C3%A6k-titanium-150468/',
    githubUrl: 'https://github.com/huulbaek',
    sideProjects: [
      {
        name: 'Punkr',
        href: 'https://punkr.app/',
      },
      {
        name: 'Laterz',
        href: 'https://laterz.io/',
      },
    ],
    freelanceProjects: [
      {
        name: 'Testfacilitet for Bygningshub',
        href: 'https://bygningshub.dk/',
      },
      {
        name: 'AlleOs i Alternativet',
        href: 'https://alleos.alternativet.dk/',
      },
    ],
  },
]
</script>
