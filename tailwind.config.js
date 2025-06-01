/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#1976d2',
          700: '#1565c0',
        },
      },
    },
  },
  plugins: [],
} 