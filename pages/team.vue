<template>
  <div class="bg-white">
    <div class="mx-auto py-10 px-4 max-w-7xl sm:px-6 lg:px-8">
      <div class="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        <Transition
          :css="false"
          mode="out-in"
          @enter="enterElement"
        >
          <div v-if="show" class="space-y-5 sm:space-y-4">
            <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Dem vi er
            </h2>
            <p class="text-xl text-gray-500">
              Vi ved, at det er ok at blive klogere undervejs. Derfor arbejder vi altid agilt med korte leverance-intervaller og løbende inddragelse af vores kunder.
            </p>
            <p>
              Vi tror på at samarbejde baseret på tillid, øger såvel produktiviteten, som kvaliteten af det udviklede. Og så er det meget sjovere – for alle parter.
            </p>
            <div id="techbox" class="ring-black ring-2 bg-gray-600 p-5 shadow-xl rounded-xl" style="height: 500px">
              <!-- -->
            </div>
          </div>
        </Transition>
        <div class="lg:col-span-2">
          <ul role="list" class="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0">
            <li v-for="person in people" :key="person.name" class="sm:py-8">
              <div class="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                <div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                  <img class="object-cover shadow-lg rounded-lg" :src="person.imageUrl" alt="">
                </div>
                <div class="sm:col-span-2">
                  <div class="space-y-6">
                    <div class="text-lg leading-6 font-medium space-y-1">
                      <h3>{{ person.name }}</h3>
                      <p class="text-secondary">
                        {{ person.role }}
                      </p>
                    </div>
                    <div class="text-lg">
                      <p class="text-gray-500">
                        {{ person.bio }}
                      </p>
                    </div>
                    <ul role="list" class="flex space-x-5">
                      <li>
                        <span class="sr-only">Mail</span>
                        <a :href="`mailto:${person.mail}`" :alt="person.mail"><MailIcon class="h-5 w-5 text-gray-400 hover:text-gray-500" aria-hidden="true" /></a>
                      </li>
                      <li>
                        <a :href="person.githubUrl" class="text-gray-400 hover:text-gray-500">
                          <span class="sr-only">GitHub</span>
                          <svg class="w-6 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                          </svg>
                        </a>
                      </li>
                      <li v-if="person.twitterUrl">
                        <a :href="person.twitterUrl" class="text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Twitter</span>
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a :href="person.linkedinUrl" class="text-gray-400 hover:text-gray-500">
                          <span class="sr-only">LinkedIn</span>
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div v-if="person.freelanceProjects.length > 0" class="text-gray-400">
                      <h5 class="font-bold uppercase">
                        Konsulent-projekter:
                      </h5>
                      <ul>
                        <li v-for="project in person.freelanceProjects">
                          <a class="hover:text-purple-600" :href="project.href">{{ project.name }}</a>
                        </li>
                      </ul>
                    </div>
                    <div v-if="person.sideProjects.length > 0" class="text-gray-400">
                      <h5 class="font-bold uppercase">
                        Hobby-projekter:
                      </h5>
                      <ul>
                        <li v-for="project in person.sideProjects">
                          <a class="hover:text-purple-600" :href="project.href">{{ project.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MailIcon } from '@heroicons/vue/solid'
import anime from 'animejs/lib/anime.es.js'

const show = ref(false)
// const showTech = ref(false)

const enterElement = (el: HTMLElement, done) => {
  anime({
    targets: el,
    translateX: [-400, 0],
    easing: 'easeOutExpo',
    complete: done,
    duration: 750,
  })
}
/*
const enterTechnologies = () => {
  anime({
    targets: '.tech-item',
    translateX: [-400, 0],
    delay: anime.stagger(50),
    easing: 'easeInOutSine',
    duration: 250,
    // loop: true,
    // direction: 'alternate',
  })
}
*/
onMounted(() => {
  show.value = true
  // await nextTick()
  // showTech.value = true
})

/*
const technologies = [
  'Node',
  'Docker',
  'Postgres',
  'Nuxt',
  'Feathers',
  'Docker',
  'Docker',
  'Docker',
  'Docker',
  'Docker',
  'Docker',
  'Docker',
]

const techPos = () => {
  const width = document.getElementById('techbox').clientWidth
  const top = Math.random() * 450
  const left = Math.random() * (width - 150)
  console.log(top)
  return {
    top: `${top}px`,
    left: `${left}px`,
  }
}
*/

const people = [
  {
    name: 'Mads Ringblom',
    role: 'UX/UI & Frontend Dev',
    imageUrl:
      'assets/mads_ringblom.jpg',
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
    imageUrl:
      'assets/thomas_titanium.jpg',
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
    ],
  },
]

</script>
