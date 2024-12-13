/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: [ "Roboto", "sans-serif"],
    },
    extend: {
        width:{
          "240":"640"
        },
    },
  },
  plugins: [],
}

