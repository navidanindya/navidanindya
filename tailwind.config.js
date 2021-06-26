module.exports = {
  darkMode: false,
  purge: [],
  theme: {
    fontFamily: {
      'serif': ['"Roboto Slab"'],
      'mono': ['"Roboto Mono"']
    },
    extend: {
      screens: {
        'xs': '560px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.200'),
            blockquote: {
              color: theme('colors.yellow.200'),
              borderLeftColor: theme('colors.yellow.600')
            },
            code: {
              color: theme('colors.yellow.200'),
            },
            h1: {
              color: theme('colors.yellow.600'),
              fontWeight: '900',
              fontFamily: theme('fontFamily.serif')
            },
            h2: {
              color: theme('colors.yellow.600'),
              fontWeight: '900',
              fontFamily: theme('fontFamily.serif')
            },
            h3: {
              color: theme('colors.yellow.600'),
              fontWeight: '900',
              fontFamily: theme('fontFamily.serif')
            },
            h4: {
              color: theme('colors.yellow.600'),
              fontWeight: '900',
              fontFamily: theme('fontFamily.serif')
            },
            p: {
              fontWeight: '400',
              fontFamily: theme('fontFamily.mono')
            },
            strong: {
              color: theme('colors.yellow.700'),
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
