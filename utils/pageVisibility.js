// Read the browser's visibility state without requiring an element lookup.
export const isPageVisible = () => !document.hidden

// Return cleanup for the page-level visibility event.
export const onPageVisibility = (callback) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
