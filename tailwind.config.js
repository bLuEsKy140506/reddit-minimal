/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // for React
];
export const theme = {
    extend: {
    backgroundImage: {
      'reddit-header': "url('/bg-header.jpg')",
    },
  },
};
export const plugins = [];
