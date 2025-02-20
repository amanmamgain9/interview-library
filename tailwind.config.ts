import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        '9/10': '90%',
      },
      fontFamily: {
        'boring-bold': ['Boring Sans Bold', 'sans-serif'],
        'boring-light': ['Boring Sans Light', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;