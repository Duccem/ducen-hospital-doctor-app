/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#8167EC",
          secondary: "#dfcbfa",
        },
        background: {
          primary: "#FFFFFF",
          secondary: "#E1E7Ef",
        },
        foreground: {
          primary: "#0E0F13",
          secondary: "#22242e",
        },
        complementary: {
          danger: "#EA3A3D",
          success: "#22A094",
          warning: "#F7CB45",
        }
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        NunitoLight: ["NunitoLight", "sans-serif"],
        NunitoMedium: ["NunitoMedium", "sans-serif"],
        NunitoBold: ["NunitoBold", "sans-serif"],
        NunitoSemiBold: ["NunitoSemiBold", "sans-serif"],
        NunitoExtraBold: ["NunitoExtraBold", "sans-serif"],
      }
    },
  },
  plugins: [],
}

