/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#824a39',
        'primary-dark': '#6b3d2f',
        background: '#ffe6d8',
        'logo-light': '#fdf2e9',
      },
    },
  },
  plugins: [],
} 