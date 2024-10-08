import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/app/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      borderRadius: {},
    },
  },
  plugins: [],
} satisfies Config;

export default config;
