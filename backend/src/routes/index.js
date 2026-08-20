// Verzamelt alle routes van de API onder één router. Nieuwe resource-routes (products, listings, ...) hier registreren.
import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default router
