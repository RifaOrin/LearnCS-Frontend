/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      colors: {
        overlay: '#00242C',
        textColor: '#F2F2F2',
        custom1: '#050509',
        custom2: '#170E5F',
        custom3: '#56382E',
        custom4: '#575353',
        custom5: '#433491',
        custom6: '#97584D',
        custom7: '#92837C',
        custom8: '#B0ACAE',

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

