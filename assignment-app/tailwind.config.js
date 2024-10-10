/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'standard': '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',
        'todo': '0px 2px 3px -1px rgba(59,130,246,0.4), 0px 1px 0px 0px rgba(59,130,246,0.4), 0px 0px 0px 1px rgba(59,130,246,0.4)',
        'delayed': '0px 2px 3px -1px rgba(239,68,68,0.4), 0px 1px 0px 0px rgba(239,68,68,0.4), 0px 0px 0px 1px rgba(239,68,68,0.4)',
        'basic' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }
    },
  },
  plugins: [],
  safelist:[
    'text-sky',
    'bg-red'
  ]
}
