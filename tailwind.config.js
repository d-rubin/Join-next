/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#2A3647",
        secondary: "#091931",
        red: "#FF3D00",
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
      },
    },
  },
  plugins: [],
};
