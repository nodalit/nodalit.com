<template>
  <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-24 lg:items-start">
    <div class="relative col-span-12 lg:col-span-5 sm:py-16 lg:py-0">
      <div aria-hidden="true" class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
        <svg class="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12" width="404" height="392" fill="none" viewBox="0 0 404 392">
          <defs>
            <pattern
              id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
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
          <rect width="404" height="392" fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
        </svg>
      </div>
      <div class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
        <!-- Testimonial card-->
        <div
          class="relative pb-10 rounded-2xl shadow-xl overflow-hidden"
          style="padding-top: 46%;"
        >
          <img class="absolute inset-0 h-full w-full object-cover object-top" :src="quote.bgUrl" alt="">
          <div class="absolute inset-0 bg-indigo-500 mix-blend-multiply" />
          <div class="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-600 opacity-80" />
          <div class="absolute bottom-0 right-0 left-0 p-8">
            <!-- <div>
              <img class="h-12" :src="quote.logoUrl" alt="Workcation">
            </div> -->
            <blockquote class="mt-8">
              <div class="relative text-lg font-medium text-white md:flex-grow">
                <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p class="relative">
                  {{ quote.quote }}
                </p>
              </div>

              <footer class="mt-4">
                <p class="text-base font-semibold text-indigo-200">
                  {{ quote.name }}, {{ quote.title }} @ {{ quote.company }}
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative col-span-12 lg:col-span-7 mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0"
      :style="layout === 'img-right' ? 'order: -1;' : ''"
    >
      <!-- Content area -->
      <div class="pt-12 sm:pt-16 lg:pt-20">
        <h2 class="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
          {{ title }}
        </h2>
        <div class="mt-6 text-gray-500 space-y-6">
          <p class="text-lg">
            <span class="font-bold">{{ quote.company }}</span>
            {{ manchet }}
          </p>
          <p v-for="(paragraph, index) in paragraphs" :key="index" class="text-base leading-7">
            {{ paragraph }}
          </p>
          <p class="text-base leading-7">
            {{ cta.text }}
          </p>
          <div class="inline-flex rounded-md shadow">
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">{{ cta.buttonText }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionProject',
  props: {
    layout: {
      type: String,
      default: 'img-left', // 'img-right'
    },
    quote: {
      type: Object,
      default: () => {
        return {
          logoUrl: 'https://tailwindui.com/img/logos/workcation.svg?color=white',
          bgUrl: 'https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100',
          quote: 'Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam. Montes, magna cursus nulla feugiat dignissim id lobortis amet.',
          name: 'Sarah Williams',
          title: 'CEO',
          company: 'Workcation',
        }
      },
    },
    cta: {
      type: Object,
      default: () => {
        return {
          text: 'Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.',
          buttonText: 'Kontakt os og hør mere',
        }
      },
    },
    title: {
      type: String,
      default: 'On a mission to empower teams',
    },
    manchet: {
      type: String,
      default: 'Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.',
    },
    paragraphs: {
      type: Array,
      default: () => {
        return [
          'Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna. Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna.',
          'Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.',
        ]
      },
    },
  },
}
</script>
