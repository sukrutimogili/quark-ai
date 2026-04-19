/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        pinyon: ['Pinyon Script', 'cursive'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
