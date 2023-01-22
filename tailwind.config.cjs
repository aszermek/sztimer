/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {},
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
        'vt323': ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}
