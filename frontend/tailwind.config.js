/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      scale: {
        430: '4.3',
      },
      height: {
        20: '5rem', // You can use your own naming and values
        30: '7.5rem',
      },
    },
  },
  plugins: [],
};
