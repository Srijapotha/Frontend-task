/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1967d2", // Extracted Blue
        secondary: "#f0f5f7", // Light Blue/Gray
        dark: "#202124",
        gray: {
          DEFAULT: "#696969",
          light: "#ecedf2",
          dark: "#5c6770"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
