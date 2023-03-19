/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "desktop": {min:"930px"},
      "laptop": {min:"800px", max:"929px"},
      "tablet": {min:"700px", max:"799px"}
    }
    
  },
  plugins: [],
  important: true
}