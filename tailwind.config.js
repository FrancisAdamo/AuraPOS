/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          primary: '#37352f',
          secondary: '#9ca3af',
          border: '#e5e5e5',
          background: '#F5F5DC', // Soft Beige
          hover: '#f0f0e6',
          blue: '#2563eb',
          purple: '#a855f7',
          green: '#16a34a',
          red: '#dc2626',
          yellow: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}
