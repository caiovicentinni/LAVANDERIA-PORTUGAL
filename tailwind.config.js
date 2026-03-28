/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        backgroundAlt: '#F2F0E9',
        primary: '#25AAE1',
        accent: '#25AAE1',
        dark: '#1D1E20',
        textPrimary: '#1D1E20',
        textSecondary: '#727586',
        surface: '#F7F7F8',
        surfaceDark: '#1D1E20',
        border: '#E5E7EB',
      },
      fontFamily: {
        heading: ['"DM Sans"', 'sans-serif'],
        body: ['"Lato"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
