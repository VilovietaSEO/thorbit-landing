import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: "var(--primary)",      // #C4704F burnt orange
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        accent: {
          DEFAULT: "var(--accent)",        // #D9A854 golden yellow
          hover: "var(--accent-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",     // #7FA9B3 sage blue-green
          dark: "var(--secondary-dark)",
        },

        // Semantic colors
        high: "var(--high)",
        medium: "var(--medium)",
        low: "var(--low)",
        none: "var(--none)",
        critical: "var(--critical)",

        // Text colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",

        // Background colors
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-hover": "var(--bg-hover)",

        // Border colors
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
