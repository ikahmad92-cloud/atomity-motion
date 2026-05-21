/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--color-bg-primary)",
        textPrimary: "var(--color-text-primary)",
        accentPrimary: "var(--color-accent-primary)",
        accentSuccess: "var(--color-accent-success)",
        accentError: "var(--color-accent-error)",
      },
    },
  },
  plugins: [],
};
