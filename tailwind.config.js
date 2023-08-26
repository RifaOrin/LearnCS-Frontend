/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        overlay: '#00242C',
        textColor: '#F2F2F2'
      }
    },
    fontFamily: {
      'poppins':['poppins','sans-serif']
    }  
  },
  variants: {
    extend: {
      letterSpacing: ['hover', 'focus'],
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
      

    },
  },
  plugins: [
    require('tailwindcss-blend-mode')(),
    require('tailwind-scrollbar'),
  ],
}

