// Verzamelt alle routes van de API onder één router. Nieuwe resource-routes (products, listings, ...) hier registreren.
import { Router } from 'express'
import productsRouter from './products.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

router.use('/products', productsRouter)

export default router
