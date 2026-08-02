/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E7D32",
          light: "#388E3C",
          dark: "#1B5E20",
        },
        secondary: "#388E3C",
        accent: "#81C784",
        surface: "#FFFFFF",
        "surface-alt": "#F5F9F4",
        ink: "#1B1B1B",
        soil: {
          black: "#3E3A36",
          red: "#B0463C",
          laterite: "#A9532E",
          sandy: "#D9B36A",
          alluvial: "#8C6A46",
          mountain: "#6E7F72",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-texture":
          "linear-gradient(rgba(46,125,50,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(46,125,50,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      boxShadow: {
        tile: "0 1px 2px rgba(27,27,27,0.06), 0 4px 12px rgba(27,27,27,0.04)",
        "tile-hover": "0 8px 24px rgba(46,125,50,0.25)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      animation: {
        scan: "scan 1.8s linear infinite",
        ripple: "ripple 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
