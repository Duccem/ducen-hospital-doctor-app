/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#8167EC",
          secondary: "#ddd6fe",
          third: "#f5f6fa"
        },
        background: {
          primary: "#FFFFFF",
          secondary: "#E1E7Ef",
          third: "#F5F6FA",
        },
        foreground: {
          primary: "#0E0E0E",
          secondary: "#22242e",
          third: "#4A4A4A",
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

