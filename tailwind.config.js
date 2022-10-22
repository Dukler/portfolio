/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      willChange:{
        'opacity':'opacity'
      }
    },
    fontFamily:{
      'roboto':['Roboto']
    }
  },
  plugins: [],
}
