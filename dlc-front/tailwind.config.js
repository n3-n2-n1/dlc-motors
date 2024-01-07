/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AEB234',
        secondary: '#FEF34B',
      },
    }
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
  ],
}
