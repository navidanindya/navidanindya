// Resolve the saved theme before paint and keep System mode in sync.
const root = document.documentElement
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')

// Apply Tailwind's dark variant and keep native browser controls in sync.
const applyTheme = () => {
  const mode = root.dataset.theme
  const dark = mode === 'dark' || (mode === 'system' && systemPreference.matches)
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
}

root.dataset.theme = 'system'
try {
  const choice = localStorage.getItem('site-theme')
  if (['light', 'dark', 'system'].includes(choice)) {
    root.dataset.theme = choice
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn('Could not read the theme preference', { message: error.message })
}

applyTheme()
systemPreference.addEventListener('change', applyTheme)
// Bridge the Vue control and the document theme applied before the app mounts.
window.siteTheme = {
  // Expose the mode selected by the pre-paint script.
  current: () => root.dataset.theme,
  // Apply and save the mode chosen through the Vue control.
  apply: (mode) => {
    root.dataset.theme = mode
    applyTheme()
    try {
      localStorage.setItem('site-theme', mode)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Could not save the theme preference', { message: error.message })
    }
  }
}
