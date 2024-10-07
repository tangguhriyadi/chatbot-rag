import type { Config } from "tailwindcss";

const config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {},
            borderRadius: {},
        },
    },
} satisfies Config;

export default config;
