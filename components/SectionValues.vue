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

const features = [
  {
    name: 'Agilt',
    description: 'Vi tror på at det er ok at blive klogere undervejs. Derfor arbejder vi altid agilt med korte leverance-intervaller og løbende inddragelse af vores kunder. Det betyder ikke, at alt hele tiden er til forhandling, men at vi hele tiden tester og evaluerer del-leverancer op mod vores målsætninger. For jer som kunde vil det betyde at I løbende vil blive præsenteret for prototyper eller færdige delområder og blive inddraget i en dialog om hvorvidt det udviklede lever op til forventningerne.',
    // 'med korte leverancer og løbende inddragelse af både opdragsgiver og slutbruger, fordi vi ved at det giver både en bedre proces og et bedre produkt.',
    highlightFirstWords: 3,
  },
  {
    name: 'Tillidsbaseret',
    description: 'Vi tror på at samarbejde baseret på tillid, øger såvel produktiviteten, som kvaliteten af det udviklede. Og så er det meget sjovere. For jer som kunde betyder det blandt andet at vi hellere vil bruge 2 timer på at fixe noget, som gør at produktet lever op til sine målsætninger end bruge 2 timer på at forhandle, om det er dækket af kontrakten. Det går selvfølgelig begge veje og kræver også jeres tillid og hjælp til prioritere, hvis nye idéer tager tiden fra udvikling af det aftalte.',
    // 'og bruger hellere 2 timer på at fixe et problem end 4 timer på at forhandle om det er dækket af kontrakten',
    highlightFirstWords: 3,
  },
  {
    name: 'For en bedre verden',
    description: 'Vi er optaget af, at vores arbejde er med til påvirke verden i en positiv retning. Det betyder blandt andet, at vi vælger vores projekter med omhu og at vi altid har bæredygtighed med som et parameter i vores valg af f.eks. servere mv.',
    // 'og tænker i flere bundlinjer både når vi vælger projekter og driver vores virksomhed.',
    highlightFirstWords: 4,
  },
]
</script>
