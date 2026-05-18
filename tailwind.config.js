/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        med: {
          blue: "#2563EB",
          teal: "#14B8A6",
          purple: "#8B5CF6",
        },
        ink: {
          950: "#0B1220",
          900: "#0F172A",
          800: "#111827",
          700: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "Segoe UI", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(37, 99, 235, 0.35), 0 0 60px rgba(20, 184, 166, 0.25)",
        card: "0 20px 60px rgba(2, 6, 23, 0.6)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(60% 60% at 50% 20%, rgba(37, 99, 235, 0.35) 0%, rgba(15, 23, 42, 0) 70%)",
        "section-glow":
          "radial-gradient(50% 50% at 50% 0%, rgba(139, 92, 246, 0.25) 0%, rgba(15, 23, 42, 0) 70%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
