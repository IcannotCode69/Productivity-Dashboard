/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",           
    "./src/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B46C1",
        mutedBg: "#F7F5FF",
        text: "#1A202C",
        subtext: "#4A5568",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
