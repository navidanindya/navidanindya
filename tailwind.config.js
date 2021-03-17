module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'serif': ['Roboto Slab'],
      'mono': ['Roboto Mono']
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.200'),
            h1: {
              color: theme('colors.blue.300'),
              fontWeight: '900',
              fontFamily: theme('fontFamily.serif')
            },
            p: {
              fontWeight: '300',
              fontFamily: theme('fontFamily.mono')
            }
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
