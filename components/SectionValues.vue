<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <section class="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-12 lg:px-16">
      <svg
        class="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        role="img"
        aria-labelledby="svg-workcation"
      >
        <title id="svg-workcation"></title>
        <defs>
          <pattern
            id="ad119f34-7694-4c31-947f-5c9d249b21f3"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
      </svg>
      <div class="pb-48">
        <!-- <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">A better way to send money</p> -->
        <!-- <ul>
          <li v-for="value in features" :key="value.name" class="grid grid-cols-12 gap-6 pb-6">
            <div class="col-span-2 flex justify-end text-logo1">
              <component :is="value.icon" class="h-20 w-20" aria-hidden="true" />
            </div>
            <p class="col-span-10 text-xl text-gray-500">
              <span class="font-bold mr-2">{{ value.name }}</span>
              <span>{{ value.description }}</span>
              <a class="text-logo1" href="/vaerdier"> Læs mere</a>
            </p>
          </li>
        </ul> -->
        <TextFader
          v-for="feature in features"
          :key="feature.name"
          :uid="feature.name"
          :text="feature.description"
          class="mb-16"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/vue/outline'

const features = [
  {
    name: 'Agilt',
    description: 'Vi tror på at det er ok at blive klogere undervejs. Derfor arbejder vi altid agilt med korte leverance-intervaller og løbende inddragelse af vores kunder. Det betyder ikke, at alt hele tiden er til forhandling, men at vi hele tiden tester og evaluerer del-leverancer op mod vores målsætninger. For jer som kunde vil det betyde at I løbende vil blive præsenteret for prototyper eller færdige delområder og blive inddraget i en dialog om hvorvidt det udviklede lever op til forventningerne.',
    // 'med korte leverancer og løbende inddragelse af både opdragsgiver og slutbruger, fordi vi ved at det giver både en bedre proces og et bedre produkt.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Tillidsbaseret',
    description: 'Vi tror på at samarbejde baseret på tillid, øger såvel produktiviteten, som kvaliteten af det udviklede. Og så er det meget sjovere. For jer som kunde betyder det blandt andet at vi hellere vil bruge 2 timer på at fixe noget, som gør at produktet lever op til sine målsætninger end bruge 4 timer på at forhandle, om det er dækket af kontrakten. Det går selvfølgelig begge veje og kræver også jeres tillid og hjælp til prioritere, hvis nye idéer tager tiden fra udvikling af det aftalte.',
    // 'og bruger hellere 2 timer på at fixe et problem end 4 timer på at forhandle om det er dækket af kontrakten',
    icon: ScaleIcon,
  },
  {
    name: 'For en bedre verden',
    description: 'Vi er optaget af, at vores arbejde er med til påvirke verden i en positiv retning. Det betyder blandt andet, at vi vælger vores projekter med omhu og at vi altid har bæredygtighed med som et parameter i vores valg af f.eks. servere mv.',
    // 'og tænker i flere bundlinjer både når vi vælger projekter og driver vores virksomhed.',
    icon: LightningBoltIcon,
  },
]
</script>
