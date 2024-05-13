/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3EC6FF",
        secondary: "#C0C0C0",
        "dark-blue": "#032D6C",
        placeholder: "#a9a3b7"
      },
      fontFamily: {
        inter: "Inter",
        consolas: "Consolas",
        prompt: "Prompt",
        poppins: "Poppins"
      },
      backgroundImage: {
        "fsuu-bg": "url('/src/assets/fsuu_bg.png')",
        "fsuu-cover": "url('/src/assets/fsuu_cover.png')",
        "fsuu-logo": "url('/src/assets/fsuu_logo.png')",
        university: "url('/src/assets/university.jpg')"
      }
    },
  },
  plugins: [],
}

