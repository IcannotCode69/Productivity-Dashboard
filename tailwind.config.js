/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",            // your HTML entry
    "./src/**/*.{js,jsx,ts,tsx}" // all React files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif"
        ],
      },
      colors: {
        background: "#F5F5F7",
        card: "#FFFFFF",
        accent: "#0071E3",
        text: {
          DEFAULT: "#1D1D1F",
          muted: "#6E6E73"
        }
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.1)"
      }
    },
  },
  plugins: [],
};
