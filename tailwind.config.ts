import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {},
      borderRadius: {},
    },
  },
  plugins: [],
} satisfies Config;

export default config;
