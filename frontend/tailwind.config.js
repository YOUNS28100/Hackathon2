/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gradientColorStopPositions: {
        33: "33%",
      },
      colors: {
        mineShaft: "#3D3D3D",
        silverRust: "#CDC4BA",
      },
    },
    fontFamily: {
      cblight: ["CamptonBookLight"],
      cbnormal: ["CamptonBook"],
    },
  },
  plugins: [],
};
