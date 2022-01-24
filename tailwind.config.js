module.exports = {
  darkMode: false,
  theme: {
    fontFamily: {
      mono: ['"Roboto Mono"'],
      display: ['"Space Grotesk"']
    },
    extend: {
      screens: {
        xs: '560px'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.200'),
            blockquote: {
              color: theme('colors.yellow.200'),
              borderLeftColor: theme('colors.yellow.600')
            },
            code: {
              color: theme('colors.yellow.200'),
              fontWeight: '400'
            },
            h1: {
              color: theme('colors.yellow.600'),
              fontWeight: '600',
              fontFamily: theme('fontFamily.display')
            },
            h2: {
              color: theme('colors.yellow.600'),
              fontWeight: '600',
              fontFamily: theme('fontFamily.display')
            },
            h3: {
              color: theme('colors.yellow.600'),
              fontWeight: '600',
              fontFamily: theme('fontFamily.display')
            },
            h4: {
              color: theme('colors.yellow.600'),
              fontWeight: '600',
              fontFamily: theme('fontFamily.display')
            },
            p: {
              fontWeight: '400',
              fontFamily: theme('fontFamily.mono')
            },
            strong: {
              color: theme('colors.yellow.700'),
              fontWeight: '600'
            }
          }
        }
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
