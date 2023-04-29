/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./playground/index.html",
    "./aboutme/index.html",
    "./contribute/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    extend: {},
  },
  plugins: [],
};
