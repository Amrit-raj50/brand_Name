/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#051F20', // forest-900
        foreground: '#DAF1DE', // mint-white
        accent: '#8EB69B',     // sage-light
        accentDark: '#235347', // forest-600
        'forest-900': '#051F20',
        'forest-800': '#0B2B26',
        'forest-700': '#163832',
        'forest-600': '#235347',
        'sage-light': '#8EB69B',
        'mint-white': '#DAF1DE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
