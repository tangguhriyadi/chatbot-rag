import type { Config } from "tailwindcss";

const config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {},
      borderRadius: {},
    },
  },
} satisfies Config;

export default config;
