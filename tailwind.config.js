/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      regular: ["Be Vietnam Pro", "sans-serif"],
      secondary: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
