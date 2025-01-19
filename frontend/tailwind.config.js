/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Regular"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        primaryLight: ["Light"],
        primaryRegular: ["Regular"],
        primaryMedium: ["Medium"],
        primarySemiBold: ["SemiBold"],
        primaryBold: ["Bold"],
        primaryExtraBold: ["ExtraBold"],
      },
      colors: {
        primaryBrandColor: "#141619",
        primaryBrandOptColor: "#2c2e3a",
        secondaryBrandColor: "#0a21c0",
        secondaryBrandOptColor: "#050a44",
        whiteLightColor: "#fcfcfc",
      },
    },
  },
  plugins: [],
};
