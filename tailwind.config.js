/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/App.{js,jsx}',
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: '#C03221',
        theme: '#3758FA',
        sh: '#060239',
        menu: '#003049',
        tab: '#E3F8FA',
        th: '#7B7890',
        tb: '#d1d5db',
      },
    },
  },
  plugins: [],
}