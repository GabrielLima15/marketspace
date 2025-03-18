module.exports = {
  content: ["./App.tsx", "./global.css", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        product: {
          blue: "#364D9D",
          "blue-light": "#647AC7",
          "red-light": "#EE7979",
        },
        base: {
          "gray-1": "#1A181B",
          "gray-2": "#3E3A40",
          "gray-3": "#5F5B62",
          "gray-4": "#9F9BA1",
          "gray-5": "#D9D8DA",
          "gray-6": "#EDECEE",
          "gray-7": "#F7F7F8",
        },
      },
      fontFamily: {
        karla: ["Karla", "sans-serif"],
        "karla-bold": ["KarlaBold", "sans-serif"],
      },
      lineHeight: {
        base: "130%",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};
