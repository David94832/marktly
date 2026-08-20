// Startpunt van de backend: laadt omgevingsvariabelen en start de HTTP-server.
import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Marktly API draait op http://localhost:${PORT}`)
})
