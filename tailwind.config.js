/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
        '-2': '-2',
      },
      spacing: {
        1037: '65rem',
        817: '51',
        1155: '72rem',
      },
      height: {
        482: '30rem',
        700: '44rem',
      },
      inset: {
        448: '28rem',
      },
      colors: {
        'gray-wallet': '#E1E5EB',
        'blue-wallet': '#0039e6',
        'green-wallet': '#2fc18b',
        'green-hover-wallet': '#a7c59b',
      },
      backgroundImage: {
        'main-picture': 'url(\'/src/images/foto-fundo.png\')',
      },
    },
  },
  plugins: [],
};
