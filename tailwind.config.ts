import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
      backgroundColor: {
        lightgrey: "#f7f7f7",
        darkpurple: "#41315b",
        darkpink: "#cc1e4c",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  plugins: [typography, nextui()],
} satisfies Config;
