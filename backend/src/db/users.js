// Tijdelijke helper zolang er nog geen login is: zorgt dat er altijd één "guest" user bestaat om producten aan te koppelen.
import db from './db.js'

const GUEST_EMAIL = 'guest@marktly.local'

export function getOrCreateGuestUser() {
  const existing = db.prepare('SELECT id, email FROM users WHERE email = ?').get(GUEST_EMAIL)
  if (existing) return existing

  const { lastInsertRowid } = db.prepare('INSERT INTO users (email) VALUES (?)').run(GUEST_EMAIL)
  return { id: lastInsertRowid, email: GUEST_EMAIL }
}
