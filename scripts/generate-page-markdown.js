const { mkdirSync, readdirSync, readFileSync, writeFileSync } = require('fs')
const { basename, dirname, join } = require('path')
const TurndownService = require('turndown')

const converter = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
converter.remove(['button', 'dialog', 'iframe', 'script', 'style', 'svg'])
converter.keep(['audio', 'table', 'video'])

// Skip dynamic labels and decorative links attached to headings.
converter.addRule('pageControls', {
  filter: node => node.hasAttribute('data-markdown-ignore') || (node.nodeName === 'A' && node.getAttribute('aria-hidden') === 'true'),
  replacement: () => ''
})

// Export the public page body from generated HTML so Markdown follows the same content.
for (const file of readdirSync('dist', { recursive: true }).filter(file => basename(file) === 'index.html')) {
  const html = readFileSync(join('dist', file), 'utf8')
  const main = html.match(/<main\b[^>]*\bid="main-content"[^>]*>([\s\S]*?)<\/main>/)
  if (!main) { throw new Error('Generated page is missing its main content: ' + file) }

  const output = join('dist', '_markdown', dirname(file), 'index.md')
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, converter.turndown(main[1]) + '\n')
}
