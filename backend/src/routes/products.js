// Routes voor producten. POST /photos ontvangt de foto's van het "Nieuw product"-scherm,
// slaat ze op in uploads/{product_id}/ en bewaart de volgorde in products.photo_order.
import { Router } from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import db from '../db/db.js'
import { getOrCreateGuestUser } from '../db/users.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsRoot = path.join(__dirname, '../../uploads')

// Bestanden komen eerst in het geheugen zodat we de product-map pas aanmaken nadat we het product_id kennen.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 6, fileSize: 5 * 1024 * 1024 },
})

const router = Router()

router.post('/photos', upload.array('photos', 6), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Geen foto's ontvangen" })
  }

  let productId = Number(req.body.product_id)
  if (!productId) {
    const guestUser = getOrCreateGuestUser()
    const { lastInsertRowid } = db.prepare('INSERT INTO products (user_id) VALUES (?)').run(guestUser.id)
    productId = lastInsertRowid
  } else {
    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product niet gevonden' })
    }
  }

  // Elke upload vervangt de volledige fotoset van dit product (het scherm stuurt steeds de actuele selectie mee).
  const productDir = path.join(uploadsRoot, String(productId))
  fs.rmSync(productDir, { recursive: true, force: true })
  fs.mkdirSync(productDir, { recursive: true })

  const filenames = req.files.map((file, index) => {
    const ext = path.extname(file.originalname) || '.jpg'
    const filename = `foto-${index + 1}${ext}`
    fs.writeFileSync(path.join(productDir, filename), file.buffer)
    return filename
  })

  db.prepare('UPDATE products SET photo_order = ? WHERE id = ?').run(
    JSON.stringify(filenames),
    productId,
  )

  res.status(201).json({
    product_id: productId,
    photos: filenames.map((filename) => ({
      filename,
      path: `uploads/${productId}/${filename}`,
    })),
  })
})

export default router
