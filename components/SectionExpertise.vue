<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <BaseSection :bg-color="'black'" id="ekspertise">
    <h3 class="responsive-text-base text-white">VORES EKSPERTISE</h3>
    <TextFader
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      :uid="'expertise' + index"
      :text="paragraph"
      :highlightFirstWords="3"
      :textColor="'white'"
      :highlightColor="'logo3'"
      class="mb-16"
    />
    <div class="flex justify-center">
      <BaseButtonCTA @click="scrollTo('kontakt')">
        Kontakt os og hør mere
      </BaseButtonCTA>
    </div>
  </BaseSection>
</template>

<script setup>

const paragraphs = [
  'Vi er eksperter i at udvikle digitale værktøjer. Har I brug for at visualisere data grafisk eller på kort, understøtte en kritisk proces, gøre en arbejdsgang lettere, indsamle og analysere data eller på anden måde interagere med jeres brugere? Så kan vi hjælpe.',
  'Vi har stor erfaring med sætte os ind i komplekse arbejdssituationer og omsætte faglige behov til digitale løsninger. Vi vælger altid den teknologi der bedst opfylder jeres behov og udvikler fx apps, browser-baserede løsninger, integrationer til office og webapplikationer til Mac og Windows.',
  'Se eksempler på digitale løsninger vi har udviklet nedenfor.',
]
const scrollTo = (id) => {
  const element = document.getElementById(id)
  element.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}
</script>
