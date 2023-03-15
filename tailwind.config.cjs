/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "desktop": "930px",
      "laptop": "800px",
      "tablet": "700px"
    }
    
  },
  plugins: [],
  important: true
}