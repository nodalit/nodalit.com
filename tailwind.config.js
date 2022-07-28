/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ee6c4d',
        secondary: '#ff006e',
        logo1: '#ffbe0b',
        logo3: '#ff006e',
        logo4: '#8338ec',
        logo5: '#3a86ff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
