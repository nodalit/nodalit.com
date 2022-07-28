<template>
  <div>
    <section class="py-4 bg-gray-900 lg:pb-14 lg:overflow-hidden h-96"></section>
    <section
      v-for="project in projects"
      :key="project.name"
      class="relativ py-12 overflow-hidden md:py-20 lg:py-24"
      :class="'bg-' + project.bgColor"
    >
      <div class="relative max-w-7xl mx-auto px-4 sm:px-12 lg:px-16">
        <div
          class="mb-16"
        >
          <h3 class="responsive-text-base">{{ project.name }}</h3>
          <TextFader
            :uid="project.name"
            :text="project.example"
            :highlightFirstWords="project.highlightFirstWords"
            class="mb-4"
          />
          <div class="relative h-96">
            <div class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none lg:flex lg:justify-center">
              <video ref="vidRef" playsinline muted>
                <source src="/assets/laptop.mp4" type="video/mp4" codec="hvc1" />
                <source src="/assets/laptop.webm" type="video/webm" />
              </video>
            </div>
          </div>
          <TextFader
            :uid="project.name"
            :text="project.description"
            :highlightFirstWords="project.highlightFirstWords"
            :textSize="'xl'"
            class=""
          />
        </div>
        <!-- <SectionProject
          v-for="project in projects"
          :key="project.title"
          :layout="project.layout"
          :quote="project.quote"
          :title="project.title"
          :manchet="project.manchet"
          :paragraphs="project.paragraphs"
          :cta="project.cta"
        /> -->
      </div>
    </section>
  </div>
</template>

<script setup>
// import projects from '@/store/projects.json'
const projects = [
  {
    name: 'KUNDECASE 1',
    example: 'Rudersdal Kommune ønskede at digitalisere deres forberedelsesskema til medarbejder-udviklingssamtaler. Efter den indledende dialog stod det klart at der var mulighed for en win win situation. Rudersdal fik et skræddersyet digitalt værktøj, matchende deres behov til en pris der var under licensprisen for et standard-system, samtidig fik vi ejerskab over det endelige produkt og mulighed for at videreudvikle og -sælge det til andre med samme behov.',
    description: 'Har du en idé, som vi ser et forretningspotentiale i, så har du mulighed for at få udviklet en løsning skræddersyet til dine behov, for en brøkdel af prisen.',
    highlightFirstWords: 2,
    bgColor: 'logo3',
  },
  {
    name: 'KUNDECASE 2',
    example: 'Link Arkitektur arbejdede allerede med bæredygtighedsworkshops men ønskede en digital løsning, der kunne gøre arbejdet lettere og mere skalerbart. Vi hjælp Link med at gå fra idé over prototype og til et færdigt digitalt værktøj, som ikke bare har gjort arbejdet lettere men også sat Link på landkortet.',
    description: 'Har du en idé og et klart behov? Vi kan hjælpe med at konkretisere din idé til konkrete skærmbilleder og brugerflows og herefter give et tilbud på udviklingen af den færdige løsning.',
    highlightFirstWords: 2,
    bgColor: 'logo4',
  },
  {
    name: 'KUNDECASE 3',
    description: 'Har du brug for eksterne ressourcer til programmering og/eller UX-arbejdet. Så kan du hyre os på timebasis.',
    highlightFirstWords: 2,
    example: 'Projekthuset Aron ønskede en custom løsning, kunne hjælpe SMVer med at evaluere deres arbejdskulktur. I tæt samarbejde med Aron udviklede vi en customløsning.',
    bgColor: 'logo1',
  },
]

const vidRef = ref(null)

const animateScroll = (duration) => {
  const scrollPosition = window.scrollY
  const goto = (vidRef.value.duration / 100) * (scrollPosition / (duration / 100))
  console.log(goto, vidRef.value.seeking)
  if (vidRef.value.seeking) {
    return
  }
  if (goto < vidRef.value.duration) {
    vidRef.value.currentTime = goto
  } else {
    vidRef.value.currentTime = vidRef.value.duration
  }
}

const onScroll = () => {
  animateScroll(250)
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', onScroll)
    vidRef.value.currentTime = 0.001
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>
