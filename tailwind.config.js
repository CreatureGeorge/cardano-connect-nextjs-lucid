/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: {
          primary: "#030033",
          secondary: "#151335",
          text: "#E9E8F7",
          background: "#0C0B1E"
        }
      },
      fontFamily: {
        "main" : ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
