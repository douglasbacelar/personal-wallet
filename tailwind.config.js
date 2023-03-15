/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        1037: '65rem',
      },
      height: {
        482: '30rem',
      },
      inset: {
        448: '28rem',
      },
      backgroundImage: {
        'main-picture': 'url(\'/src/foto-fundo.png\')',
      },
    },
  },
  plugins: [],
};
