<template>
  <div class="bg-white">
    <div class="mx-auto py-20 px-4 max-w-7xl sm:px-6 lg:px-8">
      <div class="">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl pb-12">
          Vi tilbyder...
        </h2>
        <div class="lg:col-span-2">
          <ul role="list" class="sm:grid sm:grid-cols-3 sm:gap-12">
            <li v-for="service in services" :key="service.title" class="py-12 sm:py-8">
              <h3 class="text-2xl pb-6">{{ service.title }}</h3>
              <p class="text-lg pb-6">{{ service.description }}</p>
              <p class=""><span class="font-bold">EKSEMPEL:</span> {{ service.example }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const services = [
  {
    title: '1 + 1 = 10',
    description: 'Har du en idé, som vi ser et forretningspotentiale i, så har du mulighed for at få udviklet en løsning skræddersyet til dine behov, for en brøkdel af prisen.',
    example: 'Rudersdal Kommune ønskede at digitalisere deres forberedelsesskema til MedarbejderUdviklingsSamtaler. Efter den indledende dialog stod det klart at der var mulighed for en win win situation. Rudersdal fik et skræddersyet digitalt værktøj, matchende deres behov til en pris der var under licensprisen for et standard-system, samtidig fik vi ejerskab over det endelige produkt og mulighed for at videreudvikle og -sælge det til andre med samme behov.',
    imageUrl: 'assets/mads_ringblom.jpg',
  },
  {
    title: 'Brugervenlig løsning fra bunden',
    description: 'Har du en idé og et klart behov? Vi kan hjælpe med at konkretisere din idé til konkrete skærmbilleder og brugerflows og herefter give et tilbud på udviklingen af den færdige løsning.',
    example: 'Link Arkitektur arbejdede allerede med bæredygtighedsworkshops men ønskede en digital løsning, der kunne gøre arbejdet lettere og mere skalerbart. Vi hjælp Link med at gå fra idé over prototype og til et færdigt digitalt værktøj, som ikke bare har gjort arbejdet lettere men også sat Link på landkortet.',
    imageUrl: 'assets/mads_ringblom.jpg',
  },
  {
    title: 'Digitalt add-on til din service',
    description: 'Har du brug for eksterne ressourcer til programmering og/eller UX-arbejdet. Så kan du hyre os på timebasis.',
    example: '',
    imageUrl: 'assets/mads_ringblom.jpg',
  },
]

</script>
