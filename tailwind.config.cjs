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
      boxShadow: {
        'emboss': '0px 19px 29px rgba(29, 29, 29, 0.07), 0px -18px 36px rgba(255, 255, 255, 0.8)',
        'embossHover': '0px 11px 19px rgba(29, 29, 29, 0.03), 0px -20px 40px rgba(255, 255, 255, 0.7)',
      }
    },
  },
  plugins: [],
}
