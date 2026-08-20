-- Databaseschema voor Marktly (SQLite).
-- Wordt bij het opstarten van de backend uitgevoerd door db.js als de tabellen nog niet bestaan.

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Eén foto-analyse resulteert in een product: wat erop staat en in welke staat.
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  category TEXT,
  brand TEXT,
  model TEXT,
  condition_json TEXT, -- vrije JSON met AI-inschatting van de staat (bv. sporen van gebruik, compleetheid)
  photo_order TEXT, -- JSON-array met de bestandsnamen/volgorde van de geuploade foto's
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Een gegenereerde advertentie, gebaseerd op een product.
CREATE TABLE IF NOT EXISTS listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id),
  title TEXT,
  description TEXT,
  price REAL,
  status TEXT NOT NULL DEFAULT 'draft', -- bv. draft, published, sold, removed
  platform TEXT, -- bv. marktplaats, vinted
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Statistieken van een gepubliceerde advertentie, om te leren wat goed verkoopt.
CREATE TABLE IF NOT EXISTS tracking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL REFERENCES listings(id),
  days_online INTEGER NOT NULL DEFAULT 0,
  messages_count INTEGER NOT NULL DEFAULT 0,
  sold INTEGER NOT NULL DEFAULT 0, -- 0 = nee, 1 = ja (SQLite kent geen boolean-type)
  sold_price REAL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
