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
        foreground: '#F0FFF4', // bright-mint
        accent: '#A5E6BA',     // bright-sage
        accentDark: '#235347', // forest-600
        'forest-900': '#051F20',
        'forest-800': '#0B2B26',
        'forest-700': '#163832',
        'forest-600': '#235347',
        'sage-light': '#A5E6BA',
        'mint-white': '#F0FFF4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        technical: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
