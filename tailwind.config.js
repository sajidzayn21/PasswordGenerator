/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', // For your HTML file
    './*.js', // For all JS files in the current directory
    './*.css',],
  theme: {
    extend: {
      colors: {
        'custom-black': '#000000',
        'custom-black-light': '#282828',
        
      },
    },
  },
  plugins: [],
}

