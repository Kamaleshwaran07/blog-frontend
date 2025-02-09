/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: {
        3: "3 3 0%",
        2: "2 2 0%",
        5: "5 5 0%",
        // 2: "2 2 0%",
      },
      colors: {
        lightgreen: "#b9e6e6",
        lightBrown:"#333"
      },
    },
  },
};
