// Quote an administrative table setting before using it in SQL.
export const quoteViewTable = (name) => {
  if (!/^[a-z_][a-z0-9_]*$/i.test(name || '')) {
    throw new Error('Set VIEWS_TABLE to a valid table identifier.')
  }
  return `"${name}"`
}
