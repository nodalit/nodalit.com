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
const projects = [
  {
    layout: 'img-left',
    title: 'En skræddersyet digital løsning',
    company: 'Link Arkitektur',
    manchet: 'arbejdede allerede med bæredygtighedsworkshops men ønskede en digital løsning, der kunne gøre arbejdet lettere og mere skalerbart.',
    paragraphs: [
      'Vi hjalp Link med at gå fra idé over prototype og til et færdigt digitalt værktøj, som ikke bare har gjort arbejdet lettere men også sat Link på landkortet.',
    ],
    quote: {
      logoUrl: 'https://tailwindui.com/img/logos/workcation.svg?color=white',
      bgUrl: 'assets/kompass.jpg',
      quote: 'Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam. Montes, magna cursus nulla feugiat dignissim id lobortis amet.',
      name: 'Grethe Haugland',
      title: 'CEO',
      company: 'Link Arkitektur',
    },
    cta: {
      text: 'Har du en idé og et klart behov? Vi kan hjælpe med at konkretisere din idé til konkrete skærmbilleder og brugerflows og herefter give et tilbud på udviklingen af den færdige løsning.',
      buttonText: 'Kontakt os og hør hvordan!',
    },
  },
  {
    layout: 'img-right',
    title: '01 + 01 = 10',
    company: 'Rudersdal Kommune',
    manchet: 'ønskede at digitalisere deres forberedelsesskema til MedarbejderUdviklingsSamtaler. Efter den indledende dialog stod det klart at der var mulighed for en win win situation.',
    paragraphs: [
      'Rudersdal fik et skræddersyet digitalt værktøj, matchende deres behov til en pris der var under licensprisen for et standard-system, samtidig fik vi ejerskab over det endelige produkt og mulighed for at videreudvikle og -sælge det til andre med samme behov.',
    ],
    cta: {
      text: 'Har du en idé, som vi ser et forretningspotentiale i, så har du mulighed for at få udviklet en løsning skræddersyet til dine behov, for en brøkdel af prisen.',
      buttonText: 'Kontakt os for en uforpligtende snak!',
    },
    quote: {
      logoUrl: 'https://tailwindui.com/img/logos/workcation.svg?color=white',
      bgUrl: 'assets/kompass.jpg',
      quote: 'Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam. Montes, magna cursus nulla feugiat dignissim id lobortis amet.',
      name: 'Jens Gregersen',
      title: 'Kommunikationschef',
      company: 'Rudersdal Kommune',
    },
  },
]
</script>
