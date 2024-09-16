/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './plugin.json', // Add any other paths where Tailwind might be used
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
