/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        varsity: ['Varsity Team'],
      },
      colors: {
        green: '#1A9345',
        orange: '#FF6B00',
        darkBlue: '#0C0729',
      },
    },
  },
  plugins: [],
}
