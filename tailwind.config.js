// Style absolute links to the canonical host like relative links.
const siteLinkSelectors = ['https://', 'http://', '//'].flatMap((protocol) => {
  const origin = protocol + 'navidanindya.info'
  return [`[href="${origin}" i]`, ...['/', '?', '#'].map(separator => `[href^="${origin + separator}" i]`)]
}).join(', ')

module.exports = {
  // Apply dark utilities when the theme script sets .dark on the document.
  darkMode: 'selector',
  theme: {
    fontFamily: {
      mono: '"Roboto Mono", "Liberation Mono", "Courier New", monospace',
      display: '"Space Grotesk", Arial, sans-serif'
    },
    extend: {
      // Keep the viewer entrance as short as the theme toggle.
      keyframes: {
        'viewer-zoom': {
          from: { opacity: '0.7', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' }
        }
      },
      animation: {
        'viewer-zoom': 'viewer-zoom 180ms ease-out'
      },
      colors: {
        site: {
          // Light gradient stops. Dark mode uses Tailwind's gray 900 and 800.
          paper: '#fffcf6',
          cream: '#fff9ee',
          // Share the dark gradient midpoint with light text and the logo tile.
          ink: '#18212f',
          // Keep the original amber for large titles and use a deeper amber for light-mode links.
          heading: '#d97706',
          accent: '#b45309',
          'accent-dark': '#d97706',
          // Dividers separate compact rows in each theme.
          rule: '#9a8065',
          'rule-dark': '#64748b'
        }
      },
      maxWidth: {
        // Preserve the reviewed 46rem reading column.
        reading: '46rem'
      },
      screens: {
        // Keep the existing breakpoint for article layouts.
        xs: '560px'
      },
      // Dark prose uses Typography's built-in inversion with the same site palette.
      typography: theme => ({
        DEFAULT: {
          css: {
            // Light body text uses the exact midpoint of the dark gradient.
            // Set link, code, and divider colors for both palettes.
            '--tw-prose-bullets': theme('colors.site.accent'),
            '--tw-prose-body': theme('colors.site.ink'),
            '--tw-prose-headings': theme('colors.site.accent'),
            '--tw-prose-lead': theme('colors.gray.700'),
            '--tw-prose-links': theme('colors.site.accent'),
            '--tw-prose-bold': theme('colors.site.ink'),
            '--tw-prose-hr': theme('colors.site.rule'),
            '--tw-prose-quotes': theme('colors.site.accent'),
            '--tw-prose-quote-borders': theme('colors.site.accent'),
            '--tw-prose-code': theme('colors.site.accent'),
            '--tw-prose-invert-body': theme('colors.gray.200'),
            '--tw-prose-invert-bullets': theme('colors.site.accent-dark'),
            '--tw-prose-invert-headings': theme('colors.site.accent-dark'),
            '--tw-prose-invert-lead': theme('colors.gray.300'),
            '--tw-prose-invert-links': theme('colors.site.accent-dark'),
            '--tw-prose-invert-bold': theme('colors.gray.200'),
            '--tw-prose-invert-hr': theme('colors.site.rule-dark'),
            '--tw-prose-invert-quotes': theme('colors.amber.200'),
            '--tw-prose-invert-quote-borders': theme('colors.site.accent-dark'),
            '--tw-prose-invert-code': theme('colors.amber.200'),
            // Match the reading scale and spacing from the reviewed design.
            fontSize: '1rem',
            lineHeight: '1.7',
            h1: {
              color: theme('colors.site.heading'),
              fontFamily: theme('fontFamily.display'),
              fontWeight: '600',
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              lineHeight: '1.18',
              margin: '0 0 1.25rem'
            },
            'h2, h3, h4': {
              fontFamily: theme('fontFamily.display'),
              fontWeight: '600',
              lineHeight: '1.18'
            },
            h2: { fontSize: '1.5rem', margin: '1.5rem 0 .65rem' },
            h3: { fontSize: '1.25rem', margin: '1.35rem 0 .65rem' },
            p: { fontFamily: theme('fontFamily.mono'), margin: '.75rem 0' },
            // Wrap prose and give two-column tables a usable label column.
            overflowWrap: 'break-word',
            table: { tableLayout: 'fixed' },
            'th, td': { overflowWrap: 'anywhere', verticalAlign: 'top' },
            'th:first-child:nth-last-child(2)': { width: '34%' },
            '@media (max-width: 499px)': {
              table: { fontSize: '.875rem' },
              'th, td': { paddingInline: '.5rem' }
            },
            // Keep linked text identifiable and inline code at the body weight.
            a: { textUnderlineOffset: '.16em' },
            code: { fontWeight: '400' },
            strong: { fontWeight: '600' }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    ({ addBase, addComponents, addVariant, theme }) => {
      // Apply hover styles only to wider layouts with a mouse or trackpad.
      addVariant('desktop-hover', '@media (min-width: 500px) and (hover: hover) and (pointer: fine) { &:hover }')
      // Match the site’s three font faces with versioned Google Fonts WOFF2 subsets.
      addBase([
        { '@font-face': { fontFamily: '"Roboto Mono"', fontWeight: '400', fontStyle: 'normal', fontDisplay: 'swap', src: 'url(/fonts/roboto-mono-v31-400.woff2) format("woff2")' } },
        { '@font-face': { fontFamily: '"Roboto Mono"', fontWeight: '600', fontStyle: 'italic', fontDisplay: 'swap', src: 'url(/fonts/roboto-mono-v31-600-italic.woff2) format("woff2")' } },
        { '@font-face': { fontFamily: '"Space Grotesk"', fontWeight: '600', fontStyle: 'normal', fontDisplay: 'swap', src: 'url(/fonts/space-grotesk-v22-600.woff2) format("woff2")' } }
      ])
      // Keep the reading column aligned and set ink outside the prose wrapper too.
      addBase({
        html: { scrollbarGutter: 'stable' },
        // Lock background scroll while the browser's top-layer viewer is open.
        'html:has(.site-overlay[open])': { overflow: 'hidden' },
        body: { color: theme('colors.site.ink') },
        '.dark body': { color: theme('colors.gray.300') }
      })
      addComponents({
        // Use the same dividers on the content, tag, and Fun Stuff indexes.
        '.site-divided-list': {
          '@apply !list-none !p-0 divide-y divide-site-rule dark:divide-site-rule-dark': {}
        },
        // Align the copy control with the title on both types of content detail.
        '.entry-title-row': {
          '@apply mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3': {}
        },
        // Mark external links in templates and rendered Markdown with the same decorative icon.
        [`.site-backdrop a:is([href^="https://" i], [href^="http://" i], [href^="//"]):not(${siteLinkSelectors})`]: {
          '&::after': {
            content: '""',
            display: 'inline-block',
            width: '0.9em',
            height: '0.9em',
            flexShrink: 0,
            marginInlineStart: '0.3em',
            verticalAlign: '-0.08em',
            backgroundColor: 'currentColor',
            mask: 'url(/icons/open-new-window.svg) center / contain no-repeat'
          },
          '&:is(.flex, .inline-flex)::after': { marginInlineStart: 0 }
        },
        // Keep long lines scrollable inline and readable in the expanded view.
        '.site-reading :is(pre, pre[class])': {
          maxWidth: '100%',
          overflowX: 'auto',
          fontFamily: theme('fontFamily.mono'),
          code: { fontFamily: 'inherit' }
        },
        '.site-reader-panel :is(pre, pre[class])': {
          margin: '0 !important',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
          'code, code span': { whiteSpace: 'inherit', overflowWrap: 'inherit' }
        },
        '.site-reader-panel img': {
          // Fit the whole image inside the centered zoom layer on phones and desktop.
          width: 'auto',
          maxWidth: '100%',
          maxHeight: 'calc(100dvh - 7rem)',
          height: 'auto',
          objectFit: 'contain',
          margin: '0 auto !important'
        },
        // Pair a warm paper background with darker syntax colors in light mode.
        'html:not(.dark) .site-reading :is(pre, pre[class])': {
          color: theme('colors.site.ink'),
          backgroundColor: '#f6ecda',
          '.token': { color: 'inherit' },
          '.token.comment, .token.prolog, .token.doctype, .token.cdata': { color: '#65584a' },
          '.token.string, .token.char, .token.attr-value, .token.inserted': { color: '#365819' },
          '.token.keyword, .token.boolean, .token.operator, .token.deleted': { color: '#923e11' },
          '.token.function, .token.class-name, .token.selector': { color: '#214d74' },
          '.token.number, .token.constant, .token.property': { color: '#71335f' }
        },
        // Draw the notch's curved shoulders in the same color as its surface.
        '.notification-notch': {
          '--notch-fill': theme('colors.site.cream'),
          backgroundColor: 'var(--notch-fill)',
          '.dark &': { '--notch-fill': theme('colors.gray.800') },
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: '0.375rem',
            height: '0.375rem',
            backgroundImage: 'radial-gradient(circle 0.375rem at bottom left, transparent 95%, var(--notch-fill) 100%)'
          },
          '&::before': { right: '100%' },
          '&::after': { left: '100%', transform: 'scaleX(-1)' }
        },
        // Show the waiting update after the reconnect message frees the single row.
        '#connection-status:has(> .notification-notch) + .notification-notch': {
          display: 'none'
        },
        '.site-backdrop': {
          backgroundImage: `linear-gradient(${theme('colors.site.paper')}, ${theme('colors.site.cream')})`,
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            zIndex: '-1',
            pointerEvents: 'none',
            backgroundImage: `linear-gradient(${theme('colors.gray.900')}, ${theme('colors.site.ink')} 50%, ${theme('colors.gray.800')})`,
            backgroundAttachment: 'fixed',
            opacity: '0'
          },
          '.dark &::before': { opacity: '1' }
        },
        '@media (prefers-reduced-motion: no-preference)': {
          // Animate the background layer without interpolating every descendant's colors.
          '.site-backdrop::before': { transition: 'opacity 200ms ease-out' }
        }
      })
    }
  ]
}
