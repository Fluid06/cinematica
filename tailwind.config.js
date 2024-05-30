/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      fontFamily: {
        poppins: ['Poppins'],
        orbitron: ['Orbitron'],
        afacad: ['Afacad']
      }, 
      keyframes: {
        fadeIn: {
          '0%': { opacity: '10%' },
          '100%': { opacity: '100%' },
        },
        timeBar: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        navFade: {
          '0%': { right: '100%' },
          '100%': { right: '0%' }
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
        'timeBar': 'timeBar 3s ease-in-out',
        'navFade': 'navFade 0.3s ease-in-out',
      },
    }
  },
}