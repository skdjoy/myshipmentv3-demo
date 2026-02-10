/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mgh: {
          blue: '#34328F',
          navy: '#082567',
          grey: '#B2B8BF',
          charcoal: '#2A2A38',
          light: '#F4F4F4',
          cyan: '#00D4FF',
          green: '#27B373',
        },
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        barlow: ['Barlow Condensed', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
