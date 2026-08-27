import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        bridge: {
          DEFAULT: "rgb(var(--color-bridge) / <alpha-value>)",
          light: "rgb(var(--color-bridge-light) / <alpha-value>)",
          dark: "rgb(var(--color-bridge-dark) / <alpha-value>)",
        },
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        marigold: {
          DEFAULT: "#D79A2B",
          deep: "rgb(var(--color-marigold-deep) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          raised: "rgb(var(--color-surface-raised) / <alpha-value>)",
          subtle: "rgb(var(--color-surface-subtle) / <alpha-value>)",
        },
        status: {
          "error-bg": "rgb(var(--color-error-bg) / <alpha-value>)",
          error: "rgb(var(--color-error) / <alpha-value>)",
          "success-bg": "rgb(var(--color-success-bg) / <alpha-value>)",
          success: "rgb(var(--color-success) / <alpha-value>)",
          "warning-bg": "rgb(var(--color-warning-bg) / <alpha-value>)",
          warning: "rgb(var(--color-warning) / <alpha-value>)",
          "info-bg": "rgb(var(--color-info-bg) / <alpha-value>)",
          info: "rgb(var(--color-info) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "Nirmala UI", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        reading: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
