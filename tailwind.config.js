/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        accent: "var(--color-accent)",
        card: "var(--color-card)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "warning-bg": "var(--color-warning-bg)",
        border: "var(--color-border)",
        brown: "var(--color-brown)",
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
