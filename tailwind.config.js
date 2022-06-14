/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'primary': '#ee6c4d',
        'secondary': '#3a86ff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
