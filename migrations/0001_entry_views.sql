-- Keep one live counter per published writing or note. Allow setup from the D1 console.
CREATE TABLE IF NOT EXISTS entry_views (
  kind TEXT NOT NULL CHECK (kind IN ('writing', 'note')),
  slug TEXT NOT NULL CHECK (length(slug) BETWEEN 1 AND 200),
  count INTEGER NOT NULL CHECK (count >= 0),
  PRIMARY KEY (kind, slug)
) WITHOUT ROWID;
