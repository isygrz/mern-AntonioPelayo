/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'burnt-sienna': '#B54A2B',
        'scarlet-red': '#FE351B',
        'neon-green': '#9CEF0B',
        'slate-gray': '#52504E',
        'deep-indigo': '#1A066D',
        'periwinkle-blue': '#5188DB',
        'slate-veil': '#9DA4AF',
      },
      fontFamily: {
        sans: ['Bebas Neue', 'sans-serif'],
        slab: ['Roboto Slab', 'serif'],
      },
    },
  },
};
