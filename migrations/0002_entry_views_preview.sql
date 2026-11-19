-- Use the same schema as entry_views with independent counts for Preview.
CREATE TABLE IF NOT EXISTS entry_views_preview (
  kind TEXT NOT NULL CHECK (kind IN ('writing', 'note')),
  slug TEXT NOT NULL CHECK (length(slug) BETWEEN 1 AND 200),
  count INTEGER NOT NULL CHECK (count >= 0),
  PRIMARY KEY (kind, slug)
) WITHOUT ROWID;
