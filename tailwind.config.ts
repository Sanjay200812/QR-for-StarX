import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          DEFAULT: "#111111",
          card: "#171717",
          elevated: "#1D1D1D",
        },
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#A7A7A7",
          muted: "#777777",
        },
        accent: {
          DEFAULT: "#E10600",
          deep: "#A90000",
          glow: "rgba(225, 6, 0, 0.35)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        "glow-red": "0 0 25px -5px rgba(225, 6, 0, 0.4)",
        "card-subtle": "0 4px 20px -2px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "sound-wave": "soundWave 1.2s ease-in-out infinite alternate",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        soundWave: {
          "0%": { height: "4px" },
          "100%": { height: "16px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
