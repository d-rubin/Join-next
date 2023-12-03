/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container: {
        center: true,
      },
      colors: {
        primary: "#2A3647",
        secondary: "#091931",
        red: "#FF4646",
        underline: "#29ABE2",
        orange: "#FFA800",
        green: "#7AE229",
        outline: "#D1D1D1",
        design: "#FF7A00",
        sales: "#FC71FF",
        backoffice: "#1FD7C1",
        marketing: "#0038FF",
        media: "#FFC701",
        defaultColor: "#F6F7F8",
        defaultColorDark: "#252525",
        grey: "#D1D1D1",
        textDark: "#d5d5d5",
        bgDark: "#414141",
      },
    },
  },
  plugins: [],
};
