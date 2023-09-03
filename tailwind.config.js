/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  safelist: [
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
    'row-start-1',
    'row-start-2',
    'row-start-3',
    'row-start-4',
    'row-start-5',
    'row-start-6',
    'row-start-7',
  ],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/planners/*.{tsx,ts,js}"
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          750: '#333333',
          850: '#212121',
        }
      }
    },
  },
  plugins: [],
}

