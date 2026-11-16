<template>
  <section id="kontakt" class="base-section py-16 md:py-24 bg-gray-900 text-white">
    <div class="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-16">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-400">
        Kontakt
      </h2>
      <p class="mt-2 text-3xl sm:text-4xl font-bold">
        Lad os tage en snak
      </p>
      <p class="mt-4 text-lg text-gray-300 max-w-xl">
        {{ pageIntro }}
      </p>

      <dl class="mt-10 space-y-4">
        <div class="flex items-center gap-3">
          <MailIcon class="h-5 w-5 text-logo1 flex-shrink-0" />
          <a :href="`mailto:${contactEmail}`" class="text-lg hover:text-logo1 transition-colors">
            {{ contactEmail }}
          </a>
        </div>
        <div class="flex items-center gap-3">
          <DeviceMobileIcon class="h-5 w-5 text-logo1 flex-shrink-0" />
          <a :href="`tel:${contactPhone.replace(/\s/g, '')}`" class="text-lg hover:text-logo1 transition-colors">
            {{ contactPhone }}
          </a>
        </div>
      </dl>

      <form class="mt-12 max-w-xl space-y-6" @submit.prevent="send">
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300">Navn</label>
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              autocomplete="name"
              required
              class="mt-1 py-3 px-4 text-gray-900 block w-full rounded-md border-gray-300 focus:ring-logo1 focus:border-logo1"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              autocomplete="email"
              required
              class="mt-1 py-3 px-4 text-gray-900 block w-full rounded-md border-gray-300 focus:ring-logo1 focus:border-logo1"
            />
          </div>
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-300">Besked</label>
          <textarea
            id="message"
            v-model="message"
            name="message"
            rows="4"
            required
            maxlength="500"
            class="mt-1 py-3 px-4 text-gray-900 block w-full rounded-md border-gray-300 focus:ring-logo1 focus:border-logo1"
          />
        </div>

        <p v-if="isSent" class="text-logo1 font-medium">
          Din besked er sendt. Tak for din henvendelse.
        </p>
        <p v-if="isError" class="text-red-400 font-medium">
          Der opstod en fejl – prøv meget gerne igen.
        </p>

        <button
          type="submit"
          :disabled="isSending"
          class="inline-flex items-center px-6 py-3 rounded-md text-base font-semibold text-black bg-logo1 hover:bg-yellow-400 disabled:opacity-50 transition-colors"
        >
          {{ isSending ? 'Sender...' : 'Send besked' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { MailIcon, DeviceMobileIcon } from '@heroicons/vue/outline/esm/index.js'
import texts from '@/assets/texts'

const pageIntro = texts.contact.intro
const contactEmail = texts.contact.email
const contactPhone = texts.contact.telephone

const email = ref('')
const name = ref('')
const message = ref('')
const isSending = ref(false)
const isSent = ref(false)
const isError = ref(false)

const send = async () => {
  isSending.value = true
  isSent.value = false
  isError.value = false

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })
    const json = await response.json()

    if (json.success) {
      isSent.value = true
      name.value = ''
      email.value = ''
      message.value = ''
      setTimeout(() => { isSent.value = false }, 5000)
    } else {
      isError.value = true
      setTimeout(() => { isError.value = false }, 5000)
    }
  } catch {
    isError.value = true
    setTimeout(() => { isError.value = false }, 5000)
  } finally {
    isSending.value = false
  }
}
</script>
