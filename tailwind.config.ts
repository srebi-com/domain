import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b0f1a",
          700: "#1a2233",
          500: "#3a4252"
        },
        mist: {
          50: "#f7f8fb",
          100: "#eef1f6",
          200: "#e3e7ef"
        },
        neon: {
          400: "#5ee7ff",
          500: "#33d8ff"
        }
      },
      boxShadow: {
        soft: "0 20px 50px -35px rgba(15, 23, 42, 0.45)",
        glow: "0 0 0 1px rgba(51, 216, 255, 0.15), 0 12px 35px -20px rgba(51, 216, 255, 0.5)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["Source Sans 3", "ui-sans-serif", "system-ui"]
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(11, 15, 26, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11, 15, 26, 0.05) 1px, transparent 1px)",
        glow: "radial-gradient(circle at 20% 20%, rgba(94, 231, 255, 0.2), transparent 60%), radial-gradient(circle at 80% 10%, rgba(94, 231, 255, 0.12), transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;
