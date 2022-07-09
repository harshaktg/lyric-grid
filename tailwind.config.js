/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
        15: '3.75rem',
        '15px': '15px',
        19: '4.75rem',
      },
      colors: {
        'primary-color': '#3c5dd2',
      },
      boxShadow: {
        navbar: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        card: '2px 2px 6px rgba(0, 0, 0, 0.05)',
        btn: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        5: '5px',
        10: '10px',
      },
      height: {
        7.5: '1.875rem',
      },
    },
  },
  plugins: [],
};
