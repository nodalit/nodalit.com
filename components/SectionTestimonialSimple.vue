<template>
  <section class="base-section py-16 md:py-24 bg-gray-100">
    <div class="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-16">
      <blockquote class="max-w-3xl">
        <p class="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed">
          "{{ testimonial.quote }}"
        </p>
        <footer class="mt-8 flex items-center gap-4">
          <img
            :src="testimonial.image"
            :alt="testimonial.name"
            class="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold text-gray-900">
              {{ testimonial.name }}
            </p>
            <p class="text-gray-600">
              {{ testimonial.title }}, {{ testimonial.company }}
            </p>
          </div>
        </footer>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
import texts from '@/assets/texts'

const testimonial = texts.testimonials[0]
</script>
