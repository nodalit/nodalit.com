<template>
  <section id="ekspertise" class="base-section py-16 md:py-24 bg-white">
    <div class="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-16">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">
        Hvad vi laver
      </h2>
      <p class="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 max-w-2xl">
        Fra idé til færdig løsning
      </p>

      <ul class="mt-12 grid gap-8 md:grid-cols-3">
        <li v-for="item in bullets" :key="item.title">
          <h3 class="text-lg font-bold text-gray-900">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-gray-600">
            {{ item.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const bullets = [
  {
    title: 'Web-apps & integrationer',
    description: 'Browser-baserede løsninger, Office-integrationer og desktop-apps til Mac og Windows.',
  },
  {
    title: 'Data & visualisering',
    description: 'Kort, grafer og dashboards der gør komplekse data forståelige og handlingsbare.',
  },
  {
    title: 'Agil udvikling',
    description: 'Korte leveranceintervaller, løbende feedback og løsninger skræddersyet til jeres behov.',
  },
]
</script>
