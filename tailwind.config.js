/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#ee6c4d',
        secondary: '#ff006e',
        logo1: '#ffbe0b',
        logo4: '#8338ec',
        logo5: '#3a86ff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
