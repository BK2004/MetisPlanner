// List of colors that need to be preloaded for planner with custom colors
const colors = [
  "blue",
  "orange",
  "purple",
  "pink",
  "yellow",
  "violet",
  "cyan",
  "lime",
  "rose",
  "zinc"
]

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
    'h-1/5',
    'h-1/6',
    'h-1/7',
    {
      pattern: new RegExp(`bg-(${Object.values(colors).join("|")})-500`)
    },
    {
      pattern: new RegExp(`bg-(${Object.values(colors).join("|")})-400`)
    },
    {
      pattern: new RegExp(`text-(${Object.values(colors).join("|")})-500`)
    },
    {
      pattern: new RegExp(`text-(${Object.values(colors).join("|")})-400`)
    },
    {
      pattern: new RegExp(`border-(${Object.values(colors).join("|")})-500`)
    },
    {
      pattern: new RegExp(`border-(${Object.values(colors).join("|")})-400`)
    },
    {
      pattern: new RegExp(`border-(l|r|t|b)-(${Object.values(colors).join("|")})-500`)
    },
    {
      pattern: new RegExp(`border-(l|r|t|b)-(${Object.values(colors).join("|")})-400`)
    }
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

