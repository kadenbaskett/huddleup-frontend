/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        varsity: ['Varsity Team'],
      },
      fontSize: {
        'form-title': ['32px', '40px'],
      },
      colors: {
        green: '#1A9345',
        orange: '#FF6B00',
        darkBlue: '#0C0729',
      },
    },
  },
  plugins: [],
};
