<template>
  <div>
    <BaseSection
      v-for="project in projects"
      :key="project.name"
      :bg-color="project.bgColor"
    >
      <h3 class="responsive-text-base">{{ project.name }}</h3>
      <TextFader
        :uid="project.name"
        :text="project.example"
        :highlightFirstWords="project.highlightFirstWords"
        :highlightColor="project.highlightColor"
        class="mb-4"
      />
      <div class="relative h-96 mb-6">
        <div class="w-full lg:absolute lg:inset-y-0 lg:-left-20 lg:h-full lg:w-auto lg:max-w-none lg:flex lg:justify-center">
          <video ref="vidRef" playsinline muted>
            <source src="/assets/laptop.mp4" type="video/mp4" codec="hvc1" />
            <source src="/assets/laptop.webm" type="video/webm" />
          </video>
        </div>
      </div>
      <p class="responsive-text-xl pb-6">{{ project.description }}</p>
      <div class="flex justify-center">
        <BaseButtonCTA>
          Kontakt os for en uforpligtende snak
        </BaseButtonCTA>
      </div>
    </BaseSection>
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
    highlightColor: 'white',
  },
  {
    name: 'KUNDECASE 2',
    example: 'Link Arkitektur arbejdede allerede med bæredygtighedsworkshops men ønskede en digital løsning, der kunne gøre arbejdet lettere og mere skalerbart. Vi hjælp Link med at gå fra idé over prototype og til et færdigt digitalt værktøj, som ikke bare har gjort arbejdet lettere men også sat Link på landkortet.',
    description: 'Har du en idé og et klart behov? Vi kan hjælpe med at konkretisere din idé til konkrete skærmbilleder og brugerflows og herefter give et tilbud på udviklingen af den færdige løsning.',
    highlightFirstWords: 2,
    bgColor: 'gray-300',
    highlightColor: 'logo3',
  },
]

const vidRef = ref(null)

const animateScroll = (duration) => {
  const scrollPosition = window.scrollY
  const goto = (vidRef.value.duration / 100) * (scrollPosition / (duration / 100))
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
    document.addEventListener('scroll', onScroll)
    vidRef.value.currentTime = 0.001
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('scroll', onScroll)
  }
})
</script>
