module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        fadeInDown: 'fadeInDown 0.5s ease-out forwards',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

