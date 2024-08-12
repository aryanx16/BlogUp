/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        playwrite: ['"Playwrite PE"', 'serif'],
        sankofa: ['"Sankofa Display"', 'serif'],
      },
    },
  },
  plugins: [],
}