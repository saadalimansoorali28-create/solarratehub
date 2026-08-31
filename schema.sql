CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article TEXT NOT NULL,
  name TEXT NOT NULL,
  comment TEXT NOT NULL,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_comments_article_status
ON comments(article, status, id DESC);
