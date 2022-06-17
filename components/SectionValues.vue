<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Vores måde at arbejde på</h2>
        <!-- <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">A better way to send money</p> -->
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Selvom vi altid tilpasser vores metoder og processer til det konkrete projekt, er der også nogle ting der går igen på tværs af projekter, nemlig at vi arbejder...</p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          <div v-for="feature in features" :key="feature.name">
            <dt>
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <component :is="feature.icon" class="h-6 w-6" aria-hidden="true" />
              </div>
              <p class="mt-5 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
            </dt>
            <dd class="mt-2 text-base text-gray-500">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/vue/outline'

const features = [
  {
    name: 'Agilt',
    description:
      'Vi tror på at det er ok at blive klogere undervejs. Derfor arbejder vi altid agilt med korte leverance-intervaller og løbende inddragelse af vores kunder. Det betyder ikke, at alt hele tiden er til forhandling, men at vi hele tiden tester og evaluerer del-leverancer op mod vores målsætninger. For jer som kunde vil det betyde at I løbende vil blive præsenteret for prototyper eller færdige delområder og blive inddraget i en dialog om hvorvidt det udviklede lever op til forventningerne.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Tillidsbaseret',
    description:
      'Vi tror på at samarbejde baseret på tillid, øger såvel produktiviteten, som kvaliteten af det udviklede. Og så er det meget sjovere. For jer som kunde betyder det blandt andet at vi hellere vil bruge 2 timer på at fixe noget, som gør at produktet lever op til sine målsætninger end bruge 4 timer på at forhandle, om det er dækket af kontrakten. Det går selvfølgelig begge veje og kræver også jeres tillid og hjælp til prioritere, hvis nye idéer tager tiden fra udvikling af det aftalte.',
    icon: ScaleIcon,
  },
  {
    name: 'For en bedre verden',
    description:
      'Vi er optaget af, at vores arbejde er med til påvirke verden i en positiv retning. Det betyder blandt andet, at vi vælger vores projekter med omhu og at vi altid har bæredygtighed med som et parameter i vores valg af f.eks. servere mv.',
    icon: LightningBoltIcon,
  },
]
</script>
