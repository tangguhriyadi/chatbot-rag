import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/Component/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {},
      borderRadius: {},
    },
  },
  plugins: [],
} satisfies Config;

export default config;
